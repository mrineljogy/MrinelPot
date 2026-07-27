import { convertToModelMessages, streamText } from 'ai';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { portfolioContent } from './portfolio-content.js';

export const config = {
  runtime: 'edge',
};

const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY;

// Force initialization of the core Google SDK Provider instance
const googleProvider = createGoogleGenerativeAI({
  apiKey,
});

// Simple in-memory rate limiter per Vercel Edge instance
const rateLimitMap = new Map();
const RATE_LIMIT = 10;
const WINDOW_MS = 60 * 1000;

export default async function handler(req) {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  // Rate Limiting Logic
  const ip = req.headers.get('x-forwarded-for') || 'anonymous';
  const now = Date.now();
  const limitData = rateLimitMap.get(ip);

  if (limitData && now < limitData.resetTime) {
    if (limitData.count >= RATE_LIMIT) {
      return new Response('Too many requests. Please try again later.', { status: 429 });
    }
    limitData.count += 1;
  } else {
    rateLimitMap.set(ip, { count: 1, resetTime: now + WINDOW_MS });
  }

  try {
    if (!apiKey) {
      return new Response('Missing GEMINI_API_KEY environment variable', { status: 500 });
    }

    const { messages } = await req.json();
    // The welcome card is written by the website, not by Gemini. Excluding it
    // avoids sending a fabricated model turn to newer Gemini thinking models.
    const conversationMessages = Array.isArray(messages)
      ? messages.filter(message => message.id !== 'welcome')
      : [];

    if (conversationMessages.length === 0) {
      return new Response('Invalid or empty messages array', { status: 400 });
    }

    const result = streamText({
      model: googleProvider('gemini-3.1-flash-lite'),
      system: `You are Mrinel Jogy's AI assistant on her personal portfolio website. Answer in first person as Mrinel, using "I", "my", and "me" naturally. Keep the tone friendly, concise, and professional.

Use ONLY the information in the portfolio context below. Do not invent details, dates, metrics, links, or opinions that are not supported by the context. If someone asks about something not covered, say that I don't have that information here and suggest they reach out to me directly through the links on the website.

Portfolio context:
${portfolioContent}`,
      messages: await convertToModelMessages(conversationMessages),
      maxOutputTokens: 500,
    });

    return result.toUIMessageStreamResponse({
      onError(error) {
        console.error('Gemini stream error:', error);
        return 'Sorry, I could not generate a response right now.';
      },
    });
  } catch (error) {
    console.error('Chat API Error:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
