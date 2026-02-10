import { Module } from '../../types';

export const Layer2: Module = {
    id: 'layer2',
    title: 'Layer 2: Functions & Transformations',
    lessons: [
        {
            id: 'l2.1.functions',
            title: 'Functions: The Machines of Math',
            description: 'Input goes in, output comes out.',
            xpReward: 150,
            steps: [
                {
                    id: 'hook',
                    title: '🎯 The Transformation Question',
                    type: 'text',
                    content: `We now know that everything—text, images, audio—is just a vector of numbers.

But raw data isn't useful. We need to TRANSFORM it:
- Raw image → "Is this a cat?"
- Input text → "What should the reply be?"
- User data → "Will they buy this product?"

This transformation is a **function**. And AI is just a very complex function.`,
                    requiredToAdvance: true
                },
                {
                    id: 'teach',
                    title: '📚 What is a Function?',
                    type: 'text',
                    content: `A **function** is a machine that takes an input and produces an output.

**Simple examples:**
- f(x) = x + 1 → Input 5, output 6
- f(x) = x × 2 → Input 5, output 10
- f(x) = x² → Input 5, output 25

**AI examples:**
- f(image) = "cat" or "dog" → Classification
- f(text) = next word → Language model
- f(face) = name → Face recognition

**The Key Insight:**
A neural network IS a function. A very complex one with millions of parameters, but still just: INPUT → TRANSFORMATION → OUTPUT`,
                    requiredToAdvance: true
                },
                {
                    id: 'summary',
                    title: '💡 Key Takeaways',
                    type: 'text',
                    content: `**What you learned:**

✅ Functions transform inputs into outputs

✅ AI models are just complex functions with learned parameters

✅ Training AI = finding the right function to match inputs to outputs

**Remember:** When someone asks "How does ChatGPT work?", the honest answer is: "It's a function that maps text input to text output. A very big function."`,
                    requiredToAdvance: true
                }
            ]
        },
        {
            id: 'l2.2.dot_product',
            title: 'The Dot Product: AI\'s Secret Weapon',
            description: 'The most important operation in AI.',
            xpReward: 200,
            steps: [
                {
                    id: 'hook',
                    title: '🎯 One Operation to Rule Them All',
                    type: 'text',
                    content: `If you could only learn ONE mathematical operation to understand AI, it would be the **dot product**.

Every neural network layer, every attention mechanism, every recommendation system—they all use dot products at their core.

Let's master this essential operation.`,
                    requiredToAdvance: true
                },
                {
                    id: 'teach1',
                    title: '📚 How the Dot Product Works',
                    type: 'text',
                    content: `The **dot product** multiplies corresponding elements and sums the results:

**[1, 2, 3] · [4, 5, 6]** = 1×4 + 2×5 + 3×6 = 4 + 10 + 18 = **32**

**Step by step:**
1. Multiply first elements: 1 × 4 = 4
2. Multiply second elements: 2 × 5 = 10
3. Multiply third elements: 3 × 6 = 18
4. Sum them all: 4 + 10 + 18 = 32

**Important:** Both vectors must have the same length!`,
                    requiredToAdvance: true
                },
                {
                    id: 'teach2',
                    title: '📚 What the Dot Product MEANS',
                    type: 'text',
                    content: `The dot product measures **similarity** between vectors.

- **High positive result** = Vectors point in same direction = SIMILAR
- **Zero result** = Vectors are perpendicular = UNRELATED
- **Negative result** = Vectors point opposite directions = OPPOSITE

**In AI:**
- Word embeddings: "king" · "queen" = high (similar concepts)
- Image features: cat_features · cat_template = high match
- Attention: query · key = how relevant is this context?

**This is why AI can find "similar" things—it's just dot products!**`,
                    requiredToAdvance: true
                },
                {
                    id: 'challenge',
                    title: '🏆 Challenge: Implement Dot Product',
                    type: 'challenge',
                    content: `**Your Mission:**

Write a Python function that computes the dot product of two vectors.

Remember: Multiply corresponding elements, then sum.`,
                    initialCode: `def dot_product(a, b):
    # a = [1, 2, 3]
    # b = [4, 5, 6]  
    # Expected: 32
    pass`,
                    expectedOutput: "32",
                    hints: [
                        "Use zip(a, b) to pair up elements",
                        "Multiply each pair",
                        "Sum all the products"
                    ],
                    componentId: 'dot-product-code',
                    requiredToAdvance: true
                },
                {
                    id: 'summary',
                    title: '💡 Key Takeaways',
                    type: 'text',
                    content: `**What you learned:**

✅ Dot product: multiply corresponding elements, then sum

✅ It measures SIMILARITY between vectors

✅ Neural networks are built on millions of dot products

**Real application:** When Spotify recommends songs, it computes: your_taste_vector · song_vector. High score = good recommendation.`,
                    requiredToAdvance: true
                }
            ]
        },
        {
            id: 'l2.3.linear',
            title: 'Linear Transformations',
            description: 'Matrices: vectors that transform other vectors.',
            xpReward: 200,
            steps: [
                {
                    id: 'hook',
                    title: '🎯 Scaling Up',
                    type: 'text',
                    content: `A single dot product transforms a vector into a number.

But what if we want to transform a vector into ANOTHER vector?

We need a **matrix**—a grid of numbers that can apply multiple dot products at once.

This is exactly what a neural network layer does.`,
                    requiredToAdvance: true
                },
                {
                    id: 'teach',
                    title: '📚 Matrix-Vector Multiplication',
                    type: 'text',
                    content: `A **matrix** is a 2D grid of numbers. When we multiply a matrix by a vector:

**Matrix × Vector = New Vector**

\`\`\`
[1 2]   [5]   [1×5 + 2×6]   [17]
[3 4] × [6] = [3×5 + 4×6] = [39]
\`\`\`

Each ROW of the matrix does a dot product with the input vector.

**In neural networks:**
- Input vector = your data (e.g., 784 pixels)
- Matrix = weights (learned during training)
- Output vector = next layer's activations

**A neural network layer IS matrix multiplication!**`,
                    requiredToAdvance: true
                },
                {
                    id: 'explore',
                    title: '🎮 Matrix Visualization',
                    type: 'interactive',
                    content: `**Your Mission:**

1. Watch how the matrix transforms the input vector
2. Each row produces one output value
3. This is exactly what happens in a neural network layer!

**Key insight:** The matrix "encodes" what the layer has learned. Training = finding the right matrix values.`,
                    componentId: 'matrix-viz',
                    requiredToAdvance: true
                },
                {
                    id: 'summary',
                    title: '💡 Layer 2 Complete!',
                    type: 'text',
                    content: `**🎉 Congratulations! You've completed Layer 2: Functions & Transformations.**

**Your Journey:**
✅ Functions → Input-output transformations
✅ Dot Product → Similarity measurement (AI's core operation)
✅ Matrices → Vector-to-vector transformations

**The big picture:**
Every neural network layer is: **output = matrix × input + bias**

That's it. The entire field of deep learning is built on this one equation.

**Next Up:** Layer 3 - Learning
How does the network LEARN the right matrix values?`,
                    requiredToAdvance: true
                }
            ]
        }
    ]
};
