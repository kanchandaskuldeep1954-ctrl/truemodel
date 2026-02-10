import React, { useState } from 'react';
import { motion } from 'framer-motion';

export const VoltageViz: React.FC<{ onComplete?: () => void }> = ({ onComplete }) => {
    const [isOn, setIsOn] = useState(false);

    const toggle = () => {
        setIsOn(!isOn);
        if (!isOn && onComplete) {
            setTimeout(onComplete, 1000);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center p-8 gap-12 w-full max-w-2xl mx-auto">

            {/* Circuit Visualization */}
            <div className="relative w-full h-48 bg-slate-900 rounded-xl border border-slate-800 shadow-inner flex items-center justify-center overflow-hidden">

                {/* Wire */}
                <div className={`absolute h-4 w-full transition-colors duration-500 ${isOn ? 'bg-yellow-400 shadow-[0_0_20px_rgba(250,204,21,0.6)]' : 'bg-slate-700'}`} />

                {/* Electrons (Animated dots) */}
                {isOn && (
                    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                        {Array.from({ length: 10 }).map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute w-2 h-2 bg-white rounded-full mx-10" // added horizontal spacing simulation
                                initial={{ x: -350 }}
                                animate={{ x: 350 }}
                                transition={{
                                    repeat: Infinity,
                                    duration: 2,
                                    ease: "linear",
                                    delay: i * 0.2
                                }}
                            />
                        ))}
                    </div>
                )}

                {/* Labels */}
                <div className="absolute left-4 top-4 font-mono text-xs text-slate-500">SOURCE</div>
                <div className="absolute right-4 top-4 font-mono text-xs text-slate-500">DESTINATION</div>

            </div>

            {/* Meter */}
            <div className="flex gap-8 items-center">
                <div className={`p-6 rounded-xl border transition-all duration-300 ${isOn ? 'bg-yellow-500/10 border-yellow-500 text-yellow-400' : 'bg-slate-800 border-slate-700 text-slate-500'}`}>
                    <div className="text-sm font-bold uppercase tracking-wider mb-1">Voltage</div>
                    <div className="text-4xl font-mono font-black">{isOn ? '5.0V' : '0.0V'}</div>
                </div>

                <div className={`p-6 rounded-xl border transition-all duration-300 ${isOn ? 'bg-green-500/10 border-green-500 text-green-400' : 'bg-slate-800 border-slate-700 text-slate-500'}`}>
                    <div className="text-sm font-bold uppercase tracking-wider mb-1">Logic State</div>
                    <div className="text-4xl font-mono font-black">{isOn ? '1 (ON)' : '0 (OFF)'}</div>
                </div>
            </div>

            {/* Switch */}
            <button
                onClick={toggle}
                className={`
          px-8 py-4 rounded-full font-bold text-lg uppercase tracking-widest transition-all transform hover:scale-105 active:scale-95
          ${isOn
                        ? 'bg-red-500 text-white shadow-[0_0_20px_rgba(239,68,68,0.5)] hover:bg-red-600'
                        : 'bg-green-500 text-white shadow-[0_0_20px_rgba(34,197,94,0.5)] hover:bg-green-600'
                    }
        `}
            >
                {isOn ? 'Cut Power' : 'Apply Voltage'}
            </button>

        </div>
    );
};
