import React, { useState } from 'react';
import { motion } from 'framer-motion';

export const LstmViz: React.FC = () => {
    const [forgetGate, setForgetGate] = useState(0.3);
    const [inputGate, setInputGate] = useState(0.8);
    const [outputGate, setOutputGate] = useState(0.6);

    // Simulated cell state
    const oldMemory = 0.7;
    const newInfo = 0.9;
    const cellState = oldMemory * forgetGate + newInfo * inputGate;
    const output = Math.tanh(cellState) * outputGate;

    return (
        <div className="flex flex-col items-center gap-8 w-full max-w-3xl mx-auto">

            {/* LSTM Cell Visualization */}
            <div className="relative w-full h-64 bg-slate-900 rounded-2xl border border-slate-800 p-6">

                {/* Cell State (Top line) */}
                <div className="absolute top-6 left-0 right-0 flex items-center justify-center">
                    <div className="h-2 w-3/4 bg-gradient-to-r from-purple-600 via-purple-400 to-purple-600 rounded-full relative">
                        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs text-purple-300 font-bold">
                            Cell State (Memory Highway)
                        </div>
                    </div>
                </div>

                {/* Gates */}
                <div className="flex justify-around items-center h-full pt-12">
                    {/* Forget Gate */}
                    <motion.div
                        className="flex flex-col items-center gap-2"
                        animate={{ opacity: 0.5 + forgetGate * 0.5 }}
                    >
                        <div className="w-16 h-16 rounded-lg bg-red-900 border-2 border-red-500 flex items-center justify-center">
                            <span className="text-2xl">🗑️</span>
                        </div>
                        <div className="text-xs text-red-400 font-bold uppercase">Forget</div>
                        <div className="text-lg font-mono text-white">{forgetGate.toFixed(1)}</div>
                    </motion.div>

                    {/* Input Gate */}
                    <motion.div
                        className="flex flex-col items-center gap-2"
                        animate={{ opacity: 0.5 + inputGate * 0.5 }}
                    >
                        <div className="w-16 h-16 rounded-lg bg-green-900 border-2 border-green-500 flex items-center justify-center">
                            <span className="text-2xl">📥</span>
                        </div>
                        <div className="text-xs text-green-400 font-bold uppercase">Input</div>
                        <div className="text-lg font-mono text-white">{inputGate.toFixed(1)}</div>
                    </motion.div>

                    {/* Output Gate */}
                    <motion.div
                        className="flex flex-col items-center gap-2"
                        animate={{ opacity: 0.5 + outputGate * 0.5 }}
                    >
                        <div className="w-16 h-16 rounded-lg bg-blue-900 border-2 border-blue-500 flex items-center justify-center">
                            <span className="text-2xl">📤</span>
                        </div>
                        <div className="text-xs text-blue-400 font-bold uppercase">Output</div>
                        <div className="text-lg font-mono text-white">{outputGate.toFixed(1)}</div>
                    </motion.div>
                </div>
            </div>

            {/* Controls */}
            <div className="grid grid-cols-3 gap-6 w-full bg-slate-900 p-6 rounded-xl border border-slate-800">
                <div>
                    <label className="text-xs text-red-400 uppercase font-bold block mb-1">Forget Gate</label>
                    <input type="range" min="0" max="1" step="0.1" value={forgetGate}
                        onChange={(e) => setForgetGate(parseFloat(e.target.value))}
                        className="w-full accent-red-500"
                    />
                </div>
                <div>
                    <label className="text-xs text-green-400 uppercase font-bold block mb-1">Input Gate</label>
                    <input type="range" min="0" max="1" step="0.1" value={inputGate}
                        onChange={(e) => setInputGate(parseFloat(e.target.value))}
                        className="w-full accent-green-500"
                    />
                </div>
                <div>
                    <label className="text-xs text-blue-400 uppercase font-bold block mb-1">Output Gate</label>
                    <input type="range" min="0" max="1" step="0.1" value={outputGate}
                        onChange={(e) => setOutputGate(parseFloat(e.target.value))}
                        className="w-full accent-blue-500"
                    />
                </div>
            </div>

            {/* Output */}
            <div className="flex gap-8 items-center">
                <div className="text-center">
                    <div className="text-xs text-slate-500 uppercase">Cell State</div>
                    <div className="text-2xl font-mono text-purple-400">{cellState.toFixed(2)}</div>
                </div>
                <div className="text-slate-600">→</div>
                <div className="text-center">
                    <div className="text-xs text-slate-500 uppercase">Output</div>
                    <div className="text-2xl font-mono text-white">{output.toFixed(2)}</div>
                </div>
            </div>

            <p className="text-xs text-slate-400 text-center max-w-md">
                <strong className="text-red-400">Forget</strong> clears old memory.
                <strong className="text-green-400"> Input</strong> adds new info.
                <strong className="text-blue-400"> Output</strong> controls what to reveal.
            </p>
        </div>
    );
};
