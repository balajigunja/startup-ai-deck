import { GoogleGenAI } from "@google/genai";

let geminiClient: GoogleGenAI | null = null;

export function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
  if (!apiKey) return null;

  if (!geminiClient) {
    geminiClient = new GoogleGenAI({ apiKey });
  }
  return geminiClient;
}

/**
 * Cleanly extracts a JSON substring if LLM wraps in markdown fences or comments
 */
export function extractJSON(rawText: string): string {
  let cleaned = rawText.trim();
  // Remove markdown code fences if present
  if (cleaned.startsWith("```json")) {
    cleaned = cleaned.replace(/^```json\s*/i, "");
  } else if (cleaned.startsWith("```")) {
    cleaned = cleaned.replace(/^```\s*/i, "");
  }
  if (cleaned.endsWith("```")) {
    cleaned = cleaned.replace(/\s*```$/i, "");
  }
  return cleaned.trim();
}

/**
 * Invokes Gemini 2.5 Flash for structured text/JSON generation
 */
export async function callGemini(
  systemPrompt: string,
  userPrompt: string
): Promise<string> {
  const client = getGeminiClient();
  if (!client) {
    throw new Error("Gemini API key not configured (GEMINI_API_KEY or GOOGLE_API_KEY)");
  }

  const response = await client.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `${systemPrompt}\n\n---\n\n${userPrompt}`,
    config: {
      responseMimeType: "application/json",
      temperature: 0.3,
    },
  });

  const text = response.text;
  if (!text) {
    throw new Error("Empty response returned from Gemini API");
  }

  return extractJSON(text);
}
