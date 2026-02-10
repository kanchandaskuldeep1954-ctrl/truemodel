import React from 'react';
import { useTutor, LearnerProfile as ProfileType } from '../context/TutorContext';

export const LearnerProfile: React.FC = () => {
    const { state, updateProfile, resetProgress } = useTutor();
    const { profile } = state;

    const handleChange = (field: keyof ProfileType, value: any) => {
        updateProfile({ [field]: value });
    };

    return (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 max-w-md mx-auto my-8">
            <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-indigo-600 flex items-center justify-center text-3xl shadow-lg">
                    👤
                </div>
                <div>
                    <h2 className="text-xl font-bold text-white">Learner Settings</h2>
                    <p className="text-slate-400 text-sm">Customize your AI Tutor</p>
                </div>
            </div>

            <div className="space-y-6">
                {/* Name */}
                <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Display Name</label>
                    <input
                        type="text"
                        value={profile.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                </div>

                {/* Math Comfort */}
                <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Math Comfort Level</label>
                    <div className="grid grid-cols-3 gap-2">
                        {['visual', 'balanced', 'symbolic'].map((option) => (
                            <button
                                key={option}
                                onClick={() => handleChange('mathComfort', option)}
                                className={`
                  px-3 py-2 rounded-lg text-sm font-medium capitalize transition-all border
                  ${profile.mathComfort === option
                                        ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg'
                                        : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700'
                                    }
                `}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                    <p className="text-xs text-slate-500 mt-2">
                        {profile.mathComfort === 'visual' && "Focus on intuitive animations and analogies."}
                        {profile.mathComfort === 'balanced' && "Mix of visuals and standard notation."}
                        {profile.mathComfort === 'symbolic' && "Heavy use of equations and formal proofs."}
                    </p>
                </div>

                {/* Coding Level */}
                <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Coding Experience</label>
                    <select
                        value={profile.codingLevel}
                        onChange={(e) => handleChange('codingLevel', e.target.value)}
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-indigo-500 outline-none appearance-none"
                    >
                        <option value="beginner">Beginner (New to Python)</option>
                        <option value="intermediate">Intermediate (Comfortable with basic logic)</option>
                        <option value="advanced">Advanced (Professional Developer)</option>
                    </select>
                </div>

                {/* Pace */}
                <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Preferred Pace</label>
                    <div className="flex items-center justify-between bg-slate-800 rounded-lg p-1 border border-slate-700">
                        {['slow', 'normal', 'fast'].map((option) => (
                            <button
                                key={option}
                                onClick={() => handleChange('pace', option)}
                                className={`
                  flex-1 py-1.5 rounded-md text-xs font-medium capitalize transition-all
                  ${profile.pace === option
                                        ? 'bg-slate-600 text-white shadow-sm'
                                        : 'text-slate-400 hover:text-slate-200'
                                    }
                `}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Danger Zone */}
                <div className="pt-6 border-t border-slate-800">
                    <button
                        onClick={() => {
                            if (window.confirm('Are you sure? This will delete all progress and cannot be undone.')) {
                                resetProgress();
                            }
                        }}
                        className="w-full py-2 px-4 rounded-lg bg-red-900/20 border border-red-900/50 text-red-400 text-sm hover:bg-red-900/40 transition-colors"
                    >
                        Reset All Progress
                    </button>
                </div>
            </div>
        </div>
    );
};
