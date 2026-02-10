import React, { useState } from 'react';
import { NetworkBuilder } from '../NetworkBuilder';

// --- Module 4.1: The Limits of One Neuron ---

export const HiddenLayerLesson: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
    return (
        <div className="flex flex-col items-center gap-8 w-full max-w-4xl">
            <div className="text-center">
                <h2 className="text-2xl font-black text-white mb-2">The XOR Problem</h2>
                <p className="text-slate-400 text-sm max-w-2xl mx-auto">
                    A single neuron can draw a straight line. But what if the data isn't separable by a straight line?
                    We need a **Hidden Layer** to bend the space.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
                {/* Visualizer */}
                <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
                    <div className="text-xs text-slate-500 uppercase mb-4 text-center">Your Neural Network</div>
                    <NetworkBuilder
                        initialConfig={[2, 3, 1]}
                        allowEditing={false} // Fixed for this lesson
                    />
                </div>

                {/* Explanation */}
                <div className="flex flex-col justify-center gap-4">
                    <div className="bg-slate-800 p-6 rounded-xl">
                        <h3 className="font-bold text-white mb-2">Why "Hidden"?</h3>
                        <p className="text-sm text-slate-400">
                            It's sandwiched between Input and Output. You never see it directly.
                            It's where the magic happens—it extracts **features**.
                        </p>
                    </div>
                    <div className="bg-slate-800 p-6 rounded-xl">
                        <h3 className="font-bold text-white mb-2">Feature Extraction</h3>
                        <p className="text-sm text-slate-400">
                            - Hidden Neuron 1 might say "Is input A on?"
                            <br />
                            - Hidden Neuron 2 might say "Is input B on?"
                            <br />
                            - Output Neuron combines them: "Fire if A OR B is on, but NOT both."
                        </p>
                    </div>
                </div>
            </div>

            <button
                onClick={onComplete}
                className="px-6 py-3 bg-green-600 hover:bg-green-500 text-white font-bold rounded-xl transition-colors"
            >
                I UNDERSTAND →
            </button>
        </div>
    );
};

// --- Module 4.2: Deep Learning ---

export const DeepNetLesson: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
    const [config, setConfig] = useState([2, 4, 4, 1]);

    return (
        <div className="flex flex-col items-center gap-8 w-full max-w-5xl">
            <div className="text-center">
                <h2 className="text-2xl font-black text-white mb-2">Deep Learning Playground</h2>
                <p className="text-slate-400 text-sm">
                    "Deep" just means "Many Layers". This allows the AI to learn hierarchical patterns.
                    <br />
                    Edges → Shapes → Objects → Scenes.
                </p>
            </div>

            <NetworkBuilder
                initialConfig={config}
                onConfigChange={setConfig}
            />

            <div className="text-center text-slate-500 text-xs mt-4">
                Tip: Add layers to make the network "Deeper". Add neurons to make it "Wider".
            </div>

            <button
                onClick={onComplete}
                className="px-6 py-3 bg-green-600 hover:bg-green-500 text-white font-bold rounded-xl transition-colors mt-8"
            >
                I UNDERSTAND →
            </button>
        </div>
    );
};
