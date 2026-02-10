import React, { useState } from 'react';
import { motion } from 'framer-motion';

export interface DataPoint {
    id: string;
    x: number; // 0 to 1
    y: number; // 0 to 1
    label?: number; // 0 or 1 for classification
}

interface DatasetVisualizerProps {
    data: DataPoint[];
    predictionFn?: (x: number) => number; // For regression lines
    separationFn?: (x: number, y: number) => number; // For classification boundaries
    onDataChange?: (newData: DataPoint[]) => void;
    readOnly?: boolean;
}

export const DatasetVisualizer: React.FC<DatasetVisualizerProps> = ({
    data,
    predictionFn,
    separationFn,
    onDataChange,
    readOnly = false
}) => {
    const [hoveredPoint, setHoveredPoint] = useState<string | null>(null);

    const handleCanvasClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (readOnly || !onDataChange) return;

        const rect = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = 1 - (e.clientY - rect.top) / rect.height; // Flip Y so 0 is bottom

        const newPoint: DataPoint = {
            id: Math.random().toString(36).substr(2, 9),
            x,
            y,
            label: Math.random() > 0.5 ? 1 : 0
        };

        onDataChange([...data, newPoint]);
    };

    const removePoint = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        if (readOnly || !onDataChange) return;
        onDataChange(data.filter(p => p.id !== id));
    };

    // Generate path for regression line
    const generateRegressionPath = () => {
        if (!predictionFn) return '';
        const points = [];
        for (let x = 0; x <= 1; x += 0.05) {
            const y = predictionFn(x);
            points.push(`${x * 100},${(1 - y) * 100}`);
        }
        return `M ${points.join(' L ')}`;
    };

    return (
        <div className="w-full aspect-square bg-slate-900 rounded-xl border border-slate-700 relative overflow-hidden"
            onClick={handleCanvasClick}
            style={{ cursor: readOnly ? 'default' : 'crosshair' }}
        >
            {/* Grid */}
            <div className="absolute inset-0 opacity-20 pointer-events-none"
                style={{
                    backgroundImage: 'linear-gradient(#475569 1px, transparent 1px), linear-gradient(90deg, #475569 1px, transparent 1px)',
                    backgroundSize: '10% 10%'
                }}
            />

            {/* Regression Line */}
            {predictionFn && (
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                    <motion.path
                        d={generateRegressionPath()}
                        fill="none"
                        stroke="#818cf8"
                        strokeWidth="4"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1 }}
                    />
                </svg>
            )}

            {/* Data Points */}
            <div className="absolute inset-0">
                {data.map(point => (
                    <motion.div
                        key={point.id}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        whileHover={{ scale: 1.5 }}
                        style={{
                            left: `${point.x * 100}%`,
                            top: `${(1 - point.y) * 100}%`,
                        }}
                        className={`absolute w-3 h-3 -ml-1.5 -mt-1.5 rounded-full border-2 border-white shadow-lg
                            ${point.label === 1 ? 'bg-blue-500' : 'bg-red-500'}
                            cursor-pointer transition-transform
                        `}
                        onMouseEnter={() => setHoveredPoint(point.id)}
                        onMouseLeave={() => setHoveredPoint(null)}
                        onClick={(e) => removePoint(point.id, e)}
                    >
                        {hoveredPoint === point.id && (
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] px-2 py-1 rounded whitespace-nowrap z-10 pointer-events-none">
                                ({point.x.toFixed(2)}, {point.y.toFixed(2)})
                            </div>
                        )}
                    </motion.div>
                ))}
            </div>

            {/* Instructions */}
            {!readOnly && data.length === 0 && (
                <div className="absolute inset-0 flex items-center justify-center text-slate-500 text-sm pointer-events-none">
                    Click to add data points
                </div>
            )}
        </div>
    );
};
