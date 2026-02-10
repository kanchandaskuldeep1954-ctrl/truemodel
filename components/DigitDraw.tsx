import React, { useRef, useState, useEffect } from 'react';

interface DigitDrawProps {
    onPrediction?: (probabilities: number[]) => void;
    readOnly?: boolean;
}

export const DigitDraw: React.FC<DigitDrawProps> = ({
    onPrediction,
    readOnly = false
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [probabilities, setProbabilities] = useState<number[]>(Array(10).fill(0));

    // Grid size (MNIST is 28x28)
    const GRID_SIZE = 28;
    const PIXEL_SIZE = 10; // Visual scale

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Initialize black background
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }, []);

    const getCoordinates = (e: React.MouseEvent | React.TouchEvent) => {
        const canvas = canvasRef.current;
        if (!canvas) return { x: 0, y: 0 };
        const rect = canvas.getBoundingClientRect();

        let clientX, clientY;
        if ('touches' in e) {
            clientX = e.touches[0].clientX;
            clientY = e.touches[0].clientY;
        } else {
            clientX = (e as React.MouseEvent).clientX;
            clientY = (e as React.MouseEvent).clientY;
        }

        return {
            x: clientX - rect.left,
            y: clientY - rect.top
        };
    };

    const draw = (e: React.MouseEvent | React.TouchEvent) => {
        if (!isDrawing || readOnly) return;
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const { x, y } = getCoordinates(e);

        ctx.lineWidth = 20;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.strokeStyle = 'white';
        ctx.shadowBlur = 10;
        ctx.shadowColor = 'white';

        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x, y);

        predict();
    };

    const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
        if (readOnly) return;
        setIsDrawing(true);
        const { x, y } = getCoordinates(e);
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (ctx) {
            ctx.beginPath();
            ctx.moveTo(x, y);
        }
    };

    const stopDrawing = () => {
        setIsDrawing(false);
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (ctx) ctx.beginPath(); // Reset path
    };

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        setProbabilities(Array(10).fill(0));
        onPrediction?.(Array(10).fill(0));
    };

    // --- Simple Heuristic Inference (Fake Neural Net) ---
    // In a real app, we'd send the pixel data to a TensorFlow.js model.
    // Here, we'll use a very simple heuristic just to show the UI working.
    // (Counting pixels in quadrants to guess 0, 1, 8 roughly)
    const predict = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Get standard 28x28 image data
        // For simplicity, we just look at the raw canvas data directly here
        // A real resize is complex without a library.

        // Let's generate PSEUDO-random probabilities that look stable 
        // based on where pixels are drawn (hashed) so it feels deterministic.

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        let massX = 0;
        let massY = 0;
        let totalMass = 0;
        let topHalf = 0;
        let bottomHalf = 0;
        let leftHalf = 0;
        let centerMass = 0;

        for (let i = 0; i < data.length; i += 4) {
            // Red channel as brightness (grayscale)
            const val = data[i];
            if (val > 50) {
                const pixelIdx = i / 4;
                const x = pixelIdx % canvas.width;
                const y = Math.floor(pixelIdx / canvas.width);

                massX += x;
                massY += y;
                totalMass++;

                if (y < canvas.height / 2) topHalf++;
                else bottomHalf++;

                if (x < canvas.width / 2) leftHalf++;

                // Center check
                if (x > canvas.width * 0.3 && x < canvas.width * 0.7 && y > canvas.height * 0.3 && y < canvas.height * 0.7) {
                    centerMass++;
                }
            }
        }

        if (totalMass < 50) {
            setProbabilities(Array(10).fill(0));
            return; // Empty
        }

        // --- Heuristics ---
        const probs = Array(10).fill(0.01);

        // "1": Tall and thin. Low width variance.
        // "0": High outlier/mass ratio? (Hole in middle).

        // For now, let's just make it feel "alive" by reacting to drawing.
        // If lots of center mass -> 1, 8, 0
        // If mostly top -> 7

        // 1
        if (totalMass > 0 && centerMass / totalMass > 0.4) probs[1] += 0.5;

        // 0 (Hole in middle - low center mass relative to total, but distributed around)
        if (totalMass > 500 && centerMass / totalMass < 0.2) probs[0] += 0.4;

        // 7 (Top heavy)
        if (topHalf > bottomHalf * 1.5) probs[7] += 0.4;

        // 6 (Bottom heavy)
        if (bottomHalf > topHalf * 1.5) probs[6] += 0.4;

        // Normalize
        const sum = probs.reduce((a, b) => a + b, 0);
        const normalized = probs.map(p => p / sum);

        setProbabilities(normalized);
        onPrediction?.(normalized);
    };

    return (
        <div className="flex flex-col md:flex-row gap-8 items-center justify-center w-full">
            {/* Drawing Area */}
            <div className="flex flex-col gap-2">
                <canvas
                    ref={canvasRef}
                    width={280} // 28x10 scale
                    height={280}
                    className="bg-black border-4 border-slate-700 rounded-xl cursor-crosshair touch-none shadow-2xl shadow-indigo-500/20"
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                    onTouchStart={startDrawing}
                    onTouchMove={draw}
                    onTouchEnd={stopDrawing}
                />
                <div className="flex justify-between">
                    <button
                        onClick={clearCanvas}
                        className="text-xs text-red-400 hover:text-red-300 font-bold"
                    >
                        ✖ CLEAR
                    </button>
                    <div className="text-xs text-slate-500">Draw a digit (0-9)</div>
                </div>
            </div>

            {/* Inference (Bar Chart) */}
            <div className="w-64 flex flex-col gap-1">
                <div className="text-sm font-bold text-slate-400 mb-2 text-center">AI Confidence</div>
                {probabilities.map((prob, i) => (
                    <div key={i} className="flex items-center gap-2 h-6">
                        <div className={`w-4 text-xs font-mono font-bold ${prob > 0.5 ? 'text-green-400' : 'text-slate-500'}`}>
                            {i}
                        </div>
                        <div className="flex-1 bg-slate-800 h-2 rounded-full overflow-hidden">
                            <div
                                className={`h-full transition-all duration-100 ${prob > 0.5 ? 'bg-green-500' : 'bg-indigo-500'}`}
                                style={{ width: `${prob * 100}%` }}
                            />
                        </div>
                        <div className="w-8 text-[10px] text-slate-500 text-right">
                            {(prob * 100).toFixed(0)}%
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
