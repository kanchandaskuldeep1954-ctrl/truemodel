import { Module } from '../../types';

export const Layer7: Module = {
    id: 'layer7',
    title: 'Layer 7: Convolutional Neural Networks',
    lessons: [
        {
            id: 'l7.1.convolution',
            title: 'The Convolution Operation',
            description: 'How computers see patterns.',
            xpReward: 250,
            steps: [
                {
                    id: 'hook',
                    title: '🎯 The Problem with Images',
                    type: 'text',
                    content: `A 256×256 image has 196,608 pixels.

If we connect every pixel to every neuron (fully connected), we get BILLIONS of weights.

That's too many—the network would overfit instantly.

**Convolutional Neural Networks (CNNs)** solve this with a clever trick: **weight sharing** using filters.`,
                    requiredToAdvance: true
                },
                {
                    id: 'teach',
                    title: '📚 What is Convolution?',
                    type: 'text',
                    content: `**Convolution** slides a small filter (kernel) across the image:

**Filter (3×3):**
\`\`\`
[-1  0  1]
[-2  0  2]
[-1  0  1]
\`\`\`

**At each position:**
1. Place the filter on the image
2. Multiply corresponding elements
3. Sum them all → One output value
4. Move to the next position → Repeat

**The key insight:** The SAME filter is used everywhere.
- 9 weights instead of millions
- Detects the SAME pattern anywhere in the image
- A "edge detector" finds edges whether they're top-left or bottom-right`,
                    requiredToAdvance: true
                },
                {
                    id: 'explore',
                    title: '🎮 Convolution Visualizer',
                    type: 'interactive',
                    content: `**Your Mission:**

1. Watch the filter slide across the input image
2. See how each position produces one output value
3. The output (feature map) shows where the pattern was detected

**Notice:** Bright spots in the output = the filter found its pattern there!`,
                    componentId: 'convolution-viz',
                    requiredToAdvance: true
                },
                {
                    id: 'summary',
                    title: '💡 Key Takeaways',
                    type: 'text',
                    content: `**What you learned:**

✅ Convolution slides a filter across the image

✅ Same filter = same weights everywhere = detects patterns anywhere

✅ Output is a "feature map" showing where the pattern was found

**Why it matters:** This is why CNNs can recognize a cat whether it's in the corner or the center of the photo.`,
                    requiredToAdvance: true
                }
            ]
        },
        {
            id: 'l7.2.filters',
            title: 'Filters: Pattern Detectors',
            description: 'What filters actually detect.',
            xpReward: 200,
            steps: [
                {
                    id: 'hook',
                    title: '🎯 Different Filters, Different Features',
                    type: 'text',
                    content: `Each filter detects a DIFFERENT pattern.

In a trained CNN:
- Early layers: edges, colors, textures
- Middle layers: shapes, parts (eyes, wheels)
- Deep layers: objects, faces, concepts

The network LEARNS which filters to use during training.`,
                    requiredToAdvance: true
                },
                {
                    id: 'teach',
                    title: '📚 Classic Filter Types',
                    type: 'text',
                    content: `**Edge Detection (Sobel):**
\`\`\`
[-1 0 1]     Detects vertical edges
[-2 0 2]
[-1 0 1]
\`\`\`

**Blur (Average):**
\`\`\`
[1/9 1/9 1/9]     Smooths the image
[1/9 1/9 1/9]
[1/9 1/9 1/9]
\`\`\`

**Sharpen:**
\`\`\`
[0  -1  0]     Enhances edges
[-1  5 -1]
[0  -1  0]
\`\`\`

**In a CNN:** The network learns its OWN filters that best help classify images.`,
                    requiredToAdvance: true
                },
                {
                    id: 'explore',
                    title: '🎮 Filter Gallery',
                    type: 'interactive',
                    content: `**Your Mission:**

1. Select different filter types (Edge, Blur, Sharpen, Emboss)
2. See how each filter transforms the test image
3. Notice what features each filter highlights

**Key insight:** CNNs learn 100s of filters like these—each detecting something useful.`,
                    componentId: 'filter-gallery',
                    requiredToAdvance: true
                },
                {
                    id: 'summary',
                    title: '💡 Key Takeaways',
                    type: 'text',
                    content: `**What you learned:**

✅ Different filters detect different patterns

✅ Edge filters find boundaries, blur filters smooth

✅ CNNs LEARN which filters best solve the task

**Real application:** ImageNet-trained CNNs have learned filters for eyes, fur, wheels, text—all automatically!`,
                    requiredToAdvance: true
                }
            ]
        },
        {
            id: 'l7.3.pooling',
            title: 'Pooling: Shrinking & Summarizing',
            description: 'Making features robust.',
            xpReward: 200,
            steps: [
                {
                    id: 'hook',
                    title: '🎯 The Size Problem',
                    type: 'text',
                    content: `After convolution, we still have a large feature map.

We want to:
1. Reduce the size (less computation)
2. Make features more robust to small shifts
3. Focus on "what" was detected, not "exactly where"

**Pooling** summarizes regions of the feature map.`,
                    requiredToAdvance: true
                },
                {
                    id: 'teach',
                    title: '📚 How Pooling Works',
                    type: 'text',
                    content: `**Max Pooling (most common):**
- Take a 2×2 window
- Output the MAXIMUM value
- Move to the next window

\`\`\`
[1 3]     Max Pooling
[5 2]  →  [6]
becomes the maximum: 5? No wait...
\`\`\`

Actually: [1,3,5,2] → max = 5

**Why max pooling works:**
- If a feature was detected ANYWHERE in the window, we keep it
- A cat eye detected at (10,10) vs (11,11) both become feature present

**Average Pooling:** Takes the average instead of max.`,
                    requiredToAdvance: true
                },
                {
                    id: 'explore',
                    title: '🎮 Pooling Visualization',
                    type: 'interactive',
                    content: `**Your Mission:**

1. Toggle between Max Pooling and Average Pooling
2. Step through the pooling operation
3. Watch how a 4×4 becomes 2×2

**Notice:** Max pooling keeps the strongest activations. Average pooling smooths them.`,
                    componentId: 'pooling-viz',
                    requiredToAdvance: true
                },
                {
                    id: 'summary',
                    title: '💡 Layer 7 Complete!',
                    type: 'text',
                    content: `**🎉 You've completed Layer 7: Convolutional Neural Networks!**

**Your Journey:**
✅ Convolution → Sliding filters detect patterns
✅ Learned filters → Network discovers useful features
✅ Pooling → Shrinks and summarizes feature maps

**The CNN Architecture:**
Input → [Conv → ReLU → Pool] × N → Fully Connected → Output

This architecture powers:
- Image classification (Is this a cat?)
- Object detection (Where are the cars?)
- Face recognition (Who is this?)

**Next Up:** Layer 8 - Recurrent Neural Networks
How do we process SEQUENCES like text and audio?`,
                    requiredToAdvance: true
                }
            ]
        }
    ]
};
