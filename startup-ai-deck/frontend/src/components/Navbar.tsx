import React from "react";
import {
  Sparkles,
  Layers,
  HelpCircle,
  MessageSquareQuote,
  Download,
  BarChart3,
  RefreshCw,
} from "lucide-react";
import { DEMO_PRESETS, PitchInput } from "../types/index.ts";

interface NavbarProps {
  onSelectPreset: (preset: PitchInput) => void;
  onOpenScore: () => void;
  onOpenQA: () => void;
  onOpenChat: () => void;
  onOpenExport: () => void;
  onReset: () => void;
  hasDeck: boolean;
  scoreGrade?: string;
  activeProvider?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  onSelectPreset,
  onOpenScore,
  onOpenQA,
  onOpenChat,
  onOpenExport,
  onReset,
  hasDeck,
  scoreGrade,
  activeProvider,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-obsidian/85 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Logo & Brand */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={onReset}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyanAccent to-indigoAccent flex items-center justify-center shadow-glowCyan">
            <Sparkles className="w-5 h-5 text-obsidian stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-platinum via-white to-cyanAccent bg-clip-text text-transparent">
                PitchCraft AI
              </span>
              <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-cyanAccent/10 text-cyan-400 border border-cyanAccent/30">
                PRO
              </span>
            </div>
            <p className="text-[11px] text-slateMuted -mt-0.5 hidden sm:block">
              Investor-Ready Deck Engine & Diligence Simulator
            </p>
          </div>
        </div>

        {/* Demo Presets Quick Selector */}
        <div className="hidden md:flex items-center gap-1.5 bg-cardNavy/60 p-1 rounded-xl border border-white/5">
          <span className="text-[11px] text-slateMuted font-mono px-2">Presets:</span>
          {DEMO_PRESETS.map((preset) => (
            <button
              key={preset.id}
              onClick={() => onSelectPreset(preset.data)}
              className="px-2.5 py-1 text-xs rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-all font-medium flex items-center gap-1"
              title={preset.tagline}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-cyanAccent"></span>
              {preset.name}
            </button>
          ))}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {hasDeck ? (
            <>
              {/* Score Button */}
              <button
                onClick={onOpenScore}
                className="px-3 py-1.5 rounded-lg border border-emeraldHighlight/40 bg-emeraldHighlight/10 hover:bg-emeraldHighlight/20 text-emerald-300 text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm"
              >
                <BarChart3 className="w-3.5 h-3.5" />
                <span>Score: {scoreGrade || "A"}</span>
              </button>

              {/* Investor Q&A Button */}
              <button
                onClick={onOpenQA}
                className="px-3 py-1.5 rounded-lg border border-indigoAccent/40 bg-indigoAccent/10 hover:bg-indigoAccent/20 text-indigo-200 text-xs font-semibold flex items-center gap-1.5 transition-all"
              >
                <HelpCircle className="w-3.5 h-3.5 text-indigo-400" />
                <span className="hidden sm:inline">Investor Q&A</span>
                <span className="sm:hidden">Q&A</span>
              </button>

              {/* "Ask the VC" Live Chatbot Button */}
              <button
                onClick={onOpenChat}
                className="px-3 py-1.5 rounded-lg border border-cyanAccent/40 bg-cyanAccent/10 hover:bg-cyanAccent/20 text-cyan-300 text-xs font-semibold flex items-center gap-1.5 transition-all shadow-glowCyan"
              >
                <MessageSquareQuote className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Ask the VC</span>
                <span className="sm:hidden">Chat</span>
              </button>

              {/* Export Button */}
              <button
                onClick={onOpenExport}
                className="px-3 py-1.5 rounded-lg border border-white/20 bg-white/5 hover:bg-white/10 text-platinum text-xs font-medium flex items-center gap-1.5 transition-all"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Export</span>
              </button>

              {/* New Deck Button */}
              <button
                onClick={onReset}
                className="p-1.5 rounded-lg hover:bg-white/10 text-slateMuted hover:text-white transition-colors"
                title="Create New Deck"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-xs text-slateMuted hidden sm:inline">Engine:</span>
              <span className="text-xs font-mono px-2 py-1 rounded bg-slate-800 border border-slate-700 text-cyan-300">
                {activeProvider || "Google Gemini 2.5 / Fallback"}
              </span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
