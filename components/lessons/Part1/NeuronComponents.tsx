import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Brain, CheckCircle } from 'lucide-react';

// --- Shared Components ---

// --- Step 1: Synapse Animation ---
export const NeuronIntroAnim = () => {
    return (
        <div className="relative w-full h-full min-h-[300px] flex items-center justify-center">
            {/* Input Neuron */}
            <div className="absolute left-10 w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center font-bold text-white shadow-[0_0_20px_#2563eb] z-10">
                INPUT
            </div>

            {/* Output Neuron */}
            <div className="absolute right-10 w-24 h-24 bg-purple-600 rounded-full flex items-center justify-center font-bold text-white shadow-[0_0_30px_#9333ea] z-10">
                OUTPUT
            </div>

            {/* Axon (Connection) */}
            <div className="absolute left-28 right-32 h-2 bg-slate-700 rounded-full overflow-hidden">
                <motion.div
                    className="w-full h-full bg-yellow-400 shadow-[0_0_10px_#facc15]"
                    initial={{ x: '-100%' }}
                    animate={{ x: '100%' }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                />
            </div>

            {/* Particles */}
            {[...Array(5)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-white rounded-full"
                    initial={{ x: -100, y: (Math.random() - 0.5) * 100, opacity: 0 }}
                    animate={{ x: 100, y: (Math.random() - 0.5) * 50, opacity: [0, 1, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
                />
            ))}
        </div>
    );
};

// --- Step 2: Interactive Weight/Bias ---
export const NeuronPlayground = ({ onComplete }: { onComplete: () => void }) => {
    const [weight, setWeight] = useState(1);
    const [bias, setBias] = useState(0);
    const [input, setInput] = useState(1);

    // Simple linear activation: y = wx + b
    const output = (input * weight) + bias;
    const activated = output > 0 ? 1 : 0; // Step function

    useEffect(() => {
        // Unlock if they find a configuration that activates with negative input 
        // (Proves understanding of bias overcoming negative weight*input)
        if (input < 0 && activated === 1) {
            setTimeout(onComplete, 1500);
        }
    }, [input, activated, onComplete]);

    return (
        <div className="w-full max-w-2xl flex flex-col items-center gap-8">

            {/* The Neuron Diagram */}
            <div className="flex items-center justify-between w-full relative">
                {/* Input Node */}
                <div className="text-center">
                    <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center font-bold text-white mb-2">
                        {input.toFixed(1)}
                    </div>
                    <span className="text-xs uppercase font-bold text-slate-500">Input (x)</span>
                </div>

                {/* Connection Line */}
                <div className="flex-1 h-32 relative flex items-center justify-center">
                    <div className="absolute top-1/2 left-0 right-0 h-1 bg-slate-700 -z-10"></div>

                    {/* Weight Multiplier */}
                    <div className="bg-slate-800 border border-slate-600 px-3 py-1 rounded text-xs font-mono text-yellow-500">
                        × {weight.toFixed(1)}
                    </div>
                </div>

                {/* Neuron Body (Sum + Bias) */}
                <div className="w-40 h-40 bg-slate-800 rounded-full border-4 border-slate-700 flex flex-col items-center justify-center relative">
                    <span className="mb-1 text-slate-400 text-xs">SUM + BIAS</span>
                    <span className="text-2xl font-bold text-white">{(input * weight).toFixed(1)} + {bias}</span>
                    <div className="absolute -bottom-8 text-xs font-mono text-pink-500">
                        Bias: {bias}
                    </div>
                </div>

                {/* Arrow Output */}
                <Activity className={`w-8 h-8 ${activated ? 'text-green-500' : 'text-slate-600'} mx-4`} />

                {/* Output Node */}
                <div className="text-center">
                    <motion.div
                        animate={{ scale: activated ? 1.2 : 1 }}
                        className={`w-20 h-20 rounded-full flex items-center justify-center font-black text-3xl shadow-xl transition-colors duration-300
                    ${activated ? 'bg-green-500 text-white shadow-green-500/50' : 'bg-slate-700 text-slate-500'}
                `}
                    >
                        {activated}
                    </motion.div>
                    <span className="text-xs uppercase font-bold text-slate-500 mt-2 block">Activation</span>
                </div>
            </div>

            {/* Controls */}
            <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 bg-black/20 p-6 rounded-xl border border-white/5">
                <div>
                    <label className="text-blue-400 font-bold text-xs uppercase mb-2 block">Input (x)</label>
                    <input
                        type="range" min="-5" max="5" step="0.5"
                        value={input} onChange={(e) => setInput(parseFloat(e.target.value))}
                        className="w-full accent-blue-500"
                    />
                </div>
                <div>
                    <label className="text-yellow-400 font-bold text-xs uppercase mb-2 block">Weight (w)</label>
                    <input
                        type="range" min="-5" max="5" step="0.1"
                        value={weight} onChange={(e) => setWeight(parseFloat(e.target.value))}
                        className="w-full accent-yellow-500"
                    />
                </div>
                <div>
                    <label className="text-pink-400 font-bold text-xs uppercase mb-2 block">Bias (b)</label>
                    <input
                        type="range" min="-5" max="5" step="0.5"
                        value={bias} onChange={(e) => setBias(parseFloat(e.target.value))}
                        className="w-full accent-pink-500"
                    />
                </div>
            </div>
        </div>
    );
};

// --- Step 3: Challenge (Classification) ---
export const NeuronChallenge = ({ onComplete }: { onComplete: () => void }) => {
    // Challenge: Set W and B such that x=2 activates(1) and x=-1 deactivates(0)
    // AND x=0 must deactivate (this forces bias to be negative if weight is positive)
    const [weight, setWeight] = useState(1);
    const [bias, setBias] = useState(0);

    // Check constraints
    const pass1 = (2 * weight) + bias > 0;
    const pass2 = (-1 * weight) + bias <= 0;
    const pass3 = (0 * weight) + bias <= 0;
    const success = pass1 && pass2 && pass3;

    useEffect(() => {
        if (success) setTimeout(onComplete, 1000);
    }, [success, onComplete]);

    return (
        <div className="flex flex-col items-center gap-8">
            <div className="bg-purple-500/10 border border-purple-500/50 px-6 py-4 rounded-lg text-center">
                <h4 className="text-purple-300 font-bold mb-2">MISSION: SPERATE THE DATA</h4>
                <div className="text-sm text-purple-200">
                    <div>1. Input <strong>2</strong> must fire (1)</div>
                    <div>2. Input <strong>-1</strong> must NOT fire (0)</div>
                    <div>3. Input <strong>0</strong> must NOT fire (0)</div>
                </div>
            </div>

            <div className="flex gap-4">
                <div className={`px-4 py-2 rounded font-bold ${pass1 ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>Target 1 (x=2)</div>
                <div className={`px-4 py-2 rounded font-bold ${pass2 ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>Target 2 (x=-1)</div>
                <div className={`px-4 py-2 rounded font-bold ${pass3 ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>Target 3 (x=0)</div>
            </div>

            {/* Reuse controls logic (simplified) */}
            <div className="w-full max-w-lg grid grid-cols-2 gap-8">
                <div>
                    <label className="text-yellow-400 font-bold text-xs uppercase mb-2 block">Weight: {weight}</label>
                    <input
                        type="range" min="-5" max="5" step="0.5"
                        value={weight} onChange={(e) => setWeight(parseFloat(e.target.value))}
                        className="w-full accent-yellow-500"
                    />
                </div>
                <div>
                    <label className="text-pink-400 font-bold text-xs uppercase mb-2 block">Bias: {bias}</label>
                    <input
                        type="range" min="-5" max="5" step="0.5"
                        value={bias} onChange={(e) => setBias(parseFloat(e.target.value))}
                        className="w-full accent-pink-500"
                    />
                </div>
            </div>

            {success && <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-green-400 font-black text-2xl">DATA SEPARATED!</motion.div>}
        </div>
    );
};
