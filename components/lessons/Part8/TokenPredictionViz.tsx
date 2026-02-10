import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export const TokenPredictionViz: React.FC = () => {
    const [prompt, setPrompt] = useState('The cat sat on the');
    const [predictions, setPredictions] = useState<{ token: string, prob: number }[]>([]);
    const [selectedToken, setSelectedToken] = useState<string | null>(null);

    // Simulated next token predictions
    useEffect(() => {
        // Fake predictions based on prompt ending
        const lastWord = prompt.split(' ').pop()?.toLowerCase() || '';

        const predictionMap: Record<string, { token: string, prob: number }[]> = {
            'the': [
                { token: 'mat', prob: 0.35 },
                { token: 'floor', prob: 0.25 },
                { token: 'couch', prob: 0.15 },
                { token: 'bed', prob: 0.12 },
                { token: 'table', prob: 0.08 },
            ],
            'cat': [
                { token: 'sat', prob: 0.30 },
                { token: 'jumped', prob: 0.25 },
                { token: 'ran', prob: 0.20 },
                { token: 'slept', prob: 0.15 },
                { token: 'meowed', prob: 0.10 },
            ],
            'default': [
                { token: 'and', prob: 0.20 },
                { token: 'the', prob: 0.18 },
                { token: 'is', prob: 0.15 },
                { token: 'was', prob: 0.12 },
                { token: 'a', prob: 0.10 },
            ]
        };

        setPredictions(predictionMap[lastWord] || predictionMap['default']);
        setSelectedToken(null);
    }, [prompt]);

    const selectToken = (token: string) => {
        setSelectedToken(token);
        setTimeout(() => {
            setPrompt(prev => prev + ' ' + token);
            setSelectedToken(null);
        }, 500);
    };

    return (
        <div className="flex flex-col items-center gap-6 w-full max-w-2xl mx-auto">

            {/* Prompt Display */}
            <div className="w-full bg-slate-900 p-6 rounded-xl border border-slate-800">
                <div className="text-xs text-slate-500 uppercase mb-2">Prompt</div>
                <div className="text-xl font-mono text-white flex flex-wrap gap-1">
                    {prompt.split(' ').map((word, i) => (
                        <span key={i} className="text-slate-300">{word}</span>
                    ))}
                    <motion.span
                        className="inline-block w-3 h-6 bg-green-500"
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{ repeat: Infinity, duration: 1 }}
                    />
                </div>
            </div>

            {/* Predictions */}
            <div className="w-full">
                <div className="text-xs text-slate-500 uppercase mb-3 text-center">
                    GPT Predicts: "What comes next?"
                </div>
                <div className="flex flex-wrap gap-2 justify-center">
                    {predictions.map((pred, i) => (
                        <motion.button
                            key={pred.token}
                            onClick={() => selectToken(pred.token)}
                            className={`relative px-4 py-2 rounded-lg font-bold transition-all ${selectedToken === pred.token
                                    ? 'bg-green-500 text-white scale-110'
                                    : 'bg-slate-800 text-white hover:bg-slate-700'
                                }`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            style={{
                                borderWidth: 2,
                                borderColor: `rgba(34, 197, 94, ${pred.prob})`
                            }}
                        >
                            {pred.token}
                            <div className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 text-[10px] text-slate-500">
                                {(pred.prob * 100).toFixed(0)}%
                            </div>
                        </motion.button>
                    ))}
                </div>
            </div>

            {/* Reset */}
            <button
                onClick={() => setPrompt('The cat sat on the')}
                className="px-4 py-2 rounded-lg bg-slate-800 text-slate-400 text-sm hover:bg-slate-700"
            >
                Reset Prompt
            </button>

            <p className="text-xs text-slate-400 text-center max-w-md">
                GPT doesn't "know" anything. It just predicts: <strong className="text-green-400">"What word is most likely to come next?"</strong>
                <br />
                Click a prediction to add it to the prompt.
            </p>
        </div>
    );
};
