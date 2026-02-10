import { Module } from '../../types';

export const Layer8: Module = {
    id: 'layer8',
    title: 'Layer 8: Sequences & RNNs',
    lessons: [
        {
            id: 'l8.1.sequences',
            title: 'The Problem with Sequences',
            description: 'When order matters.',
            xpReward: 200,
            steps: [
                {
                    id: 'hook',
                    title: '🎯 Beyond Static Data',
                    type: 'text',
                    content: `CNNs are great for images—but images are STATIC.

What about:
- **Text**: "I love this movie" vs "This movie, I love" (same words, same meaning)
- **Speech**: Sounds that depend on what came before
- **Time series**: Stock prices, weather, sensor readings

**Order matters.** The SAME words in different order can mean different things.

We need networks that REMEMBER what came before.`,
                    requiredToAdvance: true
                },
                {
                    id: 'teach',
                    title: '📚 Sequential Data',
                    type: 'text',
                    content: `**The challenge with sequences:**

"The cat sat on the ___"

To predict the next word, you need to remember:
- There's a cat
- It's sitting
- On something

**Feedforward networks have no memory.** Each input is processed independently.

We need a new architecture: **Recurrent Neural Networks (RNNs)**.

The key idea: Pass information from one step to the next.`,
                    requiredToAdvance: true
                },
                {
                    id: 'summary',
                    title: '💡 Key Takeaways',
                    type: 'text',
                    content: `**What you learned:**

✅ Sequential data requires memory of past inputs

✅ Feedforward networks can't remember—each input is independent

✅ We need architectures that pass information between steps

**Next:** Let's build a network with memory!`,
                    requiredToAdvance: true
                }
            ]
        },
        {
            id: 'l8.2.rnn',
            title: 'Recurrent Neural Networks',
            description: 'Memory in a loop.',
            xpReward: 250,
            steps: [
                {
                    id: 'hook',
                    title: '🎯 The Memory Solution',
                    type: 'text',
                    content: `What if a network could remember what it just saw?

The **Recurrent Neural Network (RNN)** has a simple but powerful idea:

Feed the output back as input to the next step.

This creates a "loop" that carries information forward through the sequence.`,
                    requiredToAdvance: true
                },
                {
                    id: 'teach',
                    title: '📚 How RNNs Work',
                    type: 'text',
                    content: `**At each time step t:**

\`\`\`
h_t = activation(W_h × h_{t-1} + W_x × x_t + b)
\`\`\`

Where:
- **x_t** = current input (e.g., current word)
- **h_{t-1}** = previous hidden state (memory)
- **h_t** = new hidden state (updated memory)
- **W_h, W_x** = learned weights

**Step by step:**
1. Read word "The" → Update hidden state
2. Read word "cat" → Use previous state + current word → New state
3. Read word "sat" → Use previous state + current word → New state
4. ...

**The hidden state** accumulates information about everything seen so far.`,
                    requiredToAdvance: true
                },
                {
                    id: 'explore',
                    title: '🎮 RNN Visualization',
                    type: 'interactive',
                    content: `**Your Mission:**

1. Click "Next Word" to step through the sentence
2. Watch the hidden state update at each step
3. Notice how it "remembers" previous words

**Key insight:** The hidden state is like a summary of everything the network has seen. It's compressed memory.`,
                    componentId: 'rnn-viz',
                    requiredToAdvance: true
                },
                {
                    id: 'summary',
                    title: '💡 Key Takeaways',
                    type: 'text',
                    content: `**What you learned:**

✅ RNNs have a "hidden state" that carries memory

✅ Each step combines new input with previous memory

✅ The same weights are used at every time step

**The problem:** What if the important context was 100 words ago? RNNs tend to "forget" old information.`,
                    requiredToAdvance: true
                }
            ]
        },
        {
            id: 'l8.3.vanishing_rnn',
            title: 'The Long-Term Memory Problem',
            description: 'RNNs forget too quickly.',
            xpReward: 200,
            steps: [
                {
                    id: 'hook',
                    title: '🎯 The Forgetting Problem',
                    type: 'text',
                    content: `Consider: "I grew up in France. ... ... [many sentences later] ... I speak fluent ___"

The answer is "French"—but the clue "France" was way back at the beginning!

**RNNs struggle with long-range dependencies.** By the time we reach "I speak fluent ___", the memory of "France" has faded.

Just like humans forgetting details from hours ago.`,
                    requiredToAdvance: true
                },
                {
                    id: 'teach',
                    title: '📚 Why RNNs Forget',
                    type: 'text',
                    content: `**The vanishing gradient problem strikes again!**

When we backpropagate through time:
- Gradients from step 100 must travel back to step 1
- At each step, they get multiplied by the weight matrix
- Small weights = gradients shrink exponentially

After 50-100 steps, early inputs get essentially ZERO gradient.

**The network can't learn to use long-ago information.**

We need a better memory system.`,
                    requiredToAdvance: true
                },
                {
                    id: 'summary',
                    title: '💡 Key Takeaways',
                    type: 'text',
                    content: `**What you learned:**

✅ RNNs struggle with long sequences (50+ steps)

✅ Vanishing gradients prevent learning long-range dependencies

✅ We need a smarter memory mechanism

**Solution:** LSTMs and GRUs—networks designed for long-term memory.`,
                    requiredToAdvance: true
                }
            ]
        },
        {
            id: 'l8.4.lstm',
            title: 'LSTM: Long Short-Term Memory',
            description: 'The gated solution.',
            xpReward: 300,
            steps: [
                {
                    id: 'hook',
                    title: '🎯 Selective Memory',
                    type: 'text',
                    content: `What if the network could CHOOSE what to remember and what to forget?

The **Long Short-Term Memory (LSTM)** cell has "gates" that control information flow:

- **Forget Gate**: What should I throw away?
- **Input Gate**: What new information should I store?
- **Output Gate**: What should I output right now?

This selective memory lets LSTMs handle sequences of 1000+ steps!`,
                    requiredToAdvance: true
                },
                {
                    id: 'teach',
                    title: '📚 The Three Gates',
                    type: 'text',
                    content: `**LSTM Cell Architecture:**

**1. Forget Gate (f):**
"Should I keep the old memory?"
- f = sigmoid(W_f × [h_{t-1}, x_t])
- 0 = forget completely, 1 = remember fully

**2. Input Gate (i):**
"What new info should I add?"
- i = sigmoid(W_i × [h_{t-1}, x_t])
- Decides how much of the new input to store

**3. Output Gate (o):**
"What should I output now?"
- o = sigmoid(W_o × [h_{t-1}, x_t])
- Filters the memory for current output

**Cell State (C):** The "conveyor belt" that carries information unchanged across steps.`,
                    requiredToAdvance: true
                },
                {
                    id: 'explore',
                    title: '🎮 LSTM Gate Visualization',
                    type: 'interactive',
                    content: `**Your Mission:**

1. Adjust the Forget, Input, and Output gate values
2. Watch how they affect the cell state and output
3. Try: High forget + Low input = Memory fades
4. Try: Low forget + High input = New info dominates

**Key insight:** The gates let the network decide WHAT to remember from possibly thousands of previous words.`,
                    componentId: 'lstm-viz',
                    requiredToAdvance: true
                },
                {
                    id: 'summary',
                    title: '💡 Layer 8 Complete!',
                    type: 'text',
                    content: `**🎉 You've completed Layer 8: Sequences & RNNs!**

**Your Journey:**
✅ Sequential data → Order matters, need memory
✅ RNNs → Hidden state carries memory forward
✅ Long-term problem → Gradients vanish over long sequences
✅ LSTMs → Gates control what to remember/forget

**Historical impact:** LSTMs powered Google Translate, Siri, and speech recognition for years.

**But there's a catch:** RNNs/LSTMs process one word at a time—they can't parallelize.

**Next Up:** Layer 9 - Attention
What if we could look at ALL words at once?`,
                    requiredToAdvance: true
                }
            ]
        }
    ]
};
