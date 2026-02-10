import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrainingDashboard } from '../TrainingDashboard';

// --- Module 3.1: What is Learning? ---

export const ErrorConceptLesson: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
    const [target, setTarget] = useState(10);
    const [prediction, setPrediction] = useState(7);
    const error = prediction - target;

    return (
        <div className="flex flex-col items-center gap-8 w-full max-w-xl">
            <div className="text-center">
                <h2 className="text-2xl font-black text-white mb-2">Error = Prediction - Target</h2>
                <p className="text-slate-400 text-sm">
                    Learning is about reducing the gap between what you predict and what's true.
                </p>
            </div>

            {/* Visual */}
            <div className="w-full flex items-center justify-between px-8">
                <div className="flex flex-col items-center">
                    <div className="text-xs text-slate-500 mb-1">TARGET</div>
                    <motion.div className="w-20 h-20 flex items-center justify-center bg-green-600 rounded-full text-white font-black text-2xl">
                        {target}
                    </motion.div>
                </div>

                <div className="flex-1 mx-6 relative">
                    <div className="h-1 bg-slate-700"></div>
                    <motion.div
                        animate={{ x: [0, 10, 0] }}
                        transition={{ repeat: Infinity, duration: 1 }}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-red-500 text-white px-4 py-2 rounded-full font-bold"
                    >
                        Error: {error > 0 ? '+' : ''}{error}
                    </motion.div>
                </div>

                <div className="flex flex-col items-center">
                    <div className="text-xs text-slate-500 mb-1">PREDICTION</div>
                    <motion.div
                        key={prediction}
                        initial={{ scale: 1.2 }}
                        animate={{ scale: 1 }}
                        className="w-20 h-20 flex items-center justify-center bg-blue-600 rounded-full text-white font-black text-2xl"
                    >
                        {prediction}
                    </motion.div>
                </div>
            </div>

            {/* Controls */}
            <div className="w-full bg-slate-900 rounded-xl p-6 grid grid-cols-2 gap-6">
                <div>
                    <label className="text-xs text-slate-400 uppercase">Target (Truth)</label>
                    <input
                        type="range" min="0" max="20" value={target}
                        onChange={(e) => setTarget(parseInt(e.target.value))}
                        className="w-full accent-green-500"
                    />
                    <div className="text-center text-green-400 font-mono">{target}</div>
                </div>
                <div>
                    <label className="text-xs text-slate-400 uppercase">Prediction (Guess)</label>
                    <input
                        type="range" min="0" max="20" value={prediction}
                        onChange={(e) => setPrediction(parseInt(e.target.value))}
                        className="w-full accent-blue-500"
                    />
                    <div className="text-center text-blue-400 font-mono">{prediction}</div>
                </div>
            </div>

            {/* Insight */}
            <div className={`text-center p-4 rounded-xl ${Math.abs(error) === 0 ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400'}`}>
                {Math.abs(error) === 0 ? (
                    <span className="font-bold">✓ PERFECT! Error = 0. The model learned correctly.</span>
                ) : (
                    <span>Goal: Adjust prediction until Error = 0</span>
                )}
            </div>

            <button
                onClick={onComplete}
                className="px-6 py-3 bg-green-600 hover:bg-green-500 text-white font-bold rounded-xl transition-colors"
            >
                I UNDERSTAND →
            </button>
        </div>
    );
};

// --- Module 3.2: Loss Functions ---

export const LossFunctionLesson: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
    const [predictions, setPredictions] = useState([7, 12, 9]);
    const targets = [10, 10, 10];

    const errors = predictions.map((p, i) => p - targets[i]);
    const squaredErrors = errors.map(e => e * e);
    const mse = squaredErrors.reduce((a, b) => a + b, 0) / squaredErrors.length;

    return (
        <div className="flex flex-col items-center gap-8 w-full max-w-2xl">
            <div className="text-center">
                <h2 className="text-2xl font-black text-white mb-2">Loss Function: MSE</h2>
                <p className="text-slate-400 text-sm">
                    Mean Squared Error punishes large mistakes more than small ones.
                </p>
            </div>

            {/* Data Points */}
            <div className="grid grid-cols-3 gap-6">
                {predictions.map((pred, i) => (
                    <div key={i} className="bg-slate-900 rounded-xl p-4 text-center">
                        <div className="text-xs text-slate-500 mb-2">Sample {i + 1}</div>
                        <div className="flex items-center gap-2 justify-center mb-2">
                            <span className="text-green-400">{targets[i]}</span>
                            <span className="text-slate-600">vs</span>
                            <input
                                type="number"
                                value={pred}
                                onChange={(e) => {
                                    const newPreds = [...predictions];
                                    newPreds[i] = parseInt(e.target.value) || 0;
                                    setPredictions(newPreds);
                                }}
                                className="w-16 p-1 bg-slate-800 text-blue-400 rounded text-center font-mono"
                            />
                        </div>
                        <div className="text-xs text-red-400">
                            Error: {errors[i]} → {errors[i]}² = {squaredErrors[i]}
                        </div>
                    </div>
                ))}
            </div>

            {/* MSE Calculation */}
            <div className="bg-slate-900 rounded-xl p-6 w-full text-center">
                <div className="text-sm text-slate-400 mb-2">Mean Squared Error</div>
                <div className="font-mono text-lg">
                    ({squaredErrors.join(' + ')}) / {squaredErrors.length} =
                    <span className="text-amber-400 font-bold ml-2">{mse.toFixed(2)}</span>
                </div>
            </div>

            {/* Visualization */}
            <div className="w-full h-32 bg-slate-900 rounded-xl relative overflow-hidden flex items-end justify-around p-4">
                {squaredErrors.map((se, i) => (
                    <motion.div
                        key={i}
                        initial={{ height: 0 }}
                        animate={{ height: `${Math.min(se * 2, 100)}%` }}
                        className="w-16 bg-gradient-to-t from-red-600 to-amber-500 rounded-t-lg flex items-end justify-center pb-2"
                    >
                        <span className="text-white text-xs font-bold">{se}</span>
                    </motion.div>
                ))}
            </div>

            <button
                onClick={onComplete}
                className="px-6 py-3 bg-green-600 hover:bg-green-500 text-white font-bold rounded-xl transition-colors"
            >
                I UNDERSTAND →
            </button>
        </div>
    );
};

// --- Module 3.3: Gradient Descent ---

export const GradientDescentLesson: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
    const [position, setPosition] = useState(4);
    const [learningRate, setLearningRate] = useState(0.3);
    const [history, setHistory] = useState<number[]>([4]);

    // Simple parabola loss: L = (x - 2)^2
    const loss = (x: number) => Math.pow(x - 2, 2);
    const gradient = (x: number) => 2 * (x - 2);

    const step = () => {
        const grad = gradient(position);
        const newPos = position - learningRate * grad;
        setPosition(newPos);
        setHistory([...history, newPos]);
    };

    const reset = () => {
        setPosition(4);
        setHistory([4]);
    };

    // Generate curve points
    const curvePoints = [];
    for (let x = -1; x <= 5; x += 0.1) {
        curvePoints.push({ x, y: loss(x) });
    }

    return (
        <div className="flex flex-col items-center gap-8 w-full max-w-2xl">
            <div className="text-center">
                <h2 className="text-2xl font-black text-white mb-2">Gradient Descent: The Hiker</h2>
                <p className="text-slate-400 text-sm">
                    Imagine being blindfolded on a hill. You feel the slope and step downhill. Repeat until you reach the bottom.
                </p>
            </div>

            {/* Loss Landscape */}
            <div className="w-full h-48 bg-slate-900 rounded-xl relative overflow-hidden border border-slate-700">
                <svg viewBox="-1 0 6 10" className="w-full h-full" preserveAspectRatio="none">
                    {/* Curve */}
                    <polyline
                        points={curvePoints.map(p => `${p.x},${10 - p.y}`).join(' ')}
                        fill="none"
                        stroke="#6366f1"
                        strokeWidth="0.1"
                    />
                    {/* History path */}
                    {history.map((h, i) => (
                        <circle
                            key={i}
                            cx={h}
                            cy={10 - loss(h)}
                            r={i === history.length - 1 ? 0.2 : 0.1}
                            fill={i === history.length - 1 ? '#fbbf24' : '#475569'}
                        />
                    ))}
                    {/* Current position */}
                    <motion.circle
                        cx={position}
                        cy={10 - loss(position)}
                        r={0.25}
                        fill="#fbbf24"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                    />
                    {/* Minimum marker */}
                    <line x1="2" y1="0" x2="2" y2="10" stroke="#22c55e" strokeWidth="0.03" strokeDasharray="0.1,0.1" />
                </svg>
                <div className="absolute bottom-2 left-2 text-xs text-green-400">Minimum (x=2)</div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 w-full">
                <div className="bg-slate-900 rounded-xl p-4 text-center">
                    <div className="text-xs text-slate-500">Position (x)</div>
                    <div className="text-2xl font-black text-white font-mono">{position.toFixed(2)}</div>
                </div>
                <div className="bg-slate-900 rounded-xl p-4 text-center">
                    <div className="text-xs text-slate-500">Loss</div>
                    <div className="text-2xl font-black text-amber-400 font-mono">{loss(position).toFixed(2)}</div>
                </div>
                <div className="bg-slate-900 rounded-xl p-4 text-center">
                    <div className="text-xs text-slate-500">Gradient</div>
                    <div className="text-2xl font-black text-red-400 font-mono">{gradient(position).toFixed(2)}</div>
                </div>
            </div>

            {/* Learning Rate */}
            <div className="w-full bg-slate-900 rounded-xl p-4">
                <label className="text-xs text-slate-400 uppercase">Learning Rate</label>
                <input
                    type="range" min="0.05" max="1" step="0.05"
                    value={learningRate}
                    onChange={(e) => setLearningRate(parseFloat(e.target.value))}
                    className="w-full accent-purple-500"
                />
                <div className="text-center text-purple-400 font-mono">{learningRate.toFixed(2)}</div>
            </div>

            {/* Controls */}
            <div className="flex gap-4">
                <button
                    onClick={step}
                    className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition-colors"
                >
                    TAKE A STEP ↓
                </button>
                <button
                    onClick={reset}
                    className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white font-bold rounded-xl transition-colors"
                >
                    RESET
                </button>
            </div>

            {/* Success */}
            {Math.abs(position - 2) < 0.1 && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-green-900/30 text-green-400 px-6 py-3 rounded-xl font-bold"
                >
                    ✓ You found the minimum! Loss ≈ 0
                </motion.div>
            )}

            <button
                onClick={onComplete}
                className="px-6 py-3 bg-green-600 hover:bg-green-500 text-white font-bold rounded-xl transition-colors"
            >
                I UNDERSTAND →
            </button>
        </div>
    );
};

// --- Module 3.4: Training Loop ---

export const TrainingLoopLesson: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
    const [isTraining, setIsTraining] = useState(false);
    const [epoch, setEpoch] = useState(0);
    const [lossHistory, setLossHistory] = useState<number[]>([]);
    const [weight, setWeight] = useState(0.5);

    // Simple training simulation
    const targetWeight = 2.0;
    const learningRate = 0.2;

    useEffect(() => {
        if (!isTraining) return;

        const interval = setInterval(() => {
            setEpoch(prev => {
                if (prev >= 10) {
                    setIsTraining(false);
                    return prev;
                }
                return prev + 1;
            });

            setWeight(prev => {
                const error = targetWeight - prev;
                const newWeight = prev + learningRate * error;
                const loss = Math.pow(error, 2);
                setLossHistory(prev => [...prev, loss]);
                return newWeight;
            });
        }, 500);

        return () => clearInterval(interval);
    }, [isTraining]);

    const startTraining = () => {
        setIsTraining(true);
        setEpoch(0);
        setLossHistory([]);
        setWeight(0.5);
    };

    return (
        <div className="flex flex-col items-center gap-8 w-full max-w-2xl">
            <div className="text-center">
                <h2 className="text-2xl font-black text-white mb-2">The Training Loop</h2>
                <p className="text-slate-400 text-sm">
                    Epoch after epoch, the model adjusts its weights to minimize loss.
                </p>
            </div>

            {/* Training Dashboard */}
            <TrainingDashboard
                lossHistory={lossHistory}
                currentEpoch={epoch}
                totalEpochs={10}
                learningRate={learningRate}
                isTraining={isTraining}
                onReset={startTraining}
            />

            {/* Weight Display */}
            <div className="bg-slate-900 rounded-xl p-6 w-full text-center">
                <div className="text-sm text-slate-400 mb-2">Current Weight</div>
                <motion.div
                    key={weight}
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                    className="text-4xl font-black text-indigo-400 font-mono"
                >
                    {weight.toFixed(3)}
                </motion.div>
                <div className="text-xs text-slate-500 mt-2">Target: {targetWeight.toFixed(1)}</div>
            </div>

            {/* Start Button */}
            {!isTraining && epoch === 0 && (
                <button
                    onClick={startTraining}
                    className="px-8 py-4 bg-green-600 hover:bg-green-500 text-white font-bold rounded-xl transition-colors text-lg"
                >
                    START TRAINING 🚀
                </button>
            )}

            {epoch >= 10 && (
                <button
                    onClick={onComplete}
                    className="px-6 py-3 bg-green-600 hover:bg-green-500 text-white font-bold rounded-xl transition-colors"
                >
                    I UNDERSTAND →
                </button>
            )}
        </div>
    );
};

// --- Module 3.5: Backpropagation Intro ---

export const BackpropIntroLesson: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
    const [showStep, setShowStep] = useState(0);

    const steps = [
        { title: '1. Forward Pass', desc: 'Data flows forward through the network, making predictions.', color: 'text-blue-400' },
        { title: '2. Calculate Loss', desc: 'Compare prediction to target. How wrong are we?', color: 'text-red-400' },
        { title: '3. Backward Pass', desc: 'Error flows BACKWARD, telling each weight how to adjust.', color: 'text-amber-400' },
        { title: '4. Update Weights', desc: 'Apply gradient descent to all weights simultaneously.', color: 'text-green-400' },
    ];

    return (
        <div className="flex flex-col items-center gap-8 w-full max-w-2xl">
            <div className="text-center">
                <h2 className="text-2xl font-black text-white mb-2">Backpropagation</h2>
                <p className="text-slate-400 text-sm">
                    The algorithm that makes deep learning possible. It propagates errors backward.
                </p>
            </div>

            {/* Visual Network */}
            <div className="w-full h-32 bg-slate-900 rounded-xl relative overflow-hidden flex items-center justify-center gap-4 px-8">
                {['Input', 'Hidden', 'Output'].map((layer, i) => (
                    <React.Fragment key={layer}>
                        <motion.div
                            animate={{
                                borderColor: showStep === 0 ? '#3b82f6' : showStep === 2 ? '#fbbf24' : '#475569',
                                boxShadow: showStep === 0 || showStep === 2 ? '0 0 20px rgba(99,102,241,0.5)' : 'none'
                            }}
                            className="w-16 h-16 rounded-full border-2 flex items-center justify-center text-xs text-white font-bold"
                        >
                            {layer}
                        </motion.div>
                        {i < 2 && (
                            <motion.div
                                animate={{
                                    scaleX: showStep === 0 ? [1, 1.2, 1] : showStep === 2 ? [-1, -1.2, -1] : 1,
                                    color: showStep === 0 ? '#3b82f6' : showStep === 2 ? '#fbbf24' : '#475569'
                                }}
                                transition={{ repeat: Infinity, duration: 1 }}
                                className="text-2xl"
                            >
                                →
                            </motion.div>
                        )}
                    </React.Fragment>
                ))}
            </div>

            {/* Steps */}
            <div className="w-full space-y-2">
                {steps.map((step, i) => (
                    <motion.div
                        key={i}
                        onClick={() => setShowStep(i)}
                        animate={{
                            backgroundColor: showStep === i ? 'rgba(99,102,241,0.2)' : 'transparent',
                            borderColor: showStep === i ? '#6366f1' : '#334155'
                        }}
                        className="p-4 rounded-xl border cursor-pointer transition-all"
                    >
                        <div className={`font-bold ${step.color}`}>{step.title}</div>
                        <div className="text-sm text-slate-400">{step.desc}</div>
                    </motion.div>
                ))}
            </div>

            <button
                onClick={onComplete}
                className="px-6 py-3 bg-green-600 hover:bg-green-500 text-white font-bold rounded-xl transition-colors"
            >
                I UNDERSTAND →
            </button>
        </div>
    );
};
