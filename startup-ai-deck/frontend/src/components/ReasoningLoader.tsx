import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { BrainCircuit, CheckCircle2, Sparkles, Loader2 } from "lucide-react";

const REASONING_STEPS = [
  "Parsing startup profile & injecting audience narrative context...",
  "Synthesizing bleeding-neck problem statements & macro catalysts...",
  "Calculating bottom-up TAM, SAM & SOM market opportunity...",
  "Structuring solution value proposition & unfair advantage...",
  "Formulating scalable unit economics, payback & pricing tiers...",
  "Mapping 2x2 competitive differentiation matrix & defensive moats...",
  "Projecting traction hockey-stick curve & operational milestones...",
  "Calculating 0-100 Investor Readiness Scorecard & critique...",
  "Preparing 10 tough partner-meeting investor questions...",
  "Rendering tailored visual diagrams & polishing slide copy...",
];

export const ReasoningLoader: React.FC<{ startupName: string }> = ({ startupName }) => {
  const [currentStepIdx, setCurrentStepIdx] = useState<number>(0);
  const [progress, setProgress] = useState<number>(10);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStepIdx((prev) => {
        if (prev < REASONING_STEPS.length - 1) {
          const next = prev + 1;
          setProgress(Math.round(((next + 1) / REASONING_STEPS.length) * 100));
          return next;
        }
        return prev;
      });
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-obsidian/85 backdrop-blur-xl p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-xl glass-panel rounded-3xl p-8 border border-cyanAccent/30 shadow-2xl relative overflow-hidden"
      >
        {/* Glow orb */}
        <div className="absolute -top-20 -right-20 w-48 h-48 rounded-full bg-cyanAccent/15 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-48 h-48 rounded-full bg-indigoAccent/15 blur-3xl" />

        <div className="relative z-10 text-center">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-tr from-cyanAccent/20 to-indigoAccent/20 border border-cyanAccent/40 flex items-center justify-center shadow-glowCyan mb-5">
            <BrainCircuit className="w-8 h-8 text-cyanAccent animate-pulse" />
          </div>

          <h3 className="text-xl font-extrabold text-platinum tracking-tight">
            Synthesizing Pitch Deck for <span className="text-cyanAccent">{startupName}</span>
          </h3>
          <p className="text-xs text-slateMuted mt-1">
            Applying Anti-Hallucination Prompt Protocol & Investor Reasoning Chain
          </p>

          {/* Dynamic Progress Bar */}
          <div className="w-full bg-slate-800/80 rounded-full h-2.5 my-6 overflow-hidden p-0.5 border border-white/10">
            <motion.div
              className="bg-gradient-to-r from-cyanAccent via-indigoAccent to-emeraldHighlight h-full rounded-full"
              initial={{ width: "5%" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>

          <div className="flex justify-between items-center text-[11px] font-mono text-slateMuted mb-4">
            <span className="flex items-center gap-1.5 text-cyan-400">
              <Loader2 className="w-3 h-3 animate-spin" />
              Reasoning Step {currentStepIdx + 1} of {REASONING_STEPS.length}
            </span>
            <span className="text-emerald-400 font-bold">{progress}% Complete</span>
          </div>

          {/* Granular Steps List */}
          <div className="space-y-2 text-left max-h-56 overflow-y-auto pr-1">
            {REASONING_STEPS.map((stepText, idx) => {
              const isPast = idx < currentStepIdx;
              const isCurrent = idx === currentStepIdx;

              return (
                <div
                  key={idx}
                  className={`flex items-center gap-2.5 p-2 rounded-xl text-xs transition-all ${
                    isCurrent
                      ? "bg-cyanAccent/10 border border-cyanAccent/30 text-cyan-200 font-semibold"
                      : isPast
                      ? "text-emerald-400/80 opacity-60"
                      : "text-slateMuted/40 opacity-30"
                  }`}
                >
                  {isPast ? (
                    <CheckCircle2 className="w-4 h-4 text-emeraldHighlight flex-shrink-0" />
                  ) : isCurrent ? (
                    <Sparkles className="w-4 h-4 text-cyanAccent animate-spin flex-shrink-0" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border border-slate-700 flex-shrink-0" />
                  )}
                  <span className="truncate">{stepText}</span>
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
