import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Cat, Dog } from 'lucide-react';

// --- Shared Components ---

// --- Step 1: Logistic Regression Intro ---
export const LogisticIntroAnim = () => {
    return (
        <div className="relative w-full h-[300px] bg-slate-900 rounded-xl overflow-hidden flex items-center justify-center">
            {/* Sigmoid Curve */}
            <svg viewBox="0 0 100 50" className="w-full h-full absolute">
                <path
                    d="M0,50 C40,50 60,0 100,0"
                    fill="none"
                    stroke="#6366f1"
                    strokeWidth="2"
                    vectorEffect="non-scaling-stroke"
                />
            </svg>

            {/* Particles being sorted */}
            <motion.div
                className="absolute left-10 bottom-10"
                animate={{ x: [0, 100, 200], y: [0, 0, -50], opacity: [1, 1, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
            >
                <Cat className="w-6 h-6 text-blue-400" />
            </motion.div>

            <motion.div
                className="absolute left-10 bottom-10"
                animate={{ x: [0, 100, 200], y: [0, 0, 50], opacity: [1, 1, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            >
                <Dog className="w-6 h-6 text-orange-400" />
            </motion.div>

            <div className="absolute top-4 bg-black/50 px-2 py-1 rounded text-xs font-mono text-indigo-400">
                Sigmoid Function: Probability Squasher
            </div>
        </div>
    );
};

// --- Step 2: Interactive Classifier ---
export const ClassificationPlayground = ({ onComplete }: { onComplete: () => void }) => {
    const [threshold, setThreshold] = useState(0.5);
    const [score, setScore] = useState(0);

    // Mock Data: [Value, Type (0=Cat, 1=Dog)]
    // Cats are smaller (left), Dogs are bigger (right)
    const data = [
        { val: 0.1, type: 0 }, { val: 0.2, type: 0 }, { val: 0.35, type: 0 },
        { val: 0.65, type: 1 }, { val: 0.8, type: 1 }, { val: 0.9, type: 1 }
    ];

    // Check accuracy
    useEffect(() => {
        let correct = 0;
        data.forEach(d => {
            const prediction = d.val > threshold ? 1 : 0;
            if (prediction === d.type) correct++;
        });
        setScore(correct);

        if (correct === data.length) {
            setTimeout(onComplete, 1000);
        }
    }, [threshold, onComplete]);

    return (
        <div className="flex flex-col items-center gap-8 w-full max-w-2xl">
            <div className="w-full h-[200px] bg-slate-800 rounded-xl relative border border-slate-700 flex items-center px-10">
                {/* The Threshold Line */}
                <motion.div
                    layout
                    className="absolute top-0 bottom-0 w-1 bg-white z-20 shadow-[0_0_15px_rgba(255,255,255,0.5)]"
                    style={{ left: `${threshold * 100}%` }}
                >
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold bg-white text-black px-2 rounded">
                        {threshold.toFixed(2)}
                    </div>
                </motion.div>

                {/* Data Points */}
                {data.map((d, i) => (
                    <div
                        key={i}
                        className={`absolute w-8 h-8 rounded-full flex items-center justify-center shadow-lg transition-all duration-300
                            ${d.type === 0 ? 'bg-blue-500/20 text-blue-400 border border-blue-500' : 'bg-orange-500/20 text-orange-400 border border-orange-500'}
                            ${(d.val > threshold ? 1 : 0) === d.type ? 'opacity-100 scale-100' : 'opacity-50 scale-90 grayscale'}
                        `}
                        style={{ left: `${d.val * 100}%` }}
                    >
                        {d.type === 0 ? <Cat className="w-4 h-4" /> : <Dog className="w-4 h-4" />}
                    </div>
                ))}

                {/* Zones */}
                <div className="absolute inset-0 flex pointer-events-none">
                    <div className="flex-1 bg-blue-500/5 border-r border-white/10 flex items-end p-2 text-blue-500/50 font-black text-4xl uppercase">
                        CATS
                    </div>
                    <div className="flex-1 bg-orange-500/5 flex items-end justify-end p-2 text-orange-500/50 font-black text-4xl uppercase">
                        DOGS
                    </div>
                </div>
            </div>

            {/* Controls */}
            <div className="w-full bg-slate-900/50 p-6 rounded-xl border border-slate-800">
                <label className="text-white font-bold text-xs uppercase mb-2 block">Decision Boundary (Threshold)</label>
                <input
                    type="range" min="0" max="1" step="0.05"
                    value={threshold} onChange={(e) => setThreshold(parseFloat(e.target.value))}
                    className="w-full accent-white h-2 bg-slate-700 rounded-full appearance-none cursor-pointer"
                />
            </div>

            <div className="text-center">
                <div className="text-4xl font-black text-white mb-1">{score} / {data.length}</div>
                <div className="text-xs text-slate-500 uppercase tracking-widest">Correct Predictions</div>
            </div>

            {score === data.length && (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-green-400 font-black text-2xl">
                    ALL CLASSIFIED CORRECTLY!
                </motion.div>
            )}
        </div>
    );
};
