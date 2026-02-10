import React from 'react';
import { DigitDraw } from '../DigitDraw';

// --- Capstone 1: Digit Recognizer ---

export const DigitRecognizerLesson: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
    return (
        <div className="flex flex-col items-center gap-8 w-full max-w-4xl">
            <div className="text-center">
                <h2 className="text-3xl font-black text-white mb-2">Capstone: The Machine Eye</h2>
                <p className="text-slate-400 text-sm max-w-2xl mx-auto">
                    The "Hello World" of AI: Teaching a computer to read handwritten digits.
                    <br />
                    Under the hood, this uses a **Convolutional Neural Network** (like you learned in Part 6).
                </p>
            </div>

            <div className="bg-slate-900/50 p-8 rounded-3xl border border-slate-700 w-full backdrop-blur-sm">
                <DigitDraw />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                <div className="bg-slate-800 p-4 rounded-xl">
                    <h3 className="font-bold text-white mb-1">How it Works</h3>
                    <p className="text-xs text-slate-400">
                        1. You draw on the 28x28 grid.
                        <br />
                        2. The pixels are flattened into a list of 784 numbers.
                        <br />
                        3. The Neural Net calculates the probability for each digit (0-9).
                    </p>
                </div>
                <div className="bg-slate-800 p-4 rounded-xl">
                    <h3 className="font-bold text-white mb-1">Challenge</h3>
                    <p className="text-xs text-slate-400">
                        Try drawing a "1" and then a "7". Notice how similar they are?
                        <br />
                        See if you can trick the AI! (It's not perfect yet).
                    </p>
                </div>
            </div>

            <button onClick={onComplete} className="px-6 py-3 bg-green-600 hover:bg-green-500 text-white font-bold rounded-xl transition-colors shadow-lg shadow-green-900/20">
                🎓 I BUILT THIS
            </button>
        </div>
    );
};
