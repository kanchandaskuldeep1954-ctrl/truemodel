
// Vercel Serverless Function to proxy Groq API calls
// This hides the API key from the frontend
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
    request: VercelRequest,
    response: VercelResponse
) {
    if (request.method !== 'POST') {
        return response.status(405).json({ error: 'Method Not Allowed' });
    }

    const { messages, model = 'llama-3.1-8b-instant' } = request.body;

    if (!messages) {
        return response.status(400).json({ error: 'Messages are required' });
    }

    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
        return response.status(500).json({ error: 'Server configuration error: API key missing' });
    }

    try {
        const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                model,
                messages,
                temperature: 0.8,
                max_tokens: 200,
            }),
        });

        if (!groqResponse.ok) {
            const errorData = await groqResponse.json();
            throw new Error(`Groq API error: ${JSON.stringify(errorData)}`);
        }

        const data = await groqResponse.json();
        return response.status(200).json(data);
    } catch (error: any) {
        console.error('Groq Proxy Error:', error);
        return response.status(500).json({ error: error.message || 'Internal Server Error' });
    }
}
