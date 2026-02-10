import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lesson } from '../types';
import {
    BinaryIntroAnim,
    BinarySingleSwitch,
    BinaryCounter,
    BinaryChallenge5
} from './lessons/Part1/BinaryComponents';
import {
    LogicIntroAnim,
    LogicPlayground,
    LogicChallenge
} from './lessons/Part1/LogicComponents';
import {
    ManualSwitchViz,
    TransistorViz,
    HardwareGateViz
} from './lessons/Part1/PhysicalComponents';
import {
    FunctionIntroAnim,
    FunctionPlayground,
    FunctionChallenge
} from './lessons/Part1/FunctionComponents';
import {
    NeuronIntroAnim,
    NeuronPlayground,
    NeuronChallenge
} from './lessons/Part1/NeuronComponents';
import {
    GradientIntroAnim,
    GradientPlayground,
    GradientChallenge
} from './lessons/Part1/GradientComponents';
import {
    RegressionIntroAnim,
    RegressionPlayground
} from './lessons/Part2/RegressionComponents';
import {
    LogisticIntroAnim,
    ClassificationPlayground
} from './lessons/Part2/ClassificationComponents';
import {
    BinaryConverterLesson,
    ArrayVisualizerLesson,
    CalculatorLesson,
    FunctionMachineLesson
} from './lessons/Part1Basics';
import {
    SingleInputNeuronLesson,
    MultiInputNeuronLesson,
    ActivationFunctionLesson
} from './lessons/Part2Neuron';
import {
    ErrorConceptLesson,
    LossFunctionLesson,
    GradientDescentLesson,
    TrainingLoopLesson,
    BackpropIntroLesson
} from './lessons/Part3Learning';
import {
    HiddenLayerLesson,
    DeepNetLesson
} from './lessons/Part4NeuralNets';
import {
    NoisyDataLesson,
    OverfittingLesson
} from './lessons/Part5Data';
import {
    ConvolutionLesson
} from './lessons/Part6CNNs';
import {
    RNNLesson
} from './lessons/Part7RNNs';
import {
    TransformerLesson
} from './lessons/Part8Transformers';
import {
    DigitRecognizerLesson
} from './lessons/Part10Capstone';
import {
    MiniGPTLesson
} from './lessons/Part10CapstoneMiniGPT';
import { AsciiConverter } from './lessons/Part1/AsciiConverter';
import { PixelGrid } from './lessons/Part1/PixelGrid';
import { VectorPlotter } from './lessons/Part1/VectorPlotter';
import { MatrixViz } from './lessons/Part1/MatrixViz';
import { VoltageViz } from './lessons/Part1/VoltageViz';
import { ErrorViz } from './lessons/Part3/ErrorViz';
import { GradientViz } from './lessons/Part3/GradientViz';
import { GradientDescentGame } from './lessons/Part3/GradientDescentGame';
import { ActivationViz } from './lessons/Part4/ActivationViz';
import { XorViz } from './lessons/Part4/XorViz';
import { BackpropViz } from './lessons/Part5/BackpropViz';
import { HiddenLayerViz } from './lessons/Part5/HiddenLayerViz';
import { VanishingGradientViz } from './lessons/Part6/VanishingGradientViz';
import { OptimizerViz } from './lessons/Part6/OptimizerViz';
import { DropoutViz } from './lessons/Part6/DropoutViz';
import { PoolingViz } from './lessons/Part7/PoolingViz';
import { FilterGallery } from './lessons/Part7/FilterGallery';
import { ConvolutionVisualizer } from './ConvolutionVisualizer';
import { RnnViz } from './lessons/Part8/RnnViz';
import { LstmViz } from './lessons/Part8/LstmViz';
import { QkvViz } from './lessons/Part8/QkvViz';
import { TokenPredictionViz } from './lessons/Part8/TokenPredictionViz';
import { VoiceControl } from './VoiceControl';
import { useTutor } from '../context/TutorContext';
import { generatePersonaScript } from '../services/groq';
import { VoiceEngine } from '../services/VoiceEngine';

const cleanMarkdown = (text: string): string => {
    if (!text) return '';
    return text
        .replace(/\*\*(.*?)\*\*/g, '$1') // Bold
        .replace(/`(.*?)`/g, '$1') // Code
        .replace(/\[(.*?)\]\(.*?\)/g, '$1') // Links
        .replace(/^[-•]\s*/gm, '') // Bullets
        .replace(/#{1,6}\s/g, '') // Headers
        .replace(/\n/g, '. '); // Newlines to pauses
};
import { TransformerArchViz } from './lessons/Part8/TransformerArchViz';
import { AttentionHeatmap } from './AttentionHeatmap';
import { CodeChallenge } from './CodeChallenge';

interface LessonEngineProps {
    lesson: Lesson;
    onComplete: () => void;
}

// Lightweight markdown-like renderer for lesson content
const renderMarkdown = (text: string) => {
    if (!text) return null;
    const blocks = text.split('\n\n');
    return blocks.map((block, bi) => {
        const trimmed = block.trim();
        if (!trimmed) return null;

        // Check if block is a bullet list
        const lines = trimmed.split('\n');
        const isBulletList = lines.every(l => /^[-•✅✨🎯📚🎮💡🔗🏆🚀🎉⚡📊📉🧠🏋️👁️🔄🔍🤖]/.test(l.trim()) || l.trim() === '');
        if (isBulletList && lines.length > 1) {
            return (
                <ul key={bi} className="space-y-1 mb-4">
                    {lines.filter(l => l.trim()).map((line, li) => {
                        const cleaned = line.replace(/^[-•]\s*/, '').trim();
                        return <li key={li} className="flex gap-2"><span className="text-indigo-400 shrink-0">•</span><span>{renderInline(cleaned)}</span></li>;
                    })}
                </ul>
            );
        }

        // Check for code block
        if (trimmed.startsWith('```')) {
            const codeContent = trimmed.replace(/```[a-z]*\n?/g, '').replace(/```$/g, '');
            return <pre key={bi} className="bg-black/50 border border-slate-700 rounded-lg p-4 mb-4 text-sm font-mono text-green-400 overflow-x-auto whitespace-pre">{codeContent}</pre>;
        }

        // Check for table
        if (trimmed.includes('|') && lines.length >= 2 && lines[1]?.includes('---')) {
            const headerCells = lines[0].split('|').filter(c => c.trim());
            const dataRows = lines.slice(2).filter(l => l.includes('|'));
            return (
                <table key={bi} className="w-full mb-4 text-sm border-collapse">
                    <thead><tr>{headerCells.map((c, ci) => <th key={ci} className="border border-slate-700 px-3 py-2 text-left text-indigo-300 bg-slate-800/50">{renderInline(c.trim())}</th>)}</tr></thead>
                    <tbody>{dataRows.map((row, ri) => {
                        const cells = row.split('|').filter(c => c.trim());
                        return <tr key={ri}>{cells.map((c, ci) => <td key={ci} className="border border-slate-700 px-3 py-2 text-slate-300">{renderInline(c.trim())}</td>)}</tr>;
                    })}</tbody>
                </table>
            );
        }

        // Regular paragraph
        return <p key={bi} className="mb-4 leading-relaxed">{renderInline(trimmed)}</p>;
    });
};

// Render inline markdown (bold, code, italic)
const renderInline = (text: string): React.ReactNode => {
    const parts: React.ReactNode[] = [];
    let remaining = text;
    let key = 0;

    while (remaining.length > 0) {
        // Bold: **text**
        const boldMatch = remaining.match(/^(.*?)\*\*(.+?)\*\*(.*)$/s);
        if (boldMatch) {
            if (boldMatch[1]) parts.push(<span key={key++}>{boldMatch[1]}</span>);
            parts.push(<strong key={key++} className="text-white font-bold">{boldMatch[2]}</strong>);
            remaining = boldMatch[3];
            continue;
        }
        // Inline code: `text`
        const codeMatch = remaining.match(/^(.*?)`(.+?)`(.*)$/s);
        if (codeMatch) {
            if (codeMatch[1]) parts.push(<span key={key++}>{codeMatch[1]}</span>);
            parts.push(<code key={key++} className="bg-slate-800 px-1.5 py-0.5 rounded text-indigo-300 text-sm font-mono">{codeMatch[2]}</code>);
            remaining = codeMatch[3];
            continue;
        }
        // Line breaks within block
        if (remaining.includes('\n')) {
            const nlIdx = remaining.indexOf('\n');
            parts.push(<span key={key++}>{remaining.substring(0, nlIdx)}</span>);
            parts.push(<br key={key++} />);
            remaining = remaining.substring(nlIdx + 1);
            continue;
        }
        // Plain text
        parts.push(<span key={key++}>{remaining}</span>);
        break;
    }
    return <>{parts}</>;
};

export const LessonEngine: React.FC<LessonEngineProps> = ({ lesson, onComplete }) => {
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
    const hasInterjected = useRef<Record<string, boolean>>({});
    const tutor = useTutor();

    // Safely get steps, defaulting to empty array if undefined
    const steps = lesson.steps || [];
    const currentStep = steps[currentStepIndex];

    // Activity Tracking
    useEffect(() => {
        const handleActivity = () => tutor.recordActivity();
        window.addEventListener('mousemove', handleActivity);
        window.addEventListener('keydown', handleActivity);
        return () => {
            window.removeEventListener('mousemove', handleActivity);
            window.removeEventListener('keydown', handleActivity);
        };
    }, []);

    // Proactive Sentience: Interject if user is stuck/idle
    useEffect(() => {
        if (!currentStep) return;
        const stepKey = `${lesson.id}-${currentStepIndex}`;

        const checkSentience = async () => {
            const timeOnStep = tutor.getTimeOnStep();
            const adaptiveContext = tutor.getAdaptiveContext();

            // Trigger if: Not already interjected AND (Struggling OR Idle > 90s)
            const isIdle = timeOnStep > 90;
            const isStruggling = tutor.state.isStruggling;

            if (!hasInterjected.current[stepKey] && (isIdle || isStruggling)) {
                hasInterjected.current[stepKey] = true;
                console.log('AI Sentience: Interjecting due to', isIdle ? 'idle' : 'struggle');

                try {
                    const nudge = await generatePersonaScript(
                        currentStep.content,
                        'Tutor',
                        `${adaptiveContext}\nNOTE: You are interjecting PROACTIVELY because you notice they are stuck/idle. Break the fourth wall!`
                    );

                    if (nudge && nudge !== currentStep.content) {
                        VoiceEngine.speak(nudge);
                    }
                } catch (e) {
                    console.warn('Sentience nudge failed', e);
                }
            }
        };

        const interval = setInterval(checkSentience, 10000); // Check every 10s
        return () => clearInterval(interval);
    }, [currentStepIndex, lesson.id, currentStep]);

    if (!currentStep) {
        if (!steps.length) return <div className="text-white p-10">Legacy Content Mode</div>;
        return null;
    }

    const isStepCompleted = completedSteps.has(currentStepIndex);
    const canAdvance = isStepCompleted || !currentStep.requiredToAdvance;
    const isLastStep = currentStepIndex === steps.length - 1;

    const handleStepComplete = () => {
        const newCompleted = new Set(completedSteps);
        newCompleted.add(currentStepIndex);
        setCompletedSteps(newCompleted);
    };

    const handleNext = () => {
        if (canAdvance) {
            if (isLastStep) {
                onComplete();
            } else {
                setCurrentStepIndex(prev => prev + 1);
            }
        }
    };

    return (
        <div className="flex flex-col h-full bg-slate-950 text-white">
            {/* Progress Bar */}
            <div className="h-2 bg-slate-900 w-full fixed top-0 z-50">
                <motion.div
                    className="h-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]"
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentStepIndex + (isStepCompleted ? 1 : 0)) / steps.length) * 100}%` }}
                />
            </div>

            <div className="flex-1 flex flex-col items-center justify-center p-8">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentStep.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="max-w-4xl w-full"
                    >
                        <div className="mb-4 flex items-center justify-between">
                            <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest border border-indigo-500/30 px-2 py-1 rounded bg-indigo-500/10">
                                {currentStep.type} Phase
                            </span>
                            <VoiceControl text={cleanMarkdown(currentStep.content)} />
                        </div>
                        <h1 className="text-4xl font-black mb-4">{currentStep.title}</h1>
                        <div className="text-lg text-slate-300 mb-10 leading-relaxed max-w-3xl">{renderMarkdown(currentStep.content)}</div>

                        {/* Interactive Component Renderer - Only show if there is a component */}
                        {currentStep.componentId && (
                            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-10 min-h-[300px] flex items-center justify-center mb-10 shadow-2xl relative overflow-hidden">

                                {/* Background Grid Effect */}
                                <div className="absolute inset-0 opacity-10 pointer-events-none"
                                    style={{ backgroundImage: 'radial-gradient(#6366f1 1px, transparent 1px)', backgroundSize: '20px 20px' }}
                                ></div>

                                {currentStep.componentId === 'binary-intro-anim' && <BinaryIntroAnim />}

                                {currentStep.componentId === 'binary-single-switch' && (
                                    <BinarySingleSwitch onComplete={handleStepComplete} />
                                )}

                                {currentStep.componentId === 'binary-counter' && <BinaryCounter />}

                                {currentStep.componentId === 'binary-challenge-5' && (
                                    <BinaryChallenge5 onComplete={handleStepComplete} />
                                )}

                                {/* Layer 0: Physical Hardware */}
                                {currentStep.componentId === 'manual-switch-viz' && <ManualSwitchViz onComplete={handleStepComplete} />}
                                {currentStep.componentId === 'transistor-viz' && <TransistorViz onComplete={handleStepComplete} />}
                                {currentStep.componentId === 'hardware-gate-and' && <HardwareGateViz type="SERIES" onComplete={handleStepComplete} />}
                                {currentStep.componentId === 'hardware-gate-or' && <HardwareGateViz type="PARALLEL" onComplete={handleStepComplete} />}

                                {/* Logic Gates Components */}
                                {currentStep.componentId === 'logic-intro-anim' && <LogicIntroAnim />}

                                {currentStep.componentId === 'logic-playground' && (
                                    <LogicPlayground onComplete={handleStepComplete} />
                                )}

                                {currentStep.componentId === 'logic-challenge' && (
                                    <LogicChallenge onComplete={handleStepComplete} />
                                )}

                                {/* Function Components */}
                                {currentStep.componentId === 'function-intro-anim' && <FunctionIntroAnim />}

                                {currentStep.componentId === 'function-playground' && (
                                    <FunctionPlayground onComplete={handleStepComplete} />
                                )}

                                {currentStep.componentId === 'function-challenge' && (
                                    <FunctionChallenge onComplete={handleStepComplete} />
                                )}

                                {/* Neuron Components */}
                                {currentStep.componentId === 'neuron-intro-anim' && <NeuronIntroAnim />}

                                {currentStep.componentId === 'neuron-playground' && (
                                    <NeuronPlayground onComplete={handleStepComplete} />
                                )}

                                {currentStep.componentId === 'neuron-challenge' && (
                                    <NeuronChallenge onComplete={handleStepComplete} />
                                )}

                                {/* Gradient Components */}
                                {currentStep.componentId === 'gradient-intro-anim' && <GradientIntroAnim />}

                                {currentStep.componentId === 'gradient-playground' && (
                                    <GradientPlayground onComplete={handleStepComplete} />
                                )}

                                {currentStep.componentId === 'gradient-challenge' && (
                                    <GradientChallenge onComplete={handleStepComplete} />
                                )}

                                {/* Regression Components */}
                                {currentStep.componentId === 'regression-intro-anim' && <RegressionIntroAnim />}
                                {currentStep.componentId === 'regression-playground' && (
                                    <RegressionPlayground onComplete={handleStepComplete} />
                                )}

                                {/* Classification Components */}
                                {currentStep.componentId === 'logistic-intro-anim' && <LogisticIntroAnim />}
                                {currentStep.componentId === 'classification-playground' && (
                                    <ClassificationPlayground onComplete={handleStepComplete} />
                                )}

                                {/* Part1 Basics - New Interactive Lessons */}
                                {currentStep.componentId === 'binary-converter' && (
                                    <BinaryConverterLesson onComplete={handleStepComplete} />
                                )}
                                {currentStep.componentId === 'array-visualizer' && (
                                    <ArrayVisualizerLesson onComplete={handleStepComplete} />
                                )}
                                {currentStep.componentId === 'calculator-lesson' && (
                                    <CalculatorLesson onComplete={handleStepComplete} />
                                )}
                                {currentStep.componentId === 'function-machine' && (
                                    <FunctionMachineLesson onComplete={handleStepComplete} />
                                )}

                                {/* Part2 Neuron - New Interactive Lessons */}
                                {currentStep.componentId === 'single-input-neuron' && (
                                    <SingleInputNeuronLesson onComplete={handleStepComplete} />
                                )}
                                {currentStep.componentId === 'multi-input-neuron' && (
                                    <MultiInputNeuronLesson onComplete={handleStepComplete} />
                                )}
                                {currentStep.componentId === 'activation-function' && (
                                    <ActivationFunctionLesson onComplete={handleStepComplete} />
                                )}

                                {/* Part3 Learning - New Interactive Lessons */}
                                {currentStep.componentId === 'error-concept' && (
                                    <ErrorConceptLesson onComplete={handleStepComplete} />
                                )}
                                {currentStep.componentId === 'loss-function' && (
                                    <LossFunctionLesson onComplete={handleStepComplete} />
                                )}
                                {currentStep.componentId === 'gradient-descent-lesson' && (
                                    <GradientDescentLesson onComplete={handleStepComplete} />
                                )}
                                {currentStep.componentId === 'training-loop' && (
                                    <TrainingLoopLesson onComplete={handleStepComplete} />
                                )}
                                {currentStep.componentId === 'backprop-intro' && (
                                    <BackpropIntroLesson onComplete={handleStepComplete} />
                                )}

                                {/* Part4 Neural Networks - New Interactive Lessons */}
                                {currentStep.componentId === 'hidden-layer-lesson' && (
                                    <HiddenLayerLesson onComplete={handleStepComplete} />
                                )}
                                {currentStep.componentId === 'deep-net-lesson' && (
                                    <DeepNetLesson onComplete={handleStepComplete} />
                                )}

                                {/* Part5 Data - New Interactive Lessons */}
                                {currentStep.componentId === 'noisy-data-lesson' && (
                                    <NoisyDataLesson onComplete={handleStepComplete} />
                                )}
                                {currentStep.componentId === 'overfitting-lesson' && (
                                    <OverfittingLesson onComplete={handleStepComplete} />
                                )}

                                {/* Part6 CNNs - New Interactive Lessons */}
                                {currentStep.componentId === 'convolution-lesson' && (
                                    <ConvolutionLesson onComplete={handleStepComplete} />
                                )}

                                {/* Part7 RNNs - New Interactive Lessons */}
                                {currentStep.componentId === 'rnn-lesson' && (
                                    <RNNLesson onComplete={handleStepComplete} />
                                )}

                                {currentStep.componentId === 'transformer-lesson' && (
                                    <TransformerLesson onComplete={handleStepComplete} />
                                )}

                                {/* Part10 Capstone - New Interactive Lessons */}
                                {currentStep.componentId === 'digit-recognizer-lesson' && (
                                    <DigitRecognizerLesson onComplete={handleStepComplete} />
                                )}
                                {currentStep.componentId === 'minigpt-lesson' && (
                                    <MiniGPTLesson onComplete={handleStepComplete} />
                                )}

                                {/* Layer 1: Representation */}
                                {currentStep.componentId === 'ascii-converter' && (
                                    <AsciiConverter onComplete={handleStepComplete} />
                                )}
                                {currentStep.componentId === 'pixel-grid' && (
                                    <PixelGrid />
                                )}

                                {/* Layer 2: Computation */}
                                {currentStep.componentId === 'vector-plotter' && (
                                    <VectorPlotter />
                                )}
                                {currentStep.componentId === 'matrix-viz' && (
                                    <MatrixViz />
                                )}

                                {/* Layer 0: Physical World */}
                                {currentStep.componentId === 'voltage-viz' && (
                                    <VoltageViz onComplete={handleStepComplete} />
                                )}

                                {/* Layer 3: Optimization */}
                                {currentStep.componentId === 'error-viz' && <ErrorViz />}
                                {currentStep.componentId === 'gradient-viz' && <GradientViz />}
                                {currentStep.componentId === 'gradient-descent-game' && <GradientDescentGame />}

                                {/* Layer 4: Neural Networks */}
                                {currentStep.componentId === 'activation-viz' && <ActivationViz />}
                                {currentStep.componentId === 'xor-viz' && <XorViz />}

                                {/* Layer 5: Deep Learning */}
                                {currentStep.componentId === 'backprop-viz' && <BackpropViz />}
                                {currentStep.componentId === 'hidden-layer-viz' && <HiddenLayerViz />}

                                {/* Layer 6: Training Deep Networks */}
                                {currentStep.componentId === 'vanishing-gradient-viz' && <VanishingGradientViz />}
                                {currentStep.componentId === 'optimizer-viz' && <OptimizerViz />}
                                {currentStep.componentId === 'dropout-viz' && <DropoutViz />}

                                {/* Layer 7: CNNs */}
                                {currentStep.componentId === 'convolution-viz' && <ConvolutionVisualizer readOnly />}
                                {currentStep.componentId === 'filter-gallery' && <FilterGallery />}
                                {currentStep.componentId === 'pooling-viz' && <PoolingViz />}

                                {/* Layer 8: RNNs */}
                                {currentStep.componentId === 'rnn-viz' && <RnnViz />}
                                {currentStep.componentId === 'lstm-viz' && <LstmViz />}

                                {/* Layer 9: Attention */}
                                {currentStep.componentId === 'attention-heatmap' && <AttentionHeatmap />}
                                {currentStep.componentId === 'qkv-viz' && <QkvViz />}

                                {/* Layer 10: Transformers & GPT */}
                                {currentStep.componentId === 'transformer-arch-viz' && <TransformerArchViz />}
                                {currentStep.componentId === 'token-prediction-viz' && <TokenPredictionViz />}

                                {/* Code Challenges */}
                                {['binary-challenge-code', 'image-challenge-code', 'functions-challenge-code', 'dot-product-code', 'mse-challenge-code', 'update-challenge-code', 'neuron-code-challenge', 'deep-net-code-challenge'].includes(currentStep.componentId || '') && (
                                    <CodeChallenge
                                        id={lesson.id}
                                        title={currentStep.title}
                                        description={currentStep.content}
                                        initialCode={currentStep.initialCode || ''}
                                        expectedOutput={currentStep.expectedOutput || ''}
                                        hints={currentStep.hints || []}
                                        xpReward={lesson.xpReward || 50}
                                        onComplete={handleStepComplete}
                                    />
                                )}

                                {/* Fallback for missing components */}
                                {currentStep.componentId && !['binary-intro-anim', 'binary-single-switch', 'binary-counter', 'binary-challenge-5',
                                    'logic-intro-anim', 'logic-playground', 'logic-challenge',
                                    'function-intro-anim', 'function-playground', 'function-challenge',
                                    'neuron-intro-anim', 'neuron-playground', 'neuron-challenge',
                                    'gradient-intro-anim', 'gradient-playground', 'gradient-challenge',
                                    'regression-intro-anim', 'regression-playground',
                                    'logistic-intro-anim', 'classification-playground',
                                    'binary-converter', 'array-visualizer', 'calculator-lesson', 'function-machine',
                                    'single-input-neuron', 'multi-input-neuron', 'activation-function',
                                    'error-concept', 'loss-function', 'gradient-descent-lesson', 'training-loop', 'backprop-intro',
                                    'hidden-layer-lesson', 'deep-net-lesson',
                                    'noisy-data-lesson', 'overfitting-lesson',
                                    'convolution-lesson', 'rnn-lesson', 'transformer-lesson',
                                    'digit-recognizer-lesson', 'minigpt-lesson',
                                    // Layer 0-2 direct renders
                                    'voltage-viz', 'ascii-converter', 'pixel-grid', 'vector-plotter', 'matrix-viz',
                                    // Layer 3-5 direct renders
                                    'error-viz', 'gradient-viz', 'gradient-descent-game',
                                    'activation-viz', 'xor-viz', 'backprop-viz', 'hidden-layer-viz',
                                    // Layer 6-7 direct renders
                                    'vanishing-gradient-viz', 'optimizer-viz', 'dropout-viz',
                                    'convolution-viz', 'filter-gallery', 'pooling-viz',
                                    // Layer 8-10 direct renders
                                    'rnn-viz', 'lstm-viz', 'attention-heatmap', 'qkv-viz',
                                    'transformer-arch-viz', 'token-prediction-viz',
                                    // Code challenges
                                    'binary-challenge-code', 'image-challenge-code', 'functions-challenge-code',
                                    'dot-product-code', 'mse-challenge-code', 'update-challenge-code',
                                    'neuron-code-challenge', 'deep-net-code-challenge'
                                ].includes(currentStep.componentId || '') && (
                                        <div className="text-center text-slate-500">
                                            Component not found: {currentStep.componentId}
                                        </div>
                                    )}
                            </div>
                        )}


                        {/* Action Area */}
                        <div className="flex justify-between items-center">
                            <button
                                onClick={handleStepComplete}
                                className="text-xs text-slate-600 hover:text-slate-400 underline"
                            >
                                (Debug: Force Complete Step)
                            </button>

                            <button
                                onClick={handleNext}
                                disabled={!canAdvance}
                                className={`
                        px-8 py-3 rounded-xl font-bold uppercase tracking-wider transition-all
                        ${canAdvance
                                        ? 'bg-white text-black hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.2)]'
                                        : 'bg-slate-800 text-slate-600 cursor-not-allowed'}
                    `}
                            >
                                {isLastStep ? 'Finish Level' : 'Continue'} →
                            </button>
                        </div>

                    </motion.div>
                </AnimatePresence>
            </div>
        </div >
    );
};
