import { Module } from '../../types';

export const Layer1: Module = {
    id: 'layer1',
    title: 'Layer 1: Representation — How Data Becomes Numbers',
    lessons: [
        // ═══════════════════════════════════════════════════════════
        // CHAPTER 1: COUNTING WITH LIGHT
        // ═══════════════════════════════════════════════════════════
        {
            id: 'l1.1.counting',
            title: 'Counting with Light',
            description: 'You have 8 lightbulbs. How high can you count?',
            xpReward: 120,
            steps: [
                {
                    id: 'hook',
                    title: '🎯 The Lightbulb Challenge',
                    type: 'text',
                    content: `In Layer 0, you built switches from transistors. Each switch has exactly two states: **ON** or **OFF**.

Now here's a question that changed the world:

**If you have 8 switches (lightbulbs), how many different PATTERNS can you make?**

Think about it. Each bulb is independently ON or OFF. The first can be 2 ways, the second can be 2 ways...

This question is the foundation of how EVERY computer stores EVERY piece of data.`,
                    requiredToAdvance: true
                },
                {
                    id: 'explore-bulbs',
                    title: '🔬 The 8-Bulb Experiment',
                    type: 'interactive',
                    content: `**Try it yourself!** Toggle each lightbulb ON or OFF.

Watch the counter — it shows how many unique patterns you've discovered so far.

**Your Goal:** Figure out the TOTAL number of possible patterns with 8 bulbs.

**Hint:** Start small. How many patterns can 1 bulb make? How about 2 bulbs? See a pattern?`,
                    componentId: 'binary-counter',
                    requiredToAdvance: true
                },
                {
                    id: 'deep-powers',
                    title: '🧠 The Power of 2',
                    type: 'text',
                    content: `Here's the math behind what you just discovered:

**1 bulb** → 2 patterns (ON, OFF)
**2 bulbs** → 2 × 2 = **4** patterns
**3 bulbs** → 2 × 2 × 2 = **8** patterns
**4 bulbs** → 2⁴ = **16** patterns
**8 bulbs** → 2⁸ = **256** patterns

Every time you add ONE bulb, the number of patterns **DOUBLES**.

This is called a **power of 2**. It's why computer memory always comes in sizes like 256, 512, 1024, 2048...

These aren't arbitrary numbers — they're all powers of 2!`,
                    requiredToAdvance: true
                },
                {
                    id: 'math-derive',
                    title: '📐 Why 2ⁿ? Let\'s Derive It',
                    type: 'text',
                    content: `Let's prove this from scratch. Why is the formula **2ⁿ**?

**Think of it as a decision tree:**

Each bulb makes an independent choice: ON or OFF. That's 2 options.

If bulb 1 has 2 options, and for EACH of those options, bulb 2 has 2 options...

That's 2 × 2 = 4 total paths through the tree.

Add bulb 3? Each of those 4 paths splits into 2 more: 4 × 2 = 8.

**General rule:** n independent binary choices = 2 × 2 × ... × 2 (n times) = **2ⁿ**

This is called the **fundamental counting principle** — and it's the reason computers work the way they do.`,
                    requiredToAdvance: true
                },
                {
                    id: 'quiz-patterns',
                    title: '🧠 Understanding Check',
                    type: 'quiz',
                    content: `Let's make sure this clicks before moving on.`,
                    quizQuestion: 'How many unique patterns can 16 lightbulbs make?',
                    quizOptions: [
                        '256 (that\'s 2⁸)',
                        '32 (that\'s 2 × 16)',
                        '65,536 (that\'s 2¹⁶)',
                        '16 (that\'s just the count)'
                    ],
                    quizCorrectIndex: 2,
                    quizExplanation: 'Exactly! 2¹⁶ = 65,536. Each lightbulb doubles the patterns, so 16 bulbs give us 2¹⁶ = 65,536 unique patterns. Your computer uses similar math — a 64-bit processor works with 2⁶⁴ ≈ 18 quintillion patterns!',
                    requiredToAdvance: true
                },
                {
                    id: 'real-world',
                    title: '🌍 This Math Powers YOUR Phone',
                    type: 'text',
                    content: `Let's connect this to the real world:

**Your phone has 128 GB of storage.** That's 128 × 8 billion = **1 trillion bits.**

Each bit is one of our lightbulbs. A single transistor. ON or OFF.

The number of possible states your phone can be in? **2^(1,000,000,000,000)**.

That number is so large that writing it out would take more paper than atoms in the observable universe.

**All from the simple idea of ON and OFF.**

But we have a problem...`,
                    requiredToAdvance: true
                },
                {
                    id: 'bridge',
                    title: '🌉 But How Do We Count Below Zero?',
                    type: 'text',
                    content: `We can count from 0 to 255 with 8 bits. Great.

But **what about -42?** What about **-0.001?**

A lightbulb can't be "negative ON." There's no "-1" state for a transistor.

So how does a computer represent negative numbers using ONLY 1s and 0s?

This is the problem we solve next — and the answer is genuinely clever.`,
                    requiredToAdvance: true
                }
            ]
        },
        // ═══════════════════════════════════════════════════════════
        // CHAPTER 2: THE NEGATIVE PROBLEM
        // ═══════════════════════════════════════════════════════════
        {
            id: 'l1.2.negatives',
            title: 'The Negative Problem',
            description: 'How do lightbulbs represent -42?',
            xpReward: 130,
            steps: [
                {
                    id: 'hook',
                    title: '🎯 The Impossible Number',
                    type: 'text',
                    content: `Here's a brain teaser:

You have 8 lightbulbs. Each is ON (1) or OFF (0). You can make 256 patterns (0 to 255).

Now I say: **"Represent the number -5."**

You stare at the bulbs. There's no "negative" lightbulb. No minus button.

How would YOU solve this? Pause and think about it for a moment...

**Constraint:** You can ONLY use ON and OFF. No new hardware.`,
                    requiredToAdvance: true
                },
                {
                    id: 'intuition',
                    title: '💡 The Number Line Trick',
                    type: 'text',
                    content: `Here's the clever insight humans came up with:

**What if we just SPLIT the range in half?**

Instead of 0 to 255, we say:
- The **first half** (0 to 127) = positive numbers
- The **second half** (128 to 255) = negative numbers

We "sacrifice" half our positive range to get negatives.

It's like a clock: after 12, it wraps around. After 127, we wrap to -128.

**We give up the ability to count to 255 in exchange for the ability to go negative.**

This tradeoff is fundamental — you'll see it again and again in computer science.`,
                    requiredToAdvance: true
                },
                {
                    id: 'deep-twos',
                    title: '🧠 Two\'s Complement: The Actual Method',
                    type: 'text',
                    content: `The real system is called **Two's Complement**, and it's elegantly simple:

**Rule:** The leftmost bit is the **sign bit**.
- **0**xxxxxxx = Positive (0 to 127)
- **1**xxxxxxx = Negative (-128 to -1)

**How to make -5 from +5:**
1. Write +5 in binary: **00000101**
2. Flip all bits: **11111010**
3. Add 1: **11111011** ← This is -5!

**Why this weird method?** Because addition still works normally!

5 + (-5) = 00000101 + 11111011 = **100000000**

That extra bit overflows and vanishes, leaving **00000000** = 0. *Beautiful.*`,
                    requiredToAdvance: true
                },
                {
                    id: 'quiz-negative',
                    title: '🧠 Understanding Check',
                    type: 'quiz',
                    content: `Let's check your understanding of signed integers.`,
                    quizQuestion: 'In 8-bit Two\'s Complement, the pattern 11111111 represents:',
                    quizOptions: [
                        '255 (the maximum positive number)',
                        '-1 (one below zero)',
                        '-128 (the most negative number)',
                        '0 (zero, but negative)'
                    ],
                    quizCorrectIndex: 1,
                    quizExplanation: 'Correct! In Two\'s Complement, 11111111 = -1. Try the inversion: flip all bits → 00000000, add 1 → 00000001 = 1. So the original was -1. The most negative 8-bit number is 10000000 = -128.',
                    requiredToAdvance: true
                },
                {
                    id: 'why-ai',
                    title: '🔥 Why AI NEEDS Negative Numbers',
                    type: 'text',
                    content: `This isn't just a computer science trivia fact. **AI literally cannot work without signed numbers.**

Every neural network has **weights** — numbers that control how strongly signals connect.

- A **positive weight** (+0.7) means "this input is HELPFUL for the prediction"
- A **negative weight** (-0.3) means "this input HURTS the prediction"
- A **zero weight** (0.0) means "ignore this input"

**GPT-4 has 1.7 TRILLION weights.** Roughly half of them are negative.

If we could only use positive numbers, AI couldn't learn what to AVOID — only what to look for. That's like a brain that can love but never fear. Useless for survival.`,
                    requiredToAdvance: true
                },
                {
                    id: 'bridge',
                    title: '🌉 But What About 3.14...?',
                    type: 'text',
                    content: `We can now count positives AND negatives. Progress!

But nature doesn't deal in whole numbers. Temperature is 98.6°F. Pi is 3.14159...

**How does a computer handle decimal points with only 1s and 0s?**

This is the trickiest number problem of all — and it has a surprising flaw that causes real bugs in real software. NASA once lost a spacecraft because of it.`,
                    requiredToAdvance: true
                }
            ]
        },
        // ═══════════════════════════════════════════════════════════
        // CHAPTER 3: THE DECIMAL PROBLEM
        // ═══════════════════════════════════════════════════════════
        {
            id: 'l1.3.decimals',
            title: 'The Decimal Problem',
            description: 'Why 0.1 + 0.2 ≠ 0.3 in computers.',
            xpReward: 150,
            steps: [
                {
                    id: 'hook',
                    title: '🎯 The Bug That Ships With Every Computer',
                    type: 'text',
                    content: `Open any programming language and type:

**0.1 + 0.2**

You'd expect 0.3. But you get: **0.30000000000000004**

This is NOT a bug. This happens in Python, JavaScript, Java, C++, Rust — EVERY language.

Why? Because computers can't perfectly represent most decimal numbers. And understanding WHY is crucial for understanding AI precision.`,
                    requiredToAdvance: true
                },
                {
                    id: 'intuition',
                    title: '💡 Scientific Notation — for Bits',
                    type: 'text',
                    content: `You already know scientific notation:

**6,500** = 6.5 × 10³ (move decimal 3 places right)
**0.0042** = 4.2 × 10⁻³ (move decimal 3 places left)

Computers do the EXACT same thing, but in base 2:

**6.5** = 1.625 × 2² (in binary)

A 32-bit floating point number splits its 32 bits into 3 parts:
- **1 bit** → Sign (positive or negative)
- **8 bits** → Exponent (where to put the decimal point)
- **23 bits** → Mantissa (the actual digits)

This is the **IEEE 754** standard — used by literally every computer on Earth.`,
                    requiredToAdvance: true
                },
                {
                    id: 'deep-precision',
                    title: '🧠 Why 0.1 Can\'t Be Perfect',
                    type: 'text',
                    content: `Here's the deep issue:

In base 10, 1/3 = 0.333333... (repeating forever). You can never write it exactly.

In base 2, 1/10 = 0.000110011001100... (repeating forever!). 

**0.1 in binary is like 1/3 in decimal — it never terminates.**

Since we only have 23 bits to store the mantissa, we have to ROUND. That tiny rounding error is why 0.1 + 0.2 ≠ 0.3.

**The lesson:** Floating point numbers are APPROXIMATIONS. They're incredibly close, but never perfect.

This matters deeply for AI, where billions of tiny imprecisions can accumulate.`,
                    requiredToAdvance: true
                },
                {
                    id: 'quiz-float',
                    title: '🧠 Understanding Check',
                    type: 'quiz',
                    content: `Make sure you grasp why this matters.`,
                    quizQuestion: 'Why can\'t computers represent 0.1 exactly in binary?',
                    quizOptions: [
                        'Because computers are old and imprecise',
                        'Because 0.1 in binary is a repeating fraction (like 1/3 in decimal)',
                        'Because 0.1 is too small for computers to handle',
                        'Because there\'s a bug in the IEEE 754 standard'
                    ],
                    quizCorrectIndex: 1,
                    quizExplanation: 'Exactly! Just like 1/3 = 0.333... in decimal (never ends), 0.1 = 0.000110011... in binary (never ends). Since we have finite bits, we must round. It\'s not a bug — it\'s a fundamental mathematical limit.',
                    requiredToAdvance: true
                },
                {
                    id: 'real-world-float',
                    title: '🌍 Precision in the Real World',
                    type: 'text',
                    content: `This isn't academic. Floating point precision has real consequences:

**🚀 1996 — Ariane 5 Rocket:** A 64-bit float was converted to a 16-bit integer. The number was too big. The rocket self-destructed 37 seconds after launch. Cost: $370 million.

**🤖 In AI Training:**
- GPT-4 uses **float16** (16-bit) for most computations — even LESS precision
- Training adjusts weights by 0.00001. If the precision can't represent that... the model stops learning
- **Mixed precision training** uses float16 for speed + float32 for critical values

**The tradeoff:** More bits = more precision but SLOWER. Less bits = faster but riskier. AI researchers spend enormous effort balancing this.`,
                    requiredToAdvance: true
                },
                {
                    id: 'bridge',
                    title: '🌉 Numbers are Settled. But What About Words?',
                    type: 'text',
                    content: `We've solved the number problem:
- ✅ Positive integers (binary counting)
- ✅ Negative integers (Two's Complement)
- ✅ Decimals (floating point)

But here's the next question: **What about text?**

When you type "Hello" to ChatGPT, your keyboard doesn't send the WORD "Hello." It sends... something else.

How does a machine that only understands numbers deal with the infinite complexity of human language?`,
                    requiredToAdvance: true
                }
            ]
        },
        // ═══════════════════════════════════════════════════════════
        // CHAPTER 4: THE SECRET CODE — TEXT AS NUMBERS
        // ═══════════════════════════════════════════════════════════
        {
            id: 'l1.4.text',
            title: 'The Secret Code',
            description: 'How "Hello" becomes 72, 101, 108, 108, 111.',
            xpReward: 150,
            steps: [
                {
                    id: 'hook',
                    title: '🎯 The Oldest Problem in Computing',
                    type: 'text',
                    content: `In the 1960s, computers could do math. But they couldn't read.

Different companies used different codes: IBM had one, AT&T had another. A document from one computer was gibberish on another.

So in **1963**, a group of engineers sat in a room and asked:

**"Can we agree on ONE universal code that maps every character to a number?"**

The answer was **ASCII** — and it changed everything.`,
                    requiredToAdvance: true
                },
                {
                    id: 'teach-ascii',
                    title: '📚 ASCII: The Agreement',
                    type: 'text',
                    content: `ASCII (American Standard Code for Information Interchange) is beautifully simple:

Every character gets a number from 0 to 127:

| Number | Character | Number | Character |
|--------|-----------|--------|-----------|
| 65 | A | 97 | a |
| 66 | B | 98 | b |
| 48 | 0 (digit) | 32 | (space) |
| 33 | ! | 10 | (new line) |

**Hidden genius in the design:**
- A-Z are 65-90, a-z are 97-122. The difference? Always **32**.
- To convert uppercase to lowercase: just ADD 32
- Digits 0-9 are codes 48-57. To convert digit to number: subtract 48

**ASCII isn't random — it's engineered for easy math.**`,
                    requiredToAdvance: true
                },
                {
                    id: 'explore-ascii',
                    title: '🎮 The ASCII Decoder',
                    type: 'interactive',
                    content: `**Your Mission:**

1. Type your name in the input box
2. Watch it explode into ASCII numbers in real-time
3. Now try typing an emoji... what happens? 🤔

**Challenge:** What's the ASCII code for the space character?

**Bonus:** Type "AI" — what numbers do you get? (65, 73)`,
                    componentId: 'ascii-converter',
                    requiredToAdvance: true
                },
                {
                    id: 'deep-unicode',
                    title: '🧠 Unicode: When 128 Isn\'t Enough',
                    type: 'text',
                    content: `ASCII only handles 128 characters. That's fine for English, but...

- Japanese has **50,000+** characters (kanji, hiragana, katakana)
- Chinese has **100,000+** characters
- Arabic, Hindi, Korean each need hundreds more
- And then there are emojis: 🔥 is character **128293**

**Unicode** was the solution: a MASSIVE lookup table with **150,000+ characters** from every writing system on Earth.

**UTF-8** is the clever encoding that stores common characters (ASCII) in 1 byte, but can stretch to 4 bytes for rare characters. This way, English text doesn't waste space, but Japanese text still works.

**Fun fact:** The 🔥 emoji takes 4 bytes. The letter "A" takes 1 byte. Emojis are literally 4× more expensive to store than letters!`,
                    requiredToAdvance: true
                },
                {
                    id: 'quiz-text',
                    title: '🧠 Understanding Check',
                    type: 'quiz',
                    content: `Let's verify you understand text encoding.`,
                    quizQuestion: 'When ChatGPT outputs the word "Hi", what does the computer ACTUALLY produce?',
                    quizOptions: [
                        'The pixels that look like "H" and "i"',
                        'The numbers 72 and 105, which your screen then renders as letters',
                        'A sound wave that represents "Hi"',
                        'A compressed image of the text'
                    ],
                    quizCorrectIndex: 1,
                    quizExplanation: 'Yes! The computer outputs numbers (72 = H, 105 = i). Your screen\'s font renderer then draws the pixels for those characters. The computer never "sees" letters — only numbers that map to letters through ASCII/Unicode.',
                    requiredToAdvance: true
                },
                {
                    id: 'bridge',
                    title: '🌉 Words are Numbers. But What About Pictures?',
                    type: 'text',
                    content: `We can now encode text as numbers. Beautiful.

But when you take a selfie, your phone doesn't store "a picture of a face."

It stores... **millions of numbers.** A 12-megapixel photo is literally 36 million numbers.

How does a camera turn LIGHT into NUMBERS? And how does an AI "see" your face in those numbers?

Let's find out.`,
                    requiredToAdvance: true
                }
            ]
        },
        // ═══════════════════════════════════════════════════════════
        // CHAPTER 5: HOW COMPUTERS SEE
        // ═══════════════════════════════════════════════════════════
        {
            id: 'l1.5.images',
            title: 'How Computers See',
            description: 'Your selfie is 36 million numbers.',
            xpReward: 200,
            steps: [
                {
                    id: 'hook',
                    title: '🎯 What Your Camera Really Does',
                    type: 'text',
                    content: `When you take a photo, here's what actually happens:

1. Light hits a grid of tiny sensors on your camera chip
2. Each sensor measures HOW MUCH light it receives
3. That measurement becomes a **number** (0 = no light, 255 = max light)
4. Millions of these measurements are saved as a file

**Your camera is a NUMBER MACHINE.** It converts light into a grid of numbers.

An AI looking at your photo doesn't see "you." It sees a spreadsheet with millions of cells, each containing a number from 0 to 255.`,
                    requiredToAdvance: true
                },
                {
                    id: 'teach-pixel',
                    title: '📚 Pixels: The Atoms of Images',
                    type: 'text',
                    content: `Every image is a grid of tiny dots called **pixels** (picture elements).

Each pixel stores **3 numbers**:
- **Red** channel: 0-255 (how much red light?)
- **Green** channel: 0-255 (how much green light?)
- **Blue** channel: 0-255 (how much blue light?)

Your eye mixes these three colors to see every possible shade:

| RGB Values | Color You See |
|------------|---------------|
| (255, 0, 0) | 🔴 Pure Red |
| (0, 255, 0) | 🟢 Pure Green |
| (0, 0, 255) | 🔵 Pure Blue |
| (255, 255, 0) | 🟡 Yellow (Red + Green) |
| (255, 255, 255) | ⚪ White (all colors max) |
| (0, 0, 0) | ⚫ Black (no light) |

**One pixel = 3 bytes = 24 bits.** That single dot takes 24 transistors to store!`,
                    requiredToAdvance: true
                },
                {
                    id: 'explore-pixel',
                    title: '🎮 The Pixel Painter',
                    type: 'interactive',
                    content: `**Your Mission:**

1. Hover over pixels to see their RGB values
2. Click pixels to change their colors — you're editing RAW DATA
3. Try making pure yellow (Red + Green, no Blue)
4. Try making gray (equal R, G, B values)

**Key Insight:** As you paint, notice there are NO "shapes" or "objects" in this data. Just numbers. Your BRAIN is the one that interprets patterns of color as a smiley face or a cat.`,
                    componentId: 'pixel-grid',
                    requiredToAdvance: true
                },
                {
                    id: 'deep-scale',
                    title: '🧠 The Scale of Image Data',
                    type: 'text',
                    content: `Let's appreciate how MUCH data is in a single photo:

**Your phone camera (12 megapixels):**
- 12,000,000 pixels × 3 colors = **36,000,000 numbers**
- That's 36 MB of raw data per photo

**A 4K video (3840 × 2160 at 30fps):**
- 8.3 million pixels × 3 colors × 30 frames/sec = **746 million numbers per second**

**When an AI processes an image:**
1. It receives all 36 million numbers as input
2. It looks for PATTERNS in those numbers
3. Patterns like "a cluster of tan pixels surrounded by dark pixels" → "that's probably a face"

**Mind-blowing:** The AI has never SEEN a face. It's found a mathematical pattern in RGB numbers that statistically correlates with what humans label as "face."`,
                    requiredToAdvance: true
                },
                {
                    id: 'quiz-images',
                    title: '🧠 Understanding Check',
                    type: 'quiz',
                    content: `Let's make sure you see images the way a computer does.`,
                    quizQuestion: 'A 1024 × 1024 color image contains how many individual numbers?',
                    quizOptions: [
                        '1,048,576 (just width × height)',
                        '3,145,728 (width × height × 3 color channels)',
                        '786,432 (width × height ÷ something)',
                        '1,024 (just the width)'
                    ],
                    quizCorrectIndex: 1,
                    quizExplanation: '1024 × 1024 = 1,048,576 pixels. Each pixel has 3 color channels (R, G, B). So 1,048,576 × 3 = 3,145,728 numbers. Over 3 million numbers — and an AI processes ALL of them to decide what\'s in the picture.',
                    requiredToAdvance: true
                },
                {
                    id: 'bridge',
                    title: '🌉 Everything is Numbers. Now What?',
                    type: 'text',
                    content: `Let's step back and see how far we've come:

- ✅ **Integers** — counting, positive and negative
- ✅ **Floats** — decimal numbers with precision tradeoffs
- ✅ **Text** — characters mapped to numbers via ASCII/Unicode
- ✅ **Images** — grids of RGB pixel values

**Everything in the universe can be encoded as a list of numbers.**

But here's the critical question: **a random list of numbers is meaningless.**

The number [255, 128, 0] could be a color, a coordinate, or someone's weight in different units.

How do we give MEANING to lists of numbers? How does AI know that "cat" and "kitten" are similar, or that two photos show the same person?

The answer is one of the most powerful ideas in all of AI: **Vectors.**`,
                    requiredToAdvance: true
                }
            ]
        },
        // ═══════════════════════════════════════════════════════════
        // CHAPTER 6: VECTORS — THE LANGUAGE OF AI
        // ═══════════════════════════════════════════════════════════
        {
            id: 'l1.6.vectors',
            title: 'Vectors: The Language of AI',
            description: 'How a list of numbers can contain meaning.',
            xpReward: 250,
            steps: [
                {
                    id: 'hook',
                    title: '🎯 The Recipe Card Analogy',
                    type: 'text',
                    content: `Imagine a recipe card for chocolate chip cookies:

**[2 eggs, 1 cup flour, 0.5 tsp salt, 1 cup chocolate, 0.75 cup sugar]**

This is a **vector** — an ordered list of numbers where **each position means something specific**.

Position 1 = eggs, position 2 = flour, position 3 = salt...

Now imagine a recipe for brownies:

**[3 eggs, 0.5 cup flour, 0.25 tsp salt, 2 cups chocolate, 1 cup sugar]**

These two vectors are SIMILAR — both are sweet baked goods with chocolate. A "recipe AI" could detect this similarity by comparing the numbers.

**This is exactly how AI works.** Everything — words, images, songs — gets converted into vectors where each position captures a different feature.`,
                    requiredToAdvance: true
                },
                {
                    id: 'teach-formal',
                    title: '📚 What is a Vector, Formally?',
                    type: 'text',
                    content: `A **vector** is an ordered list of numbers:

**v = [v₁, v₂, v₃, ..., vₙ]**

The number of elements is called the **dimension**:
- **2D vector:** [3, 5] → a point on a map
- **3D vector:** [r, g, b] → a color
- **768D vector:** [...] → a word's meaning in GPT (yes, 768 dimensions!)

**Key rules:**
1. **Order matters**: [3, 5] ≠ [5, 3]
2. **Same dimension required** for comparisons: you can't compare a 2D vector with a 3D vector
3. **Each dimension = a feature**: in a word vector, dimension 47 might encode "how animate is this thing?"

**In AI:**
- An image → vector of pixel values (millions of dimensions)
- A word → vector of meaning values (300-768 dimensions)
- A user → vector of preference values (used for recommendations)`,
                    requiredToAdvance: true
                },
                {
                    id: 'explore-vector',
                    title: '🎮 Vector Playground',
                    type: 'interactive',
                    content: `**Your Mission:**

1. Drag the slider to set X and Y values for your vector
2. Watch the arrow change direction and length on the plot
3. The arrow's DIRECTION = what the vector "points to"
4. The arrow's LENGTH = how "strong" the vector is (its magnitude)

**Try these experiments:**
- Make a vector pointing straight up → [0, 5]
- Make a vector pointing down-left → [-3, -2]
- What vector has the biggest length?

**Key insight:** In AI, most vectors have 300-768 dimensions. We can't visualize them, but the math works identically to what you see in 2D!`,
                    componentId: 'vector-plotter',
                    requiredToAdvance: true
                },
                {
                    id: 'teach-dotproduct',
                    title: '📚 The Dot Product: AI\'s Secret Weapon',
                    type: 'text',
                    content: `How do you measure if two vectors are similar? Enter the **dot product**.

**The formula:**
[a₁, a₂] · [b₁, b₂] = (a₁ × b₁) + (a₂ × b₂)

**Example — Comparing recipes:**
Cookies = [2, 1, 0.5] (eggs, flour, salt)
Brownies = [3, 0.5, 0.25]
Salad = [0, 0, 2]

Cookies · Brownies = (2×3) + (1×0.5) + (0.5×0.25) = **6.625** ← HIGH! Similar.
Cookies · Salad = (2×0) + (1×0) + (0.5×2) = **1.0** ← LOW! Different.

**Higher dot product = more similar.**

This single operation powers:
- **Google Search** (query vector · document vector)
- **Spotify** (your taste vector · song vibe vector)
- **Transformers/GPT** (attention scores are dot products!)`,
                    requiredToAdvance: true
                },
                {
                    id: 'quiz-vector',
                    title: '🧠 Understanding Check',
                    type: 'quiz',
                    content: `The dot product is the most important operation in AI. Make sure you get it.`,
                    quizQuestion: 'What does the dot product [1, 2, 3] · [4, 5, 6] equal?',
                    quizOptions: [
                        '[4, 10, 18] (multiply element-wise)',
                        '32 (4 + 10 + 18)',
                        '6 (1 + 2 + 3)',
                        '15 (4 + 5 + 6)'
                    ],
                    quizCorrectIndex: 1,
                    quizExplanation: 'The dot product multiplies corresponding elements and SUMS them: (1×4) + (2×5) + (3×6) = 4 + 10 + 18 = 32. It collapses two vectors into a single number that measures their similarity.',
                    requiredToAdvance: true
                },
                {
                    id: 'mind-blow',
                    title: '🤯 King - Man + Woman = Queen',
                    type: 'text',
                    content: `Here's the most mind-blowing result in AI history:

In 2013, researchers trained a model called **Word2Vec** to convert words into 300-dimensional vectors.

They discovered something insane:

**vector("King") - vector("Man") + vector("Woman") ≈ vector("Queen")**

The AI had never been taught gender relationships. But by reading millions of sentences, it learned that "king" and "queen" differ by the same "gender direction" as "man" and "woman."

**More examples:**
- Paris - France + Italy ≈ Rome
- Walking - Walk + Swim ≈ Swimming

**The implications are profound:** meaning itself has a GEOMETRIC STRUCTURE. Words aren't just labels — they're COORDINATES in a meaning-space.

This is the foundation of everything from ChatGPT to image generation.`,
                    requiredToAdvance: true
                },
                {
                    id: 'layer-complete',
                    title: '🏆 Layer 1 Complete!',
                    type: 'text',
                    content: `**🎉 You've completed Layer 1: Representation**

**Your journey so far:**
- 🔌 Layer 0: Sand → transistors → logic gates
- 📊 Layer 1: Binary → integers → floats → text → images → vectors

**The profound insight:**

Everything in the universe — your voice, your face, your thoughts — can be represented as **vectors of numbers**. And vectors can be compared, transformed, and combined using simple math.

**But here's the thing:** A vector just SITS there. It doesn't DO anything.

To transform vectors — to take input data and produce useful output — we need **functions.**

And functions are where AI truly begins. Because a neural network is, at its core, just a very complex function that learned its own rules.

**Next up: Layer 2 — Functions: The Machines of Math.**`,
                    requiredToAdvance: true
                }
            ]
        }
    ]
};
