import { Module } from '../../types';

export const Layer4: Module = {
    id: 'layer4',
    title: 'Layer 4: The Artificial Neuron',
    lessons: [
        {
            id: 'l4.1.neuron',
            title: 'The Artificial Neuron',
            description: 'Inspired by the brain.',
            xpReward: 200,
            steps: [
                {
                    id: 'hook',
                    title: '🎯 From Math to Biology',
                    type: 'text',
                    content: `Your brain has 86 billion neurons, each connected to thousands of others.

In the 1940s, scientists asked: "Can we build artificial neurons to think like brains?"

The answer was yes—and it led to AI as we know it today.

Let's build your first artificial neuron.`,
                    requiredToAdvance: true
                },
                {
                    id: 'teach1',
                    title: '📚 How a Biological Neuron Works',
                    type: 'text',
                    content: `A real neuron:

1. **Receives signals** from other neurons (inputs)
2. **Weighs them** based on connection strength (synapses)
3. **Adds them up** in the cell body
4. **Fires (or not)** based on a threshold

If the total signal exceeds the threshold, the neuron "fires" and sends a signal to the next neurons.

**This is computation!** The brain is doing weighted sums and thresholds.`,
                    requiredToAdvance: true
                },
                {
                    id: 'teach2',
                    title: '📚 The Artificial Neuron (Perceptron)',
                    type: 'text',
                    content: `The artificial version:

**z = (w₁ × x₁) + (w₂ × x₂) + ... + bias**
**output = activation(z)**

Where:
- **x₁, x₂, ...** = inputs (e.g., pixel values, features)
- **w₁, w₂, ...** = weights (how important each input is)
- **bias** = baseline activation
- **activation** = a function that decides to "fire" or not

This is EXACTLY what we did in Layer 3, but now with MULTIPLE inputs!`,
                    requiredToAdvance: true
                },
                {
                    id: 'explore',
                    title: '🎮 Build a Neuron',
                    type: 'interactive',
                    content: `**Your Mission:**

1. Adjust the input values (x₁, x₂)
2. Adjust the weights (w₁, w₂) and bias
3. Watch the weighted sum and output change
4. Try to make the output 1 (neuron fires) vs 0 (doesn't fire)

**This is the building block of all neural networks!**`,
                    componentId: 'activation-viz',
                    requiredToAdvance: true
                },
                {
                    id: 'summary',
                    title: '💡 Key Takeaways',
                    type: 'text',
                    content: `**What you learned:**

✅ Artificial neurons are inspired by biological neurons

✅ output = activation(weighted_sum + bias)

✅ Weights control how much each input matters

**Key insight:** A single neuron is just a weight × input + bias function. But when we connect MANY of them... magic happens.`,
                    requiredToAdvance: true
                }
            ]
        },
        {
            id: 'l4.2.activation',
            title: 'Activation Functions',
            description: 'The decision makers.',
            xpReward: 200,
            steps: [
                {
                    id: 'hook',
                    title: '🎯 Why We Need Non-Linearity',
                    type: 'text',
                    content: `Here's a problem:

If a neuron is just: output = w × input + b

And we stack two of them: output = w₂ × (w₁ × input + b₁) + b₂

That simplifies to: output = (w₂ × w₁) × input + (w₂ × b₁ + b₂)

**It's still just a line!** No matter how many linear layers we stack, we get... a line.

To learn complex patterns, we need **non-linearity**.`,
                    requiredToAdvance: true
                },
                {
                    id: 'teach',
                    title: '📚 Common Activation Functions',
                    type: 'text',
                    content: `The **activation function** introduces non-linearity:

**1. Sigmoid: σ(x) = 1 / (1 + e^(-x))**
   - Output: 0 to 1
   - Good for: Probabilities
   - Problem: Vanishing gradient

**2. ReLU: f(x) = max(0, x)**
   - Output: 0 or x
   - Good for: Hidden layers (fast, effective)
   - Problem: Can "die" (always output 0)

**3. Tanh: f(x) = (e^x - e^(-x)) / (e^x + e^(-x))**
   - Output: -1 to 1
   - Good for: Centered outputs

**Modern networks mostly use ReLU for hidden layers, sigmoid/softmax for outputs.**`,
                    requiredToAdvance: true
                },
                {
                    id: 'explore',
                    title: '🎮 Activation Playground',
                    type: 'interactive',
                    content: `**Your Mission:**

1. Select different activation functions
2. Drag the input value left and right
3. Watch how each function transforms the input

**Key observations:**
- Sigmoid squashes to 0-1
- ReLU zeroes out negatives
- Tanh squashes to -1 to 1

These "squashing" and "filtering" behaviors are what enable complex learning.`,
                    componentId: 'activation-viz',
                    requiredToAdvance: true
                },
                {
                    id: 'summary',
                    title: '💡 Key Takeaways',
                    type: 'text',
                    content: `**What you learned:**

✅ Without activation functions, deep networks collapse to linear

✅ Activation adds the "non-linear" behavior that enables learning

✅ ReLU is the most popular for hidden layers

**Remember:** The activation function is what makes a neural network more than just matrix multiplication.`,
                    requiredToAdvance: true
                }
            ]
        },
        {
            id: 'l4.3.xor',
            title: 'The XOR Problem',
            description: 'Why single neurons aren\'t enough.',
            xpReward: 250,
            steps: [
                {
                    id: 'hook',
                    title: '🎯 The Limitation of Single Neurons',
                    type: 'text',
                    content: `In 1969, Marvin Minsky proved something devastating:

A single neuron (perceptron) **cannot learn XOR**.

XOR: 
- (0,0) → 0
- (0,1) → 1  
- (1,0) → 1
- (1,1) → 0

This is NOT linearly separable—you can't draw a single straight line to separate 0s from 1s.

This discovery almost killed AI research for a decade. Let's understand why.`,
                    requiredToAdvance: true
                },
                {
                    id: 'teach',
                    title: '📚 Linear Separability',
                    type: 'text',
                    content: `A single neuron draws a **line** (or hyperplane) to separate classes.

**AND**: Both inputs need to be high → One side of the line
**OR**: Either input high → One side of the line

These work because you CAN draw a line to separate the cases.

**XOR**: Opposite corners are the same class → **No single line works!**

**The solution:** Use MULTIPLE neurons with a HIDDEN LAYER.

The hidden layer transforms the space so XOR BECOMES linearly separable!`,
                    requiredToAdvance: true
                },
                {
                    id: 'explore',
                    title: '🎮 XOR Visualization',
                    type: 'interactive',
                    content: `**Your Mission:**

1. See the XOR points (blue = 0, red = 1)
2. Try to draw a single line that separates them
3. You can't! The opposite corners have the same color.

**This is why we need hidden layers.**

The hidden layer "warps" the space so the points BECOME separable.`,
                    componentId: 'xor-viz',
                    requiredToAdvance: true
                },
                {
                    id: 'summary',
                    title: '💡 Layer 4 Complete!',
                    type: 'text',
                    content: `**🎉 You've completed Layer 4: The Artificial Neuron.**

**Your Journey:**
✅ Artificial neurons → weighted sum + activation
✅ Activation functions → ReLU, Sigmoid, Tanh
✅ XOR problem → Single neurons can't solve everything

**The breakthrough:** Adding HIDDEN LAYERS between input and output lets us learn XOR and much more complex patterns.

**Next Up:** Layer 5 - Deep Learning
Stacking neurons into layers that can learn anything.`,
                    requiredToAdvance: true
                }
            ]
        }
    ]
};
