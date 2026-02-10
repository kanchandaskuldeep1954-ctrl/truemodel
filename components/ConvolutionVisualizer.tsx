import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ConvolutionVisualizerProps {
    inputGrid?: number[][]; // Default 5x5 or 6x6
    kernel?: number[][]; // Default 3x3
    onKernelChange?: (kernel: number[][]) => void;
    readOnly?: boolean;
}

export const ConvolutionVisualizer: React.FC<ConvolutionVisualizerProps> = ({
    inputGrid = [
        [0, 0, 0, 0, 0, 0],
        [0, 1, 1, 1, 1, 0],
        [0, 1, 0, 0, 1, 0],
        [0, 1, 0, 0, 1, 0],
        [0, 1, 1, 1, 1, 0],
        [0, 0, 0, 0, 0, 0]
    ],
    kernel = [
        [-1, -1, -1],
        [-1, 8, -1],
        [-1, -1, -1]
    ], // Edge detection
    onKernelChange,
    readOnly = false
}) => {
    const [step, setStep] = useState(0); // 0 to (width-2)*(height-2)
    const [isAnimating, setIsAnimating] = useState(false);

    // Calculate output grid dimensions
    const outputH = inputGrid.length - kernel.length + 1;
    const outputW = inputGrid[0].length - kernel[0].length + 1;

    const maxSteps = outputH * outputW;

    useEffect(() => {
        if (!isAnimating) return;
        const interval = setInterval(() => {
            setStep(prev => (prev + 1) % maxSteps);
        }, 500);
        return () => clearInterval(interval);
    }, [isAnimating, maxSteps]);

    // Current window position
    const currentY = Math.floor(step / outputW);
    const currentX = step % outputW;

    // Calculate convolution value for current step
    const calculateValue = (startRow: number, startCol: number) => {
        let sum = 0;
        for (let i = 0; i < kernel.length; i++) {
            for (let j = 0; j < kernel[0].length; j++) {
                sum += inputGrid[startRow + i][startCol + j] * kernel[i][j];
            }
        }
        return sum;
    };

    const outputGrid = Array(outputH).fill(0).map((_, r) =>
        Array(outputW).fill(0).map((_, c) => calculateValue(r, c))
    );

    return (
        <div className="flex flex-col items-center gap-6 w-full">
            <div className="flex flex-wrap items-center justify-center gap-8">
                {/* Input Grid */}
                <div className="flex flex-col items-center">
                    <div className="text-xs text-slate-400 mb-2">Input Image</div>
                    <div className="grid gap-[1px] bg-slate-800 p-1 border border-slate-700"
                        style={{ gridTemplateColumns: `repeat(${inputGrid[0].length}, minmax(0, 1fr))` }}>
                        {inputGrid.map((row, r) =>
                            row.map((val, c) => {
                                const inWindow = r >= currentY && r < currentY + 3 && c >= currentX && c < currentX + 3;
                                return (
                                    <div key={`${r}-${c}`}
                                        className={`w-8 h-8 flex items-center justify-center text-[10px] font-mono transition-colors duration-300
                                             ${val > 0 ? 'bg-white text-black' : 'bg-black text-slate-700'}
                                             ${inWindow ? 'ring-2 ring-yellow-400 z-10' : ''}
                                         `}
                                    >
                                        {val}
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>

                {/* Operation */}
                <div className="text-2xl text-slate-500 font-black">×</div>

                {/* Kernel (Filter) */}
                <div className="flex flex-col items-center">
                    <div className="text-xs text-slate-400 mb-2">Filter (Kernel)</div>
                    <div className="grid grid-cols-3 gap-1 bg-indigo-900 p-2 rounded-lg">
                        {kernel.map((row, r) =>
                            row.map((val, c) => (
                                <div key={`${r}-${c}`} className="w-8 h-8 flex items-center justify-center bg-indigo-700 text-white font-bold text-sm rounded">
                                    {readOnly ? val : (
                                        <input
                                            type="number"
                                            value={val}
                                            onChange={(e) => {
                                                if (!onKernelChange) return;
                                                const newKernel = [...kernel];
                                                newKernel[r] = [...row]; // Copy row
                                                newKernel[r][c] = parseInt(e.target.value) || 0;
                                                onKernelChange(newKernel);
                                            }}
                                            className="w-full h-full bg-transparent text-center focus:outline-none"
                                        />
                                    )}
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Equals */}
                <div className="text-2xl text-slate-500 font-black">=</div>

                {/* Output Feature Map */}
                <div className="flex flex-col items-center">
                    <div className="text-xs text-slate-400 mb-2">Feature Map</div>
                    <div className="grid gap-[1px] bg-slate-800 p-1 border border-slate-700"
                        style={{ gridTemplateColumns: `repeat(${outputW}, minmax(0, 1fr))` }}>
                        {outputGrid.map((row, r) =>
                            row.map((val, c) => {
                                const isCurrent = r === currentY && c === currentX;
                                return (
                                    <div key={`${r}-${c}`}
                                        className={`w-8 h-8 flex items-center justify-center text-[10px] font-mono transition-all duration-300
                                             ${val > 0 ? 'bg-green-500 text-white' : val < 0 ? 'bg-red-900 text-red-200' : 'bg-black text-slate-700'}
                                             ${isCurrent ? 'scale-110 ring-2 ring-white z-20 shadow-lg' : ''}
                                         `}
                                    >
                                        {val}
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>
            </div>

            {/* Controls */}
            <div className="flex gap-4">
                <button
                    onClick={() => setIsAnimating(!isAnimating)}
                    className={`px-4 py-2 rounded-lg font-bold text-white transition-colors
                        ${isAnimating ? 'bg-red-600 hover:bg-red-500' : 'bg-green-600 hover:bg-green-500'}
                    `}
                >
                    {isAnimating ? 'Pause Scan' : '▶ Start Convolution'}
                </button>
            </div>

            <div className="text-center text-xs text-slate-500 max-w-lg">
                The filter slides over the image (Convolution). It multiplies the pixel values by its own weights and sums them up.
                <br />
                High output = Feature detected (e.g., an edge).
            </div>
        </div>
    );
};
