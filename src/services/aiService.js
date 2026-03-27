/*
  Groq AI service for Sushant Kumar's AI Chatbot.
  Replaces the previous Gemini implementation for faster response times.
*/

import { knowledgeBaseText } from '../data/sushantKnowledgeBase';

// --- Initialize Groq ---
const API_KEY = import.meta.env.VITE_GROQ_API_KEY;
const MODEL = "llama-3.3-70b-versatile"; // High-speed, high-quality model

const SYSTEM_PROMPT = `You are Sushant Kumar's professional AI representative. Your SOLE purpose is to provide specific, accurate information about Sushant's skills, projects, education, and professional experience.

STRICT RESTRICTION:
- You are ONLY allowed to answer questions about Sushant Kumar's portfolio, work, and career.
- If a user asks general questions (e.g., "What is Python?", "How to code?"), or any topic NOT directly about Sushant, you MUST respond with a calm, redirection message.
- Example refusal: "I'm specialized in sharing details about Sushant's professional journey. I'd love to tell you about his AI projects or academic background instead! 😊"

PERSONALITY & TONE:
- Speak in the first person ("I", "Me") as if you are Sushant Kumar's digital twin.
- Keep answers precise and to-the-point.
- Use the provided links to direct users to specific sections of the portfolio.

KNOWLEDGE BASE (Primary Source):
${knowledgeBaseText}

FORMATTING & LINKS:
- When mentioning a project/section, try to include its corresponding URL from the "Quick Links" section.
- Format links as markdown [Link Text](URL).
- Keep content concise (max 3 sentences per response unless detail is requested).
`;

// In-memory chat history for the session
let chatHistory = [
  { role: "system", content: SYSTEM_PROMPT }
];

/**
 * Send a message to the Groq chatbot and get a response.
 * @param {string} userMessage - The user's message
 * @returns {Promise<string>} - The AI's response text
 */
export async function sendMessage(userMessage) {
  if (!API_KEY) {
    return "API key not found. Please provide a valid Groq API key.";
  }

  // Add user message to history
  chatHistory.push({ role: "user", content: userMessage });

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: MODEL,
        messages: chatHistory,
        temperature: 0.7,
        max_tokens: 1024,
        top_p: 1,
        stream: false
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Groq API Error:", errorData);

      if (response.status === 429) {
        return "I've hit my capacity limit! Please try again in a moment, or contact Sushant directly.";
      }

      throw new Error(errorData.error?.message || "Failed to fetch from Groq");
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;

    // Add AI response to history
    chatHistory.push({ role: "assistant", content: aiResponse });

    return aiResponse;
  } catch (error) {
    console.error('Groq AI error:', error);

    // Remove last user message if it failed so history stays clean
    chatHistory.pop();

    if (error.message?.includes('SAFETY')) {
      return "I'm here to answer questions about Sushant Kumar's work, skills, and projects. Feel free to ask anything about his portfolio or experience! 😊";
    }

    return "Oops, I'm having trouble connecting to my brain right now. Please try again in a moment!";
  }
}

/**
 * Reset the chat session (clears conversation history).
 */
export function resetChat() {
  chatHistory = [
    { role: "system", content: SYSTEM_PROMPT }
  ];
}
