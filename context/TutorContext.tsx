import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ConceptMastery, DoubtEntry, LearnerProfile, TutorState } from '../types';

// ============================================================================
// CONTEXT TYPE
// ============================================================================

interface TutorContextType {
    state: TutorState;

    // Profile Actions
    updateProfile: (updates: Partial<LearnerProfile>) => void;

    // Progress Actions
    startLesson: (lessonId: string) => void;
    completeLesson: (lessonId: string, xpEarned: number) => void;
    recordChallengeAttempt: (success: boolean) => void;

    // Doubt Actions
    addDoubt: (question: string, answer: string, lessonId: string, lessonTitle: string) => void;
    markDoubtHelpful: (doubtId: string, helpful: boolean) => void;

    // Mastery Actions
    updateConceptMastery: (conceptId: string, conceptName: string, delta: number) => void;

    // Adaptive Actions
    getAdaptiveContext: () => string;
    shouldSlowDown: () => boolean;
    shouldSpeedUp: () => boolean;

    // Live Observation Actions
    recordActivity: () => void;
    getTimeOnStep: () => number;

    // Persistence
    resetProgress: () => void;
}

const defaultProfile: LearnerProfile = {
    id: crypto.randomUUID(),
    name: 'Learner',
    mathComfort: 'balanced',
    codingLevel: 'beginner',
    pace: 'normal',
    interests: ['technology', 'games'],
    createdAt: new Date(),
};

const defaultState: TutorState = {
    profile: defaultProfile,
    completedLessons: [],
    currentLayer: 0,
    totalXP: 0,
    conceptMastery: new Map<string, ConceptMastery>(),
    doubtHistory: [],
    currentLessonId: null,
    currentStepIndex: 0,
    currentStepStartTime: new Date(),
    lastActivityTime: new Date(),
    sessionStartTime: new Date(),
    isStruggling: false,
    consecutiveFailures: 0,
    consecutiveSuccesses: 0,
};

// ============================================================================
// CONTEXT
// ============================================================================

const TutorContext = createContext<TutorContextType | undefined>(undefined);

export const useTutor = () => {
    const context = useContext(TutorContext);
    if (!context) {
        throw new Error('useTutor must be used within a TutorProvider');
    }
    return context;
};

// ============================================================================
// PROVIDER
// ============================================================================

const STORAGE_KEY = 'zerotohero_tutor_state';

export const TutorProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, setState] = useState<TutorState>(() => {
        // Load from localStorage
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                const parsed = JSON.parse(saved);
                return {
                    ...parsed,
                    conceptMastery: new Map(parsed.conceptMastery || []),
                    sessionStartTime: new Date(),
                    currentStepStartTime: new Date(),
                    lastActivityTime: new Date(),
                };
            }
        } catch (e) {
            console.warn('Failed to load tutor state:', e);
        }
        return { ...defaultState, sessionStartTime: new Date() };
    });

    // Persist to localStorage
    useEffect(() => {
        try {
            const toSave = {
                ...state,
                conceptMastery: Array.from(state.conceptMastery.entries()),
            };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
        } catch (e) {
            console.warn('Failed to save tutor state:', e);
        }
    }, [state]);

    // Profile Actions
    const updateProfile = (updates: Partial<LearnerProfile>) => {
        setState(prev => ({
            ...prev,
            profile: { ...prev.profile, ...updates },
        }));
    };

    // Progress Actions
    const startLesson = (lessonId: string) => {
        setState(prev => ({
            ...prev,
            currentLessonId: lessonId,
            currentStepIndex: 0,
            currentStepStartTime: new Date(),
            lastActivityTime: new Date(),
            consecutiveFailures: 0,
            consecutiveSuccesses: 0,
            isStruggling: false,
        }));
    };

    const completeLesson = (lessonId: string, xpEarned: number) => {
        setState(prev => ({
            ...prev,
            completedLessons: [...new Set([...prev.completedLessons, lessonId])],
            totalXP: prev.totalXP + xpEarned,
            currentLessonId: null,
            currentStepStartTime: new Date(),
        }));
    };

    const recordChallengeAttempt = (success: boolean) => {
        setState(prev => {
            const newFailures = success ? 0 : prev.consecutiveFailures + 1;
            const newSuccesses = success ? prev.consecutiveSuccesses + 1 : 0;
            return {
                ...prev,
                consecutiveFailures: newFailures,
                consecutiveSuccesses: newSuccesses,
                isStruggling: newFailures >= 3,
            };
        });
    };

    // Doubt Actions
    const addDoubt = (question: string, answer: string, lessonId: string, lessonTitle: string) => {
        const newDoubt: DoubtEntry = {
            id: crypto.randomUUID(),
            question,
            answer,
            lessonId,
            lessonTitle,
            timestamp: new Date(),
            helpful: null,
        };
        setState(prev => ({
            ...prev,
            doubtHistory: [newDoubt, ...prev.doubtHistory].slice(0, 100), // Keep last 100
        }));
    };

    const markDoubtHelpful = (doubtId: string, helpful: boolean) => {
        setState(prev => ({
            ...prev,
            doubtHistory: prev.doubtHistory.map(d =>
                d.id === doubtId ? { ...d, helpful } : d
            ),
        }));
    };

    // Mastery Actions
    const updateConceptMastery = (conceptId: string, conceptName: string, delta: number) => {
        setState(prev => {
            const newMastery = new Map(prev.conceptMastery);
            const existing = prev.conceptMastery.get(conceptId);
            const updated: ConceptMastery = {
                conceptId,
                conceptName,
                masteryLevel: existing ? Math.min(100, Math.max(0, existing.masteryLevel + delta)) : Math.min(100, Math.max(0, delta)),
                lastPracticed: new Date(),
                relatedDoubts: existing ? existing.relatedDoubts : [],
            };
            newMastery.set(conceptId, updated);
            return { ...prev, conceptMastery: newMastery };
        });
    };

    // Adaptive Context
    const getAdaptiveContext = (): string => {
        const { profile, completedLessons, isStruggling, consecutiveSuccesses, doubtHistory } = state;

        const timeOnStep = (new Date().getTime() - new Date(state.currentStepStartTime).getTime()) / 1000;
        const inactivitySeconds = (new Date().getTime() - new Date(state.lastActivityTime).getTime()) / 1000;

        let context = `
LEARNER PROFILE:
- Name: ${profile.name}
- Math Comfort: ${profile.mathComfort}
- Coding Level: ${profile.codingLevel}
- Preferred Pace: ${profile.pace}

LIVE TELEMETRY:
- Time on this step: ${Math.round(timeOnStep)} seconds
- Inactivity: ${Math.round(inactivitySeconds)} seconds
- STATUS: ${isStruggling ? 'STRUGGLING' : consecutiveSuccesses >= 3 ? 'EXCELLING' : 'NORMAL'}

HISTORY:
- Completed Lessons: ${completedLessons.length}
- Total XP: ${state.totalXP}
`;

        if (isStruggling) {
            context += `\nINSTRUCTION: The user is stuck. Break the fourth wall. Acknowledge the struggle. Offer a radical analogy.`;
        } else if (timeOnStep > 60 && inactivitySeconds > 30) {
            context += `\nINSTRUCTION: The user is idle. They might be confused or distracted. Re-engage them with a "Socratic" nudge about the current visualizer.`;
        }

        if (doubtHistory.length > 0) {
            context += `\n\nRECENT DOUBTS:\n${doubtHistory.slice(0, 3).map(d => `- Q: "${d.question}"`).join('\n')}`;
        }

        return context;
    };

    const shouldSlowDown = () => state.isStruggling;
    const shouldSpeedUp = () => state.consecutiveSuccesses >= 3;

    // Reset
    const resetProgress = () => {
        localStorage.removeItem(STORAGE_KEY);
        setState({ ...defaultState, sessionStartTime: new Date() });
    };

    const recordActivity = () => {
        setState(prev => ({ ...prev, lastActivityTime: new Date() }));
    };

    const getTimeOnStep = () => {
        return (new Date().getTime() - new Date(state.currentStepStartTime).getTime()) / 1000;
    };

    const value: TutorContextType = {
        state,
        updateProfile,
        startLesson,
        completeLesson,
        recordChallengeAttempt,
        addDoubt,
        markDoubtHelpful,
        updateConceptMastery,
        getAdaptiveContext,
        shouldSlowDown,
        shouldSpeedUp,
        recordActivity,
        getTimeOnStep,
        resetProgress,
    };

    return (
        <TutorContext.Provider value={value}>
            {children}
        </TutorContext.Provider>
    );
};

export default TutorContext;
