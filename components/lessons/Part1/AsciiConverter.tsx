import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface AsciiConverterProps {
    onComplete?: () => void;
}

export const AsciiConverter: React.FC<AsciiConverterProps> = ({ onComplete }) => {
    const [text, setText] = useState('AI');

    return (
        <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">
                    Input Text
                </label>
                <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    maxLength={10}
                    className="w-full bg-slate-950 border-b-2 border-indigo-500 text-4xl font-mono text-white p-2 focus:outline-none placeholder-slate-700"
                    placeholder="Type here..."
                />
                <p className="text-xs text-slate-500 mt-2">Max 10 characters.</p>
            </div>

            <div className="space-y-2">
                {text.split('').map((char, index) => {
                    const ascii = char.charCodeAt(0);
                    const binary = ascii.toString(2).padStart(8, '0');

                    return (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-center justify-between bg-slate-800/50 p-4 rounded-lg border border-slate-700 hover:border-indigo-500/50 transition-colors"
                        >
                            <div className="w-12 h-12 flex items-center justify-center bg-indigo-600 rounded text-2xl font-bold text-white shadow-lg">
                                {char}
                            </div>

                            <div className="flex-1 px-8 flex justify-center">
                                <div className="flex flex-col items-center">
                                    <span className="text-xs text-slate-500 uppercase">ASCII</span>
                                    <span className="text-2xl font-mono text-indigo-300 font-bold">{ascii}</span>
                                </div>
                            </div>

                            <div className="flex flex-col items-end">
                                <span className="text-xs text-slate-500 uppercase">Binary</span>
                                <div className="flex gap-1">
                                    {binary.split('').map((bit, i) => (
                                        <span
                                            key={i}
                                            className={`
                        w-6 h-8 flex items-center justify-center rounded text-sm font-mono border
                        ${bit === '1'
                                                    ? 'bg-green-900/30 border-green-500/50 text-green-400'
                                                    : 'bg-slate-900 border-slate-800 text-slate-600'
                                                }
                      `}
                                        >
                                            {bit}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            <div className="text-center p-4 bg-slate-900/50 rounded-lg border border-slate-800 text-sm text-slate-400">
                <span className="text-indigo-400 font-bold">Concept:</span> Every letter is just a number. The computer doesn't know "A", it only knows "65".
            </div>
        </div>
    );
};
