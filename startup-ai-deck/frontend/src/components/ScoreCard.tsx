import React from "react";
import { motion } from "framer-motion";
import {
  X,
  Award,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  TrendingUp,
} from "lucide-react";
import { ReadinessScore } from "../types/index.ts";

interface ScoreCardProps {
  score: ReadinessScore;
  onClose: () => void;
}

export const ScoreCard: React.FC<ScoreCardProps> = ({ score, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-obsidian/80 backdrop-blur-md p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-2xl glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl relative max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emeraldHighlight/20 border border-emeraldHighlight/40 flex items-center justify-center text-emerald-300">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-platinum">Investor Readiness Scorecard</h2>
              <p className="text-xs text-slateMuted">
                Algorithmic critique based on Tier-1 venture diligence criteria
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-white/10 text-slateMuted hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Score Hero Banner */}
        <div className="my-6 p-5 rounded-2xl bg-gradient-to-r from-cardNavy to-obsidian border border-emeraldHighlight/30 flex items-center justify-between">
          <div>
            <div className="text-xs text-emerald-300 uppercase font-mono font-semibold">
              Readiness Rating
            </div>
            <div className="text-3xl sm:text-4xl font-black text-platinum mt-1">
              {score.overallScore} <span className="text-xl font-normal text-slateMuted">/ 100</span>
            </div>
            <div className="text-xs text-slate-300 mt-1 max-w-sm">{score.summary}</div>
          </div>
          <div className="w-16 h-16 rounded-2xl bg-emeraldHighlight/20 border border-emeraldHighlight/50 flex flex-col items-center justify-center">
            <span className="text-[10px] text-emerald-300 font-mono">GRADE</span>
            <span className="text-2xl font-black text-emerald-400">{score.grade}</span>
          </div>
        </div>

        {/* Category Breakdown Bars */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {Object.entries(score.categoryScores).map(([key, val]) => (
            <div key={key} className="p-3 rounded-xl bg-cardNavy/60 border border-white/5">
              <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1.5 capitalize">
                <span>{key.replace(/([A-Z])/g, " $1")}</span>
                <span className="text-cyanAccent">{val}%</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-cyanAccent to-emeraldHighlight h-full rounded-full"
                  style={{ width: `${val}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Strengths & Weaknesses Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs mb-6">
          {/* Strengths */}
          <div className="p-4 rounded-2xl bg-emeraldHighlight/5 border border-emeraldHighlight/20 space-y-2">
            <div className="font-bold text-emerald-300 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emeraldHighlight" />
              Core Strengths
            </div>
            <ul className="space-y-1.5 text-slate-300">
              {score.strengths.map((str, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="text-emerald-400 mt-0.5">•</span>
                  <span>{str}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Weaknesses */}
          <div className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/20 space-y-2">
            <div className="font-bold text-amber-300 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              Vulnerabilities to Address
            </div>
            <ul className="space-y-1.5 text-slate-300">
              {score.weaknesses.map((w, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="text-amber-400 mt-0.5">•</span>
                  <span>{w}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Actionable Recommendations */}
        <div className="p-4 rounded-2xl bg-indigoAccent/10 border border-indigoAccent/30 space-y-2.5 text-xs">
          <div className="font-bold text-indigo-200 flex items-center gap-1.5">
            <TrendingUp className="w-4 h-4 text-indigo-400" />
            Actionable Next Steps for Founders
          </div>
          <ul className="space-y-2 text-slate-200">
            {score.recommendations.map((rec, idx) => (
              <li key={idx} className="flex items-start gap-2 bg-cardNavy/50 p-2 rounded-lg">
                <span className="font-mono text-cyanAccent font-bold">{idx + 1}.</span>
                <span>{rec}</span>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </div>
  );
};
