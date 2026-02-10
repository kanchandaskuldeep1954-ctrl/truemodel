import React from 'react';
import { AttentionHeatmap } from '../AttentionHeatmap';

// --- Module 8.1: Transformers ---

export const TransformerLesson: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
    return (
        <div className="flex flex-col items-center gap-8 w-full max-w-4xl">
            <div className="text-center">
                <h2 className="text-2xl font-black text-white mb-2">Attention Is All You Need</h2>
                <p className="text-slate-400 text-sm max-w-2xl mx-auto">
                    RNNs read one word at a time (slow, forgetful).
                    <br />
                    **Transformers** (like GPT) read the **entire sentence at once**.
                    They uses **"Self-Attention"** to understand relationships between words, no matter how far apart they are.
                </p>
            </div>

            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 w-full">
                <AttentionHeatmap
                    tokens={["The", "animal", "did", "not", "cross", "the", "street", "because", "it", "was", "too", "tired"]}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                <div className="bg-slate-800 p-4 rounded-xl">
                    <h3 className="font-bold text-white mb-1">Understanding Context</h3>
                    <p className="text-xs text-slate-400">
                        In the sentence above, what does <strong>"it"</strong> refer to?
                        <br />
                        Hover over "it". See how the AI focuses on "animal"?
                        <br />
                        If you changed "tired" to "wide", "it" would focus on "street".
                    </p>
                </div>
                <div className="bg-slate-800 p-4 rounded-xl">
                    <h3 className="font-bold text-white mb-1">Parallel Processing</h3>
                    <p className="text-xs text-slate-400">
                        Because Transformers don't need to wait for the previous word, they can process massive amounts of data in parallel (on GPUs). This is why ChatGPT serves millions of people instantly.
                    </p>
                </div>
            </div>

            <button onClick={onComplete} className="px-6 py-3 bg-green-600 hover:bg-green-500 text-white font-bold rounded-xl transition-colors">
                I UNDERSTAND →
            </button>
        </div>
    );
};
