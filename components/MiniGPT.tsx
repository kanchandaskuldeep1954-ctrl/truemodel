import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
    role: 'user' | 'assistant';
    content: string;
}

interface TokenProbability {
    token: string;
    prob: number;
}

export const TokenLogitsVisualizer: React.FC<{ logits: TokenProbability[] }> = ({ logits }) => {
    return (
        <div className="flex flex-col gap-2 w-full max-w-xs bg-slate-900 p-4 rounded-xl border border-slate-700 h-fit">
            <div className="text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">Next Token Probability</div>
            {logits.map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                    <div className="w-16 text-right font-mono text-xs text-indigo-300 truncate">
                        "{item.token}"
                    </div>
                    <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${item.prob * 100}%` }}
                            className="h-full bg-indigo-500"
                        />
                    </div>
                    <div className="w-8 text-[10px] text-slate-500 text-right">
                        {(item.prob * 100).toFixed(0)}%
                    </div>
                </div>
            ))}
        </div>
    );
};

export const MiniGPT: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([
        { role: 'assistant', content: "Hello! I am Mini-GPT. I predict the next word. ask me anything!" }
    ]);
    const [input, setInput] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [currentLogits, setCurrentLogits] = useState<TokenProbability[]>([]);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    // Mock Inference Engine
    const generateResponse = async (userMsg: string) => {
        setIsGenerating(true);
        const responseTokens = ["I", " am", " a", " language", " model", "."];
        const mockLogits = [
            [{ token: "I", prob: 0.8 }, { token: "The", prob: 0.1 }, { token: "Hello", prob: 0.05 }],
            [{ token: "am", prob: 0.9 }, { token: "will", prob: 0.05 }, { token: "can", prob: 0.02 }],
            [{ token: "a", prob: 0.95 }, { token: "the", prob: 0.02 }, { token: "not", prob: 0.01 }],
            [{ token: "robot", prob: 0.4 }, { token: "language", prob: 0.5 }, { token: "computer", prob: 0.1 }],
            [{ token: "model", prob: 0.8 }, { token: "program", prob: 0.15 }, { token: "thing", prob: 0.05 }],
            [{ token: ".", prob: 0.9 }, { token: "!", prob: 0.05 }, { token: "?", prob: 0.05 }]
        ];

        let currentResponse = "";

        // Add empty assistant message
        setMessages(prev => [...prev, { role: 'assistant', content: "" }]);

        for (let i = 0; i < responseTokens.length; i++) {
            await new Promise(r => setTimeout(r, 600)); // Delay for effect
            setCurrentLogits(mockLogits[i % mockLogits.length]);

            const token = responseTokens[i];
            currentResponse += token;

            setMessages(prev => {
                const newMsgs = [...prev];
                newMsgs[newMsgs.length - 1].content = currentResponse;
                return newMsgs;
            });
        }

        setIsGenerating(false);
        setCurrentLogits([]);
    };

    const handleSend = () => {
        if (!input.trim() || isGenerating) return;
        setMessages(prev => [...prev, { role: 'user', content: input }]);
        const userMsg = input;
        setInput('');
        generateResponse(userMsg);
    };

    return (
        <div className="flex flex-col md:flex-row gap-6 w-full h-[500px]">
            {/* Chat Window */}
            <div className="flex-1 flex flex-col bg-slate-900 rounded-2xl border border-slate-700 overflow-hidden shadow-2xl">
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((msg, i) => (
                        <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed
                                ${msg.role === 'user'
                                    ? 'bg-indigo-600 text-white rounded-br-none'
                                    : 'bg-slate-800 text-slate-200 rounded-bl-none'}
                            `}>
                                {msg.content}
                                {isGenerating && i === messages.length - 1 && (
                                    <span className="inline-block w-2 H-4 ml-1 bg-white animate-pulse">|</span>
                                )}
                            </div>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>

                <div className="p-4 bg-slate-800 border-t border-slate-700 flex gap-2">
                    <input
                        className="flex-1 bg-slate-900 border border-slate-600 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                        placeholder="Type a message..."
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && handleSend()}
                        disabled={isGenerating}
                    />
                    <button
                        className="bg-indigo-600 hover:bg-indigo-500 text-white p-2 rounded-xl disabled:opacity-50 transition-colors"
                        onClick={handleSend}
                        disabled={isGenerating}
                    >
                        ➤
                    </button>
                </div>
            </div>

            {/* Visualizer Sidebar */}
            <div className="w-full md:w-64 flex flex-col justify-center">
                <AnimatePresence mode="wait">
                    {isGenerating && currentLogits.length > 0 ? (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                        >
                            <TokenLogitsVisualizer logits={currentLogits} />
                        </motion.div>
                    ) : (
                        <div className="text-center text-slate-600 text-xs italic p-4 border border-slate-800 rounded-xl border-dashed">
                            Waiting for generation...
                            <br />
                            Ask me something!
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};
