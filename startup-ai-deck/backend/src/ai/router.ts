import { z } from "zod";
import { callGemini } from "./gemini.js";
import {
  generateMockDeck,
  generateMockSingleSlide,
  generateMockScore,
  generateMockQA,
  generateMockVCChatReply,
  generateMockPitchHealthCheck,
} from "./mockEngine.js";
import {
  buildDeckGenerationPrompt,
  buildSingleSlideRegeneratePrompt,
  buildScorePrompt,
  buildQAPrompt,
  buildVCChatPrompt,
} from "./prompts.js";
import {
  PitchInput,
  SlideType,
  DeckData,
  SlideData,
  ReadinessScore,
  InvestorQA,
  ChatResponse,
  deckSchema,
  readinessScoreSchema,
  investorQASchema,
  chatResponseSchema,
  problemSlideSchema,
  solutionSlideSchema,
  marketSizeSlideSchema,
  productSlideSchema,
  businessModelSlideSchema,
  competitionSlideSchema,
  tractionSlideSchema,
  teamSlideSchema,
  askSlideSchema,
  pitchHealthCheckSchema,
  PitchHealthCheck,
} from "../types/schema.js";

interface GenerateResult<T> {
  result: T;
  model: string;
  isMock: boolean;
}

const slideSchemaMap: Record<SlideType, z.ZodSchema<any>> = {
  problem: problemSlideSchema,
  solution: solutionSlideSchema,
  marketSize: marketSizeSlideSchema,
  product: productSlideSchema,
  businessModel: businessModelSlideSchema,
  competition: competitionSlideSchema,
  traction: tractionSlideSchema,
  team: teamSlideSchema,
  ask: askSlideSchema,
};

/**
 * AI Router: Strictly Google Gemini AI (Primary) with anti-hallucination Zod gate
 * and intelligent contextual reasoning engine fallback. No OpenAI or Anthropic keys.
 */
async function routeWithValidation<T>(
  systemPrompt: string,
  userPrompt: string,
  schema: z.ZodSchema<T>,
  mockFallbackFn: () => T,
  operationName: string
): Promise<GenerateResult<T>> {
  // Primary AI Engine: Google Gemini 2.5 Flash
  try {
    const hasGeminiKey = Boolean(process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY);
    if (hasGeminiKey) {
      console.log(`[Router] Executing Google Gemini 2.5 Flash for ${operationName}...`);
      const rawJson = await callGemini(systemPrompt, userPrompt);
      const parsed = JSON.parse(rawJson);
      const validated = schema.safeParse(parsed);

      if (validated.success) {
        console.log(`[Router] Google Gemini passed Zod validation for ${operationName}`);
        return { result: validated.data, model: "gemini-2.5-flash", isMock: false };
      } else {
        console.warn(
          `[Router] Gemini output failed Zod validation for ${operationName}:`,
          validated.error.issues
        );
      }
    } else {
      console.log(`[Router] No GEMINI_API_KEY detected. Using Intelligent Context Engine.`);
    }
  } catch (err: any) {
    console.warn(`[Router] Google Gemini invocation issue for ${operationName}:`, err.message || err);
  }

  // Fallback Engine: Context-Aware Reasoning Engine (Guaranteed Zero-Failure Output)
  console.log(`[Router] Generating via Context-Aware Reasoning Engine for ${operationName}`);
  const mockResult = mockFallbackFn();
  return { result: mockResult, model: "context-reasoning-engine", isMock: true };
}

/**
 * Generate full 9-slide pitch deck
 */
export async function generateFullDeck(input: PitchInput): Promise<GenerateResult<DeckData>> {
  const { systemPrompt, userPrompt } = buildDeckGenerationPrompt(input);
  return routeWithValidation(
    systemPrompt,
    userPrompt,
    deckSchema,
    () => generateMockDeck(input),
    "Full Deck Generation"
  );
}

/**
 * Regenerate single slide with deck context injection
 */
export async function regenerateSlide(
  slideType: SlideType,
  input: PitchInput,
  currentContext?: string
): Promise<GenerateResult<SlideData>> {
  const { systemPrompt, userPrompt } = buildSingleSlideRegeneratePrompt(
    slideType,
    input,
    currentContext
  );
  const targetSchema = slideSchemaMap[slideType];

  return routeWithValidation(
    systemPrompt,
    userPrompt,
    targetSchema,
    () => generateMockSingleSlide(slideType, input),
    `Regenerate ${slideType} slide`
  );
}

/**
 * Generate Startup Readiness Score
 */
export async function generateReadinessScore(
  input: PitchInput
): Promise<GenerateResult<ReadinessScore>> {
  const { systemPrompt, userPrompt } = buildScorePrompt(input);
  return routeWithValidation(
    systemPrompt,
    userPrompt,
    readinessScoreSchema,
    () => generateMockScore(input),
    "Readiness Score"
  );
}

/**
 * Generate 10 Tough Investor Questions & Answers
 */
export async function generateInvestorQA(
  input: PitchInput
): Promise<GenerateResult<InvestorQA>> {
  const { systemPrompt, userPrompt } = buildQAPrompt(input);
  return routeWithValidation(
    systemPrompt,
    userPrompt,
    investorQASchema,
    () => generateMockQA(input),
    "Investor Q&A"
  );
}

/**
 * Interactive VC Persona Chatbot query (Marcus Vance)
 */
export async function generateVCChatResponse(
  messages: Array<{ role: string; content: string }>,
  input: PitchInput,
  deckSummary?: string
): Promise<GenerateResult<ChatResponse>> {
  const systemPrompt = buildVCChatPrompt(input, deckSummary);
  const lastUserMessage =
    messages[messages.length - 1]?.content || "What do you think of this pitch?";

  const userPrompt = `The founder says:\n"${lastUserMessage}"\n\nRespond as Marcus Vance in JSON.`;

  return routeWithValidation(
    systemPrompt,
    userPrompt,
    chatResponseSchema,
    () => generateMockVCChatReply(lastUserMessage, input),
    "VC Chat Session"
  );
}

/**
 * Startup Pitch Health Check & Vital Signs Diagnostic
 */
export async function generatePitchHealthCheck(
  input: PitchInput,
  deck?: DeckData
): Promise<GenerateResult<PitchHealthCheck>> {
  const systemPrompt = `You are a Venture Capital Physician and Diligence Diagnostic Specialist.
Perform a clinical startup health check on this company across 5 vital signs:
1. narrativeVitality (Problem acute clarity & storytelling resonance)
2. financialPulse (LTV:CAC ratio, cash payback speed, gross margin leverage)
3. moatImmunity (Defensibility against Big Tech copies and incumbent bundling)
4. growthVelocity (Adoption velocity, retention pull, and pilot conversion)
5. runwayOxygen (Sufficiency of capital ask to reach Series A milestones)

Return ONLY valid JSON strictly matching pitchHealthCheckSchema.`;

  const userPrompt = `Perform Pitch Health Check for:
Startup: ${input.startupName}
One-Liner: ${input.oneLiner}
Problem: ${input.problem}
Target Customer: ${input.targetCustomer}
Industry: ${input.industry}
${deck ? `Problem Headline: ${deck.problem.headline}\nSolution: ${deck.solution.headline}\nTAM: ${deck.marketSize.tam.value}\nRaise: ${deck.ask.targetRaise}` : ""}`;

  return routeWithValidation(
    systemPrompt,
    userPrompt,
    pitchHealthCheckSchema,
    () => generateMockPitchHealthCheck(input, deck),
    "Startup Pitch Health Check"
  );
}

