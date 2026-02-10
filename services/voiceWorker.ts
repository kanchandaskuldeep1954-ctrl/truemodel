
import { KokoroTTS } from 'kokoro-js';

let tts: any = null;

self.onmessage = async (e) => {
    const { type, text, voiceId, dtype } = e.data;

    try {
        if (type === 'init') {
            if (!tts) {
                console.log('VoiceWorker: Initializing model...');
                tts = await KokoroTTS.from_pretrained("onnx-community/Kokoro-82M-v1.0-ONNX", {
                    dtype: dtype || "q8",
                });
                console.log('VoiceWorker: Model initialized');
            }
            self.postMessage({ type: 'init-complete' });
        } else if (type === 'generate') {
            if (!tts) {
                throw new Error('TTS not initialized');
            }

            console.log('VoiceWorker: Generating audio for:', text.substring(0, 30) + '...');
            const audio = await tts.generate(text, {
                voice: voiceId,
            });

            if (audio && audio.audio) {
                // Transferable objects: we send the Float32Array
                self.postMessage({
                    type: 'generate-complete',
                    audio: audio.audio,
                    sampling_rate: audio.sampling_rate
                }, [audio.audio.buffer] as any);
            }
        }
    } catch (error: any) {
        console.error('VoiceWorker Error:', error);
        self.postMessage({ type: 'error', error: error.message });
    }
};
