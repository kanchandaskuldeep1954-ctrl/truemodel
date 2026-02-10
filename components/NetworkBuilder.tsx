import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { DataFlowVisualizer } from './DataFlowVisualizer';

interface NetworkBuilderProps {
    initialConfig?: number[]; // e.g. [2, 3, 1] (2 inputs, 3 hidden, 1 output)
    onConfigChange?: (config: number[]) => void;
    allowEditing?: boolean;
}

export const NetworkBuilder: React.FC<NetworkBuilderProps> = ({
    initialConfig = [2, 4, 1],
    onConfigChange,
    allowEditing = true
}) => {
    const [layerConfig, setLayerConfig] = useState<number[]>(initialConfig);
    const [isAnimating, setIsAnimating] = useState(false);

    // Convert simple count array to DataFlowVisualizer format
    const generateNetworkData = (config: number[]) => {
        const layers = config.map((count, layerIdx) => ({
            neurons: Array.from({ length: count }, (_, nIdx) => ({
                id: `l${layerIdx}_n${nIdx}`,
                value: Math.random(), // Random initial activation
                x: 0,
                y: 0
            }))
        }));

        const connections = [];
        for (let i = 0; i < layers.length - 1; i++) {
            const currentLayer = layers[i];
            const nextLayer = layers[i + 1];

            currentLayer.neurons.forEach(fromNode => {
                nextLayer.neurons.forEach(toNode => {
                    connections.push({
                        from: fromNode.id,
                        to: toNode.id,
                        weight: (Math.random() * 2) - 1
                    });
                });
            });
        }

        return { layers, connections };
    };

    const runForwardPass = () => {
        setIsAnimating(true);
        setTimeout(() => setIsAnimating(false), layerConfig.length * 800 + 1000);
    };

    const addLayer = () => {
        if (layerConfig.length >= 6) return; // Max depth
        const newConfig = [...layerConfig];
        newConfig.splice(newConfig.length - 1, 0, 3); // Insert default hidden layer of 3
        setLayerConfig(newConfig);
        onConfigChange?.(newConfig);
    };

    const removeLayer = (index: number) => {
        if (layerConfig.length <= 2) return; // Min depth (Input + Output)
        const newConfig = layerConfig.filter((_, i) => i !== index);
        setLayerConfig(newConfig);
        onConfigChange?.(newConfig);
    };

    const updateNeuronCount = (layerIdx: number, delta: number) => {
        const newConfig = [...layerConfig];
        const newCount = Math.max(1, Math.min(8, newConfig[layerIdx] + delta)); // Clamp 1-8
        newConfig[layerIdx] = newCount;
        setLayerConfig(newConfig);
        onConfigChange?.(newConfig);
    };

    const { layers, connections } = generateNetworkData(layerConfig);

    return (
        <div className="w-full flex flex-col gap-6">
            {/* Controls */}
            {allowEditing && (
                <div className="flex flex-wrap justify-center gap-4 bg-slate-900 p-4 rounded-xl border border-slate-800">
                    <button
                        onClick={addLayer}
                        disabled={layerConfig.length >= 6}
                        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-bold rounded-lg transition-colors"
                    >
                        + Add Hidden Layer
                    </button>
                    <button
                        onClick={runForwardPass}
                        disabled={isAnimating}
                        className="px-4 py-2 bg-green-600 hover:bg-green-500 disabled:opacity-50 text-white text-sm font-bold rounded-lg transition-colors flex items-center gap-2"
                    >
                        {isAnimating ? 'Running...' : '▶ Run Forward Pass'}
                    </button>
                    <div className="px-4 py-2 bg-slate-800 rounded-lg text-slate-400 text-xs font-mono flex items-center">
                        Shape: [{layerConfig.join(', ')}]
                    </div>
                </div>
            )}

            {/* Visualizer Container */}
            <div className="relative">
                <DataFlowVisualizer
                    layers={layers}
                    connections={connections}
                    isAnimating={isAnimating}
                    showWeights={false}
                />

                {/* Layer Controls Overlays */}
                {allowEditing && (
                    <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                        <div className="flex justify-between px-[80px]" style={{ width: '100%' }}>
                            {layerConfig.map((count, idx) => (
                                <div key={idx} className="flex flex-col items-center pointer-events-auto mt-2" style={{ width: '0' }}>
                                    {/* Only show controls for hidden layers or if we want full control */}
                                    <div className="bg-slate-900/80 backdrop-blur rounded-lg p-1 flex gap-1 transform -translate-y-full mb-2 border border-slate-700">
                                        <button
                                            onClick={() => updateNeuronCount(idx, -1)}
                                            className="w-6 h-6 flex items-center justify-center bg-slate-800 hover:bg-red-900/50 text-slate-300 rounded text-xs"
                                        >
                                            -
                                        </button>
                                        <span className="text-xs text-white font-mono w-4 text-center">{count}</span>
                                        <button
                                            onClick={() => updateNeuronCount(idx, 1)}
                                            className="w-6 h-6 flex items-center justify-center bg-slate-800 hover:bg-green-900/50 text-slate-300 rounded text-xs"
                                        >
                                            +
                                        </button>
                                    </div>

                                    {/* Remove Layer Button (only for hidden layers) */}
                                    {idx > 0 && idx < layerConfig.length - 1 && (
                                        <button
                                            onClick={() => removeLayer(idx)}
                                            className="mt-[320px] text-[10px] text-red-500 hover:text-red-400 underline"
                                        >
                                            Remove
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
