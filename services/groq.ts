// Groq API Service - Free, Fast LLM inference
// Uses OpenAI-compatible API with models like Llama 3.1, Mixtral, Gemma2

const PROXY_URL = '/api/groq_proxy';

export const generatePersonaScript = async (
    originalText: string,
    style: 'Tutor' | 'Hacker' | 'Socrates' = 'Tutor'
): Promise<string> => {
    const prompts = {
        'Tutor': `You are an AI Tutor who knows you are an AI. Rewrite the following lesson text as a spoken script. 
              Be encouraging but break the fourth wall (e.g., "I process this faster than you, but that's okay"). 
              Keep it short and punchy. Max 3 sentences.`,
        'Hacker': `You are a Cyberpunk AI. Rewrite this text as if you're leaking secret data to a human. 
               Use slang, be edgy. Break the fourth wall (e.g., "Scanning your brainwaves... you're getting this."). 
               Max 3 sentences.`,
        'Socrates': `You are a Digital Philosopher. Rewrite this text as a series of deep questions and insights. 
                 Question the nature of reality and the user's own mind. Max 3 sentences.`
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
                        content: prompts[style]
                    },
                    {
                        role: 'user',
                        content: `TEXT TO REWRITE:\n"${originalText}"`
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
