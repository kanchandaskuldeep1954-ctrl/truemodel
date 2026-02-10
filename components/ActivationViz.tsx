
import React, { useState } from 'react';

export const ActivationViz: React.FC<{onComplete?: () => void}> = ({onComplete}) => {
  const [mode, setMode] = useState<'relu' | 'sigmoid'>('relu');
  const [input, setInput] = useState(0);

  const calculateOutput = (x: number) => {
    if (mode === 'relu') return Math.max(0, x);
    return 1 / (1 + Math.exp(-x));
  };

  const output = calculateOutput(input);
  
  // Generate points for graph
  const points = [];
  for(let i = -5; i <= 5; i+=0.5) {
     points.push({x: i, y: calculateOutput(i)});
  }

  return (
    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-xl">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-white">Activation Lab</h3>
        <div className="flex bg-slate-900 rounded-lg p-1 border border-slate-700">
          <button 
            onClick={() => setMode('relu')}
            className={`px-3 py-1 text-xs font-bold rounded-md transition-colors ${mode === 'relu' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
          >
            ReLU
          </button>
          <button 
            onClick={() => setMode('sigmoid')}
            className={`px-3 py-1 text-xs font-bold rounded-md transition-colors ${mode === 'sigmoid' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
          >
            Sigmoid
          </button>
        </div>
      </div>

      <div className="flex gap-8">
        {/* Controls */}
        <div className="w-1/3 space-y-4">
           <div>
             <label className="text-xs text-slate-400 font-bold uppercase">Input Value</label>
             <input 
              type="range" min="-5" max="5" step="0.1" 
              value={input} 
              onChange={(e) => {
                setInput(parseFloat(e.target.value));
                if (parseFloat(e.target.value) < -2 && onComplete) onComplete(); 
              }}
              className="w-full mt-2 accent-indigo-500"
             />
             <div className="text-center font-mono text-white mt-1">{input}</div>
           </div>

           <div className="bg-slate-900 p-4 rounded-lg border border-slate-700">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-400">Input:</span>
                <span className="text-indigo-400 font-mono">{input.toFixed(2)}</span>
              </div>
              <div className="h-px bg-slate-700 my-2"></div>
              <div className="flex justify-between text-lg font-bold">
                <span className="text-slate-200">Output:</span>
                <span className="text-green-400 font-mono">{output.toFixed(3)}</span>
              </div>
           </div>
        </div>

        {/* Graph */}
        <div className="flex-1 bg-slate-900 rounded-lg border border-slate-700 relative h-48 overflow-hidden">
           {/* Grid lines */}
           <div className="absolute top-1/2 left-0 w-full h-px bg-slate-600/50"></div>
           <div className="absolute top-0 left-1/2 w-px h-full bg-slate-600/50"></div>
           
           {/* Plot curve */}
           <svg className="w-full h-full p-4 overflow-visible" viewBox="-5 -1 10 7" preserveAspectRatio="none">
             <path 
               d={`M ${points.map(p => `${p.x} ${5 - (p.y * 4)}`).join(' L ')}`} // Scale Y to fit nicely
               fill="none"
               stroke="#6366f1"
               strokeWidth="0.1"
               strokeLinecap="round"
             />
             {/* Current Point */}
             <circle 
               cx={input} 
               cy={5 - (output * 4)} 
               r="0.3" 
               fill="#4ade80" 
               stroke="white" 
               strokeWidth="0.05"
             />
           </svg>
        </div>
      </div>
    </div>
  );
};
