import React from 'react';
import { motion } from 'framer-motion';

export const TransformerArchViz: React.FC = () => {
    return (
        <div className="flex flex-col items-center gap-6 w-full max-w-2xl mx-auto">

            <div className="relative w-full bg-slate-900 p-8 rounded-2xl border border-slate-800">
                {/* Encoder */}
                <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
                    {/* Encoder Stack */}
                    <div className="flex flex-col items-center gap-2">
                        <div className="text-xs text-blue-400 uppercase font-bold mb-2">Encoder</div>
                        {[1, 2, 3].map(i => (
                            <motion.div
                                key={i}
                                className="w-32 h-12 rounded-lg bg-blue-900/50 border border-blue-700 flex items-center justify-center text-xs text-blue-300"
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: i * 0.2 }}
                            >
                                Self-Attention
                            </motion.div>
                        ))}
                        <div className="text-[10px] text-slate-500 mt-2">"Reads the input"</div>
                    </div>

                    {/* Arrow */}
                    <div className="text-3xl text-slate-600 rotate-90 md:rotate-0">→</div>

                    {/* Decoder Stack */}
                    <div className="flex flex-col items-center gap-2">
                        <div className="text-xs text-green-400 uppercase font-bold mb-2">Decoder</div>
                        {[1, 2, 3].map(i => (
                            <motion.div
                                key={i}
                                className="w-32 h-12 rounded-lg bg-green-900/50 border border-green-700 flex items-center justify-center text-xs text-green-300"
                                initial={{ x: 20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: i * 0.2 }}
                            >
                                {i === 2 ? 'Cross-Attention' : 'Self-Attention'}
                            </motion.div>
                        ))}
                        <div className="text-[10px] text-slate-500 mt-2">"Generates the output"</div>
                    </div>
                </div>
            </div>

            {/* Model Types */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                <div className="bg-blue-950 p-4 rounded-xl border border-blue-800 text-center">
                    <div className="font-bold text-blue-400 mb-1">BERT</div>
                    <div className="text-xs text-slate-400">Encoder Only</div>
                    <div className="text-[10px] text-slate-500 mt-1">Understanding</div>
                </div>
                <div className="bg-green-950 p-4 rounded-xl border border-green-800 text-center">
                    <div className="font-bold text-green-400 mb-1">GPT</div>
                    <div className="text-xs text-slate-400">Decoder Only</div>
                    <div className="text-[10px] text-slate-500 mt-1">Generation</div>
                </div>
                <div className="bg-purple-950 p-4 rounded-xl border border-purple-800 text-center">
                    <div className="font-bold text-purple-400 mb-1">T5 / BART</div>
                    <div className="text-xs text-slate-400">Encoder + Decoder</div>
                    <div className="text-[10px] text-slate-500 mt-1">Translation</div>
                </div>
            </div>

            <p className="text-xs text-slate-400 text-center max-w-md">
                The <strong>Transformer</strong> architecture powers all modern LLMs.
                <br />
                GPT uses only the <strong className="text-green-400">Decoder</strong> to generate text.
            </p>
        </div>
    );
};
