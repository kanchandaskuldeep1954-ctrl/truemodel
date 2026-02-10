
import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { getTutorResponse } from '../services/gemini';
import { useTutor } from '../context/TutorContext';

interface AITutorProps {
  currentTopic: string;
  lessonId?: string;
  lessonTitle?: string;
  stepType?: 'text' | 'interactive' | 'challenge' | 'quiz' | 'animation';
}

export const AITutor: React.FC<AITutorProps> = ({ currentTopic, lessonId, lessonTitle, stepType }) => {
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

  // Context-aware quick actions based on step type
  const getQuickActions = () => {
    const base = [
      { emoji: '👶', text: 'Explain this like I\'m 5 years old' },
      { emoji: '🔥', text: 'Why does this matter in the real world?' },
    ];

    switch (stepType) {
      case 'interactive':
        return [
          { emoji: '🤔', text: 'What should I do here? Guide me' },
          { emoji: '💡', text: 'I\'m stuck on this interactive — help!' },
          { emoji: '🧪', text: 'What happens if I change the settings?' },
          ...base,
        ];
      case 'challenge':
        return [
          { emoji: '💡', text: 'Give me a hint (don\'t spoil it!)' },
          { emoji: '🔍', text: 'Walk me through the approach step-by-step' },
          { emoji: '❌', text: 'I keep getting the wrong answer, why?' },
          ...base,
        ];
      case 'quiz':
        return [
          { emoji: '🤯', text: 'I\'m confused by this question' },
          { emoji: '📖', text: 'Can you re-explain the concept being tested?' },
          { emoji: '💡', text: 'Give me a tiny hint (not the answer!)' },
          ...base,
        ];
      case 'text':
      default:
        return [
          { emoji: '🔬', text: 'Break this down even simpler for me' },
          { emoji: '🌍', text: 'Give me a real-world analogy for this' },
          { emoji: '💻', text: 'Show me this concept in Python code' },
          ...base,
        ];
    }
  };

  const quickActions = getQuickActions();

  // Contextual welcome message
  const getWelcomeMessage = () => {
    if (stepType === 'interactive') {
      return "I can see you're on an interactive step! If you're not sure what to try, or want to understand what's happening behind the scenes — just ask.";
    }
    if (stepType === 'challenge') {
      return "Looks like you've hit a challenge! I won't give you the answer, but I can nudge you in the right direction. What's tripping you up?";
    }
    if (stepType === 'quiz') {
      return "Need help with this question? I can explain the concept again without giving away the answer. Just ask!";
    }
    return "I'm reading this lesson with you. Ask me anything — I'll break it down, give you analogies, or connect it to something you already know.";
  };

  return (
    <div className="flex flex-col h-[450px] bg-slate-900 overflow-hidden">
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-3 text-white flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.8)]"></div>
          <h2 className="font-bold tracking-wide text-sm">🤖 AI TUTOR</h2>
        </div>
        <span className="text-[10px] opacity-75 font-mono border border-white/30 px-2 py-0.5 rounded">
          {stepType ? `${stepType.toUpperCase()} MODE` : 'ONLINE'}
        </span>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-950/50 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
        {messages.length === 0 && (
          <div className="mt-6 px-2">
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <span className="text-2xl">🧠</span>
                <div>
                  <p className="text-slate-300 text-sm leading-relaxed">{getWelcomeMessage()}</p>
                  <p className="text-slate-500 text-xs mt-2 font-mono">Try the buttons below or type your own question ↓</p>
                </div>
              </div>
            </div>
          </div>
        )}
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${m.role === 'user' ? 'bg-indigo-600 text-white rounded-tr-none' : 'bg-slate-800 border border-slate-700 text-slate-200 rounded-tl-none shadow-sm'}`}>
              <div className="whitespace-pre-wrap leading-relaxed">
                {m.text}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-slate-800 p-3 rounded-2xl shadow-sm border border-slate-700">
              <div className="flex gap-1.5 items-center">
                <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce"></div>
                <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:0.15s]"></div>
                <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:0.3s]"></div>
                <span className="text-[10px] text-slate-500 ml-2 font-mono">thinking...</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="bg-slate-900 border-t border-slate-800 p-2">
        {/* Quick Actions */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-2 px-2 scrollbar-none">
          {quickActions.map((action, i) => (
            <button
              key={i}
              onClick={() => handleSend(action.text)}
              disabled={isLoading}
              className="flex-shrink-0 bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-indigo-500/30 text-slate-300 text-xs px-3 py-1.5 rounded-full transition-all whitespace-nowrap active:scale-95 disabled:opacity-50"
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
            placeholder="Ask me anything about this step..."
            className="flex-1 bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-sm text-white focus:ring-1 focus:ring-indigo-500 outline-none placeholder-slate-500"
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
