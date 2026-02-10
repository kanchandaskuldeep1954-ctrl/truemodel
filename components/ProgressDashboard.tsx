import React from 'react';
import { useTutor } from '../context/TutorContext';
import { COURSE_DATA } from '../constants';

export const ProgressDashboard: React.FC = () => {
    const tutor = useTutor();
    const { profile, totalXP, completedLessons } = tutor.state;

    const currentLevel = Math.floor(totalXP / 1000) + 1;
    const nextLevelXP = currentLevel * 1000;
    const progressToNext = ((totalXP % 1000) / 1000) * 100;

    return (
        <div className="bg-slate-900 border-r border-slate-800 w-80 flex flex-col h-full overflow-hidden">
            {/* Profile Header */}
            <div className="p-6 border-b border-slate-800 bg-slate-900/50">
                <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center text-xl font-bold text-white shadow-lg ring-2 ring-indigo-500/30">
                        {profile.name.charAt(0)}
                    </div>
                    <div>
                        <h2 className="font-bold text-white text-lg">{profile.name}</h2>
                        <div className="flex items-center gap-2">
                            <span className="text-xs bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded-full border border-indigo-500/30">
                                Lvl {currentLevel}
                            </span>
                            <span className="text-xs text-slate-400">{profile.codingLevel}</span>
                        </div>
                    </div>
                </div>

                {/* XP Bar */}
                <div className="space-y-1">
                    <div className="flex justify-between text-xs text-slate-400">
                        <span>XP</span>
                        <span>{totalXP} / {nextLevelXP}</span>
                    </div>
                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-1000 ease-out"
                            style={{ width: `${progressToNext}%` }}
                        />
                    </div>
                </div>
            </div>

            {/* Course Map */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-thin scrollbar-thumb-slate-700">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Curriculum Map</h3>

                {COURSE_DATA.map((part, partIdx) => (
                    <div key={part.id} className="relative pl-4 border-l-2 border-slate-800">
                        <div className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2 ${completedLessons.some(l => part.modules.flatMap(m => m.lessons).some(cl => cl.id === l))
                                ? 'bg-indigo-600 border-indigo-500'
                                : 'bg-slate-900 border-slate-700'
                            }`} />

                        <h4 className="text-sm font-semibold text-slate-300 mb-2">{part.title}</h4>

                        <div className="space-y-1">
                            {part.modules.map(module => (
                                <div key={module.id} className="ml-2">
                                    <div className="text-xs font-medium text-slate-500 mb-1">{module.title}</div>
                                    <div className="space-y-1">
                                        {module.lessons.map(lesson => {
                                            const isCompleted = completedLessons.includes(lesson.id);
                                            const isCurrent = tutor.state.currentLessonId === lesson.id;

                                            return (
                                                <div
                                                    key={lesson.id}
                                                    onClick={() => tutor.startLesson(lesson.id)}
                                                    className={`
                            text-xs p-2 rounded-lg cursor-pointer transition-all border
                            ${isCurrent
                                                            ? 'bg-indigo-600/20 border-indigo-500/50 text-white'
                                                            : isCompleted
                                                                ? 'bg-slate-800/50 border-slate-700 text-slate-400 line-through decoration-slate-600'
                                                                : 'bg-transparent border-transparent text-slate-500 hover:bg-slate-800 hover:text-slate-300'
                                                        }
                          `}
                                                >
                                                    <div className="flex items-center gap-2">
                                                        <span>{isCompleted ? '✅' : isCurrent ? '▶️' : '🔒'}</span>
                                                        {lesson.title}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Stats Footer */}
            <div className="p-4 border-t border-slate-800 bg-slate-900/50 grid grid-cols-2 gap-2 text-center">
                <div className="bg-slate-800/50 p-2 rounded-lg">
                    <div className="text-lg font-bold text-white">🔥 {tutor.state.consecutiveSuccesses}</div>
                    <div className="text-[10px] text-slate-500 uppercase">Streak</div>
                </div>
                <div className="bg-slate-800/50 p-2 rounded-lg">
                    <div className="text-lg font-bold text-white">🏆 {tutor.state.conceptMastery.size}</div>
                    <div className="text-[10px] text-slate-500 uppercase">Mastered</div>
                </div>
            </div>
        </div>
    );
};
