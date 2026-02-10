import { Module } from '../../types';

export const Layer6: Module = {
    id: 'layer6',
    title: 'Layer 6: Training Deep Networks',
    lessons: [
        {
            id: 'l6.1.vanishing_gradient',
            title: 'The Vanishing Gradient Problem',
            description: 'Why deep networks were hard.',
            xpReward: 200,
            steps: [
                {
                    id: 'hook',
                    title: '🎯 The Depth Problem',
                    type: 'text',
                    content: `In theory, deeper networks should be better—more layers = more learning.

But for decades, deep networks didn't work. Adding more layers made accuracy WORSE.

The culprit? **Vanishing Gradients**.

Let's understand this critical problem that held back AI for years.`,
                    requiredToAdvance: true
                },
                {
                    id: 'teach',
                    title: '📚 Why Gradients Vanish',
                    type: 'text',
                    content: `Remember: we update weights using gradients from backpropagation.

**The problem with Sigmoid activation:**

Sigmoid's derivative is at most 0.25.

In a 10-layer network:
- Layer 10 gradient: 1.0
- Layer 9 gradient: 0.25 × 1.0 = 0.25
- Layer 8 gradient: 0.25 × 0.25 = 0.0625
- ...
- Layer 1 gradient: 0.25^10 = **0.0000001**

**The early layers get almost zero gradient!** They can't learn.

It's like playing "telephone"—the message gets lost by the time it reaches the first person.`,
                    requiredToAdvance: true
                },
                {
                    id: 'explore',
                    title: '🎮 Vanishing Gradient Visualization',
                    type: 'interactive',
                    content: `**Your Mission:**

1. Start with Sigmoid activation and 5 layers
2. Watch how the gradient bars shrink toward the early layers
3. Now switch to ReLU activation
4. Notice: ReLU maintains strong gradients through all layers!

**Toggle between Sigmoid and ReLU** to see the difference.`,
                    componentId: 'vanishing-gradient-viz',
                    requiredToAdvance: true
                },
                {
                    id: 'summary',
                    title: '💡 Key Takeaways',
                    type: 'text',
                    content: `**What you learned:**

✅ Sigmoid derivatives multiply and shrink gradients

✅ Early layers in deep networks get tiny gradients and can't learn

✅ ReLU fixes this—its derivative is 1 for positive inputs

**The ReLU breakthrough (2010s):** Simply switching from Sigmoid to ReLU allowed networks to go from 3 layers to 100+ layers.`,
                    requiredToAdvance: true
                }
            ]
        },
        {
            id: 'l6.2.optimizers',
            title: 'Optimizers: Smarter Learning',
            description: 'Beyond basic gradient descent.',
            xpReward: 250,
            steps: [
                {
                    id: 'hook',
                    title: '🎯 The Speed Problem',
                    type: 'text',
                    content: `Basic gradient descent works, but it's SLOW.

Imagine a ball rolling down a valley:
- In steep directions, it goes fast
- In flat directions, it goes slow

What if the path to the minimum is flat in one direction and steep in another? The ball zigzags inefficiently.

**Optimizers** are smarter algorithms that navigate faster.`,
                    requiredToAdvance: true
                },
                {
                    id: 'teach',
                    title: '📚 Modern Optimizers',
                    type: 'text',
                    content: `**1. Momentum:** Add "velocity" to the ball
   - Remembers which direction it was going
   - Builds up speed in consistent directions
   - Like a ball rolling downhill, gathering momentum

**2. Adam (Adaptive Moment Estimation):**
   - Adapts the learning rate for each weight
   - Weights that need big updates get big steps
   - Weights that need small updates get small steps
   - Combines momentum + adaptive rates

**Adam is the default optimizer** for most deep learning. It just works.`,
                    requiredToAdvance: true
                },
                {
                    id: 'explore',
                    title: '🎮 Optimizer Race',
                    type: 'interactive',
                    content: `**Your Mission:**

1. Select different optimizers (SGD, Momentum, Adam)
2. Click "Run Optimization" to start
3. Watch how they navigate the loss surface
4. Notice which one reaches the minimum fastest!

**Key observation:** Adam adapts and finds the path quickly, while SGD zigzags.`,
                    componentId: 'optimizer-viz',
                    requiredToAdvance: true
                },
                {
                    id: 'summary',
                    title: '💡 Key Takeaways',
                    type: 'text',
                    content: `**What you learned:**

✅ Momentum adds velocity to escape shallow regions

✅ Adam adapts learning rates per weight

✅ Modern optimizers train networks 10-100x faster than basic SGD

**Pro tip:** Just use Adam. It's the default for a reason.`,
                    requiredToAdvance: true
                }
            ]
        },
        {
            id: 'l6.3.regularization',
            title: 'Regularization: Preventing Overfitting',
            description: 'Don\'t memorize, generalize.',
            xpReward: 250,
            steps: [
                {
                    id: 'hook',
                    title: '🎯 The Memorization Problem',
                    type: 'text',
                    content: `A student who memorizes test answers will ace practice tests but fail real exams.

Neural networks can do the same thing—**overfit** to training data without learning general patterns.

How do we make networks that GENERALIZE to new data they've never seen?`,
                    requiredToAdvance: true
                },
                {
                    id: 'teach',
                    title: '📚 Dropout: Forced Generalization',
                    type: 'text',
                    content: `**Dropout** is brilliantly simple:

During training, randomly "turn off" neurons (set output to 0).

Each training step uses a DIFFERENT random subset of neurons.

**Why it works:**
- No single neuron can memorize—it might be dropped!
- The network learns REDUNDANT representations
- It's like studying with randomly missing notes—you have to really understand

**At test time:** All neurons are ON, but outputs are scaled down.

**Typical dropout rate:** 20-50% of neurons dropped each step.`,
                    requiredToAdvance: true
                },
                {
                    id: 'explore',
                    title: '🎮 Dropout Visualization',
                    type: 'interactive',
                    content: `**Your Mission:**

1. Watch neurons randomly drop out during "Training Mode"
2. See how different neurons are active each step
3. Switch to "Inference Mode" to see all neurons active

**Key insight:** By training with random dropout, the network can't rely on any single path—it must learn robust features.`,
                    componentId: 'dropout-viz',
                    requiredToAdvance: true
                },
                {
                    id: 'summary',
                    title: '💡 Layer 6 Complete!',
                    type: 'text',
                    content: `**🎉 You've completed Layer 6: Training Deep Networks!**

**Your Journey:**
✅ Vanishing gradients → ReLU solves it
✅ Optimizers → Adam for smart, fast training
✅ Regularization → Dropout prevents overfitting

**The toolkit for training deep networks:**
1. Use ReLU activation
2. Use Adam optimizer
3. Add Dropout for regularization
4. Profit

**Next Up:** Layer 7 - Convolutional Neural Networks
How do we build networks specifically designed for images?`,
                    requiredToAdvance: true
                }
            ]
        }
    ]
};
