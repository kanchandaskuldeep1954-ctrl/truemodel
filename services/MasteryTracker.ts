import { ConceptMastery } from '../context/TutorContext';

export class MasteryTracker {
    // Ebbinghaus Forgetting Curve parameters (simplified)
    private static readonly DECAY_RATE = 0.1; // 10% decay per day without practice
    private static readonly MAX_MASTERY = 100;
    private static readonly MIN_MASTERY = 0;

    /**
     * Updates mastery score based on a new interaction result.
     */
    static updateMastery(
        currentMastery: number,
        success: boolean,
        difficulty: number // 0-1 scale
    ): number {
        let delta = 0;

        if (success) {
            // Reward more for higher difficulty, less for already high mastery (diminishing returns)
            const masteryFactor = (this.MAX_MASTERY - currentMastery) / this.MAX_MASTERY;
            delta = 10 * difficulty * masteryFactor + 5;
        } else {
            // Penalize less for high difficulty
            delta = -5 * (1 - difficulty);
        }

        return Math.max(this.MIN_MASTERY, Math.min(this.MAX_MASTERY, currentMastery + delta));
    }

    /**
     * Applies time-based decay to mastery scores (Spaced Repetition foundation).
     */
    static applyDecay(mastery: ConceptMastery): number {
        if (!mastery.lastPracticed) return mastery.masteryLevel;

        const daysSincePractice = (new Date().getTime() - new Date(mastery.lastPracticed).getTime()) / (1000 * 60 * 60 * 24);

        // Simple exponential decay: M = M0 * e^(-kt)
        // We use a linear approximation for simplicity and control
        const decayAmount = daysSincePractice * this.DECAY_RATE * 10; // ~1 point per day raw

        return Math.max(this.MIN_MASTERY, mastery.masteryLevel - decayAmount);
    }

    /**
     * Returns a verbal categorization of mastery level.
     */
    static getLabel(level: number): 'Novice' | 'Apprentice' | 'Practitioner' | 'Master' {
        if (level >= 90) return 'Master';
        if (level >= 70) return 'Practitioner';
        if (level >= 40) return 'Apprentice';
        return 'Novice';
    }
}
