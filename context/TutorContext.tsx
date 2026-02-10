import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// ============================================================================
// TYPES
// ============================================================================

export interface LearnerProfile {
    id: string;
    name: string;
    mathComfort: 'visual' | 'symbolic' | 'balanced';
    codingLevel: 'beginner' | 'intermediate' | 'advanced';
    pace: 'slow' | 'normal' | 'fast';
    interests: string[];
    createdAt: Date;
}

export interface LessonProgress {
    lessonId: string;
    startedAt: Date;
    completedAt?: Date;
    timeSpentSeconds: number;
    challengeAttempts: number;
    challengeSuccesses: number;
    masteryLevel: 'none' | 'learning' | 'practiced' | 'mastered';
    doubtsAsked: number;
}

export interface ConceptMastery {
    conceptId: string;
    conceptName: string;
    masteryLevel: number; // 0-100
    lastPracticed?: Date;
    relatedDoubts: string[];
}

export interface DoubtEntry {
    id: string;
    question: string;
    answer: string;
    lessonId: string;
    lessonTitle: string;
    timestamp: Date;
    helpful: boolean | null;
}

export interface TutorState {
    // Learner Profile
    profile: LearnerProfile;

    // Progress
    completedLessons: string[];
    currentLayer: number;
    totalXP: number;

    // Mastery
    conceptMastery: Map<string, ConceptMastery>;

    // Doubt History
    doubtHistory: DoubtEntry[];

    // Current Session
    currentLessonId: string | null;
    currentStepIndex: number;
    sessionStartTime: Date;

    // Adaptive State
    isStruggling: boolean;
    consecutiveFailures: number;
    consecutiveSuccesses: number;
}

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
    conceptMastery: new Map(),
    doubtHistory: [],
    currentLessonId: null,
    currentStepIndex: 0,
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
            const existing = newMastery.get(conceptId) || {
                conceptId,
                conceptName,
                masteryLevel: 0,
                relatedDoubts: [],
            };
            newMastery.set(conceptId, {
                ...existing,
                masteryLevel: Math.min(100, Math.max(0, existing.masteryLevel + delta)),
                lastPracticed: new Date(),
            });
            return { ...prev, conceptMastery: newMastery };
        });
    };

    // Adaptive Context
    const getAdaptiveContext = (): string => {
        const { profile, completedLessons, isStruggling, consecutiveSuccesses, doubtHistory } = state;

        let context = `
LEARNER PROFILE:
- Name: ${profile.name}
- Math Comfort: ${profile.mathComfort}
- Coding Level: ${profile.codingLevel}
- Preferred Pace: ${profile.pace}
- Interests: ${profile.interests.join(', ')}

PROGRESS:
- Completed Lessons: ${completedLessons.length}
- Total XP: ${state.totalXP}
- Current Layer: ${state.currentLayer}

CURRENT STATE:`;

        if (isStruggling) {
            context += `
- STATUS: STRUGGLING (${state.consecutiveFailures} consecutive failures)
- INSTRUCTION: Slow down. Break concepts into smaller pieces. Use more analogies.`;
        } else if (consecutiveSuccesses >= 3) {
            context += `
- STATUS: EXCELLING (${consecutiveSuccesses} consecutive successes)
- INSTRUCTION: Can speed up or offer advanced challenges.`;
        } else {
            context += `
- STATUS: NORMAL PACE`;
        }

        if (doubtHistory.length > 0) {
            context += `

RECENT DOUBTS (for context):
${doubtHistory.slice(0, 3).map(d => `- Q: "${d.question}" (Lesson: ${d.lessonTitle})`).join('\n')}`;
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
        resetProgress,
    };

    return (
        <TutorContext.Provider value={value}>
            {children}
        </TutorContext.Provider>
    );
};

export default TutorContext;
