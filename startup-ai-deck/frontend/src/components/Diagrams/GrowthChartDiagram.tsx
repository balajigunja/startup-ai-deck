import React from "react";
import { TractionSlide } from "../../types/index.ts";

export const GrowthChartDiagram: React.FC<{ slide: TractionSlide }> = ({ slide }) => {
  return (
    <div className="bg-obsidian/80 rounded-xl p-4 border border-emeraldHighlight/20 flex flex-col items-center">
      <div className="text-xs uppercase tracking-wider text-emerald-400 font-mono mb-2">
        Adoption Velocity & MoM Growth
      </div>

      <div className="relative w-full max-w-[340px] aspect-[4/3] flex items-center justify-center">
        <svg viewBox="0 0 360 220" className="w-full h-full">
          {/* Grid lines */}
          <line x1="40" y1="180" x2="330" y2="180" stroke="#334155" strokeWidth="1.5" />
          <line x1="40" y1="120" x2="330" y2="120" stroke="#1E293B" strokeWidth="1" strokeDasharray="4 4" />
          <line x1="40" y1="60" x2="330" y2="60" stroke="#1E293B" strokeWidth="1" strokeDasharray="4 4" />

          {/* Upward Curved Growth Gradient Area */}
          <defs>
            <linearGradient id="growthGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10B981" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#10B981" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          <path
            d="M 50 175 Q 150 165 220 100 T 320 35 L 320 180 L 50 180 Z"
            fill="url(#growthGrad)"
          />

          {/* Growth Curve Line */}
          <path
            d="M 50 175 Q 150 165 220 100 T 320 35"
            fill="none"
            stroke="#10B981"
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          {/* Metric Points */}
          <circle cx="50" cy="175" r="4" fill="#10B981" />
          <circle cx="200" cy="115" r="5" fill="#06B6D4" stroke="#F8FAFC" strokeWidth="1.5" />
          <circle cx="320" cy="35" r="6" fill="#10B981" stroke="#F8FAFC" strokeWidth="2" />

          {/* Callout Label */}
          <rect x="230" y="10" width="105" height="24" rx="4" fill="#0F172A" stroke="#10B981" strokeWidth="1" />
          <text x="282" y="26" textAnchor="middle" fill="#34D399" fontSize="10" fontWeight="bold">
            {slide.metrics[0]?.value || "Exponential"}
          </text>

          {/* Time Labels */}
          <text x="50" y="198" textAnchor="middle" fill="#94A3B8" fontSize="10">Q1 Alpha</text>
          <text x="185" y="198" textAnchor="middle" fill="#94A3B8" fontSize="10">Q2 Beta</text>
          <text x="320" y="198" textAnchor="middle" fill="#94A3B8" fontSize="10">Scale GA</text>
        </svg>
      </div>

      <div className="text-[11px] text-slateMuted mt-1">
        High product pull and compounding weekly cohort retention
      </div>
    </div>
  );
};
