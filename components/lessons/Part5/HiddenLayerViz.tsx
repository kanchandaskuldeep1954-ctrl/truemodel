import React, { useState } from 'react';
import { motion } from 'framer-motion';

export const HiddenLayerViz: React.FC = () => {
    const [showTransformed, setShowTransformed] = useState(false);

    // XOR Data
    const original = [
        { x: 0.2, y: 0.2, label: 0 },
        { x: 0.8, y: 0.2, label: 1 },
        { x: 0.2, y: 0.8, label: 1 },
        { x: 0.8, y: 0.8, label: 0 },
    ];

    // Simulated "transformed space" after hidden layer
    // In real backprop, a hidden layer warps the space to make it separable.
    // For visualization, we just move the points.
    const transformed = [
        { x: 0.3, y: 0.3, label: 0 },
        { x: 0.7, y: 0.8, label: 1 },
        { x: 0.3, y: 0.8, label: 1 },
        { x: 0.7, y: 0.2, label: 0 },
    ];

    const data = showTransformed ? transformed : original;

    return (
        <div className="flex flex-col items-center gap-8 w-full max-w-lg mx-auto">

            {/* Grid */}
            <div className="relative w-72 h-72 bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
                {/* Grid lines */}
                <div className="absolute inset-0" style={{
                    backgroundImage: 'radial-gradient(#334155 1px, transparent 1px)',
                    backgroundSize: '20px 20px'
                }} />

                {/* Separator Line (Only in transformed space) */}
                {showTransformed && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute h-1 bg-yellow-500 w-full"
                        style={{ top: '50%', transform: 'rotate(-10deg)', transformOrigin: 'center' }}
                    />
                )}

                {/* Data Points */}
                {data.map((p, i) => (
                    <motion.div
                        key={i}
                        className={`absolute w-8 h-8 rounded-full flex items-center justify-center font-bold text-white border-2 ${p.label === 0 ? 'bg-red-500/80 border-red-400' : 'bg-green-500/80 border-green-400'}`}
                        initial={false}
                        animate={{
                            left: `${p.x * 100 - 5}%`,
                            top: `${(1 - p.y) * 100 - 5}%` // Invert Y for visual
                        }}
                        transition={{ type: 'spring', stiffness: 100 }}
                    >
                        {p.label}
                    </motion.div>
                ))}

                {/* Label */}
                <div className="absolute bottom-2 left-2 bg-black/50 px-2 py-1 rounded text-xs font-mono text-slate-300">
                    {showTransformed ? 'After Hidden Layer' : 'Before (Raw Input)'}
                </div>
            </div>

            {/* Toggle */}
            <button
                onClick={() => setShowTransformed(!showTransformed)}
                className={`px-8 py-4 rounded-xl font-bold text-lg uppercase tracking-widest transition-all ${showTransformed
                        ? 'bg-yellow-500 text-black shadow-[0_0_30px_rgba(234,179,8,0.4)]'
                        : 'bg-slate-800 text-white hover:bg-slate-700'
                    }`}
            >
                {showTransformed ? 'Show Original Space' : 'Apply Hidden Layer Transformation →'}
            </button>

            <p className="text-xs text-slate-400 text-center max-w-sm">
                The hidden layer <strong>warps the space</strong> so that a simple line can now separate the classes.
                This is the magic of Deep Learning!
            </p>
        </div>
    );
};
