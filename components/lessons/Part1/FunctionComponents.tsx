import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Settings } from 'lucide-react';

// --- Shared Components ---

// The "Meat Grinder" Function Box
const FunctionBox: React.FC<{
    input: number;
    output: number | string;
    formula: string;
    isProcessing: boolean;
}> = ({ input, output, formula, isProcessing }) => {
    return (
        <div className="flex items-center gap-2">
            {/* Input */}
            <div className="flex flex-col items-center">
                <span className="text-xs text-slate-500 uppercase font-bold mb-2">Input (x)</span>
                <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center font-black text-2xl text-white shadow-lg">
                    {input}
                </div>
            </div>

            {/* Arrow In */}
            <ArrowRight className="w-8 h-8 text-slate-600 animate-pulse" />

            {/* The Machine */}
            <div className="w-48 h-48 bg-slate-800 rounded-2xl border-4 border-slate-700 flex flex-col items-center justify-center relative shadow-2xl">
                <div className="absolute top-0 left-0 w-full h-2 bg-stripes opacity-20 animate-move-stripes"></div>
                <Settings className={`w-12 h-12 text-slate-500 mb-2 ${isProcessing ? 'animate-spin' : ''}`} />
                <span className="font-mono text-xl font-bold text-yellow-400">f(x) = {formula}</span>
                <div className="text-[10px] text-slate-500 mt-2 uppercase tracking-widest">Processing...</div>
            </div>

            {/* Arrow Out */}
            <ArrowRight className="w-8 h-8 text-slate-600 animate-pulse" />

            {/* Output */}
            <div className="flex flex-col items-center">
                <span className="text-xs text-slate-500 uppercase font-bold mb-2">Output (y)</span>
                <motion.div
                    key={output}
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="w-16 h-16 bg-green-600 rounded-lg flex items-center justify-center font-black text-2xl text-white shadow-[0_0_20px_#16a34a]"
                >
                    {output}
                </motion.div>
            </div>
        </div>
    );
};

// --- Step 1: Function Intro Animation ---
export const FunctionIntroAnim = () => {
    const [val, setVal] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setVal(v => (v + 1) % 5);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="scale-75 lg:scale-100">
            <FunctionBox input={val} output={val * 2} formula="2x" isProcessing={true} />
        </div>
    );
};

// --- Step 2: Interactive Machine ---
export const FunctionPlayground = ({ onComplete }: { onComplete: () => void }) => {
    const [input, setInput] = useState(1);
    const [formula, setFormula] = useState<'2x' | 'x+3' | 'x²'>('2x');
    const [processing, setProcessing] = useState(false);
    const [output, setOutput] = useState<number>(2);

    const calculate = (x: number, f: string) => {
        setProcessing(true);
        setTimeout(() => {
            let res = 0;
            if (f === '2x') res = x * 2;
            if (f === 'x+3') res = x + 3;
            if (f === 'x²') res = x * x;
            setOutput(res);
            setProcessing(false);
        }, 500);
    };

    useEffect(() => {
        calculate(input, formula);
    }, [input, formula]);

    // Unlock after they try 'x²' (the non-linear one)
    useEffect(() => {
        if (formula === 'x²' && input > 3) setTimeout(onComplete, 1000);
    }, [formula, input, onComplete]);

    return (
        <div className="flex flex-col items-center gap-8">
            <div className="flex gap-4">
                {['2x', 'x+3', 'x²'].map(f => (
                    <button
                        key={f}
                        onClick={() => setFormula(f as any)}
                        className={`px-4 py-2 rounded-lg font-mono font-bold transition-all ${formula === f ? 'bg-yellow-500 text-black' : 'bg-slate-700 text-slate-300'}`}
                    >
                        f(x) = {f}
                    </button>
                ))}
            </div>

            <FunctionBox input={input} output={output} formula={formula} isProcessing={processing} />

            <div className="w-64">
                <label className="text-xs text-slate-500 uppercase font-bold">Input Value</label>
                <input
                    type="range" min="0" max="10" value={input}
                    onChange={(e) => setInput(parseInt(e.target.value))}
                    className="w-full mt-2 accent-blue-500"
                />
                <div className="flex justify-between text-xs text-slate-600 font-mono mt-1">
                    <span>0</span><span>10</span>
                </div>
            </div>
        </div>
    );
};

// --- Step 3: Challenge (Guess the Function) ---
export const FunctionChallenge = ({ onComplete }: { onComplete: () => void }) => {
    const [input, setInput] = useState(1);
    const [guess, setGuess] = useState('');
    const [processing, setProcessing] = useState(false);

    // Mystery function: 2x + 1
    const output = (input * 2) + 1;

    useEffect(() => {
        setProcessing(true);
        const timer = setTimeout(() => setProcessing(false), 300);
        return () => clearTimeout(timer);
    }, [input]);

    const checkAnswer = (ans: string) => {
        setGuess(ans);
        if (ans === '2x+1') setTimeout(onComplete, 1000);
    };

    return (
        <div className="flex flex-col items-center gap-8">
            <div className="bg-purple-500/10 border border-purple-500/50 px-4 py-2 rounded text-purple-300 font-bold text-sm animate-pulse">
                MYSTERY FUNCTION: f(x) = ???
            </div>

            <FunctionBox input={input} output={output} formula="???" isProcessing={processing} />

            <div className="w-64">
                <label className="text-xs text-slate-500 uppercase font-bold">Test Inputs</label>
                <input
                    type="range" min="0" max="10" value={input}
                    onChange={(e) => setInput(parseInt(e.target.value))}
                    className="w-full mt-2 accent-purple-500"
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                {['2x', 'x+2', '2x+1', '3x'].map(opt => (
                    <button
                        key={opt}
                        onClick={() => checkAnswer(opt)}
                        className={`px-6 py-3 rounded-xl border border-white/10 font-mono font-bold transition-all
                            ${guess === opt
                                ? (opt === '2x+1' ? 'bg-green-500 text-black border-green-500' : 'bg-red-500 text-white border-red-500')
                                : 'bg-slate-800 hover:bg-slate-700'}
                        `}
                    >
                        f(x) = {opt}
                    </button>
                ))}
            </div>
            {guess === '2x+1' && <div className="text-green-400 font-bold">CORRECT! +150 XP</div>}
        </div>
    );
};
