import React, { useState } from 'react';
import { ConvolutionVisualizer } from '../ConvolutionVisualizer';

// --- Module 6.1: How Computers See ---

export const ConvolutionLesson: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
    const [kernelType, setKernelType] = useState<'edge' | 'sharpen' | 'blur'>('edge');

    const kernels = {
        edge: [
            [-1, -1, -1],
            [-1, 8, -1],
            [-1, -1, -1]
        ],
        sharpen: [
            [0, -1, 0],
            [-1, 5, -1],
            [0, -1, 0]
        ],
        blur: [
            [0.1, 0.1, 0.1],
            [0.1, 0.2, 0.1],
            [0.1, 0.1, 0.1]
        ]
    };

    return (
        <div className="flex flex-col items-center gap-8 w-full max-w-4xl">
            <div className="text-center">
                <h2 className="text-2xl font-black text-white mb-2">The Magic of Filters</h2>
                <p className="text-slate-400 text-sm max-w-2xl mx-auto">
                    A Neural Network doesn't see a "Cat". It sees edges, textures, and curves.
                    It finds them using **Convolutions** (Filters).
                </p>
            </div>

            <div className="flex gap-4 mb-4">
                {Object.keys(kernels).map(k => (
                    <button
                        key={k}
                        onClick={() => setKernelType(k as any)}
                        className={`px-4 py-2 rounded-lg text-sm font-bold capitalize
                            ${kernelType === k ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}
                        `}
                    >
                        {k} Filter
                    </button>
                ))}
            </div>

            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 w-full">
                <ConvolutionVisualizer
                    kernel={kernels[kernelType]}
                    readOnly
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                <div className="bg-slate-800 p-4 rounded-xl">
                    <h3 className="font-bold text-white mb-1">Edge Detection</h3>
                    <p className="text-xs text-slate-400">
                        Notice how the "Edge" filter creates bright spots only where colors change abruptly (the outline of the square).
                    </p>
                </div>
                <div className="bg-slate-800 p-4 rounded-xl">
                    <h3 className="font-bold text-white mb-1">Feature Maps</h3>
                    <p className="text-xs text-slate-400">
                        The output grid is called a "Feature Map". It highlights where the specific feature (edge, curve) exists in the image.
                    </p>
                </div>
                <div className="bg-slate-800 p-4 rounded-xl">
                    <h3 className="font-bold text-white mb-1">Stacking Layers</h3>
                    <p className="text-xs text-slate-400">
                        Deep CNNs stack these. Layer 1 finds edges. Layer 2 finds eyes. Layer 3 finds cats.
                    </p>
                </div>
            </div>

            <button onClick={onComplete} className="px-6 py-3 bg-green-600 hover:bg-green-500 text-white font-bold rounded-xl transition-colors">
                I UNDERSTAND →
            </button>
        </div>
    );
};
