import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SwitchCamera, Check } from 'lucide-react';

// --- Shared Components ---

const Bit: React.FC<{
    val: number;
    onChange?: () => void;
    label?: string;
    locked?: boolean
}> = ({ val, onChange, label, locked }) => (
    <div className="flex flex-col items-center gap-2">
        <motion.button
            whileTap={locked ? {} : { scale: 0.9 }}
            onClick={!locked && onChange ? onChange : undefined}
            className={`
        w-16 h-24 rounded-lg flex items-center justify-center text-3xl font-black shadow-lg border-b-4 transition-all
        ${val === 1
                    ? 'bg-blue-500 border-blue-700 text-white shadow-blue-500/50'
                    : 'bg-slate-700 border-slate-900 text-slate-500'}
        ${locked ? 'cursor-default opacity-80' : 'cursor-pointer hover:translate-y-1 hover:border-b-2'}
      `}
        >
            {val}
        </motion.button>
        {label && <span className="text-xs font-mono text-slate-500 uppercase">{label}</span>}
    </div>
);

// --- Step 1: Binary Intro Animation ---
export const BinaryIntroAnim = ({ }) => {
    const [bits, setBits] = useState(Array(12).fill(0));

    useEffect(() => {
        const interval = setInterval(() => {
            setBits(prev => prev.map(() => Math.random() > 0.5 ? 1 : 0));
        }, 500);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="grid grid-cols-6 gap-4 opacity-50">
            {bits.map((b, i) => (
                <motion.div
                    key={i}
                    animate={{ scale: b ? 1.1 : 1, opacity: b ? 1 : 0.3 }}
                    className={`w-12 h-12 rounded bg-indigo-500 flex items-center justify-center font-mono font-bold text-white shadow-lg`}
                >
                    {b}
                </motion.div>
            ))}
        </div>
    );
};

// --- Step 2: Single Switch ---
export const BinarySingleSwitch = ({ onComplete }: { onComplete: () => void }) => {
    const [val, setVal] = useState(0);

    const toggle = () => {
        setVal(v => {
            const newVal = v === 0 ? 1 : 0;
            if (newVal === 1) setTimeout(onComplete, 500);
            return newVal;
        });
    };

    return (
        <div className="flex flex-col items-center">
            <Bit val={val} onChange={toggle} label="1 Bit" />
            <div className="mt-8 text-2xl font-bold text-white">
                State: <span className={val ? "text-blue-400" : "text-slate-500"}>{val === 1 ? 'ON' : 'OFF'}</span>
            </div>
        </div>
    );
};

// --- Step 3: Binary Counter ---
export const BinaryCounter = ({ }) => {
    const [bits, setBits] = useState([0, 0, 0]);
    const value = parseInt(bits.join(''), 2);

    const toggle = (idx: number) => {
        const newBits = [...bits];
        newBits[idx] = newBits[idx] === 0 ? 1 : 0;
        setBits(newBits);
    };

    return (
        <div className="flex flex-col items-center gap-8">
            <div className="flex gap-4">
                {bits.map((b, i) => (
                    <Bit key={i} val={b} onChange={() => toggle(i)} label={Math.pow(2, 2 - i).toString()} />
                ))}
            </div>

            <div className="flex items-center gap-4 bg-slate-800 px-6 py-4 rounded-xl border border-slate-700">
                <span className="text-slate-400 font-mono text-xl">VALUE =</span>
                <motion.span
                    key={value}
                    initial={{ scale: 1.5, color: '#fff' }}
                    animate={{ scale: 1, color: '#818cf8' }}
                    className="text-5xl font-black text-indigo-400"
                >
                    {value}
                </motion.span>
            </div>
        </div>
    );
};

// --- Step 4: Challenge 5 ---
export const BinaryChallenge5 = ({ onComplete }: { onComplete: () => void }) => {
    const [bits, setBits] = useState([0, 0, 0]);
    const value = parseInt(bits.join(''), 2);

    useEffect(() => {
        if (value === 5) {
            setTimeout(onComplete, 500);
        }
    }, [value, onComplete]);

    const toggle = (idx: number) => {
        const newBits = [...bits];
        newBits[idx] = newBits[idx] === 0 ? 1 : 0;
        setBits(newBits);
    };

    return (
        <div className="flex flex-col items-center gap-8">
            <div className="bg-red-500/10 border border-red-500/50 rounded-lg px-4 py-2 text-red-300 font-bold mb-4">
                TARGET: 5
            </div>

            <div className="flex gap-4">
                {bits.map((b, i) => (
                    <Bit key={i} val={b} onChange={() => toggle(i)} label={Math.pow(2, 2 - i).toString()} />
                ))}
            </div>

            <div className="text-4xl font-black text-slate-500 mt-4">
                Current: {value}
            </div>
        </div>
    );
};
