import React, { useState } from 'react';
import { SequenceVisualizer } from '../SequenceVisualizer';

// --- Module 7.1: Sequence Models ---

export const RNNLesson: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
    return (
        <div className="flex flex-col items-center gap-8 w-full max-w-4xl">
            <div className="text-center">
                <h2 className="text-2xl font-black text-white mb-2">Memory in Machines</h2>
                <p className="text-slate-400 text-sm max-w-2xl mx-auto">
                    Standard Neural Networks have amnesia. They treat every input as brand new.
                    <br />
                    **Recurrent Neural Networks (RNNs)** remember the past. They are crucial for reading text, predicting stock prices, and understanding audio.
                </p>
            </div>

            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 w-full">
                <SequenceVisualizer
                    inputSequence={["The", "quick", "brown", "fox", "jumps", "over", "the", "lazy", "dog"]}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                <div className="bg-slate-800 p-4 rounded-xl">
                    <h3 className="font-bold text-white mb-1"> The "Hidden State"</h3>
                    <p className="text-xs text-slate-400">
                        The purple dots represent the RNN's "Memory".
                        <br />
                        Notice how the memory changes with each word. By the time it sees "dog", it remembers "fox" and "jumps".
                    </p>
                </div>
                <div className="bg-slate-800 p-4 rounded-xl">
                    <h3 className="font-bold text-white mb-1">The Vanishing Gradient</h3>
                    <p className="text-xs text-slate-400">
                        The problem with simple RNNs is they forget. If the sentence is too long, the memory of the first word fades away (Vanishing Gradient).
                        <br />
                        *(That's why we invented LSTMs and Transformers!)*
                    </p>
                </div>
            </div>

            <button onClick={onComplete} className="px-6 py-3 bg-green-600 hover:bg-green-500 text-white font-bold rounded-xl transition-colors">
                I UNDERSTAND →
            </button>
        </div>
    );
};
