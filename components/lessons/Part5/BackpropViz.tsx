import React, { useState } from 'react';
import { motion } from 'framer-motion';

export const BackpropViz: React.FC = () => {
    const [step, setStep] = useState(0);

    const nodes = [
        { id: 'input', label: 'Input', x: 50, y: 100, color: '#3b82f6' },
        { id: 'hidden', label: 'Hidden', x: 200, y: 100, color: '#8b5cf6' },
        { id: 'output', label: 'Output', x: 350, y: 100, color: '#22c55e' },
        { id: 'loss', label: 'Loss', x: 500, y: 100, color: '#ef4444' },
    ];

    const forwardFlow = step < 3;
    const highlightIdx = forwardFlow ? step : (6 - step);

    return (
        <div className="flex flex-col items-center gap-8 w-full max-w-3xl mx-auto">

            {/* Visualization */}
            <div className="relative w-full h-56 bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
                {/* Nodes */}
                {nodes.map((node, i) => (
                    <motion.div
                        key={node.id}
                        className="absolute w-20 h-20 rounded-full flex items-center justify-center font-bold text-xs text-white border-2"
                        style={{
                            left: node.x,
                            top: node.y - 40,
                            backgroundColor: i === highlightIdx ? node.color : '#1e293b',
                            borderColor: node.color,
                            boxShadow: i === highlightIdx ? `0 0 30px ${node.color}` : 'none'
                        }}
                        animate={{ scale: i === highlightIdx ? 1.1 : 1 }}
                    >
                        {node.label}
                    </motion.div>
                ))}

                {/* Arrows */}
                {[0, 1, 2].map((i) => (
                    <div key={i} className="absolute h-1 bg-slate-700" style={{
                        left: nodes[i].x + 70,
                        top: nodes[i].y,
                        width: nodes[i + 1].x - nodes[i].x - 70,
                    }}>
                        {/* Direction indicator */}
                        <motion.div
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: forwardFlow ? '#22c55e' : '#ef4444' }}
                            animate={{ x: forwardFlow ? [0, 50, 100] : [100, 50, 0], opacity: [1, 1, 0] }}
                            transition={{ duration: 1, repeat: Infinity }}
                        />
                    </div>
                ))}

                {/* Mode Label */}
                <div className={`absolute top-2 right-2 px-3 py-1 rounded-full text-xs font-bold uppercase ${forwardFlow ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                    {forwardFlow ? 'Forward Pass →' : '← Backward Pass'}
                </div>
            </div>

            {/* Step Description */}
            <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 w-full text-center">
                {step === 0 && <p><strong className="text-blue-400">Input</strong> receives the data (e.g., pixels).</p>}
                {step === 1 && <p><strong className="text-purple-400">Hidden Layer</strong> transforms the data using weights + activation.</p>}
                {step === 2 && <p><strong className="text-green-400">Output</strong> makes a prediction (e.g., "Cat: 0.8").</p>}
                {step === 3 && <p><strong className="text-red-400">Loss</strong> measures error (e.g., "Should have been 1.0, error = 0.2").</p>}
                {step === 4 && <p>Error gradient flows <strong className="text-red-400">backward</strong> to Output.</p>}
                {step === 5 && <p>Gradient propagates to <strong className="text-purple-400">Hidden</strong> layer (Chain Rule!).</p>}
                {step === 6 && <p>Weights at <strong className="text-blue-400">Input</strong> layer are updated. Done!</p>}
            </div>

            {/* Controls */}
            <div className="flex gap-4">
                <button
                    onClick={() => setStep(Math.max(0, step - 1))}
                    disabled={step === 0}
                    className="px-6 py-3 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-white font-bold"
                >
                    ← Back
                </button>
                <div className="flex items-center px-4 text-slate-400 font-mono">
                    Step {step + 1} / 7
                </div>
                <button
                    onClick={() => setStep(Math.min(6, step + 1))}
                    disabled={step === 6}
                    className="px-6 py-3 rounded-lg bg-indigo-500 hover:bg-indigo-600 disabled:opacity-50 text-white font-bold"
                >
                    Next →
                </button>
            </div>
        </div>
    );
};
