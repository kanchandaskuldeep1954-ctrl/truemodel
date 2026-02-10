
import React, { useState, useEffect } from 'react';

export const NeuronViz: React.FC<{onComplete?: () => void}> = ({onComplete}) => {
  const [input, setInput] = useState<number>(5);
  const [weight, setWeight] = useState<number>(0.5);
  const [bias, setBias] = useState<number>(1);

  const step1 = input * weight;
  const result = step1 + bias;

  useEffect(() => {
    if (Math.abs(result - 5.0) < 0.1 && onComplete) onComplete();
  }, [result, onComplete]);

  return (
    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-xl">
      <h3 className="text-lg font-bold text-white mb-4">The Neuron Sandbox</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase">Input</label>
          <input type="range" min="0" max="10" step="0.1" value={input} onChange={(e) => setInput(parseFloat(e.target.value))} className="w-full mt-2 accent-blue-500" />
          <div className="text-center font-bold text-blue-400">{input}</div>
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase">Weight</label>
          <input type="range" min="-2" max="2" step="0.1" value={weight} onChange={(e) => setWeight(parseFloat(e.target.value))} className="w-full mt-2 accent-purple-500" />
          <div className="text-center font-bold text-purple-400">{weight}</div>
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase">Bias</label>
          <input type="range" min="-5" max="5" step="0.1" value={bias} onChange={(e) => setBias(parseFloat(e.target.value))} className="w-full mt-2 accent-orange-500" />
          <div className="text-center font-bold text-orange-400">{bias}</div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center p-8 bg-slate-900 rounded-lg relative overflow-hidden border border-slate-700">
        {/* Connection Visual */}
        <div className="flex items-center gap-4 z-10">
          <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold shadow-lg border border-blue-400">{input}</div>
          <div className="h-0.5 w-16 bg-slate-600 relative">
             <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold text-purple-400">x {weight}</div>
          </div>
          <div className="w-24 h-24 rounded-full border-4 border-slate-600 bg-slate-800 flex flex-col items-center justify-center shadow-lg relative">
            <span className="text-[10px] text-slate-400 font-bold mb-1">NEURON</span>
            <span className="text-xl font-bold text-white">{step1.toFixed(1)}</span>
            <span className="text-[10px] text-orange-400 absolute bottom-2">+{bias}</span>
          </div>
          <div className="h-0.5 w-16 bg-slate-600"></div>
          <div className={`w-16 h-16 rounded flex items-center justify-center text-white font-bold text-xl shadow-md border-2 transition-colors duration-300 ${Math.abs(result - 5.0) < 0.1 ? 'bg-green-500 border-green-400 shadow-[0_0_20px_rgba(74,222,128,0.5)]' : 'bg-slate-700 border-slate-500'}`}>{result.toFixed(1)}</div>
        </div>
        
        <div className="mt-8 text-center text-sm font-mono bg-slate-800 p-3 rounded border border-slate-600 text-slate-300">
          ({input} &times; {weight}) + {bias} = <span className="text-green-400 font-bold">{result.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};
