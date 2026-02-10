import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

export const OptimizerViz: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [optimizer, setOptimizer] = useState<'sgd' | 'momentum' | 'adam'>('sgd');
    const [path, setPath] = useState<{ x: number, y: number }[]>([]);
    const [isRunning, setIsRunning] = useState(false);

    const WIDTH = 350;
    const HEIGHT = 250;

    // Loss surface: A stretched bowl
    const loss = (x: number, y: number) => 0.5 * x * x + 5 * y * y;
    const dLoss = (x: number, y: number) => ({ dx: x, dy: 10 * y }); // Gradient

    useEffect(() => {
        if (!isRunning) return;

        let x = 3, y = 2; // Starting point
        let vx = 0, vy = 0; // Velocity (for momentum)
        let mx = 0, my = 0, vx2 = 0, vy2 = 0; // Adam accumulators
        const lr = 0.1;
        const beta1 = 0.9, beta2 = 0.999, eps = 1e-8;
        let t = 0;
        const newPath: { x: number, y: number }[] = [{ x, y }];

        const interval = setInterval(() => {
            t++;
            const { dx, dy } = dLoss(x, y);

            if (optimizer === 'sgd') {
                x -= lr * dx;
                y -= lr * dy;
            } else if (optimizer === 'momentum') {
                vx = 0.9 * vx + lr * dx;
                vy = 0.9 * vy + lr * dy;
                x -= vx;
                y -= vy;
            } else if (optimizer === 'adam') {
                mx = beta1 * mx + (1 - beta1) * dx;
                my = beta1 * my + (1 - beta1) * dy;
                vx2 = beta2 * vx2 + (1 - beta2) * dx * dx;
                vy2 = beta2 * vy2 + (1 - beta2) * dy * dy;
                const mxHat = mx / (1 - Math.pow(beta1, t));
                const myHat = my / (1 - Math.pow(beta1, t));
                const vxHat = vx2 / (1 - Math.pow(beta2, t));
                const vyHat = vy2 / (1 - Math.pow(beta2, t));
                x -= lr * mxHat / (Math.sqrt(vxHat) + eps);
                y -= lr * myHat / (Math.sqrt(vyHat) + eps);
            }

            newPath.push({ x, y });
            setPath([...newPath]);

            if (Math.abs(x) < 0.1 && Math.abs(y) < 0.1 || t > 50) {
                setIsRunning(false);
                clearInterval(interval);
            }
        }, 100);

        return () => clearInterval(interval);
    }, [isRunning, optimizer]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Draw contours
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(0, 0, WIDTH, HEIGHT);

        const cx = WIDTH / 2, cy = HEIGHT / 2;
        const scale = 30;

        // Contour lines
        for (let level = 1; level <= 10; level++) {
            ctx.strokeStyle = `rgba(99, 102, 241, ${0.1 + level * 0.05})`;
            ctx.beginPath();
            for (let angle = 0; angle <= 2 * Math.PI; angle += 0.05) {
                const r = Math.sqrt(2 * level);
                const x = r * Math.cos(angle);
                const y = r * Math.sin(angle) / Math.sqrt(10); // Stretched
                const px = cx + x * scale;
                const py = cy + y * scale;
                if (angle === 0) ctx.moveTo(px, py);
                else ctx.lineTo(px, py);
            }
            ctx.closePath();
            ctx.stroke();
        }

        // Draw path
        if (path.length > 1) {
            ctx.strokeStyle = '#ef4444';
            ctx.lineWidth = 2;
            ctx.beginPath();
            path.forEach((p, i) => {
                const px = cx + p.x * scale;
                const py = cy + p.y * scale;
                if (i === 0) ctx.moveTo(px, py);
                else ctx.lineTo(px, py);
            });
            ctx.stroke();

            // Current position
            const last = path[path.length - 1];
            ctx.fillStyle = '#facc15';
            ctx.beginPath();
            ctx.arc(cx + last.x * scale, cy + last.y * scale, 5, 0, Math.PI * 2);
            ctx.fill();
        }

        // Min point
        ctx.fillStyle = '#22c55e';
        ctx.beginPath();
        ctx.arc(cx, cy, 4, 0, Math.PI * 2);
        ctx.fill();

    }, [path]);

    const reset = () => {
        setPath([]);
        setIsRunning(true);
    };

    return (
        <div className="flex flex-col items-center gap-6 w-full max-w-lg mx-auto">
            <div className="relative rounded-xl overflow-hidden shadow-2xl border border-slate-700">
                <canvas ref={canvasRef} width={WIDTH} height={HEIGHT} />
            </div>

            <div className="flex gap-2 bg-slate-900 p-2 rounded-lg border border-slate-800">
                {(['sgd', 'momentum', 'adam'] as const).map(opt => (
                    <button
                        key={opt}
                        onClick={() => { setOptimizer(opt); setPath([]); }}
                        className={`px-4 py-2 rounded text-xs uppercase font-bold ${optimizer === opt ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800'}`}
                    >
                        {opt}
                    </button>
                ))}
            </div>

            <button
                onClick={reset}
                className="px-8 py-3 rounded-lg bg-green-600 hover:bg-green-500 text-white font-bold"
            >
                ▶ Run Optimization
            </button>

            <p className="text-xs text-slate-400 text-center">
                Watch how different optimizers navigate an elongated loss surface.
                <br />
                <strong className="text-blue-400">Adam</strong> adapts and converges fastest.
            </p>
        </div>
    );
};
