export interface PitchInput {
  startupName: string;
  oneLiner: string;
  problem: string;
  targetCustomer: string;
  industry: string;
  freeTextDescription: string;
  audiencePersona: "vc" | "accelerator" | "angel";
  tone: "professional" | "enthusiastic" | "formal" | "punchy" | "story" | "technical" | "visionary";
  length: "concise" | "standard" | "detailed";
}

export type VisualType =
  | "matrix"
  | "funnel"
  | "market-circles"
  | "architecture"
  | "value-chain"
  | "growth-chart"
  | "team-org"
  | "donut-allocation";

export interface SuggestedVisual {
  type: VisualType;
  label: string;
  description: string;
}

export interface ProblemSlide {
  title: "Problem";
  slideType: "problem";
  headline: string;
  painPoints: Array<{ point: string; impact: string }>;
  currentAlternatives: string;
  whyNow: string;
  suggestedVisual: SuggestedVisual;
  speakerNotes: string;
}

export interface SolutionSlide {
  title: "Solution";
  slideType: "solution";
  headline: string;
  valueProposition: string;
  keyPillars: Array<{ title: string; description: string }>;
  secretSauce: string;
  suggestedVisual: SuggestedVisual;
  speakerNotes: string;
}

export interface MarketSizeSlide {
  title: "Market Size";
  slideType: "marketSize";
  headline: string;
  tam: { value: string; label: string; explanation: string };
  sam: { value: string; label: string; explanation: string };
  som: { value: string; label: string; explanation: string };
  growthDriver: string;
  disclaimer: string;
  suggestedVisual: SuggestedVisual;
  speakerNotes: string;
}

export interface ProductSlide {
  title: "Product";
  slideType: "product";
  headline: string;
  overview: string;
  coreFeatures: Array<{ feature: string; benefit: string }>;
  techMoat: string;
  status: string;
  suggestedVisual: SuggestedVisual;
  speakerNotes: string;
}

export interface BusinessModelSlide {
  title: "Business Model";
  slideType: "businessModel";
  headline: string;
  pricingModel: string;
  revenueStreams: Array<{ stream: string; details: string }>;
  unitEconomics: {
    cac: string;
    ltv: string;
    payback: string;
    margin: string;
  };
  salesMotion: string;
  suggestedVisual: SuggestedVisual;
  speakerNotes: string;
}

export interface CompetitionSlide {
  title: "Competition";
  slideType: "competition";
  headline: string;
  landscape: string;
  competitors: Array<{ name: string; limitation: string; ourAdvantage: string }>;
  defensibilityMoat: string;
  suggestedVisual: SuggestedVisual;
  speakerNotes: string;
}

export interface TractionSlide {
  title: "Traction & Milestones";
  slideType: "traction";
  headline: string;
  metrics: Array<{ label: string; value: string; change: string }>;
  milestones: Array<{ time: string; achievement: string }>;
  socialProof: string;
  suggestedVisual: SuggestedVisual;
  speakerNotes: string;
}

export interface TeamSlide {
  title: "Team";
  slideType: "team";
  headline: string;
  members: Array<{ role: string; background: string; superpower: string }>;
  advisors: string;
  whyUs: string;
  suggestedVisual: SuggestedVisual;
  speakerNotes: string;
}

export interface AskSlide {
  title: "The Ask & Funding";
  slideType: "ask";
  headline: string;
  targetRaise: string;
  runwayMonths: string;
  allocation: Array<{ category: string; percentage: number; purpose: string }>;
  milestonesWithCapital: string[];
  terms: string;
  suggestedVisual: SuggestedVisual;
  speakerNotes: string;
}

export type SlideData =
  | ProblemSlide
  | SolutionSlide
  | MarketSizeSlide
  | ProductSlide
  | BusinessModelSlide
  | CompetitionSlide
  | TractionSlide
  | TeamSlide
  | AskSlide;

export type SlideType =
  | "problem"
  | "solution"
  | "marketSize"
  | "product"
  | "businessModel"
  | "competition"
  | "traction"
  | "team"
  | "ask";

export interface DeckData {
  problem: ProblemSlide;
  solution: SolutionSlide;
  marketSize: MarketSizeSlide;
  product: ProductSlide;
  businessModel: BusinessModelSlide;
  competition: CompetitionSlide;
  traction: TractionSlide;
  team: TeamSlide;
  ask: AskSlide;
}

export interface ReadinessScore {
  overallScore: number;
  grade: string;
  summary: string;
  strengths: string[];
  weaknesses: string[];
  missingElements: string[];
  recommendations: string[];
  categoryScores: {
    narrative: number;
    market: number;
    defensibility: number;
    businessModel: number;
  };
}

export interface QAItem {
  id: string;
  question: string;
  category: string;
  difficulty: "Crucial" | "Tough" | "Aggressive";
  suggestedTalkingPoints: string[];
  trapToAvoid: string;
}

export type InvestorQA = QAItem[];

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  sentiment?: "skeptical" | "probing" | "impressed" | "intrigued";
  suggestedFollowUps?: string[];
}

export interface VitalSign {
  score: number;
  status: "Healthy" | "Caution" | "Critical";
  diagnosis: string;
}

export interface PitchHealthCheck {
  healthIndex: number;
  overallCondition: "Venture Fit (Prime)" | "Stable (Needs Tuning)" | "Fragile (Critical Gaps)";
  vitalSigns: {
    narrativeVitality: VitalSign;
    financialPulse: VitalSign;
    moatImmunity: VitalSign;
    growthVelocity: VitalSign;
    runwayOxygen: VitalSign;
  };
  redFlags: string[];
  prescriptions: string[];
  investorVerdict: string;
}

// 4 Pre-built Demo Presets
export const DEMO_PRESETS: Array<{
  id: string;
  name: string;
  tagline: string;
  category: string;
  data: PitchInput;
}> = [
  {
    id: "campus-bite",
    name: "CampusBite",
    tagline: "Autonomous Campus Delivery",
    category: "Robotics & AI",
    data: {
      startupName: "CampusBite",
      oneLiner: "Autonomous 15-minute food and grocery delivery rovers for university campuses",
      problem: "Campus dining facilities shut down early, and third-party apps charge $7-$10 delivery fees with 55+ minute wait times for dorm drop-offs.",
      targetCustomer: "University students, campus staff, and local fast-casual merchants",
      industry: "Autonomous Robotics & FoodTech",
      freeTextDescription: "We deploy compact, pedestrian-safe sidewalk electric rovers. Students unlock orders using their smartphone NFC. Average order delivery time is 12 minutes at a flat $1.99 fee.",
      audiencePersona: "vc",
      tone: "punchy",
      length: "standard",
    },
  },
  {
    id: "pathoscan-ai",
    name: "PathoScan AI",
    tagline: "Multimodal Oncology Diagnostics",
    category: "HealthTech / BioAI",
    data: {
      startupName: "PathoScan AI",
      oneLiner: "Real-time AI diagnostic copilot for biopsy pathology and tumor margin analysis",
      problem: "Severe global shortage of clinical pathologists causes 14-21 day biopsy turnaround delays and a 12% diagnostic discordance rate in solid tumors.",
      targetCustomer: "Hospital pathology departments, regional cancer centers, and surgical labs",
      industry: "Digital Health & Bio-AI",
      freeTextDescription: "Our vision transformer scans gigapixel histology whole-slide images in 45 seconds, flagging micro-metastases with 99.4% sensitivity and integrating directly into existing hospital LIS software.",
      audiencePersona: "vc",
      tone: "technical",
      length: "detailed",
    },
  },
  {
    id: "ecopack",
    name: "EcoPack Materials",
    tagline: "Seaweed-Based Packaging",
    category: "ClimateTech",
    data: {
      startupName: "EcoPack Materials",
      oneLiner: "100% home-compostable marine-degrading protective packaging synthesized from farmed seaweed",
      problem: "Single-use expanded polystyrene (Styrofoam) takes 500+ years to decompose, and emerging EU/US plastic bans are imposing millions in non-compliance penalties on brands.",
      targetCustomer: "Consumer electronics brands, luxury cosmetics, and cold-chain pharma shippers",
      industry: "Sustainable Materials & Packaging",
      freeTextDescription: "We developed a proprietary thermo-molded macroalgae polymer that biodegrades in backyard soil within 28 days and dissolves safely in ocean water without microplastics, at price parity with high-grade foams.",
      audiencePersona: "accelerator",
      tone: "story",
      length: "standard",
    },
  },
  {
    id: "microvest",
    name: "MicroVest Africa",
    tagline: "Fractional Dollar Treasury Yields",
    category: "FinTech / Emerging Markets",
    data: {
      startupName: "MicroVest Africa",
      oneLiner: "Mobile-first fractional US Treasury savings and inflation protection for young African professionals",
      problem: "Local currencies across Sub-Saharan Africa lose 25-60% of purchasing power annually to domestic inflation, with strict capital controls preventing ordinary savers from accessing stable dollar assets.",
      targetCustomer: "Remote tech workers, freelance creatives, and young urban professionals in Nigeria and Kenya",
      industry: "FinTech & WealthTech",
      freeTextDescription: "Users save as little as $5 into tokenized short-term US Treasury Bills (yielding 4.5%+) via mobile money (M-Pesa / Bank Transfer) in under 60 seconds with institutional custody.",
      audiencePersona: "angel",
      tone: "visionary",
      length: "standard",
    },
  },
];
