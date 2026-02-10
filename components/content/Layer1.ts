import { Module } from '../../types';

export const Layer1: Module = {
    id: 'layer1',
    title: 'Layer 1: Representation',
    lessons: [
        {
            id: 'l1.1.numbers',
            title: 'Numbers in the Machine',
            description: 'From bits to infinity.',
            xpReward: 100,
            steps: [
                {
                    id: 'hook',
                    title: '🎯 The Problem of Precision',
                    type: 'text',
                    content: `In Layer 0, we learned that computers only understand 0s and 1s.

But what about:
- Negative numbers like -42?
- Decimals like 3.14159?
- Really big numbers like 1,000,000,000,000?

How does a machine that only knows ON and OFF represent the full range of mathematics?

Let's find out.`,
                    requiredToAdvance: true
                },
                {
                    id: 'teach1',
                    title: '📚 Signed Integers: Handling Negatives',
                    type: 'text',
                    content: `**The Problem:** 8 bits can represent 0-255. But what about -50?

**The Solution:** We "steal" the first bit to indicate positive or negative.

- **0**xxxxxxx = Positive number
- **1**xxxxxxx = Negative number

This is called **Two's Complement**.

With 8 bits, we can now represent -128 to +127.

**Why it matters for AI:** Neural network weights are almost always negative AND positive. Without signed numbers, AI couldn't work.`,
                    requiredToAdvance: true
                },
                {
                    id: 'teach2',
                    title: '📚 Floating Point: Handling Decimals',
                    type: 'text',
                    content: `**The Problem:** How do we represent 0.0001 or 9999999.9?

**The Solution:** Scientific notation in binary!

A 32-bit float has 3 parts:
- **1 bit** for sign (+/-)
- **8 bits** for exponent (how far to move the decimal)
- **23 bits** for the actual digits (mantissa)

**Example:** 6.5 = 1.625 × 2² in binary

**Why it matters for AI:** 
- Every neural network weight is a floating point number
- GPT-4 has 1.7 TRILLION floating point weights
- Training AI = adjusting billions of decimals by tiny amounts`,
                    requiredToAdvance: true
                },
                {
                    id: 'summary',
                    title: '💡 Key Takeaways',
                    type: 'text',
                    content: `**What you learned:**

✅ **Signed integers** use one bit for +/- to handle negative numbers

✅ **Floating point** uses scientific notation to handle decimals

✅ Every number in AI—weights, gradients, predictions—uses these formats

**Real-world impact:** When you hear "32-bit" vs "64-bit", it's about how many bits are used for numbers. 64-bit = more precision = better AI.`,
                    requiredToAdvance: true
                }
            ]
        },
        {
            id: 'l1.2.text',
            title: 'Text: Words as Numbers',
            description: 'How computers read and write.',
            xpReward: 150,
            steps: [
                {
                    id: 'hook',
                    title: '🎯 The Translation Problem',
                    type: 'text',
                    content: `When you type "Hello", the keyboard doesn't send the word "Hello".

It sends: 72, 101, 108, 108, 111

These are just numbers. The computer has NO idea what "H" looks like or sounds like.

So how does text become numbers? And how do AI models like ChatGPT "understand" language if it's all just numbers?`,
                    requiredToAdvance: true
                },
                {
                    id: 'teach',
                    title: '📚 ASCII: The Universal Translator',
                    type: 'text',
                    content: `In 1963, humans agreed on a map called **ASCII** (American Standard Code for Information Interchange):

| Number | Character |
|--------|-----------|
| 65 | A |
| 66 | B |
| 97 | a |
| 48 | 0 |
| 32 | (space) |

Every letter, number, and symbol has a unique code from 0-127.

**Unicode** extends this to 150,000+ characters (emojis, Chinese, Arabic, etc.)

**Why it matters for AI:** 
When ChatGPT reads "Hello", it actually sees: [72, 101, 108, 108, 111]. The AI learns patterns in these numbers, not in "words".`,
                    requiredToAdvance: true
                },
                {
                    id: 'explore',
                    title: '🎮 ASCII Converter',
                    type: 'interactive',
                    content: `**Your Mission:**

1. Type any text in the input box
2. Watch it convert to ASCII codes in real-time
3. Try typing your name—see the numbers!

**Challenge:** What's the ASCII difference between 'A' (65) and 'a' (97)?

**Fun fact:** This difference (32) is why computers can easily convert between uppercase and lowercase.`,
                    componentId: 'ascii-converter',
                    requiredToAdvance: true
                },
                {
                    id: 'summary',
                    title: '💡 Key Takeaways',
                    type: 'text',
                    content: `**What you learned:**

✅ Computers don't understand letters—only numbers

✅ ASCII/Unicode maps every character to a unique number

✅ AI models process text as sequences of numbers, not words

**Mind-blower:** When ChatGPT writes "The answer is 42", it's actually outputting [84, 104, 101, 32, 97, 110, 115, 119, 101, 114, 32, 105, 115, 32, 52, 50] and your screen translates it back to text.`,
                    requiredToAdvance: true
                }
            ]
        },
        {
            id: 'l1.3.images',
            title: 'Images: A Grid of Colors',
            description: 'How computers "see".',
            xpReward: 200,
            steps: [
                {
                    id: 'hook',
                    title: '🎯 The Seeing Problem',
                    type: 'text',
                    content: `When you look at a photo of a cat, you instantly see "cat."

But a computer sees... 786,432 numbers.

An image is not a picture to a computer. It's a massive grid of numbers called **pixels**.

Understanding this is ESSENTIAL for computer vision and image AI.`,
                    requiredToAdvance: true
                },
                {
                    id: 'teach',
                    title: '📚 Pixels: The Atoms of Images',
                    type: 'text',
                    content: `Every image is a grid of tiny squares called **pixels**.

Each pixel has 3 color channels:
- **Red**: 0-255 (0 = no red, 255 = max red)
- **Green**: 0-255
- **Blue**: 0-255

**Examples:**
- (255, 0, 0) = Pure Red
- (0, 255, 0) = Pure Green
- (0, 0, 255) = Pure Blue
- (255, 255, 255) = White (all colors at max)
- (0, 0, 0) = Black (no light)

**A 1024×1024 image** has 1,048,576 pixels × 3 channels = 3,145,728 numbers!

**Why it matters for AI:** Image AI is just finding patterns in these millions of numbers.`,
                    requiredToAdvance: true
                },
                {
                    id: 'explore',
                    title: '🎮 Pixel Grid',
                    type: 'interactive',
                    content: `**Your Mission:**

1. Hover over pixels to see their RGB values
2. Click pixels to change their colors
3. Try to draw a simple shape

**Notice:** Each pixel is just 3 numbers. There's no "red" or "shape"—only numbers that your brain interprets as an image.

**Challenge:** Can you make pure yellow? (Hint: Red + Green = Yellow)`,
                    componentId: 'pixel-grid',
                    requiredToAdvance: true
                },
                {
                    id: 'summary',
                    title: '💡 Key Takeaways',
                    type: 'text',
                    content: `**What you learned:**

✅ Images are grids of pixels, each with 3 numbers (R, G, B)

✅ A computer doesn't "see" a cat—it sees millions of color values

✅ Image AI learns patterns in pixel values to recognize objects

**Real application:** When an AI detects faces in photos, it's finding patterns in millions of RGB numbers that correlate with "face-like" arrangements.`,
                    requiredToAdvance: true
                }
            ]
        },
        {
            id: 'l1.4.vectors',
            title: 'Vectors: The Language of AI',
            description: 'Lists of numbers that mean something.',
            xpReward: 250,
            steps: [
                {
                    id: 'hook',
                    title: '🎯 From Random Numbers to Meaning',
                    type: 'text',
                    content: `We've learned that text = numbers, images = numbers, audio = numbers.

But how does AI find MEANING in these numbers?

The secret is **vectors**—ordered lists of numbers that represent something.

Vectors are the universal language of modern AI. Every neural network, every embedding, every transformer uses vectors.`,
                    requiredToAdvance: true
                },
                {
                    id: 'teach1',
                    title: '📚 What is a Vector?',
                    type: 'text',
                    content: `A **vector** is simply an ordered list of numbers:

**Examples:**
- Position in 2D: [x, y] = [3, 5]
- RGB color: [r, g, b] = [255, 128, 0]
- Word embedding: [0.2, -0.5, 0.8, ...] (300+ dimensions!)

**Key insight:** The ORDER matters. [3, 5] is different from [5, 3].

**In AI:**
- An image is a vector of pixel values
- A word is a vector of "meaning" values (called embeddings)
- A neural network layer is a vector of activations`,
                    requiredToAdvance: true
                },
                {
                    id: 'explore1',
                    title: '🎮 Vector Plotter',
                    type: 'interactive',
                    content: `**Your Mission:**

1. Adjust the X and Y values to move the vector
2. Watch how the arrow changes direction and length
3. Try making vectors in all 4 quadrants

**Key insight:** A 2D vector has direction and magnitude (length). In AI, high-dimensional vectors work the same way, just with more dimensions!`,
                    componentId: 'vector-plotter',
                    requiredToAdvance: true
                },
                {
                    id: 'teach2',
                    title: '📚 Vector Operations: The Heart of AI',
                    type: 'text',
                    content: `AI works by doing math on vectors:

**1. Addition:** [1, 2] + [3, 4] = [4, 6]
   - Used for: Updating weights, combining features

**2. Scalar Multiplication:** 2 × [1, 2] = [2, 4]
   - Used for: Scaling gradients, learning rate

**3. Dot Product:** [1, 2] · [3, 4] = 1×3 + 2×4 = 11
   - Used for: Measuring similarity, attention scores

**The dot product is the MOST important operation in AI.** Every neural network computation is fundamentally a dot product.`,
                    requiredToAdvance: true
                },
                {
                    id: 'explore2',
                    title: '🎮 Matrix Visualization',
                    type: 'interactive',
                    content: `**Your Mission:**

1. See how vectors combine into matrices (2D grids of numbers)
2. Watch how matrix operations transform data
3. This is exactly what happens inside a neural network layer!

Every layer in a neural network is just: output = matrix × input + bias`,
                    componentId: 'matrix-viz',
                    requiredToAdvance: true
                },
                {
                    id: 'summary',
                    title: '💡 Layer 1 Complete!',
                    type: 'text',
                    content: `**🎉 Congratulations! You've completed Layer 1: Representation.**

**Your Journey:**
✅ Numbers (signed integers, floats) → How computers store values
✅ Text (ASCII) → Letters as numbers
✅ Images (pixels) → Colors as RGB triplets
✅ Vectors and Matrices → The math that powers AI

**The big picture:**
EVERYTHING in AI is represented as vectors of numbers. Text, images, audio, user preferences—all become lists of numbers that neural networks can process.

**Next Up:** Layer 2 - Functions
How do we transform these vectors into useful outputs?`,
                    requiredToAdvance: true
                }
            ]
        }
    ]
};
