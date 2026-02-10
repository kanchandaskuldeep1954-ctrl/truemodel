import React, { useState } from 'react';
import { PythonSandbox } from './PythonSandbox';
import { useTutor } from '../context/TutorContext';
import { motion, AnimatePresence } from 'framer-motion';

interface CodeChallengeProps {
    id: string;
    title: string;
    description: string;
    initialCode: string;
    expectedOutput: string;
    hints: string[];
    xpReward: number;
    onComplete: () => void;
}

export const CodeChallenge: React.FC<CodeChallengeProps> = ({
    id,
    title,
    description,
    initialCode,
    expectedOutput,
    hints,
    xpReward,
    onComplete
}) => {
    const tutor = useTutor();
    const [showHint, setShowHint] = useState(false);
    const [currentHintIndex, setCurrentHintIndex] = useState(0);
    const [isCompleted, setIsCompleted] = useState(false);

    const handleSuccess = () => {
        if (!isCompleted) {
            setIsCompleted(true);
            tutor.completeLesson(id, xpReward);
            tutor.recordChallengeAttempt(true);
            setTimeout(onComplete, 2000);
        }
    };

    const revealHint = () => {
        if (currentHintIndex < hints.length - 1) {
            setCurrentHintIndex(prev => prev + 1);
        }
        setShowHint(true);
    };

    return (
        <div className="flex flex-col gap-6 max-w-4xl mx-auto my-8">
            {/* Challenge Header */}
            <div className="bg-slate-900 border-l-4 border-indigo-500 p-6 rounded-r-xl shadow-lg">
                <div className="flex justify-between items-start mb-2">
                    <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                        <span className="text-3xl">💻</span> {title}
                    </h2>
                    <span className="bg-indigo-900/50 text-indigo-300 text-xs px-2 py-1 rounded border border-indigo-500/30 font-mono">
                        {xpReward} XP
                    </span>
                </div>
                <p className="text-slate-300 leading-relaxed text-lg">{description}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Sandbox Area */}
                <div className="lg:col-span-2">
                    <PythonSandbox
                        initialCode={initialCode}
                        expectedOutput={expectedOutput}
                        onSuccess={handleSuccess}
                    />
                </div>

                {/* Sidebar: Hints & Status */}
                <div className="space-y-4">
                    {/* Status Card */}
                    <div className={`p-6 rounded-xl border transition-all ${isCompleted
                            ? 'bg-green-900/20 border-green-500/50'
                            : 'bg-slate-900 border-slate-800'
                        }`}>
                        <h3 className="font-bold text-sm uppercase tracking-wider mb-2 text-slate-500">
                            Status
                        </h3>
                        <div className="flex items-center gap-3">
                            <div className={`w-3 h-3 rounded-full ${isCompleted ? 'bg-green-500 animate-pulse' : 'bg-slate-600'}`} />
                            <span className={`font-mono text-sm ${isCompleted ? 'text-green-400' : 'text-slate-400'}`}>
                                {isCompleted ? 'ALL SYSTEMS GO' : 'AWAITING CODE...'}
                            </span>
                        </div>
                        {isCompleted && (
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="mt-4 text-center"
                            >
                                <div className="text-4xl mb-2">🎉</div>
                                <div className="text-green-400 font-bold">Great Job!</div>
                            </motion.div>
                        )}
                    </div>

                    {/* Target Output */}
                    <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl">
                        <h3 className="font-bold text-xs uppercase tracking-wider mb-2 text-slate-500">
                            Target Output
                        </h3>
                        <pre className="bg-slate-950 p-2 rounded text-indigo-300 font-mono text-xs overflow-x-auto border border-slate-900">
                            {expectedOutput}
                        </pre>
                    </div>

                    {/* Hints Section */}
                    <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl">
                        <div className="flex justify-between items-center mb-3">
                            <h3 className="font-bold text-xs uppercase tracking-wider text-slate-500">
                                Neural Link Support
                            </h3>
                            <button
                                onClick={revealHint}
                                disabled={showHint && currentHintIndex === hints.length - 1}
                                className="text-[10px] bg-indigo-600 hover:bg-indigo-500 text-white px-2 py-1 rounded transition-colors disabled:opacity-50"
                            >
                                {showHint ? 'Next Hint' : 'Get Hint'}
                            </button>
                        </div>

                        <AnimatePresence mode="wait">
                            {showHint ? (
                                <motion.div
                                    key={currentHintIndex}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 10 }}
                                    className="bg-indigo-900/20 border-l-2 border-indigo-500 p-3 rounded-r text-sm text-indigo-200 leading-relaxed"
                                >
                                    <span className="font-bold mr-1">Hint {currentHintIndex + 1}:</span>
                                    {hints[currentHintIndex]}
                                </motion.div>
                            ) : (
                                <div className="text-center py-4 text-slate-600 text-xs italic">
                                    Stuck? Analysis available.
                                </div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
};
