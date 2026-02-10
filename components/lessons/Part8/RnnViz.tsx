import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export const RnnViz: React.FC = () => {
    const [step, setStep] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const words = ['The', 'cat', 'sat', 'on', 'the', 'mat'];
    const hiddenStates = ['h₀', 'h₁', 'h₂', 'h₃', 'h₄', 'h₅'];

    useEffect(() => {
        if (!isPlaying) return;
        const interval = setInterval(() => {
            setStep(prev => (prev + 1) % words.length);
        }, 1000);
        return () => clearInterval(interval);
    }, [isPlaying]);

    return (
        <div className="flex flex-col items-center gap-8 w-full max-w-2xl mx-auto">

            {/* Words */}
            <div className="flex gap-2">
                {words.map((word, i) => (
                    <motion.div
                        key={i}
                        className={`px-4 py-2 rounded-lg font-bold text-lg border-2 transition-all ${i === step
                                ? 'bg-blue-600 text-white border-blue-400 scale-110'
                                : i < step
                                    ? 'bg-slate-700 text-slate-400 border-slate-600'
                                    : 'bg-slate-900 text-slate-500 border-slate-800'
                            }`}
                        animate={{ scale: i === step ? 1.1 : 1 }}
                    >
                        {word}
                    </motion.div>
                ))}
            </div>

            {/* RNN Cell */}
            <div className="flex items-center gap-4">
                {/* Previous Hidden State */}
                <motion.div
                    className="w-20 h-20 rounded-full bg-purple-900 border-2 border-purple-600 flex items-center justify-center font-mono text-purple-300"
                    animate={{ opacity: step > 0 ? 1 : 0.3 }}
                >
                    {step > 0 ? hiddenStates[step - 1] : '0'}
                </motion.div>

                {/* Arrow */}
                <div className="text-2xl text-slate-600">→</div>

                {/* RNN Cell */}
                <motion.div
                    className="w-28 h-28 rounded-xl bg-green-900 border-2 border-green-500 flex flex-col items-center justify-center"
                    animate={{ scale: isPlaying ? [1, 1.05, 1] : 1 }}
                    transition={{ repeat: isPlaying ? Infinity : 0, duration: 1 }}
                >
                    <div className="text-xs text-green-400 uppercase font-bold">RNN Cell</div>
                    <div className="text-lg text-white font-mono mt-1">{words[step]}</div>
                </motion.div>

                {/* Arrow */}
                <div className="text-2xl text-slate-600">→</div>

                {/* Current Hidden State */}
                <motion.div
                    className="w-20 h-20 rounded-full bg-purple-600 border-2 border-purple-400 flex items-center justify-center font-mono text-white"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ repeat: Infinity, duration: 1 }}
                >
                    {hiddenStates[step]}
                </motion.div>
            </div>

            {/* Description */}
            <div className="text-center text-sm text-slate-400 max-w-md">
                <strong className="text-purple-400">Hidden state</strong> carries memory forward.
                <br />
                Each step: New word + Previous memory → Updated memory
            </div>

            {/* Controls */}
            <div className="flex gap-4">
                <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className={`px-6 py-3 rounded-lg font-bold ${isPlaying ? 'bg-red-600' : 'bg-green-600'} text-white`}
                >
                    {isPlaying ? '⏸ Pause' : '▶ Play'}
                </button>
                <button
                    onClick={() => setStep((step + 1) % words.length)}
                    className="px-6 py-3 rounded-lg font-bold bg-slate-700 text-white"
                >
                    Step →
                </button>
            </div>
        </div>
    );
};
