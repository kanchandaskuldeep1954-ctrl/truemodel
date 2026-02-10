
import React, { useState, useEffect } from 'react';

export const FunctionViz: React.FC<{onComplete?: () => void}> = ({onComplete}) => {
  const [input, setInput] = useState<number>(2);
  const [isAnimating, setIsAnimating] = useState(false);
  
  // f(x) = 2x + 1
  const output = (2 * input) + 1;

  useEffect(() => {
    // Trigger XP if they experiment a bit
    if (input > 5 && onComplete) onComplete();
  }, [input, onComplete]);

  return (
    <div className="bg-slate-800 p-8 rounded-xl border border-slate-700 shadow-xl">
      <h3 className="text-lg font-bold text-white mb-6">The Function Machine <span className="text-cyan-400 font-mono ml-2">f(x) = 2x + 1</span></h3>
      
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 relative">
        
        {/* Input */}
        <div className="flex flex-col items-center z-10">
          <div className="w-20 h-20 bg-indigo-500 rounded-full flex items-center justify-center text-3xl font-bold text-white shadow-lg border-4 border-indigo-400">
            {input}
          </div>
          <span className="mt-2 text-xs font-bold text-indigo-400 uppercase tracking-wider">Input (x)</span>
          <input 
            type="range" 
            min="0" max="10" 
            value={input} 
            onChange={(e) => setInput(parseInt(e.target.value))}
            className="mt-4 w-32 accent-indigo-500"
          />
        </div>

        {/* Arrow 1 */}
        <div className="hidden md:block w-16 h-2 bg-slate-700 relative overflow-hidden rounded-full">
             <div className="absolute top-0 left-0 h-full w-full bg-indigo-500/50 animate-pulse"></div>
        </div>

        {/* The Machine */}
        <div className="relative group">
           <div className="w-40 h-40 bg-slate-900 border-2 border-slate-600 rounded-2xl flex flex-col items-center justify-center relative z-10 shadow-2xl">
              <div className="text-cyan-400 font-mono text-xl font-bold mb-1">PROCESS</div>
              <div className="text-white text-sm opacity-50 mb-2">Multiplying by 2...</div>
              <div className="text-white text-sm opacity-50">Adding 1...</div>
              
              {/* Gears decoration */}
              <div className="absolute -top-4 -right-4 w-10 h-10 bg-slate-700 rounded-full border-2 border-dashed border-slate-500 animate-[spin_4s_linear_infinite]"></div>
              <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-slate-700 rounded-full border-2 border-dashed border-slate-500 animate-[spin_3s_linear_infinite_reverse]"></div>
           </div>
        </div>

        {/* Arrow 2 */}
        <div className="hidden md:block w-16 h-2 bg-slate-700 relative overflow-hidden rounded-full">
            <div className="absolute top-0 left-0 h-full w-full bg-green-500/50 animate-pulse delay-75"></div>
        </div>

        {/* Output */}
        <div className="flex flex-col items-center z-10">
          <div className="w-24 h-24 bg-green-500 rounded-xl flex items-center justify-center text-4xl font-bold text-white shadow-lg border-4 border-green-400 rotate-3 transition-transform hover:rotate-0">
            {output}
          </div>
          <span className="mt-3 text-xs font-bold text-green-400 uppercase tracking-wider">Output f(x)</span>
        </div>
      </div>

      <div className="mt-8 text-center bg-slate-900/50 p-4 rounded-lg border border-slate-700/50">
        <code className="text-slate-300 text-lg">
          f(<span className="text-indigo-400">{input}</span>) = (2 * <span className="text-indigo-400">{input}</span>) + 1 = <span className="text-green-400 font-bold">{output}</span>
        </code>
      </div>
    </div>
  );
};
