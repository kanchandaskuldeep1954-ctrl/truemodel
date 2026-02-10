import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingDown, Target, Zap, RotateCcw } from 'lucide-react';

interface TrainingDashboardProps {
    lossHistory: number[];
    accuracyHistory?: number[];
    currentEpoch: number;
    totalEpochs: number;
    currentBatch?: number;
    totalBatches?: number;
    learningRate?: number;
    isTraining?: boolean;
    onReset?: () => void;
}

export const TrainingDashboard: React.FC<TrainingDashboardProps> = ({
    lossHistory,
    accuracyHistory = [],
    currentEpoch,
    totalEpochs,
    currentBatch = 0,
    totalBatches = 1,
    learningRate = 0.01,
    isTraining = false,
    onReset
}) => {
    const currentLoss = lossHistory[lossHistory.length - 1] || 0;
    const currentAccuracy = accuracyHistory[accuracyHistory.length - 1] || 0;
    const progress = ((currentEpoch - 1) / totalEpochs) * 100 + (currentBatch / totalBatches / totalEpochs) * 100;

    // Normalize loss history for graph (0-100 scale)
    const maxLoss = Math.max(...lossHistory, 1);
    const normalizedLoss = lossHistory.map(l => (1 - l / maxLoss) * 100);

    // Generate SVG path for loss curve
    const generatePath = (data: number[]) => {
        if (data.length < 2) return '';
        const width = 280;
        const height = 100;
        const xStep = width / (data.length - 1 || 1);

        return data.map((val, i) => {
            const x = i * xStep;
            const y = height - (val / 100) * height;
            return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
        }).join(' ');
    };

    return (
        <div className="w-full max-w-2xl bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-slate-800">
                <div className="flex items-center gap-2">
                    <Zap className={`w-4 h-4 ${isTraining ? 'text-amber-400 animate-pulse' : 'text-slate-500'}`} />
                    <span className="text-sm font-bold text-white">Training Dashboard</span>
                </div>
                {onReset && (
                    <button
                        onClick={onReset}
                        className="flex items-center gap-1 text-xs text-slate-400 hover:text-white transition-colors"
                    >
                        <RotateCcw className="w-3 h-3" /> Reset
                    </button>
                )}
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-4 gap-4 p-4 border-b border-slate-800">
                {/* Epoch */}
                <div className="text-center">
                    <div className="text-2xl font-black text-white font-mono">
                        {currentEpoch}/{totalEpochs}
                    </div>
                    <div className="text-[10px] text-slate-500 uppercase tracking-wider">Epoch</div>
                </div>
                {/* Loss */}
                <div className="text-center">
                    <motion.div
                        key={currentLoss}
                        initial={{ scale: 1.2, color: '#f87171' }}
                        animate={{ scale: 1, color: currentLoss < 0.5 ? '#4ade80' : '#fbbf24' }}
                        className="text-2xl font-black font-mono"
                    >
                        {currentLoss.toFixed(3)}
                    </motion.div>
                    <div className="text-[10px] text-slate-500 uppercase tracking-wider">Loss</div>
                </div>
                {/* Accuracy */}
                <div className="text-center">
                    <motion.div
                        key={currentAccuracy}
                        initial={{ scale: 1.2 }}
                        animate={{ scale: 1 }}
                        className={`text-2xl font-black font-mono ${currentAccuracy > 0.9 ? 'text-green-400' : 'text-indigo-400'}`}
                    >
                        {(currentAccuracy * 100).toFixed(1)}%
                    </motion.div>
                    <div className="text-[10px] text-slate-500 uppercase tracking-wider">Accuracy</div>
                </div>
                {/* Learning Rate */}
                <div className="text-center">
                    <div className="text-2xl font-black text-purple-400 font-mono">
                        {learningRate}
                    </div>
                    <div className="text-[10px] text-slate-500 uppercase tracking-wider">LR</div>
                </div>
            </div>

            {/* Loss Graph */}
            <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                    <TrendingDown className="w-3 h-3 text-red-400" />
                    <span className="text-xs text-slate-400 font-bold uppercase">Loss Curve</span>
                </div>
                <div className="relative h-28 bg-slate-900 rounded-lg border border-slate-800 overflow-hidden">
                    <svg viewBox="0 0 280 100" className="w-full h-full" preserveAspectRatio="none">
                        {/* Grid Lines */}
                        {[0, 25, 50, 75, 100].map(y => (
                            <line
                                key={y}
                                x1="0"
                                y1={y}
                                x2="280"
                                y2={y}
                                stroke="#334155"
                                strokeWidth="0.5"
                                strokeDasharray="2,2"
                            />
                        ))}
                        {/* Loss Path */}
                        {lossHistory.length > 1 && (
                            <>
                                {/* Gradient Fill */}
                                <defs>
                                    <linearGradient id="lossGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#ef4444" stopOpacity="0.3" />
                                        <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
                                    </linearGradient>
                                </defs>
                                <motion.path
                                    d={generatePath(normalizedLoss)}
                                    fill="none"
                                    stroke="#ef4444"
                                    strokeWidth="2"
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ duration: 0.5 }}
                                />
                            </>
                        )}
                    </svg>
                    {/* Y-axis Labels */}
                    <div className="absolute top-0 left-0 h-full flex flex-col justify-between p-1 text-[8px] text-slate-600 font-mono">
                        <span>{maxLoss.toFixed(1)}</span>
                        <span>0</span>
                    </div>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="px-4 pb-4">
                <div className="flex items-center justify-between mb-1 text-xs">
                    <span className="text-slate-400">Training Progress</span>
                    <span className="text-white font-mono">{progress.toFixed(0)}%</span>
                </div>
                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.3 }}
                    />
                </div>
            </div>

            {/* Status */}
            <div className="px-4 py-2 bg-slate-900 border-t border-slate-800 flex items-center justify-center gap-2">
                {isTraining ? (
                    <>
                        <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                        <span className="text-xs text-amber-400 font-bold">TRAINING IN PROGRESS...</span>
                    </>
                ) : lossHistory.length > 0 ? (
                    <>
                        <div className="w-2 h-2 rounded-full bg-green-400" />
                        <span className="text-xs text-green-400 font-bold">TRAINING COMPLETE</span>
                    </>
                ) : (
                    <>
                        <div className="w-2 h-2 rounded-full bg-slate-500" />
                        <span className="text-xs text-slate-500 font-bold">READY TO TRAIN</span>
                    </>
                )}
            </div>
        </div>
    );
};
