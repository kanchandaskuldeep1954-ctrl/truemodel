import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

export const XorViz: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    // Line defined by ax + by + c = 0
    // Visualized as y = mx + b
    const [w1, setW1] = useState(0.5);
    const [w2, setW2] = useState(0.5);
    const [bias, setBias] = useState(-0.5);

    const data = [
        { x: 0, y: 0, label: 0 },
        { x: 0, y: 1, label: 1 },
        { x: 1, y: 0, label: 1 },
        { x: 1, y: 1, label: 0 },
    ];

    const WIDTH = 300;
    const HEIGHT = 300;
    const PADDING = 50;
    const SCALE = 200; // 0 to 1 covers 200px

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Clear
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(0, 0, WIDTH, HEIGHT);

        // Draw Line
        // w1*x + w2*y + b = 0 => y = (-w1*x - b) / w2
        // If w2 is close to 0, vertical line x = -b/w1
        ctx.strokeStyle = '#facc15';
        ctx.lineWidth = 3;
        ctx.beginPath();

        const getY = (x: number) => (-w1 * x - bias) / w2;
        const getX = (y: number) => (-w2 * y - bias) / w1;

        if (Math.abs(w2) > 0.01) {
            ctx.moveTo(0, HEIGHT - (getY(-0.5) * SCALE + PADDING)); // Canvas Y inverted? No, let's map math to screen
            // ScreenX = PADDING + x * SCALE
            // ScreenY = HEIGHT - (PADDING + y * SCALE)
            const mapX = (x: number) => PADDING + x * SCALE;
            const mapY = (y: number) => HEIGHT - (PADDING + y * SCALE);

            ctx.moveTo(mapX(-0.5), mapY(getY(-0.5)));
            ctx.lineTo(mapX(1.5), mapY(getY(1.5)));
        } else {
            // Vertical line
            const x = -bias / w1;
            const mapX = (val: number) => PADDING + val * SCALE;
            ctx.moveTo(mapX(x), 0);
            ctx.lineTo(mapX(x), HEIGHT);
        }
        ctx.stroke();

        // Draw Data Points
        data.forEach(p => {
            const px = PADDING + p.x * SCALE;
            const py = HEIGHT - (PADDING + p.y * SCALE);

            // Check projection
            const output = w1 * p.x + w2 * p.y + bias;
            const pred = output > 0 ? 1 : 0;
            const isCorrect = pred === p.label;

            ctx.fillStyle = p.label === 0 ? '#ef4444' : '#22c55e'; // Red (0), Green (1)
            ctx.beginPath();
            ctx.arc(px, py, 12, 0, Math.PI * 2);
            ctx.fill();

            // Accuracy indicator ring
            ctx.strokeStyle = isCorrect ? '#ffffff' : '#ef4444';
            ctx.lineWidth = isCorrect ? 2 : 0;
            if (isCorrect) ctx.stroke();

            // Label text
            ctx.fillStyle = '#fff';
            ctx.font = 'bold 12px monospace';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(`(${p.x},${p.y})`, px, py + 25);
        });

    }, [w1, w2, bias]);

    // Calculate accuracy for feedback
    const numCorrect = data.filter(p => {
        const output = w1 * p.x + w2 * p.y + bias;
        const pred = output > 0 ? 1 : 0;
        return pred === p.label;
    }).length;

    return (
        <div className="flex flex-col md:flex-row gap-8 items-center justify-center max-w-4xl mx-auto">
            <div className="relative rounded-xl overflow-hidden shadow-2xl border border-slate-700">
                <canvas ref={canvasRef} width={WIDTH} height={HEIGHT} />
                <div className="absolute top-2 right-2 bg-black/50 px-2 py-1 rounded text-xs font-mono text-slate-300">
                    Accuracy: {numCorrect}/4
                </div>
            </div>

            <div className="flex flex-col gap-6 w-64">
                <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                    <h3 className="text-xs text-white uppercase font-bold mb-4">Line Controls</h3>

                    <div className="space-y-4">
                        <div>
                            <label className="text-xs text-slate-500 uppercase font-bold block mb-1">Weight 1 (Slope X)</label>
                            <input
                                type="range" min="-2" max="2" step="0.1"
                                value={w1} onChange={(e) => setW1(parseFloat(e.target.value))}
                                className="w-full accent-yellow-500"
                            />
                        </div>
                        <div>
                            <label className="text-xs text-slate-500 uppercase font-bold block mb-1">Weight 2 (Slope Y)</label>
                            <input
                                type="range" min="-2" max="2" step="0.1"
                                value={w2} onChange={(e) => setW2(parseFloat(e.target.value))}
                                className="w-full accent-yellow-500"
                            />
                        </div>
                        <div>
                            <label className="text-xs text-slate-500 uppercase font-bold block mb-1">Bias (Intercept)</label>
                            <input
                                type="range" min="-2" max="2" step="0.1"
                                value={bias} onChange={(e) => setBias(parseFloat(e.target.value))}
                                className="w-full accent-pink-500"
                            />
                        </div>
                    </div>
                </div>

                <div className="text-xs text-slate-400 p-4 bg-slate-900/50 rounded-lg border border-slate-800 italic">
                    "Try to separate the <span className="text-red-400">Red</span> and <span className="text-green-400">Green</span> dots with a single straight line.
                    <br /><br />
                    Spoiler: You can't. This is why we need **Hidden Layers**."
                </div>
            </div>
        </div>
    );
};
