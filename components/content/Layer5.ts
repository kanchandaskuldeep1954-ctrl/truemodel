import { Module } from '../../types';

export const Layer5: Module = {
    id: 'layer5',
    title: 'Layer 5: Deep Learning — The Blame Game',
    lessons: [
        // ═══════════════════════════════════════════════════════════
        // CHAPTER 1: THE NETWORK (ARCHITECTURE)
        // ═══════════════════════════════════════════════════════════
        {
            id: 'l5.1.network',
            title: 'The Network',
            description: 'Building the brain.',
            xpReward: 150,
            steps: [
                {
                    id: 'hook',
                    title: '🎯 The Power of Connection',
                    type: 'text',
                    content: `A single ant is stupid. A colony is brilliant.
A single neuron is a simple calculator. A network of them is ChatGPT.

**Deep Learning** is simply the study of what happens when you connect THOUSANDS of neurons together.

WE DON'T write the code for how to identify a cat.
We just build the network structure, and let the network **figure it out.**`,
                    requiredToAdvance: true
                },
                {
                    id: 'teach-arch',
                    title: '📚 The Architecture',
                    type: 'text',
                    content: `A standard neural network has 3 parts:

1. **Input Layer:** Receives raw data (pixels of an image).
2. **Hidden Layers:** The "magic" middle. They digest the data.
   - Shallow Network: 1 hidden layer.
   - **Deep Network:** Many hidden layers (Deep Learning).
3. **Output Layer:** The final answer (is it a Cat or Dog?).

**Why "Hidden"?**
Because we (inputs) don't see them, and the world (outputs) doesn't see them. They are the private internal thoughts of the machine.`,
                    requiredToAdvance: true
                },
                {
                    id: 'explore-arch',
                    title: '🎮 Build a Deep Network',
                    type: 'interactive',
                    content: `**Your Mission:**

1. Add **Hidden Layers** (make it deeper).
2. Add **Neurons** (make it wider).
3. Watch how the web of connections grows.

**Notice:**
Every neuron in Layer 1 connects to EVERY neuron in Layer 2.
This is called a **Dense** or **Fully Connected** network.`,
                    componentId: 'deep-net-lesson', // Specific lesson for architecture viz
                    requiredToAdvance: true
                },
                {
                    id: 'bridge',
                    title: '🌉 How Does It Think?',
                    type: 'text',
                    content: `We built the structure. Now, how does it think?

Information flows in one direction:
**Input → Hidden → Output**

This is called the **Forward Pass.**
It's like a rumor spreading through a crowd, changing slightly at each person.`,
                    requiredToAdvance: true
                }
            ]
        },
        // ═══════════════════════════════════════════════════════════
        // CHAPTER 2: THE FLOW (FORWARD PASS)
        // ═══════════════════════════════════════════════════════════
        {
            id: 'l5.2.forward',
            title: 'The Flow',
            description: 'How a thought acts.',
            xpReward: 200,
            steps: [
                {
                    id: 'hook',
                    title: '🎯 Ripple Effect',
                    type: 'text',
                    content: `Imagine dropping a pebble in a pond.
The ripples move outward, affecting everything in their path.

In a neural network, the "pebble" is the Input Data.
The "ripples" are the activations firing through the layers.

If even ONE weight changes in the first layer, it can completely change the final result.`,
                    requiredToAdvance: true
                },
                {
                    id: 'teach-forward',
                    title: '📚 The Math of Thinking',
                    type: 'text',
                    content: `The Forward Pass is simple but repetitive:

**Layer 1:**
\`h1 = ReLU( w1*input + b1 )\`

**Layer 2:**
\`h2 = ReLU( w2*h1 + b2 )\`

**Output:**
\`y = Sigmoid( w3*h2 + b3 )\`

It's just **Matrix Multiplication → Activation → Repeat.**

This chain reaction transforms "Raw Pixels" into "Probability of Cat".`,
                    requiredToAdvance: true
                },
                {
                    id: 'explore-forward',
                    title: '🎮 Trace the Signal',
                    type: 'interactive',
                    content: `**Your Mission:**

1. Click **"Feed Forward"**.
2. Watch the signal (glowing lines) travel from left to right.
3. Hover over a neuron to see its **Activation Value**.
   - **Bright Green:** High activation (Firing!)
   - **Dark:** Zero activation (Dead/ReLU'd).
4. See how the pattern changes layer by layer.`,
                    componentId: 'deep-net-lesson', // Reusing deep net lesson but focusing on signal flow
                    requiredToAdvance: true
                },
                {
                    id: 'bridge',
                    title: '🌉 The Problem',
                    type: 'text',
                    content: `Great. Our network can "think" (Forward Pass).

But initially, its thoughts are garbage.
We feed in a Cat image, and it says "Dog: 99%".

It made a mistake.
Now... **Who is to blame?**

Which of the 1,000,000 weights caused the error?
This allows us to introduce the most important algorithm in history.`,
                    requiredToAdvance: true
                }
            ]
        },
        // ═══════════════════════════════════════════════════════════
        // CHAPTER 3: THE BLAME (BACKPROPAGATION)
        // ═══════════════════════════════════════════════════════════
        {
            id: 'l5.3.backprop',
            title: 'The Blame Game',
            description: 'The hardest concept in AI, explained simply.',
            xpReward: 300,
            steps: [
                {
                    id: 'hook',
                    title: '🎯 "Who Did This?"',
                    type: 'text',
                    content: `Imagine a factory line makes a defective car.
The boss comes down and screams: **"Who screwed up?"**

- The Output guy says: "Not me, I just assembled what Layer 2 gave me!"
- Layer 2 says: "I just processed what Layer 1 gave me!"
- Layer 1 says: "I just took the Raw Steel!"

**Backpropagation** is the process of walking BACKWARDS from the error to assign blame.`,
                    requiredToAdvance: true
                },
                {
                    id: 'teach-backprop',
                    title: '📚 Backpropagation',
                    type: 'text',
                    content: `**1. Calculate Loss:**
"You said Dog. It was Cat. Error = HUGE."

**2. Output Layer Blame:**
"Neuron A, you fired too hard. Decrease your weights."

**3. Hidden Layer Blame:**
"Neuron B, you told Neuron A to fire. You are also to blame. Decrease YOUR weights."

**4. Repeat:**
The blame (Gradient) flows BACKWARDS all the way to the start.

Technical term: **Chain Rule of Calculus.**`,
                    requiredToAdvance: true
                },
                {
                    id: 'explore-backprop',
                    title: '🎮 Visualizing The Blame',
                    type: 'interactive',
                    content: `**Your Mission:**

1. Run a Forward Pass. (Error is calculated).
2. Click **"Backpropagate"**.
3. Watch the **Red Pulse** travel backwards (Right to Left).
4. **Notice:**
   - The red pulse is the **Gradient** (Blame).
   - Weights with high blame get changed MORE.
   - Weights with zero blame are left alone.`,
                    componentId: 'backprop-viz',
                    requiredToAdvance: true
                },
                {
                    id: 'quiz-backprop',
                    title: '🧠 Understanding Check',
                    type: 'quiz',
                    content: `This determines if you understand Deep Learning.`,
                    quizQuestion: 'In Backpropagation, which direction does the data flow vs. the error signal?',
                    quizOptions: [
                        'Both flow forward (Input → Output)',
                        'Both flow backward (Output → Input)',
                        'Data flows Forward. Error flows Backward.',
                        'Data flows Backward. Error flows Forward.'
                    ],
                    quizCorrectIndex: 2,
                    quizExplanation: 'Correct! We "Think Forward" (Data), but we "Learn Backward" (Error).',
                    requiredToAdvance: true
                },
                {
                    id: 'bridge',
                    title: '🌉 The Cycle of Life',
                    type: 'text',
                    content: `We have the Forward Pass (Guessing).
We have the Backward Pass (Learning).

Now we just do this... **forever.**

This cycle is called the **Training Loop.**`,
                    requiredToAdvance: true
                }
            ]
        },
        // ═══════════════════════════════════════════════════════════
        // CHAPTER 4: THE LOOP (TRAINING)
        // ═══════════════════════════════════════════════════════════
        {
            id: 'l5.4.training',
            title: 'The Training Loop',
            description: 'From idiot to genius in 100 epochs.',
            xpReward: 300,
            steps: [
                {
                    id: 'hook',
                    title: '🎯 One Million Times',
                    type: 'text',
                    content: `A human child needs to see a cat a few times to learn "cat".
A neural network needs to see it **thousands** of times.

It improves incrementally.
- Epoch 1: Accuracy 10% (Random guessing)
- Epoch 10: Accuracy 40%
- Epoch 100: Accuracy 99%

This repetitive grind is what burns all that electricity in data centers.`,
                    requiredToAdvance: true
                },
                {
                    id: 'teach-loop',
                    title: '📚 The Algorithm',
                    type: 'text',
                    content: `\`\`\`python
for epoch in range(1000):
    # 1. Forward Pass (Predict)
    prediction = model(input)
    
    # 2. Calculate Loss (Measure Error)
    loss = MSE(prediction, target)
    
    # 3. Backward Pass (Find Gradients)
    gradients = backprop(loss)
    
    # 4. Optimizer Step (Update Weights)
    weights = weights - lr * gradients
\`\`\`

**Memorize these 4 steps.** They are the heartbeat of AI.`,
                    requiredToAdvance: true
                },
                {
                    id: 'explore-loop',
                    title: '🎮 Watch It Learn',
                    type: 'interactive',
                    content: `**Your Mission:**

1. Click **"Start Training"**.
2. Watch the **Epoch Counter** go up.
3. Watch the **Loss Graph** go DOWN.
4. Watch the **Accuracy** go UP.
5. See the decision boundary slowly morph until it perfectly separates the data.

**You are witnessing Intelligence being created from Math.**`,
                    componentId: 'training-loop',
                    requiredToAdvance: true
                },
                {
                    id: 'code-challenge-loop',
                    title: '💻 Code Challenge: The Loop',
                    type: 'interactive', // Changed to interactive/code hybrid
                    content: `**Write the Training steps.**

Order the steps correctly to make the AI learn.`,
                    componentId: 'deep-net-code-challenge', // Generic code challenge ID
                    initialCode: `def train_step(model, input, target):
    # 1. ?
    # 2. ?
    # 3. ?
    # 4. ?
    pass`,
                    hints: ["Forward -> Loss -> Backward -> Update"],
                    requiredToAdvance: true
                },
                {
                    id: 'layer-complete',
                    title: '🏆 Layer 5 Complete!',
                    type: 'text',
                    content: `**🎉 You've completed Layer 5: Deep Learning.**

**Your Journey:**
1. **Network:** Connecting layers of neurons.
2. **Forward:** Signals ripple forward using matrices & activation.
3. **Backprop:** Error ripples backward to assign blame.
4. **Training:** Repeating this loop until the loss is zero.

**You now know how the "Core Engine" works.**

**Next Up: Layer 6 - Training Dynamics.**
We know the steps... but why is training actually so hard? (Overfitting, Vanishing Gradients, Learning Rates).`,
                    requiredToAdvance: true
                }
            ]
        }
    ]
};
