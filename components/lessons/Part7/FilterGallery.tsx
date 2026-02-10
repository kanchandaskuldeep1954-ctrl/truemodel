import React, { useState, useEffect, useRef } from 'react';

export const FilterGallery: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [filterType, setFilterType] = useState<'edge' | 'blur' | 'sharpen' | 'emboss'>('edge');

    const filters: Record<string, number[][]> = {
        edge: [
            [-1, -1, -1],
            [-1, 8, -1],
            [-1, -1, -1],
        ],
        blur: [
            [1 / 9, 1 / 9, 1 / 9],
            [1 / 9, 1 / 9, 1 / 9],
            [1 / 9, 1 / 9, 1 / 9],
        ],
        sharpen: [
            [0, -1, 0],
            [-1, 5, -1],
            [0, -1, 0],
        ],
        emboss: [
            [-2, -1, 0],
            [-1, 1, 1],
            [0, 1, 2],
        ],
    };

    // Sample 8x8 image
    const image = [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 1, 1, 1, 1, 1, 0],
        [0, 1, 0, 0, 0, 0, 1, 0],
        [0, 1, 0, 1, 1, 0, 1, 0],
        [0, 1, 0, 1, 1, 0, 1, 0],
        [0, 1, 0, 0, 0, 0, 1, 0],
        [0, 1, 1, 1, 1, 1, 1, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
    ];

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const kernel = filters[filterType];
        const output: number[][] = [];

        // Apply convolution
        for (let r = 0; r < image.length - 2; r++) {
            const row: number[] = [];
            for (let c = 0; c < image[0].length - 2; c++) {
                let sum = 0;
                for (let kr = 0; kr < 3; kr++) {
                    for (let kc = 0; kc < 3; kc++) {
                        sum += image[r + kr][c + kc] * kernel[kr][kc];
                    }
                }
                row.push(sum);
            }
            output.push(row);
        }

        // Normalize for display
        const min = Math.min(...output.flat());
        const max = Math.max(...output.flat());
        const normalize = (v: number) => ((v - min) / (max - min || 1)) * 255;

        // Draw
        const cellSize = 25;
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(0, 0, 300, 200);

        output.forEach((row, r) => {
            row.forEach((val, c) => {
                const gray = Math.floor(normalize(val));
                ctx.fillStyle = `rgb(${gray}, ${gray}, ${gray})`;
                ctx.fillRect(c * cellSize + 50, r * cellSize + 25, cellSize - 1, cellSize - 1);
            });
        });

    }, [filterType]);

    return (
        <div className="flex flex-col items-center gap-6 w-full max-w-lg mx-auto">

            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-2">
                {(['edge', 'blur', 'sharpen', 'emboss'] as const).map(type => (
                    <button
                        key={type}
                        onClick={() => setFilterType(type)}
                        className={`px-4 py-2 rounded-lg font-bold text-sm capitalize transition-all ${filterType === type
                                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30'
                                : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                            }`}
                    >
                        {type}
                    </button>
                ))}
            </div>

            {/* Kernel Display */}
            <div className="flex items-center gap-6">
                <div className="flex flex-col items-center">
                    <div className="text-xs text-slate-500 uppercase mb-1">Filter</div>
                    <div className="grid grid-cols-3 gap-1 bg-indigo-900/50 p-2 rounded-lg">
                        {filters[filterType].map((row, r) =>
                            row.map((val, c) => (
                                <div key={`${r}-${c}`} className="w-8 h-8 flex items-center justify-center bg-indigo-800 text-indigo-200 text-[10px] font-mono rounded">
                                    {val.toFixed(val % 1 !== 0 ? 1 : 0)}
                                </div>
                            ))
                        )}
                    </div>
                </div>

                <div className="text-2xl text-slate-600">→</div>

                {/* Output */}
                <div className="flex flex-col items-center">
                    <div className="text-xs text-slate-500 uppercase mb-1">Result</div>
                    <canvas ref={canvasRef} width={200} height={175} className="rounded-lg border border-slate-800" />
                </div>
            </div>

            <p className="text-xs text-slate-400 text-center">
                Each filter highlights different features. In a CNN, filters are <strong>learned automatically</strong>!
            </p>
        </div>
    );
};
