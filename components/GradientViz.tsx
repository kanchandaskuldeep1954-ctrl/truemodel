
import React, { useState, useEffect } from 'react';

export const GradientViz: React.FC<{onComplete?: () => void}> = ({onComplete}) => {
  // Simple parabola: y = x^2
  const [x, setX] = useState(-3);
  const [learningRate, setLearningRate] = useState(0.1);
  
  const y = x * x;
  const slope = 2 * x; // Derivative of x^2 is 2x

  const step = () => {
    const nextX = x - (learningRate * slope);
    setX(nextX);
    if (Math.abs(nextX) < 0.1 && onComplete) onComplete();
  };

  return (
    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-xl">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-white">Gradient Descent Simulator</h3>
        <div className="text-xs text-slate-400">
           Goal: Reach the bottom (Loss = 0)
        </div>
      </div>

      <div className="flex gap-6">
        <div className="w-64 space-y-4">
           <div className="bg-slate-900 p-4 rounded-lg border border-slate-700 space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Current Position (x):</span>
                <span className="text-indigo-400 font-mono">{x.toFixed(3)}</span>
              </div>
              <div className="flex justify-between text-xs">
                 <span className="text-slate-400">Slope (Gradient):</span>
                 <span className={`font-mono ${slope > 0 ? 'text-red-400' : 'text-blue-400'}`}>{slope.toFixed(3)}</span>
              </div>
              <div className="h-px bg-slate-700 my-2"></div>
              <div className="flex justify-between text-sm font-bold">
                 <span className="text-slate-200">Loss (Error):</span>
                 <span className="text-white font-mono">{y.toFixed(5)}</span>
              </div>
           </div>

           <div>
              <label className="text-xs text-slate-400 font-bold uppercase mb-1 block">Learning Rate (Step Size)</label>
              <input 
                type="range" min="0.01" max="0.5" step="0.01" 
                value={learningRate} 
                onChange={(e) => setLearningRate(parseFloat(e.target.value))}
                className="w-full accent-indigo-500"
              />
              <div className="text-right text-xs text-indigo-400 font-mono">{learningRate}</div>
           </div>

           <button 
             onClick={step}
             className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold rounded-lg shadow-lg active:scale-95 transition-all"
           >
             Take 1 Step Downhill
           </button>
           
           <button 
             onClick={() => setX(Math.random() * 6 - 3)}
             className="w-full py-2 bg-slate-700 hover:bg-slate-600 text-slate-300 text-xs font-bold rounded-lg transition-colors"
           >
             Randomize Position
           </button>
        </div>

        <div className="flex-1 bg-slate-900 rounded-lg border border-slate-700 relative h-64 overflow-hidden flex items-end justify-center">
            {/* Parabola Visualization using simple CSS/Divs approximation or SVG */}
            <svg className="w-full h-full" viewBox="-4 0 8 10" preserveAspectRatio="none">
               {/* Curve y = x^2 */}
               {/* Generate path data */}
               <path 
                 d="M -4 16 Q 0 0 4 16" 
                 fill="none" 
                 stroke="#475569" 
                 strokeWidth="0.1" 
                 transform="scale(1, 0.5)" // Scale Y visually
               />
               
               {/* The Ball */}
               <circle 
                 cx={x} 
                 cy={y * 0.5} 
                 r="0.3" 
                 fill={Math.abs(x) < 0.2 ? "#4ade80" : "#ef4444"}
                 className="transition-all duration-300 ease-out"
               />

               {/* Tangent Line Visual */}
               <line 
                 x1={x - 1} 
                 y1={(y - slope) * 0.5} 
                 x2={x + 1} 
                 y2={(y + slope) * 0.5} 
                 stroke="#fbbf24" 
                 strokeWidth="0.05" 
                 opacity="0.5"
               />
            </svg>
            <div className="absolute bottom-2 text-xs text-slate-600">Loss Landscape</div>
        </div>
      </div>
    </div>
  );
};
