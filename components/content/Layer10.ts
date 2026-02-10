import { Module } from '../../types';

export const Layer10: Module = {
    id: 'layer10',
    title: 'Layer 10: The Transformer Age',
    lessons: [
        // ═══════════════════════════════════════════════════════════
        // CHAPTER 1: THE BEAST (ARCHITECTURE)
        // ═══════════════════════════════════════════════════════════
        {
            id: 'l10.1.transformer',
            title: 'The Beast',
            description: 'Dissecting the most powerful machine ever built.',
            xpReward: 150,
            steps: [
                {
                    id: 'hook',
                    title: '🎯 "Attention Is All You Need"',
                    type: 'text',
                    content: `In 2017, Google researchers published a paper with a provocative title.

They claimed you could throw away the RNNs.
You don't need Loops. You don't need Convolutions.
You just need **Attention**, stacked on top of itself.

They called this architecture the **Transformer.**
It is the engine behind ChatGPT, Gemini, Claude, and almost every modern AI.`,
                    requiredToAdvance: true
                },
                {
                    id: 'teach-arch',
                    title: '📚 The Transformer Block',
                    type: 'text',
                    content: `A Transformer isn't one big thing. It's a stack of repeated **Blocks**.
GPT-4 has roughly 96 of these blocks stacked high.

**Inside each Block:**
1.  **Multi-Head Attention:** "Look at everyone else to gather context."
2.  **Add & Norm:** "Add the new info to the old info & stabilize."
3.  **Feed Forward (MLP):** "Process this information individually."
4.  **Add & Norm:** "Stabilize again."

**Repeat 96 times.**
That's it. That's the secret sauce.`,
                    requiredToAdvance: true
                },
                {
                    id: 'explore-arch',
                    title: '🎮 Build a Transformer',
                    type: 'interactive',
                    content: `**Your Mission:**

1. **Encoder (The Reader):** Used for understanding (BERT). It looks at the whole sentence at once.
2. **Decoder (The Writer):** Used for generation (GPT). It can only see the PAST (Masked Attention).
3. **Toggle:** Switch between "Encoder-Only" and "Decoder-Only".

**Key Insight:** ChatGPT is a **Decoder-Only** Transformer. It writes one word at a time, never looking forward.`,
                    componentId: 'transformer-arch-viz',
                    requiredToAdvance: true
                },
                {
                    id: 'bridge',
                    title: '🌉 How Does It Read?',
                    type: 'text',
                    content: `We have the brain (Transformer).
Now we need to feed it text.

But computers can't read "Apple".
They only understand numbers.

We need to chop text into atoms. We need **Tokens.**`,
                    requiredToAdvance: true
                }
            ]
        },
        // ═══════════════════════════════════════════════════════════
        // CHAPTER 2: THE ATOM (TOKENIZATION)
        // ═══════════════════════════════════════════════════════════
        {
            id: 'l10.2.tokenization',
            title: 'The Atom',
            description: 'Words, subwords, and numbers.',
            xpReward: 200,
            steps: [
                {
                    id: 'hook',
                    title: '🎯 "Ingenious" = 29381',
                    type: 'text',
                    content: `User: "Hello AI"
Computer sees: \`[15496, 9552]\`

Before text enters the model, it is chopped into **Tokens.**
- Common words are 1 token ("Apple").
- Rare words are split ("Un-friend-ly").
- GPT-4 has a vocabulary of ~100,000 unique tokens.`,
                    requiredToAdvance: true
                },
                {
                    id: 'teach-embedding',
                    title: '📚 Vectors (Again)',
                    type: 'text',
                    content: `Once we have the ID (e.g., 29381), we turn it into a **Vector.**
(Remember Layer 2?)

In GPT-3, every token is a vector of **12,288 numbers.**
That implies specifically that the "concept" of that word has 12,288 dimensions of meaning.

The Transformer takes these vectors, mixes them with Attention, and outputs... a new vector.`,
                    requiredToAdvance: true
                },
                {
                    id: 'explore-tokens',
                    title: '🎮 Token Visualizer',
                    type: 'interactive', // Could reuse a simple text input -> token ID viz if available, otherwise concept explanation
                    content: `**Your Mission:**

1. Type a sentence: "The quick brown fox."
2. See it turn into IDs: \`[464, 2068, 7586, 21831]\`.
3. Try a made up word: "Wombatify".
4. See it split: \`["Womb", "at", "ify"]\`.

**Insight:** The AI can read ANY text, even words it has never seen, by breaking them down into familiar sub-parts.`,
                    componentId: 'token-prediction-viz', // Reusing token prediction to show input/output
                    requiredToAdvance: true
                },
                {
                    id: 'quiz-tokens',
                    title: '🧠 Understanding Check',
                    type: 'quiz',
                    content: `Let's verify.`,
                    quizQuestion: 'Why do we split rare words into sub-word tokens?',
                    quizOptions: [
                        'To save memory',
                        'To allow the model to understand words it has never seen before by analyzing their root parts',
                        'Because English is hard',
                        'To make the vectors smaller'
                    ],
                    quizCorrectIndex: 1,
                    quizExplanation: 'Correct! "Un-stoppable" can be understood even if the AI never saw "Unstoppable", because it knows "Un" and "Stop".',
                    requiredToAdvance: true
                },
                {
                    id: 'bridge',
                    title: '🌉 The Objective',
                    type: 'text',
                    content: `We have the Architecture.
We have the Input (Tokens).

Now, how do we train this monster?
Do we teach it grammar rules?
Do we give it a dictionary?

No. We give it **One Simple Job.**`,
                    requiredToAdvance: true
                }
            ]
        },
        // ═══════════════════════════════════════════════════════════
        // CHAPTER 3: THE PREDICTION (GENERATION)
        // ═══════════════════════════════════════════════════════════
        {
            id: 'l10.3.gpt',
            title: 'The Prediction',
            description: 'Guessing the future, one word at a time.',
            xpReward: 250,
            steps: [
                {
                    id: 'hook',
                    title: '🎯 Next Token Prediction',
                    type: 'text',
                    content: `**Generative Pre-trained Transformer (GPT).**

"Generative" means it creates.
How?
By predicting the **Next Token.**

"The cat sat on the _____."
Probability:
- Mat: 70%
- Floor: 20%
- Dog: 1%

It picks "Mat".
Then it feeds "Mat" back in.
"The cat sat on the mat _____."`,
                    requiredToAdvance: true
                },
                {
                    id: 'teach-training',
                    title: '📚 Self-Supervised Learning',
                    type: 'text',
                    content: `We don't need humans to label data.
The Internet IS the label.

We take a Wikipedia article.
- Input: "The capital of France is"
- Target: "Paris"

If the model guesses "London", we punish it (Backprop).
If it guesses "Paris", we reward it.

**Scale this to the entire internet, and the model learns Physics, Coding, and History just to predict the next word better.**`,
                    requiredToAdvance: true
                },
                {
                    id: 'explore-generation',
                    title: '🎮 Predicting the Future',
                    type: 'interactive',
                    content: `**Your Mission:**

1. A sentence is fed into the model.
2. Watch the **Probability Bar Graph** for the next word.
3. Click the top word to select it.
4. Watch the sentence grow.

**Notice:** Sometimes the top choice isn't the best one. We use "Temperature" to add randomness and creativity.`,
                    componentId: 'token-prediction-viz',
                    requiredToAdvance: true
                },
                {
                    id: 'bridge',
                    title: '🌉 Is it Alive?',
                    type: 'text',
                    content: `It's just math.
It's just minimizing error on next-word prediction.

But when you make the model BIG enough...
Strange things start to happen.
It starts to solve logic puzzles. It translates languages. It writes poetry.

This is called **Emergence.**`,
                    requiredToAdvance: true
                }
            ]
        },
        // ═══════════════════════════════════════════════════════════
        // CHAPTER 4: THE FUTURE (SCALING)
        // ═══════════════════════════════════════════════════════════
        {
            id: 'l10.4.future',
            title: 'The Future',
            description: 'Where do we go from here?',
            xpReward: 500,
            steps: [
                {
                    id: 'hook',
                    title: '🎯 The Scaling Laws',
                    type: 'text',
                    content: `OpenAI found a law of nature:
**Performance scales with Compute.**

If you make the model 10x bigger, and give it 10x more data, it gets smarter.
Predictably. Reliably.

We haven't hit the ceiling yet.`,
                    requiredToAdvance: true
                },
                {
                    id: 'teach-impact',
                    title: '📚 Understanding the Hype',
                    type: 'text',
                    content: `You now know how it works.
- It's not magic.
- It's not a biological brain.
- It's a massive statistical engine extracting patterns from human knowledge.

But because it has read *everything*, it can synthesize ideas in ways no single human can.`,
                    requiredToAdvance: true
                },
                {
                    id: 'capstone-recap',
                    title: '🏆 The End of the Beginning',
                    type: 'text',
                    content: `**You have completed the Zero to Hero Course.**

You started with **Electrons** (Layer 1).
You built **Logic Gates** (Layer 2).
You coded **Neurons** (Layer 4).
You trained **Deep Networks** (Layer 5).
You filtered images with **CNNs** (Layer 7).
You managed time with **LSTMs** (Layer 8).
And you mastered **Attention** (Layer 9).

You now understand the machinery of the modern world.`,
                    requiredToAdvance: true
                },
                {
                    id: 'final-call',
                    title: '🚀 What Next?',
                    type: 'text',
                    content: `**This was just the tutorial.**

The real game is building.
- Go build an app.
- Fine-tune a Llama model.
- Read "Attention Is All You Need".

The future is being written in code. **Go write it.**`,
                    requiredToAdvance: true
                }
            ]
        }
    ]
};
