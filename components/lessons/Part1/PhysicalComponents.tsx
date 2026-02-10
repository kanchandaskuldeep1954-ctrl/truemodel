
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Power, CircuitBoard, Lightbulb } from 'lucide-react';

// --- Manual Switch: The Foundation ---
export const ManualSwitchViz = ({ onComplete }: { onComplete?: () => void }) => {
    const [isOpen, setIsOpen] = useState(true);

    const toggle = () => {
        setIsOpen(!isOpen);
        if (isOpen && onComplete) setTimeout(onComplete, 1000);
    };

    return (
        <div className="flex flex-col items-center gap-12 p-8 bg-slate-900/50 rounded-3xl border border-white/5 shadow-2xl relative overflow-hidden">
            {/* Battery */}
            <div className="flex gap-20 items-center justify-center w-full">
                <div className="w-16 h-24 bg-slate-800 rounded-lg border-2 border-slate-700 flex flex-col items-center justify-center gap-2 relative">
                    <div className="absolute -top-3 w-8 h-3 bg-slate-600 rounded-t-sm" />
                    <div className="text-slate-500 font-black text-xl">+</div>
                    <div className="w-full h-1 bg-slate-700" />
                    <div className="text-slate-500 font-black text-xl">-</div>
                </div>

                {/* The Switch */}
                <div className="relative w-32 h-20 flex items-center justify-center">
                    {/* Fixed Contacts */}
                    <div className="absolute left-0 w-4 h-4 rounded-full bg-orange-500 shadow-[0_0_10px_#f97316]" />
                    <div className="absolute right-0 w-4 h-4 rounded-full bg-orange-500 shadow-[0_0_10px_#f97316]" />

                    {/* Moving Bridge */}
                    <motion.div
                        onClick={toggle}
                        animate={{ rotate: isOpen ? -45 : 0 }}
                        style={{ originX: 0 }}
                        className="absolute left-2 w-28 h-2 bg-orange-400 rounded-full cursor-pointer shadow-lg hover:bg-orange-300 transition-colors"
                    />
                </div>

                {/* The Bulb */}
                <div className="relative flex flex-col items-center">
                    <motion.div
                        animate={{
                            backgroundColor: isOpen ? '#1e293b' : '#fbbf24',
                            boxShadow: isOpen ? 'none' : '0 0 50px #fbbf24'
                        }}
                        className="w-20 h-20 rounded-full border-4 border-slate-700 flex items-center justify-center overflow-hidden"
                    >
                        <Lightbulb className={isOpen ? 'text-slate-700' : 'text-slate-900'} size={40} />
                    </motion.div>
                    <span className="mt-4 text-xs font-bold text-slate-500 uppercase tracking-widest">{isOpen ? 'Circuit Open' : 'Circuit Closed!'}</span>
                </div>
            </div>

            {/* Electrons (Flowing while closed) */}
            <AnimatePresence>
                {!isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 pointer-events-none"
                    >
                        {[...Array(10)].map((_, i) => (
                            <motion.div
                                key={i}
                                initial={{ offsetDistance: "0%" }}
                                animate={{ offsetDistance: "100%" }}
                                transition={{ duration: 2, repeat: Infinity, delay: i * 0.2, ease: "linear" }}
                                className="w-2 h-2 bg-yellow-400 rounded-full shadow-[0_0_8px_white]"
                                style={{
                                    offsetPath: "path('M 40,48 L 40,110 L 320,110 L 320,48')",
                                }}
                            />
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

// --- Transistor: The Automated Switch ---
export const TransistorViz = ({ onComplete }: { onComplete?: () => void }) => {
    const [gateVoltage, setGateVoltage] = useState(false);

    useEffect(() => {
        if (gateVoltage && onComplete) setTimeout(onComplete, 2000);
    }, [gateVoltage, onComplete]);

    return (
        <div className="flex flex-col items-center gap-8 p-10 bg-slate-950 rounded-3xl border border-white/10 shadow-inner max-w-2xl w-full">
            <h3 className="text-slate-400 font-mono text-sm uppercase tracking-widest">Automation: The Transistor</h3>

            <div className="relative w-full h-80 flex items-center justify-center">
                {/* Main Circuit (Power) */}
                <div className="absolute top-0 bottom-0 left-1/4 w-2 bg-slate-800 rounded-full" />
                <div className="absolute top-0 bottom-0 right-1/4 w-2 bg-slate-800 rounded-full" />

                {/* Drain and Source */}
                <div className="absolute top-10 left-1/4 -translate-x-1/2 flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-blue-600 shadow-[0_0_15px_#2563eb]" />
                    <span className="text-[10px] text-blue-400 mt-2 font-bold">SOURCE</span>
                </div>
                <div className="absolute bottom-10 left-1/4 -translate-x-1/2 flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-slate-700" />
                    <span className="text-[10px] text-slate-500 mt-2 font-bold tracking-widest">DRAIN (Target)</span>
                </div>

                {/* The "Gate" and the automated bridge */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-32 flex items-center justify-center">
                    <div className="relative w-full h-full border-x border-slate-800 border-dashed rounded-xl flex items-center justify-center">
                        {/* The Magnetic Bridge */}
                        <motion.div
                            animate={{
                                y: gateVoltage ? 0 : -30,
                                opacity: gateVoltage ? 1 : 0.6,
                                borderColor: gateVoltage ? '#4ade80' : '#475569'
                            }}
                            className="w-16 h-4 bg-slate-800 border-2 rounded-sm z-20"
                        />

                        {/* The Gate (Control Wire) */}
                        <div className="absolute -right-20 flex flex-col items-center gap-4">
                            <motion.button
                                onClick={() => setGateVoltage(!gateVoltage)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all ${gateVoltage ? 'bg-green-500 shadow-[0_0_20px_#22c55e]' : 'bg-slate-700'}`}
                            >
                                <Zap className={gateVoltage ? 'text-white' : 'text-slate-500'} />
                            </motion.button>
                            <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Control (Gate)</span>
                        </div>
                    </div>
                </div>

                {/* Electricity flow when gate is high */}
                <AnimatePresence>
                    {gateVoltage && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 flex flex-col items-center"
                        >
                            {[...Array(6)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ y: 50, opacity: 0 }}
                                    animate={{ y: 250, opacity: [0, 1, 0] }}
                                    transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
                                    className="absolute left-1/4 -translate-x-1/2 w-2 h-2 bg-blue-400 rounded-full shadow-white"
                                />
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <p className="text-center text-slate-500 text-xs italic px-10">
                Notice: When you apply voltage to the <strong>Gate</strong>, it physically pulls the bridge down to let electricity flow between <strong>Source</strong> and <strong>Drain</strong>.
            </p>
        </div>
    );
};

// --- Hardware Gate: Series vs Parallel ---
export const HardwareGateViz = ({ type, onComplete }: { type: 'SERIES' | 'PARALLEL', onComplete?: () => void }) => {
    const [s1, setS1] = useState(false);
    const [s2, setS2] = useState(false);

    const isSuccess = type === 'SERIES' ? (s1 && s2) : (s1 || s2);

    useEffect(() => {
        if (isSuccess && onComplete) setTimeout(onComplete, 2000);
    }, [isSuccess, onComplete]);

    return (
        <div className="flex flex-col items-center p-8 bg-slate-900/80 rounded-3xl border border-indigo-500/20 shadow-2xl w-full max-w-2xl">
            <h4 className="text-indigo-400 font-black text-sm uppercase tracking-tighter mb-8 flex items-center gap-2">
                <CircuitBoard size={16} /> {type === 'SERIES' ? 'AND GATE (Series Layout)' : 'OR GATE (Parallel Layout)'}
            </h4>

            <div className="relative w-full h-64 flex items-center justify-center gap-12 bg-black/40 rounded-2xl border border-white/5 p-4">
                {/* Switch 1 */}
                <div className="flex flex-col items-center gap-4">
                    <button
                        onClick={() => setS1(!s1)}
                        className={`w-12 h-16 rounded-lg transition-all border-2 ${s1 ? 'bg-indigo-600 border-indigo-400 shadow-[0_0_15px_#6366f1]' : 'bg-slate-800 border-slate-700 opacity-50'}`}
                    >
                        <Zap size={20} className="mx-auto text-white" />
                    </button>
                    <span className="text-[10px] font-bold text-slate-600">Gate A</span>
                </div>

                {type === 'SERIES' ? (
                    <div className="w-12 h-1 bg-slate-700" />
                ) : (
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-40 h-24 border-2 border-slate-800 rounded-full -z-10" />
                )}

                {/* Switch 2 */}
                <div className="flex flex-col items-center gap-4">
                    <button
                        onClick={() => setS2(!s2)}
                        className={`w-12 h-16 rounded-lg transition-all border-2 ${s2 ? 'bg-indigo-600 border-indigo-400 shadow-[0_0_15px_#6366f1]' : 'bg-slate-800 border-slate-700 opacity-50'}`}
                    >
                        <Zap size={20} className="mx-auto text-white" />
                    </button>
                    <span className="text-[10px] font-bold text-slate-600">Gate B</span>
                </div>

                <div className="flex-1 h-1 bg-slate-700 mr-4" />

                {/* Final Output (Light) */}
                <motion.div
                    animate={{
                        scale: isSuccess ? 1.2 : 1,
                        backgroundColor: isSuccess ? '#fbbf24' : '#1e293b',
                        boxShadow: isSuccess ? '0 0 40px #fbbf24' : 'none'
                    }}
                    className="w-16 h-16 rounded-full border-4 border-slate-600 flex items-center justify-center"
                >
                    <Lightbulb className={isSuccess ? 'text-slate-900' : 'text-slate-700'} />
                </motion.div>
            </div>

            <p className="mt-6 text-slate-500 text-xs text-center max-w-md italic">
                {type === 'SERIES'
                    ? "In SERIES, electricity must flow through BOTH transistors to reach the bulb. This is the physical birth of the 'AND' logic."
                    : "In PARALLEL, electricity can reach the bulb through EITHER transistor. This is the physical birth of 'OR' logic."
                }
            </p>
        </div>
    );
};
