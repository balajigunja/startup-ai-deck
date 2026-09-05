import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Rocket,
  Target,
  Sliders,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Zap,
} from "lucide-react";
import { PitchInput, DEMO_PRESETS } from "../types/index.ts";

interface StepWizardProps {
  initialData: PitchInput;
  onSubmit: (data: PitchInput) => void;
  isLoading: boolean;
}

export const StepWizard: React.FC<StepWizardProps> = ({
  initialData,
  onSubmit,
  isLoading,
}) => {
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState<PitchInput>(initialData);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Sync if parent updates initialData (e.g. preset clicked in Navbar)
  React.useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  const updateField = (field: keyof PitchInput, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[field];
        return copy;
      });
    }
  };

  const validateStep = (currentStep: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (currentStep === 1) {
      if (!formData.startupName.trim() || formData.startupName.trim().length < 2) {
        newErrors.startupName = "Startup name must be at least 2 characters";
      }
      if (!formData.oneLiner.trim() || formData.oneLiner.trim().length < 5) {
        newErrors.oneLiner = "One-liner must be at least 5 characters";
      }
      if (!formData.industry.trim()) {
        newErrors.industry = "Please specify an industry";
      }
    } else if (currentStep === 2) {
      if (!formData.problem.trim() || formData.problem.trim().length < 10) {
        newErrors.problem = "Problem description must be at least 10 characters";
      }
      if (!formData.targetCustomer.trim()) {
        newErrors.targetCustomer = "Target customer must be specified";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep((prev) => Math.min(4, prev + 1));
    }
  };

  const handlePrev = () => {
    setStep((prev) => Math.max(1, prev - 1));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep(1) && validateStep(2)) {
      onSubmit(formData);
    }
  };

  const stepsList = [
    { num: 1, title: "Startup Profile", icon: Rocket },
    { num: 2, title: "Problem & Market", icon: Target },
    { num: 3, title: "Tone & Strategy", icon: Sliders },
    { num: 4, title: "Review & Generate", icon: Sparkles },
  ];

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Demo Preset Quick-Fill Bar */}
      <div className="mb-6 p-3 rounded-2xl glass-card border-cyanAccent/20 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-cyanAccent animate-pulse" />
          <span className="text-xs font-semibold text-platinum">Try an instant demo idea:</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {DEMO_PRESETS.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => {
                setFormData(p.data);
                setErrors({});
              }}
              className="px-2.5 py-1 text-xs rounded-lg bg-cardNavy hover:bg-cyanAccent/20 hover:border-cyanAccent/50 border border-white/10 text-slate-200 transition-all font-medium"
            >
              {p.name}
            </button>
          ))}
        </div>
      </div>

      {/* Step Indicators */}
      <div className="mb-8">
        <div className="flex items-center justify-between relative">
          {/* Progress Connecting Line */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-800 -translate-y-1/2 z-0" />
          <div
            className="absolute top-1/2 left-0 h-0.5 bg-gradient-to-r from-cyanAccent to-indigoAccent -translate-y-1/2 z-0 transition-all duration-300"
            style={{ width: `${((step - 1) / (stepsList.length - 1)) * 100}%` }}
          />

          {stepsList.map((s) => {
            const Icon = s.icon;
            const isDone = step > s.num;
            const isActive = step === s.num;

            return (
              <div key={s.num} className="relative z-10 flex flex-col items-center">
                <button
                  type="button"
                  onClick={() => {
                    if (step > s.num) setStep(s.num);
                  }}
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                    isDone
                      ? "bg-emeraldHighlight text-obsidian font-bold shadow-glowEmerald"
                      : isActive
                      ? "bg-gradient-to-tr from-cyanAccent to-indigoAccent text-obsidian shadow-glowCyan scale-110 font-bold"
                      : "bg-cardNavy border border-slate-700 text-slateMuted"
                  }`}
                >
                  {isDone ? <CheckCircle2 className="w-5 h-5 stroke-[2.5]" /> : <Icon className="w-4 h-4" />}
                </button>
                <span
                  className={`text-[11px] font-medium mt-1.5 hidden sm:block ${
                    isActive ? "text-cyanAccent font-semibold" : "text-slateMuted"
                  }`}
                >
                  {s.title}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Form Card Container */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <form onSubmit={handleSubmit}>
          <AnimatePresence mode="wait">
            {/* STEP 1: Startup Profile */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="space-y-5"
              >
                <div>
                  <h2 className="text-xl font-bold text-platinum">Step 1: Startup Basics</h2>
                  <p className="text-sm text-slateMuted">
                    Tell us what your company is called and what it does in one line.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Startup Name *
                  </label>
                  <input
                    type="text"
                    value={formData.startupName}
                    onChange={(e) => updateField("startupName", e.target.value)}
                    placeholder="e.g., CampusBite, Stripe, Linear"
                    className="glass-input w-full px-4 py-3 rounded-xl text-sm font-medium"
                  />
                  {errors.startupName && (
                    <p className="text-xs text-rose-400 mt-1">{errors.startupName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    One-Liner / Elevator Pitch *
                  </label>
                  <input
                    type="text"
                    value={formData.oneLiner}
                    onChange={(e) => updateField("oneLiner", e.target.value)}
                    placeholder="e.g., Autonomous 15-minute food delivery rovers for university campuses"
                    className="glass-input w-full px-4 py-3 rounded-xl text-sm font-medium"
                  />
                  {errors.oneLiner && (
                    <p className="text-xs text-rose-400 mt-1">{errors.oneLiner}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Industry / Sector *
                  </label>
                  <input
                    type="text"
                    value={formData.industry}
                    onChange={(e) => updateField("industry", e.target.value)}
                    placeholder="e.g., Autonomous Robotics & FoodTech, B2B FinTech, HealthTech"
                    className="glass-input w-full px-4 py-3 rounded-xl text-sm font-medium"
                  />
                  {errors.industry && (
                    <p className="text-xs text-rose-400 mt-1">{errors.industry}</p>
                  )}
                </div>
              </motion.div>
            )}

            {/* STEP 2: Problem & Customer */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="space-y-5"
              >
                <div>
                  <h2 className="text-xl font-bold text-platinum">Step 2: Problem & Customer</h2>
                  <p className="text-sm text-slateMuted">
                    Investors back painful, urgent problems and clearly defined customers.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Core Problem Statement *
                  </label>
                  <textarea
                    rows={3}
                    value={formData.problem}
                    onChange={(e) => updateField("problem", e.target.value)}
                    placeholder="Describe the friction, high costs, or inefficiency your customers face today..."
                    className="glass-input w-full px-4 py-3 rounded-xl text-sm font-medium"
                  />
                  {errors.problem && (
                    <p className="text-xs text-rose-400 mt-1">{errors.problem}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Target Customer (Ideal Customer Profile) *
                  </label>
                  <input
                    type="text"
                    value={formData.targetCustomer}
                    onChange={(e) => updateField("targetCustomer", e.target.value)}
                    placeholder="e.g., University students & campus merchants, Mid-market B2B controllers"
                    className="glass-input w-full px-4 py-3 rounded-xl text-sm font-medium"
                  />
                  {errors.targetCustomer && (
                    <p className="text-xs text-rose-400 mt-1">{errors.targetCustomer}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Founder's Free-Text Notes / Secret Sauce (Optional)
                  </label>
                  <textarea
                    rows={3}
                    value={formData.freeTextDescription}
                    onChange={(e) => updateField("freeTextDescription", e.target.value)}
                    placeholder="Describe in your own words: product secret sauce, traction milestones, why your team wins, or anything unique..."
                    className="glass-input w-full px-4 py-3 rounded-xl text-sm font-medium"
                  />
                  <p className="text-[11px] text-slateMuted mt-1">
                    Tip: The AI extracts your genuine insights from here to enrich all 9 deck slides!
                  </p>
                </div>
              </motion.div>
            )}

            {/* STEP 3: Tone, Audience & Depth */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-xl font-bold text-platinum">Step 3: Audience & Tone</h2>
                  <p className="text-sm text-slateMuted">
                    Customize the storytelling style to match the exact investor type you are meeting.
                  </p>
                </div>

                {/* Target Audience Persona */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Target Audience
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      {
                        id: "vc",
                        name: "Venture Capital",
                        desc: "100x return focus, hyper-scale unit economics, high defensibility.",
                      },
                      {
                        id: "accelerator",
                        name: "Accelerator / Demo Day",
                        desc: "High founder velocity, fast iteration, problem-market fit.",
                      },
                      {
                        id: "angel",
                        name: "Angel Investors",
                        desc: "Passion-driven, early traction proof, founder grit.",
                      },
                    ].map((aud) => (
                      <button
                        key={aud.id}
                        type="button"
                        onClick={() => updateField("audiencePersona", aud.id)}
                        className={`p-3.5 rounded-xl border text-left transition-all ${
                          formData.audiencePersona === aud.id
                            ? "bg-cyanAccent/15 border-cyanAccent shadow-glowCyan"
                            : "bg-cardNavy/50 border-white/5 hover:border-white/20"
                        }`}
                      >
                        <div className="text-sm font-bold text-platinum">{aud.name}</div>
                        <div className="text-[11px] text-slateMuted mt-1">{aud.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tone Preset */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Narrative Tone
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {[
                      { id: "professional", label: "Professional", desc: "Data-backed & metrics-driven" },
                      { id: "enthusiastic", label: "Enthusiastic", desc: "High energy & customer passion" },
                      { id: "formal", label: "Formal", desc: "Institutional governance & scale" },
                      { id: "punchy", label: "VC Punchy", desc: "Crisp & zero fluff" },
                      { id: "story", label: "Story-Driven", desc: "Mission & customer journey" },
                      { id: "technical", label: "Deep-Tech", desc: "Architectural rigor & moat" },
                    ].map((t) => (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => updateField("tone", t.id)}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          formData.tone === t.id
                            ? "bg-indigoAccent/20 border-indigoAccent text-platinum"
                            : "bg-cardNavy/40 border-white/5 hover:border-white/20 text-slate-300"
                        }`}
                      >
                        <div className="text-xs font-bold">{t.label}</div>
                        <div className="text-[10px] text-slateMuted mt-0.5">{t.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Depth */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Slide Detail Depth
                  </label>
                  <div className="grid grid-cols-3 gap-2.5">
                    {[
                      { id: "concise", label: "Concise", desc: "Fast glance / 2-3 bullets" },
                      { id: "standard", label: "Standard", desc: "Balanced pitch deck" },
                      { id: "detailed", label: "Detailed", desc: "Comprehensive memo" },
                    ].map((l) => (
                      <button
                        key={l.id}
                        type="button"
                        onClick={() => updateField("length", l.id)}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          formData.length === l.id
                            ? "bg-emeraldHighlight/20 border-emeraldHighlight text-platinum"
                            : "bg-cardNavy/40 border-white/5 hover:border-white/20 text-slate-300"
                        }`}
                      >
                        <div className="text-xs font-bold">{l.label}</div>
                        <div className="text-[10px] text-slateMuted mt-0.5">{l.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 4: Review & Generate */}
            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="space-y-5"
              >
                <div>
                  <h2 className="text-xl font-bold text-platinum">Step 4: Review & Launch</h2>
                  <p className="text-sm text-slateMuted">
                    Confirm your details. PitchCraft will generate all 9 slides, calculate readiness scores, and prep 10 tough investor Q&As.
                  </p>
                </div>

                <div className="bg-cardNavy/80 rounded-2xl p-5 border border-white/10 space-y-3 text-sm">
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-slateMuted">Startup:</span>
                    <span className="font-bold text-cyanAccent">{formData.startupName}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-slateMuted">One-Liner:</span>
                    <span className="text-slate-200 text-right max-w-md">{formData.oneLiner}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-slateMuted">Industry:</span>
                    <span className="text-slate-200">{formData.industry}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-slateMuted">Target Customer:</span>
                    <span className="text-slate-200">{formData.targetCustomer}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-slateMuted">Tone & Depth:</span>
                    <span className="text-emerald-300 font-mono text-xs uppercase">
                      {formData.audiencePersona} • {formData.tone} • {formData.length}
                    </span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-cyanAccent/10 border border-cyanAccent/30 text-xs text-cyan-200 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-cyanAccent flex-shrink-0" />
                  <span>
                    Our Anti-Hallucination Prompt Protocol will generate structured JSON slides with tailored visual diagrams and investor Q&A.
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={handlePrev}
                disabled={isLoading}
                className="px-4 py-2.5 rounded-xl border border-white/10 hover:bg-white/5 text-slate-300 font-medium text-sm flex items-center gap-1.5 transition-all"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>
            ) : (
              <div />
            )}

            {step < 4 ? (
              <button
                type="button"
                onClick={handleNext}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyanAccent to-indigoAccent hover:opacity-90 text-obsidian font-bold text-sm flex items-center gap-1.5 shadow-glowCyan transition-all"
              >
                Next Step
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={isLoading}
                className="px-8 py-3 rounded-xl bg-gradient-to-r from-cyanAccent via-indigoAccent to-emeraldHighlight hover:opacity-95 text-obsidian font-extrabold text-sm flex items-center gap-2 shadow-glowCyan transition-all transform hover:scale-[1.02]"
              >
                <Sparkles className="w-4 h-4 stroke-[2.5]" />
                {isLoading ? "Generating Deck..." : "Generate Full Pitch Deck"}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
