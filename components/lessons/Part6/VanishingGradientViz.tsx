import React, { useState } from 'react';
import { motion } from 'framer-motion';

export const VanishingGradientViz: React.FC = () => {
    const [numLayers, setNumLayers] = useState(5);
    const [activationType, setActivationType] = useState<'sigmoid' | 'relu'>('sigmoid');

    // Gradient magnitude at each layer (backwards)
    const gradients = Array(numLayers).fill(0).map((_, i) => {
        const layerFromEnd = numLayers - 1 - i;
        if (activationType === 'sigmoid') {
            return Math.pow(0.25, layerFromEnd); // Sigmoid derivative max ~0.25
        } else {
            return 1; // ReLU derivative = 1 for positive
        }
    });

    return (
        <div className="flex flex-col items-center gap-8 w-full max-w-3xl mx-auto">

            {/* Network Visualization */}
            <div className="flex items-center justify-center gap-2 w-full overflow-x-auto p-4">
                {gradients.map((grad, i) => (
                    <div key={i} className="flex flex-col items-center gap-2">
                        {/* Layer Node */}
                        <motion.div
                            className="w-12 h-12 rounded-full border-2 flex items-center justify-center font-bold text-xs"
                            style={{
                                backgroundColor: i === 0 ? '#ef4444' : i === numLayers - 1 ? '#3b82f6' : '#334155',
                                borderColor: i === 0 ? '#fca5a5' : i === numLayers - 1 ? '#93c5fd' : '#64748b',
                                color: 'white'
                            }}
                            animate={{ scale: grad > 0.01 ? 1 : 0.8, opacity: grad > 0.01 ? 1 : 0.3 }}
                        >
                            L{i}
                        </motion.div>

                        {/* Gradient Bar */}
                        <div className="w-10 h-24 bg-slate-800 rounded relative overflow-hidden border border-slate-700">
                            <motion.div
                                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-green-500 to-lime-400"
                                animate={{ height: `${Math.min(grad * 100, 100)}%` }}
                                transition={{ type: 'spring' }}
                            />
                            <div className="absolute inset-0 flex items-end justify-center pb-1 text-[8px] font-mono text-white">
                                {grad.toFixed(grad < 0.01 ? 4 : 2)}
                            </div>
                        </div>
                    </div>
                ))}

                {/* Arrow indicating flow direction */}
                <div className="text-2xl text-yellow-500 ml-4">← Gradient Flow</div>
            </div>

            {/* Controls */}
            <div className="flex flex-wrap gap-8 items-center justify-center bg-slate-900 p-6 rounded-xl border border-slate-800 w-full">
                <div>
                    <label className="text-xs text-slate-500 uppercase font-bold block mb-2">Layers</label>
                    <input
                        type="range" min="3" max="10" value={numLayers}
                        onChange={(e) => setNumLayers(parseInt(e.target.value))}
                        className="accent-blue-500"
                    />
                    <div className="text-sm font-mono text-center">{numLayers}</div>
                </div>

                <div>
                    <label className="text-xs text-slate-500 uppercase font-bold block mb-2">Activation</label>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setActivationType('sigmoid')}
                            className={`px-3 py-2 rounded text-sm font-bold ${activationType === 'sigmoid' ? 'bg-pink-500 text-white' : 'bg-slate-800 text-slate-400'}`}
                        >Sigmoid</button>
                        <button
                            onClick={() => setActivationType('relu')}
                            className={`px-3 py-2 rounded text-sm font-bold ${activationType === 'relu' ? 'bg-green-500 text-white' : 'bg-slate-800 text-slate-400'}`}
                        >ReLU</button>
                    </div>
                </div>
            </div>

            <p className="text-xs text-slate-400 text-center max-w-md">
                With <strong className="text-pink-400">Sigmoid</strong>, the gradient shrinks exponentially—early layers stop learning.
                <br />
                With <strong className="text-green-400">ReLU</strong>, the gradient stays strong through all layers.
            </p>
        </div>
    );
};
