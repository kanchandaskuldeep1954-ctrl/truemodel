import React, { useMemo } from 'react';
import { useTutor } from '../context/TutorContext';
import { COURSE_DATA } from '../constants';
import { motion } from 'framer-motion';
import { Trophy, Flame, Target, BookOpen } from 'lucide-react';

export const ProgressDashboard: React.FC = () => {
    const tutor = useTutor();
    const { profile, totalXP, completedLessons, conceptMastery } = tutor.state;

    const currentLevel = Math.floor(totalXP / 500) + 1;
    const nextLevelXP = currentLevel * 500;
    const progressToNext = ((totalXP % 500) / 500) * 100;

    // Mastery Radar Logic
    // We categorize concepts into 4 quadrants
    const radarData = useMemo(() => {
        const categories = {
            Math: 0,
            Coding: 0,
            Logic: 0,
            Intuition: 0
        };

        const masteryArray = Array.from(conceptMastery.values());
        if (masteryArray.length === 0) return [20, 20, 20, 20]; // Default low base

        masteryArray.forEach(m => {
            const name = m.conceptName.toLowerCase();
            if (name.includes('math') || name.includes('vector') || name.includes('matrix') || name.includes('calculus')) {
                categories.Math += m.masteryLevel;
            } else if (name.includes('code') || name.includes('python') || name.includes('implementation')) {
                categories.Coding += m.masteryLevel;
            } else if (name.includes('logic') || name.includes('gate') || name.includes('circuit')) {
                categories.Logic += m.masteryLevel;
            } else {
                categories.Intuition += m.masteryLevel;
            }
        });

        // Normalize (rough heuristic)
        return [
            Math.min(100, 20 + (categories.Math / 2)),
            Math.min(100, 20 + (categories.Coding / 2)),
            Math.min(100, 20 + (categories.Logic / 2)),
            Math.min(100, 20 + (categories.Intuition / 2))
        ];
    }, [conceptMastery]);

    const radarPoints = useMemo(() => {
        const centerX = 50;
        const centerY = 50;
        const size = 40;

        // NSEW points
        return [
            `${centerX},${centerY - (radarData[0] / 100 * size)}`, // North: Math
            `${centerX + (radarData[1] / 100 * size)},${centerY}`, // East: Coding
            `${centerX},${centerY + (radarData[2] / 100 * size)}`, // South: Logic
            `${centerX - (radarData[3] / 100 * size)},${centerY}`  // West: Intuition
        ].join(' ');
    }, [radarData]);

    return (
        <div className="bg-slate-950 border-r border-slate-800 w-80 flex flex-col h-full overflow-hidden shadow-2xl">
            {/* Profile Header */}
            <div className="p-6 border-b border-slate-800 bg-indigo-950/10 backdrop-blur-md">
                <div className="flex items-center gap-4 mb-4">
                    <div className="relative">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-2xl font-black text-white shadow-[0_0_20px_rgba(99,102,241,0.4)] rotate-3">
                            {profile.name.charAt(0)}
                        </div>
                        <div className="absolute -bottom-1 -right-1 bg-green-500 w-4 h-4 rounded-full border-4 border-slate-950 shadow-lg"></div>
                    </div>
                    <div>
                        <h2 className="font-black text-white text-lg tracking-tight">{profile.name}</h2>
                        <div className="flex items-center gap-2">
                            <span className="text-[10px] font-black bg-indigo-500/20 text-indigo-400 px-2 py-0.5 rounded border border-indigo-500/30 uppercase tracking-tighter">
                                Lvl {currentLevel}
                            </span>
                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{profile.codingLevel}</span>
                        </div>
                    </div>
                </div>

                {/* XP Bar */}
                <div className="space-y-1.5">
                    <div className="flex justify-between text-[10px] font-black text-slate-500 uppercase tracking-widest">
                        <span>Sync Progress</span>
                        <span className="text-slate-300">{totalXP} / {nextLevelXP} XP</span>
                    </div>
                    <div className="h-1.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800 shadow-inner">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${progressToNext}%` }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full shadow-[0_0_10px_rgba(168,85,247,0.5)]"
                        />
                    </div>
                </div>
            </div>

            {/* Mastery Radar */}
            <div className="p-6 border-b border-slate-800 bg-slate-900/20">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                        <Target size={12} className="text-indigo-400" /> Mastery Profile
                    </h3>
                </div>

                <div className="relative flex justify-center items-center h-32">
                    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-2xl">
                        {/* Radar Web */}
                        <circle cx="50" cy="50" r="40" className="fill-none stroke-slate-800" strokeWidth="0.5" strokeDasharray="2 2" />
                        <circle cx="50" cy="50" r="30" className="fill-none stroke-slate-800" strokeWidth="0.5" strokeDasharray="2 2" />
                        <circle cx="50" cy="50" r="20" className="fill-none stroke-slate-800" strokeWidth="0.5" strokeDasharray="2 2" />
                        <circle cx="50" cy="50" r="10" className="fill-none stroke-slate-800" strokeWidth="0.5" strokeDasharray="2 2" />

                        <line x1="50" y1="10" x2="50" y2="90" className="stroke-slate-800" strokeWidth="0.5" strokeDasharray="2 2" />
                        <line x1="10" y1="50" x2="90" y2="50" className="stroke-slate-800" strokeWidth="0.5" strokeDasharray="2 2" />

                        {/* The Actual Polygon */}
                        <motion.polygon
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1, points: radarPoints }}
                            points={radarPoints}
                            className="fill-indigo-500/40 stroke-indigo-400"
                            strokeWidth="1.5"
                        />

                        {/* Labels */}
                        <text x="50" y="8" textAnchor="middle" className="fill-slate-500 text-[6px] font-black uppercase tracking-tighter">MATH</text>
                        <text x="94" y="52" textAnchor="end" className="fill-slate-500 text-[6px] font-black uppercase tracking-tighter">CODE</text>
                        <text x="50" y="98" textAnchor="middle" className="fill-slate-500 text-[6px] font-black uppercase tracking-tighter">LOGIC</text>
                        <text x="6" y="52" textAnchor="start" className="fill-slate-500 text-[6px] font-black uppercase tracking-tighter">INTUITION</text>
                    </svg>
                </div>
            </div>

            {/* Course Map */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-thin scrollbar-thumb-slate-800">
                <div className="flex items-center gap-2 mb-2">
                    <BookOpen size={12} className="text-indigo-400" />
                    <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Neural Pathway</h3>
                </div>

                {COURSE_DATA.map((part) => (
                    <div key={part.id} className="relative pl-6 border-l border-slate-800 space-y-4">
                        <div className={`absolute -left-[4.5px] top-0 w-2 h-2 rounded-full shadow-[0_0_10px_rgba(99,102,241,0.5)] ${completedLessons.some(l => part.modules.flatMap(m => m.lessons).some(cl => cl.id === l))
                            ? 'bg-indigo-500'
                            : 'bg-slate-800'
                            }`} />

                        <h4 className="text-[10px] font-black text-slate-200 uppercase tracking-tight">{part.title}</h4>

                        <div className="space-y-4">
                            {part.modules.map(module => (
                                <div key={module.id} className="space-y-1">
                                    <div className="text-[9px] font-bold text-slate-500 uppercase tracking-widest ml-1">{module.title}</div>
                                    <div className="space-y-1">
                                        {module.lessons.map(lesson => {
                                            const isCompleted = completedLessons.includes(lesson.id);
                                            const isCurrent = tutor.state.currentLessonId === lesson.id;

                                            return (
                                                <div
                                                    key={lesson.id}
                                                    onClick={() => tutor.startLesson(lesson.id)}
                                                    className={`
                                                        group relative text-[11px] p-2.5 rounded-xl cursor-pointer transition-all border
                                                        ${isCurrent
                                                            ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-900/20'
                                                            : isCompleted
                                                                ? 'bg-slate-900 border-slate-800/50 text-slate-400'
                                                                : 'bg-transparent border-transparent text-slate-500 hover:bg-slate-900 hover:text-slate-300'
                                                        }
                                                    `}
                                                >
                                                    <div className="flex items-center gap-2">
                                                        <div className={`w-1.5 h-1.5 rounded-full ${isCurrent ? 'bg-white animate-pulse' : isCompleted ? 'bg-indigo-500/50' : 'bg-slate-800'}`} />
                                                        <span className={isCompleted ? 'line-through opacity-50' : ''}>{lesson.title}</span>
                                                    </div>
                                                    {isCurrent && (
                                                        <motion.div
                                                            layoutId="active-indicator"
                                                            className="absolute right-2 top-1/2 -translate-y-1/2 w-1 h-1 bg-white rounded-full"
                                                        />
                                                    )}
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
            <div className="p-4 border-t border-slate-800 bg-slate-900/50 grid grid-cols-2 gap-3 text-center">
                <div className="bg-slate-900/80 border border-slate-800 p-3 rounded-2xl shadow-inner group transition-all hover:border-indigo-500/30">
                    <div className="text-xl font-black text-white flex items-center justify-center gap-1">
                        <Flame size={16} className="text-orange-500 group-hover:scale-110 transition-transform" />
                        {tutor.state.consecutiveSuccesses}
                    </div>
                    <div className="text-[8px] font-black text-slate-500 uppercase tracking-tighter">Sync Streak</div>
                </div>
                <div className="bg-slate-900/80 border border-slate-800 p-3 rounded-2xl shadow-inner group transition-all hover:border-indigo-500/30">
                    <div className="text-xl font-black text-white flex items-center justify-center gap-1">
                        <Trophy size={16} className="text-yellow-500 group-hover:scale-110 transition-transform" />
                        {Array.from(tutor.state.conceptMastery.values()).filter(m => m.masteryLevel >= 80).length}
                    </div>
                    <div className="text-[8px] font-black text-slate-500 uppercase tracking-tighter">Mastered</div>
                </div>
            </div>
        </div>
    );
};
