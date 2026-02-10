import { Module } from '../../types';

export const Layer3: Module = {
    id: 'layer3',
    title: 'Layer 3: Learning from Mistakes',
    lessons: [
        {
            id: 'l3.1.prediction',
            title: 'Making Predictions',
            description: 'The first step is to guess.',
            xpReward: 150,
            steps: [
                {
                    id: 'hook',
                    title: '🎯 The Prediction Problem',
                    type: 'text',
                    content: `So far, we've built:
- Binary & Logic → The foundation
- Numbers, Text, Images → Representation
- Functions & Matrices → Transformation

But here's the big question: **How does a machine LEARN?**

Let's start with the simplest problem: predicting a number.

Imagine you have data: "Houses with more square feet sell for more money."

How would you build a function that predicts house prices from square footage?`,
                    requiredToAdvance: true
                },
                {
                    id: 'teach',
                    title: '📚 The Prediction Function',
                    type: 'text',
                    content: `The simplest prediction is a **linear function**:

**prediction = weight × input + bias**

Example:
- weight = 200 (dollars per square foot)
- bias = 50,000 (base price)
- input = 1000 sq ft

prediction = 200 × 1000 + 50,000 = **$250,000**

**The problem:** We don't know the right weight and bias!

**The solution:** Start with random guesses, then LEARN from mistakes.`,
                    requiredToAdvance: true
                },
                {
                    id: 'explore',
                    title: '🎮 Your First Prediction',
                    type: 'interactive',
                    content: `**Your Mission:**

1. You'll see actual house prices (the dots)
2. Adjust the weight and bias sliders
3. Try to get the prediction line to fit the data

**Notice:** You're doing MANUALLY what machine learning does AUTOMATICALLY.`,
                    componentId: 'error-viz',
                    requiredToAdvance: true
                },
                {
                    id: 'summary',
                    title: '💡 Key Takeaways',
                    type: 'text',
                    content: `**What you learned:**

✅ Prediction = weight × input + bias

✅ We start with random weights and need to find better ones

✅ The goal is to minimize the difference between prediction and reality

**Next:** How do we MEASURE how wrong our predictions are?`,
                    requiredToAdvance: true
                }
            ]
        },
        {
            id: 'l3.2.loss',
            title: 'Loss: Measuring Wrongness',
            description: 'How bad are our predictions?',
            xpReward: 200,
            steps: [
                {
                    id: 'hook',
                    title: '🎯 The Measurement Problem',
                    type: 'text',
                    content: `We made a prediction. The actual value was different.

But HOW different? And how do we turn "wrong" into a number we can minimize?

We need a **Loss Function**—a way to score how bad our predictions are.`,
                    requiredToAdvance: true
                },
                {
                    id: 'teach',
                    title: '📚 Mean Squared Error (MSE)',
                    type: 'text',
                    content: `The most common loss function is **Mean Squared Error**:

**MSE = average of (prediction - actual)²**

**Why squared?**
1. Makes all errors positive (no canceling out)
2. Punishes big errors more than small errors
3. Has nice mathematical properties for optimization

**Example:**
- Predicted: [100, 200, 150]
- Actual: [105, 195, 160]
- Errors: [-5, 5, -10]
- Squared: [25, 25, 100]
- MSE = (25 + 25 + 100) / 3 = **50**

**The goal of training: Make MSE as LOW as possible.**`,
                    requiredToAdvance: true
                },
                {
                    id: 'challenge',
                    title: '🏆 Challenge: Implement MSE',
                    type: 'challenge',
                    content: `**Your Mission:**

Write a Python function that calculates Mean Squared Error.

Steps: 1) Subtract, 2) Square, 3) Average`,
                    initialCode: `def mse_loss(predictions, targets):
    # predictions = [1, 2, 3]
    # targets = [1, 3, 5]
    # errors = [0, -1, -2]
    # squared = [0, 1, 4]
    # MSE = 5/3 = 1.666
    pass`,
                    expectedOutput: "1.666",
                    hints: [
                        "Use zip(predictions, targets) to pair them",
                        "Square each difference: (p - t) ** 2",
                        "Sum and divide by length"
                    ],
                    componentId: 'mse-challenge-code',
                    requiredToAdvance: true
                },
                {
                    id: 'summary',
                    title: '💡 Key Takeaways',
                    type: 'text',
                    content: `**What you learned:**

✅ Loss = a number measuring how wrong we are

✅ MSE = average of squared errors

✅ Training AI = minimizing the loss

**The question now:** We know our loss is 50. But how do we make it LOWER? How do we know which direction to adjust our weights?`,
                    requiredToAdvance: true
                }
            ]
        },
        {
            id: 'l3.3.gradient',
            title: 'Gradient: The Direction of Improvement',
            description: 'Which way is downhill?',
            xpReward: 250,
            steps: [
                {
                    id: 'hook',
                    title: '🎯 The Direction Problem',
                    type: 'text',
                    content: `Imagine you're blindfolded on a hilly landscape.

Your goal: Get to the lowest point (minimum loss).

You can't see, but you CAN feel the slope under your feet.

**The gradient tells you which direction is uphill.**

So you go the OPPOSITE way—downhill—toward lower loss.`,
                    requiredToAdvance: true
                },
                {
                    id: 'teach',
                    title: '📚 What is a Gradient?',
                    type: 'text',
                    content: `The **gradient** is the slope of the loss with respect to each weight.

**Calculus insight:** If Loss = f(weight), then gradient = dLoss/dWeight

**What it tells us:**
- Gradient > 0 → Increasing weight INCREASES loss → Go DOWN (decrease weight)
- Gradient < 0 → Increasing weight DECREASES loss → Go UP (increase weight)
- Gradient = 0 → You're at a flat spot (possibly the minimum!)

**The gradient points toward higher loss.** We go the opposite direction.`,
                    requiredToAdvance: true
                },
                {
                    id: 'explore',
                    title: '🎮 Gradient Visualization',
                    type: 'interactive',
                    content: `**Your Mission:**

1. See the loss curve (like a bowl shape)
2. Drag the ball to different positions
3. Watch the gradient arrow show the slope
4. Notice: The arrow always points UPHILL

**Key insight:** Gradient Descent = Keep going opposite to the gradient until you reach the bottom.`,
                    componentId: 'gradient-viz',
                    requiredToAdvance: true
                },
                {
                    id: 'summary',
                    title: '💡 Key Takeaways',
                    type: 'text',
                    content: `**What you learned:**

✅ Gradient = slope of loss with respect to weights

✅ It tells us which direction INCREASES loss

✅ We go the OPPOSITE direction to decrease loss

**The algorithm:** weight_new = weight_old - learning_rate × gradient`,
                    requiredToAdvance: true
                }
            ]
        },
        {
            id: 'l3.4.gradient_descent',
            title: 'Gradient Descent: The Learning Algorithm',
            description: 'Step by step toward the answer.',
            xpReward: 300,
            steps: [
                {
                    id: 'hook',
                    title: '🎯 Putting It All Together',
                    type: 'text',
                    content: `We have all the pieces:
- A prediction function with weights
- A loss function to measure errors
- A gradient to tell us which way to improve

Now we put them together into the **Gradient Descent** algorithm—the engine that powers all of AI.`,
                    requiredToAdvance: true
                },
                {
                    id: 'teach',
                    title: '📚 The Gradient Descent Algorithm',
                    type: 'text',
                    content: `**The Algorithm:**

\`\`\`
1. Initialize weights randomly
2. REPEAT:
   a. Make predictions using current weights
   b. Calculate loss (how wrong are we?)
   c. Compute gradient (which way is downhill?)
   d. Update weights: w = w - learning_rate × gradient
3. UNTIL loss is low enough
\`\`\`

**Learning Rate:**
- Too high → Overshoot the minimum, bounce around
- Too low → Take forever to converge
- Just right → Smooth path to the solution

**This is HOW every AI model learns.** From simple linear regression to GPT-4.`,
                    requiredToAdvance: true
                },
                {
                    id: 'explore',
                    title: '🎮 Gradient Descent Game',
                    type: 'interactive',
                    content: `**Your Mission:**

1. Watch the ball roll downhill (gradient descent in action)
2. Adjust the learning rate
3. See what happens with too high / too low values

**Goal:** Find the learning rate that reaches the minimum fastest without overshooting.`,
                    componentId: 'gradient-descent-game',
                    requiredToAdvance: true
                },
                {
                    id: 'summary',
                    title: '💡 Layer 3 Complete!',
                    type: 'text',
                    content: `**🎉 Congratulations! You've completed Layer 3: Learning from Mistakes.**

**Your Journey:**
✅ Predictions → weight × input + bias
✅ Loss (MSE) → Measuring how wrong we are
✅ Gradient → Direction of steepest increase
✅ Gradient Descent → Iteratively improving weights

**The big picture:**
Every AI "learns" by: Making predictions → Measuring errors → Computing gradients → Updating weights → Repeating

**Next Up:** Layer 4 - The Neuron
What if we stack many of these "learners" together?`,
                    requiredToAdvance: true
                }
            ]
        }
    ]
};
