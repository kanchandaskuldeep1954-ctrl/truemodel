import { Module } from '../../types';

export const Layer3: Module = {
    id: 'layer3',
    title: 'Layer 3: Learning & Optimization — The Hiker on the Hill',
    lessons: [
        // ═══════════════════════════════════════════════════════════
        // CHAPTER 1: THE PREDICTION (FORWARD PASS)
        // ═══════════════════════════════════════════════════════════
        {
            id: 'l3.1.prediction',
            title: 'The Prediction',
            description: 'The first step is to guess.',
            xpReward: 150,
            steps: [
                {
                    id: 'hook',
                    title: '🎯 The "Random Guess" Strategy',
                    type: 'text',
                    content: `Imagine you want to teach a robot to shoot a basketball.

You don't program the physics. You just tell it:
**"Throw the ball."**

It throws. It misses by a mile.

This is exactly how AI starts.
Every neural network begins its life as a complete idiot. It makes random guesses.

But unlike a random number generator, it has a way to **fix itself.**

To fix a mistake, you first have to MAKE a mistake.`,
                    requiredToAdvance: true
                },
                {
                    id: 'teach-linear',
                    title: '📚 The Prediction Function',
                    type: 'text',
                    content: `Let's start with the simplest AI brain: a single neuron.
It predicts house prices based on size.

**The Formula:**
\`price = weight × size + bias\`

- **Input (x):** The size (e.g., 2000 sq ft)
- **Weight (w):** How much each sq ft costs (e.g., $200)
- **Bias (b):** The base price of an empty lot (e.g., $50,000)
- **Output (y):** The predicted price

**At the start, w and b are RANDOM numbers.**
So the AI might predict that a mansion costs $5.

That's okay. We perform a **Forward Pass** to get this wrong answer, so we can measure HOW wrong it is.`,
                    requiredToAdvance: true
                },
                {
                    id: 'explore-predict',
                    title: '🎮 Make a Prediction',
                    type: 'interactive',
                    content: `**Your Mission:**

1. The blue dots are real house prices.
2. The Line is your model.
3. **Adjust m (Weight) and b (Bias)** to try and fit the data.

**Observe:**
- When you change **m**, you rotate the line.
- When you change **b**, you shift it up/down.
- You are manually performing "Learning" — adjusting parameters to fit data!`,
                    componentId: 'regression-playground',
                    requiredToAdvance: true
                },
                {
                    id: 'bridge',
                    title: '🌉 A Terrible Guess',
                    type: 'text',
                    content: `You made a guess. It was probably wrong.

To a human, "wrong" is a feeling.
To a computer, "wrong" must be a **number**.

We need to calculate exactly **how much** we missed by.
We need a score that tells us how bad we suck.

This score is called the **Loss.**`,
                    requiredToAdvance: true
                }
            ]
        },
        // ═══════════════════════════════════════════════════════════
        // CHAPTER 2: THE ERROR (LOSS FUNCTION)
        // ═══════════════════════════════════════════════════════════
        {
            id: 'l3.2.loss',
            title: 'The Error',
            description: 'Quantifying exactly how wrong we are.',
            xpReward: 200,
            steps: [
                {
                    id: 'hook',
                    title: '🎯 The Scoreboard of Failure',
                    type: 'text',
                    content: `In a video game, you want a HIGH score.
In AI training, you want a **LOW score.**

This score is called the **Loss** (or Cost).
- **Loss = 0:** Perfect prediction. God-tier AI.
- **Loss = 1,000,000:** Terrible prediction. Random noise.

The entire goal of AI training is simply: **Make Loss Go Down.**
That's it. ChatGPT is just a math equation trying to minimize its loss score.`,
                    requiredToAdvance: true
                },
                {
                    id: 'teach-mse',
                    title: '📚 Measuring the Distance',
                    type: 'text',
                    content: `How do we calculate Loss?
The most common way is **Mean Squared Error (MSE).**

1. Take the difference: \`Error = Prediction - Actual\`
2. Square it: \`DiffSq = Error²\`
3. Average them all.

**Why square it?**
- If you miss by -10 or +10, squaring gives **100**. It removes negatives.
- It punishes BIG mistakes much more than small ones.
  - Miss by 2 → Penalty 4
  - Miss by 10 → Penalty 100!

The AI is terrified of big mistakes.`,
                    requiredToAdvance: true
                },
                {
                    id: 'explore-loss',
                    title: '🎮 Visualizing The Error',
                    type: 'interactive',
                    content: `**Your Mission:**

1. Drag the **Prediction** slider.
2. The **Target** is fixed at 0.
3. Watch how the **Loss (MSE)** grows as you move away.

**Notice the shape:**
It's a curve (a parabola).
- Near the target, the loss is small and flat.
- Far away, the loss explodes upwards.

This "Bowl Shape" is the key to how AI learns!`,
                    componentId: 'error-viz',
                    requiredToAdvance: true
                },
                {
                    id: 'quiz-loss',
                    title: '🧠 Understanding Check',
                    type: 'quiz',
                    content: `Let's make sure you get the scoring system.`,
                    quizQuestion: 'Why do we square the error (Prediction - Target)² instead of just taking the difference?',
                    quizOptions: [
                        'To make the number smaller',
                        'To make sure the error is always positive and punish large mistakes',
                        'Because computers prefer square numbers',
                        'It is required by the CPU'
                    ],
                    quizCorrectIndex: 1,
                    quizExplanation: 'Correct! If we didn\'t square it, an error of -5 and +5 might cancel out to 0 (which looks perfect). Squaring makes everything positive (-5 becomes 25) and heavily penalizes big outliers.',
                    requiredToAdvance: true
                },
                {
                    id: 'bridge',
                    title: '🌉 We Know We are Wrong. Now What?',
                    type: 'text',
                    content: `Okay, we have a High Loss. Our AI is stupid.

We need to change the weights **w** and **b** to make the Loss lower.

But should we increase **w**? Decrease it? By how much?
We can't just guess randomly—that would take billion years.

We need a map. We need a compass.
We need the **Gradient.**`,
                    requiredToAdvance: true
                }
            ]
        },
        // ═══════════════════════════════════════════════════════════
        // CHAPTER 3: THE LANDSCAPE (GRADIENT)
        // ═══════════════════════════════════════════════════════════
        {
            id: 'l3.3.gradient',
            title: 'The Landscape',
            description: 'Why learning is just hiking downhill.',
            xpReward: 250,
            steps: [
                {
                    id: 'hook',
                    title: '🎯 The Blind Mountain Hiker',
                    type: 'text',
                    content: `Imagine you are standing on a mountain at night.
It's pitch black. You can't see the peak or the valley.

Your goal: **Reach the lowest point in the valley.**

How do you do it?
You feel the ground with your feet.
If the ground slopes **UP** to your right, you step **LEFT.**

This is exactly what AI does.
- The **Mountain** is the Loss Function.
- **Altitude** is the Loss (High = Bad, Low = Good).
- **Slope** is the gradient.`,
                    requiredToAdvance: true
                },
                {
                    id: 'teach-gradient',
                    title: '📚 The Gradient is the Slope',
                    type: 'text',
                    content: `In math, the "slope" of the mountain is called the **Derivative** or **Gradient.**

- Positive Slope (+): Going this way goes UPHILL.
- Negative Slope (-): Going this way goes DOWNHILL.
- Zero Slope (0): You are on flat ground (maybe the bottom!).

**The Golden Rule of Training:**
Calculate the gradient. Then go the **OPPOSITE** way.

If increasing **w** makes Loss go UP, then obtain lower Loss by decreasing **w**.`,
                    requiredToAdvance: true
                },
                {
                    id: 'explore-gradient',
                    title: '🎮 Feel the Slope',
                    type: 'interactive',
                    content: `**Your Mission:**

1. Move your mouse over the curve.
2. The **Green Arrow** shows the **Gradient** (Slope) at that point.
3. Notice:
   - Steep curve = Big Arrow (Strong gradient).
   - Flat bottom = Tiny Arrow (Zero gradient).

To train AI, we just "slide down" this curve until the arrow becomes zero!`,
                    componentId: 'gradient-viz',
                    requiredToAdvance: true
                },
                {
                    id: 'quiz-gradient',
                    title: '🧠 Understanding Check',
                    type: 'quiz',
                    content: `This is the heart of optimization.`,
                    quizQuestion: 'If the gradient is POSITIVE (pointing up), which way should we change our weight to reduce the loss?',
                    quizOptions: [
                        'Increase the weight (go with the gradient)',
                        'Decrease the weight (go opposite to the gradient)',
                        'Keep the weight the same',
                        'Set the weight to zero'
                    ],
                    quizCorrectIndex: 1,
                    quizExplanation: 'Yes! A positive gradient means "increasing x increases Loss." We want LESS Loss, so we must DECREASE x. We always subtract the gradient.',
                    requiredToAdvance: true
                },
                {
                    id: 'bridge',
                    title: '🌉 Taking the Step',
                    type: 'text',
                    content: `We know which way is downhill.
Now we need to take a step.

But how big of a step?
- Too small: You'll take forever to get home.
- Too big: You might jump OVER the valley and onto the next mountain.

This "step size" has a special name: **The Learning Rate.**
And using it correctly is an art form.`,
                    requiredToAdvance: true
                }
            ]
        },
        // ═══════════════════════════════════════════════════════════
        // CHAPTER 4: THE HIKER (GRADIENT DESCENT)
        // ═══════════════════════════════════════════════════════════
        {
            id: 'l3.4.gradient_descent',
            title: 'The Hiker',
            description: 'The algorithm that powers the world.',
            xpReward: 300,
            steps: [
                {
                    id: 'hook',
                    title: '🎯 The Algorithm of Intelligence',
                    type: 'text',
                    content: `This is it. The algorithm that trains ChatGPT, Tesla Autopilot, and AlphaFold.

It's called **Gradient Descent.**

It loops 4 simple steps, billions of times:
1. **Predict:** Run the model.
2. **Measure:** Calculate Loss (How wrong?).
3. **Gradient:** Which way is downhill?
4. **Step:** Update weights to be slightly better.

**Repeat until smart.**`,
                    requiredToAdvance: true
                },
                {
                    id: 'teach-lr',
                    title: '📚 The Learning Rate (Alpha)',
                    type: 'text',
                    content: `The size of the step we take is called the **Learning Rate (α)**.

The Update Equation:
\`New_Weight = Old_Weight - (Learning_Rate × Gradient)\`

**Goldilocks Principle:**
- **Too Low (0.00001):** Taking baby steps. Will take years to train.
- **Too High (10.0):** Giant leaps. You overshoot the bottom and explode.
- **Just Right (0.01):** Smooth, steady descent.`,
                    requiredToAdvance: true
                },
                {
                    id: 'explore-descent',
                    title: '🎮 Simulation: The Hiker Game',
                    type: 'interactive',
                    content: `**Your Mission:**

1. Click **"Step"** to watch the ball (current weight) roll down the hill.
2. Change the **Learning Rate**:
   - Try a tiny rate (0.01) → See how slow it is?
   - Try a HUGE rate (2.0) → Watch it chaos-jump forever!
   - Find the perfect rate to reach the bottom quickly.

This simulation is EXACTLY what happens inside a GPU training a massive model.`,
                    componentId: 'gradient-descent-game',
                    requiredToAdvance: true
                },
                {
                    id: 'code-update',
                    title: '💻 Code Challenge: The Update',
                    type: 'challenge',
                    content: `**Let's write the single most important line of code in AI.**

Implement the weight update rule.`,
                    initialCode: `def update_weights(weight, gradient, learning_rate):
    # weight: current value (e.g. 5.0)
    # gradient: slope (e.g. 2.0)
    # learning_rate: step size (e.g. 0.1)
    
    # Goal: Go opposite the gradient
    new_weight = 0 # Fix this line!
    
    return new_weight`,
                    expectedOutput: "4.8", // 5.0 - (2.0 * 0.1) = 4.8
                    hints: [
                        "Subtract the gradient from the weight",
                        "Multiply gradient by learning_rate first",
                        "weight - (gradient * learning_rate)"
                    ],
                    componentId: 'update-challenge-code',
                    requiredToAdvance: true
                },
                {
                    id: 'layer-complete',
                    title: '🏆 Layer 3 Complete!',
                    type: 'text',
                    content: `**🎉 You've completed Layer 3: Learning & Optimization.**

**Your Journey:**
1. **Forward Pass:** Making a prediction (Chapter 1).
2. **Loss Function:** Measuring the error (Chapter 2).
3. **Gradient:** Finding the direction of improvement (Chapter 3).
4. **Gradient Descent:** Walking down the hill to intelligence (Chapter 4).

**The Big Realization:**
This simple "hill climbing" process is ALL that AI training is.
Whether it's distinguishing cats from dogs or writing poetry, it's just minimizing a loss function on a 12,000-dimensional mountain.

**Next Up: Layer 4 - The Neural Network.**
What happens when we connect thousands of these neurons together?`,
                    requiredToAdvance: true
                }
            ]
        }
    ]
};
