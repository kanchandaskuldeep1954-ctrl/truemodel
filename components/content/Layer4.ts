import { Module } from '../../types';

export const Layer4: Module = {
    id: 'layer4',
    title: 'Layer 4: The Neural Network — The Universal Function',
    lessons: [
        // ═══════════════════════════════════════════════════════════
        // CHAPTER 1: THE BIOLOGICAL INSPIRATION
        // ═══════════════════════════════════════════════════════════
        {
            id: 'l4.1.biology',
            title: 'The Biological Inspiration',
            description: 'Why do we call it a "Neural" network?',
            xpReward: 150,
            steps: [
                {
                    id: 'hook',
                    title: '🎯 The 86 Billion Processors',
                    type: 'text',
                    content: `Your brain is not one big CPU.
It is a network of **86,000,000,000 tiny processors** called Neurons.

Each neuron is simple. It just:
1. Receives electric signals from neighbors.
2. Adds them up.
3. If the sum is high enough, it **FIRES** its own signal.

The magic isn't in the neuron. It's in the **CONNECTIONS.**

In 1943, we asked: "Can we build a mathematical version of this?"`,
                    requiredToAdvance: true
                },
                {
                    id: 'teach-perceptron',
                    title: '📚 The Artificial Neuron',
                    type: 'text',
                    content: `We built a math model called the **Perceptron.**

It looks scarily similar to what we learned in Layer 3 (Linear Regression):

\`Output = Activation( Weight × Input + Bias )\`

**Difference:**
In Regression, the output is a continuous number (price).
In a Neuron, we squash the output to be "Firing" (1) or "Silent" (0).

**The Parts:**
- **Dendrites (Inputs):** x₁, x₂, x₃
- **Synapses (Weights):** w₁, w₂, w₃
- **Cell Body (Sum):** ∑ (w·x) + b
- **Axon (Output):** The result`,
                    requiredToAdvance: true
                },
                {
                    id: 'explore-neuron',
                    title: '🎮 Build a Neuron',
                    type: 'interactive',
                    content: `**Your Mission:**

1. You have 2 inputs (x₁, x₂).
2. You have 2 weights (w₁, w₂) and a bias (b).
3. **Try to make the neuron FIRE (Output > 0.5)** only when BOTH inputs are high.

**This is a Logic Gate!**
You are literally building an AND gate using "biological" math.`,
                    componentId: 'activation-viz', // Reusing activation viz for single neuron mechanics
                    requiredToAdvance: true
                },
                {
                    id: 'bridge',
                    title: '🌉 But Wait... It\'s Just a Line?',
                    type: 'text',
                    content: `If you look closely at the math:
\`w₁x₁ + w₂x₂ + b = 0\`

This is just the equation for a **straight line.**

A single neuron can only draw straight lines.
It can separate "Big" from "Small".
It can separate "Up" from "Down".

But what if the data is curved? What if the problem is messy?
We need something that can bend.`,
                    requiredToAdvance: true
                }
            ]
        },
        // ═══════════════════════════════════════════════════════════
        // CHAPTER 2: THE CURVE (ACTIVATION FUNCTIONS)
        // ═══════════════════════════════════════════════════════════
        {
            id: 'l4.2.activation',
            title: 'The Curve',
            description: 'How to bend reality.',
            xpReward: 200,
            steps: [
                {
                    id: 'hook',
                    title: '🎯 The Linear Trap',
                    type: 'text',
                    content: `Here is a mathematical tragedy:
**Linear + Linear = Linear.**

If you stack 1000 layers of linear neurons (just summing/multiplying), the whole thing collapses into **one single linear layer.**

It's useless. It can't learn curves. It can't learn faces.

To fix this, we need a **Non-Linearity.**
We need a function that is NOT a straight line.

We call this the **Activation Function.**`,
                    requiredToAdvance: true
                },
                {
                    id: 'teach-relu',
                    title: '📚 Making It Bend',
                    type: 'text',
                    content: `We insert a non-linear function after every weighted sum.
This "bends" the space.

**Common Activations:**

1. **ReLU (Rectified Linear Unit):**
   - \`f(x) = max(0, x)\`
   - "If negative, be zero. If positive, stay same."
   - **Super simple, but it powers 99% of modern AI.**

2. **Sigmoid:**
   - Squashes everything between 0 and 1.
   - Great for probabilities, but slow to train.

3. **Step:**
   - 0 or 1. Hard ON/OFF.
   - Too rigid for learning (gradient is zero!).`,
                    requiredToAdvance: true
                },
                {
                    id: 'explore-activation',
                    title: '🎮 Bending the Line',
                    type: 'interactive',
                    content: `**Your Mission:**

1. Switch between **Linear**, **Sigmoid**, and **ReLU**.
2. See how the output curve changes.
3. Compare the **Linear** line (straight) vs **ReLU** (bent).

**Key Insight:**
By combining thousands of little "ReLU bends," we can approximate ANY shape in the universe. A curve is just a lot of tiny straight lines connected together!`,
                    componentId: 'activation-viz',
                    requiredToAdvance: true
                },
                {
                    id: 'quiz-relu',
                    title: '🧠 Understanding Check',
                    type: 'quiz',
                    content: `Let's verify.`,
                    quizQuestion: 'Why is a linear neural network (without activation functions) useless for deep learning?',
                    quizOptions: [
                        'Because it is too slow',
                        'Because it collapses into a single linear function and cannot learn curves',
                        'Because computers can\'t do linear math',
                        'Because it requires too much memory'
                    ],
                    quizCorrectIndex: 1,
                    quizExplanation: 'Spot on. Linear operations stack linearly. Two lines added together is just another line. We need non-linearity (like ReLU) to create complex shapes.',
                    requiredToAdvance: true
                },
                {
                    id: 'bridge',
                    title: '🌉 The XOR Problem',
                    type: 'text',
                    content: `So we have neurons. We have non-linearity.

But can we actually solve a problem that a single linear model CANNOT solve?

In 1969, Marvin Minsky wrote a book proving that single neurons couldn't solve a simple problem called **XOR**.
That book froze AI research for 10 years ("The AI Winter").

Let's solve the problem that broke AI.`,
                    requiredToAdvance: true
                }
            ]
        },
        // ═══════════════════════════════════════════════════════════
        // CHAPTER 3: THE IMPOSSIBLE LINE (XOR)
        // ═══════════════════════════════════════════════════════════
        {
            id: 'l4.3.xor',
            title: 'The Impossible Line',
            description: 'The problem that almost killed AI.',
            xpReward: 250,
            steps: [
                {
                    id: 'hook',
                    title: '🎯 Connect the Dots?',
                    type: 'text',
                    content: `Here is the XOR Dataset:
- **(0,0) → 0** (Blue)
- **(1,1) → 0** (Blue)
- **(0,1) → 1** (Red)
- **(1,0) → 1** (Red)

Imagine these points on a 2D grid.
The Blue points are at the bottom-left and top-right.
The Red points are at top-left and bottom-right.

**Challenge:** Draw ONE straight line that separates Red from Blue.

(Spoiler: You can't. Try it in your head.)`,
                    requiredToAdvance: true
                },
                {
                    id: 'explore-xor',
                    title: '🎮 Prove It Yourself',
                    type: 'interactive',
                    content: `**Your Mission:**

1. You have a single neuron (one line).
2. Try to rotate/move it to separate Red from Blue.
3. Observe: You can get 3 right, but never all 4.

This is called being **"Linearly Inseparable."**`,
                    componentId: 'xor-viz',
                    requiredToAdvance: true
                },
                {
                    id: 'teach-hidden',
                    title: '📚 The Hidden Layer Solution',
                    type: 'text',
                    content: `We can't solve it with ONE line.
But what if we use TWO lines?

**The Solution:**
1. Neuron A draws a line for "top-left".
2. Neuron B draws a line for "bottom-right".
3. A third neuron combines them: "If A OR B is active, say Red."

This intermediate layer of neurons is called a **Hidden Layer.**

This insight revived AI. Hidden layers allow us to decompose a hard problem into simpler sub-problems.`,
                    requiredToAdvance: true
                },
                {
                    id: 'explore-deep',
                    title: '🎮 Solving XOR',
                    type: 'interactive',
                    content: `**Your Mission:**

1. Click "**Add Hidden Layer**"
2. Now the network has room to "bend" space.
3. Watch it solve the XOR problem perfectly!

**What just happened?**
The hidden layer mapped the 2D input into a higher-dimensional space where the points *could* be separated.`,
                    componentId: 'xor-viz', // Need to make sure xor-viz supports toggling layers, or update narrative
                    requiredToAdvance: true
                },
                {
                    id: 'quiz-hidden',
                    title: '🧠 Understanding Check',
                    type: 'quiz',
                    content: `This is the definition of Deep Learning.`,
                    quizQuestion: 'What is the primary purpose of a "Hidden Layer"?',
                    quizOptions: [
                        'To hide data from the user',
                        'To transform the input into a new representation that makes the problem solvable',
                        'To output the final prediction',
                        'To increase the learning rate'
                    ],
                    quizCorrectIndex: 1,
                    quizExplanation: 'Correct. Hidden layers feature-engineer the data. They transform "pixels" into "edges", then "shapes", then "faces". They warp the space to make classification possible.',
                    requiredToAdvance: true
                },
                {
                    id: 'bridge',
                    title: '🌉 From 1 Neuron to 1 Trillion',
                    type: 'text',
                    content: `We've constructed a single neuron.
We've connected a few to solve XOR.

But ChatGPT isn't 3 neurons. It's hundreds of billions.

What happens when we scale this up?
What happens when we stack layer after layer after layer?

We enter the realm of **Deep Learning.**`,
                    requiredToAdvance: true
                }
            ]
        },
        // ═══════════════════════════════════════════════════════════
        // CHAPTER 4: THE UNIVERSAL APPROXIMATOR
        // ═══════════════════════════════════════════════════════════
        {
            id: 'l4.4.universal',
            title: 'The Universal Machine',
            description: 'Prove that neural nets can do anything.',
            xpReward: 300,
            steps: [
                {
                    id: 'hook',
                    title: '🎯 The Universal Approximation Theorem',
                    type: 'text',
                    content: `Here is a wild mathematical fact:

A neural network with just ONE hidden layer (if it's wide enough) can approximate **ANY** continuous function.

- It can approximate the physics of a bouncing ball.
- It can approximate the stock market.
- It can approximate the function mapping "English" to "French".

**Neural Networks are Universal Function Approximators.**
We just need to find the right weights.`,
                    requiredToAdvance: true
                },
                {
                    id: 'code-neuron',
                    title: '💻 Code Challenge: The Neuron',
                    type: 'challenge',
                    content: `**Final Test:** Implement a single neuron in Python.

\`output = max(0, (w * x) + b)\` for a ReLU neuron.`,
                    initialCode: `def neuron_forward(input_x, weight, bias):
    # 1. Calculate weighted sum (z)
    z = (input_x * weight) + bias
    
    # 2. Apply ReLU activation (max of 0 or z)
    output = 0 # Fix this!
    
    return output`,
                    expectedOutput: '5.0', // Test case: x=2, w=2, b=1 -> 5. x=-2, w=2, b=1 -> -3 -> 0
                    hints: [
                        "Use the max() function",
                        "max(0, z) implements ReLU",
                        "If z is negative, return 0"
                    ],
                    componentId: 'neuron-code-challenge',
                    requiredToAdvance: true
                },
                {
                    id: 'layer-complete',
                    title: '🏆 Layer 4 Complete!',
                    type: 'text',
                    content: `**🎉 You've completed Layer 4: The Neural Network.**

**Your Journey:**
1. **Biological Inspiration:** Neurons sum inputs and fire.
2. **Artificial Neuron:** The Perceptron model.
3. **Activation Functions:** The curve (ReLU) that allows learning.
4. **Hidden Layers:** The solution to impossible problems (XOR).

**The Big Picture:**
We now have the lego blocks of intelligence.
- **Vectors** (Data)
- **Matrices** (Connections)
- **Gradients** (Learning)
- **Neurons** (Computing)

**Next Up: Layer 5 - Deep Learning.**
We will construct a full multi-layer network and watch it learn in real-time.`,
                    requiredToAdvance: true
                }
            ]
        }
    ]
};
