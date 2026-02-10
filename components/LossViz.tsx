
import React, { useState, useEffect } from 'react';

export const LossViz: React.FC<{onComplete?: () => void}> = ({onComplete}) => {
  const [pred, setPred] = useState<number>(0.5);
  const [target, setTarget] = useState<number>(0.8);

  const error = pred - target;
  const loss = error * error;

  useEffect(() => {
    if (loss < 0.001 && onComplete) onComplete();
  }, [loss, onComplete]);

  return (
    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-xl">
      <h3 className="text-lg font-bold text-white mb-4">Loss Calculator (MSE)</h3>
      <div className="space-y-6">
        <div>
          <label className="block text-xs font-bold text-slate-400 mb-1">PREDICTION (What AI thinks)</label>
          <input type="range" min="0" max="1" step="0.01" value={pred} onChange={(e) => setPred(parseFloat(e.target.value))} className="w-full accent-blue-500" />
          <div className="flex justify-between text-sm mt-1 text-slate-500"><span>0.0</span> <span className="font-bold text-blue-400">{pred.toFixed(2)}</span> <span>1.0</span></div>
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-400 mb-1">TARGET (The truth)</label>
          <input type="range" min="0" max="1" step="0.01" value={target} onChange={(e) => setTarget(parseFloat(e.target.value))} className="w-full accent-green-500" />
          <div className="flex justify-between text-sm mt-1 text-slate-500"><span>0.0</span> <span className="font-bold text-green-400">{target.toFixed(2)}</span> <span>1.0</span></div>
        </div>
        
        <div className="p-4 bg-red-900/20 rounded-lg border border-red-900/50 flex flex-col items-center">
           <div className="text-xs font-bold text-red-400 mb-2 uppercase">Calculation Steps</div>
           <div className="flex gap-4 items-center text-white">
              <div className="text-center">
                <div className="text-lg font-bold font-mono">{error.toFixed(2)}</div>
                <div className="text-[10px] text-slate-400">ERROR (diff)</div>
              </div>
              <div className="text-xl text-slate-500">&rarr;</div>
              <div className="text-center">
                <div className={`text-lg font-bold font-mono transition-all ${loss < 0.001 ? 'text-green-400 scale-125' : 'text-white'}`}>{loss.toFixed(4)}</div>
                <div className="text-[10px] text-slate-400">LOSS (squared)</div>
              </div>
           </div>
        </div>

        <div className="relative h-20 bg-slate-900 rounded overflow-hidden flex items-center px-4 border border-slate-700">
           <div className="absolute h-full bg-green-500/20" style={{ left: `${target * 100}%`, width: '2px' }}></div>
           <div className="w-full flex justify-between relative">
              <div className="h-4 w-4 bg-blue-500 rounded-full transition-all duration-300 shadow-[0_0_10px_rgba(59,130,246,0.5)]" style={{ marginLeft: `calc(${pred * 100}% - 8px)` }}></div>
              <div className="absolute top-6 text-[10px] font-bold text-blue-400 transition-all duration-300" style={{ left: `calc(${pred * 100}% - 20px)` }}>PRED</div>
              <div className="absolute -top-6 text-[10px] font-bold text-green-400" style={{ left: `calc(${target * 100}% - 20px)` }}>TARGET</div>
           </div>
        </div>
      </div>
    </div>
  );
};
