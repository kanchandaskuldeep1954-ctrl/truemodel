import { Module } from '../../types';

export const Layer8: Module = {
    id: 'layer8',
    title: 'Layer 8: The Dimension of Time',
    lessons: [
        // ═══════════════════════════════════════════════════════════
        // CHAPTER 1: THE SEQUENCE (TIME)
        // ═══════════════════════════════════════════════════════════
        {
            id: 'l8.1.time',
            title: 'The Sequence',
            description: 'Why static networks fail at reality.',
            xpReward: 150,
            steps: [
                {
                    id: 'hook',
                    title: '🎯 The "Cat" Problem',
                    type: 'text',
                    content: `Feedforward networks (Layer 5) and CNNs (Layer 7) have a fatal flaw:
**They have no memory.**
They treat every input as the first thing they've ever seen.

But language depends on **Context.**
- "I eat **Apples**." (Apple is a fruit).
- "Apple **Computers**." (Apple is a company).

The word "Apple" is identical. The **meaning** depends on the word before it.
We need a network that remembers the past.`,
                    requiredToAdvance: true
                },
                {
                    id: 'teach-sequence',
                    title: '📚 Time Series Data',
                    type: 'text',
                    content: `We are entering the **4th Dimension: Time.**

Examples of Sequential Data:
1. **Audio:** A waveform where split-second changes matter.
2. **Text:** Sentences where order determines meaning.
3. **Stock Prices:** Today's price depends on yesterday's momentum.
4. **Video:** A sequence of images.

**Key Concept:**
To understand "Now", you must remember "Then".`,
                    requiredToAdvance: true
                },
                {
                    id: 'explore-rnn',
                    title: '🎮 The Memory Loop',
                    type: 'interactive',
                    content: `**Your Mission:**

1. Type a sentence word by word.
2. Watch the **Hidden State** (The glowing circle).
3. **Notice:**
   - When you type "The", the state changes.
   - When you type "Cat", the state mixes "The" + "Cat".
   - The network is carrying a "thought" forward in time.`,
                    componentId: 'rnn-viz', // Reusing rnn-viz for basic sequence concept
                    requiredToAdvance: true
                },
                {
                    id: 'bridge',
                    title: '🌉 How Do We Build Memory?',
                    type: 'text',
                    content: `We need a new architecture.
We need a neuron that connects to **ITSELF.**

This is the **Recurrent Neural Network (RNN).**
It's a loop. It takes its own output from yesterday and feeds it back as input today.`,
                    requiredToAdvance: true
                }
            ]
        },
        // ═══════════════════════════════════════════════════════════
        // CHAPTER 2: THE LOOP (RNN)
        // ═══════════════════════════════════════════════════════════
        {
            id: 'l8.2.rnn',
            title: 'The Loop',
            description: 'A neuron that remembers.',
            xpReward: 200,
            steps: [
                {
                    id: 'hook',
                    title: '🎯 The Feedback Loop',
                    type: 'text',
                    content: `Imagine reading a book.
You don't throw away your memory after every word.
You keep a running "summary" in your head.

**The RNN Equation:**
\`Current_Thought = Activation( New_Input + Old_Thought )\`

It mixes the **New Information** with the **Old Context**.`,
                    requiredToAdvance: true
                },
                {
                    id: 'teach-rnn-math',
                    title: '📚 Unrolling the Loop',
                    type: 'text',
                    content: `It helps to think of an RNN as multiple copies of the same network, chained together.

**Time Step 1:**
Input: "The" → Hidden State: [Vector representing "Determiner"]

**Time Step 2:**
Input: "Cat" + Hidden State ("Determiner") → Hidden State: [Vector representing "Subject"]

**Time Step 3:**
Input: "Sat" + Hidden State ("Subject") → Hidden State: [Vector representing "Action"]

**Crucial Point:**
We use the **SAME WEIGHTS** at every time step.
Just like CNNs share weights across Space (Pixels), RNNs share weights across Time.`,
                    requiredToAdvance: true
                },
                {
                    id: 'explore-unroll',
                    title: '🎮 Unrolling Time',
                    type: 'interactive',
                    content: `**Your Mission:**

1. Click **"Unroll"**.
2. See how the loop spreads out into a long chain.
3. Feed in a sequence: "X", "Y", "Z".
4. Watch the signal propagate down the chain.

This looks like a really deep feedforward network!`,
                    componentId: 'rnn-viz',
                    requiredToAdvance: true
                },
                {
                    id: 'quiz-rnn',
                    title: '🧠 Understanding Check',
                    type: 'quiz',
                    content: `Let's verify.`,
                    quizQuestion: 'In an RNN, what is the "Hidden State"?',
                    quizOptions: [
                        'A place to hide secret data',
                        'The network\'s "memory" or "summary" of all previous inputs in the sequence',
                        'The final output prediction',
                        'The error signal'
                    ],
                    quizCorrectIndex: 1,
                    quizExplanation: 'Correct. The hidden state is the vector that gets passed from t-1 to t. It represents the context so far.',
                    requiredToAdvance: true
                },
                {
                    id: 'bridge',
                    title: '🌉 The Curse of Amnesia',
                    type: 'text',
                    content: `RNNs work great for short sentences.
"The cat sat on the mat." (Easy).

But what about a book?
"Alice fell down the hole... [200 pages later] ... She woke up."

Can the RNN remember "Alice" from 200 pages ago?
**No.**
The signal fades. The gradients vanish.
This is the **Vanishing Gradient Problem (Time Edition).**`,
                    requiredToAdvance: true
                }
            ]
        },
        // ═══════════════════════════════════════════════════════════
        // CHAPTER 3: THE FORGETTING (VANISHING GRADIENT)
        // ═══════════════════════════════════════════════════════════
        {
            id: 'l8.3.vanishing',
            title: 'The Amnesia',
            description: 'Why RNNs fail at long stories.',
            xpReward: 250,
            steps: [
                {
                    id: 'hook',
                    title: '🎯 Multiplying by < 1',
                    type: 'text',
                    content: `Remember Layer 6?
If you multiply small numbers together, they vanish to zero.

In an RNN, to learn a connection from Step 100 back to Step 1, you multiply the gradient 100 times.

**0.5¹⁰⁰ = 0.000000000000000000000000000001**

The network literally **cannot physically learn** long-term dependencies.
It forgets the start of the sentence before it reaches the end.`,
                    requiredToAdvance: true
                },
                {
                    id: 'explore-vanish-time',
                    title: '🎮 Visualizing Amnesia',
                    type: 'interactive',
                    content: `**Your Mission:**

1. Feed a long sequence (20 words).
2. Watch the **Gradient Signal** (Red) try to travel back from the end to the start.
3. **Observe:** It fizzles out after ~10 steps.
4. The network has "Goldfish Memory".`,
                    componentId: 'rnn-viz', // Use gradient mode if available, or narrative explanation
                    requiredToAdvance: true
                },
                {
                    id: 'teach-fix',
                    title: '📚 We Need a Hard Drive',
                    type: 'text',
                    content: `Standard RNNs rewrite their ENTIRE memory every step.
It's like having to rewrite your entire diary every day from scratch.
Eventually, you lose details.

We need a way to:
1. **Write** new info.
2. **Read** old info.
3. **Keep** info unchanged for a long time.

We need a digital circuit. We need the **LSTM.**`,
                    requiredToAdvance: true
                },
                {
                    id: 'bridge',
                    title: '🌉 The Long Short-Term Memory',
                    type: 'text',
                    content: `LSTM stands for **Long Short-Term Memory.**

It was invented in 1997.
It solved the sequence problem so well that it powered Google Translate, Siri, and Alexa for a decade (until Transformers arrived).

Let's look inside this complex machine.`,
                    requiredToAdvance: true
                }
            ]
        },
        // ═══════════════════════════════════════════════════════════
        // CHAPTER 4: THE GATE (LSTM)
        // ═══════════════════════════════════════════════════════════
        {
            id: 'l8.4.lstm',
            title: 'The Gate',
            description: 'Engineering a better memory.',
            xpReward: 300,
            steps: [
                {
                    id: 'hook',
                    title: '🎯 The Conveyor Belt',
                    type: 'text',
                    content: `The Secret of LSTM is the **Cell State.**

Think of it like a **Conveyor Belt** that runs straight through the entire chain.
Information can flow along it unchanged for 1000 steps.

But we have **Gates** that can modify the belt:
1. **Forget Gate:** Remove old info.
2. **Input Gate:** Add new info.
3. **Output Gate:** Read info.`,
                    requiredToAdvance: true
                },
                {
                    id: 'teach-gates',
                    title: '📚 The Three Gates',
                    type: 'text',
                    content: `**1. The Forget Gate:**
"Alice looked at the clock." -> "She went home."
When we see "She", we can FORGET "Alice" (gender focus change) or keep "Alice" (subject)?
The network **learns** what to forget.

**2. The Input Gate:**
"It was raining."
ADD "raining" to the context.

**3. The Output Gate:**
Predict the next word based on the current context.`,
                    requiredToAdvance: true
                },
                {
                    id: 'explore-lstm',
                    title: '🎮 Controlling the Flow',
                    type: 'interactive',
                    content: `**Your Mission:**

1. Adjust the **Forget Gate** (Open/Close).
   - If Closed (0), memory is wiped.
   - If Open (1), memory is kept perfect.
2. Adjust the **Input Gate**.
3. Watch the **Cell State** preserve the signal over long distances.

**This engineering marvel solved the Vanishing Gradient problem.**`,
                    componentId: 'lstm-viz',
                    requiredToAdvance: true
                },
                {
                    id: 'layer-complete',
                    title: '🏆 Layer 8 Complete!',
                    type: 'text',
                    content: `**🎉 You've completed Layer 8: Sequences.**

**Your Journey:**
1. **Sequences:** Time adds a 4th dimension. Context matters.
2. **RNNs:** Loops that carry memory forward.
3. **Amnesia:** Gradients vanish over time.
4. **LSTMs:** Gated cells that can protect memories for the long haul.

**The End of an Era:**
LSTMs were King... until 2017.
They had one weakness: **They are slow.** You have to process Step 1 before Step 2. You can't parallelize key.

**Next Up: Layer 9 - Attention.**
"Attention Is All You Need." The paper that changed everything.`,
                    requiredToAdvance: true
                }
            ]
        }
    ]
};
