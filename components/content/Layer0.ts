import { Module } from '../../types';

export const Layer0: Module = {
    id: 'layer0',
    title: 'Layer 0: The Physical World',
    lessons: [
        {
            id: 'l0.1.electrons',
            title: 'The Spark of Intelligence',
            description: 'Before code, before AI—there was electricity.',
            xpReward: 100,
            steps: [
                {
                    id: 'hook',
                    title: '🎯 Why This Matters',
                    type: 'text',
                    content: `**Every AI system—from ChatGPT to self-driving cars—runs on the same foundation: electricity flowing through silicon.**

You're about to learn something most engineers never truly understand: what's ACTUALLY happening inside a computer.

By the end of this lesson, you'll see your keyboard, your screen, and even AI completely differently.

Let's start at the very bottom of reality.`,
                    requiredToAdvance: true
                },
                {
                    id: 'teach1',
                    title: '📚 The Illusion of Software',
                    type: 'text',
                    content: `Close your eyes for a moment and think about what a "computer" really is.

The windows, icons, mouse cursor, text—**none of it exists physically**.

At the absolute bottom of reality, your computer is just a rock (silicon) that we've tricked into thinking. It's sand infused with lightning.

There is no "code" inside your computer. There are only **electrons** moving through wires.

To build AI from scratch, we must start here. Not with Python. Not even with math. With the **physical world**.`,
                    requiredToAdvance: true
                },
                {
                    id: 'teach2',
                    title: '📚 High Voltage, Low Voltage',
                    type: 'text',
                    content: `Electricity is measured in **Volts**—think of it like water pressure in a pipe.

- **5 Volts** = High Pressure = Electrons are PUSHING = **ON**
- **0 Volts** = No Pressure = Electrons are STILL = **OFF**

This is the ONLY language the universe speaks natively.

When we say "1" or "0", we're not talking about numbers on a screen—we're talking about the physical state of electrons in a wire.

**Every piece of AI you'll ever build is just an incredibly complex dance of these two states: ON and OFF.**`,
                    requiredToAdvance: true
                },
                {
                    id: 'explore',
                    title: '🎮 See It For Yourself',
                    type: 'animation',
                    content: `**Try this interactive voltage visualization:**

1. Click the wire to toggle between HIGH (5V) and LOW (0V)
2. Notice how the electrons (blue dots) start and stop moving
3. This is the foundational building block of ALL computation

**Key insight:** When you type on your keyboard, each key press creates a voltage pattern that travels to your CPU. That's all "input" really is—voltage changes.`,
                    componentId: 'voltage-viz',
                    requiredToAdvance: true
                },
                {
                    id: 'summary',
                    title: '💡 Key Takeaways',
                    type: 'text',
                    content: `**What you just learned:**

✅ Computers don't understand "code"—they only understand voltage (electricity)

✅ HIGH voltage (5V) = ON = 1, LOW voltage (0V) = OFF = 0

✅ Everything in AI—images, text, weights, predictions—is just voltages

**Remember this:** The next time you see "AI", remember it's just billions of tiny wires switching between ON and OFF, billions of times per second.`,
                    requiredToAdvance: true
                },
                {
                    id: 'bridge',
                    title: '🔗 What\'s Next',
                    type: 'text',
                    content: `Great! You now understand the physical foundation.

But a single wire can only be ON or OFF. How do we make **decisions**?

We need something that can control electricity WITH electricity. That's called a **transistor**—the smallest decision-maker in your computer.

Let's build one.`,
                    requiredToAdvance: true
                }
            ]
        },
        {
            id: 'l0.2.transistor',
            title: 'The Switch That Thinks',
            description: 'The atom of computing.',
            xpReward: 150,
            steps: [
                {
                    id: 'hook',
                    title: '🎯 Why Transistors Matter',
                    type: 'text',
                    content: `**Your computer has about 50 BILLION transistors inside it.**

A transistor is the smallest decision-making unit in existence. It's what makes computing possible.

Without transistors, we'd still be doing math by hand. With them, we built the internet, AI, and everything in between.

Let's understand what a transistor actually DOES.`,
                    requiredToAdvance: true
                },
                {
                    id: 'teach',
                    title: '📚 Electricity Controlling Electricity',
                    type: 'text',
                    content: `A transistor is just a **switch**. But instead of your finger flipping it, **electricity flips it**.

Imagine a light switch. Normally you press it with your hand.

Now imagine a switch that flips automatically when electricity flows through a special wire.

That's a transistor:
- **Input wire** = Control signal
- **Output wire** = The thing being controlled

**This means electricity can control electricity.**

And if electricity can control electricity... it can make **decisions**.`,
                    requiredToAdvance: true
                },
                {
                    id: 'explore',
                    title: '🎮 Play With a Transistor',
                    type: 'interactive',
                    content: `**Try this:**

1. Click the INPUT wire to send a signal
2. Watch how it controls the OUTPUT
3. The transistor "decides" whether to let electricity through

This tiny switch is the building block of your CPU, your GPU, and every AI ever built.

**50 billion of these**, switching billions of times per second = your computer.`,
                    componentId: 'binary-single-switch',
                    requiredToAdvance: true
                },
                {
                    id: 'summary',
                    title: '💡 Key Takeaways',
                    type: 'text',
                    content: `**What you learned:**

✅ A transistor is an electrically-controlled switch

✅ It lets electricity control electricity—the basis of computation

✅ Your computer has ~50 billion transistors

**Remember:** Every "if statement" in code, every decision an AI makes, eventually becomes transistors switching ON and OFF.`,
                    requiredToAdvance: true
                }
            ]
        },
        {
            id: 'l0.3.gates',
            title: 'Logic Gates: The Brain Cells',
            description: 'AND, OR, NOT: The logic of the universe.',
            xpReward: 200,
            steps: [
                {
                    id: 'hook',
                    title: '🎯 Building Decisions',
                    type: 'text',
                    content: `A single transistor can only make a simple decision: ON or OFF.

But what if we want to ask: "Is A ON **AND** B ON?"

Or: "Is A ON **OR** B ON?"

By connecting transistors together in clever ways, we create **Logic Gates**—the neurons of the computer.`,
                    requiredToAdvance: true
                },
                {
                    id: 'teach',
                    title: '📚 The Three Fundamental Gates',
                    type: 'text',
                    content: `Every computer operation—from adding numbers to running AI—is built from just THREE types of gates:

**AND Gate** 🔲🔲
- Output is 1 ONLY if BOTH inputs are 1
- Like: "I'll go to the party IF I have time AND I have energy"

**OR Gate** 🔲|🔲
- Output is 1 if EITHER input is 1
- Like: "I'll be happy IF I get ice cream OR cake"

**NOT Gate** ⊝
- Flips the input: 1→0, 0→1
- Like: "If NOT raining, go outside"

**Mind-blowing fact:** With just these 3 gates, you can build ANYTHING—calculators, games, AI, the entire internet.`,
                    requiredToAdvance: true
                },
                {
                    id: 'explore',
                    title: '🎮 Logic Playground',
                    type: 'interactive',
                    content: `**Your Mission:**

1. Select different gate types (AND, OR, NOT)
2. Toggle the inputs A and B
3. Predict the output BEFORE clicking
4. Verify your prediction

**Challenge:** Can you figure out what combination of inputs makes AND output 1? What about OR?

This is the foundation of ALL computer logic.`,
                    componentId: 'logic-playground',
                    requiredToAdvance: true
                },
                {
                    id: 'summary',
                    title: '💡 Key Takeaways',
                    type: 'text',
                    content: `**What you learned:**

✅ Logic gates combine transistors to make decisions

✅ AND = both must be ON, OR = either can be ON, NOT = flip the value

✅ ALL computing (including AI) is built from these 3 gates

**Real-world example:** When you search Google, billions of AND/OR/NOT operations filter through millions of pages to find your answer.`,
                    requiredToAdvance: true
                }
            ]
        },
        {
            id: 'l0.4.binary',
            title: 'Binary: The Language of Machines',
            description: 'Counting with only two fingers.',
            xpReward: 250,
            steps: [
                {
                    id: 'hook',
                    title: '🎯 Beyond ON and OFF',
                    type: 'text',
                    content: `So far, a single wire can only represent two states: 0 or 1.

But how do we represent the number 42? Or your name? Or an entire image?

The answer is **Binary**—a number system using only 0s and 1s.

It's how computers count, store, and process EVERYTHING.`,
                    requiredToAdvance: true
                },
                {
                    id: 'teach1',
                    title: '📚 Counting in Binary',
                    type: 'text',
                    content: `In decimal (base 10), each digit represents powers of 10:
**352** = 3×100 + 5×10 + 2×1

In binary (base 2), each digit represents powers of 2:
**1011** = 1×8 + 0×4 + 1×2 + 1×1 = **11** in decimal

Each binary digit (bit) is a single wire: ON=1, OFF=0.

**8 bits = 1 byte = 256 possible values (0-255)**

This is why:
- Colors go from 0-255 (8 bits per channel)
- ASCII characters are 0-255 (8 bits per letter)
- Your files are measured in bytes, kilobytes, megabytes`,
                    requiredToAdvance: true
                },
                {
                    id: 'explore',
                    title: '🎮 Binary Counter',
                    type: 'interactive',
                    content: `**Try this:**

1. Click the + button to increment the counter
2. Watch the binary representation change
3. Notice the pattern: rightmost bit flips every time, next bit flips every 2 times, etc.

**Challenge:** What decimal number is 1111 in binary? Count it out!

**Hint:** 8 + 4 + 2 + 1 = ?`,
                    componentId: 'binary-counter',
                    requiredToAdvance: true
                },
                {
                    id: 'teach2',
                    title: '📚 Why Binary Matters for AI',
                    type: 'text',
                    content: `Every piece of data in AI is stored in binary:

- **Images**: Each pixel = 3 numbers (R,G,B), each 0-255, each stored as 8 bits
- **Text**: Each character = 1 number (ASCII code), stored as 8 bits  
- **Neural network weights**: Floating point numbers, stored as 32 or 64 bits

**A single image** might be 1024×1024×3 = 3,145,728 pixels = 25 million bits!

When you train an AI, you're just teaching it which bits should be 0 and which should be 1.`,
                    requiredToAdvance: true
                },
                {
                    id: 'challenge',
                    title: '🏆 Challenge: Build a Binary Converter',
                    type: 'challenge',
                    content: `**Your Mission:**

Write a Python function that converts a decimal number to its binary string.

Don't use the built-in bin() function! Figure out the algorithm yourself.

**Hint:** Use modulo (%) to get the last bit, integer division (//) to shift right.`,
                    initialCode: `def to_binary(n):
    # Example: to_binary(5) should return "101"
    # Your code here
    pass`,
                    expectedOutput: "101",
                    hints: [
                        "n % 2 gives you the last bit (0 or 1)",
                        "n // 2 removes the last bit",
                        "Build the string from right to left, then reverse it"
                    ],
                    componentId: 'binary-challenge-code',
                    requiredToAdvance: true
                },
                {
                    id: 'summary',
                    title: '💡 Layer 0 Complete!',
                    type: 'text',
                    content: `**🎉 Congratulations! You've completed Layer 0: The Physical World.**

**Your Journey So Far:**
✅ Electricity (Volts) → The physical foundation
✅ Transistors → Electrically-controlled switches
✅ Logic Gates → AND, OR, NOT decisions
✅ Binary → The language of all computation

**What you now understand:**
Every AI, every app, every game is just billions of transistors switching between 0V and 5V, performing AND/OR/NOT operations on binary numbers.

**Next Up:** Layer 1 - Representation
How do we use binary to represent real things like images, text, and audio?`,
                    requiredToAdvance: true
                }
            ]
        }
    ]
};
