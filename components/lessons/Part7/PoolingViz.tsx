import React, { useState } from 'react';
import { motion } from 'framer-motion';

export const PoolingViz: React.FC = () => {
    const [poolType, setPoolType] = useState<'max' | 'avg'>('max');
    const [step, setStep] = useState(0);

    const input = [
        [1, 3, 2, 4],
        [5, 6, 1, 2],
        [2, 4, 3, 1],
        [1, 2, 1, 1],
    ];

    const poolSize = 2;
    const outputSize = input.length / poolSize;

    const pool = (startRow: number, startCol: number) => {
        const window = [
            input[startRow][startCol],
            input[startRow][startCol + 1],
            input[startRow + 1][startCol],
            input[startRow + 1][startCol + 1],
        ];
        if (poolType === 'max') return Math.max(...window);
        return window.reduce((a, b) => a + b, 0) / 4;
    };

    const output = Array(outputSize).fill(0).map((_, r) =>
        Array(outputSize).fill(0).map((_, c) => pool(r * 2, c * 2))
    );

    const currentRow = Math.floor(step / outputSize) * 2;
    const currentCol = (step % outputSize) * 2;

    return (
        <div className="flex flex-col items-center gap-8 w-full max-w-2xl mx-auto">

            <div className="flex flex-wrap items-center justify-center gap-8">
                {/* Input Grid */}
                <div className="flex flex-col items-center">
                    <div className="text-xs text-slate-400 mb-2">Input (4x4)</div>
                    <div className="grid grid-cols-4 gap-1">
                        {input.map((row, r) =>
                            row.map((val, c) => {
                                const inWindow = r >= currentRow && r < currentRow + 2 && c >= currentCol && c < currentCol + 2;
                                const isMax = poolType === 'max' && inWindow && val === pool(currentRow, currentCol);
                                return (
                                    <motion.div
                                        key={`${r}-${c}`}
                                        className={`w-12 h-12 flex items-center justify-center font-bold text-lg rounded border-2 transition-all
                                            ${inWindow ? 'ring-2 ring-yellow-400 bg-yellow-500/20' : 'bg-slate-800'}
                                            ${isMax ? 'bg-green-500 text-white border-green-400' : 'border-slate-700'}
                                        `}
                                    >
                                        {val}
                                    </motion.div>
                                );
                            })
                        )}
                    </div>
                </div>

                <div className="text-3xl text-slate-600">→</div>

                {/* Output Grid */}
                <div className="flex flex-col items-center">
                    <div className="text-xs text-slate-400 mb-2">Output (2x2)</div>
                    <div className="grid grid-cols-2 gap-1">
                        {output.map((row, r) =>
                            row.map((val, c) => {
                                const isCurrent = r === Math.floor(step / outputSize) && c === step % outputSize;
                                return (
                                    <motion.div
                                        key={`${r}-${c}`}
                                        className={`w-12 h-12 flex items-center justify-center font-bold text-lg rounded border-2
                                            ${isCurrent ? 'bg-green-500 text-white border-green-400 scale-110' : 'bg-slate-800 border-slate-700'}
                                        `}
                                        animate={{ scale: isCurrent ? 1.1 : 1 }}
                                    >
                                        {val.toFixed(poolType === 'avg' ? 1 : 0)}
                                    </motion.div>
                                );
                            })
                        )}
                    </div>
                </div>
            </div>

            {/* Controls */}
            <div className="flex flex-wrap gap-4 items-center justify-center">
                <div className="flex gap-2 bg-slate-900 p-1 rounded-lg">
                    <button onClick={() => setPoolType('max')} className={`px-4 py-2 rounded font-bold text-sm ${poolType === 'max' ? 'bg-green-600 text-white' : 'text-slate-400'}`}>
                        Max Pool
                    </button>
                    <button onClick={() => setPoolType('avg')} className={`px-4 py-2 rounded font-bold text-sm ${poolType === 'avg' ? 'bg-blue-600 text-white' : 'text-slate-400'}`}>
                        Avg Pool
                    </button>
                </div>

                <div className="flex gap-2">
                    <button onClick={() => setStep(Math.max(0, step - 1))} className="px-4 py-2 bg-slate-800 rounded font-bold">←</button>
                    <div className="px-4 py-2 text-slate-400 font-mono">Step {step + 1} / 4</div>
                    <button onClick={() => setStep(Math.min(3, step + 1))} className="px-4 py-2 bg-slate-800 rounded font-bold">→</button>
                </div>
            </div>

            <p className="text-xs text-slate-400 text-center">
                <strong className="text-green-400">Max Pool</strong> keeps the strongest activation. <strong className="text-blue-400">Avg Pool</strong> smooths.
            </p>
        </div>
    );
};
