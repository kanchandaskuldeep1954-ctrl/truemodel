import { Module } from '../../types';

export const Layer7: Module = {
    id: 'layer7',
    title: 'Layer 7: Computer Vision — The Shared Eye',
    lessons: [
        // ═══════════════════════════════════════════════════════════
        // CHAPTER 1: THE FILTER (CONVOLUTION)
        // ═══════════════════════════════════════════════════════════
        {
            id: 'l7.1.convolution',
            title: 'The Filter',
            description: 'The mathematical operation that gave computers sight.',
            xpReward: 150,
            steps: [
                {
                    id: 'hook',
                    title: '🎯 The "Where is Waldo" Problem',
                    type: 'text',
                    content: `Imagine I ask you to find a specific face in a crowd.

You don't look at the entire crowd at once.
You scan your eyes across the image, looking for the pattern (glasses, hat) **locally**.

When you find the pattern, your brain signals "MATCH!"

This act of **Scanning** and **Matching** is exactly what a Convolution is.`,
                    requiredToAdvance: true
                },
                {
                    id: 'teach-conv',
                    title: '📚 The Sliding Window',
                    type: 'text',
                    content: `In a standard Neural Network (Layer 5), every pixel connects to every neuron.
- 4K Image = 8,000,000 inputs.
- Layer 1 = Billions of weights.
- Result: **Overfitting & Explosion.**

**The Convolutional Solution:**
Instead of looking at the whole image, we use a tiny 3x3 grid of weights called a **Filter** (or Kernel).

We verify if the filter matches top-left.
Then we slide it one pixel right.
Then we slide it again.

We use the **SAME** 9 weights to scan the ENTIRE image.`,
                    requiredToAdvance: true
                },
                {
                    id: 'explore-conv',
                    title: '🎮 The Scanner',
                    type: 'interactive',
                    content: `**Your Mission:**

1. Watch the **3x3 Filter** (Yellow box) slide over the input image.
2. At every spot, it does a Dot Product (Pixel × Weight).
3. **High Score** = Pattern Match (Bright white in output).
4. **Low Score** = No match (Black in output).

This output grid is called a **Feature Map**. It tells us WHERE the pattern was found.`,
                    componentId: 'convolution-viz',
                    requiredToAdvance: true
                },
                {
                    id: 'bridge',
                    title: '🌉 One Filter, One Feature',
                    type: 'text',
                    content: `We just saw one filter scanning the image.
Maybe it was looking for a "Vertical Edge".

But an image is more than just vertical edges.
It has Horizontal edges. Corners. Curves. Colors.

To see the whole picture, we need a **Gallery of Filters.**`,
                    requiredToAdvance: true
                }
            ]
        },
        // ═══════════════════════════════════════════════════════════
        // CHAPTER 2: THE FEATURES (HIERARCHY)
        // ═══════════════════════════════════════════════════════════
        {
            id: 'l7.2.features',
            title: 'The Features',
            description: 'Building reality from scratch.',
            xpReward: 200,
            steps: [
                {
                    id: 'hook',
                    title: '🎯 Edges -> Shapes -> Objects',
                    type: 'text',
                    content: `How do you recognize a Car?
- It has Wheels (Circles).
- It has Windows (Rectangles).

How do you recognize a Rectangle?
- It has Vertical lines.
- It has Horizontal lines.

This is the **Hierarchy of Vision.**
Deep Learning mimics this perfectly.
- Layer 1 finds Lines.
- Layer 2 finds Shapes.
- Layer 3 finds Cars.`,
                    requiredToAdvance: true
                },
                {
                    id: 'teach-filters',
                    title: '📚 The Filter Bank',
                    type: 'text',
                    content: `In a real CNN, we don't pick the filters.
The AI **LEARNS** them.

- **Edge Filter:** \`[-1, 1]\` (Detects contrast changes)
- **Blur Filter:** \`[0.1, ...]\` (Smooths noise)
- **Sharpen Filter:** Enhances details.

A typical CNN learns 32 filters in the first layer, then 64, then 128...`,
                    requiredToAdvance: true
                },
                {
                    id: 'explore-filters',
                    title: '🎮 The Filter Gallery',
                    type: 'interactive',
                    content: `**Your Mission:**

1. Click different filters (Edge, Sharpen, Emboss).
2. See "What the AI Sees".
3. **Edge Detection** makes everything black except the outlines. This is PERFECT for the AI to understand magnitude and shape.

**Insight:** The AI doesn't see "pixels". It sees "edges" and "textures".`,
                    componentId: 'filter-gallery',
                    requiredToAdvance: true
                },
                {
                    id: 'quiz-filters',
                    title: '🧠 Understanding Check',
                    type: 'quiz',
                    content: `Let's verify.`,
                    quizQuestion: 'Why do we use the SAME filter to scan the entire image (Weight Sharing)?',
                    quizOptions: [
                        'Because we are lazy',
                        'To save memory',
                        'Because a feature (like a vertical edge) is the same concept regardless of where it appears in the image',
                        'Because pixels are square'
                    ],
                    quizCorrectIndex: 2,
                    quizExplanation: 'Exactly. "Translation Invariance". A cat in the top-left is still a cat. We don\'t need new weights to learn "corner-cat".',
                    requiredToAdvance: true
                },
                {
                    id: 'bridge',
                    title: '🌉 The Curse of Detail',
                    type: 'text',
                    content: `We have feature maps.
But they are HUGE. They are the same size as the image!

If we keep them this big, our network will be slow and will overfit to tiny details.
("Oh no, the cat moved 1 pixel to the right! I don't know what it is anymore!")

We need to zoom out. We need to **Squint.**`,
                    requiredToAdvance: true
                }
            ]
        },
        // ═══════════════════════════════════════════════════════════
        // CHAPTER 3: THE SHRINK (POOLING)
        // ═══════════════════════════════════════════════════════════
        {
            id: 'l7.3.pooling',
            title: 'The Shrink',
            description: 'Why squinting helps you see better.',
            xpReward: 200,
            steps: [
                {
                    id: 'hook',
                    title: '🎯 Information Density',
                    type: 'text',
                    content: `Imagine a 4x4 block of pixels.
- Pixel 1: "I found an edge! (Score 0.9)"
- Pixel 2: "I found a weak edge (Score 0.1)"
- Pixel 3: "Nothing (Score 0.0)"
- Pixel 4: "Nothing (Score 0.0)"

Do we need to keep all 4 numbers?
No. All that matters is: **"Yes, there is an edge in this general area."**`,
                    requiredToAdvance: true
                },
                {
                    id: 'teach-pool',
                    title: '📚 Max Pooling',
                    type: 'text',
                    content: `**Pooling** is the process of downsampling.
The most common type is **Max Pooling (2x2).**

Rules:
1. Look at a 2x2 grid (4 numbers).
2. **Keep only the BIGGEST number.**
3. Throw away the rest.

**Result:**
- Image size shrinks by half (Width/2, Height/2).
- Computation drops by 75%.
- The network becomes robust to small movements.`,
                    requiredToAdvance: true
                },
                {
                    id: 'explore-pool',
                    title: '🎮 Shrink the Map',
                    type: 'interactive',
                    content: `**Your Mission:**

1. See the input grid (4x4).
2. Watch the **Red Box** find the Max value in each region.
3. See the output grid (2x2).

**Notice:** The "Max" value is preserved. The spatial information is compressed. We traded "Where" for "What".`,
                    componentId: 'pooling-viz',
                    requiredToAdvance: true
                },
                {
                    id: 'bridge',
                    title: '🌉 Putting It All Together',
                    type: 'text',
                    content: `We have the pieces:
1. **Convolution** (Feature Extraction)
2. **ReLU** (Non-Linearity)
3. **Pooling** (Downsampling)

If we stack these in a sandwich, we get the **Convolutional Neural Network (CNN).**

Lets build one that can actually read.`,
                    requiredToAdvance: true
                }
            ]
        },
        // ═══════════════════════════════════════════════════════════
        // CHAPTER 4: THE EYE (CAPSTONE)
        // ═══════════════════════════════════════════════════════════
        {
            id: 'l7.4.capstone',
            title: 'The Eye',
            description: 'Building a machine that can read.',
            xpReward: 300,
            steps: [
                {
                    id: 'hook',
                    title: '🎯 The "Hello World" of Vision',
                    type: 'text',
                    content: `In 1998, Yann LeCun built LeNet-5.
It was the first CNN to read handwritten digits on checks.

Today, this is the "Hello World" of AI: **MNIST.**
Identifying handwritten digits (0-9).

Let's look inside a trained brain as it reads a number.`,
                    requiredToAdvance: true
                },
                {
                    id: 'teach-architecture',
                    title: '📚 The Architecture',
                    type: 'text',
                    content: `**The Standard ConvNet Recipe:**

1. **Input:** 28x28 grayscale image.
2. **Conv Layer 1:** Finds edges/curves.
3. **Pool Layer 1:** Shrinks to 14x14.
4. **Conv Layer 2:** Finds loops/lines.
5. **Pool Layer 2:** Shrinks to 7x7.
6. **Flatten:** Turn grid into a long vector.
7. **Dense Layer:** Connect everything to 10 outputs (0-9).`,
                    requiredToAdvance: true
                },
                {
                    id: 'explore-mnist',
                    title: '🎮 The Digit Recognizer',
                    type: 'interactive',
                    content: `**Your Mission:**

1. **Draw** a digit (0-9) in the box.
2. Watch the **Probabilities** update in real-time.
3. Try to trick it!
   - Draw a sloppy '7'.
   - Draw a weird '4'.

**Observe:** The bar graph shows the AI's confidence. This is the Softmax output!`,
                    componentId: 'digit-recognizer-lesson',
                    requiredToAdvance: true
                },
                {
                    id: 'layer-complete',
                    title: '🏆 Layer 7 Complete!',
                    type: 'text',
                    content: `**🎉 You've completed Layer 7: Computer Vision.**

**Your Journey:**
1. **Convolution:** Scanning with shared weights.
2. **Features:** Constructing complex objects from simple edges.
3. **Pooling:** Summarizing for robustness.
4. **CNNs:** The architecture that drives self-driving cars, FaceID, and medical imaging.

**Next Up: Layer 8 - Recurrent Neural Networks.**
Images are static. But the world is a movie.
How do we handle Time?`,
                    requiredToAdvance: true
                }
            ]
        }
    ]
};
