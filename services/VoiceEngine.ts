
class VoiceEngineService {
    private worker: Worker | null = null;
    private isLoading = false;
    private isModelReady = false;
    private audioContext: AudioContext | null = null;
    private currentSource: AudioBufferSourceNode | null = null;
    private defaultVoice = "af_bella";
    private pendingResolve: ((value: any) => void) | null = null;
    private onEndCallback: (() => void) | null = null;

    constructor() {
        if (typeof window !== 'undefined') {
            this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
            this.initWorker();
        }
    }

    private initWorker() {
        try {
            // Vite pattern for importing workers
            this.worker = new Worker(new URL('./voiceWorker.ts', import.meta.url), {
                type: 'module'
            });

            this.worker.onmessage = async (e) => {
                const { type, audio, sampling_rate, error } = e.data;

                if (type === 'init-complete') {
                    console.log('VoiceEngine: Worker initialized model');
                    this.isModelReady = true;
                    this.isLoading = false;
                } else if (type === 'generate-complete') {
                    console.log('VoiceEngine: Generation complete');
                    if (audio && sampling_rate) {
                        await this.playAudio(audio, sampling_rate, this.onEndCallback);
                    }
                    if (this.pendingResolve) {
                        this.pendingResolve(true);
                        this.pendingResolve = null;
                    }
                } else if (type === 'error') {
                    console.error('VoiceEngine: Worker error', error);
                    this.isLoading = false;
                    if (this.pendingResolve) {
                        this.pendingResolve(false);
                        this.pendingResolve = null;
                    }
                    if (this.onEndCallback) this.onEndCallback();
                }
            };
        } catch (e) {
            console.error('VoiceEngine: Failed to create worker', e);
        }
    }

    async init() {
        if (this.isModelReady || this.isLoading || !this.worker) return;

        this.isLoading = true;
        this.worker.postMessage({ type: 'init', dtype: 'q8' });
    }

    async speak(text: string, voiceId?: string, onEnd?: () => void) {
        if (!this.isModelReady) {
            await this.init();
            // Wait for init if not ready
            if (!this.isModelReady) {
                await new Promise(resolve => {
                    const check = setInterval(() => {
                        if (this.isModelReady) {
                            clearInterval(check);
                            resolve(true);
                        }
                    }, 500);
                });
            }
        }

        this.stop();
        this.onEndCallback = onEnd || null;

        return new Promise((resolve) => {
            this.pendingResolve = resolve;
            this.worker?.postMessage({
                type: 'generate',
                text,
                voiceId: voiceId || this.defaultVoice
            });
        });
    }

    private async playAudio(audioData: Float32Array, sampleRate: number, onEnd?: () => void) {
        if (!this.audioContext) return;

        // Ensure AudioContext is resumed (browser policy)
        if (this.audioContext.state === 'suspended') {
            await this.audioContext.resume();
        }

        const buffer = this.audioContext.createBuffer(1, audioData.length, sampleRate);
        buffer.getChannelData(0).set(audioData);

        this.currentSource = this.audioContext.createBufferSource();
        this.currentSource.buffer = buffer;
        this.currentSource.connect(this.audioContext.destination);

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
            } catch (e) { }
            this.currentSource = null;
        }
    }

    isReady() {
        return this.isModelReady;
    }
}

export const VoiceEngine = new VoiceEngineService();
