import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export const GradientDescentGame: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [hikerX, setHikerX] = useState(2.5); // Initial X (Range -3 to 3)
    const [lr, setLr] = useState(0.1);
    const [steps, setSteps] = useState<number[]>([]);
    const [isSuccess, setIsSuccess] = useState(false);

    // The Cost Function: y = x^2 + small bumps? simplified to x^2 for clarity first
    // Let's do f(x) = (x^2)/2 to make derivative simple: f'(x) = x
    // Or f(x) = x^2/4 + sin(x) for some local minima? 
    // Let's stick to simple convex for first lesson: f(x) = x^2 / 2
    const f = (x: number) => (x * x) / 2;
    const df = (x: number) => x; // Derivative

    const WIDTH = 400;
    const HEIGHT = 300;
    const SCALE_X = 50; // pixels per unit
    const SCALE_Y = 50;
    const CENTER_X = WIDTH / 2;
    const CENTER_Y = HEIGHT - 50; // Baseline

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Clear
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(0, 0, WIDTH, HEIGHT);

        // Draw Axis
        ctx.strokeStyle = '#334155';
        ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(0, CENTER_Y); ctx.lineTo(WIDTH, CENTER_Y); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(CENTER_X, 0); ctx.lineTo(CENTER_X, HEIGHT); ctx.stroke();

        // Draw Curve
        ctx.strokeStyle = '#6366f1';
        ctx.lineWidth = 4;
        ctx.beginPath();
        for (let px = 0; px <= WIDTH; px++) {
            const x = (px - CENTER_X) / SCALE_X;
            const y = f(x);
            const py = CENTER_Y - y * SCALE_Y;
            if (px === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
        }
        ctx.stroke();

        // Draw Hiker history
        steps.forEach((x, i) => {
            const px = CENTER_X + x * SCALE_X;
            const py = CENTER_Y - f(x) * SCALE_Y;
            ctx.fillStyle = `rgba(255, 255, 255, ${0.2 + (i / steps.length) * 0.5})`;
            ctx.beginPath();
            ctx.arc(px, py, 3, 0, Math.PI * 2);
            ctx.fill();
        });

        // Draw Current Hiker
        const hikerPx = CENTER_X + hikerX * SCALE_X;
        const hikerPy = CENTER_Y - f(hikerX) * SCALE_Y;

        // Tangent Line
        const slope = df(hikerX);
        const tangentLen = 40;
        // Point-slope form: y - y1 = m(x - x1)
        // We draw a small line segment
        // angle = atan(slope) (visually distorted by scale aspect ratio)
        // Simplified rendering of tangent:
        ctx.strokeStyle = '#ef4444'; // Red for gradient
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(hikerPx - 20, hikerPy + 20 * slope); // approx
        ctx.lineTo(hikerPx + 20, hikerPy - 20 * slope);
        ctx.stroke();

        // Hiker Dot
        ctx.fillStyle = '#facc15'; // Yellow
        ctx.beginPath();
        ctx.arc(hikerPx, hikerPy, 8, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#fff';
        ctx.stroke();

    }, [hikerX, steps]);

    const takeStep = () => {
        const gradient = df(hikerX);
        const newX = hikerX - lr * gradient;
        setSteps([...steps, hikerX]);
        setHikerX(newX);

        if (Math.abs(newX) < 0.1) {
            setIsSuccess(true);
        }
    };

    const reset = () => {
        setHikerX((Math.random() > 0.5 ? 2.5 : -2.5));
        setSteps([]);
        setIsSuccess(false);
    }

    return (
        <div className="flex flex-col items-center gap-6 w-full max-w-2xl mx-auto">
            <div className="relative rounded-xl overflow-hidden shadow-2xl border border-slate-700">
                <canvas ref={canvasRef} width={WIDTH} height={HEIGHT} />
                {isSuccess && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                        <div className="bg-green-500 text-black px-6 py-4 rounded-xl font-bold text-xl animate-bounce">
                            Minimum Reached! 🚩
                        </div>
                    </div>
                )}
            </div>

            <div className="flex items-center gap-4 w-full bg-slate-900 p-4 rounded-xl border border-slate-800">
                <div className="flex-1">
                    <label className="text-xs text-slate-500 uppercase font-bold block mb-2">Learning Rate</label>
                    <div className="flex gap-2 text-sm">
                        <button onClick={() => setLr(0.01)} className={`px-2 py-1 rounded ${lr === 0.01 ? 'bg-indigo-500 text-white' : 'bg-slate-800 text-slate-400'}`}>0.01 (Slow)</button>
                        <button onClick={() => setLr(0.1)} className={`px-2 py-1 rounded ${lr === 0.1 ? 'bg-indigo-500 text-white' : 'bg-slate-800 text-slate-400'}`}>0.1 (Good)</button>
                        <button onClick={() => setLr(0.9)} className={`px-2 py-1 rounded ${lr === 0.9 ? 'bg-indigo-500 text-white' : 'bg-slate-800 text-slate-400'}`}>0.9 (Fast)</button>
                        <button onClick={() => setLr(1.2)} className={`px-2 py-1 rounded ${lr === 1.2 ? 'bg-indigo-500 text-white' : 'bg-slate-800 text-slate-400'}`}>1.2 (Chaos)</button>
                    </div>
                </div>

                <div className="flex gap-2">
                    <button
                        onClick={reset}
                        className="px-4 py-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-bold"
                    >
                        Reset
                    </button>
                    <button
                        onClick={takeStep}
                        className="px-6 py-3 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white font-bold shadow-lg shadow-indigo-500/20 active:scale-95 transition-transform"
                    >
                        Step Down 📉
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 w-full text-center text-mono text-sm">
                <div className="bg-slate-900 border border-slate-800 p-2 rounded">
                    <span className="text-slate-500 block text-xs uppercase">Gradient (Slope)</span>
                    <span className={df(hikerX) > 0 ? 'text-red-400' : 'text-green-400'}>{df(hikerX).toFixed(3)}</span>
                </div>
                <div className="bg-slate-900 border border-slate-800 p-2 rounded">
                    <span className="text-slate-500 block text-xs uppercase">Loss (Height)</span>
                    <span className="text-white">{f(hikerX).toFixed(3)}</span>
                </div>
            </div>
        </div>
    );
};
