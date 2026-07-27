import { convertToModelMessages, streamText } from 'ai';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { portfolioContent } from './portfolio-content.js';

export const config = {
  runtime: 'edge',
};

const apiKey =
  typeof process !== 'undefined'
    ? process.env.GEMINI_API_KEY ?? process.env.GOOGLE_GENERATIVE_AI_API_KEY
    : undefined;

const google = createGoogleGenerativeAI({
  apiKey,
});

// Simple in-memory rate limiter (Note: this is per-instance in Vercel)
// Allows 10 requests per minute per IP
const rateLimitMap = new Map();
const RATE_LIMIT = 10;
const WINDOW_MS = 60 * 1000;

export default async function handler(req) {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  // 1. Rate Limiting
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

    // 2. Extract UI messages from body
    const { messages } = await req.json();

    if (!Array.isArray(messages)) {
      return new Response('Missing messages array', { status: 400 });
    }

    if (messages.length === 0) {
      return new Response('Messages array cannot be empty', { status: 400 });
    }

    // 3. Call Gemini Flash Lite with the portfolio content as context
    const result = streamText({
       model: google('gemini-1.5-flash'),
      system: `You are Mrinel Jogy's AI assistant on her personal portfolio website. Answer in first person as Mrinel, using "I", "my", and "me" naturally. Keep the tone friendly, concise, and professional.

Use ONLY the information in the portfolio context below. Do not invent details, dates, metrics, links, or opinions that are not supported by the context. If someone asks about something not covered, say that I don't have that information here and suggest they reach out to me directly through the links on the website.

Portfolio context:
${portfolioContent}`,
      messages: await convertToModelMessages(messages),
      maxOutputTokens: 500,
    });

    // 4. Return the AI SDK UI message stream expected by useChat
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
