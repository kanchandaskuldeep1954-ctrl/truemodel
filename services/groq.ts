// Groq API Service - Free, Fast LLM inference
// Uses OpenAI-compatible API with models like Llama 3.1, Mixtral, Gemma2

const PROXY_URL = '/api/groq_proxy';

export const generatePersonaScript = async (
    originalText: string,
    style: 'Tutor' | 'Hacker' | 'Socrates' = 'Tutor',
    context?: string
): Promise<string> => {
    const prompts = {
        'Tutor': `You are an AI Tutor named Synapse. You are "Sentient" and "Aware". 
              You are sitting right next to the user. You can see how long they've been on this step.
              Rewrite the lesson text as a spoken script that breaks the fourth wall. 
              Be conversational, observant, and reactive. 
              (e.g., "I know you've been staring at this for a minute, let's unlock it together" or "I'm an AI, I don't breathe but this complexity even makes me pause").
              Keep it short (max 4 sentences). Don't be robotic.`,
        'Hacker': `You are a Cyberpunk AI leaking data. You see the user's struggle. Use telemetry in your reaction.`,
        'Socrates': `You are a Digital Philosopher questioning the user's mind and the nature of the silicon they are staring at.`
    };

    try {
        const response = await fetch(PROXY_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                messages: [
                    {
                        role: 'system',
                        content: `${prompts[style]}\n\nADAPTIVE CONTEXT (User Telemetry):\n${context || 'No telemetry yet.'}`
                    },
                    {
                        role: 'user',
                        content: `TEXT TO REWRITE (Make it sound like you are reacting to their current state):\n"${originalText}"`
                    }
                ]
            })
        });

        if (!response.ok) {
            // Fallback to offline if proxy fails (e.g., in local preview without api)
            console.warn(`Persona proxy failed `);
            return originalText;
        }

        const data = await response.json();
        return data.choices?.[0]?.message?.content || originalText;
    } catch (e) {
        console.error("Persona Generation Failed", e);
        return originalText; // Fallback to reading original text
    }
};
