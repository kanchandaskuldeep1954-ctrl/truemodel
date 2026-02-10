import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SequenceVisualizerProps {
    inputSequence?: string[]; // e.g. ["The", "cat", "sat"]
    hiddenStateDim?: number;
    onStepChange?: (step: number) => void;
    readOnly?: boolean;
}

export const SequenceVisualizer: React.FC<SequenceVisualizerProps> = ({
    inputSequence = ["The", "cat", "sat", "on", "the", "mat"],
    hiddenStateDim = 4,
    onStepChange,
    readOnly = false
}) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);

    // Simulate hidden state memory accumulating
    const [memoryState, setMemoryState] = useState<number[]>(Array(hiddenStateDim).fill(0));

    useEffect(() => {
        if (!isPlaying) return;
        const interval = setInterval(() => {
            setCurrentStep(prev => {
                const next = prev + 1;
                if (next >= inputSequence.length) {
                    setIsPlaying(false);
                    return 0;
                }
                return next;
            });
        }, 1000);
        return () => clearInterval(interval);
    }, [isPlaying, inputSequence.length]);

    // Update memory simulation on step change
    useEffect(() => {
        if (currentStep === 0) {
            setMemoryState(Array(hiddenStateDim).fill(0));
        } else {
            // Add some "random" memory based on the word
            setMemoryState(prev => prev.map(v => Math.min(1, v + Math.random() * 0.3)));
        }
        onStepChange?.(currentStep);
    }, [currentStep, hiddenStateDim]);

    return (
        <div className="flex flex-col items-center gap-8 w-full">
            {/* Timeline */}
            <div className="flex gap-2 overflow-x-auto p-4 w-full justify-center">
                {inputSequence.map((word, i) => (
                    <motion.div
                        key={i}
                        animate={{
                            scale: i === currentStep ? 1.2 : 1,
                            opacity: i > currentStep ? 0.3 : 1,
                            y: i === currentStep ? -10 : 0
                        }}
                        className={`px-4 py-2 rounded-lg font-bold text-sm border transition-colors duration-300
                            ${i === currentStep ? 'bg-indigo-600 border-indigo-400 text-white shadow-lg shadow-indigo-500/50' :
                                i < currentStep ? 'bg-slate-800 border-slate-700 text-slate-400' :
                                    'bg-slate-900 border-slate-800 text-slate-600'}
                        `}
                    >
                        {word}
                    </motion.div>
                ))}
            </div>

            {/* RNN Unit Visualization */}
            <div className="relative w-64 h-48 bg-slate-800 rounded-2xl border border-slate-700 p-6 flex items-center justify-center">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xs text-slate-500 bg-slate-900 px-2">RNN CELL</div>

                {/* Inputs */}
                <motion.div
                    key={`in-${currentStep}`}
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="absolute bottom-4 left-4 text-xs font-mono text-green-400"
                >
                    Input: "{inputSequence[currentStep]}"
                </motion.div>

                {/* Hidden State (Memory) */}
                <div className="grid grid-cols-2 gap-2">
                    {memoryState.map((val, i) => (
                        <motion.div
                            key={i}
                            animate={{ opacity: 0.3 + val * 0.7, scale: 0.8 + val * 0.2 }}
                            className="w-8 h-8 rounded-full bg-purple-500"
                        />
                    ))}
                </div>
                <div className="absolute top-4 right-4 text-xs font-mono text-purple-400">
                    Memory
                </div>

                {/* Looping Arrow for Recurrence */}
                <svg className="absolute w-full h-full pointer-events-none overflow-visible">
                    <motion.path
                        d="M 180 50 C 220 50, 220 150, 180 150"
                        fill="none"
                        stroke="#8b5cf6"
                        strokeWidth="2"
                        strokeDasharray="4 4"
                        animate={{ strokeDashoffset: [0, -8] }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    />
                </svg>
            </div>

            {/* Controls */}
            <div className="flex gap-4">
                <button
                    onClick={() => {
                        if (currentStep >= inputSequence.length - 1) setCurrentStep(0);
                        setIsPlaying(!isPlaying);
                    }}
                    className={`px-4 py-2 rounded-lg font-bold text-white transition-colors
                        ${isPlaying ? 'bg-red-600 hover:bg-red-500' : 'bg-green-600 hover:bg-green-500'}
                    `}
                >
                    {isPlaying ? 'Pause' : (currentStep >= inputSequence.length - 1 ? '↺ Replay' : '▶ Play Sequence')}
                </button>
            </div>

            <div className="text-center text-xs text-slate-500 max-w-lg">
                Unlike normal Neural Networks, RNNs have **Memory**.
                <br />
                They take the current input ("{inputSequence[currentStep]}") AND the previous memory state to produce the next output.
            </div>
        </div>
    );
};
