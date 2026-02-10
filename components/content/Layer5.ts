import { Module } from '../../types';

export const Layer5: Module = {
    id: 'layer5',
    title: 'Layer 5: Deep Learning',
    lessons: [
        {
            id: 'l5.1.hidden_layers',
            title: 'Hidden Layers: The Secret Sauce',
            description: 'Where the magic happens.',
            xpReward: 250,
            steps: [
                {
                    id: 'hook',
                    title: '🎯 Beyond Single Neurons',
                    type: 'text',
                    content: `In Layer 4, we hit a wall: single neurons can't solve XOR.

The solution? Add a **hidden layer** between input and output.

Hidden layers are the "secret sauce" of deep learning. They learn intermediate representations that make complex problems solvable.

Let's see how they work.`,
                    requiredToAdvance: true
                },
                {
                    id: 'teach',
                    title: '📚 What Hidden Layers Do',
                    type: 'text',
                    content: `A hidden layer **transforms the input** into a new representation.

**Example: Solving XOR**

Input Layer: [0, 1] and [1, 0]
Hidden Layer: Learns to detect "one input is high"
Output Layer: Easy to classify now!

**What the hidden layer learns:**
- Layer 1: Edges, colors, textures
- Layer 2: Shapes, patterns
- Layer 3: Objects, faces
- Layer 4: Scenes, concepts

Each layer builds on the previous one, learning increasingly abstract features.`,
                    requiredToAdvance: true
                },
                {
                    id: 'explore',
                    title: '🎮 Hidden Layer Visualization',
                    type: 'interactive',
                    content: `**Your Mission:**

1. See the original XOR points (not separable)
2. Watch how the hidden layer transforms them
3. In the new space, they ARE separable!

**Key insight:** The hidden layer "warps" the space so a simple line can solve the problem.`,
                    componentId: 'hidden-layer-viz',
                    requiredToAdvance: true
                },
                {
                    id: 'summary',
                    title: '💡 Key Takeaways',
                    type: 'text',
                    content: `**What you learned:**

✅ Hidden layers transform inputs into learnable representations

✅ Each layer learns increasingly abstract features

✅ More layers = deeper network = can learn more complex patterns

**Why "deep" learning?** Because the network has many LAYERS deep.`,
                    requiredToAdvance: true
                }
            ]
        },
        {
            id: 'l5.2.forward_pass',
            title: 'Forward Propagation',
            description: 'Data flows forward.',
            xpReward: 200,
            steps: [
                {
                    id: 'hook',
                    title: '🎯 Following the Data',
                    type: 'text',
                    content: `When you feed an image into a neural network, what happens?

The data flows FORWARD through each layer:
Input → Hidden Layer 1 → Hidden Layer 2 → ... → Output

This is called **Forward Propagation**.

Let's trace the journey of a single data point.`,
                    requiredToAdvance: true
                },
                {
                    id: 'teach',
                    title: '📚 The Forward Pass Algorithm',
                    type: 'text',
                    content: `For each layer:

**1. Weighted Sum:**
\`z = W × input + bias\`

**2. Activation:**
\`output = activation(z)\`

**Example 2-layer network:**
\`\`\`
Input: [2]
Layer 1: z₁ = 3×2 + (-1) = 5, a₁ = ReLU(5) = 5
Layer 2: z₂ = 2×5 + 0 = 10, a₂ = 10
Output: 10
\`\`\`

Each layer's output becomes the next layer's input.

**The entire network is just this repeated many times!**`,
                    requiredToAdvance: true
                },
                {
                    id: 'summary',
                    title: '💡 Key Takeaways',
                    type: 'text',
                    content: `**What you learned:**

✅ Forward pass: data flows input → hidden → output

✅ Each layer: weighted sum → activation

✅ The final output is the network's prediction

**Next:** How does the network LEARN from its mistakes?`,
                    requiredToAdvance: true
                }
            ]
        },
        {
            id: 'l5.3.backprop',
            title: 'Backpropagation: The Learning Engine',
            description: 'Errors flow backward.',
            xpReward: 300,
            steps: [
                {
                    id: 'hook',
                    title: '🎯 The Credit Assignment Problem',
                    type: 'text',
                    content: `The network made a prediction. It was wrong.

But there are MILLIONS of weights. Which ones caused the error?

This is the **Credit Assignment Problem**: figuring out which weights to blame.

The solution is **Backpropagation**—the most important algorithm in deep learning.`,
                    requiredToAdvance: true
                },
                {
                    id: 'teach',
                    title: '📚 How Backpropagation Works',
                    type: 'text',
                    content: `**The Key Insight:** Use the chain rule from calculus.

**1. Compute the error at the output**
   error = prediction - actual

**2. Propagate error BACKWARD through each layer**
   - How much did Layer N contribute to the error?
   - How much did Layer N-1 contribute to Layer N's error?
   - And so on...

**3. Update each weight based on its contribution**
   weight = weight - learning_rate × gradient

**Why it works:** Each weight gets a "gradient" telling it exactly how much it contributed to the error.

The chain rule lets us compute this efficiently, even for networks with billions of weights.`,
                    requiredToAdvance: true
                },
                {
                    id: 'explore',
                    title: '🎮 Backpropagation Visualization',
                    type: 'interactive',
                    content: `**Your Mission:**

1. Watch the forward pass (blue arrows, left to right)
2. See the error computed at the output
3. Watch the backward pass (red arrows, right to left)
4. Notice how gradients propagate back through each layer

**This is how AI learns!** Error flows backward, and each weight adjusts.`,
                    componentId: 'backprop-viz',
                    requiredToAdvance: true
                },
                {
                    id: 'summary',
                    title: '💡 Layer 5 Complete!',
                    type: 'text',
                    content: `**🎉 You've completed Layer 5: Deep Learning!**

**Your Journey:**
✅ Hidden layers → Transform inputs to learnable representations
✅ Forward propagation → Data flows input → output
✅ Backpropagation → Errors flow output → input to update weights

**The big picture:**
Deep learning = Forward pass + Compute loss + Backprop gradients + Update weights + Repeat

This same algorithm trains everything from image classifiers to ChatGPT.

**Next Up:** Layer 6 - Training Deep Networks
What challenges arise when networks get REALLY deep?`,
                    requiredToAdvance: true
                }
            ]
        }
    ]
};
