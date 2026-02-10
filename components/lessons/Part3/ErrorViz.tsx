import React, { useState } from 'react';
import { motion } from 'framer-motion';

export const ErrorViz: React.FC = () => {
    const [guess, setGuess] = useState(50);
    const TARGET = 80;

    const error = guess - TARGET;
    const squaredError = error ** 2;

    return (
        <div className="flex flex-col gap-12 w-full max-w-3xl mx-auto items-center">

            {/* Visualization Area */}
            <div className="relative w-full h-32 bg-slate-900 rounded-xl border border-slate-800 flex items-center px-12">
                {/* Target Marker */}
                <div
                    className="absolute top-0 bottom-0 w-1 bg-green-500 z-10"
                    style={{ left: `${TARGET}%` }}
                >
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-green-400 font-bold text-xs uppercase tracking-widest">Target</div>
                </div>

                {/* Guess Marker */}
                <motion.div
                    className="absolute top-2 bottom-2 w-2 bg-indigo-500 rounded cursor-grab active:cursor-grabbing z-20 shadow-[0_0_15px_rgba(99,102,241,0.5)]"
                    style={{ left: `${guess}%` }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 300 }} // Approximate constraint, better to control via slider
                // For simplicity in this demo, we use the slider below for control, this is just visual
                >
                    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-indigo-400 font-bold text-xs uppercase tracking-widest">Guess</div>
                </motion.div>

                {/* Error Bar */}
                <div
                    className="absolute h-4 bg-red-500/30 border border-red-500/50 rounded"
                    style={{
                        left: `${Math.min(guess, TARGET)}%`,
                        width: `${Math.abs(error)}%`
                    }}
                />
            </div>

            {/* Controls */}
            <div className="w-full">
                <input
                    type="range"
                    min="0" max="100"
                    value={guess}
                    onChange={(e) => setGuess(parseInt(e.target.value))}
                    className="w-full accent-indigo-500 h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer"
                />
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-4 w-full">
                <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 text-center">
                    <div className="text-xs text-slate-500 uppercase font-bold mb-1">Guess</div>
                    <div className="text-3xl font-mono text-white">{guess}</div>
                </div>
                <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 text-center">
                    <div className="text-xs text-slate-500 uppercase font-bold mb-1">Error</div>
                    <div className="text-3xl font-mono text-red-300">{error}</div>
                </div>
                <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-red-500/10" style={{ opacity: Math.min(squaredError / 2000, 1) }}></div>
                    <div className="text-xs text-slate-500 uppercase font-bold mb-1 relative z-10">Squared Error (Loss)</div>
                    <div className="text-3xl font-mono text-red-500 font-bold relative z-10">{squaredError}</div>
                </div>
            </div>

            <div className="text-center text-slate-400 text-sm max-w-md">
                Try to make the <strong>Loss</strong> zero by moving the guess to the target.
                Notice how the Loss grows much faster than the Error.
            </div>

        </div>
    );
};
