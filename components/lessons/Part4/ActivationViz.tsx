import React, { useRef, useEffect, useState } from 'react';

export const ActivationViz: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [funcType, setFuncType] = useState<'sigmoid' | 'relu' | 'tanh' | 'step'>('sigmoid');
    const [inputX, setInputX] = useState(0);

    const WIDTH = 400;
    const HEIGHT = 300;
    const CENTER_X = WIDTH / 2;
    const CENTER_Y = HEIGHT / 2;
    const SCALE = 40; // pixels per unit

    const sigmoid = (x: number) => 1 / (1 + Math.exp(-x));
    const relu = (x: number) => Math.max(0, x);
    const tanh = (x: number) => Math.tanh(x);
    const step = (x: number) => (x >= 0 ? 1 : 0);

    const getFunc = () => {
        switch (funcType) {
            case 'sigmoid': return sigmoid;
            case 'relu': return relu;
            case 'tanh': return tanh;
            case 'step': return step;
        }
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.fillStyle = '#0f172a';
        ctx.fillRect(0, 0, WIDTH, HEIGHT);

        // Grid
        ctx.strokeStyle = '#1e293b';
        ctx.lineWidth = 1;
        ctx.beginPath();
        for (let i = 0; i <= WIDTH; i += SCALE) { ctx.moveTo(i, 0); ctx.lineTo(i, HEIGHT); }
        for (let i = 0; i <= HEIGHT; i += SCALE) { ctx.moveTo(0, i); ctx.lineTo(WIDTH, i); }
        ctx.stroke();

        // Axes
        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(0, CENTER_Y); ctx.lineTo(WIDTH, CENTER_Y);
        ctx.moveTo(CENTER_X, 0); ctx.lineTo(CENTER_X, HEIGHT);
        ctx.stroke();

        // Function Curve
        const f = getFunc();
        ctx.strokeStyle = '#3b82f6';
        ctx.lineWidth = 4;
        ctx.beginPath();
        for (let px = 0; px <= WIDTH; px++) {
            const x = (px - CENTER_X) / SCALE; // Screen to Math
            const y = f(x);
            const py = CENTER_Y - y * SCALE;   // Math to Screen (Y inverted)
            if (px === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
        }
        ctx.stroke();

        // Active Point
        const px = CENTER_X + inputX * SCALE;
        const py = CENTER_Y - f(inputX) * SCALE;

        // Dashed lines to axis
        ctx.setLineDash([5, 5]);
        ctx.strokeStyle = '#64748b';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(px, py); ctx.lineTo(px, CENTER_Y); // Vertical to X axis
        ctx.moveTo(px, py); ctx.lineTo(CENTER_X, py); // Horizontal to Y axis
        ctx.stroke();
        ctx.setLineDash([]);

        // Dot
        ctx.fillStyle = '#ef4444';
        ctx.beginPath();
        ctx.arc(px, py, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 1;
        ctx.stroke();

    }, [inputX, funcType]);

    return (
        <div className="flex flex-col items-center gap-6 w-full max-w-xl mx-auto">
            <div className="flex gap-2 bg-slate-900 p-1 rounded-lg border border-slate-800">
                {(['sigmoid', 'relu', 'tanh', 'step'] as const).map(type => (
                    <button
                        key={type}
                        onClick={() => setFuncType(type)}
                        className={`px-4 py-2 rounded text-xs uppercase font-bold transition-colors ${funcType === type
                                ? 'bg-blue-600 text-white'
                                : 'text-slate-400 hover:text-white hover:bg-slate-800'
                            }`}
                    >
                        {type}
                    </button>
                ))}
            </div>

            <div className="relative rounded-xl overflow-hidden shadow-2xl border border-slate-700">
                <canvas ref={canvasRef} width={WIDTH} height={HEIGHT} />
            </div>

            <div className="w-full bg-slate-900 p-6 rounded-xl border border-slate-800">
                <div className="mb-4">
                    <label className="text-xs text-slate-500 uppercase font-bold mb-2 block">Input (x)</label>
                    <input
                        type="range" min="-5" max="5" step="0.1"
                        value={inputX} onChange={(e) => setInputX(parseFloat(e.target.value))}
                        className="w-full accent-blue-500"
                    />
                </div>

                <div className="flex justify-between items-center text-mono">
                    <div className="bg-slate-950 px-4 py-2 rounded border border-slate-800">
                        <span className="text-blue-400 mr-2">x =</span>
                        <span className="text-white font-bold">{inputX.toFixed(2)}</span>
                    </div>
                    <div className="text-slate-600 text-2xl">→</div>
                    <div className="bg-slate-950 px-4 py-2 rounded border border-slate-800">
                        <span className="text-green-400 mr-2">f(x) =</span>
                        <span className="text-white font-bold">{getFunc()(inputX).toFixed(3)}</span>
                    </div>
                </div>
            </div>

            <p className="text-xs text-slate-500 text-center max-w-sm">
                <strong>Sigmoid</strong> squashes everything between 0 and 1. <br />
                <strong>ReLU</strong> kills negatives but keeps positives (linear).
            </p>
        </div>
    );
};
