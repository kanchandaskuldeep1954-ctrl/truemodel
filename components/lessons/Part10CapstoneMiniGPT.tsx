import React from 'react';
import { MiniGPT } from '../MiniGPT';

// --- Capstone 2: Mini-GPT ---

export const MiniGPTLesson: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
    return (
        <div className="flex flex-col items-center gap-8 w-full max-w-5xl">
            <div className="text-center">
                <h2 className="text-3xl font-black text-white mb-2">Capstone: Mini-GPT</h2>
                <p className="text-slate-400 text-sm max-w-2xl mx-auto">
                    A peek inside the brain of a Large Language Model.
                    <br />
                    Watch how it calculates the probability of every possible next word (Token) and picks the best one.
                </p>
            </div>

            <div className="w-full">
                <MiniGPT />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                <div className="bg-slate-800 p-4 rounded-xl">
                    <h3 className="font-bold text-white mb-1">Token Probabilities</h3>
                    <p className="text-xs text-slate-400">
                        Look at the bars on the right. When the model types, it's not "thinking" a whole thought.
                        It's just guessing: "What is the most likely word to come next?"
                        <br />
                        (e.g., after "I am", "a" is 95% likely).
                    </p>
                </div>
                <div className="bg-slate-800 p-4 rounded-xl">
                    <h3 className="font-bold text-white mb-1">Temperature</h3>
                    <p className="text-xs text-slate-400">
                        Sometimes, we don't pick the #1 word. We pick the #2 or #3 to be "creative".
                        This is called **Sampling**.
                    </p>
                </div>
            </div>

            <button onClick={onComplete} className="px-6 py-3 bg-green-600 hover:bg-green-500 text-white font-bold rounded-xl transition-colors shadow-lg shadow-green-900/20">
                🎓 I BUILT THIS
            </button>
        </div>
    );
};
