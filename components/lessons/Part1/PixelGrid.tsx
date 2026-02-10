import React, { useState } from 'react';
import { motion } from 'framer-motion';

export const PixelGrid: React.FC = () => {
    const GRID_SIZE = 5;
    const [grid, setGrid] = useState<number[][]>(
        Array(GRID_SIZE).fill(0).map(() => Array(GRID_SIZE).fill(0))
    );

    const togglePixel = (row: number, col: number) => {
        const newGrid = [...grid];
        newGrid[row] = [...newGrid[row]];
        // Toggle between 0 (black), 128 (gray), 255 (white)
        if (newGrid[row][col] === 0) newGrid[row][col] = 128;
        else if (newGrid[row][col] === 128) newGrid[row][col] = 255;
        else newGrid[row][col] = 0;
        setGrid(newGrid);
    };

    return (
        <div className="flex flex-col md:flex-row gap-8 items-center max-w-4xl mx-auto">
            {/* Visual Grid */}
            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 shadow-2xl">
                <h3 className="text-xs font-bold text-slate-500 uppercase mb-4 text-center">The Image (Visual)</h3>
                <div
                    className="grid gap-1"
                    style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, minmax(0, 1fr))` }}
                >
                    {grid.map((row, rowIndex) => (
                        row.map((val, colIndex) => (
                            <motion.div
                                key={`${rowIndex}-${colIndex}`}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => togglePixel(rowIndex, colIndex)}
                                className="w-12 h-12 rounded cursor-pointer border border-slate-700/50"
                                style={{ backgroundColor: `rgb(${val}, ${val}, ${val})` }}
                                title={`Pixel (${rowIndex}, ${colIndex}): ${val}`}
                            />
                        ))
                    ))}
                </div>
                <p className="text-xs text-slate-500 mt-2 text-center">Click pixels to cycle brightness</p>
            </div>

            {/* Numerical Array */}
            <div className="flex-1 bg-slate-950 p-6 rounded-xl border border-slate-800 font-mono text-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 p-2 opacity-10 text-9xl">Matrix</div>
                <h3 className="text-xs font-bold text-indigo-400 uppercase mb-4">The Computer Sees (Data)</h3>

                <div className="space-y-1">
                    <span className="text-yellow-500">image</span> <span className="text-slate-400">=</span> <span className="text-blue-400">[</span>
                    {grid.map((row, i) => (
                        <div key={i} className="pl-4 flex">
                            <span className="text-blue-400">[</span>
                            {row.map((val, j) => (
                                <span key={j} className="w-9 text-right inline-block">
                                    <span className={`${val > 0 ? 'text-white font-bold' : 'text-slate-600'}`}>
                                        {val}
                                    </span>
                                    {j < row.length - 1 && <span className="text-slate-600">,</span>}
                                </span>
                            ))}
                            <span className="text-blue-400">]</span>
                            {i < grid.length - 1 && <span className="text-slate-600">,</span>}
                        </div>
                    ))}
                    <span className="text-blue-400">]</span>
                </div>
            </div>
        </div>
    );
};
