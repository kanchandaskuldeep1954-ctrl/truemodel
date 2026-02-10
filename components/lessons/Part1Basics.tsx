import React, { useState } from 'react';
import { motion } from 'framer-motion';

// --- Module 1.1: Numbers ---

export const BinaryConverterLesson: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
    const [decimal, setDecimal] = useState(5);
    const binary = decimal.toString(2).padStart(8, '0');

    return (
        <div className="flex flex-col items-center gap-8 w-full max-w-2xl">
            <div className="text-center">
                <h2 className="text-2xl font-black text-white mb-2">Decimal → Binary Converter</h2>
                <p className="text-slate-400 text-sm">
                    Every number you see is stored as 1s and 0s. Type a number to see its binary form.
                </p>
            </div>

            {/* Input */}
            <div className="flex items-center gap-4">
                <input
                    type="number"
                    value={decimal}
                    onChange={(e) => setDecimal(Math.max(0, Math.min(255, parseInt(e.target.value) || 0)))}
                    className="w-32 text-4xl font-black text-center bg-slate-800 text-white rounded-xl p-4 border-2 border-indigo-500"
                />
                <span className="text-4xl text-indigo-400">=</span>
            </div>

            {/* Binary Output */}
            <div className="flex gap-2">
                {binary.split('').map((bit, i) => (
                    <motion.div
                        key={i}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: i * 0.05 }}
                        className={`w-12 h-16 flex items-center justify-center rounded-lg text-2xl font-black shadow-lg
                            ${bit === '1' ? 'bg-green-500 text-white' : 'bg-slate-700 text-slate-400'}`}
                    >
                        {bit}
                    </motion.div>
                ))}
            </div>

            {/* Place Values */}
            <div className="flex gap-2 text-[10px] text-slate-500 font-mono">
                {[128, 64, 32, 16, 8, 4, 2, 1].map((val, i) => (
                    <div key={i} className="w-12 text-center">{val}</div>
                ))}
            </div>

            {/* Explanation */}
            <div className="bg-slate-800 rounded-xl p-4 text-sm text-slate-300 font-mono">
                {binary.split('').map((bit, i) => (
                    bit === '1' ? (
                        <span key={i}>
                            {i > 0 && ' + '}
                            {[128, 64, 32, 16, 8, 4, 2, 1][i]}
                        </span>
                    ) : null
                ))}
                <span className="text-green-400"> = {decimal}</span>
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

// --- Module 1.2: Arrays ---

export const ArrayVisualizerLesson: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
    const [array, setArray] = useState<number[]>([3, 7, 2, 9, 1]);
    const [newValue, setNewValue] = useState(5);

    const addValue = () => {
        if (array.length < 10) {
            setArray([...array, newValue]);
        }
    };

    const removeValue = (index: number) => {
        setArray(array.filter((_, i) => i !== index));
    };

    return (
        <div className="flex flex-col items-center gap-8 w-full max-w-2xl">
            <div className="text-center">
                <h2 className="text-2xl font-black text-white mb-2">Arrays: Lists of Numbers</h2>
                <p className="text-slate-400 text-sm">
                    An array is just a list of numbers stored together. Neural networks use arrays EVERYWHERE.
                </p>
            </div>

            {/* Array Visualization */}
            <div className="flex gap-2 flex-wrap justify-center">
                {array.map((val, i) => (
                    <motion.div
                        key={i}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        onClick={() => removeValue(i)}
                        className="relative group cursor-pointer"
                    >
                        <div className="w-14 h-14 flex items-center justify-center bg-indigo-600 rounded-lg text-white font-black text-xl shadow-lg hover:bg-red-500 transition-colors">
                            {val}
                        </div>
                        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-[10px] text-slate-500 font-mono">
                            [{i}]
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Add New */}
            <div className="flex items-center gap-2">
                <input
                    type="number"
                    value={newValue}
                    onChange={(e) => setNewValue(parseInt(e.target.value) || 0)}
                    className="w-20 p-2 bg-slate-800 text-white rounded-lg text-center font-mono"
                />
                <button
                    onClick={addValue}
                    className="px-4 py-2 bg-green-600 text-white font-bold rounded-lg hover:bg-green-500 transition-colors"
                >
                    + ADD
                </button>
            </div>

            {/* Code */}
            <div className="bg-slate-900 rounded-xl p-4 w-full font-mono text-sm">
                <span className="text-purple-400">array</span> = [{array.join(', ')}]
                <br />
                <span className="text-slate-500"># Length: {array.length}</span>
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

// --- Module 1.3: Basic Operations ---

export const CalculatorLesson: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
    const [a, setA] = useState(5);
    const [b, setB] = useState(3);
    const [op, setOp] = useState<'+' | '-' | '*' | '/' | '**'>('*');

    const calculate = () => {
        switch (op) {
            case '+': return a + b;
            case '-': return a - b;
            case '*': return a * b;
            case '/': return b !== 0 ? (a / b).toFixed(2) : 'Error';
            case '**': return Math.pow(a, b);
        }
    };

    return (
        <div className="flex flex-col items-center gap-8 w-full max-w-xl">
            <div className="text-center">
                <h2 className="text-2xl font-black text-white mb-2">The AI Calculator</h2>
                <p className="text-slate-400 text-sm">
                    AI is just math. Addition, subtraction, multiplication, division, powers. That's it.
                </p>
            </div>

            {/* Calculator */}
            <div className="flex items-center gap-4 text-4xl font-black">
                <input
                    type="number"
                    value={a}
                    onChange={(e) => setA(parseFloat(e.target.value) || 0)}
                    className="w-20 p-4 bg-slate-800 text-white rounded-xl text-center"
                />
                <select
                    value={op}
                    onChange={(e) => setOp(e.target.value as any)}
                    className="p-4 bg-indigo-600 text-white rounded-xl cursor-pointer"
                >
                    <option value="+">+</option>
                    <option value="-">−</option>
                    <option value="*">×</option>
                    <option value="/">÷</option>
                    <option value="**">^</option>
                </select>
                <input
                    type="number"
                    value={b}
                    onChange={(e) => setB(parseFloat(e.target.value) || 0)}
                    className="w-20 p-4 bg-slate-800 text-white rounded-xl text-center"
                />
                <span className="text-indigo-400">=</span>
                <motion.div
                    key={calculate()}
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                    className="text-green-400"
                >
                    {calculate()}
                </motion.div>
            </div>

            {/* Explanation */}
            <div className="bg-slate-900 rounded-xl p-4 text-center text-slate-300">
                {op === '**' ? (
                    <span>{a}^{b} = {a} multiplied by itself {b} times = {calculate()}</span>
                ) : (
                    <span>Basic math. The foundation of ALL AI.</span>
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

// --- Module 1.4: Function Machine ---

export const FunctionMachineLesson: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
    const [input, setInput] = useState(3);
    const [rule, setRule] = useState<'2x' | 'x+5' | 'x*x'>('2x');

    const applyFunction = () => {
        switch (rule) {
            case '2x': return input * 2;
            case 'x+5': return input + 5;
            case 'x*x': return input * input;
        }
    };

    return (
        <div className="flex flex-col items-center gap-8 w-full max-w-xl">
            <div className="text-center">
                <h2 className="text-2xl font-black text-white mb-2">The Function Machine</h2>
                <p className="text-slate-400 text-sm">
                    Input → Process → Output. This is what EVERY AI does.
                </p>
            </div>

            {/* Function Machine */}
            <div className="flex items-center gap-4">
                {/* Input */}
                <motion.div
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="flex flex-col items-center"
                >
                    <div className="text-xs text-slate-500 mb-1">INPUT (x)</div>
                    <input
                        type="number"
                        value={input}
                        onChange={(e) => setInput(parseFloat(e.target.value) || 0)}
                        className="w-16 h-16 text-2xl font-black text-center bg-blue-600 text-white rounded-xl"
                    />
                </motion.div>

                {/* Arrow */}
                <motion.div
                    animate={{ x: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 1 }}
                    className="text-3xl text-indigo-400"
                >
                    →
                </motion.div>

                {/* Machine */}
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="relative bg-gradient-to-br from-purple-600 to-indigo-700 rounded-2xl p-6 shadow-2xl"
                >
                    <div className="text-xs text-purple-200 mb-2">FUNCTION f(x)</div>
                    <select
                        value={rule}
                        onChange={(e) => setRule(e.target.value as any)}
                        className="bg-purple-800 text-white p-2 rounded-lg w-full text-center font-mono text-xl cursor-pointer"
                    >
                        <option value="2x">2 × x</option>
                        <option value="x+5">x + 5</option>
                        <option value="x*x">x × x</option>
                    </select>
                    {/* Gears */}
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
                        className="absolute -top-3 -right-3 text-2xl"
                    >
                        ⚙️
                    </motion.div>
                </motion.div>

                {/* Arrow */}
                <motion.div
                    animate={{ x: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 1, delay: 0.5 }}
                    className="text-3xl text-indigo-400"
                >
                    →
                </motion.div>

                {/* Output */}
                <motion.div
                    key={applyFunction()}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="flex flex-col items-center"
                >
                    <div className="text-xs text-slate-500 mb-1">OUTPUT (y)</div>
                    <div className="w-16 h-16 text-2xl font-black flex items-center justify-center bg-green-600 text-white rounded-xl">
                        {applyFunction()}
                    </div>
                </motion.div>
            </div>

            {/* Equation */}
            <div className="bg-slate-900 rounded-xl p-4 font-mono text-lg text-center">
                f({input}) = <span className="text-purple-400">{rule.replace('x', String(input))}</span> = <span className="text-green-400">{applyFunction()}</span>
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
