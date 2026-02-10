
import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { getTutorResponse } from '../services/gemini';
import { useTutor } from '../context/TutorContext';

interface AITutorProps {
  currentTopic: string;
  lessonId?: string;
  lessonTitle?: string;
}

export const AITutor: React.FC<AITutorProps> = ({ currentTopic, lessonId, lessonTitle }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // V3.0: Use TutorContext for adaptive learning
  const tutor = useTutor();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async (text: string = input) => {
    if (!text.trim() || isLoading) return;

    const userMsg = { role: 'user' as const, text: text };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    // V3.0: Pass learner context to get personalized responses
    const learnerContext = tutor.getAdaptiveContext();
    const response = await getTutorResponse(messages, currentTopic, text, learnerContext);

    // V3.0: Save doubt to history
    if (lessonId && lessonTitle) {
      tutor.addDoubt(text, response, lessonId, lessonTitle);
    }

    setMessages(prev => [...prev, { role: 'model', text: response }]);
    setIsLoading(false);
  };

  const quickActions = [
    { emoji: '👶', text: 'Explain like I\'m 5' },
    { emoji: '💡', text: 'Give me a hint' },
    { emoji: '💻', text: 'Show me code' },
    { emoji: '🔥', text: 'Why does this matter?' }
  ];

  return (
    <div className="flex flex-col h-[600px] bg-slate-800 rounded-xl shadow-2xl border border-slate-700 overflow-hidden">
      <div className="bg-indigo-600 p-4 text-white flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.8)]"></div>
          <h2 className="font-bold tracking-wide text-sm">AI TUTOR</h2>
        </div>
        <span className="text-[10px] opacity-75 font-mono border border-indigo-400 px-2 py-0.5 rounded">ONLINE</span>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-900/50 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
        {messages.length === 0 && (
          <div className="text-center mt-10 opacity-50">
            <div className="text-4xl mb-4 grayscale">🤖</div>
            <p className="text-slate-300 text-sm italic">"I'm detecting your learning patterns. How can I help you dominate this topic?"</p>
          </div>
        )}
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${m.role === 'user' ? 'bg-indigo-600 text-white rounded-tr-none' : 'bg-slate-700 border border-slate-600 text-slate-200 rounded-tl-none shadow-sm'}`}>
              <div className="whitespace-pre-wrap leading-relaxed">
                {m.text}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-slate-700 p-3 rounded-2xl shadow-sm border border-slate-600">
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></div>
                <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="bg-slate-800 border-t border-slate-700 p-2">
        {/* Quick Actions */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-2 px-2 scrollbar-none">
          {quickActions.map((action, i) => (
            <button
              key={i}
              onClick={() => handleSend(action.text)}
              disabled={isLoading}
              className="flex-shrink-0 bg-slate-700 hover:bg-slate-600 border border-slate-600 text-slate-300 text-xs px-3 py-1.5 rounded-full transition-all whitespace-nowrap active:scale-95 disabled:opacity-50"
            >
              <span className="mr-1">{action.emoji}</span> {action.text}
            </button>
          ))}
        </div>

        <div className="flex gap-2 px-2 pb-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your own question..."
            className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-sm text-white focus:ring-1 focus:ring-indigo-500 outline-none placeholder-slate-500"
          />
          <button
            onClick={() => handleSend()}
            disabled={isLoading}
            className="bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-lg transition-colors disabled:opacity-50"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
          </button>
        </div>
      </div>
    </div>
  );
};
