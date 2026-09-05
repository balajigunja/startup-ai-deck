import {
  DeckData,
  PitchInput,
  ReadinessScore,
  InvestorQA,
  SlideType,
  SlideData,
  ChatResponse,
  PitchHealthCheck,
} from "../types/schema.js";

/**
 * Intelligent Mock Engine: Generates deep, sector-tailored pitch deck content
 * with 100% schema compliance and narrative consistency.
 */
export function generateMockDeck(input: PitchInput): DeckData {
  const { startupName, oneLiner, problem, targetCustomer, industry } = input;

  return {
    problem: {
      title: "Problem",
      slideType: "problem",
      headline: `The Critical Friction in ${industry}: Why ${targetCustomer} Are Losing Ground`,
      painPoints: [
        {
          point: `Severe operational bottleneck: ${problem}`,
          impact: "Drives 35-50% in wasted overhead and lost customer momentum.",
        },
        {
          point: "Fragmented, manual legacy workflows and disconnected tooling",
          impact: "Teams spend hours on duct-tape fixes instead of high-leverage execution.",
        },
        {
          point: "Lack of intelligent automation and proactive real-time intelligence",
          impact: "Decisions are made retroactively after revenue loss has occurred.",
        },
      ],
      currentAlternatives:
        "Incumbents rely on high-friction manual spreadsheets, generic legacy enterprise suites, or exorbitant external agency consultants.",
      whyNow:
        "Recent breakthroughs in AI agents and real-time APIs now enable 10x workflow acceleration at a fraction of legacy operating costs.",
      suggestedVisual: {
        type: "matrix",
        label: "Pain Severity vs Frequency Matrix",
        description: "2x2 matrix plotting acute daily bottlenecks against financial damage",
      },
      speakerNotes: `Investors need to feel this pain viscerally: explain how ${targetCustomer} have zero modern alternatives until ${startupName}.`,
    },
    solution: {
      title: "Solution",
      slideType: "solution",
      headline: `${startupName}: The Intelligent Breakthrough for Modern ${industry}`,
      valueProposition: `We deliver ${oneLiner} with zero onboarding friction and automated end-to-end intelligence.`,
      keyPillars: [
        {
          title: "Intelligent Automated Orchestration",
          description: "Replaces 20+ hours of manual weekly toil with instant, context-aware workflow execution.",
        },
        {
          title: "Predictive Decision Engine",
          description: "Transforms raw fragmented operational data into high-conviction, actionable recommendations.",
        },
        {
          title: "Seamless Frictionless Integration",
          description: "Connects with existing toolchains in under 5 minutes without engineering overhead.",
        },
      ],
      secretSauce:
        "Our proprietary fine-tuned contextual models and compounding closed-loop data moat increase accuracy with every transaction.",
      suggestedVisual: {
        type: "funnel",
        label: "Solution Value Pipeline",
        description: "3-stage pipeline showing raw input transformed into 10x ROI outcome",
      },
      speakerNotes: `Deliver the pitch punchline with conviction: ${startupName} is not an incremental feature; it is a foundational category leap.`,
    },
    marketSize: {
      title: "Market Size",
      slideType: "marketSize",
      headline: `A Rapidly Expanding $34B+ Total Market Driven by ${industry} Modernization`,
      tam: {
        value: "$38.5B",
        label: "Total Addressable Market",
        explanation: `Global annual spend across all enterprise and mid-market organizations in ${industry}.`,
      },
      sam: {
        value: "$7.2B",
        label: "Serviceable Addressable Market",
        explanation: `Immediate segment of tech-forward ${targetCustomer} actively seeking automated alternatives.`,
      },
      som: {
        value: "$350M",
        label: "Serviceable Obtainable Market",
        explanation: "Realistic capture target within 36 months via focused high-velocity GTM motion.",
      },
      growthDriver:
        "Industry sector CAGR of 24.8% fueled by cloud transition, digital mandate, and AI infrastructure adoption.",
      disclaimer:
        "AI-estimated market bounds extrapolated from Gartner and PitchBook benchmarks; verify with primary cohort research.",
      suggestedVisual: {
        type: "market-circles",
        label: "TAM / SAM / SOM Concentric Target",
        description: "Visual breakdown highlighting huge global headroom and focused initial beachhead",
      },
      speakerNotes:
        "Anchor on our bottom-up calculation: even capturing 1% of this exploding sector represents a venture-scale outcome.",
    },
    product: {
      title: "Product",
      slideType: "product",
      headline: "Engineered for Simplicity, Built for Venture-Scale Power",
      overview: `${startupName} provides an intuitive, lightning-fast workspace designed specifically for ${targetCustomer}, backed by enterprise-grade security and intelligence.`,
      coreFeatures: [
        {
          feature: "Autonomous Real-Time Ingestion",
          benefit: "Eliminates manual data entry with instant auto-synchronization.",
        },
        {
          feature: "AI Reasoning & Synthesis Engine",
          benefit: "Generates high-precision outputs and predictive alerts in seconds.",
        },
        {
          feature: "Collaborative Export & Action Center",
          benefit: "Enables instant 1-click team handoffs and multi-platform publishing.",
        },
      ],
      techMoat:
        "Custom-tuned agent pipeline with proprietary domain feedback loops and SOC-2 compliant multi-tenant architecture.",
      status: "Live Beta with 14 active pilot organizations delivering 94% weekly retention.",
      suggestedVisual: {
        type: "architecture",
        label: "3-Tier System Architecture",
        description: "Data Connector Layer -> Core Intelligence Layer -> Adaptive User Interface",
      },
      speakerNotes:
        "Showcase product velocity: from first concept to live paying pilots in under 4 months.",
    },
    businessModel: {
      title: "Business Model",
      slideType: "businessModel",
      headline: "High-Margin Recurring B2B SaaS with Land-and-Expand Dynamics",
      pricingModel:
        "Hybrid Subscription + Usage Model: Starter ($199/mo), Growth ($699/mo), and Enterprise Custom Contracts ($25k-$75k ACV).",
      revenueStreams: [
        {
          stream: "Core Software Subscriptions",
          details: "80% of total revenue with 85%+ gross software margins.",
        },
        {
          stream: "Usage-Based Compute & Add-ons",
          details: "20% net expansion revenue driven by volume-based transactions.",
        },
      ],
      unitEconomics: {
        cac: "$420 estimated blended",
        ltv: "$4,800 across 3-year cohort",
        payback: "4.5 months payback window",
        margin: "84% gross software margin",
      },
      salesMotion:
        "Product-Led Inbound Growth for bottom-up developer/team adoption, paired with inside sales for enterprise expansions.",
      suggestedVisual: {
        type: "value-chain",
        label: "Revenue Acceleration Loop",
        description: "Land through free-tier viral loops, expand via team seat and usage growth",
      },
      speakerNotes:
        "Highlight our 11.4x LTV:CAC ratio and rapid 4.5 month cash payback velocity.",
    },
    competition: {
      title: "Competition",
      slideType: "competition",
      headline: "Decisive Asymmetric Advantage Over Legacy Suites & Point Solutions",
      landscape:
        "The market is divided between bloated legacy enterprise software that takes 6 months to deploy, and fragile single-feature point apps.",
      competitors: [
        {
          name: "Legacy Industry Incumbents",
          limitation: "Expensive, complex 6-month implementations, no modern AI intelligence.",
          ourAdvantage: "Instant 5-minute self-serve setup with 10x modern AI capabilities at 1/5th the cost.",
        },
        {
          name: "Generic AI Wrappers",
          limitation: "Vulnerable to model updates, zero domain workflow defensibility.",
          ourAdvantage: "Deep domain-tailored workflow integration, proprietary customer data moat, and full auditability.",
        },
      ],
      defensibilityMoat:
        "High switching costs, compounding domain data network effects, and deep integration hooks into customer daily workflows.",
      suggestedVisual: {
        type: "matrix",
        label: "2x2 Competitive Positioning Matrix",
        description: "Ease of Deployment (X-axis) vs Intelligence & Automation Power (Y-axis)",
      },
      speakerNotes:
        "Address the 'Why can't Big Tech copy this?' objection: We own the end-to-end specialized workflow and high-trust domain relationships.",
    },
    traction: {
      title: "Traction & Milestones",
      slideType: "traction",
      headline: "Strong Early Validation and Accelerating Customer Pull",
      metrics: [
        {
          label: "Active Waitlist / Users",
          value: "1,250+",
          change: "+34% MoM Organic Growth",
        },
        {
          label: "Signed Enterprise LOIs",
          value: "12",
          change: "$180k Pipeline Value",
        },
        {
          label: "Weekly User Retention",
          value: "88%",
          change: "Top-decile SaaS benchmark",
        },
      ],
      milestones: [
        {
          time: "Q1",
          achievement: "Architected core engine and completed closed alpha testing.",
        },
        {
          time: "Q2",
          achievement: "Launched live pilot cohort with 14 active organizations.",
        },
        {
          time: "Next 6 Mos",
          achievement: "Scale to $50k MRR and open general availability onboarding.",
        },
      ],
      socialProof:
        "\"This eliminated 70% of our team's operational backlog in the first two weeks.\" — Early Pilot Lead",
      suggestedVisual: {
        type: "growth-chart",
        label: "MoM Adoption Trajectory",
        description: "Steep upward adoption curve demonstrating market readiness and pull",
      },
      speakerNotes:
        "Convey execution velocity: every milestone has been hit ahead of schedule on limited bootstrapping budget.",
    },
    team: {
      title: "Team",
      slideType: "team",
      headline: "The Right Mix of Engineering Rigor and Domain Hustle",
      members: [
        {
          role: "CEO & Co-Founder",
          background: `Experienced operator with 5+ years building software in ${industry}.`,
          superpower: "Obsessive customer empathy, product intuition, and relentless GTM execution.",
        },
        {
          role: "CTO & Co-Founder",
          background: "Ex-Scale AI / Google engineer specializing in distributed systems and LLMs.",
          superpower: "Full-stack AI architecture and resilient high-throughput infrastructure.",
        },
      ],
      advisors:
        "Backed by industry veterans and angel founders with 2 successful prior exits in enterprise SaaS.",
      whyUs:
        "We have lived this problem firsthand for years, giving us the unfair insights needed to out-execute anyone else.",
      suggestedVisual: {
        type: "team-org",
        label: "Leadership & Domain Balance",
        description: "Balanced alignment between technical leadership, domain mastery, and commercial execution",
      },
      speakerNotes:
        "Emphasize founder chemistry, shared track record, and long-term 10-year conviction in this market.",
    },
    ask: {
      title: "The Ask & Funding",
      slideType: "ask",
      headline: "Raising $1.5M Seed to Scale Growth and Solidify Market Leadership",
      targetRaise: "$1,500,000 Seed Round",
      runwayMonths: "18-24 Months of Full Runway",
      allocation: [
        {
          category: "Engineering & AI Infrastructure",
          percentage: 45,
          purpose: "Hire 2 senior full-stack AI engineers and scale compute pipelines.",
        },
        {
          category: "Go-to-Market & Customer Acquisition",
          percentage: 35,
          purpose: "Ramp outbound sales, content marketing, and customer success.",
        },
        {
          category: "Operations & Legal Buffer",
          percentage: 20,
          purpose: "Enterprise compliance certifications (SOC-2) and operational reserve.",
        },
      ],
      milestonesWithCapital: [
        "Reach $1.2M ARR run-rate within 18 months",
        "Expand to 150+ mid-market and enterprise accounts",
        "Achieve net negative churn with 120%+ NDR",
      ],
      terms: "Priced Seed Round or SAFE ($8M Valuation Cap)",
      suggestedVisual: {
        type: "donut-allocation",
        label: "Fund Allocation Breakdown",
        description: "Clear pie/donut distribution of proceeds focused on engineering and rapid distribution",
      },
      speakerNotes:
        "Close with excitement: We have de-risked the tech and customer demand; this capital is purely fuel to capture the market.",
    },
  };
}

/**
 * Generates single slide replacement via mock engine
 */
export function generateMockSingleSlide(
  slideType: SlideType,
  input: PitchInput
): SlideData {
  const fullDeck = generateMockDeck(input);
  return fullDeck[slideType];
}

/**
 * Generates readiness score and actionable critique
 */
export function generateMockScore(input: PitchInput): ReadinessScore {
  const nameLen = input.startupName.trim().length;
  const probLen = input.problem.trim().length;
  const descLen = (input.freeTextDescription || "").trim().length;

  let baseScore = 78;
  if (nameLen > 2) baseScore += 2;
  if (probLen > 40) baseScore += 6;
  if (descLen > 50) baseScore += 6;
  if (input.targetCustomer.length > 5) baseScore += 3;

  const finalScore = Math.min(95, Math.max(65, baseScore));

  const grade =
    finalScore >= 90
      ? "A"
      : finalScore >= 85
      ? "A-"
      : finalScore >= 80
      ? "B+"
      : finalScore >= 75
      ? "B"
      : "C+";

  return {
    overallScore: finalScore,
    grade,
    summary: `${input.startupName} addresses an acute, well-defined pain point for ${input.targetCustomer} in ${input.industry}. Strong market potential with clear venture upside.`,
    strengths: [
      `Crisp and urgent problem definition targeting a tangible bottleneck for ${input.targetCustomer}.`,
      "Substantial Total Addressable Market with strong macro industry tailwinds.",
      "High operating leverage model with potential for compounding data defensibility.",
    ],
    weaknesses: [
      "Initial Go-To-Market distribution risk: needs proven low-cost acquisition channel.",
      "Potential competition from well-funded incumbents if feature defensibility is not deepened early.",
      "Pilot-to-paid conversion timeline needs tighter validation.",
    ],
    missingElements: [
      "Explicit customer payback period metrics in the early business model.",
      "Quantified pilot conversion retention benchmarks.",
      "Contingency plan for enterprise sales cycle friction.",
    ],
    recommendations: [
      `Double down on a sharp, single-feature beachhead for ${input.targetCustomer} before expanding features.`,
      "Highlight 2-3 customer quotes or letters of intent (LOIs) in your pitch deck to de-risk traction.",
      "Clarify your data moat: explain why user data makes your platform smarter over time.",
    ],
    categoryScores: {
      narrative: Math.min(95, finalScore + 4),
      market: Math.min(92, finalScore + 1),
      defensibility: Math.min(88, finalScore - 5),
      businessModel: Math.min(90, finalScore - 2),
    },
  };
}

/**
 * Generates 10 tough investor questions with talking points
 */
export function generateMockQA(input: PitchInput): InvestorQA {
  const { startupName, industry, targetCustomer } = input;

  return [
    {
      id: "qa-1",
      question: `What stops Microsoft, Google, or an incumbent in ${industry} from building this feature tomorrow?`,
      category: "Defensibility & Moat",
      difficulty: "Crucial",
      suggestedTalkingPoints: [
        "Incumbents are bound by innovator's dilemma: their high-margin legacy architecture makes rapid pivots uneconomical.",
        "We possess deep, verticalized workflow intelligence and proprietary customer feedback loops that generic software cannot replicate.",
        "Our velocity is 10x faster because our entire stack is built specifically around this one core problem.",
      ],
      trapToAvoid:
        "Never say 'They don't know about us' or 'We have patents'. Focus on specialized focus, distribution speed, and workflow lock-in.",
    },
    {
      id: "qa-2",
      question: `How do you acquire your first 100 paying ${targetCustomer} without burning through all your seed capital?`,
      category: "GTM & Sales Motion",
      difficulty: "Crucial",
      suggestedTalkingPoints: [
        "We are executing a bottom-up community and product-led growth (PLG) motion with organic viral loops.",
        "Targeted outbound to high-urgency cohorts with tailored audit diagnostics that demonstrate immediate ROI.",
        "Strategic channel partnerships with existing ecosystem platforms that already serve our ICP.",
      ],
      trapToAvoid:
        "Avoid relying purely on paid ads (Google/Meta) which leads to high CAC. Investors want scalable, repeatable organic channels.",
    },
    {
      id: "qa-3",
      question: "Why now? Why wasn't this built 3 years ago, and why won't it be obsolete in 3 years?",
      category: "Market & TAM",
      difficulty: "Tough",
      suggestedTalkingPoints: [
        "Recent breakthroughs in LLM multi-modal reasoning now make real-time automation feasible at 1/100th previous compute cost.",
        "Macro labor pressures and regulatory shifts in the industry have forced customers to prioritize automated efficiency.",
        "Our platform is model-agnostic; as foundation models improve, our product becomes exponentially more valuable.",
      ],
      trapToAvoid:
        "Don't just say 'Because AI is trendy'. Pinpoint the exact technical or economic inflection point that unlocked this today.",
    },
    {
      id: "qa-4",
      question: "What are your unit economics at scale, and what is your realistic churn risk?",
      category: "Unit Economics & Monetization",
      difficulty: "Tough",
      suggestedTalkingPoints: [
        "Targeting 80%+ gross software margins with cloud compute optimizations.",
        "Expected net revenue retention (NRR) of 120%+ driven by seat expansion and volume tiers.",
        "Negative churn potential as customers embed our tool into their core operational stack.",
      ],
      trapToAvoid:
        "Don't claim 0% churn or brush off server/API compute costs. Transparently outline gross margins and payback periods.",
    },
    {
      id: "qa-5",
      question: "Walk me through the exact workflow: what happens in the first 15 minutes of a user signing up?",
      category: "Technical Execution",
      difficulty: "Tough",
      suggestedTalkingPoints: [
        "Zero-friction onboarding: automated connector syncs in under 3 minutes.",
        "Instant 'Time to Value' (TTV): user sees their first actionable insight within the first session.",
        "Guided template workflows that ensure immediate team adoption.",
      ],
      trapToAvoid:
        "Avoid long, academic explanations. Deliver a crisp, step-by-step walkthrough of the user delight moment.",
    },
    {
      id: "qa-6",
      question: "What is your unfair founder-market fit? Why is your team uniquely destined to win this?",
      category: "Team & Founder Risk",
      difficulty: "Crucial",
      suggestedTalkingPoints: [
        "We have operated inside this sector for years and suffered this exact pain firsthand.",
        "Complementary co-founder dynamics pairing world-class technical engineering with commercial GTM grit.",
        "Deep industry trust and warm access to first 20 enterprise pilot partners.",
      ],
      trapToAvoid:
        "Don't simply list your resume. Explain the specific proprietary insight you possess that outsiders overlook.",
    },
    {
      id: "qa-7",
      question: `If ${startupName} were to fail in 24 months, what would be the single most likely post-mortem reason?`,
      category: "Defensibility & Moat",
      difficulty: "Aggressive",
      suggestedTalkingPoints: [
        "The risk is moving too broad too early instead of dominating our initial ICP beachhead.",
        "Our mitigation strategy: strict OKRs focused exclusively on weekly active retention and user engagement.",
        "We prioritize deep customer love over vanity top-of-funnel signups.",
      ],
      trapToAvoid:
        "Never say 'We won't fail' or 'Running out of money'. Show high intellectual humility and rigorous self-awareness.",
    },
    {
      id: "qa-8",
      question: "How will your pricing power evolve as competitors enter the market?",
      category: "Unit Economics & Monetization",
      difficulty: "Tough",
      suggestedTalkingPoints: [
        "Pricing power is protected by compounding workflow data and mission-critical system-of-record status.",
        "Value-based pricing linked directly to customer revenue generated or hours saved.",
        "High switching costs once integrated across teams.",
      ],
      trapToAvoid:
        "Do not promise to be the 'cheapest' option. Competing on price is a race to the bottom for early startups.",
    },
    {
      id: "qa-9",
      question: "What specific milestones will this seed round derisk for Series A investors?",
      category: "Market & TAM",
      difficulty: "Aggressive",
      suggestedTalkingPoints: [
        "De-risks product-market fit: reaching $1M ARR with 120%+ net retention.",
        "De-risks repeatable sales: proven CAC payback under 6 months across 3 distinct acquisition channels.",
        "Establishes a clear enterprise expansion playbook ready for growth equity.",
      ],
      trapToAvoid:
        "Don't just say 'hire people'. Series A investors want to see specific ARR, retention, and unit economic hurdles cleared.",
    },
    {
      id: "qa-10",
      question: "What is the single most counter-intuitive truth about your market that nobody else understands?",
      category: "Market & TAM",
      difficulty: "Aggressive",
      suggestedTalkingPoints: [
        `Most people believe ${targetCustomer} want more dashboards; in reality, they want automated decisions that require zero dashboard interaction.`,
        "The real bottleneck has never been data availability, but synthesis latency.",
        "By focusing on automated execution rather than passive reporting, we capture 10x higher customer value.",
      ],
      trapToAvoid:
        "Don't state an obvious platitude like 'AI is the future'. Deliver a contrarian, battle-tested operational observation.",
    },
  ];
}

/**
 * Generates interactive VC chat reply
 */
export function generateMockVCChatReply(
  userMessage: string,
  input: PitchInput
): ChatResponse {
  const lower = userMessage.toLowerCase();

  if (lower.includes("compet") || lower.includes("google") || lower.includes("microsoft") || lower.includes("copy")) {
    return {
      reply: `That's the standard pitch, but let's be real: Google or Microsoft don't need to build a bespoke product to kill early startups—they just bundle a lightweight version into their existing enterprise suites for free. For ${input.startupName}, what is the specific technical or data moat that prevents an incumbent from offering this as a free checkbox feature?`,
      sentiment: "skeptical",
      suggestedFollowUps: [
        "How our proprietary data feedback loop protects our moat",
        "Why our 10x faster workflow beats bundled software",
        "Our integration depth with customer core tooling",
      ],
    };
  }

  if (lower.includes("price") || lower.includes("cost") || lower.includes("revenue") || lower.includes("cac") || lower.includes("ltv")) {
    return {
      reply: `Your unit economics look attractive on paper, but early B2B sales cycles in ${input.industry} frequently stretch from 30 days to 6 months once enterprise procurement gets involved. How does ${input.startupName} plan to survive long sales cycles and keep your CAC payback window under 6 months?`,
      sentiment: "probing",
      suggestedFollowUps: [
        "Our self-serve Land-and-Expand product adoption model",
        "How we leverage fast-track pilot agreements",
        "Our early contract ACV and payback numbers",
      ],
    };
  }

  if (lower.includes("team") || lower.includes("founder") || lower.includes("hire") || lower.includes("why us")) {
    return {
      reply: `I appreciate your passion for ${input.industry}, but building early-stage tech requires both deep technical velocity and brutal commercial execution. What is the single biggest gap in your founding team right now, and how will your first 2 key hires solve it?`,
      sentiment: "intrigued",
      suggestedFollowUps: [
        "Our planned technical and sales engineering hires",
        "How our advisors bridge early enterprise relationships",
        "Our track record of rapid iteration under constraints",
      ],
    };
  }

  return {
    reply: `Interesting point regarding ${input.startupName}. As an investor looking at your thesis in ${input.industry}, my primary concern is speed to market and customer retention. If your target customers (${input.targetCustomer}) are so desperate for this, what is your current organic conversion rate from initial demo to daily active usage?`,
    sentiment: "probing",
    suggestedFollowUps: [
      "Walk through our weekly retention and pilot engagement",
      "Explain our customer onboarding to 'Aha!' moment time",
      "Discuss our customer acquisition cost and organic referral loops",
    ],
  };
}

/**
 * Generates Startup Pitch Health Check & Vital Signs Diagnostic
 */
export function generateMockPitchHealthCheck(
  input: PitchInput,
  deck?: DeckData
): PitchHealthCheck {
  const { startupName, industry, targetCustomer } = input;

  return {
    healthIndex: 88,
    overallCondition: "Venture Fit (Prime)",
    vitalSigns: {
      narrativeVitality: {
        score: 92,
        status: "Healthy",
        diagnosis: `Crisp, urgent narrative. The problem statement for ${targetCustomer} is acute and easily understood by generalist VCs.`,
      },
      financialPulse: {
        score: 86,
        status: "Healthy",
        diagnosis: "Healthy LTV:CAC (>10x) and fast estimated cash payback (<6 months) indicate high software operating leverage.",
      },
      moatImmunity: {
        score: 79,
        status: "Caution",
        diagnosis: "Moderate moat vulnerability. Deepen proprietary workflow integration to inoculate against incumbent feature copies.",
      },
      growthVelocity: {
        score: 90,
        status: "Healthy",
        diagnosis: `Accelerating organic pull in ${industry}. Early pilot conversion signals strong product-market resonance.`,
      },
      runwayOxygen: {
        score: 85,
        status: "Healthy",
        diagnosis: "18-24 months of operational runway provides sufficient oxygen to hit Series A inflection milestones.",
      },
    },
    redFlags: [
      "Enterprise sales friction: protracted procurement cycles could delay revenue realization.",
      "Moat defensibility: need clear proof that user workflow data creates an insurmountable switching barrier.",
    ],
    prescriptions: [
      "Showcase 2-3 customer quotes with quantified hours/dollars saved on Slide 07 (Traction).",
      "Highlight bottom-up, self-serve adoption dynamics to reduce customer acquisition friction.",
      "Explicitly mention your proprietary data feedback loop on Slide 02 (Solution).",
    ],
    investorVerdict: `${startupName} exhibits strong venture vital signs with prime investor appeal. Address the moat defense talking points to maximize term sheet leverage.`,
  };
}

