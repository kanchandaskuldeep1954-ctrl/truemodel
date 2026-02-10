import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface QuizCheckProps {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
    onComplete: () => void;
}

export const QuizCheck: React.FC<QuizCheckProps> = ({
    question,
    options,
    correctIndex,
    explanation,
    onComplete,
}) => {
    const [selected, setSelected] = useState<number | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [attempts, setAttempts] = useState(0);
    const [showHint, setShowHint] = useState(false);
    const [completed, setCompleted] = useState(false);

    const handleSelect = (index: number) => {
        if (completed) return;

        setSelected(index);
        const correct = index === correctIndex;
        setIsCorrect(correct);
        setAttempts(prev => prev + 1);

        if (correct) {
            setCompleted(true);
            setTimeout(() => onComplete(), 1500);
        } else {
            // Show hint after 2 wrong attempts
            if (attempts >= 1) {
                setShowHint(true);
            }
            // Reset selection after a moment so they can try again
            setTimeout(() => {
                setSelected(null);
                setIsCorrect(null);
            }, 1200);
        }
    };

    return (
        <div className="w-full max-w-2xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950 rounded-3xl border border-indigo-500/20 p-8 shadow-2xl overflow-hidden"
            >
                {/* Decorative background pulse */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-purple-500/5 rounded-full blur-3xl" />

                {/* Header */}
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center">
                        <span className="text-lg">🧠</span>
                    </div>
                    <div>
                        <h3 className="text-sm font-black text-indigo-400 uppercase tracking-widest">Understanding Check</h3>
                        <p className="text-[10px] text-slate-500 font-mono">Prove you understand before moving on</p>
                    </div>
                </div>

                {/* Question */}
                <p className="text-xl font-bold text-white mb-8 leading-relaxed">
                    {question}
                </p>

                {/* Options */}
                <div className="space-y-3 mb-6">
                    {options.map((option, i) => {
                        const isSelected = selected === i;
                        const isThisCorrect = i === correctIndex;

                        let borderClass = 'border-slate-700/50 hover:border-indigo-500/50';
                        let bgClass = 'bg-slate-800/50 hover:bg-slate-800';
                        let textClass = 'text-slate-300';

                        if (isSelected && isCorrect === true) {
                            borderClass = 'border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.2)]';
                            bgClass = 'bg-emerald-500/10';
                            textClass = 'text-emerald-300';
                        } else if (isSelected && isCorrect === false) {
                            borderClass = 'border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.1)]';
                            bgClass = 'bg-red-500/5';
                            textClass = 'text-red-300';
                        } else if (completed && isThisCorrect) {
                            borderClass = 'border-emerald-500';
                            bgClass = 'bg-emerald-500/10';
                            textClass = 'text-emerald-300';
                        }

                        return (
                            <motion.button
                                key={i}
                                onClick={() => handleSelect(i)}
                                disabled={completed}
                                whileHover={!completed ? { scale: 1.01 } : {}}
                                whileTap={!completed ? { scale: 0.99 } : {}}
                                className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-300 ${borderClass} ${bgClass} ${completed ? 'cursor-default' : 'cursor-pointer'}`}
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-black ${isSelected && isCorrect ? 'bg-emerald-500 text-white' :
                                            isSelected && isCorrect === false ? 'bg-red-500/30 text-red-300' :
                                                completed && isThisCorrect ? 'bg-emerald-500 text-white' :
                                                    'bg-slate-700/50 text-slate-500'
                                        }`}>
                                        {isSelected && isCorrect ? '✓' :
                                            isSelected && isCorrect === false ? '✗' :
                                                completed && isThisCorrect ? '✓' :
                                                    String.fromCharCode(65 + i)}
                                    </div>
                                    <span className={`text-sm font-medium ${textClass}`}>
                                        {option}
                                    </span>
                                </div>
                            </motion.button>
                        );
                    })}
                </div>

                {/* Feedback Area */}
                <AnimatePresence mode="wait">
                    {/* Wrong answer feedback */}
                    {isCorrect === false && !completed && (
                        <motion.div
                            key="wrong"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 mb-4"
                        >
                            <p className="text-red-300 text-sm font-medium">
                                Not quite! Think about it again...
                                {attempts >= 2 && " Try reading the lesson content above one more time."}
                            </p>
                        </motion.div>
                    )}

                    {/* Hint after 2 attempts */}
                    {showHint && !completed && (
                        <motion.div
                            key="hint"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 mb-4"
                        >
                            <p className="text-amber-300 text-sm font-medium">
                                💡 <strong>Hint:</strong> Re-read the explanation above carefully. The answer is connected to the key concept we just covered.
                            </p>
                        </motion.div>
                    )}

                    {/* Correct answer celebration */}
                    {completed && (
                        <motion.div
                            key="correct"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-5"
                        >
                            <div className="flex items-start gap-3">
                                <motion.span
                                    initial={{ rotate: -20, scale: 0 }}
                                    animate={{ rotate: 0, scale: 1 }}
                                    transition={{ type: 'spring', stiffness: 300 }}
                                    className="text-2xl"
                                >
                                    ✅
                                </motion.span>
                                <div>
                                    <p className="text-emerald-300 text-sm font-bold mb-1">
                                        {attempts === 1 ? 'Perfect! First try! 🔥' : 'You got it! 💪'}
                                    </p>
                                    <p className="text-emerald-200/70 text-xs leading-relaxed">
                                        {explanation}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Attempt Counter */}
                {attempts > 0 && !completed && (
                    <div className="mt-4 flex items-center gap-2">
                        <div className="flex gap-1">
                            {[...Array(Math.min(attempts, 5))].map((_, i) => (
                                <div key={i} className="w-1.5 h-1.5 rounded-full bg-red-500/50" />
                            ))}
                        </div>
                        <span className="text-[10px] text-slate-600 font-mono">
                            {attempts} attempt{attempts > 1 ? 's' : ''}
                        </span>
                    </div>
                )}
            </motion.div>
        </div>
    );
};
