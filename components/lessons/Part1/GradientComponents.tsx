import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { TrendingDown, Flag, AlertTriangle } from 'lucide-react';

// --- Shared Components ---

// --- Step 1: Landscape Animation (The "Hiker") ---
export const GradientIntroAnim = () => {
    return (
        <div className="relative w-full h-[300px] overflow-hidden rounded-xl bg-slate-900 flex items-end justify-center">
            {/* Sky */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-900 to-indigo-900/20"></div>

            {/* The Mountain (Loss Function) */}
            {/* Simple Parabola visualization using SVG */}
            <svg viewBox="0 0 100 50" className="w-full h-full absolute bottom-0">
                <path d="M0,0 Q50,100 100,0 L100,50 L0,50 Z" fill="url(#grad)" />
                <defs>
                    <linearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.5" />
                        <stop offset="100%" stopColor="#1e1b4b" stopOpacity="0.9" />
                    </linearGradient>
                </defs>
            </svg>

            {/* The Hiker (Ball) */}
            <motion.div
                className="w-4 h-4 bg-yellow-400 rounded-full shadow-[0_0_10px_#facc15] absolute"
                animate={{
                    x: ['10%', '45%', '55%', '48%', '50%'], // oscillate to bottom
                    y: ['10%', '80%', '85%', '90%', '92%']
                }}
                transition={{ duration: 3, ease: 'easeInOut', repeat: Infinity, repeatDelay: 1 }}
            />

            <div className="absolute top-4 left-4 text-xs font-mono text-slate-500">
                MINIMIZING LOSS...
            </div>
        </div>
    );
};

// --- Step 2: Interactive Descent ---
export const GradientPlayground = ({ onComplete }: { onComplete: () => void }) => {
    const [position, setPosition] = useState(-9); // x coordinate
    const [lr, setLr] = useState(0.5); // learning rate
    const [steps, setSteps] = useState(0);
    const [history, setHistory] = useState<number[]>([]);

    const step = () => {
        // Loss = x^2, Gradient = 2x
        const gradient = 2 * position;
        const newPos = position - (lr * gradient);

        setPosition(newPos);
        setSteps(s => s + 1);
        setHistory(prev => [...prev.slice(-10), newPos]);
    };

    const reset = () => {
        setPosition(-9);
        setSteps(0);
        setHistory([]);
    };

    // Auto-complete if they reach the bottom (approx 0)
    useEffect(() => {
        if (Math.abs(position) < 0.1 && steps > 2) {
            setTimeout(onComplete, 1000);
        }
    }, [position, steps, onComplete]);

    // Calculate visualizing coordinates
    // Map x [-10, 10] to percentage [0, 100]
    const getLeft = (x: number) => `${((x + 10) / 20) * 100}%`;
    // Map y=x^2 [0, 100] to bottom percentage [0, 100] * scale
    const getBottom = (x: number) => `${Math.min((x * x), 100)}%`;

    return (
        <div className="flex flex-col items-center gap-6 w-full max-w-2xl">
            <div className="w-full h-64 bg-slate-800 rounded-xl relative overflow-hidden border border-slate-700">
                {/* Visual Guide Line for Parabola */}
                <div className="absolute bottom-0 left-0 w-full h-full opacity-30 flex items-end justify-center pointer-events-none">
                    <div className="w-[1px] h-full bg-slate-600"></div> {/* Y-axis */}
                    <div className="w-full h-[1px] bg-slate-600 absolute bottom-0"></div> {/* X-axis */}
                </div>

                {/* Render History Trails */}
                {history.map((h, i) => (
                    <div
                        key={i}
                        className="absolute w-2 h-2 bg-slate-500 rounded-full opacity-30"
                        style={{ left: getLeft(h), bottom: getBottom(h), transform: 'translate(-50%, 50%)' }}
                    />
                ))}

                {/* Current Position */}
                <motion.div
                    layout
                    className={`absolute w-6 h-6 rounded-full shadow-lg z-10 flex items-center justify-center text-[10px] font-bold
                        ${Math.abs(position) < 0.5 ? 'bg-green-500 text-black shadow-green-500/50' : 'bg-yellow-400 text-black shadow-yellow-500/50'}
                    `}
                    style={{ left: getLeft(position), bottom: getBottom(position), transform: 'translate(-50%, 50%) ' }}
                >
                    Here
                </motion.div>

                {/* Target Flag */}
                <div className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2 text-green-500 opacity-50">
                    <Flag />
                </div>
            </div>

            <div className="w-full bg-slate-900/50 p-6 rounded-xl border border-slate-800">
                <div className="flex justify-between items-center mb-4">
                    <div className="text-slate-400 text-xs font-bold uppercase">Learning Rate: {lr}</div>
                    <div className="text-slate-400 text-xs font-bold uppercase">Steps Taken: {steps}</div>
                </div>

                <input
                    type="range" min="0.1" max="1.0" step="0.1"
                    value={lr} onChange={(e) => setLr(parseFloat(e.target.value))}
                    className="w-full mb-6 accent-indigo-500"
                />

                <div className="flex gap-4">
                    <button onClick={step} className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2">
                        <TrendingDown className="w-4 h-4" /> TAKE STEP
                    </button>
                    <button onClick={reset} className="px-6 bg-slate-700 hover:bg-slate-600 text-white font-bold rounded-lg">
                        RESET
                    </button>
                </div>
            </div>

            <div className="text-xs text-slate-500 text-center max-w-md">
                Tip: Low Learning Rate = Slow & Safe. High Learning Rate = Fast but dangerous (might overshoot!).
            </div>
        </div>
    );
};

// --- Step 3: Challenge (Diverging Gradient) ---
export const GradientChallenge = ({ onComplete }: { onComplete: () => void }) => {
    // Challenge: Set a Learning Rate that is TOO high, causing the ball to jump out of the bowl
    // This teaches "Exploding Gradients"
    const [position, setPosition] = useState(2);
    const [lr, setLr] = useState(0.1);
    const [exploded, setExploded] = useState(false);

    const step = () => {
        const gradient = 2 * position;
        const newPos = position - (lr * gradient);
        setPosition(newPos);

        if (Math.abs(newPos) > 10) {
            setExploded(true);
            setTimeout(onComplete, 1000); // Success! You broke it!
        }
    };

    const reset = () => {
        setPosition(2);
        setExploded(false);
    };

    return (
        <div className="flex flex-col items-center gap-6">
            <div className="bg-orange-500/10 border border-orange-500/50 px-6 py-4 rounded text-center">
                <h4 className="text-orange-300 font-bold mb-2 flex items-center justify-center gap-2"><AlertTriangle className="w-4 h-4" /> MISSION: BREAK THE AI</h4>
                <p className="text-sm text-orange-200/80">
                    Set the Learning Rate so HIGH that the ball overshoots the valley and flies off into space. This is called an "Exploding Gradient".
                </p>
            </div>

            <div className="w-full h-40 bg-slate-800 rounded-xl relative overflow-hidden border border-slate-700">
                {/* Ball */}
                <motion.div
                    layout
                    className="absolute w-6 h-6 bg-red-500 rounded-full shadow-lg z-10 bottom-0"
                    style={{ left: `${((position + 10) / 20) * 100}%`, transform: 'translate(-50%, 0)' }}
                ></motion.div>
            </div>

            <div className="w-full max-w-md">
                <label className="text-slate-400 font-bold text-xs uppercase mb-2 block">Learning Rate: {lr}</label>
                <input
                    type="range" min="0.1" max="2.0" step="0.1"
                    value={lr} onChange={(e) => setLr(parseFloat(e.target.value))}
                    className="w-full mb-4 accent-red-500"
                />
                <button onClick={step} className="w-full bg-red-600 hover:bg-red-500 text-white font-bold py-3 rounded-lg">
                    RUN OPTIMIZER
                </button>
                {Math.abs(position) > 2 && !exploded && (
                    <button onClick={reset} className="w-full mt-2 text-slate-500 text-xs underline">Reset</button>
                )}
            </div>

            {exploded && <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-red-500 font-black text-2xl">GRADIENT EXPLODED! 🔥</motion.div>}

        </div>
    );
};
