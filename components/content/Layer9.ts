import { Module } from '../../types';

export const Layer9: Module = {
    id: 'layer9',
    title: 'Layer 9: The Attention Revolution',
    lessons: [
        // ═══════════════════════════════════════════════════════════
        // CHAPTER 1: THE BOTTLENECK (CONTEXT)
        // ═══════════════════════════════════════════════════════════
        {
            id: 'l9.1.bottleneck',
            title: 'The Bottleneck',
            description: 'Why LSTMs weren\'t enough.',
            xpReward: 150,
            steps: [
                {
                    id: 'hook',
                    title: '🎯 The Cocktail Party Problem',
                    type: 'text',
                    content: `Imagine being at a loud party.
You are listening to ONE person (Attention), while tuning out 100 others (Noise).

Suddenly, someone across the room says your name.
You INSTANTLY shift focus.

RNNs/LSTMs can't do this.
They have to process every single conversation inthe room sequentially to find your name.
By the time they get to it, they've forgotten who called.`,
                    requiredToAdvance: true
                },
                {
                    id: 'teach-bottleneck',
                    title: '📚 The Sequential Trap',
                    type: 'text',
                    content: `LSTMs were great, but they had a fatal flaw: **Sequential Processing.**

To read the 100th word, you MUST process the 99 words before it.
1. **Slow:** You can't use parallel GPUs efficiently.
2. **Distance Limit:** Information travels step-by-step. It fades.

**2017 Changed Everything.**
A paper called *"Attention Is All You Need"* proposed a radical idea:
**"Throw away the RNN. Throw away the Recurrence. Just look at EVERYTHING at once."**`,
                    requiredToAdvance: true
                },
                {
                    id: 'explore-bottleneck',
                    title: '🎮 Parallel vs Sequential',
                    type: 'interactive',
                    content: `**Your Mission:**

1. **Sequential Mode (RNN):** Watch the red dot jump from word to word. Slow.
2. **Parallel Mode (Transformer):** Watch the ENTIRE sentence light up at once. Instant.

This parallelization is why ChatGPT can read a whole book in seconds.`,
                    componentId: 'attention-heatmap', // Using heatmap to show "all at once" concept
                    requiredToAdvance: true
                },
                {
                    id: 'bridge',
                    title: '🌉 Meaning is Context',
                    type: 'text',
                    content: `If I say "Bank", what do I mean?
- A river bank?
- A financial bank?

You can't know unless you look at the OTHER words.
"I sat by the **bank**." (River)
"I deposited cash at the **bank**." (Money)

To understand a word, the AI must **Attend** to the relevant context words.`,
                    requiredToAdvance: true
                }
            ]
        },
        // ═══════════════════════════════════════════════════════════
        // CHAPTER 2: THE MECHANISM (QKV)
        // ═══════════════════════════════════════════════════════════
        {
            id: 'l9.2.qkv',
            title: 'The Mechanism',
            description: 'Query, Key, and Value.',
            xpReward: 200,
            steps: [
                {
                    id: 'hook',
                    title: '🎯 The Database Analogy',
                    type: 'text',
                    content: `How does a Database work?
1. You verify a **Query** ("Find User: element123").
2. The DB checks all **Keys** (IDs).
3. When it finds a match, it returns the **Value** (User Data).

**Self-Attention works the exact same way.**
Every word gives off 3 signals:
- **Query:** What am I looking for? (e.g., "I am an adjective, looking for a noun to modify")
- **Key:** What do I contain? (e.g., "I am a noun")
- **Value:** Here is my meaning.`,
                    requiredToAdvance: true
                },
                {
                    id: 'teach-qkv',
                    title: '📚 The Dot Product',
                    type: 'text',
                    content: `How do we match a Query to a Key?
**The Dot Product.** 

If the Query vector aligns with the Key vector, the result is a HIGH number (High Attraction).
If they are perpendicular, the result is ZERO (No Attention).

**The Formula:**
\`Attention = Softmax( (Q · K) / √d ) * V\`

(Don't panic. It just means: Find the matches, convert to %, and grab the values).`,
                    requiredToAdvance: true
                },
                {
                    id: 'explore-qkv',
                    title: '🎮 Inside the Engine',
                    type: 'interactive',
                    content: `**Your Mission:**

1. Select the word **"Bank"**.
2. See its **Query Vector**.
3. See the **Key Vectors** of other words ("River", "Money").
4. Watch the **Dot Product** spike when it matches the relevant context.
5. The model "attends" to the right meaning!`,
                    componentId: 'qkv-viz',
                    requiredToAdvance: true
                },
                {
                    id: 'quiz-qkv',
                    title: '🧠 Understanding Check',
                    type: 'quiz',
                    content: `This is the heart of Transformers.`,
                    quizQuestion: 'In Self-Attention, what determines how much focus Word A puts on Word B?',
                    quizOptions: [
                        'The distance between them',
                        'The similarity (dot product) between Word A\'s Query and Word B\'s Key',
                        'The random initialization',
                        'The order they appear in the sentence'
                    ],
                    quizCorrectIndex: 1,
                    quizExplanation: 'Correct! It\'s a content-based lookup. Position doesn\'t matter initially.',
                    requiredToAdvance: true
                },
                {
                    id: 'bridge',
                    title: '🌉 Multi-Head Attention',
                    type: 'text',
                    content: `One attention mechanism is good.
But what if a word has MULTIPLE relationships?

"The **apple** fell from the **tree**."
- Relationship 1: Physics (Gravity).
- Relationship 2: Biology (Fruit source).

We need **Multi-Head Attention.**
8 (or 96) separate attention brains running in parallel, each looking for different things.`,
                    requiredToAdvance: true
                }
            ]
        },
        // ═══════════════════════════════════════════════════════════
        // CHAPTER 3: THE MAP (HEATMAP)
        // ═══════════════════════════════════════════════════════════
        {
            id: 'l9.3.heatmap',
            title: 'The Map',
            description: 'Seeing what the brain sees.',
            xpReward: 250,
            steps: [
                {
                    id: 'hook',
                    title: '🎯 The Alien Language',
                    type: 'text',
                    content: `If we look inside a Transformer's brain, what do we see?
We see **Heatmaps.**

A grid showing the connection strength between every pair of words.
- X-axis: All words.
- Y-axis: All words.
- Color: Strength of Attention.

This is the "Connectome" of the thought process.`,
                    requiredToAdvance: true
                },
                {
                    id: 'explore-heatmap',
                    title: '🎮 Reading the Mind',
                    type: 'interactive',
                    content: `**Your Mission:**

1. Hover over words in the sentence: *"The animal didn't cross the street because it was too tired."*
2. **Find "it".**
3. Look at the heatmap.
4. **Question:** Does "it" connect stronger to "animal" or "street"?
5. **Answer:** The model KNOWS "it" refers to the animal because it is "tired". A street can't be tired.`,
                    componentId: 'attention-heatmap',
                    requiredToAdvance: true
                },
                {
                    id: 'teach-viz',
                    title: '📚 Interpretability',
                    type: 'text',
                    content: `This is one of the few places in Deep Learning where we can actually **Interpret** the results.

We can inspect GPT-4 and ask: "Why did you say that?"
And look at the attention map to see exactly which source documents it was focusing on.`,
                    requiredToAdvance: true
                },
                {
                    id: 'bridge',
                    title: '🌉 No Position?',
                    type: 'text',
                    content: `Wait. I said Attention looks at "everything at once".

If I say:
"Dog bites Man" vs "Man bites Dog".
To the Attention mechanism, these look IDENTICAL. It knows "Dog", "Man", "Bites" exist, but not the order.

We have lost the sequence!
We need to hack it back in.`,
                    requiredToAdvance: true
                }
            ]
        },
        // ═══════════════════════════════════════════════════════════
        // CHAPTER 4: THE POSITION (ENCODING)
        // ═══════════════════════════════════════════════════════════
        {
            id: 'l9.4.position',
            title: 'The Positional Hack',
            description: 'Injecting order back into chaos.',
            xpReward: 300,
            steps: [
                {
                    id: 'hook',
                    title: '🎯 Teleportation',
                    type: 'text',
                    content: `Attention is like teleportation. It jumps instantly from word 1 to word 1000.
But it has no concept of "Next" or "Previous".

**The Solution:**
We add a "timestamp" to every word.
- "The" + [Pos 1]
- "Cat" + [Pos 2]

We literally ADD a vector to the word embedding representing its location.`,
                    requiredToAdvance: true
                },
                {
                    id: 'teach-pe',
                    title: '📚 Positional Encodings',
                    type: 'text',
                    content: `We don't just add numbers (1, 2, 3...). As numbers get big, they distort the data.

We use **Sine Waves.**
- Low frequency waves for general location.
- High frequency waves for precise position.

This allows the model to understand "Relative Position" (Word A is far from Word B) without numbers exploding to infinity.`,
                    requiredToAdvance: true
                },
                {
                    id: 'layer-complete',
                    title: '🏆 Layer 9 Complete!',
                    type: 'text',
                    content: `**🎉 You've completed Layer 9: Attention.**

**Your Journey:**
1. **The Bottleneck:** Sequential processing is slow and forgetful.
2. **Attention:** Parallel processing that connects everything.
3. **QKV:** The database query mechanism for context.
4. **Positional Encoding:** Adding order back into the mix.

**You now have all the components.**
- Embeddings
- Feed Forward Layers
- Attention
- Residual Connections (from Residuals)

**Next Up: Layer 10 - Transformers & GPT.**
We will assemble these Legos into the machine that passed the Bar Exam.`,
                    requiredToAdvance: true
                }
            ]
        }
    ]
};
