import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const DropoutViz: React.FC = () => {
    const [isTraining, setIsTraining] = useState(true);
    const [dropMask, setDropMask] = useState<boolean[][]>([]);
    const layers = [4, 6, 6, 4]; // Network shape

    useEffect(() => {
        if (!isTraining) {
            setDropMask([]);
            return;
        }

        // Generate new random dropout mask periodically
        const interval = setInterval(() => {
            const newMask = layers.map(size =>
                Array(size).fill(false).map(() => Math.random() < 0.5)
            );
            setDropMask(newMask);
        }, 800);

        return () => clearInterval(interval);
    }, [isTraining]);

    return (
        <div className="flex flex-col items-center gap-8 w-full max-w-2xl mx-auto">

            {/* Network Visualization */}
            <div className="flex items-center justify-center gap-8 py-4">
                {layers.map((size, layerIdx) => (
                    <div key={layerIdx} className="flex flex-col items-center gap-2">
                        <div className="text-[10px] text-slate-500 uppercase font-bold mb-1">
                            {layerIdx === 0 ? 'Input' : layerIdx === layers.length - 1 ? 'Output' : `Hidden ${layerIdx}`}
                        </div>
                        {Array(size).fill(0).map((_, nodeIdx) => {
                            const isDropped = isTraining && dropMask[layerIdx]?.[nodeIdx];
                            return (
                                <motion.div
                                    key={nodeIdx}
                                    className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-[10px] font-bold
                                        ${isDropped ? 'bg-slate-800 border-slate-700 text-slate-600' : 'bg-purple-600 border-purple-400 text-white'}
                                    `}
                                    animate={{
                                        scale: isDropped ? 0.7 : 1,
                                        opacity: isDropped ? 0.3 : 1
                                    }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {isDropped ? '✗' : '●'}
                                </motion.div>
                            );
                        })}
                    </div>
                ))}
            </div>

            {/* Controls */}
            <div className="flex gap-4">
                <button
                    onClick={() => setIsTraining(true)}
                    className={`px-6 py-3 rounded-lg font-bold ${isTraining ? 'bg-pink-600 text-white' : 'bg-slate-800 text-slate-400'}`}
                >
                    Training Mode (Dropout ON)
                </button>
                <button
                    onClick={() => setIsTraining(false)}
                    className={`px-6 py-3 rounded-lg font-bold ${!isTraining ? 'bg-green-600 text-white' : 'bg-slate-800 text-slate-400'}`}
                >
                    Inference Mode (All ON)
                </button>
            </div>

            <p className="text-xs text-slate-400 text-center max-w-md">
                <strong className="text-pink-400">Training</strong>: 50% of neurons are randomly "dropped" each step.
                <br />
                <strong className="text-green-400">Inference</strong>: All neurons active for final prediction.
            </p>
        </div>
    );
};
