import {
  PitchInput,
  DeckData,
  ReadinessScore,
  InvestorQA,
  SlideType,
  SlideData,
  ChatMessage,
  PitchHealthCheck,
} from "../types/index.ts";

export interface GenerateResponse {
  success: boolean;
  slides: DeckData;
  score: ReadinessScore;
  qa: InvestorQA;
  healthCheck: PitchHealthCheck;
  meta: {
    primaryModel: string;
    isMock: boolean;
    generatedAt: string;
  };
}

export interface RegenerateResponse {
  success: boolean;
  slideType: SlideType;
  slide: SlideData;
  meta: {
    model: string;
    isMock: boolean;
    timestamp: string;
  };
}

export interface ChatApiResponse {
  success: boolean;
  reply: string;
  sentiment: "skeptical" | "probing" | "impressed" | "intrigued";
  suggestedFollowUps: string[];
  meta: {
    model: string;
    isMock: boolean;
  };
}

export async function generatePitchDeck(input: PitchInput): Promise<GenerateResponse> {
  const res = await fetch("/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({ error: "Request failed" }));
    throw new Error(errorData.error || `Server responded with status ${res.status}`);
  }

  return res.json();
}

export async function regenerateSingleSlide(
  slideType: SlideType,
  input: PitchInput,
  currentContext?: string
): Promise<RegenerateResponse> {
  const res = await fetch(`/api/regenerate/${slideType}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ pitchInput: input, currentContext }),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({ error: "Regeneration failed" }));
    throw new Error(errorData.error || `Failed to regenerate slide (${res.status})`);
  }

  return res.json();
}

export async function sendVCChat(
  messages: ChatMessage[],
  input: PitchInput,
  deckSummary?: string
): Promise<ChatApiResponse> {
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      messages: messages.map((m) => ({ role: m.role, content: m.content })),
      pitchInput: input,
      deckSummary,
    }),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({ error: "Chat request failed" }));
    throw new Error(errorData.error || "Failed to communicate with VC simulator");
  }

  return res.json();
}

export async function checkSystemHealth(): Promise<{
  status: string;
  activePrimary: string;
  providers: { gemini: boolean; openai: boolean; anthropic: boolean; mockEngine: boolean };
}> {
  const res = await fetch("/api/health");
  if (!res.ok) throw new Error("Health check failed");
  return res.json();
}

export async function fetchPitchHealthCheck(
  input: PitchInput
): Promise<{ success: boolean; healthCheck: PitchHealthCheck }> {
  const res = await fetch("/api/pitch-health-check", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: "Health check failed" }));
    throw new Error(err.error || "Failed to fetch pitch health check");
  }

  return res.json();
}

