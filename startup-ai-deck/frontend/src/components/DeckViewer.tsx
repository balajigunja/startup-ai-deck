import React, { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  Maximize2,
  Sparkles,
} from "lucide-react";
import { DeckData, SlideType, SlideData, PitchInput } from "../types/index.ts";
import { SlideCard } from "./SlideCard.tsx";

interface DeckViewerProps {
  deck: DeckData;
  pitchInput: PitchInput;
  onRegenerateSlide: (slideType: SlideType) => Promise<void>;
  onUpdateSlide: (slideType: SlideType, updated: SlideData) => void;
  regeneratingSlide: SlideType | null;
}

export const DeckViewer: React.FC<DeckViewerProps> = ({
  deck,
  pitchInput,
  onRegenerateSlide,
  onUpdateSlide,
  regeneratingSlide,
}) => {
  const slideKeys: SlideType[] = [
    "problem",
    "solution",
    "marketSize",
    "product",
    "businessModel",
    "competition",
    "traction",
    "team",
    "ask",
  ];

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [viewMode, setViewMode] = useState<"single" | "grid">("single");

  // Keyboard navigation for carousel flip
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (viewMode !== "single") return;
      if (e.key === "ArrowRight") {
        setCurrentIndex((prev) => Math.min(slideKeys.length - 1, prev + 1));
      } else if (e.key === "ArrowLeft") {
        setCurrentIndex((prev) => Math.max(0, prev - 1));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [viewMode]);

  const currentSlideKey = slideKeys[currentIndex];
  const currentSlideData = deck[currentSlideKey];

  return (
    <div className="space-y-6">
      {/* Deck Controls Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl glass-panel">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-black text-platinum">{pitchInput.startupName}</h1>
            <span className="text-xs px-2 py-0.5 rounded-full bg-cyanAccent/15 text-cyan-300 font-mono">
              9-Slide Deck
            </span>
          </div>
          <p className="text-xs text-slateMuted mt-0.5">{pitchInput.oneLiner}</p>
        </div>

        {/* View Mode & Flip Controls */}
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-cardNavy rounded-xl p-1 border border-white/10">
            <button
              onClick={() => setViewMode("single")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                viewMode === "single"
                  ? "bg-cyanAccent text-obsidian shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Maximize2 className="w-3.5 h-3.5" />
              Presentation
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                viewMode === "grid"
                  ? "bg-cyanAccent text-obsidian shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              Overview Grid
            </button>
          </div>
        </div>
      </div>

      {/* Presentation Mode: Slide Flip-Through */}
      {viewMode === "single" ? (
        <div className="space-y-6">
          {/* Main Slide Card */}
          <SlideCard
            slide={currentSlideData}
            slideIndex={currentIndex}
            totalSlides={slideKeys.length}
            pitchInput={pitchInput}
            onRegenerate={onRegenerateSlide}
            onUpdateSlide={onUpdateSlide}
            isRegenerating={regeneratingSlide === currentSlideKey}
          />

          {/* Carousel Navigation Bottom Bar */}
          <div className="flex items-center justify-between gap-4 p-3 rounded-2xl glass-panel">
            <button
              type="button"
              disabled={currentIndex === 0}
              onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
              className="px-4 py-2 rounded-xl border border-white/10 hover:bg-white/5 disabled:opacity-30 disabled:hover:bg-transparent text-xs font-bold flex items-center gap-1 text-slate-200 transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous Slide
            </button>

            {/* Thumbnail Pills */}
            <div className="hidden md:flex items-center gap-1.5 overflow-x-auto py-1 px-2">
              {slideKeys.map((key, idx) => {
                const s = deck[key];
                const isCurrent = idx === currentIndex;

                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setCurrentIndex(idx)}
                    className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                      isCurrent
                        ? "bg-gradient-to-r from-cyanAccent to-indigoAccent text-obsidian font-bold shadow-glowCyan scale-105"
                        : "bg-cardNavy/60 text-slateMuted hover:text-white hover:bg-cardNavy border border-white/5"
                    }`}
                  >
                    {s.title}
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              disabled={currentIndex === slideKeys.length - 1}
              onClick={() =>
                setCurrentIndex((prev) => Math.min(slideKeys.length - 1, prev + 1))
              }
              className="px-4 py-2 rounded-xl bg-cyanAccent/20 hover:bg-cyanAccent/30 border border-cyanAccent/40 disabled:opacity-30 disabled:hover:bg-cyanAccent/20 text-xs font-bold flex items-center gap-1 text-cyan-300 transition-all shadow-glowCyan"
            >
              Next Slide
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        /* Grid Overview Mode: All 9 Slides */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {slideKeys.map((key, idx) => {
            const s = deck[key];
            return (
              <div
                key={key}
                onClick={() => {
                  setCurrentIndex(idx);
                  setViewMode("single");
                }}
                className="cursor-pointer group"
              >
                <div className="glass-card rounded-2xl p-5 border border-white/10 hover:border-cyanAccent/50 transition-all h-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyanAccent/10 text-cyan-400">
                        Slide {idx + 1}
                      </span>
                      <span className="text-xs font-bold text-slateMuted group-hover:text-cyanAccent transition-colors">
                        Inspect →
                      </span>
                    </div>
                    <h3 className="font-bold text-platinum text-base">{s.title}</h3>
                    <p className="text-xs text-slate-300 mt-1 line-clamp-2">{s.headline}</p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-slateMuted">
                    <span>Chart: {s.suggestedVisual.label}</span>
                    <Sparkles className="w-3.5 h-3.5 text-cyanAccent/60" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
