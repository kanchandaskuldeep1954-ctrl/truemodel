
import React, { useState, useEffect } from 'react';
import { COURSE_DATA } from './constants';
import { Lesson, Part } from './types';
import { AITutor } from './components/AITutor';
import { ConceptVideoPlayer } from './components/ConceptVideoPlayer';
import { LessonEngine } from './components/LessonEngine';

const App: React.FC = () => {
  const [activePart, setActivePart] = useState<Part>(COURSE_DATA[0]);
  const [activeLesson, setActiveLesson] = useState<Lesson>(COURSE_DATA[0].modules[0].lessons[0]);
  const [userXP, setUserXP] = useState(0);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [showLevelUp, setShowLevelUp] = useState(false);

  // Gamification Logic
  const handleComplete = () => {
    // 1. Mark as complete if not already
    if (!completedLessons.includes(activeLesson.id)) {
      setCompletedLessons(prev => [...prev, activeLesson.id]);
      setUserXP(prev => prev + activeLesson.xpReward);

      setShowLevelUp(true);
      setTimeout(() => setShowLevelUp(false), 3000);
    }

    // 2. Auto-advance Logic
    // Find current position
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

      // Try next lesson in same module
      if (currentLessonIdx + 1 < module.lessons.length) {
        setActiveLesson(module.lessons[currentLessonIdx + 1]);
        return;
      }

      // Try next module in same part
      if (currentModIdx + 1 < part.modules.length) {
        setActiveLesson(part.modules[currentModIdx + 1].lessons[0]);
        return;
      }

      // Try next part
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

  const renderInteractive = (type?: string) => {
    const props = { onComplete: handleComplete };

    // Check specific visualizers
    switch (type) {
      case 'binary': return <BinaryViz {...props} />;
      case 'neuron': return <NeuronViz {...props} />;
      case 'loss': return <LossViz {...props} />;
      case 'function': return <FunctionViz {...props} />;
      case 'activation': return <ActivationViz {...props} />;
      case 'gradient': return <GradientViz {...props} />;

      // Fallback for types that don't have a dedicated React component yet
      // This ensures the ConceptVideoPlayer is always available for complex topics
      case 'generic':
      default:
        return (
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 text-center shadow-inner">
            <p className="text-slate-400 font-medium mb-4 text-sm">
              <span className="block text-2xl mb-2">🎓</span>
              This concept is best learned through visualization.
              <br />
              Use the <strong className="text-indigo-400">Concept Video Generator</strong> above or ask the <strong className="text-indigo-400">AI Tutor</strong> for a deeper dive!
            </p>
            <button
              onClick={handleComplete}
              className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold py-2 px-4 rounded-lg transition-colors"
            >
              MARK AS UNDERSTOOD (+{activeLesson.xpReward} XP)
            </button>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-slate-900 text-slate-200 overflow-hidden font-sans">

      {/* Level Up Notification */}
      <div className={`fixed top-8 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${showLevelUp ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10 pointer-events-none'}`}>
        <div className="bg-gradient-to-r from-yellow-500 to-amber-600 text-white px-6 py-3 rounded-full font-bold shadow-[0_0_30px_rgba(245,158,11,0.6)] flex items-center gap-2 border-2 border-white/20">
          <span>🎉</span>
          <span>LESSON COMPLETE!</span>
          <span className="bg-black/20 px-2 rounded text-sm">+{activeLesson.xpReward} XP</span>
        </div>
      </div>

      {/* Sidebar */}
      <aside className="w-80 bg-slate-950 border-r border-slate-800 flex flex-col shadow-2xl z-20">
        <div className="p-6 bg-indigo-900/30 border-b border-indigo-500/10 backdrop-blur-sm">
          <h1 className="text-xl font-black tracking-tight text-white flex items-center gap-2">
            <span className="text-indigo-500">⚡</span> Synapse
          </h1>
          <p className="text-[10px] uppercase font-bold tracking-widest mt-1 text-slate-500">Master AI from First Principles</p>

          {/* User Stats */}
          <div className="mt-4 bg-slate-900 rounded-lg p-3 border border-slate-800">
            <div className="flex justify-between items-end mb-1">
              <span className="text-xs font-bold text-slate-400">LEVEL {getLevel(userXP)}</span>
              <span className="text-xs font-mono text-indigo-400">{userXP} XP</span>
            </div>
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full transition-all duration-1000"
                style={{ width: `${getProgressToNextLevel(userXP)}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-slate-800">
          {COURSE_DATA.map(part => (
            <div key={part.id} className="mb-8">
              <h2 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4 px-2 flex items-center gap-2 sticky top-0 bg-slate-950/90 backdrop-blur py-2 z-10">
                {part.title}
                <div className="h-px bg-slate-800 flex-1"></div>
              </h2>
              {part.modules.map(mod => (
                <div key={mod.id} className="space-y-1 mb-4">
                  <div className="text-xs font-bold text-slate-300 px-2 mb-2 uppercase tracking-wide opacity-75">{mod.title}</div>
                  {mod.lessons.map(lesson => {
                    const isCompleted = completedLessons.includes(lesson.id);
                    const isActive = activeLesson.id === lesson.id;
                    return (
                      <button
                        key={lesson.id}
                        onClick={() => { setActivePart(part); setActiveLesson(lesson); }}
                        className={`w-full text-left px-3 py-2.5 text-xs font-medium rounded-lg transition-all flex items-center justify-between group ${isActive
                          ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/20'
                          : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                          }`}
                      >
                        <span className="truncate pr-2">{lesson.title}</span>
                        {isCompleted && <span className="text-green-400">✓</span>}
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
      <main className="flex-1 overflow-y-auto relative">
        <div className="max-w-7xl mx-auto p-6 lg:p-10 grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* New Lesson Engine Check */}
          {activeLesson.steps && activeLesson.steps.length > 0 ? (
            <div className="absolute inset-0 bg-slate-950 z-10 flex flex-col">
              <LessonEngine lesson={activeLesson} onComplete={handleComplete} />
            </div>
          ) : (
            <>
              {/* Legacy Lesson View */}
              <div className="lg:col-span-2 space-y-8">
                <header>
                  <nav className="text-xs text-indigo-400 font-bold mb-3 flex items-center gap-2 uppercase tracking-wider">
                    <span className="opacity-50">{activePart.title}</span>
                    <span className="text-slate-600">/</span>
                    <span>Lesson {activeLesson.id.replace('l', '')}</span>
                  </nav>
                  <h1 className="text-3xl lg:text-4xl font-black text-white tracking-tight mb-4">{activeLesson.title}</h1>
                  <p className="text-base text-slate-400 leading-relaxed max-w-2xl">{activeLesson.description}</p>
                </header>

                {/* Video Player - Always Available */}
                <ConceptVideoPlayer title={activeLesson.title} description={activeLesson.description} />

                {/* Content Cards */}
                <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50 backdrop-blur-sm">
                  <div className="prose prose-invert max-w-none prose-p:text-slate-300 prose-headings:text-white prose-strong:text-white prose-code:text-indigo-300">
                    {activeLesson.content?.split('\n').map((line, i) => (
                      <p key={i}>{line.trim()}</p>
                    ))}
                  </div>
                </div>

                {/* Interactive Section */}
                <section className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></div>
                      <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest">Interactive Simulation</h2>
                    </div>
                    <div className="text-[10px] bg-slate-800 px-2 py-1 rounded border border-slate-700 text-slate-500 font-mono">
                      REWARD: {activeLesson.xpReward} XP
                    </div>
                  </div>
                  {renderInteractive(activeLesson.interactiveType)}
                </section>

                {/* Code Scratch Pad */}
                {activeLesson.code && (
                  <section className="space-y-4 pt-4">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                      <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest">Source Code</h2>
                    </div>
                    <div className="bg-[#0d1117] rounded-xl p-0 shadow-xl border border-slate-800 overflow-hidden">
                      <div className="bg-slate-800/50 px-4 py-2 border-b border-slate-800 flex justify-between items-center">
                        <span className="text-xs font-mono text-slate-500">example.py</span>
                        <button className="text-[10px] text-slate-400 hover:text-white font-bold transition-colors">COPY</button>
                      </div>
                      <pre className="p-6 text-sm overflow-x-auto font-mono text-slate-300">
                        <code>{activeLesson.code}</code>
                      </pre>
                    </div>
                  </section>
                )}
              </div>

              {/* AI Sidepanel */}
              <div className="space-y-6 lg:sticky lg:top-8 lg:h-fit">
                <AITutor currentTopic={activeLesson.title} />

                <div className="bg-gradient-to-br from-amber-500/10 to-orange-600/10 border border-amber-500/20 rounded-xl p-5 backdrop-blur-sm">
                  <h4 className="text-amber-500 font-bold text-xs uppercase mb-2 flex items-center gap-2">
                    <span>💡</span> Pro Tip
                  </h4>
                  <p className="text-xs text-amber-200/80 leading-relaxed italic">
                    "If you're stuck, try generating a video concept. Sometimes seeing the math move in 3D makes it click instantly!"
                  </p>
                </div>
              </div>
            </>
          )}

        </div>
      </main>
    </div>
  );
};

export default App;
