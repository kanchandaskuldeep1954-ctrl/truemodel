import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export const MatrixViz: React.FC = () => {
    const [matrix, setMatrix] = useState({ a: 1, b: 0, c: 0, d: 1 }); // Identity matrix
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const WIDTH = 300;
    const HEIGHT = 300;
    const CENTER_X = WIDTH / 2;
    const CENTER_Y = HEIGHT / 2;

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Clear
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(0, 0, WIDTH, HEIGHT);

        // Draw Transformed Grid
        const drawGrid = () => {
            ctx.lineWidth = 1;

            // Draw lines
            for (let i = -10; i <= 10; i++) {
                // Vertical lines (x constant, y varies)
                // We transform (i, -10) and (i, 10)
                drawTransformedLine(ctx, i, -10, i, 10, i === 0 ? '#ef4444' : '#1e293b'); // Red for Y axis
                // Horizontal lines (y constant, x varies)
                drawTransformedLine(ctx, -10, i, 10, i, i === 0 ? '#22c55e' : '#1e293b'); // Green for X axis
            }
        };

        const drawTransformedLine = (
            context: CanvasRenderingContext2D,
            x1: number, y1: number,
            x2: number, y2: number,
            color: string
        ) => {
            context.beginPath();
            context.strokeStyle = color;
            const start = transform(x1, y1);
            const end = transform(x2, y2);
            context.moveTo(CENTER_X + start.x * 20, CENTER_Y - start.y * 20);
            context.lineTo(CENTER_X + end.x * 20, CENTER_Y - end.y * 20);
            context.stroke();
        };

        const transform = (x: number, y: number) => {
            // Matrix multiplication:
            // [a b] [x] = [ax + by]
            // [c d] [y]   [cx + dy]
            return {
                x: matrix.a * x + matrix.b * y,
                y: matrix.c * x + matrix.d * y
            };
        };

        drawGrid();

        // Draw Unit Vector i (1,0)
        const iHat = transform(1, 0);
        drawArrow(ctx, 0, 0, iHat.x, iHat.y, '#22c55e');

        // Draw Unit Vector j (0,1)
        const jHat = transform(0, 1);
        drawArrow(ctx, 0, 0, jHat.x, jHat.y, '#ef4444');

    }, [matrix]);

    const drawArrow = (ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number, color: string) => {
        ctx.strokeStyle = color;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(CENTER_X + x1 * 20, CENTER_Y - y1 * 20);
        ctx.lineTo(CENTER_X + x2 * 20, CENTER_Y - y2 * 20);
        ctx.stroke();
    };

    return (
        <div className="flex flex-col md:flex-row gap-8 items-center justify-center max-w-4xl mx-auto">
            <div className="border border-slate-700 rounded-xl overflow-hidden shadow-2xl">
                <canvas ref={canvasRef} width={WIDTH} height={HEIGHT} />
            </div>

            <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
                <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider text-center">Transformation Matrix</h3>

                <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-slate-950 rounded-lg border border-slate-800 font-mono text-xl">
                    <input
                        type="number" step="0.1" value={matrix.a}
                        onChange={(e) => setMatrix({ ...matrix, a: parseFloat(e.target.value) })}
                        className="bg-transparent text-center text-green-400 focus:outline-none border-b border-slate-800 focus:border-green-500"
                    />
                    <input
                        type="number" step="0.1" value={matrix.b}
                        onChange={(e) => setMatrix({ ...matrix, b: parseFloat(e.target.value) })}
                        className="bg-transparent text-center text-red-400 focus:outline-none border-b border-slate-800 focus:border-red-500"
                    />
                    <input
                        type="number" step="0.1" value={matrix.c}
                        onChange={(e) => setMatrix({ ...matrix, c: parseFloat(e.target.value) })}
                        className="bg-transparent text-center text-green-400 focus:outline-none border-b border-slate-800 focus:border-green-500"
                    />
                    <input
                        type="number" step="0.1" value={matrix.d}
                        onChange={(e) => setMatrix({ ...matrix, d: parseFloat(e.target.value) })}
                        className="bg-transparent text-center text-red-400 focus:outline-none border-b border-slate-800 focus:border-red-500"
                    />
                </div>

                <div className="space-y-2">
                    <button onClick={() => setMatrix({ a: 1, b: 0, c: 0, d: 1 })} className="w-full py-2 bg-slate-800 hover:bg-slate-700 rounded text-xs text-white transition-colors">Reset (Identity)</button>
                    <button onClick={() => setMatrix({ a: 2, b: 0, c: 0, d: 2 })} className="w-full py-2 bg-slate-800 hover:bg-slate-700 rounded text-xs text-white transition-colors">Scale (2x)</button>
                    <button onClick={() => setMatrix({ a: 0, b: -1, c: 1, d: 0 })} className="w-full py-2 bg-slate-800 hover:bg-slate-700 rounded text-xs text-white transition-colors">Rotate (90°)</button>
                    <button onClick={() => setMatrix({ a: 1, b: 1, c: 0, d: 1 })} className="w-full py-2 bg-slate-800 hover:bg-slate-700 rounded text-xs text-white transition-colors">Shear</button>
                </div>
            </div>
        </div>
    );
};
