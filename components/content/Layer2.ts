import { Module } from '../../types';

export const Layer2: Module = {
    id: 'layer2',
    title: 'Layer 2: Functions & Transformations — The Math of Patterns',
    lessons: [
        // ═══════════════════════════════════════════════════════════
        // CHAPTER 1: THE MACHINE INSIDE THE MACHINE
        // ═══════════════════════════════════════════════════════════
        {
            id: 'l2.1.functions',
            title: 'The Machine Inside the Machine',
            description: 'What actually IS a neural network? It\'s just a function.',
            xpReward: 150,
            steps: [
                {
                    id: 'hook',
                    title: '🎯 The Black Box',
                    type: 'text',
                    content: `In Layer 1, we learned that EVERYTHING is a vector.
- Your photo = a vector of 36 million numbers.
- Your voice = a vector of audio samples.
- Your text = a vector of token IDs.

But vectors just sit there. They are static data.

To make AI **do** something — to recognize a cat, translate a sentence, or drive a car — we need to TRANSFORM those vectors.

We need a machine that takes an input vector and produces an output vector.

In math, we call this machine a **function**. And a neural network is just a very, very big function.`,
                    requiredToAdvance: true
                },
                {
                    id: 'intuition-vending',
                    title: '💡 The Vending Machine Analogy',
                    type: 'text',
                    content: `Think of a function like a **vending machine**:

1. **Input (x):** You put in a coin.
2. **Parameters (w):** You press a specific button.
3. **Output (y):** A snack comes out.

If you put in the same coin and press the same button, you ALWAYS get the same snack. It's deterministic.

**Mathematical notation:**
\`f(x) = y\`

**AI notation:**
\`prediction = model(data)\`

Training an AI is just figuring out WHICH buttons to press (parameters) so that when you put in a "cat picture" (input), you get "label: cat" (output).`,
                    requiredToAdvance: true
                },
                {
                    id: 'explore-linear',
                    title: '🎮 The Line of Best Fit',
                    type: 'interactive',
                    content: `**Your Mission:**

1. Adjust **m** (slope) and **b** (intercept) sliders.
2. Try to make the line pass through the dots.
3. This simple function \`y = mx + b\` is the great-grandfather of all AI.

**Notice:**
- **m** controls the ANGLE (how much output changes when input changes)
- **b** controls the STARTING POINT (value when input is 0)

Every neuron in a deep learning model has its own internal \`m\` (weight) and \`b\` (bias)!`,
                    componentId: 'gradient-viz', // Reusing gradient viz for line fitting
                    requiredToAdvance: true
                },
                {
                    id: 'deep-nonlinear',
                    title: '🧠 Why Lines Aren\'t Enough',
                    type: 'text',
                    content: `A straight line is powerful, but simple.

Real life isn't a straight line.
- Happiness vs Money? Not a straight line (diminishing returns).
- Height vs Age? Not a straight line (you stop growing).

If AI only used straight lines (linear functions), it would be incredibly stupid. It couldn't recognize a face or drive a car.

To solve real problems, we need **non-linear functions** — lines that can curve, wiggle, and bend.

We'll learn LATER how neural networks achieve this (spoiler: "activation functions"), but for now, remember: **Data requires transformation.**`,
                    requiredToAdvance: true
                },
                {
                    id: 'quiz-function',
                    title: '🧠 Understanding Check',
                    type: 'quiz',
                    content: `Let's check your intuition on functions.`,
                    quizQuestion: 'If a neural network is just a function f(x), what corresponds to the "settings" or "buttons" of the vending machine?',
                    quizOptions: [
                        'The input data (x)',
                        'The output prediction (y)',
                        'The weights and parameters (w)',
                        'The computer hardware'
                    ],
                    quizCorrectIndex: 2,
                    quizExplanation: 'Correct! The data (x) flows through the machine. The parameters (w) — the weights and biases — are the internal settings that determine HOW the machine transforms that data. Training AI = tuning these settings.',
                    requiredToAdvance: true
                },
                {
                    id: 'bridge',
                    title: '🌉 But HOW Do We Transform Vectors?',
                    type: 'text',
                    content: `We know we need to transform vectors. But how?

We can't just say "abra kadabra." We need specific mathematical operations.

There is ONE operation that is more important than all others combined. It's the engine of attention, the heart of convolution, and the soul of similarity.

It's called the **Dot Product**.`,
                    requiredToAdvance: true
                }
            ]
        },
        // ═══════════════════════════════════════════════════════════
        // CHAPTER 2: THE SIMILARITY DETECTOR
        // ═══════════════════════════════════════════════════════════
        {
            id: 'l2.2.dotproduct',
            title: 'The Similarity Detector',
            description: 'The single most important math operation in AI.',
            xpReward: 200,
            steps: [
                {
                    id: 'hook',
                    title: '🎯 The "Vibe Check" Algorithm',
                    type: 'text',
                    content: `How does Spotify know you'll like a song?
How does Google match your search query to a webpage?
How does ChatGPT know that "king" relates to "queen"?

They all use the same trick: **The Dot Product.**

It's a mathematical "vibe check." It takes two vectors and produces a single number that tells you **how similar they are.**

- **High number** = Very similar vibes
- **Zero** = Totally unrelated
- **Negative number** = Opposite vibes`,
                    requiredToAdvance: true
                },
                {
                    id: 'teach-math',
                    title: '📚 The Math (It\'s Surprisingly Simple)',
                    type: 'text',
                    content: `Here is the dot product formula:

**vector_a · vector_b = (a₁ × b₁) + (a₂ × b₂) + ...**

You multiply the matching pairs, then ADD them all up.

**Example:**
- Your taste: \`[Chocolate: 5, Vanilla: 0, Strawberry: 2]\`
- Ice Cream A: \`[Chocolate: 5, Vanilla: 1, Strawberry: 0]\`

**Dot Product:**
(5×5) + (0×1) + (2×0) = 25 + 0 + 0 = **25 (High score! You'll love it)**

- Ice Cream B (Vanilla): \`[0, 5, 0]\`
Difference: (5×0) + (0×5) + (2×0) = **0 (Zero score. Not your vibe.)**`,
                    requiredToAdvance: true
                },
                {
                    id: 'explore-dot',
                    title: '🎮 The Similarity Visualizer',
                    type: 'interactive',
                    content: `**Your Mission:**

1. You have two vectors (Blue and Red arrows).
2. Drag them around the circle.
3. Watch the **Dot Product** value change.

**Challenges:**
- Make the score **MAXIMUM**. (Hint: Point them in the exact same direction)
- Make the score **ZERO**. (Hint: Make them perpendicular / 90 degrees)
- Make the score **NEGATIVE**. (Hint: Point them apart)`,
                    componentId: 'vector-plotter', // Re-using vector plotter but framing it around dot product
                    requiredToAdvance: true
                },
                {
                    id: 'quiz-dot',
                    title: '🧠 Understanding Check',
                    type: 'quiz',
                    content: `This concept is critical.`,
                    quizQuestion: 'If two vectors have a dot product of ZERO, what does that mean geometrically?',
                    quizOptions: [
                        'They are identical (pointing same way)',
                        'They are strictly opposite',
                        'They are perpendicular (90 degrees apart)',
                        'One of them is zero length'
                    ],
                    quizCorrectIndex: 2,
                    quizExplanation: 'Spot on. When vectors are perpendicular (orthogonal), they share NO common direction, so their dot product is zero. In AI, this means the two concepts are "uncorrelated" or unrelated.',
                    requiredToAdvance: true
                },
                {
                    id: 'code-dot',
                    title: '💻 Code Challenge: Building It',
                    type: 'challenge',
                    content: `**Let's build the "Vibe Check" in Python.**

Write a function that takes two lists (vectors) and returns their dot product.
Remember: Multiply pairs, then sum.`,
                    initialCode: `def dot_product(a, b):
    # a and b are lists of numbers, e.g. [1, 2] and [3, 4]
    # Multiply index 0*0, 1*1, etc.
    # Then sum them all.
    total = 0
    # Your code here
    
    return total`,
                    expectedOutput: '32',
                    hints: ['Loop through the indices of the lists', 'multiply a[i] * b[i]', 'add to total'],
                    componentId: 'dot-product-code',
                    requiredToAdvance: true
                },
                {
                    id: 'bridge',
                    title: '🌉 One Vector is Good. A Billion is Better.',
                    type: 'text',
                    content: `The dot product lets us compare two vectors.

But neural networks don't just process one thing at a time. They process massive flows of information.
- A video is 60 images per second.
- A prompt is hundreds of tokens.

We need a way to do **millions** of dot products simultaneously.

We need a grid of numbers that IS pure parallel power.

We need **Matrices.**`,
                    requiredToAdvance: true
                }
            ]
        },
        // ═══════════════════════════════════════════════════════════
        // CHAPTER 3: THE GRID OF POWER (MATRICES)
        // ═══════════════════════════════════════════════════════════
        {
            id: 'l2.3.matrices',
            title: 'The Grid of Power',
            description: 'Why AI runs on GPUs, not CPUs.',
            xpReward: 250,
            steps: [
                {
                    id: 'hook',
                    title: '🎯 The Parallel Universe',
                    type: 'text',
                    content: `Imagine you're a teacher grading exams.
- You have 30 students (vectors).
- You have to grade 10 questions for each.

If you do it one by one, it takes forever.
But what if you could grade ALL students on Question 1 at the EXACT same time?

**This is what a Matrix does.**

A matrix is just a stack of vectors. It allows us to apply a transformation to a whole BATCH of data in a single instant.`,
                    requiredToAdvance: true
                },
                {
                    id: 'teach-matrix',
                    title: '📚 Matrix Multiplication = Many Dot Products',
                    type: 'text',
                    content: `When we multiply a Matrix × Vector, we aren't doing new math.
We are just doing **a row of Dot Products.**

\`\`\`
Matrix:    Vector:
[ 1  2 ]   [ 4 ]
[ 3  4 ] x [ 5 ]
\`\`\`

**Row 1:** [1, 2] · [4, 5] = (1×4) + (2×5) = **14**
**Row 2:** [3, 4] · [4, 5] = (3×4) + (4×5) = **32**

**Output:** [14, 32]

We transformed input [4, 5] into output [14, 32].

**This is a Neural Network Layer.**
- Input vector = Data
- Matrix = Learned Weights
- Output vector = Next layer's input`,
                    requiredToAdvance: true
                },
                {
                    id: 'explore-matrix',
                    title: '🎮 The Matrix Transformer',
                    type: 'interactive',
                    content: `**Your Mission:**

1. The grid shows a square.
2. The **Matrix** controls how that square morphs.
3. Change the matrix numbers to deform space!

**Try this:**
- Identity: \`[1, 0, 0, 1]\` (Nothing happens)
- Scale: \`[2, 0, 0, 2]\` (Big square!)
- Squish: \`[1, 0, 0, 0.5]\` (Compressed)

**Key Insight:** Neural networks learn these numbers to "squish" and "stretch" data until cat pictures separate from dog pictures.`,
                    componentId: 'matrix-viz',
                    requiredToAdvance: true
                },
                {
                    id: 'real-world-gpu',
                    title: '🌍 Why NVIDIA is Worth Trillions',
                    type: 'text',
                    content: `You might wonder: "Why is NVIDIA the most valuable company in the world?"

It's because of **Matrices.**

CPUs (like Intel) are smart but sequential. They do math one step at a time.
GPUs (Graphics Processing Units) are dumb but massive parallel. They can multiply two giant matrices in a single clock tick.

**AI is just massive matrix multiplication.**
A GPT model is basically a towering pile of matrices being multiplied billions of times.

Because GPUs are the best at this one specific math trick, they power the entire AI revolution.`,
                    requiredToAdvance: true
                },
                {
                    id: 'quiz-matrix',
                    title: '🧠 Understanding Check',
                    type: 'quiz',
                    content: `Let's make sure you get the hardware connection.`,
                    quizQuestion: 'Why do we use GPUs instead of CPUs for Deep Learning?',
                    quizOptions: [
                        'GPUs have faster clock speeds',
                        'GPUs are designed for massive parallel matrix math',
                        'GPUs have more RAM',
                        'CPUs cannot do dot products'
                    ],
                    quizCorrectIndex: 1,
                    quizExplanation: 'Exactly. Deep learning is "embarrassingly parallel" — we need to do millions of identical dot products at once. GPUs have thousands of tiny cores designed for this (originally for pixels!), making them perfect for AI matrices.',
                    requiredToAdvance: true
                },
                {
                    id: 'bridge',
                    title: '🌉 To Dimension 768 and Beyond',
                    type: 'text',
                    content: `We've looked at 2D vectors (arrows on a page) and 2x2 matrices.

But real AI doesn't work in 2D.
It doesn't work in 3D.

GPT-3 works in **12,288 Dimensions.**

What does that even mean? How can space have 12,000 directions?

Let's stretch your brain a little bit.`,
                    requiredToAdvance: true
                }
            ]
        },
        // ═══════════════════════════════════════════════════════════
        // CHAPTER 4: DIMENSIONS AND SPACE
        // ═══════════════════════════════════════════════════════════
        {
            id: 'l2.4.dimensions',
            title: 'Dimensions and Space',
            description: 'Trying to visualize the unvisualizable.',
            xpReward: 300,
            steps: [
                {
                    id: 'hook',
                    title: '🎯 The Flatlander Problem',
                    type: 'text',
                    content: `Imagine a creature that lives on a 2D sheet of paper.
It knows "Left/Right" and "Forward/Back".
It has NO concept of "Up/Down". Even if you told it, it wouldn't actally understand.

**We are all Flatlanders.**
Our brains evolved to hunt in 3D space. We intuitively grasp X, Y, Z.

But AI lives in **High-Dimensional Space.**
- A word vector might have 300 dimensions.
- An image vector might have 1,000 dimensions.

In this hyper-space, math works differently. Distances are weird. "Directions" are infinite.`,
                    requiredToAdvance: true
                },
                {
                    id: 'teach-dimensions',
                    title: '📚 What is a Dimension?',
                    type: 'text',
                    content: `Don't think of sci-fi parallel universes.
In data science, a **Dimension** is just **a feature**.

**Example: Describing a Car**
- Dimension 1: Horsepower (0-1000)
- Dimension 2: Weight (0-5000)
- Dimension 3: Price (0-100k)
- Dimension 4: Top Speed (0-300)

This is a **4-Dimensional Vector**: \`[HP, Weight, Price, Speed]\`.
That's it. It's just a list of 4 attributes.

**High-D Space** just means we describe things with LOTS of attributes.
- Describing a person? Maybe 50 dimensions (Height, Age, Income, Zip Code...)
- Describing a Word? 300 dimensions ("Royal-ness", "Gender", "Plurality", "Verb-ness"...)`,
                    requiredToAdvance: true
                },
                {
                    id: 'interactive-3d',
                    title: '🎮 From 2D to 3D',
                    type: 'interactive',
                    content: `**Your Mission:**

This visualization shows a 3D points cloud.
1. Rotate it. Zoom in.
2. Notice how points can overlap in 2D view, but be far apart in 3D depth?

**This is the key:**
In 2D, "Cats" and "Dogs" might looked mixed up.
But in 3D (or 1000D), there is **room to separate them.**

High dimensions give AI **space to untangle complex data.**`,
                    componentId: 'vector-plotter', // Fallback to vector plotter, effectively "visualizing space"
                    requiredToAdvance: true
                },
                {
                    id: 'layer-complete',
                    title: '🏆 Layer 2 Complete!',
                    type: 'text',
                    content: `**🎉 You've completed Layer 2: The Math of Patterns.**

**Your Toolkit is Growing:**
1. **Representation (L1):** Everything is a vector.
2. **Transformation (L2):** Functions (Matrices) transform vectors.
3. **Similarity (L2):** Dot products check "vibes".

**The Missing Piece:**
We know HOW to transform data (using matrices).
But we haven't answered **WHICH** matrix numbers to use.

How do we find the "magic numbers" that turn a cat photo into the word "cat"?
We can't guess billions of numbers by hand.

We need the machine to find them itself.
We need **Learning.**

**Next Up: Layer 3 - Optimization & Learning.**`,
                    requiredToAdvance: true
                }
            ]
        }
    ]
};
