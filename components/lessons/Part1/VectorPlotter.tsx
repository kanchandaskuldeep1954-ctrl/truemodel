import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

export const VectorPlotter: React.FC = () => {
    const [vector, setVector] = useState({ x: 3, y: 4 });
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const SCALE = 30;
    const CENTER_X = 150;
    const CENTER_Y = 150;

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Clear
        ctx.fillStyle = '#0f172a'; // slate-900
        ctx.fillRect(0, 0, 300, 300);

        // Draw Grid
        ctx.strokeStyle = '#1e293b'; // slate-800
        ctx.lineWidth = 1;
        for (let i = 0; i <= 300; i += SCALE) {
            ctx.beginPath();
            ctx.moveTo(i, 0); ctx.lineTo(i, 300);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(0, i); ctx.lineTo(300, i);
            ctx.stroke();
        }

        // Draw Axes
        ctx.strokeStyle = '#475569'; // slate-600
        ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(CENTER_X, 0); ctx.lineTo(CENTER_X, 300); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(0, CENTER_Y); ctx.lineTo(300, CENTER_Y); ctx.stroke();

        // Draw Vector Arrow
        const endX = CENTER_X + vector.x * SCALE;
        const endY = CENTER_Y - vector.y * SCALE; // Y is inverted on canvas

        ctx.strokeStyle = '#6366f1'; // indigo-500
        ctx.lineWidth = 4;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(CENTER_X, CENTER_Y);
        ctx.lineTo(endX, endY);
        ctx.stroke();

        // Arrowhead
        const angle = Math.atan2(CENTER_Y - endY, endX - CENTER_X);
        const headLen = 15;
        ctx.fillStyle = '#6366f1';
        ctx.beginPath();
        ctx.moveTo(endX, endY);
        ctx.lineTo(endX - headLen * Math.cos(angle - Math.PI / 6), endY + headLen * Math.sin(angle - Math.PI / 6));
        ctx.lineTo(endX - headLen * Math.cos(angle + Math.PI / 6), endY + headLen * Math.sin(angle + Math.PI / 6));
        ctx.fill();

    }, [vector]);

    return (
        <div className="flex flex-col md:flex-row gap-8 items-center justify-center max-w-4xl mx-auto">
            {/* Canvas */}
            <div className="relative rounded-xl overflow-hidden shadow-2xl border border-slate-700">
                <canvas ref={canvasRef} width={300} height={300} />
                <div className="absolute top-2 right-2 text-xs text-slate-500 font-mono">
                    Origin (0,0) at Center
                </div>
            </div>

            {/* Controls */}
            <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 w-64">
                <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Vector Properties</h3>

                <div className="space-y-4 mb-6">
                    <div>
                        <label className="text-xs text-slate-400 font-bold">X Component</label>
                        <input
                            type="range" min="-5" max="5" step="0.1"
                            value={vector.x}
                            onChange={(e) => setVector({ ...vector, x: parseFloat(e.target.value) })}
                            className="w-full accent-indigo-500"
                        />
                        <div className="text-right text-indigo-400 font-mono">{vector.x}</div>
                    </div>
                    <div>
                        <label className="text-xs text-slate-400 font-bold">Y Component</label>
                        <input
                            type="range" min="-5" max="5" step="0.1"
                            value={vector.y}
                            onChange={(e) => setVector({ ...vector, y: parseFloat(e.target.value) })}
                            className="w-full accent-indigo-500"
                        />
                        <div className="text-right text-indigo-400 font-mono">{vector.y}</div>
                    </div>
                </div>

                <div className="bg-slate-950 p-3 rounded border border-slate-800 font-mono text-xs">
                    <div className="text-slate-500 mb-1">Magnitude (Length):</div>
                    <div className="text-white text-lg">
                        {Math.sqrt(vector.x ** 2 + vector.y ** 2).toFixed(2)}
                    </div>
                </div>
            </div>
        </div>
    );
};
