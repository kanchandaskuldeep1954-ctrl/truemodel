import React, { useState } from 'react';
import { DatasetVisualizer, DataPoint } from '../DatasetVisualizer';

// --- Module 5.1: Real Data is Messy ---

export const NoisyDataLesson: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
    const [data, setData] = useState<DataPoint[]>([
        { id: '1', x: 0.1, y: 0.2, label: 0 },
        { id: '2', x: 0.3, y: 0.4, label: 0 },
        { id: '3', x: 0.6, y: 0.5, label: 1 },
        { id: '4', x: 0.8, y: 0.9, label: 1 },
    ]);

    // Simple linear regression for demo
    const predict = (x: number) => 0.8 * x + 0.1;

    return (
        <div className="flex flex-col items-center gap-8 w-full max-w-4xl">
            <div className="text-center">
                <h2 className="text-2xl font-black text-white mb-2">Real Data vs Ideal Data</h2>
                <p className="text-slate-400 text-sm max-w-2xl mx-auto">
                    In textbooks, data lines up perfectly. In the real world, data is **Noisy**.
                    Sensors glitch. Humans make typos.
                    <br /><br />
                    **Mission**: Add some "outliers" (dots far away from the line). See how hard it is to draw a single line that fits everything?
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
                <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                    <DatasetVisualizer
                        data={data}
                        onDataChange={setData}
                        predictionFn={predict}
                    />
                </div>

                <div className="flex flex-col justify-center gap-4">
                    <div className="bg-slate-800 p-4 rounded-xl">
                        <h3 className="font-bold text-white mb-1">Outliers</h3>
                        <p className="text-xs text-slate-400">
                            Data points that don't fit the pattern. If you try to fit them too perfectly, you break the model for everyone else.
                        </p>
                    </div>
                    <div className="bg-slate-800 p-4 rounded-xl">
                        <h3 className="font-bold text-white mb-1">Noise</h3>
                        <p className="text-xs text-slate-400">
                            A blurry image. A static-filled recording. AI must learn to ignore the noise and find the **Signal**.
                        </p>
                    </div>
                </div>
            </div>

            <button onClick={onComplete} className="px-6 py-3 bg-green-600 hover:bg-green-500 text-white font-bold rounded-xl transition-colors">
                I UNDERSTAND →
            </button>
        </div>
    );
};

// --- Module 5.2: Overfitting ---

export const OverfittingLesson: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
    // Generate a sine wave with noise
    const generateData = () => Array.from({ length: 10 }, (_, i) => ({
        id: `p${i}`,
        x: i / 10,
        y: Math.sin(i / 10 * Math.PI) * 0.5 + 0.5 + (Math.random() - 0.5) * 0.1,
        label: 0
    }));

    const [data] = useState(generateData());
    const [modelComplexity, setModelComplexity] = useState<'under' | 'good' | 'over'>('good');

    const getPredictionFn = () => {
        if (modelComplexity === 'under') return (x: number) => 0.5; // Flat line
        if (modelComplexity === 'good') return (x: number) => Math.sin(x * Math.PI) * 0.5 + 0.5; // Sine wave
        if (modelComplexity === 'over') return (x: number) => {
            // Wobbly polynomial (simulated)
            return Math.sin(x * Math.PI) * 0.5 + 0.5 + Math.sin(x * 20) * 0.05;
        };
        return (x: number) => x;
    };

    return (
        <div className="flex flex-col items-center gap-8 w-full max-w-4xl">
            <div className="text-center">
                <h2 className="text-2xl font-black text-white mb-2">The Trap of "Memorizing"</h2>
                <p className="text-slate-400 text-sm max-w-2xl mx-auto">
                    A smart student understands the concepts. A bad student memorizes the answers.
                    <br />
                    **Overfitting** is when an AI memorizes the training data (including the noise) but fails on new questions.
                </p>
            </div>

            <div className="flex gap-4 mb-4">
                <button
                    onClick={() => setModelComplexity('under')}
                    className={`px-4 py-2 rounded-lg text-sm font-bold ${modelComplexity === 'under' ? 'bg-red-500 text-white' : 'bg-slate-800 text-slate-400'}`}
                >
                    Underfitting (Too Simple)
                </button>
                <button
                    onClick={() => setModelComplexity('good')}
                    className={`px-4 py-2 rounded-lg text-sm font-bold ${modelComplexity === 'good' ? 'bg-green-500 text-white' : 'bg-slate-800 text-slate-400'}`}
                >
                    Good Fit (Just Right)
                </button>
                <button
                    onClick={() => setModelComplexity('over')}
                    className={`px-4 py-2 rounded-lg text-sm font-bold ${modelComplexity === 'over' ? 'bg-red-500 text-white' : 'bg-slate-800 text-slate-400'}`}
                >
                    Overfitting (Too Complex)
                </button>
            </div>

            <div className="w-full max-w-lg bg-slate-900 p-4 rounded-xl border border-slate-800">
                <DatasetVisualizer
                    data={data}
                    predictionFn={getPredictionFn()}
                    readOnly
                />
            </div>

            <p className="text-slate-500 text-xs text-center max-w-lg">
                {modelComplexity === 'under' && "The model is too stupid. It learned nothing."}
                {modelComplexity === 'good' && "The model ignored the noise and found the curve!"}
                {modelComplexity === 'over' && "The model is trying too hard. It fits the dots perfectly but the line is squiggly and wrong."}
            </p>

            <button onClick={onComplete} className="px-6 py-3 bg-green-600 hover:bg-green-500 text-white font-bold rounded-xl transition-colors">
                I UNDERSTAND →
            </button>
        </div>
    );
};
