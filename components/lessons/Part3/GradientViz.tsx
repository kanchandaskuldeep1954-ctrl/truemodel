import React, { useRef, useEffect, useState } from 'react';

export const GradientViz: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [slope, setSlope] = useState(0);
    const [xVal, setXVal] = useState(0);

    const WIDTH = 400;
    const HEIGHT = 200;
    const CENTER_X = WIDTH / 2;
    const CENTER_Y = HEIGHT / 2;
    const SCALE = 50;

    // f(x) = sin(x) + x/2 for variety
    const f = (x: number) => Math.sin(x) + x * 0.2;
    const df = (x: number) => Math.cos(x) + 0.2;

    const handleMouseMove = (e: React.MouseEvent) => {
        const rect = canvasRef.current?.getBoundingClientRect();
        if (!rect) return;
        const xPixel = e.clientX - rect.left;
        const x = (xPixel - CENTER_X) / SCALE;
        setXVal(x);
        setSlope(df(x));
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.fillStyle = '#0f172a';
        ctx.fillRect(0, 0, WIDTH, HEIGHT);

        // Draw Axis
        ctx.strokeStyle = '#334155';
        ctx.beginPath();
        ctx.moveTo(0, CENTER_Y); ctx.lineTo(WIDTH, CENTER_Y);
        ctx.moveTo(CENTER_X, 0); ctx.lineTo(CENTER_X, HEIGHT);
        ctx.stroke();

        // Draw Curve
        ctx.strokeStyle = '#6366f1';
        ctx.lineWidth = 3;
        ctx.beginPath();
        for (let px = 0; px <= WIDTH; px++) {
            const x = (px - CENTER_X) / SCALE;
            const y = f(x);
            const py = CENTER_Y - y * SCALE;
            if (px === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
        }
        ctx.stroke();

        // Draw Point
        const px = CENTER_X + xVal * SCALE;
        const py = CENTER_Y - f(xVal) * SCALE;

        ctx.fillStyle = '#facc15';
        ctx.beginPath();
        ctx.arc(px, py, 6, 0, Math.PI * 2);
        ctx.fill();

        // Draw Tangent Line
        const tangentLength = 60;
        // slope m = dy/dx. angle = atan(m)
        // correct visual angle needs to account for aspect ratio if scales differ, but here they are same
        // Note: Y axis is inverted in canvas (0 at top), so visual slope = -math slope
        const m = -slope;

        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(px - 30, py - 30 * m);
        ctx.lineTo(px + 30, py + 30 * m);
        ctx.stroke();

    }, [xVal]);

    return (
        <div className="flex flex-col items-center gap-4 max-w-lg mx-auto">
            <div
                className="rounded-xl overflow-hidden cursor-crosshair border border-slate-700 shadow-xl"
                onMouseMove={handleMouseMove}
            >
                <canvas ref={canvasRef} width={WIDTH} height={HEIGHT} />
            </div>

            <div className="flex gap-8 text-mono w-full justify-center bg-slate-900 p-4 rounded-xl border border-slate-800">
                <div className="text-center">
                    <div className="text-xs text-slate-500 uppercase font-bold">Location (X)</div>
                    <div>{xVal.toFixed(2)}</div>
                </div>
                <div className="text-center">
                    <div className="text-xs text-slate-500 uppercase font-bold">Gradient (Slope)</div>
                    <div className={`text-xl font-bold ${slope > 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {slope.toFixed(2)}
                    </div>
                </div>
            </div>

            <p className="text-xs text-slate-500 text-center">
                Move mouse over graph. <br />
                <span className="text-green-400">Positive Slope</span> = Uphill. <span className="text-red-400">Negative Slope</span> = Downhill.
            </p>
        </div>
    );
};
