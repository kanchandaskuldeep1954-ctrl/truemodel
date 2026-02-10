import { LearnerProfile, LessonProgress, TutorState } from '../context/TutorContext';

export interface AdaptiveRecommendation {
    action: 'speed_up' | 'slow_down' | 'maintain' | 'review_prerequisites';
    reason: string;
    suggestedContentModifications?: {
        showMoreVisuals?: boolean;
        showMoreCode?: boolean;
        simplifyLanguage?: boolean;
        skipPractice?: boolean;
    };
}

export class AdaptiveEngine {
    private static readonly STRUGGLE_THRESHOLD_FAILURES = 3;
    private static readonly EXCEL_THRESHOLD_SUCCESSES = 3;
    private static readonly SLOW_ADAPTATION_FACTOR = 1.2; // Increase time estimates by 20%
    private static readonly FAST_ADAPTATION_FACTOR = 0.8; // Decrease time estimates by 20%

    /**
     * Analyzes current learner state and returns adaptation recommendations.
     */
    static getRecommendation(state: TutorState): AdaptiveRecommendation {
        const { isStruggling, consecutiveSuccesses, profile, currentLessonId } = state;

        // 1. Struggling Scenario
        if (isStruggling) {
            return {
                action: 'slow_down',
                reason: 'Detected multiple consecutive challenge failures.',
                suggestedContentModifications: {
                    showMoreVisuals: profile.mathComfort === 'visual',
                    simplifyLanguage: true,
                    showMoreCode: profile.codingLevel === 'beginner',
                }
            };
        }

        // 2. Excelling Scenario
        if (consecutiveSuccesses >= this.EXCEL_THRESHOLD_SUCCESSES) {
            return {
                action: 'speed_up',
                reason: 'Consistent success on first attempts.',
                suggestedContentModifications: {
                    skipPractice: true,
                    showMoreCode: true, // Show implementation details earlier
                }
            };
        }

        // 3. Maintenance Scenario
        return {
            action: 'maintain',
            reason: 'Learner is progressing at an expected pace.',
        };
    }

    /**
     * Calculates the optimal next step based on mastery.
     */
    static getNextStepRecommendation(
        currentMastery: number,
        lessonDifficulty: number
    ): 'advance' | 'practice_more' | 'review' {
        if (currentMastery < 40) return 'review';
        if (currentMastery < 80) return 'practice_more';
        return 'advance';
    }
}
