import { Module } from '../../types';

export const Layer9: Module = {
    id: 'layer9',
    title: 'Layer 9: Attention Mechanisms',
    lessons: [
        {
            id: 'l9.1.attention_idea',
            title: 'The Attention Idea',
            description: 'Focus on what matters.',
            xpReward: 250,
            steps: [
                {
                    id: 'hook',
                    title: '🎯 The Problem with Sequential Memory',
                    type: 'text',
                    content: `RNNs process one word at a time, left to right.

But humans don't read this way!

When you see: "The animal didn't cross the street because it was too tired"

Your eyes jump to "animal" when reading "it"—you ATTEND to the relevant word.

What if neural networks could do the same?`,
                    requiredToAdvance: true
                },
                {
                    id: 'teach',
                    title: '📚 What is Attention?',
                    type: 'text',
                    content: `**Attention** lets the model "look at" all words at once and decide which are relevant.

**The intuition:**
- For each word, compute a "relevance score" with every other word
- Words with high scores get more "attention"
- When predicting "it" refers to → high attention on "animal"

**Benefits:**
1. **No distance limit** - Can attend to word 1 while at word 100
2. **Parallelizable** - All attention scores computed at once
3. **Interpretable** - We can SEE what the model is "looking at"`,
                    requiredToAdvance: true
                },
                {
                    id: 'summary',
                    title: '💡 Key Takeaways',
                    type: 'text',
                    content: `**What you learned:**

✅ Attention lets models focus on relevant words regardless of distance

✅ It's computed in parallel (fast on GPUs)

✅ We can visualize attention to interpret the model

**Big idea:** Attention is the key breakthrough that led to Transformers and modern AI.`,
                    requiredToAdvance: true
                }
            ]
        },
        {
            id: 'l9.2.self_attention',
            title: 'Self-Attention',
            description: 'Every word looks at every word.',
            xpReward: 300,
            steps: [
                {
                    id: 'hook',
                    title: '🎯 Looking at Yourself',
                    type: 'text',
                    content: `In **Self-Attention**, each word in a sentence asks:

"Who in this sentence should I pay attention to?"

The answer forms an **attention pattern**—a map showing which words relate to which.

Let's see it in action.`,
                    requiredToAdvance: true
                },
                {
                    id: 'teach',
                    title: '📚 Computing Self-Attention',
                    type: 'text',
                    content: `For each pair of words (i, j), we compute an attention score:

**score(i, j)** = How relevant is word j to word i?

**High scores mean:**
- "it" → "animal" (pronoun refers to noun)
- "street" → "cross" (object of verb)
- "tired" → "animal" (describes the animal)

**The attention weights:** score → softmax → weights that sum to 1

**The output:** weighted sum of all word representations

Each word's new representation includes information from all relevant words!`,
                    requiredToAdvance: true
                },
                {
                    id: 'explore',
                    title: '🎮 Attention Heatmap',
                    type: 'interactive',
                    content: `**Your Mission:**

1. Hover over each word in the sentence
2. See which OTHER words it attends to (highlighted)
3. Find the pronoun "it" and see what it attends to

**Key insight:** Notice how "it" strongly attends to "animal"—the model has learned coreference!`,
                    componentId: 'attention-heatmap',
                    requiredToAdvance: true
                },
                {
                    id: 'summary',
                    title: '💡 Key Takeaways',
                    type: 'text',
                    content: `**What you learned:**

✅ Self-attention computes word-to-word relevance scores

✅ Each word gets a new representation based on all related words

✅ The model learns what "relevant" means during training

**The magic:** After training, the attention patterns match human intuition about language!`,
                    requiredToAdvance: true
                }
            ]
        },
        {
            id: 'l9.3.qkv',
            title: 'Query, Key, Value',
            description: 'The math of attention.',
            xpReward: 300,
            steps: [
                {
                    id: 'hook',
                    title: '🎯 The Library Metaphor',
                    type: 'text',
                    content: `Imagine a library:
- You have a **Query**: "I want a book about cats"
- Books have **Keys**: "Animals", "Dogs", "Cats", "Cooking"
- You find matching keys and get the **Values**: the actual book content

**QKV Attention works the same way:**
- Query = What am I looking for?
- Keys = What does each word offer?
- Values = The actual information to retrieve`,
                    requiredToAdvance: true
                },
                {
                    id: 'teach',
                    title: '📚 The QKV Formula',
                    type: 'text',
                    content: `For each word, we create 3 vectors:

**Q (Query)** = "What am I looking for?"
**K (Key)** = "What can others match against?"
**V (Value)** = "What information do I provide?"

**The Attention Formula:**

\`\`\`
Attention(Q, K, V) = softmax(Q × K^T / √d) × V
\`\`\`

**Step by step:**
1. Q × K^T = Dot product of all queries with all keys (similarity scores)
2. / √d = Scale to prevent huge values
3. softmax = Convert to probabilities
4. × V = Weight-sum the values

**Output:** Each word's representation enriched with relevant context.`,
                    requiredToAdvance: true
                },
                {
                    id: 'explore',
                    title: '🎮 QKV Visualization',
                    type: 'interactive',
                    content: `**Your Mission:**

1. See how each word creates Q, K, V vectors
2. Watch the Query-Key dot products (similarity scores)
3. See how Values are combined based on attention weights

**Key insight:** The dot product measures similarity: similar Q and K = high attention.`,
                    componentId: 'qkv-viz',
                    requiredToAdvance: true
                },
                {
                    id: 'summary',
                    title: '💡 Key Takeaways',
                    type: 'text',
                    content: `**What you learned:**

✅ Query = what I need, Key = what I offer, Value = my content

✅ Attention score = Q · K (dot product = similarity)

✅ Output = weighted sum of Values based on attention scores

**Formula to remember:**
Attention(Q,K,V) = softmax(QK^T/√d) × V`,
                    requiredToAdvance: true
                }
            ]
        },
        {
            id: 'l9.4.multihead',
            title: 'Multi-Head Attention',
            description: 'Different perspectives.',
            xpReward: 250,
            steps: [
                {
                    id: 'hook',
                    title: '🎯 One Head is Not Enough',
                    type: 'text',
                    content: `A single attention head can only focus on ONE type of relationship.

But language has MANY relationships:
- Syntactic: subject-verb agreement
- Semantic: word meanings
- Positional: nearby words matter
- Coreference: what pronouns refer to

**Solution:** Run MULTIPLE attention heads in parallel!`,
                    requiredToAdvance: true
                },
                {
                    id: 'teach',
                    title: '📚 Multi-Head Attention',
                    type: 'text',
                    content: `**Multi-Head Attention:**

Run d_head separate attention mechanisms in parallel:
- Head 1 might learn subject-verb relationships
- Head 2 might learn adjective-noun relationships
- Head 3 might learn long-distance dependencies
- ...

**Each head has its own Q, K, V weight matrices.**

**Final output:** Concatenate all heads → Linear layer → Combined representation

**In practice:** GPT-4 has 96 attention heads per layer!`,
                    requiredToAdvance: true
                },
                {
                    id: 'summary',
                    title: '💡 Layer 9 Complete!',
                    type: 'text',
                    content: `**🎉 You've completed Layer 9: Attention Mechanisms!**

**Your Journey:**
✅ Attention → Focus on relevant words regardless of distance
✅ Self-Attention → Each word attends to all words
✅ QKV → Query-Key similarity selects Values
✅ Multi-Head → Multiple perspectives captured in parallel

**The revolution:** Attention replaced RNNs because:
1. Unlimited distance (no forgetting)
2. Fully parallelizable (fast training)
3. Better results on every benchmark

**Next Up:** Layer 10 - Transformers & GPT
Putting it all together into the architecture behind ChatGPT!`,
                    requiredToAdvance: true
                }
            ]
        }
    ]
};
