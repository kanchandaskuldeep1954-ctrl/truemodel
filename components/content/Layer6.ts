import { Module } from '../../types';

export const Layer6: Module = {
    id: 'layer6',
    title: 'Layer 6: The Dark Arts of Training',
    lessons: [
        // ═══════════════════════════════════════════════════════════
        // CHAPTER 1: THE TRAP (OVERFITTING)
        // ═══════════════════════════════════════════════════════════
        {
            id: 'l6.1.overfitting',
            title: 'The Trap',
            description: 'Why smarter isn\'t always better.',
            xpReward: 150,
            steps: [
                {
                    id: 'hook',
                    title: '🎯 The Memorization Student',
                    type: 'text',
                    content: `Imagine a student who memorizes the exact answers to the practice test.
- Practice Score: 100%
- Real Exam Score: 0%

This is called **Overfitting.**
It is the most dangerous trap in AI.

A network that overfits has learned to **memorize the data**, not **understand the patterns.**`,
                    requiredToAdvance: true
                },
                {
                    id: 'teach-overfitting',
                    title: '📚 Signal vs. Noise',
                    type: 'text',
                    content: `Real world data is messy. It contains:
1. **Signal:** The true underlying pattern (e.g., "House prices go up with size").
2. **Noise:** Random errors (e.g., "This one house was cheap because it had ghosts").

**Overfitting happens when the AI learns the ghosts.**
It tries to explain every single random outlier, creating a crazy, wiggly decision boundary.

**Ideally:** We want a smooth, simple curve that ignores the noise.`,
                    requiredToAdvance: true
                },
                {
                    id: 'explore-overfitting',
                    title: '🎮 Too Smart for Its Own Good',
                    type: 'interactive',
                    content: `**Your Mission:**

1. **Phase 1 (Underfitting):** Use a simple model (Line). It's too simple. High Error.
2. **Phase 2 (Goldilocks):** Use a moderate model (Curve). It fits the trend.
3. **Phase 3 (Overfitting):** Use a complex model (Wiggly).
   - Watch the Training Loss go to ZERO.
   - But look at the curve! It's garbage.

**Key Insight:** Low Training Loss does NOT mean you have a good model.`,
                    componentId: 'overfitting-lesson',
                    requiredToAdvance: true
                },
                {
                    id: 'bridge',
                    title: '🌉 How Do We Stop It?',
                    type: 'text',
                    content: `We want our AI to be smart (Deep Network), but not TOO smart (Overfitting).

How do we prevent it from memorizing the noise?

We need to make learning **harder.**
We need to sabotage the network slightly so it CAN'T memorize.

This is called **Regularization.**`,
                    requiredToAdvance: true
                }
            ]
        },
        // ═══════════════════════════════════════════════════════════
        // CHAPTER 2: THE FIX (REGULARIZATION)
        // ═══════════════════════════════════════════════════════════
        {
            id: 'l6.2.regularization',
            title: 'The Fix',
            description: 'Sabotaging the network to make it stronger.',
            xpReward: 200,
            steps: [
                {
                    id: 'hook',
                    title: '🎯 The Amnesiac',
                    type: 'text',
                    content: `What if, every time you studied, 50% of your brain cells randomly turned off?

You couldn't rely on memorizing specific facts.
You would have to learn **robust, general concepts** that work even if parts of your brain are missing.

This technique is called **Dropout.**
It sounds insane, but it is one of the most effective ways to train deep networks.`,
                    requiredToAdvance: true
                },
                {
                    id: 'teach-dropout',
                    title: '📚 Dropout Explained',
                    type: 'text',
                    content: `**How Dropout Works:**

1. **During Training:**
   For every step, we randomly select 50% of neurons and **kill them** (set output to 0).
   The network must find a path through the remaining neurons.

2. **During Inference (Real World):**
   We turn ALL neurons back on (and scale the output).

**The Result:**
The network becomes an "Ensemble" of thousands of smaller networks. It is incredibly robust to noise.`,
                    requiredToAdvance: true
                },
                {
                    id: 'explore-dropout',
                    title: '🎮 Visualizing Dropout',
                    type: 'interactive',
                    content: `**Your Mission:**

1. Watch the network train.
2. Every few milliseconds, a random set of neurons turns **GRAY** (Dead).
3. The signal MUST find an alternate route.
4. This forces the network to spread information out, preventing any single neuron from becoming a "know-it-all".`,
                    componentId: 'dropout-viz',
                    requiredToAdvance: true
                },
                {
                    id: 'quiz-dropout',
                    title: '🧠 Understanding Check',
                    type: 'quiz',
                    content: `Is sabotage really the answer?`,
                    quizQuestion: 'Why does randomly disabling neurons (Dropout) improve the final model?',
                    quizOptions: [
                        'It makes the model calculate faster',
                        'It prevents the network from relying on specific neurons, forcing it to learn redundant, robust features',
                        'It saves electricity',
                        'It increases the learning rate'
                    ],
                    quizCorrectIndex: 1,
                    quizExplanation: 'Correct! By removing specific paths, the network is forced to generalize rather than memorize.',
                    requiredToAdvance: true
                },
                {
                    id: 'bridge',
                    title: '🌉 Navigating the Landscape',
                    type: 'text',
                    content: `We've stopped the network from cheating (Overfitting).
Now we need to help it learn FASTER.

Simple Gradient Descent (The Hiker) is slow.
Is there a better way to walk down the hill?`,
                    requiredToAdvance: true
                }
            ]
        },
        // ═══════════════════════════════════════════════════════════
        // CHAPTER 3: THE PATH (OPTIMIZATION)
        // ═══════════════════════════════════════════════════════════
        {
            id: 'l6.3.optimization',
            title: 'The Path',
            description: 'Why we don\'t use plain Gradient Descent anymore.',
            xpReward: 250,
            steps: [
                {
                    id: 'hook',
                    title: '🎯 The Heavy Ball',
                    type: 'text',
                    content: `Imagine a ball rolling down a bumpy hill.
If it stops every second to check the slope (Standard Gradient Descent), it will get stuck in small potholes (Local Minima).

But a **Heavy Ball** has **Momentum.**
It blasts through small potholes.
It picks up speed in the right direction.

This is the physics behind modern Optimizers.`,
                    requiredToAdvance: true
                },
                {
                    id: 'teach-adam',
                    title: '📚 Meet ADAM',
                    type: 'text',
                    content: `**SGD (Stochastic Gradient Descent):**
Standard approach. Slow. Gets stuck.

**Momentum:**
Accumulates speed. Fast, but can overshoot.

**Adam (Adaptive Moment Estimation):**
The King of Optimizers.
1. It has Momentum (Speed).
2. It adapts the Learning Rate for EACH weight individually.
   - Frequently updated weights → Slow down (Precision).
   - Rarely updated weights → Speed up (Exploration).

**Pro Tip:** If you don't know what to use, use Adam.`,
                    requiredToAdvance: true
                },
                {
                    id: 'explore-optimizer',
                    title: '🎮 The Race',
                    type: 'interactive',
                    content: `**Your Mission:**

1. Select **SGD** (Red). Watch it struggle.
2. Select **Momentum** (Blue). Watch it accelerate.
3. Select **Adam** (Green). Watch it intelligently navigate the terrain.

**Notice:** Adam isn't just fast; it's smart. It slows down near the target.`,
                    componentId: 'optimizer-viz',
                    requiredToAdvance: true
                },
                {
                    id: 'bridge',
                    title: '🌉 The Deepest Problem',
                    type: 'text',
                    content: `We have the tools.
But as we stack more and more layers (10, 50, 100...), a new demon appears.

The signal from the beginning (Input) starts to fade before it reaches the end.
And the error from the end (Backprop) vanishes before it reaches the start.

This is the **Vanishing Gradient Problem.**`,
                    requiredToAdvance: true
                }
            ]
        },
        // ═══════════════════════════════════════════════════════════
        // CHAPTER 4: THE SIGNAL (VANISHING GRADIENT)
        // ═══════════════════════════════════════════════════════════
        {
            id: 'l6.4.vanishing',
            title: 'The Signal',
            description: 'Why deep networks used to fail.',
            xpReward: 300,
            steps: [
                {
                    id: 'hook',
                    title: '🎯 The Telephone Game',
                    type: 'text',
                    content: `You played "Telephone" as a kid.
By the time the message reaches the 10th person, it's garbage.

Deep Networks suffer the same fate.
As we backpropagate, we multiply gradients (Chain Rule).

If gradients are small (e.g., 0.1), then:
0.1 × 0.1 × 0.1 × 0.1 ... = **0.00000001**

The first layers get ZERO learning signal. They stay random.`,
                    requiredToAdvance: true
                },
                {
                    id: 'teach-relu',
                    title: '📚 How ReLU Saved AI',
                    type: 'text',
                    content: `For decades, we used **Sigmoid** activation (Squash to 0-1).
Its slope is always small (< 0.25). This KILLED deep learning.

**The Fix:** **ReLU (Rectified Linear Unit).**
- Input > 0? Slope = 1.
- Input < 0? Slope = 0.

**1.0 × 1.0 × 1.0 = 1.0**
The gradient DOES NOT VANISH!
It passes through the network unchanged.

This one simple change allowed us to train networks with 100+ layers (like ResNet).`,
                    requiredToAdvance: true
                },
                {
                    id: 'explore-vanishing',
                    title: '🎮 Visualizing the Fade',
                    type: 'interactive',
                    content: `**Your Mission:**

1. **Setup:** Deep Network (5 Layers).
2. **Mode 1 (Sigmoid):** Watch the gradient bars (Green) shrink to nothing in the early layers.
3. **Mode 2 (ReLU):** Watch the gradient bars stay strong all the way back.

**Conclusion:** Without ReLU, Deep Learning as we know it would not exist.`,
                    componentId: 'vanishing-gradient-viz',
                    requiredToAdvance: true
                },
                {
                    id: 'layer-complete',
                    title: '🏆 Layer 6 Complete!',
                    type: 'text',
                    content: `**🎉 You've completed Layer 6: Training Dynamics.**

**Your Journey:**
1. **The Trap:** Overfitting (Memorizing noise).
2. **The Fix:** Dropout (Forced robustness).
3. **The Path:** Adam Optimizer (Smart navigation).
4. **The Signal:** ReLU (Solving vanishing gradients).

**You are now a master of the "Dark Arts" of training.**

**Next Up: Layer 7 - Convolutional Neural Networks.**
We are finally done with theory.
Let's build a machine that can SEE.`,
                    requiredToAdvance: true
                }
            ]
        }
    ]
};
