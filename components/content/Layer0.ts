import { Module } from '../../types';

export const Layer0: Module = {
    id: 'layer0',
    title: 'Layer 0: The Physical World',
    lessons: [
        {
            id: 'l0.1.manual-switch',
            title: 'The Spark: Manual Control',
            description: 'Before automation, there was a simple choice.',
            xpReward: 100,
            steps: [
                {
                    id: 'hook',
                    title: '🎯 The Physical Rock',
                    type: 'text',
                    content: `**Every AI system—from ChatGPT to robots—is just a "rock" that we've tricked into thinking.**
                    
Software isn't magic. It's just a physical state of matter. To understand AI, you must first understand a simple bridge.`,
                    requiredToAdvance: true
                },
                {
                    id: 'teach1',
                    title: '📚 The Simple Circuit',
                    type: 'text',
                    content: `Imagine a battery and a lightbulb. To light the bulb, electrons must flow from the battery, through a wire, to the bulb, and back.
                    
If the wire is broken, the light is **OFF**.
If we close the gap with a metal bridge, the light is **ON**.
                    
This is a **Manual Switch**. It requires your physical finger to move a bridge.`,
                    requiredToAdvance: true
                },
                {
                    id: 'explore',
                    title: '🎮 Move the Bridge',
                    type: 'interactive',
                    content: `**Try it:**
1. Click the metal bridge to close the circuit.
2. Watch the electrons start to flow.
3. This is "1" (ON). Open it back up for "0" (OFF).

**The Problem:** If you want to build a calculator using these, you'd have to flip millions of switches by hand. That's slow. We need to **automate** the switch.`,
                    componentId: 'manual-switch-viz',
                    requiredToAdvance: true
                }
            ]
        },
        {
            id: 'l0.2.transistor',
            title: 'Automation: The Transistor',
            description: 'Electricity controlling electricity.',
            xpReward: 150,
            steps: [
                {
                    id: 'hook',
                    title: '🎯 The Great Breakthrough',
                    type: 'text',
                    content: `**What if we didn't need a finger to flip the switch?**
                    
What if we could use a small amount of electricity to "pull" a bridge closed for a larger amount of electricity?
                    
That is the **Transistor**. It is a switch that flips itself when it feels voltage.`,
                    requiredToAdvance: true
                },
                {
                    id: 'explore',
                    title: '🎮 The Automated Switch',
                    type: 'interactive',
                    content: `**The Transistor has three parts:**
1. **Source**: Where the power comes from.
2. **Drain**: Where it wants to go.
3. **Gate**: The "Control" wire.

**Try it:** Apply voltage to the **Gate**. Watch how it physically pulls the bridge down to connect the Source and Drain.`,
                    componentId: 'transistor-viz',
                    requiredToAdvance: true
                },
                {
                    id: 'teach',
                    title: '📚 This is Everything',
                    type: 'text',
                    content: `Because electricity can now control electricity, we can build "if-then" logic without moving a finger.
                    
If the Gate is ON, then the main current flows. 
                    
Your computer has **billions** of these tiny automated switches. This is the birth of the machine mind.`,
                    requiredToAdvance: true
                }
            ]
        },
        {
            id: 'l0.3.hardware-logic',
            title: 'Harmony: Building Logic',
            description: 'Arranging transistors to make decisions.',
            xpReward: 200,
            steps: [
                {
                    id: 'teach1',
                    title: '📚 The "AND" Layout',
                    type: 'text',
                    content: `If we put two transistors in a row (Series), the bulb only lights up if **BOTH** are ON.
                    
This is a physical **AND** gate. 

1 AND 1 = 1.
1 AND 0 = 0.`,
                    requiredToAdvance: true
                },
                {
                    id: 'explore1',
                    title: '🎮 Build an AND Gate',
                    type: 'interactive',
                    content: `Try to light the bulb. You'll notice that electricity is blocked unless both bridges are CLOSED.`,
                    componentId: 'hardware-gate-and',
                    requiredToAdvance: true
                },
                {
                    id: 'teach2',
                    title: '📚 The "OR" Layout',
                    type: 'text',
                    content: `If we put transistors side-by-side (Parallel), electricity can flow through **EITHER** one to reach the bulb.
                    
This is a physical **OR** gate.`,
                    requiredToAdvance: true
                },
                {
                    id: 'explore2',
                    title: '🎮 Build an OR Gate',
                    type: 'interactive',
                    content: `Notice how you only need one bridge closed to complete the path.`,
                    componentId: 'hardware-gate-or',
                    requiredToAdvance: true
                }
            ]
        },
        {
            id: 'l0.4.binary-bits',
            title: 'Information: The Bit',
            description: 'Pattern is meaning.',
            xpReward: 250,
            steps: [
                {
                    id: 'teach',
                    title: '📚 What is a Bit?',
                    type: 'text',
                    content: `A **Bit** is just the name for the state of one of these switches.
                    
- **0**: Switch is OFF (No bridge, no light).
- **1**: Switch is ON (Bridge closed, light on).
                    
By itself, a bit is boring. But in patterns, it's everything. 
A byte is just 8 of these switches in a row.`,
                    requiredToAdvance: true
                },
                {
                    id: 'explore',
                    title: '🎮 Patterns are Numbers',
                    type: 'interactive',
                    content: `Watch how 4 switches can represent numbers from 0 to 15.
                    
Every image you see, every word you type, is just a giant list of 1s and 0s mapped to these physical switches.`,
                    componentId: 'binary-counter',
                    requiredToAdvance: true
                }
            ]
        }
    ]
};
