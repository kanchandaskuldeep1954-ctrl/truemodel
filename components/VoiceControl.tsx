import React, { useState } from 'react';
import { Volume2, VolumeX, Mic, Activity } from 'lucide-react';
import { VoiceEngine } from '../services/VoiceEngine';
import { generatePersonaScript } from '../services/groq';

interface VoiceControlProps {
    text: string;
}

export const VoiceControl: React.FC<VoiceControlProps> = ({ text }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [mode, setMode] = useState<'Read' | 'Improv'>('Read');

    const handlePlay = async () => {
        if (isPlaying) {
            VoiceEngine.stop();
            setIsPlaying(false);
            return;
        }

        setIsLoading(true);
        try {
            let textToSpeak = text;

            // If Improv mode, rewrite the text using Gemini
            if (mode === 'Improv') {
                console.log('VoiceControl: Generating persona script...');
                const context = tutor.getAdaptiveContext();
                const script = await generatePersonaScript(text, 'Tutor', context);
                if (script) textToSpeak = script;
            }

            await VoiceEngine.speak(textToSpeak, undefined, () => setIsPlaying(false));
            setIsPlaying(true);
        } catch (e) {
            console.error(e);
            setIsPlaying(false);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center gap-2">
            {/* Mode Toggle */}
            <button
                onClick={() => setMode(m => m === 'Read' ? 'Improv' : 'Read')}
                className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded transition-colors border
                    ${mode === 'Improv'
                        ? 'bg-purple-500/20 text-purple-300 border-purple-500/50 hover:bg-purple-500/30'
                        : 'bg-slate-800 text-slate-500 border-slate-700 hover:text-slate-300'}
                `}
                title={mode === 'Improv' ? "AI Persona: Adds personality & commentary" : "Reader: Reads text exactly as written"}
            >
                {mode === 'Improv' ? '✨ Persona' : '📖 Reader'}
            </button>

            <button
                onClick={handlePlay}
                disabled={isLoading}
                className={`
                flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold transition-all
                ${isPlaying
                        ? 'bg-rose-500/20 text-rose-400 border border-rose-500/50 animate-pulse'
                        : 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 hover:bg-indigo-500/20'}
            `}
            >
                {isLoading ? (
                    <Activity className="w-3 h-3 animate-spin" />
                ) : isPlaying ? (
                    <VolumeX className="w-3 h-3" />
                ) : (
                    <Volume2 className="w-3 h-3" />
                )}
                {isLoading ? (mode === 'Improv' ? 'Thinking...' : 'Loading...') : isPlaying ? 'Stop' : (mode === 'Improv' ? 'Speak' : 'Read')}
            </button>
        </div>
    );
};
