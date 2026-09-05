import { z } from "zod";

// --- STARTUP INPUT SCHEMA ---
export const pitchInputSchema = z.object({
  startupName: z.string().min(2, "Startup name must be at least 2 characters"),
  oneLiner: z.string().min(5, "One-liner must be at least 5 characters"),
  problem: z.string().min(10, "Problem description must be at least 10 characters"),
  targetCustomer: z.string().min(3, "Target customer must be specified"),
  industry: z.string().min(2, "Industry must be specified"),
  freeTextDescription: z.string().optional().default(""),
  audiencePersona: z.enum(["vc", "accelerator", "angel"]).default("vc"),
  tone: z
    .enum([
      "professional",
      "enthusiastic",
      "formal",
      "punchy",
      "story",
      "technical",
      "visionary",
    ])
    .default("professional"),
  length: z.enum(["concise", "standard", "detailed"]).default("standard"),
});

export type PitchInput = z.infer<typeof pitchInputSchema>;

// Visual Diagram Suggestion Schema
export const visualSuggestionSchema = z.object({
  type: z.enum([
    "matrix",
    "funnel",
    "market-circles",
    "architecture",
    "value-chain",
    "growth-chart",
    "team-org",
    "donut-allocation",
  ]),
  label: z.string(),
  description: z.string(),
});

export type VisualSuggestion = z.infer<typeof visualSuggestionSchema>;

// --- 9 CORE SLIDE SCHEMAS ---

export const problemSlideSchema = z.object({
  title: z.literal("Problem"),
  slideType: z.literal("problem"),
  headline: z.string(),
  painPoints: z.array(
    z.object({
      point: z.string(),
      impact: z.string(),
    })
  ).min(2),
  currentAlternatives: z.string(),
  whyNow: z.string(),
  suggestedVisual: visualSuggestionSchema,
  speakerNotes: z.string(),
});

export const solutionSlideSchema = z.object({
  title: z.literal("Solution"),
  slideType: z.literal("solution"),
  headline: z.string(),
  valueProposition: z.string(),
  keyPillars: z.array(
    z.object({
      title: z.string(),
      description: z.string(),
    })
  ).min(2),
  secretSauce: z.string(),
  suggestedVisual: visualSuggestionSchema,
  speakerNotes: z.string(),
});

export const marketSizeSlideSchema = z.object({
  title: z.literal("Market Size"),
  slideType: z.literal("marketSize"),
  headline: z.string(),
  tam: z.object({
    value: z.string(),
    label: z.string(),
    explanation: z.string(),
  }),
  sam: z.object({
    value: z.string(),
    label: z.string(),
    explanation: z.string(),
  }),
  som: z.object({
    value: z.string(),
    label: z.string(),
    explanation: z.string(),
  }),
  growthDriver: z.string(),
  disclaimer: z.string(),
  suggestedVisual: visualSuggestionSchema,
  speakerNotes: z.string(),
});

export const productSlideSchema = z.object({
  title: z.literal("Product"),
  slideType: z.literal("product"),
  headline: z.string(),
  overview: z.string(),
  coreFeatures: z.array(
    z.object({
      feature: z.string(),
      benefit: z.string(),
    })
  ).min(3),
  techMoat: z.string(),
  status: z.string(),
  suggestedVisual: visualSuggestionSchema,
  speakerNotes: z.string(),
});

export const businessModelSlideSchema = z.object({
  title: z.literal("Business Model"),
  slideType: z.literal("businessModel"),
  headline: z.string(),
  pricingModel: z.string(),
  revenueStreams: z.array(
    z.object({
      stream: z.string(),
      details: z.string(),
    })
  ).min(2),
  unitEconomics: z.object({
    cac: z.string(),
    ltv: z.string(),
    payback: z.string(),
    margin: z.string(),
  }),
  salesMotion: z.string(),
  suggestedVisual: visualSuggestionSchema,
  speakerNotes: z.string(),
});

export const competitionSlideSchema = z.object({
  title: z.literal("Competition"),
  slideType: z.literal("competition"),
  headline: z.string(),
  landscape: z.string(),
  competitors: z.array(
    z.object({
      name: z.string(),
      limitation: z.string(),
      ourAdvantage: z.string(),
    })
  ).min(2),
  defensibilityMoat: z.string(),
  suggestedVisual: visualSuggestionSchema,
  speakerNotes: z.string(),
});

export const tractionSlideSchema = z.object({
  title: z.literal("Traction & Milestones"),
  slideType: z.literal("traction"),
  headline: z.string(),
  metrics: z.array(
    z.object({
      label: z.string(),
      value: z.string(),
      change: z.string(),
    })
  ).min(3),
  milestones: z.array(
    z.object({
      time: z.string(),
      achievement: z.string(),
    })
  ).min(2),
  socialProof: z.string(),
  suggestedVisual: visualSuggestionSchema,
  speakerNotes: z.string(),
});

export const teamSlideSchema = z.object({
  title: z.literal("Team"),
  slideType: z.literal("team"),
  headline: z.string(),
  members: z.array(
    z.object({
      role: z.string(),
      background: z.string(),
      superpower: z.string(),
    })
  ).min(2),
  advisors: z.string(),
  whyUs: z.string(),
  suggestedVisual: visualSuggestionSchema,
  speakerNotes: z.string(),
});

export const askSlideSchema = z.object({
  title: z.literal("The Ask & Funding"),
  slideType: z.literal("ask"),
  headline: z.string(),
  targetRaise: z.string(),
  runwayMonths: z.string(),
  allocation: z.array(
    z.object({
      category: z.string(),
      percentage: z.number(),
      purpose: z.string(),
    })
  ).min(3),
  milestonesWithCapital: z.array(z.string()).min(2),
  terms: z.string(),
  suggestedVisual: visualSuggestionSchema,
  speakerNotes: z.string(),
});

// Union of all slide types
export type SlideData =
  | z.infer<typeof problemSlideSchema>
  | z.infer<typeof solutionSlideSchema>
  | z.infer<typeof marketSizeSlideSchema>
  | z.infer<typeof productSlideSchema>
  | z.infer<typeof businessModelSlideSchema>
  | z.infer<typeof competitionSlideSchema>
  | z.infer<typeof tractionSlideSchema>
  | z.infer<typeof teamSlideSchema>
  | z.infer<typeof askSlideSchema>;

export const slideTypeEnum = z.enum([
  "problem",
  "solution",
  "marketSize",
  "product",
  "businessModel",
  "competition",
  "traction",
  "team",
  "ask",
]);

export type SlideType = z.infer<typeof slideTypeEnum>;

// Full Deck Schema
export const deckSchema = z.object({
  problem: problemSlideSchema,
  solution: solutionSlideSchema,
  marketSize: marketSizeSlideSchema,
  product: productSlideSchema,
  businessModel: businessModelSlideSchema,
  competition: competitionSlideSchema,
  traction: tractionSlideSchema,
  team: teamSlideSchema,
  ask: askSlideSchema,
});

export type DeckData = z.infer<typeof deckSchema>;

// --- READINESS SCORE SCHEMA ---
export const readinessScoreSchema = z.object({
  overallScore: z.number().min(1).max(100),
  grade: z.string(),
  summary: z.string(),
  strengths: z.array(z.string()).min(3),
  weaknesses: z.array(z.string()).min(3),
  missingElements: z.array(z.string()).min(2),
  recommendations: z.array(z.string()).min(3),
  categoryScores: z.object({
    narrative: z.number().min(0).max(100),
    market: z.number().min(0).max(100),
    defensibility: z.number().min(0).max(100),
    businessModel: z.number().min(0).max(100),
  }),
});

export type ReadinessScore = z.infer<typeof readinessScoreSchema>;

// --- INVESTOR Q&A SCHEMA ---
export const qaItemSchema = z.object({
  id: z.string(),
  question: z.string(),
  category: z.string(),
  difficulty: z.enum(["Crucial", "Tough", "Aggressive"]),
  suggestedTalkingPoints: z.array(z.string()).min(2),
  trapToAvoid: z.string(),
});

export const investorQASchema = z.array(qaItemSchema).min(8);

export type QAItem = z.infer<typeof qaItemSchema>;
export type InvestorQA = z.infer<typeof investorQASchema>;

// --- INVESTOR CHATBOT SCHEMA ---
export const chatMessageSchema = z.object({
  role: z.enum(["user", "assistant", "system"]),
  content: z.string(),
});

export const chatRequestSchema = z.object({
  messages: z.array(chatMessageSchema),
  pitchInput: pitchInputSchema,
  deckSummary: z.string().optional(),
});

export const chatResponseSchema = z.object({
  reply: z.string(),
  sentiment: z.enum(["skeptical", "probing", "impressed", "intrigued"]),
  suggestedFollowUps: z.array(z.string()).min(1),
});

export type ChatRequest = z.infer<typeof chatRequestSchema>;
export type ChatResponse = z.infer<typeof chatResponseSchema>;

// --- STARTUP PITCH HEALTH CHECK (VITAL SIGNS & DIAGNOSTICS) ---
export const vitalSignSchema = z.object({
  score: z.number().min(0).max(100),
  status: z.enum(["Healthy", "Caution", "Critical"]),
  diagnosis: z.string(),
});

export const pitchHealthCheckSchema = z.object({
  healthIndex: z.number().min(1).max(100),
  overallCondition: z.enum([
    "Venture Fit (Prime)",
    "Stable (Needs Tuning)",
    "Fragile (Critical Gaps)",
  ]),
  vitalSigns: z.object({
    narrativeVitality: vitalSignSchema,
    financialPulse: vitalSignSchema,
    moatImmunity: vitalSignSchema,
    growthVelocity: vitalSignSchema,
    runwayOxygen: vitalSignSchema,
  }),
  redFlags: z.array(z.string()).min(2),
  prescriptions: z.array(z.string()).min(2),
  investorVerdict: z.string(),
});

export type PitchHealthCheck = z.infer<typeof pitchHealthCheckSchema>;

