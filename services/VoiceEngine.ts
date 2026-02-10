import { KokoroTTS } from 'kokoro-js';

class VoiceEngineService {
    private tts: any = null;
    private isLoading = false;
    private audioContext: AudioContext | null = null;
    private currentSource: AudioBufferSourceNode | null = null;

    // Standard American Female voice
    // Options: af_bella, af_sarah, am_adam, am_michael, bf_emma, bm_george, etc.
    private defaultVoice = "af_bella";

    constructor() {
        if (typeof window !== 'undefined') {
            this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        }
    }

    async init() {
        if (this.tts || this.isLoading) return;

        try {
            this.isLoading = true;
            console.log('VoiceEngine: Loading model...');

            // Load the quantized model from Hugging Face
            // This is ~80MB and will be cached in the browser
            this.tts = await KokoroTTS.from_pretrained("onnx-community/Kokoro-82M-v1.0-ONNX", {
                dtype: "q8", // Quantized for 4x smaller size, same quality
            });

            console.log('VoiceEngine: Model loaded!');
        } catch (error) {
            console.error('VoiceEngine: Failed to load model', error);
        } finally {
            this.isLoading = false;
        }
    }

    async speak(text: string, voiceId?: string, onEnd?: () => void) {
        if (!this.tts) await this.init();
        if (!this.tts) return;

        // Stop current audio if playing
        this.stop();

        try {
            console.log('VoiceEngine: Generating speech...');
            const audio = await this.tts.generate(text, {
                voice: voiceId || this.defaultVoice,
            });

            if (audio && audio.audio) {
                await this.playAudio(audio.audio, audio.sampling_rate, onEnd);
            }
        } catch (error) {
            console.error('VoiceEngine: Failed to generate speech', error);
            if (onEnd) onEnd();
        }
    }

    private async playAudio(audioData: Float32Array, sampleRate: number, onEnd?: () => void) {
        if (!this.audioContext) return;

        // Create AudioBuffer
        const buffer = this.audioContext.createBuffer(1, audioData.length, sampleRate);
        buffer.getChannelData(0).set(audioData);

        // Create source
        this.currentSource = this.audioContext.createBufferSource();
        this.currentSource.buffer = buffer;
        this.currentSource.connect(this.audioContext.destination);

        // Handle onEnd
        this.currentSource.onended = () => {
            this.currentSource = null;
            if (onEnd) onEnd();
        };

        this.currentSource.start();
    }

    stop() {
        if (this.currentSource) {
            try {
                this.currentSource.stop();
            } catch (e) {
                // Ignore errors if already stopped
            }
            this.currentSource = null;
        }
    }

    isReady() {
        return !!this.tts;
    }
}

export const VoiceEngine = new VoiceEngineService();
