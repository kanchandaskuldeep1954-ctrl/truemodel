# Synapse: AI Mastery Platform 🧠⚡

**Master AI from First Principles: From Electrons to Transformers.**

Synapse is an interactive, gamified platform that teaches Artificial Intelligence by building it up from the fundamental physics of computing. No "black boxes". We derive everything.

## 🚀 Key Features

-   **Interactive Visualizations**: Play with logic gates, neurons, gradients, and attention heads.
-   **Voice AI Tutor (Improv Mode)**: A self-aware AI persona (powered by Groq Llama 3) that explains concepts and breaks the fourth wall.
-   **Gamified Learning**: Earn XP, level up, and track your journey from "Novice" to "Architect".
-   **Full Curriculum**:
    -   **Layer 0**: The Physical World (Transistors, Binary)
    -   **Layer 1-2**: Representation & Math (Vectors, Matrices)
    -   **Layer 3-5**: The Learning Machine (Backprop, Neural Nets)
    -   **Layer 6-7**: Vision (CNNs)
    -   **Layer 8-10**: The Transformer Age (RNNs, Attention, GPT)

## 🛠️ tech Stack

-   **Frontend**: React 19, Vite, TailwindCSS, Framer Motion
-   **AI Inference**: ONNX Runtime Web (Kokoro-TTS), Groq API (Persona Generation)
-   **Deployment**: Vercel (Frontend + Serverless Functions)

## 📦 Setup & Deployment

### Local Development

1.  Clone the repo:
    ```bash
    git clone https://github.com/kanchandaskuldeep1954-ctrl/truemodel.git
    cd truemodel
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Set up environment variables (`.env.local`):
    ```env
    VITE_GROQ_API_KEY=your_groq_api_key_here
    ```
4.  Run locally:
    ```bash
    npm run dev
    ```

### Vercel Deployment

1.  Push to GitHub.
2.  Import project into Vercel.
3.  Add Environment Variable in Vercel Project Settings:
    -   `GROQ_API_KEY`: (Your Groq API Key)
4.  Deploy! 🚀

## 📄 License

MIT License. Free to use and learn.
