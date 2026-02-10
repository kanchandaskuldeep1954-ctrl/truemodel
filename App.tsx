import React, { useState } from 'react';
import { COURSE_DATA } from './constants';
import { Lesson, Part } from './types';
import { LessonEngine } from './components/LessonEngine';
import { useTutor } from './context/TutorContext';
import { Menu, X, Zap, Trophy, Flame } from 'lucide-react';

const App: React.FC = () => {
  const tutor = useTutor();
  const [activePart, setActivePart] = useState<Part>(COURSE_DATA[0]);
  const [activeLesson, setActiveLesson] = useState<Lesson>(COURSE_DATA[0].modules[0].lessons[0]);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const { completedLessons, totalXP: userXP } = tutor.state;

  const handleComplete = () => {
    if (!completedLessons.includes(activeLesson.id)) {
      tutor.completeLesson(activeLesson.id, activeLesson.xpReward);
      setShowLevelUp(true);
      setTimeout(() => setShowLevelUp(false), 3000);
    }

    // Auto-advance Logic
    let currentPartIdx = -1;
    let currentModIdx = -1;
    let currentLessonIdx = -1;

    COURSE_DATA.forEach((part, pIdx) => {
      part.modules.forEach((mod, mIdx) => {
        mod.lessons.forEach((less, lIdx) => {
          if (less.id === activeLesson.id) {
            currentPartIdx = pIdx;
            currentModIdx = mIdx;
            currentLessonIdx = lIdx;
          }
        });
      });
    });

    if (currentPartIdx !== -1) {
      const part = COURSE_DATA[currentPartIdx];
      const module = part.modules[currentModIdx];

      if (currentLessonIdx + 1 < module.lessons.length) {
        setActiveLesson(module.lessons[currentLessonIdx + 1]);
        return;
      }

      if (currentModIdx + 1 < part.modules.length) {
        setActiveLesson(part.modules[currentModIdx + 1].lessons[0]);
        return;
      }

      if (currentPartIdx + 1 < COURSE_DATA.length) {
        const nextPart = COURSE_DATA[currentPartIdx + 1];
        setActivePart(nextPart);
        setActiveLesson(nextPart.modules[0].lessons[0]);
        return;
      }
    }
  };

  const getLevel = (xp: number) => Math.floor(xp / 500) + 1;
  const getProgressToNextLevel = (xp: number) => (xp % 500) / 500 * 100;

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex h-screen bg-slate-950 text-slate-200 overflow-hidden font-sans">

      {/* Level Up Notification */}
      <div className={`fixed top-8 left-1/2 -translate-x-1/2 z-[100] transition-all duration-500 ${showLevelUp ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10 pointer-events-none'}`}>
        <div className="bg-gradient-to-r from-yellow-500 to-amber-600 text-white px-6 py-3 rounded-full font-bold shadow-[0_0_30px_rgba(245,158,11,0.6)] flex items-center gap-2 border-2 border-white/20">
          <span>🎉</span>
          <span>LESSON COMPLETE!</span>
          <span className="bg-black/20 px-2 rounded text-sm">+{activeLesson.xpReward} XP</span>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[40] lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 w-80 bg-slate-950 border-r border-slate-800 flex flex-col shadow-2xl z-[50] transition-transform duration-300 lg:static lg:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-6 bg-indigo-950/20 border-b border-indigo-500/10 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-xl font-black tracking-tight text-white flex items-center gap-2">
              <span className="text-indigo-500"><Zap size={24} fill="currentColor" /></span> Synapse
            </h1>
            <button onClick={toggleSidebar} className="lg:hidden text-slate-400 hover:text-white">
              <X size={20} />
            </button>
          </div>
          <p className="text-[10px] uppercase font-bold tracking-widest text-slate-500">Master AI from First Principles</p>

          {/* User Stats Card */}
          <div className="mt-4 bg-slate-900/50 rounded-xl p-3 border border-slate-800 shadow-inner">
            <div className="flex justify-between items-end mb-1">
              <div className="flex flex-col">
                <span className="text-[10px] uppercase font-black text-slate-500 tracking-tighter">Level</span>
                <span className="text-lg font-black text-white leading-none">{getLevel(userXP)}</span>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-[10px] uppercase font-black text-slate-500 tracking-tighter">Total XP</span>
                <span className="text-sm font-mono font-bold text-indigo-400 leading-none">{userXP}</span>
              </div>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mt-2">
              <div
                className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full transition-all duration-1000 shadow-[0_0_10px_rgba(99,102,241,0.5)]"
                style={{ width: `${getProgressToNextLevel(userXP)}%` }}
              ></div>
            </div>
          </div>

          <div className="flex gap-2 mt-4">
            <div className="flex-1 bg-slate-900/40 rounded-lg p-2 border border-slate-800/50 flex items-center gap-2">
              <Flame size={14} className="text-orange-500" />
              <span className="text-xs font-bold text-slate-300">{tutor.state.consecutiveSuccesses}</span>
            </div>
            <div className="flex-1 bg-slate-900/40 rounded-lg p-2 border border-slate-800/50 flex items-center gap-2">
              <Trophy size={14} className="text-yellow-500" />
              <span className="text-xs font-bold text-slate-300">{tutor.state.conceptMastery.size}</span>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-slate-800 space-y-6">
          {COURSE_DATA.map(part => (
            <div key={part.id}>
              <h2 className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-3 px-2 flex items-center gap-2 sticky top-0 bg-slate-950/95 backdrop-blur py-1 z-10">
                {part.title}
                <div className="h-px bg-slate-800/50 flex-1"></div>
              </h2>
              {part.modules.map(mod => (
                <div key={mod.id} className="space-y-1 mb-4">
                  <div className="text-[10px] font-bold text-slate-500 px-2 mb-1 uppercase tracking-wide opacity-70">{mod.title}</div>
                  {mod.lessons.map(lesson => {
                    const isCompleted = completedLessons.includes(lesson.id);
                    const isActive = activeLesson.id === lesson.id;
                    return (
                      <button
                        key={lesson.id}
                        onClick={() => {
                          setActivePart(part);
                          setActiveLesson(lesson);
                          setIsSidebarOpen(false); // Close on mobile
                        }}
                        className={`w-full text-left px-3 py-2 text-xs font-medium rounded-lg transition-all flex items-center justify-between group ${isActive
                          ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/20'
                          : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
                          }`}
                      >
                        <span className="truncate pr-2">{lesson.title}</span>
                        {isCompleted && <span className="text-indigo-400 bg-indigo-500/10 rounded-full p-0.5">
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        </span>}
                      </button>
                    )
                  })}
                </div>
              ))}
            </div>
          ))}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 relative flex flex-col min-w-0">

        {/* Mobile Header */}
        <header className="lg:hidden h-14 border-b border-slate-800 flex items-center justify-between px-4 bg-slate-950/50 backdrop-blur-md sticky top-0 z-30">
          <button onClick={toggleSidebar} className="p-2 text-slate-400 hover:text-white">
            <Menu size={20} />
          </button>
          <div className="text-sm font-black text-white flex items-center gap-2">
            <span className="text-indigo-500"><Zap size={16} fill="currentColor" /></span> Synapse
          </div>
          <div className="w-10"></div> {/* Spacer for center alignment */}
        </header>

        {/* Lesson Engine Container */}
        <div className="flex-1 relative">
          <LessonEngine
            key={activeLesson.id}
            lesson={activeLesson}
            onComplete={handleComplete}
          />
        </div>
      </main>
    </div>
  );
};

export default App;
