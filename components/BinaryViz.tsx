
import React, { useState, useEffect } from 'react';

export const BinaryViz: React.FC<{onComplete?: () => void}> = ({onComplete}) => {
  const [num, setNum] = useState<number>(0);
  const target = 5;
  const isComplete = num === target;

  useEffect(() => {
    if (isComplete && onComplete) onComplete();
  }, [isComplete, onComplete]);

  const binary = num.toString(2).padStart(8, '0');

  const toggleBit = (index: number) => {
    // index 0 is left-most (128), index 7 is right-most (1)
    // power = 7 - index
    const mask = 1 << (7 - index);
    setNum(num ^ mask);
  };

  return (
    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-xl relative overflow-hidden">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-white">Interactive Binary</h3>
        <div className="px-3 py-1 bg-slate-900 rounded-lg text-xs font-mono text-cyan-400 border border-cyan-900/50">
           TARGET: <span className="text-xl font-bold ml-2">{target}</span>
        </div>
      </div>

      <div className="flex gap-2 justify-center mb-8">
        {binary.split('').map((bit, i) => {
          const power = 7 - i;
          const value = Math.pow(2, power);
          const isActive = bit === '1';
          return (
            <div key={i} className="flex flex-col items-center gap-2 group cursor-pointer" onClick={() => toggleBit(i)}>
              <div className={`
                w-10 h-16 rounded-lg flex items-center justify-center text-xl font-bold border-b-4 transition-all duration-150 active:translate-y-1 active:border-b-0
                ${isActive 
                  ? 'bg-cyan-500 border-cyan-700 text-white shadow-[0_0_15px_rgba(6,182,212,0.5)]' 
                  : 'bg-slate-700 border-slate-900 text-slate-500 hover:bg-slate-600'}
              `}>
                {bit}
              </div>
              <span className="text-[10px] text-slate-500 font-mono group-hover:text-cyan-400 transition-colors">{value}</span>
            </div>
          );
        })}
      </div>

      <div className="flex flex-col items-center">
        <div className="text-slate-400 text-sm mb-2 uppercase tracking-widest font-bold">Current Value</div>
        <div className={`text-6xl font-black font-mono transition-all duration-300 ${isComplete ? 'text-green-400 scale-110 drop-shadow-[0_0_10px_rgba(74,222,128,0.5)]' : 'text-white'}`}>
          {num}
        </div>
        {isComplete && (
           <div className="mt-4 text-green-400 font-bold animate-bounce">
             Target Matched! +100 XP
           </div>
        )}
      </div>
    </div>
  );
};
