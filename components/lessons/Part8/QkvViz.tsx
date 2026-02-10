import React, { useState } from 'react';
import { motion } from 'framer-motion';

export const QkvViz: React.FC = () => {
    const [selectedWord, setSelectedWord] = useState<number>(0);
    const words = ['The', 'cat', 'sat'];

    // Simulated Q, K, V vectors (simplified to 1D for visualization)
    const Q = [[0.8, 0.2, 0.1], [0.3, 0.9, 0.4], [0.1, 0.3, 0.85]]; // Query for each word
    const K = [[0.85, 0.3, 0.1], [0.2, 0.9, 0.3], [0.15, 0.35, 0.9]]; // Key for each word
    const V = [0.5, 0.8, 0.6]; // Value output

    // Compute attention scores for selected word
    const scores = K.map((k, i) => Q[selectedWord][i]); // Simplified dot product
    const maxScore = Math.max(...scores);
    const softmax = scores.map(s => Math.exp(s) / scores.reduce((sum, sc) => sum + Math.exp(sc), 0));

    return (
        <div className="flex flex-col items-center gap-8 w-full max-w-2xl mx-auto">

            {/* Word Selection */}
            <div className="text-center">
                <div className="text-xs text-slate-500 uppercase mb-2">Select a word (Query)</div>
                <div className="flex gap-2 justify-center">
                    {words.map((word, i) => (
                        <button
                            key={i}
                            onClick={() => setSelectedWord(i)}
                            className={`px-4 py-2 rounded-lg font-bold text-lg transition-all ${selectedWord === i
                                    ? 'bg-yellow-500 text-black'
                                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                                }`}
                        >
                            {word}
                        </button>
                    ))}
                </div>
            </div>

            {/* QKV Diagram */}
            <div className="grid grid-cols-3 gap-6 w-full bg-slate-900 p-6 rounded-xl border border-slate-800">
                {/* Query */}
                <div className="flex flex-col items-center gap-2">
                    <div className="w-16 h-16 rounded-lg bg-yellow-900 border-2 border-yellow-500 flex items-center justify-center text-2xl font-bold text-yellow-400">
                        Q
                    </div>
                    <div className="text-xs text-yellow-400 uppercase font-bold">Query</div>
                    <div className="text-[10px] text-slate-500">"What am I looking for?"</div>
                </div>

                {/* Key */}
                <div className="flex flex-col items-center gap-2">
                    <div className="w-16 h-16 rounded-lg bg-blue-900 border-2 border-blue-500 flex items-center justify-center text-2xl font-bold text-blue-400">
                        K
                    </div>
                    <div className="text-xs text-blue-400 uppercase font-bold">Key</div>
                    <div className="text-[10px] text-slate-500">"What do I contain?"</div>
                </div>

                {/* Value */}
                <div className="flex flex-col items-center gap-2">
                    <div className="w-16 h-16 rounded-lg bg-green-900 border-2 border-green-500 flex items-center justify-center text-2xl font-bold text-green-400">
                        V
                    </div>
                    <div className="text-xs text-green-400 uppercase font-bold">Value</div>
                    <div className="text-[10px] text-slate-500">"What do I offer?"</div>
                </div>
            </div>

            {/* Attention Scores */}
            <div className="w-full bg-slate-900 p-4 rounded-xl border border-slate-800">
                <div className="text-xs text-slate-500 uppercase mb-3 text-center">
                    Attention: How much does "<span className="text-yellow-400">{words[selectedWord]}</span>" attend to each word?
                </div>
                <div className="flex justify-around">
                    {words.map((word, i) => (
                        <motion.div
                            key={i}
                            className="flex flex-col items-center gap-2"
                            animate={{ opacity: 0.3 + softmax[i] * 0.7 }}
                        >
                            <div
                                className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-white"
                                style={{
                                    backgroundColor: `rgba(99, 102, 241, ${softmax[i]})`,
                                    transform: `scale(${0.8 + softmax[i] * 0.4})`
                                }}
                            >
                                {word}
                            </div>
                            <div className="text-xs font-mono text-slate-400">
                                {(softmax[i] * 100).toFixed(0)}%
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <p className="text-xs text-slate-400 text-center max-w-md">
                <strong className="text-yellow-400">Q·K</strong> computes similarity.
                High score → Mix in more of that word's <strong className="text-green-400">Value</strong>.
            </p>
        </div>
    );
};
