import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTutor } from '../context/TutorContext';
import { getTutorResponse } from '../services/gemini';

interface UnderstandingCheckProps {
    concept: string;
    context: string;
    onSuccess: () => void;
}

export const UnderstandingCheck: React.FC<UnderstandingCheckProps> = ({ concept, context, onSuccess }) => {
    const [answer, setAnswer] = useState('');
    const [isEvaluating, setIsEvaluating] = useState(false);
    const [feedback, setFeedback] = useState<string | null>(null);
    const [attempts, setAttempts] = useState(0);
    const tutor = useTutor();

    const handleSubmit = async () => {
        if (!answer.trim()) return;
        setIsEvaluating(true);

        const prompt = `
    The user is learning about: "${concept}".
    Context: "${context}".
    
    The user answered: "${answer}".
    
    Task: Evaluate their understanding.
    1. If they are mostly correct, start with "CORRECT" and give a brief reinforcement.
    2. If they are wrong or vague, start with "INCORRECT" and ask a guiding question to help them get there. Do not give the answer yet.
    `;

        try {
            const response = await getTutorResponse([], `Checking Understanding: ${concept}`, prompt);

            const isCorrect = response.includes("CORRECT");
            const cleanResponse = response.replace("CORRECT", "").replace("INCORRECT", "").trim();

            setFeedback(cleanResponse);

            if (isCorrect) {
                tutor.updateConceptMastery(concept, concept, 10); // Boost mastery
                tutor.recordChallengeAttempt(true);
                setTimeout(onSuccess, 3000); // Advance after delay
            } else {
                tutor.recordChallengeAttempt(false);
                setAttempts(prev => prev + 1);
                // On 3rd failure, just explain it
                if (attempts >= 2) {
                    setFeedback("Let's break this down together. " + cleanResponse + " ... Go ahead and click Next to see the explanation.");
                    setTimeout(onSuccess, 8000);
                }
            }
        } catch (e) {
            console.error(e);
            setFeedback("Neural link unstable. Access granted manually.");
            setTimeout(onSuccess, 2000);
        }

        setIsEvaluating(false);
    };

    return (
        <div className="bg-slate-900/90 border border-indigo-500/50 rounded-xl p-6 backdrop-blur-sm max-w-2xl mx-auto my-8 shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-xl">
                    🧠
                </div>
                <div>
                    <h3 className="text-lg font-bold text-white">Understanding Check</h3>
                    <p className="text-slate-400 text-sm">Explain this concept in your own words before we move on.</p>
                </div>
            </div>

            <div className="mb-6">
                <p className="text-slate-200 text-lg font-medium leading-relaxed">
                    "{context}"
                </p>
            </div>

            <div className="relative">
                <textarea
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    placeholder="Type your explanation here..."
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-4 text-white placeholder-slate-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none resize-none h-32"
                    disabled={isEvaluating}
                />

                <AnimatePresence>
                    {feedback && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className={`mt-4 p-4 rounded-lg border ${feedback.includes("Let's break") ? 'bg-yellow-900/30 border-yellow-500/50 text-yellow-200' :
                                    'bg-indigo-900/30 border-indigo-500/50 text-indigo-200'
                                }`}
                        >
                            <div className="flex gap-3">
                                <span className="text-xl">{feedback.includes("Let's break") ? "🤔" : "🤖"}</span>
                                <p className="text-sm leading-relaxed">{feedback}</p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <div className="mt-6 flex justify-end">
                <button
                    onClick={handleSubmit}
                    disabled={isEvaluating || !answer.trim()}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                    {isEvaluating ? (
                        <>
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Analyzing...
                        </>
                    ) : (
                        <>
                            Verify Answer
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </>
                    )}
                </button>
            </div>
        </div>
    );
};
