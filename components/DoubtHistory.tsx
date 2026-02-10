import React, { useState } from 'react';
import { useTutor } from '../context/TutorContext';

export const DoubtHistory: React.FC = () => {
    const { state } = useTutor();
    const [filter, setFilter] = useState('');

    const filteredDoubts = state.doubtHistory.filter(d =>
        d.question.toLowerCase().includes(filter.toLowerCase()) ||
        d.answer.toLowerCase().includes(filter.toLowerCase()) ||
        d.lessonTitle.toLowerCase().includes(filter.toLowerCase())
    );

    return (
        <div className="h-full flex flex-col bg-slate-900 border-l border-slate-800 w-80">
            <div className="p-4 border-b border-slate-800 bg-slate-950/50">
                <h2 className="text-sm font-bold text-white uppercase tracking-wider mb-3">Doubt History</h2>
                <div className="relative">
                    <input
                        type="text"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        placeholder="Search past questions..."
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg py-2 pl-9 pr-3 text-xs text-white focus:ring-1 focus:ring-indigo-500 outline-none"
                    />
                    <svg className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-slate-700">
                {filteredDoubts.length === 0 ? (
                    <div className="text-center mt-10 opacity-40">
                        <div className="text-3xl mb-2">🌪️</div>
                        <p className="text-xs text-slate-400">No doubts recorded yet.</p>
                    </div>
                ) : (
                    filteredDoubts.map((doubt) => (
                        <div key={doubt.id} className="bg-slate-800/50 border border-slate-700 rounded-lg p-3 hover:bg-slate-800 transition-colors group">
                            <div className="flex justify-between items-start mb-2">
                                <span className="text-[10px] font-mono text-indigo-400 bg-indigo-900/30 px-1.5 py-0.5 rounded border border-indigo-500/20 truncate max-w-[120px]">
                                    {doubt.lessonTitle}
                                </span>
                                <span className="text-[10px] text-slate-500">
                                    {new Date(doubt.timestamp).toLocaleDateString()}
                                </span>
                            </div>

                            <p className="text-sm font-medium text-white mb-2 leading-snug">
                                "{doubt.question}"
                            </p>

                            <div className="text-xs text-slate-400 line-clamp-3 group-hover:line-clamp-none transition-all duration-300 border-l-2 border-slate-600 pl-2">
                                {doubt.answer}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};
