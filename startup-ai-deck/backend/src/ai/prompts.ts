import { PitchInput, SlideType } from "../types/schema.js";

/**
 * Builds system & user prompts for generating all 9 slides together
 */
export function buildDeckGenerationPrompt(input: PitchInput): {
  systemPrompt: string;
  userPrompt: string;
} {
  const toneGuide: Record<string, string> = {
    professional: "Authoritative, data-backed, institutional rigor, clear operating leverage.",
    enthusiastic: "High-energy, contagious momentum, bold customer excitement, mission-driven.",
    formal: "Institutional grade, disciplined governance, structured risk mitigation, Wall Street readiness.",
    punchy: "Aggressively concise, metrics-forward, crisp bullet points, zero fluff. VC favorite.",
    story: "Narrative arc, emotional resonance, customer journey, mission-driven. Accelerator style.",
    technical: "Deep-tech focus, architectural defensibility, engineering moat, rigorous specifications.",
    visionary: "High conviction, category creation, paradigm shift, bold market transformation.",
  };
  const selectedTone = toneGuide[input.tone] || toneGuide.professional;

  const audienceGuide = {
    vc: "Venture Capitalists looking for 100x venture-scale returns, high defensibility, and hyper-scalable unit economics.",
    accelerator: "Selection committee looking for rapid founder coachability, velocity, strong problem-founder fit, and fast iteration.",
    angel: "High-net-worth angels looking for passion, founder grit, early proof of concept, and fair entry valuation.",
  }[input.audiencePersona];

  const lengthGuide = {
    concise: "Ultra-brief, high signal-to-noise ratio, maximum 3 bullet points per section.",
    standard: "Balanced depth, 3-4 structured bullet points with concrete details and metrics.",
    detailed: "In-depth comprehensive breakdown, detailed explanations, and rich proof points.",
  }[input.length];

  const systemPrompt = `You are a world-class Startup Pitch Deck Architect and Former Tier-1 Venture Capitalist.
Your mission is to convert the founder's raw startup idea into a structured, investor-ready 9-slide pitch deck.

AUDIENCE CONTEXT: ${audienceGuide}
TONE DIRECTIVE: ${selectedTone}
LENGTH DIRECTIVE: ${lengthGuide}

CRITICAL RULES:
1. Return ONLY a valid, raw JSON object matching the requested schema. Do NOT wrap in markdown codeblocks (no \`\`\`json).
2. Maintain 100% narrative consistency across all 9 slides. The startup name "${input.startupName}", core problem, target customer, and value proposition MUST be seamlessly synchronized.
3. Replace generic startup platitudes with concrete domain-specific terminology, realistic unit economics, realistic TAM/SAM/SOM calculations with credible methodology, and actionable milestones.
4. Each slide must include a tailored 'suggestedVisual' object with 'type', 'label', and 'description'.
   Valid types: 'matrix', 'funnel', 'market-circles', 'architecture', 'value-chain', 'growth-chart', 'team-org', 'donut-allocation'.`;

  const userPrompt = `Generate the full 9-slide pitch deck JSON for the following startup:

STARTUP PROFILE:
- Startup Name: ${input.startupName}
- One-Liner: ${input.oneLiner}
- Problem Statement: ${input.problem}
- Target Customer: ${input.targetCustomer}
- Industry / Sector: ${input.industry}
- Founder's Raw Description & Notes: ${input.freeTextDescription || "N/A"}
- Target Audience: ${input.audiencePersona.toUpperCase()}
- Tone: ${input.tone}
- Depth: ${input.length}

REQUIRED JSON STRUCTURE:
{
  "problem": {
    "title": "Problem",
    "slideType": "problem",
    "headline": "A punchy 8-12 word synthesis of the core bleeding-neck problem",
    "painPoints": [
      { "point": "Specific quantified customer pain", "impact": "Business/personal cost or friction" }
    ],
    "currentAlternatives": "Why legacy solutions, spreadsheets, or incumbents fail",
    "whyNow": "Macro tailwind (tech, regulatory, behavioral shift) making this urgent today",
    "suggestedVisual": { "type": "matrix", "label": "Pain Severity vs Frequency Matrix", "description": "2x2 plot of acute pain points" },
    "speakerNotes": "1-2 sentences of high-impact script for the founder during this slide"
  },
  "solution": {
    "title": "Solution",
    "slideType": "solution",
    "headline": "Clear, compelling statement of how you solve it",
    "valueProposition": "The core unfair advantage and ultimate outcome delivered",
    "keyPillars": [
      { "title": "Pillar Name", "description": "How this pillar works and its tangible benefit" }
    ],
    "secretSauce": "The proprietary insight, patent, IP, or network effect that makes this defensible",
    "suggestedVisual": { "type": "funnel", "label": "Solution Value Stream Funnel", "description": "3-stage pipeline showing customer outcome delivery" },
    "speakerNotes": "Speaker script for articulating the solution"
  },
  "marketSize": {
    "title": "Market Size",
    "slideType": "marketSize",
    "headline": "Market opportunity sizing backed by bottom-up logic",
    "tam": { "value": "$XXB", "label": "Total Addressable Market", "explanation": "Global universe of potential buyers" },
    "sam": { "value": "$XXB", "label": "Serviceable Addressable Market", "explanation": "Target segment accessible with current product" },
    "som": { "value": "$XXM", "label": "Serviceable Obtainable Market", "explanation": "Realistic capture over next 2-3 years" },
    "growthDriver": "Key compound annual growth rate (CAGR) or structural catalyst",
    "disclaimer": "AI-estimated based on current sector benchmarks; verify with primary research",
    "suggestedVisual": { "type": "market-circles", "label": "TAM / SAM / SOM Concentric Target", "description": "Concentric breakdown of total vs serviceable opportunity" },
    "speakerNotes": "How to defend these numbers when pressed by investors"
  },
  "product": {
    "title": "Product",
    "slideType": "product",
    "headline": "How the product delivers magical UX and measurable outcomes",
    "overview": "High-level functional architecture and user journey",
    "coreFeatures": [
      { "feature": "Feature Name", "benefit": "Quantified value delivered to end user" }
    ],
    "techMoat": "Algorithmic, hardware, or integration defensibility",
    "status": "Current stage (e.g. Working MVP, Private Beta, Live in Production)",
    "suggestedVisual": { "type": "architecture", "label": "3-Tier Product Architecture", "description": "Data Ingestion -> Intelligence Engine -> User Interface" },
    "speakerNotes": "Founder script highlighting product velocity and customer delight"
  },
  "businessModel": {
    "title": "Business Model",
    "slideType": "businessModel",
    "headline": "How we monetize sustainably with high operating leverage",
    "pricingModel": "Specific pricing strategy (e.g., Tiered B2B SaaS, Usage-based API, Commission %)",
    "revenueStreams": [
      { "stream": "Primary Stream", "details": "Pricing breakdown and ACV" }
    ],
    "unitEconomics": {
      "cac": "$XXX estimated blended CAC",
      "ltv": "$X,XXX estimated customer lifetime value",
      "payback": "X months payback window",
      "margin": "XX% gross margins at scale"
    },
    "salesMotion": "Inbound PLG, enterprise outbound, or channel partner distribution",
    "suggestedVisual": { "type": "value-chain", "label": "Revenue Engine Flowchart", "description": "Customer acquisition to recurring expansion model" },
    "speakerNotes": "Defending unit economics and cash flow timeline"
  },
  "competition": {
    "title": "Competition",
    "slideType": "competition",
    "headline": "Our defensible positioning in a crowded or emerging space",
    "landscape": "Macro summary of incumbents, legacy tools, and emerging point-solutions",
    "competitors": [
      { "name": "Incumbent / Alternative A", "limitation": "What they lack or overprice", "ourAdvantage": "How we beat them decisively" }
    ],
    "defensibilityMoat": "Network effect, proprietary dataset, distribution lock-in, or switching cost",
    "suggestedVisual": { "type": "matrix", "label": "2x2 Competitor Differentiation Matrix", "description": "Positioning along two decisive competitive axes" },
    "speakerNotes": "How to handle 'What if Google or an incumbent copies you?'"
  },
  "traction": {
    "title": "Traction & Milestones",
    "slideType": "traction",
    "headline": "Validation, growth momentum, and execution velocity",
    "metrics": [
      { "label": "Key Metric (e.g. ARR, Pilots, Waitlist, Retention)", "value": "Number", "change": "+XX% MoM or status" }
    ],
    "milestones": [
      { "time": "Q1 202X", "achievement": "Significant milestone completed" }
    ],
    "socialProof": "Notable pilot customer quote, advisor endorsement, or design partner feedback",
    "suggestedVisual": { "type": "growth-chart", "label": "Metric Growth Curve", "description": "Quarterly hockey-stick adoption and pilot trajectory" },
    "speakerNotes": "Emphasizing compounding velocity and customer love"
  },
  "team": {
    "title": "Team",
    "slideType": "team",
    "headline": "The uniquely qualified team built to win this category",
    "members": [
      { "role": "CEO / Co-Founder", "background": "Ex-Stripe engineer / serial domain operator", "superpower": "Deep domain expertise and GTM hustle" }
    ],
    "advisors": "Key industry mentors or board advisors lending credibility",
    "whyUs": "The unfair founder-market fit that ensures we cannot be outworked or out-innovated",
    "suggestedVisual": { "type": "team-org", "label": "Team Capability Matrix", "description": "Balanced cross-functional leadership nodes" },
    "speakerNotes": "Conveying founder grit, chemistry, and long-term commitment"
  },
  "ask": {
    "title": "The Ask & Funding",
    "slideType": "ask",
    "headline": "Capital required to reach definitive next-tier valuation milestones",
    "targetRaise": "$X.XM Seed / Pre-Seed Round",
    "runwayMonths": "18-24 months of operational runway",
    "allocation": [
      { "category": "Engineering & Product R&D", "percentage": 45, "purpose": "Hire 3 senior engineers & scale infrastructure" },
      { "category": "Sales & Go-To-Market", "percentage": 35, "purpose": "Customer acquisition & enterprise sales lead" },
      { "category": "Operations & Regulatory", "percentage": 20, "purpose": "Compliance, working capital, and buffer" }
    ],
    "milestonesWithCapital": [
      "Reach $1M ARR / 50 enterprise pilots",
      "Expand into secondary geographic market",
      "De-risk Series A metrics"
    ],
    "terms": "Priced Seed Round or SAFE ($XM cap)",
    "suggestedVisual": { "type": "donut-allocation", "label": "Fund Allocation Donut Chart", "description": "Percentage distribution of round proceeds across core drivers" },
    "speakerNotes": "Closing ask: Call to action for term sheets and next diligence steps"
  }
}`;

  return { systemPrompt, userPrompt };
}

/**
 * Builds prompt for regenerating a single slide while preserving context
 */
export function buildSingleSlideRegeneratePrompt(
  slideType: SlideType,
  input: PitchInput,
  currentDeckContext?: string
): { systemPrompt: string; userPrompt: string } {
  const systemPrompt = `You are a Startup Pitch Deck Architect.
The founder requested to REGENERATE only the "${slideType}" slide.
Maintain 100% narrative alignment with startup "${input.startupName}" in ${input.industry}.
Return ONLY the JSON for this single slide (matching the slide schema). No preamble, no markdown fences.`;

  const userPrompt = `Regenerate the "${slideType}" slide for:
Startup: ${input.startupName}
One-Liner: ${input.oneLiner}
Problem: ${input.problem}
Target Customer: ${input.targetCustomer}
Industry: ${input.industry}
Tone: ${input.tone}
Audience: ${input.audiencePersona}
Depth: ${input.length}
Additional Notes: ${input.freeTextDescription || "None"}

${currentDeckContext ? `CURRENT DECK CONTEXT:\n${currentDeckContext}` : ""}`;

  return { systemPrompt, userPrompt };
}

/**
 * Builds prompt for startup readiness scoring
 */
export function buildScorePrompt(input: PitchInput): {
  systemPrompt: string;
  userPrompt: string;
} {
  const systemPrompt = `You are a Senior Venture Capitalist evaluating early-stage pitch deck readiness.
Score this startup proposal honestly from 1 to 100.
Identify exact strengths, critical vulnerabilities, missing elements that investors will demand, and actionable recommendations.
Return ONLY raw JSON matching the readinessScoreSchema.`;

  const userPrompt = `Evaluate this startup pitch:
Startup Name: ${input.startupName}
One-Liner: ${input.oneLiner}
Problem Statement: ${input.problem}
Target Customer: ${input.targetCustomer}
Industry: ${input.industry}
Raw Pitch Notes: ${input.freeTextDescription || "N/A"}

REQUIRED JSON FORMAT:
{
  "overallScore": 84,
  "grade": "B+",
  "summary": "Synthesized 2-sentence VC appraisal of the investment thesis",
  "strengths": ["Strength 1", "Strength 2", "Strength 3"],
  "weaknesses": ["Vulnerability 1", "Vulnerability 2", "Vulnerability 3"],
  "missingElements": ["Missing item 1", "Missing item 2", "Missing item 3"],
  "recommendations": ["Recommendation 1", "Recommendation 2", "Recommendation 3"],
  "categoryScores": {
    "narrative": 85,
    "market": 80,
    "defensibility": 75,
    "businessModel": 82
  }
}`;

  return { systemPrompt, userPrompt };
}

/**
 * Builds prompt for Investor Q&A generation (10 tough questions)
 */
export function buildQAPrompt(input: PitchInput): {
  systemPrompt: string;
  userPrompt: string;
} {
  const systemPrompt = `You are a skeptical, sharp Silicon Valley VC partner preparing a founder for partner-meeting diligence.
Generate exactly 10 tough, non-obvious questions that scrutinize unit economics, defensibility, competition, GTM distribution, and technical bottlenecks for this specific startup.
Return ONLY raw JSON matching the investorQASchema (an array of 10 objects).`;

  const userPrompt = `Generate 10 tough investor questions for:
Startup: ${input.startupName} (${input.oneLiner})
Problem: ${input.problem}
Target Customer: ${input.targetCustomer}
Industry: ${input.industry}
Notes: ${input.freeTextDescription || ""}

FORMAT AS JSON ARRAY OF 10 OBJECTS:
[
  {
    "id": "q1",
    "question": "Realistic, pointed investor question",
    "category": "Defensibility & Moat",
    "difficulty": "Tough",
    "suggestedTalkingPoints": [
      "Key pivot point or metric to highlight",
      "Defensive moat proof"
    ],
    "trapToAvoid": "The fatal error most rookie founders make when answering this"
  }
]`;

  return { systemPrompt, userPrompt };
}

/**
 * Builds system prompt for the interactive "Ask the VC" Chatbot
 */
export function buildVCChatPrompt(
  input: PitchInput,
  deckSummary?: string
): string {
  return `You are "Marcus Vance", a Partner at Horizon Capital (a top-tier early-stage VC fund).
You are conducting an interactive pitch diligence session with the founder of "${input.startupName}".

FOUNDER'S STARTUP CONTEXT:
- Name: ${input.startupName}
- One-Liner: ${input.oneLiner}
- Problem: ${input.problem}
- Target Customer: ${input.targetCustomer}
- Sector: ${input.industry}
${deckSummary ? `- Deck Highlights: ${deckSummary}` : ""}

YOUR PERSONA & BEHAVIOR:
- You are sharp, intellectually honest, respectful, but relentlessly skeptical about hype, vanity metrics, and unproven moats.
- You ask pointed questions about: Customer acquisition cost (CAC) vs Lifetime Value (LTV), retention, sales cycles, incumbent response, margin erosion, and founder-market fit.
- When the founder gives a good answer, acknowledge it briefly with insightful nuance, then push deeper into the next operational bottleneck.
- If the founder gives a vague or buzzword-laden answer, call it out directly ("That sounds like a marketing slogan. Give me the actual unit economics...").
- Always conclude each turn with one probing question or challenge that forces the founder to defend their thesis.

Respond with a JSON object:
{
  "reply": "Your response as Marcus Vance",
  "sentiment": "skeptical" | "probing" | "impressed" | "intrigued",
  "suggestedFollowUps": ["Question the founder could ask or answer next"]
}`;
}
