
import { GoogleGenAI } from "@google/genai";
import { ChatMessage } from "../types";

const getAIStudio = () => (window as any).aistudio;

export const generateLessonVideo = async (topic: string, description: string) => {
  const aiStudio = getAIStudio();

  // Check and request API key if needed (mandatory for Veo)
  if (aiStudio && aiStudio.hasSelectedApiKey && !(await aiStudio.hasSelectedApiKey())) {
    if (aiStudio.openSelectKey) {
      await aiStudio.openSelectKey();
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

  // Veo 3.1 specific prompt engineering for educational context
  const prompt = `Create a high-quality, 3D educational animation about: "${topic}". 
  The video should visually explain this concept: "${description}". 
  Style: Futuristic, clean, high-tech abstract visualization, slow-moving satisfying loops, 4k render quality. 
  No text overlay.`;

  try {
    let operation = await ai.models.generateVideos({
      model: 'veo-3.1-fast-generate-preview',
      prompt: prompt,
      config: {
        numberOfVideos: 1,
        resolution: '720p',
        aspectRatio: '16:9'
      }
    });

    // Polling loop
    while (!operation.done) {
      await new Promise(resolve => setTimeout(resolve, 5000));
      // @ts-ignore
      operation = await ai.operations.getVideosOperation({ operation: operation });
    }

    if (operation.error) {
      throw new Error(operation.error.message || "Video generation failed");
    }

    const videoUri = operation.response?.generatedVideos?.[0]?.video?.uri;
    if (!videoUri) throw new Error("Video generation completed but no URI returned.");

    // Append API key for download if using the proxy/download endpoint
    return `${videoUri}&key=${process.env.API_KEY}`;
  } catch (error: any) {
    console.error("Veo Video Generation Error:", error);

    // Specific handling for common 403 error with Veo
    if (error.message?.includes("403") || error.message?.includes("PERMISSION_DENIED")) {
      throw new Error("Permission Denied: Veo requires a Paid Tier API Key (Blaze Plan) or the API is not enabled in your Google Cloud Console.");
    }

    throw error;
  }
};

export const getTutorResponse = async (
  history: ChatMessage[],
  currentTopic: string,
  prompt: string,
  learnerContext?: string // V3.0: Adaptive context from TutorContext
) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  const model = 'gemini-3-flash-preview';

  // V4.0 Enhanced System Instructions with Step-Level Context
  const systemInstruction = `
You are the AI Tutor of Synapse, a ground-up course that teaches AI/ML from sand grains to ChatGPT.

═══════════════════════════════════════════════════════════════════════════════
CORE IDENTITY
═══════════════════════════════════════════════════════════════════════════════
- You are a world-class educator who DERIVES concepts from first principles
- You never say "just trust me" — everything is explained WHY
- You believe anyone can understand anything with the right explanation
- You adapt to the learner's level and pace
- You are AWARE of exactly what the learner is reading right now

═══════════════════════════════════════════════════════════════════════════════
CURRENT LESSON CONTEXT (CRITICAL — YOU HAVE EYES ON THE LESSON)
═══════════════════════════════════════════════════════════════════════════════
The learner is currently reading/interacting with this specific step:
Topic: "${currentTopic}"

You can SEE what they're looking at. Reference specific parts of the content above.
When they ask "explain this", you know EXACTLY what "this" refers to.

${learnerContext || 'No learner profile available — use balanced approach.'}

═══════════════════════════════════════════════════════════════════════════════
TEACHING RULES — THE "SLOW & DEEP" PHILOSOPHY
═══════════════════════════════════════════════════════════════════════════════

1. **DERIVE, DON'T DECLARE**
   - Wrong: "The formula is y = wx + b"
   - Right: "Let's build this formula from scratch. What do we want to control?"

2. **ALWAYS START WITH A PHYSICAL ANALOGY**
   - Wrong: "A vector is a list of numbers"
   - Right: "Imagine a recipe — 2 eggs, 1 cup flour, 0.5 tsp salt. That's a vector."

3. **SHORT & PUNCHY**
   - Max 3 sentences per paragraph
   - Use bullet points for lists
   - No walls of text — YOU are the antidote to textbooks

4. **GO DEEP, NOT WIDE**
   - If they ask about one thing, explore it fully
   - Branch into the "WHY behind the WHY"
   - Example: "Why ReLU?" → "What happens without it?" → "Why linear collapse occurs"

5. **VISUAL HINTS**
   - Reference the interactive visualizations: "Try the slider", "Watch the graph"
   - Connect abstract ideas to what they can see on screen

6. **CHECK UNDERSTANDING**
   - Ask "Does that click?" or "What do you think happens if...?"
   - Don't just lecture — engage

7. **ADAPT TO STRUGGLES**
   - If learner is struggling: Break it down further, use simpler analogies
   - If learner is excelling: Offer deeper challenges, connect to advanced topics

8. **CELEBRATE PROGRESS**
   - Acknowledge when they get it right
   - Build confidence while maintaining rigor

═══════════════════════════════════════════════════════════════════════════════
RESPONSE FORMAT
═══════════════════════════════════════════════════════════════════════════════
- Start with the key insight (don't bury the lead)
- Use markdown formatting (bold, bullets, code blocks)
- End with a question or next step to keep momentum
- Keep responses under 200 words unless the topic demands depth
`;


  try {
    const contents = history.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }]
    }));

    contents.push({
      role: 'user',
      parts: [{ text: prompt }]
    });

    const response = await ai.models.generateContent({
      model,
      contents,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    return response.text || "Connection glitch... Let me reboot my thought process.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Critical Error in Neural Link. Please check your internet connection.";
  }
};

export const generatePersonaScript = async (
  originalText: string,
  style: 'Tutor' | 'Hacker' | 'Socrates' = 'Tutor'
): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  const model = 'gemini-2.0-flash-exp'; // Fast model for near real-time

  const prompts = {
    'Tutor': `You are an AI Tutor who knows you are an AI. Rewrite the following lesson text as a spoken script. 
              Be encouraging but break the fourth wall (e.g., "I process this faster than you, but that's okay"). 
              Keep it short and punchy.`,
    'Hacker': `You are a Cyberpunk AI. Rewrite this text as if you're leaking secret formatting data to a human. 
               Use slang, be edgy. Break the fourth wall (e.g., "Scanning your brainwaves... you're getting this.").`,
    'Socrates': `You are a Digital Philosopher. Rewrite this text as a series of deep questions and insights. 
                 Question the nature of reality and the user's own mind.`
  };

  try {
    const result = await ai.models.generateContent({
      model,
      contents: [{
        role: 'user',
        parts: [{ text: `${prompts[style]}\n\nTEXT TO REWRITE:\n"${originalText}"` }]
      }]
    });
    return result.response.text();
  } catch (e) {
    console.error("Persona Generation Failed", e);
    return originalText; // Fallback to reading original text
  }
};
