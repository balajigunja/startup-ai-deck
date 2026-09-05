import React from "react";
import { MarketSizeSlide } from "../../types/index.ts";

export const MarketSizeDiagram: React.FC<{ slide: MarketSizeSlide }> = ({ slide }) => {
  return (
    <div className="bg-obsidian/80 rounded-xl p-4 border border-cyanAccent/20 flex flex-col items-center">
      <div className="text-xs uppercase tracking-wider text-cyanAccent font-mono mb-2">
        Market Opportunity Breakdown
      </div>
      <div className="relative w-full max-w-[320px] aspect-[4/3] flex items-center justify-center">
        <svg viewBox="0 0 400 300" className="w-full h-full">
          {/* Background Grid Lines */}
          <line x1="50" y1="250" x2="350" y2="250" stroke="#334155" strokeWidth="1" strokeDasharray="4 4" />
          <line x1="50" y1="50" x2="50" y2="250" stroke="#334155" strokeWidth="1" strokeDasharray="4 4" />

          {/* TAM Outer Circle */}
          <circle
            cx="200"
            cy="150"
            r="120"
            fill="#6366F1"
            fillOpacity="0.12"
            stroke="#6366F1"
            strokeWidth="2"
            strokeDasharray="6 4"
          />
          {/* SAM Middle Circle */}
          <circle
            cx="200"
            cy="170"
            r="80"
            fill="#06B6D4"
            fillOpacity="0.18"
            stroke="#06B6D4"
            strokeWidth="2"
          />
          {/* SOM Inner Circle */}
          <circle
            cx="200"
            cy="195"
            r="45"
            fill="#10B981"
            fillOpacity="0.3"
            stroke="#10B981"
            strokeWidth="2.5"
          />

          {/* Labels inside SVG */}
          <text x="200" y="55" textAnchor="middle" fill="#818CF8" fontSize="13" fontWeight="bold" fontFamily="sans-serif">
            TAM: {slide.tam.value}
          </text>
          <text x="200" y="115" textAnchor="middle" fill="#22D3EE" fontSize="13" fontWeight="bold" fontFamily="sans-serif">
            SAM: {slide.sam.value}
          </text>
          <text x="200" y="200" textAnchor="middle" fill="#34D399" fontSize="13" fontWeight="bold" fontFamily="sans-serif">
            SOM: {slide.som.value}
          </text>
        </svg>
      </div>
      <div className="grid grid-cols-3 gap-2 w-full mt-3 text-center">
        <div className="bg-indigoAccent/10 border border-indigoAccent/30 rounded-lg p-2">
          <div className="text-[10px] text-indigo-300 font-medium">TAM</div>
          <div className="text-sm font-bold text-platinum">{slide.tam.value}</div>
        </div>
        <div className="bg-cyanAccent/10 border border-cyanAccent/30 rounded-lg p-2">
          <div className="text-[10px] text-cyan-300 font-medium">SAM</div>
          <div className="text-sm font-bold text-platinum">{slide.sam.value}</div>
        </div>
        <div className="bg-emeraldHighlight/10 border border-emeraldHighlight/30 rounded-lg p-2">
          <div className="text-[10px] text-emerald-300 font-medium">SOM (3Y)</div>
          <div className="text-sm font-bold text-platinum">{slide.som.value}</div>
        </div>
      </div>
    </div>
  );
};
