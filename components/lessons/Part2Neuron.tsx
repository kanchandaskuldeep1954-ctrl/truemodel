import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// --- Module 2.1: Single Input Neuron ---

export const SingleInputNeuronLesson: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
    const [input, setInput] = useState(5);
    const [weight, setWeight] = useState(0.5);
    const [bias, setBias] = useState(1);

    const step1 = input * weight;
    const step2 = step1 + bias;

    return (
        <div className="flex flex-col items-center gap-8 w-full max-w-2xl">
            <div className="text-center">
                <h2 className="text-2xl font-black text-white mb-2">Your First Neuron</h2>
                <p className="text-slate-400 text-sm">
                    A neuron is just a function: <strong>output = (input × weight) + bias</strong>
                </p>
            </div>

            {/* Visual Neuron */}
            <div className="relative w-full flex items-center justify-center py-8">
                {/* Input */}
                <motion.div
                    className="flex flex-col items-center z-10"
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                >
                    <div className="text-xs text-slate-500 mb-1">INPUT</div>
                    <div className="w-16 h-16 flex items-center justify-center bg-blue-600 rounded-full text-white font-black text-xl shadow-lg">
                        {input}
                    </div>
                </motion.div>

                {/* Connection with Weight */}
                <div className="flex-1 mx-4 relative">
                    <div className="h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-amber-500 text-white px-3 py-1 rounded-full text-xs font-bold"
                    >
                        × {weight}
                    </motion.div>
                    <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-slate-500">
                        = {step1.toFixed(2)}
                    </div>
                </div>

                {/* Neuron Body */}
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="relative z-10"
                >
                    <div className="w-24 h-24 flex items-center justify-center bg-gradient-to-br from-purple-600 to-indigo-700 rounded-full shadow-2xl shadow-purple-900/50 border-4 border-purple-400">
                        <div className="text-center">
                            <div className="text-xs text-purple-200">+ bias</div>
                            <div className="text-white font-black text-lg">{bias}</div>
                        </div>
                    </div>
                    {/* Pulse Effect */}
                    <motion.div
                        animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="absolute inset-0 bg-purple-500 rounded-full -z-10"
                    />
                </motion.div>

                {/* Output Connection */}
                <div className="flex-1 mx-4 h-1 bg-gradient-to-r from-purple-500 to-green-500"></div>

                {/* Output */}
                <motion.div
                    key={step2}
                    initial={{ scale: 1.3 }}
                    animate={{ scale: 1 }}
                    className="flex flex-col items-center z-10"
                >
                    <div className="text-xs text-slate-500 mb-1">OUTPUT</div>
                    <div className="w-16 h-16 flex items-center justify-center bg-green-600 rounded-full text-white font-black text-xl shadow-lg">
                        {step2.toFixed(1)}
                    </div>
                </motion.div>
            </div>

            {/* Controls */}
            <div className="w-full grid grid-cols-3 gap-6 bg-slate-900 rounded-xl p-6">
                <div>
                    <label className="text-xs text-slate-400 uppercase">Input</label>
                    <input
                        type="range" min="0" max="10" step="1"
                        value={input}
                        onChange={(e) => setInput(parseFloat(e.target.value))}
                        className="w-full accent-blue-500"
                    />
                    <div className="text-center text-white font-mono">{input}</div>
                </div>
                <div>
                    <label className="text-xs text-slate-400 uppercase">Weight</label>
                    <input
                        type="range" min="-2" max="2" step="0.1"
                        value={weight}
                        onChange={(e) => setWeight(parseFloat(e.target.value))}
                        className="w-full accent-amber-500"
                    />
                    <div className="text-center text-white font-mono">{weight.toFixed(1)}</div>
                </div>
                <div>
                    <label className="text-xs text-slate-400 uppercase">Bias</label>
                    <input
                        type="range" min="-3" max="3" step="0.1"
                        value={bias}
                        onChange={(e) => setBias(parseFloat(e.target.value))}
                        className="w-full accent-purple-500"
                    />
                    <div className="text-center text-white font-mono">{bias.toFixed(1)}</div>
                </div>
            </div>

            {/* Calculation Breakdown */}
            <div className="bg-slate-900 rounded-xl p-4 font-mono text-center text-sm">
                <span className="text-blue-400">{input}</span>
                <span className="text-slate-400"> × </span>
                <span className="text-amber-400">{weight}</span>
                <span className="text-slate-400"> = {step1.toFixed(2)}</span>
                <br />
                <span className="text-slate-400">{step1.toFixed(2)} + </span>
                <span className="text-purple-400">{bias}</span>
                <span className="text-slate-400"> = </span>
                <span className="text-green-400 font-bold">{step2.toFixed(2)}</span>
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

// --- Module 2.2: Multi-Input Neuron ---

export const MultiInputNeuronLesson: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
    const [inputs, setInputs] = useState([3, 7, 2]);
    const [weights, setWeights] = useState([0.5, 0.3, 0.8]);
    const [bias, setBias] = useState(1);

    const products = inputs.map((inp, i) => inp * weights[i]);
    const weightedSum = products.reduce((a, b) => a + b, 0);
    const output = weightedSum + bias;

    return (
        <div className="flex flex-col items-center gap-8 w-full max-w-3xl">
            <div className="text-center">
                <h2 className="text-2xl font-black text-white mb-2">Multi-Input Neuron</h2>
                <p className="text-slate-400 text-sm">
                    Real neurons take MULTIPLE inputs. Each input has its own weight.
                </p>
            </div>

            {/* Visual */}
            <div className="relative flex items-center gap-8 w-full">
                {/* Inputs */}
                <div className="flex flex-col gap-4">
                    {inputs.map((inp, i) => (
                        <motion.div
                            key={i}
                            initial={{ x: -30, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: i * 0.1 }}
                            className="flex items-center gap-2"
                        >
                            <div className="w-12 h-12 flex items-center justify-center bg-blue-600 rounded-lg text-white font-bold">
                                {inp}
                            </div>
                            <div className="text-amber-400 text-sm font-mono">× {weights[i]}</div>
                            <div className="text-slate-400 text-sm">=</div>
                            <div className="text-white font-mono">{products[i].toFixed(1)}</div>
                        </motion.div>
                    ))}
                </div>

                {/* Sum Arrow */}
                <div className="flex-1 flex flex-col items-center">
                    <div className="text-slate-500 text-xs mb-2">SUM</div>
                    <motion.div
                        animate={{ x: [0, 10, 0] }}
                        transition={{ repeat: Infinity, duration: 1 }}
                        className="text-4xl text-indigo-400"
                    >
                        →
                    </motion.div>
                </div>

                {/* Neuron */}
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="w-24 h-24 flex items-center justify-center bg-gradient-to-br from-purple-600 to-indigo-700 rounded-full shadow-2xl border-4 border-purple-400"
                >
                    <div className="text-center">
                        <div className="text-white font-black text-lg">{weightedSum.toFixed(1)}</div>
                        <div className="text-purple-200 text-xs">+{bias}</div>
                    </div>
                </motion.div>

                {/* Output Arrow */}
                <motion.div
                    animate={{ x: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 1, delay: 0.5 }}
                    className="text-4xl text-indigo-400"
                >
                    →
                </motion.div>

                {/* Output */}
                <motion.div
                    key={output}
                    initial={{ scale: 1.3 }}
                    animate={{ scale: 1 }}
                    className="w-16 h-16 flex items-center justify-center bg-green-600 rounded-full text-white font-black text-xl shadow-lg"
                >
                    {output.toFixed(1)}
                </motion.div>
            </div>

            {/* Formula */}
            <div className="bg-slate-900 rounded-xl p-4 font-mono text-sm text-center">
                ({products.map((p, i) => `${p.toFixed(1)}${i < products.length - 1 ? ' + ' : ''}`).join('')}) + {bias} = <span className="text-green-400 font-bold">{output.toFixed(1)}</span>
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

// --- Module 2.3: Activation Functions ---

export const ActivationFunctionLesson: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
    const [input, setInput] = useState(0);
    const [activation, setActivation] = useState<'sigmoid' | 'relu'>('sigmoid');

    const sigmoid = (x: number) => 1 / (1 + Math.exp(-x));
    const relu = (x: number) => Math.max(0, x);

    const output = activation === 'sigmoid' ? sigmoid(input) : relu(input);

    // Generate curve points
    const points = [];
    for (let x = -5; x <= 5; x += 0.25) {
        const y = activation === 'sigmoid' ? sigmoid(x) : relu(x);
        points.push({ x, y });
    }

    return (
        <div className="flex flex-col items-center gap-8 w-full max-w-2xl">
            <div className="text-center">
                <h2 className="text-2xl font-black text-white mb-2">Activation Functions</h2>
                <p className="text-slate-400 text-sm">
                    These "squeeze" the neuron's output into a useful range.
                </p>
            </div>

            {/* Activation Selector */}
            <div className="flex gap-4">
                <button
                    onClick={() => setActivation('sigmoid')}
                    className={`px-6 py-3 rounded-xl font-bold transition-all ${activation === 'sigmoid' ? 'bg-purple-600 text-white' : 'bg-slate-800 text-slate-400'}`}
                >
                    Sigmoid (0 to 1)
                </button>
                <button
                    onClick={() => setActivation('relu')}
                    className={`px-6 py-3 rounded-xl font-bold transition-all ${activation === 'relu' ? 'bg-green-600 text-white' : 'bg-slate-800 text-slate-400'}`}
                >
                    ReLU (0 or positive)
                </button>
            </div>

            {/* Graph */}
            <div className="w-full h-48 bg-slate-900 rounded-xl border border-slate-700 relative overflow-hidden">
                <svg viewBox="-5 -0.5 10 2" className="w-full h-full" preserveAspectRatio="none">
                    {/* Axes */}
                    <line x1="-5" y1="0" x2="5" y2="0" stroke="#475569" strokeWidth="0.02" />
                    <line x1="0" y1="-0.5" x2="0" y2="1.5" stroke="#475569" strokeWidth="0.02" />

                    {/* Curve */}
                    <polyline
                        points={points.map(p => `${p.x},${1 - p.y}`).join(' ')}
                        fill="none"
                        stroke={activation === 'sigmoid' ? '#a855f7' : '#22c55e'}
                        strokeWidth="0.05"
                    />

                    {/* Current Point */}
                    <motion.circle
                        cx={input}
                        cy={1 - output}
                        r="0.15"
                        fill="#fbbf24"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                    />
                </svg>

                {/* Labels */}
                <div className="absolute bottom-2 right-2 text-xs text-slate-500 font-mono">
                    {activation === 'sigmoid' ? 'σ(x) = 1 / (1 + e⁻ˣ)' : 'ReLU(x) = max(0, x)'}
                </div>
            </div>

            {/* Input Slider */}
            <div className="w-full bg-slate-900 rounded-xl p-4">
                <label className="text-xs text-slate-400 uppercase">Input Value</label>
                <input
                    type="range" min="-5" max="5" step="0.1"
                    value={input}
                    onChange={(e) => setInput(parseFloat(e.target.value))}
                    className="w-full accent-amber-500"
                />
                <div className="flex justify-between mt-2 font-mono text-sm">
                    <span className="text-slate-400">Input: <span className="text-white">{input.toFixed(1)}</span></span>
                    <span className="text-slate-400">Output: <span className={activation === 'sigmoid' ? 'text-purple-400' : 'text-green-400'}>{output.toFixed(3)}</span></span>
                </div>
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
