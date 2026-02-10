import { Module } from '../../types';

export const Layer10: Module = {
    id: 'layer10',
    title: 'Layer 10: Transformers & GPT',
    lessons: [
        {
            id: 'l10.1.transformer',
            title: 'The Transformer Architecture',
            description: 'Attention is all you need.',
            xpReward: 300,
            steps: [
                {
                    id: 'hook',
                    title: '🎯 The Architecture That Changed Everything',
                    type: 'text',
                    content: `In 2017, a paper called "Attention Is All You Need" introduced the **Transformer**.

It threw away RNNs entirely. No recurrence. No sequential processing.

Just **attention**, stacked in layers.

The result? Models that are faster to train, better at long-range dependencies, and now power:
- ChatGPT & GPT-4
- Google Search
- GitHub Copilot
- DALL-E & Stable Diffusion

Let's understand this revolutionary architecture.`,
                    requiredToAdvance: true
                },
                {
                    id: 'teach1',
                    title: '📚 The Transformer Block',
                    type: 'text',
                    content: `A Transformer is a stack of identical blocks. Each block has:

**1. Multi-Head Self-Attention**
   - Look at all words, compute relevance
   - Multiple heads capture different relationships

**2. Add & Normalize**
   - Add the input back (residual connection)
   - Normalize to keep values stable

**3. Feed-Forward Network**
   - Two linear layers with ReLU in between
   - Processes each position independently

**4. Add & Normalize again**

**Stack 12-96 of these blocks** → That's a Transformer!`,
                    requiredToAdvance: true
                },
                {
                    id: 'teach2',
                    title: '📚 Encoder vs Decoder',
                    type: 'text',
                    content: `The original Transformer has TWO parts:

**Encoder (Bidirectional):**
- Sees ALL words at once
- "BERT-style" → Good for understanding
- Used for: Classification, Q&A, search

**Decoder (Autoregressive):**
- Sees only PREVIOUS words (masking)
- "GPT-style" → Good for generation
- Used for: ChatGPT, code generation, writing

**Modern models:**
- **BERT**: Encoder-only (understanding)
- **GPT**: Decoder-only (generation)
- **T5**: Both (translation, summarization)`,
                    requiredToAdvance: true
                },
                {
                    id: 'explore',
                    title: '🎮 Transformer Architecture',
                    type: 'interactive',
                    content: `**Your Mission:**

1. See the Transformer architecture visually
2. Toggle between Encoder (BERT), Decoder (GPT), and Encoder-Decoder (T5)
3. Notice the difference: Encoder sees all, Decoder is masked

**Key insight:** The masking in GPT is why it can only generate forward—it never sees future words!`,
                    componentId: 'transformer-arch-viz',
                    requiredToAdvance: true
                },
                {
                    id: 'summary',
                    title: '💡 Key Takeaways',
                    type: 'text',
                    content: `**What you learned:**

✅ Transformers stack attention + feed-forward blocks

✅ No recurrence = fully parallelizable = fast training

✅ Encoder = see all (BERT), Decoder = see past only (GPT)

**Why it won:** Transformers scale better than RNNs. More data + more compute = better results. That's why GPT-4 exists.`,
                    requiredToAdvance: true
                }
            ]
        },
        {
            id: 'l10.2.gpt',
            title: 'GPT: The Language Model',
            description: 'Predicting the next word.',
            xpReward: 300,
            steps: [
                {
                    id: 'hook',
                    title: '🎯 One Simple Task',
                    type: 'text',
                    content: `Here's the surprising thing about GPT:

It's trained on ONE task: **Predict the next word**.

"The cat sat on the ___" → "mat"
"Once upon a ___" → "time"
"The capital of France is ___" → "Paris"

That's it. No special programming. No explicit rules.

Just billions of next-word predictions across the entire internet.

And from this simple task emerges... intelligence?`,
                    requiredToAdvance: true
                },
                {
                    id: 'teach',
                    title: '📚 How GPT is Trained',
                    type: 'text',
                    content: `**Training Data:**
All the text on the internet! Wikipedia, books, websites, forums...

**The Task:**
Given all previous words, predict the next word.

**Example:**
Input: "The quick brown fox jumps over the"
Target: "lazy"

**The Math:**
- Output = probability distribution over all possible words
- Loss = how surprised were we by the actual next word?
- Lower loss = better predictions

**After training on billions of examples:**
The model learns grammar, facts, reasoning, style, and more—all from predicting the next word.`,
                    requiredToAdvance: true
                },
                {
                    id: 'explore',
                    title: '🎮 Next Token Prediction',
                    type: 'interactive',
                    content: `**Your Mission:**

1. Type a sentence beginning
2. See the model's top predictions for the next word
3. Click a prediction to add it
4. Build a sentence word by word!

**This is EXACTLY how ChatGPT works:**
- You type a prompt
- It predicts the most likely next word
- Adds it, predicts again, adds it...
- Until it predicts a "stop" token`,
                    componentId: 'token-prediction-viz',
                    requiredToAdvance: true
                },
                {
                    id: 'summary',
                    title: '💡 Key Takeaways',
                    type: 'text',
                    content: `**What you learned:**

✅ GPT predicts the next word, one token at a time

✅ Training = minimize prediction error across billions of examples

✅ From this simple task, complex capabilities emerge

**Mind-blowing:** GPT learns to reason, write code, and explain concepts—all from next-word prediction.`,
                    requiredToAdvance: true
                }
            ]
        },
        {
            id: 'l10.3.scaling',
            title: 'Scaling Laws',
            description: 'Bigger is better.',
            xpReward: 250,
            steps: [
                {
                    id: 'hook',
                    title: '🎯 The Secret Sauce',
                    type: 'text',
                    content: `Why is GPT-4 so much better than GPT-3?

It's not smarter algorithms. It's **SCALE**:
- More parameters (weights)
- More training data
- More compute

OpenAI discovered that performance improves PREDICTABLY as you increase scale.

This is called a **Scaling Law**.`,
                    requiredToAdvance: true
                },
                {
                    id: 'teach',
                    title: '📚 The Scaling Discovery',
                    type: 'text',
                    content: `**The Scaling Law:**

\`\`\`
Loss ∝ 1 / (Parameters × Data × Compute)^α
\`\`\`

As you increase ANY of:
- Parameters (model size)
- Data (training examples)
- Compute (training time)

...performance improves in a smooth, predictable curve.

**The numbers:**
- GPT-2 (2019): 1.5 billion parameters
- GPT-3 (2020): 175 billion parameters
- GPT-4 (2023): ~1.7 trillion parameters (estimated)

Each generation: ~100x more parameters, dramatically better performance.`,
                    requiredToAdvance: true
                },
                {
                    id: 'summary',
                    title: '💡 Key Takeaways',
                    type: 'text',
                    content: `**What you learned:**

✅ Bigger models + more data + more compute = better results

✅ Improvements are smooth and predictable (scaling laws)

✅ This is why AI companies race to build larger models

**The implication:** If scaling continues, future models will be vastly more capable. The question is: when do we hit limits?`,
                    requiredToAdvance: true
                }
            ]
        },
        {
            id: 'l10.4.conclusion',
            title: '🎓 Your Journey Complete',
            description: 'From electrons to understanding.',
            xpReward: 500,
            steps: [
                {
                    id: 'recap',
                    title: '🏆 The Complete Journey',
                    type: 'text',
                    content: `**Congratulations! You've completed the Zero-to-Hero AI Curriculum!**

Let's recap your incredible journey:

**Part 1: The Foundation**
- ⚡ Electricity → Transistors → Logic Gates → Binary
- 📊 Numbers → Text → Images → Vectors

**Part 2: The Learning Machine**
- 📉 Predictions → Loss → Gradients → Learning
- 🧠 Neurons → Activation → Hidden Layers

**Part 3: Deep Learning**
- 🏋️ Training → Optimizers → Regularization
- 👁️ Convolution → Filters → Pooling (CNNs)

**Part 4: The Transformer Age**
- 🔄 Sequences → RNNs → LSTMs
- 🔍 Attention → QKV → Multi-Head
- 🤖 Transformers → GPT → Scaling`,
                    requiredToAdvance: true
                },
                {
                    id: 'insight',
                    title: '💡 The Big Picture',
                    type: 'text',
                    content: `**What you now understand:**

At the bottom: electrons switching ON and OFF in silicon

At the top: AI that can write, reason, and create

**Everything in between is just:**
- Representing data as numbers (vectors)
- Transforming vectors using matrices
- Learning transformations by minimizing error
- Stacking these transformations deep
- Using attention to focus on what matters

That's AI. That's the entire field.

The rest is engineering details.`,
                    requiredToAdvance: true
                },
                {
                    id: 'next',
                    title: '🚀 Where to Go Next',
                    type: 'text',
                    content: `**Your foundation is solid. Here's what's next:**

**1. Practice:**
- Build projects with TensorFlow or PyTorch
- Fine-tune a small language model
- Build an image classifier

**2. Go Deeper:**
- Read the "Attention Is All You Need" paper
- Study the GPT-2 architecture in detail
- Learn about RLHF (how ChatGPT was trained)

**3. Stay Current:**
- Follow AI labs (OpenAI, Anthropic, Google DeepMind)
- Read AI papers on arxiv.org
- Join AI communities on Discord/Reddit

**You're no longer a beginner. You understand the fundamentals that most people never learn.**

Welcome to the world of AI. 🎉`,
                    requiredToAdvance: true
                }
            ]
        }
    ]
};
