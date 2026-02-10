import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Neuron {
    id: string;
    value: number;
    x: number;
    y: number;
}

interface Connection {
    from: string;
    to: string;
    weight: number;
}

interface Layer {
    neurons: Neuron[];
}

interface DataFlowVisualizerProps {
    layers: Layer[];
    connections: Connection[];
    inputValues?: number[];
    isAnimating?: boolean;
    showWeights?: boolean;
    highlightPath?: string[];
}

export const DataFlowVisualizer: React.FC<DataFlowVisualizerProps> = ({
    layers,
    connections,
    inputValues = [],
    isAnimating = false,
    showWeights = true,
    highlightPath = []
}) => {
    const [activeSignals, setActiveSignals] = useState<string[]>([]);
    const [currentLayer, setCurrentLayer] = useState(0);

    // Animation effect
    useEffect(() => {
        if (!isAnimating) return;

        const interval = setInterval(() => {
            setCurrentLayer(prev => (prev + 1) % (layers.length + 1));
        }, 800);

        return () => clearInterval(interval);
    }, [isAnimating, layers.length]);

    const neuronRadius = 25;
    const layerSpacing = 150;
    const neuronSpacing = 70;

    const getNeuronPosition = (layerIndex: number, neuronIndex: number, layerSize: number) => {
        const startY = (300 - layerSize * neuronSpacing) / 2;
        return {
            x: 80 + layerIndex * layerSpacing,
            y: startY + neuronIndex * neuronSpacing + neuronSpacing / 2
        };
    };

    return (
        <div className="w-full bg-slate-900 rounded-2xl p-6 border border-slate-800">
            <svg viewBox="0 0 600 300" className="w-full h-auto">
                {/* Background Grid */}
                <defs>
                    <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1e293b" strokeWidth="0.5" />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />

                {/* Connections */}
                {layers.map((layer, layerIdx) => {
                    if (layerIdx === 0) return null;
                    const prevLayer = layers[layerIdx - 1];

                    return prevLayer.neurons.map((fromNeuron, fromIdx) => {
                        return layer.neurons.map((toNeuron, toIdx) => {
                            const from = getNeuronPosition(layerIdx - 1, fromIdx, prevLayer.neurons.length);
                            const to = getNeuronPosition(layerIdx, toIdx, layer.neurons.length);

                            const connection = connections.find(
                                c => c.from === fromNeuron.id && c.to === toNeuron.id
                            );
                            const weight = connection?.weight || 0.5;
                            const isHighlighted = highlightPath.includes(fromNeuron.id) && highlightPath.includes(toNeuron.id);

                            return (
                                <g key={`${fromNeuron.id}-${toNeuron.id}`}>
                                    <motion.line
                                        x1={from.x + neuronRadius}
                                        y1={from.y}
                                        x2={to.x - neuronRadius}
                                        y2={to.y}
                                        stroke={isHighlighted ? '#22c55e' : weight > 0 ? '#6366f1' : '#ef4444'}
                                        strokeWidth={Math.abs(weight) * 3 + 1}
                                        strokeOpacity={isHighlighted ? 1 : 0.3}
                                        initial={{ pathLength: 0 }}
                                        animate={{ pathLength: 1 }}
                                        transition={{ duration: 0.5 }}
                                    />
                                    {/* Data Signal Animation */}
                                    {isAnimating && currentLayer === layerIdx && (
                                        <motion.circle
                                            r={4}
                                            fill="#fbbf24"
                                            filter="url(#glow)"
                                            initial={{ cx: from.x + neuronRadius, cy: from.y }}
                                            animate={{ cx: to.x - neuronRadius, cy: to.y }}
                                            transition={{ duration: 0.5, ease: 'easeInOut' }}
                                        />
                                    )}
                                    {/* Weight Label */}
                                    {showWeights && (
                                        <text
                                            x={(from.x + to.x) / 2}
                                            y={(from.y + to.y) / 2 - 5}
                                            fill="#64748b"
                                            fontSize="8"
                                            textAnchor="middle"
                                            className="font-mono"
                                        >
                                            {weight.toFixed(2)}
                                        </text>
                                    )}
                                </g>
                            );
                        });
                    });
                })}

                {/* Neurons */}
                {layers.map((layer, layerIdx) => (
                    <g key={`layer-${layerIdx}`}>
                        {/* Layer Label */}
                        <text
                            x={80 + layerIdx * layerSpacing}
                            y={20}
                            fill="#94a3b8"
                            fontSize="10"
                            textAnchor="middle"
                            className="font-bold uppercase"
                        >
                            {layerIdx === 0 ? 'Input' : layerIdx === layers.length - 1 ? 'Output' : `Hidden ${layerIdx}`}
                        </text>

                        {layer.neurons.map((neuron, neuronIdx) => {
                            const pos = getNeuronPosition(layerIdx, neuronIdx, layer.neurons.length);
                            const isActive = currentLayer > layerIdx;
                            const isHighlighted = highlightPath.includes(neuron.id);

                            return (
                                <motion.g
                                    key={neuron.id}
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: layerIdx * 0.1 + neuronIdx * 0.05 }}
                                >
                                    {/* Glow Effect */}
                                    {isActive && (
                                        <circle
                                            cx={pos.x}
                                            cy={pos.y}
                                            r={neuronRadius + 5}
                                            fill={isHighlighted ? '#22c55e' : '#6366f1'}
                                            opacity={0.3}
                                        />
                                    )}
                                    {/* Neuron Circle */}
                                    <circle
                                        cx={pos.x}
                                        cy={pos.y}
                                        r={neuronRadius}
                                        fill={isActive ? (isHighlighted ? '#22c55e' : '#6366f1') : '#334155'}
                                        stroke={isHighlighted ? '#22c55e' : '#6366f1'}
                                        strokeWidth={2}
                                    />
                                    {/* Value */}
                                    <text
                                        x={pos.x}
                                        y={pos.y + 4}
                                        fill="white"
                                        fontSize="10"
                                        textAnchor="middle"
                                        className="font-mono font-bold"
                                    >
                                        {neuron.value.toFixed(1)}
                                    </text>
                                </motion.g>
                            );
                        })}
                    </g>
                ))}

                {/* Glow Filter */}
                <defs>
                    <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="3" result="blur" />
                        <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>
            </svg>

            {/* Controls */}
            <div className="mt-4 flex items-center justify-center gap-4">
                <div className="text-xs text-slate-500 font-mono">
                    Layers: {layers.length} | Connections: {connections.length}
                </div>
            </div>
        </div>
    );
};

// Helper to create a simple network for demos
export const createSimpleNetwork = (inputSize: number, hiddenSize: number, outputSize: number) => {
    const layers: Layer[] = [
        { neurons: Array.from({ length: inputSize }, (_, i) => ({ id: `i${i}`, value: Math.random(), x: 0, y: 0 })) },
        { neurons: Array.from({ length: hiddenSize }, (_, i) => ({ id: `h${i}`, value: 0, x: 0, y: 0 })) },
        { neurons: Array.from({ length: outputSize }, (_, i) => ({ id: `o${i}`, value: 0, x: 0, y: 0 })) }
    ];

    const connections: Connection[] = [];

    // Input to Hidden
    layers[0].neurons.forEach(input => {
        layers[1].neurons.forEach(hidden => {
            connections.push({ from: input.id, to: hidden.id, weight: Math.random() * 2 - 1 });
        });
    });

    // Hidden to Output
    layers[1].neurons.forEach(hidden => {
        layers[2].neurons.forEach(output => {
            connections.push({ from: hidden.id, to: output.id, weight: Math.random() * 2 - 1 });
        });
    });

    return { layers, connections };
};
