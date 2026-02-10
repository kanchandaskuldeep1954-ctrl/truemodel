import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// --- Shared Components ---

const Gate: React.FC<{
    type: 'AND' | 'OR' | 'XOR';
    a: number;
    b: number;
    label?: string;
}> = ({ type, a, b, label }) => {
    let out = 0;
    if (type === 'AND') out = a && b;
    if (type === 'OR') out = a || b;
    if (type === 'XOR') out = a ^ b;

    return (
        <div className="flex flex-col items-center p-4 bg-slate-800 rounded-xl border border-slate-700 shadow-lg relative">
            <div className="flex gap-4 mb-2">
                <div className={`w-3 h-3 rounded-full ${a ? 'bg-green-500 shadow-[0_0_10px_#22c55e]' : 'bg-slate-600'}`} />
                <div className={`w-3 h-3 rounded-full ${b ? 'bg-green-500 shadow-[0_0_10px_#22c55e]' : 'bg-slate-600'}`} />
            </div>

            <div className="w-20 h-16 bg-slate-700 rounded-lg flex items-center justify-center font-black text-slate-400 border border-slate-600 relative z-10">
                {type}
            </div>

            <div className={`w-4 h-12 -mt-2 ${out ? 'bg-green-500 shadow-[0_0_15px_#22c55e]' : 'bg-slate-600'}`} />

            {label && <span className="absolute -top-3 bg-slate-900 px-2 text-[10px] uppercase font-bold text-slate-500 border border-slate-700 rounded">{label}</span>}
        </div>
    );
};

// --- Step 1: Logic Intro Animation ---
export const LogicIntroAnim = () => {
    return (
        <div className="flex gap-8 opacity-80">
            <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 2 }}>
                <Gate type="AND" a={1} b={1} label="Strict Gate" />
            </motion.div>
            <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 2, delay: 1 }}>
                <Gate type="OR" a={1} b={0} label="Friendly Gate" />
            </motion.div>
        </div>
    );
};

// --- Step 2: Interactive Gates ---
export const LogicPlayground = ({ onComplete }: { onComplete: () => void }) => {
    const [a, setA] = useState(0);
    const [b, setB] = useState(0);

    // Auto-complete if they play with both inputs
    useEffect(() => {
        if (a === 1 && b === 1) setTimeout(onComplete, 1000);
    }, [a, b, onComplete]);

    return (
        <div className="flex flex-col items-center gap-8">
            <div className="flex gap-8">
                <button onClick={() => setA(v => v ? 0 : 1)} className={`w-16 h-16 rounded-full font-bold text-white transition-all ${a ? 'bg-green-500 shadow-lg scale-110' : 'bg-slate-700'}`}>
                    A={a}
                </button>
                <button onClick={() => setB(v => v ? 0 : 1)} className={`w-16 h-16 rounded-full font-bold text-white transition-all ${b ? 'bg-green-500 shadow-lg scale-110' : 'bg-slate-700'}`}>
                    B={b}
                </button>
            </div>

            <div className="grid grid-cols-3 gap-4">
                <Gate type="AND" a={a} b={b} />
                <Gate type="OR" a={a} b={b} />
                <Gate type="XOR" a={a} b={b} />
                <div className="text-center text-xs text-slate-500 mt-2">Both ON</div>
                <div className="text-center text-xs text-slate-500 mt-2">Any ON</div>
                <div className="text-center text-xs text-slate-500 mt-2">Only One</div>
            </div>
        </div>
    );
};

// --- Step 3: Challenge (Build XOR) ---
// Simplified for MVP: Just enable the right inputs to activate specific gate
export const LogicChallenge = ({ onComplete }: { onComplete: () => void }) => {
    const [a, setA] = useState(0);
    const [b, setB] = useState(0);

    // Challenge: Activate XOR but NOT AND (so input must be 0,1 or 1,0)
    const success = (a ^ b) === 1 && (a && b) === 0;

    useEffect(() => {
        if (success) setTimeout(onComplete, 1000);
    }, [success, onComplete]);

    return (
        <div className="flex flex-col items-center gap-6">
            <div className="bg-red-500/10 border border-red-500/50 px-4 py-2 rounded text-red-300 font-bold text-sm">
                MISSION: Turn ON the XOR gate (Only one input can be ON)
            </div>

            <div className="flex gap-8">
                <button onClick={() => setA(v => v ? 0 : 1)} className={`w-12 h-12 rounded bg-slate-700 text-white font-bold ${a ? 'bg-blue-500' : ''}`}>A</button>
                <button onClick={() => setB(v => v ? 0 : 1)} className={`w-12 h-12 rounded bg-slate-700 text-white font-bold ${b ? 'bg-blue-500' : ''}`}>B</button>
            </div>

            <div className="p-4 bg-black/30 rounded-xl border border-white/5">
                <Gate type="XOR" a={a} b={b} />
            </div>
        </div>
    );
};
