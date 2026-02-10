import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, RefreshCw } from 'lucide-react';

// --- Shared Components ---

// --- Step 1: Linear Regression Intro ---
export const RegressionIntroAnim = () => {
    return (
        <div className="relative w-full h-[300px] bg-slate-900 rounded-xl overflow-hidden flex items-center justify-center">
            {/* Scatter Plot Background */}
            {[...Array(20)].map((_, i) => (
                <div
                    key={i}
                    className="absolute w-2 h-2 bg-slate-600 rounded-full"
                    style={{
                        left: `${Math.random() * 80 + 10}%`,
                        bottom: `${Math.random() * 80 + 10}%`,
                        opacity: 0.5
                    }}
                />
            ))}

            {/* The Line */}
            <motion.div
                className="absolute w-[120%] h-1 bg-yellow-400 shadow-[0_0_10px_#facc15]"
                initial={{ rotate: 0, scale: 0.8 }}
                animate={{ rotate: 45, scale: 1 }}
                transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
            />

            <div className="absolute bottom-4 left-4 bg-black/50 px-2 py-1 rounded text-xs font-mono text-yellow-500">
                Finding the "Line of Best Fit"...
            </div>
        </div>
    );
};

// --- Step 2: Interactive Line Fitting ---
export const RegressionPlayground = ({ onComplete }: { onComplete: () => void }) => {
    // Equation: y = mx + b
    const [m, setM] = useState(1); // Slope
    const [b, setB] = useState(0); // Intercept
    const [error, setError] = useState(100);

    // Target data points (approx fitting y = 2x + 1)
    const points = [
        { x: 1, y: 3 }, { x: 2, y: 5 }, { x: 3, y: 6 }, { x: 4, y: 9 }, { x: 5, y: 11 }
    ];

    // Calculate MSE (Mean Squared Error)
    useEffect(() => {
        let sumSquaredError = 0;
        points.forEach(p => {
            const prediction = (m * p.x) + b;
            const err = prediction - p.y;
            sumSquaredError += (err * err);
        });
        const mse = sumSquaredError / points.length;
        setError(mse);

        // Success condition: Error < 1.0 (Close enough)
        if (mse < 0.5) {
            setTimeout(onComplete, 1000);
        }
    }, [m, b, onComplete]);

    // Canvas coordinate helpers
    const getX = (val: number) => (val / 6) * 100;
    const getY = (val: number) => (val / 12) * 100;

    return (
        <div className="flex flex-col items-center gap-6 w-full max-w-2xl">
            <div className="w-full h-[300px] bg-slate-800 rounded-xl relative border border-slate-700 overflow-hidden">
                {/* Grid Lines */}
                <div className="absolute inset-0 opacity-10"
                    style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '50px 50px' }}
                ></div>

                {/* Points */}
                {points.map((p, i) => (
                    <div
                        key={i}
                        className="absolute w-3 h-3 bg-white rounded-full shadow-lg z-10"
                        style={{ left: `${getX(p.x)}%`, bottom: `${getY(p.y)}%`, transform: 'translate(-50%, 50%)' }}
                    />
                ))}

                {/* The User's Line */}
                {/* Visualized as a div rotated around a pivot? CSS rotation is tricky for arbitrary mx+b. 
                     Better to use SVG line for accuracy. */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                    <line
                        x1="0%" y1={`${100 - getY(b)}%`}
                        x2="100%" y2={`${100 - getY((m * 6) + b)}%`}
                        stroke="#facc15"
                        strokeWidth="4"
                        strokeLinecap="round"
                    />

                    {/* Error Lines (Residuals) */}
                    {points.map((p, i) => (
                        <line
                            key={i}
                            x1={`${getX(p.x)}%`} y1={`${100 - getY(p.y)}%`}
                            x2={`${getX(p.x)}%`} y2={`${100 - getY((m * p.x) + b)}%`}
                            stroke="rgba(239, 68, 68, 0.5)"
                            strokeWidth="2"
                            strokeDasharray="4"
                        />
                    ))}
                </svg>

                {/* Error Display */}
                <div className={`absolute top-4 right-4 px-4 py-2 rounded-lg font-bold font-mono transition-colors
                     ${error < 0.5 ? 'bg-green-500 text-black' : 'bg-red-500 text-white'}
                 `}>
                    Error (MSE): {error.toFixed(2)}
                </div>
            </div>

            {/* Controls */}
            <div className="w-full grid grid-cols-2 gap-8 bg-slate-900/50 p-6 rounded-xl border border-slate-800">
                <div>
                    <label className="text-yellow-400 font-bold text-xs uppercase mb-2 block">Slope (m): {m.toFixed(1)}</label>
                    <input
                        type="range" min="0" max="4" step="0.1"
                        value={m} onChange={(e) => setM(parseFloat(e.target.value))}
                        className="w-full accent-yellow-500"
                    />
                </div>
                <div>
                    <label className="text-blue-400 font-bold text-xs uppercase mb-2 block">Intercept (b): {b.toFixed(1)}</label>
                    <input
                        type="range" min="-5" max="5" step="0.5"
                        value={b} onChange={(e) => setB(parseFloat(e.target.value))}
                        className="w-full accent-blue-500"
                    />
                </div>
            </div>

            {error < 0.5 && (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-green-400 font-black text-2xl">
                    PERFECT FIT!
                </motion.div>
            )}
        </div>
    );
};
