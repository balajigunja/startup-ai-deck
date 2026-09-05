import React from "react";
import { BusinessModelSlide } from "../../types/index.ts";

export const ValueChainDiagram: React.FC<{ slide: BusinessModelSlide }> = ({ slide }) => {
  return (
    <div className="bg-obsidian/80 rounded-xl p-4 border border-emeraldHighlight/20 flex flex-col items-center">
      <div className="text-xs uppercase tracking-wider text-emerald-400 font-mono mb-2">
        Flywheel & Unit Economics
      </div>

      <div className="w-full max-w-[340px] grid grid-cols-2 gap-2 my-1">
        <div className="bg-cardNavy/90 border border-slate-700/80 p-2.5 rounded-lg text-center">
          <div className="text-[10px] text-slateMuted">Blended CAC</div>
          <div className="text-sm font-bold text-cyanAccent">{slide.unitEconomics.cac}</div>
        </div>
        <div className="bg-cardNavy/90 border border-slate-700/80 p-2.5 rounded-lg text-center">
          <div className="text-[10px] text-slateMuted">Customer LTV</div>
          <div className="text-sm font-bold text-emerald-400">{slide.unitEconomics.ltv}</div>
        </div>
        <div className="bg-cardNavy/90 border border-slate-700/80 p-2.5 rounded-lg text-center">
          <div className="text-[10px] text-slateMuted">Payback Period</div>
          <div className="text-sm font-bold text-indigo-300">{slide.unitEconomics.payback}</div>
        </div>
        <div className="bg-cardNavy/90 border border-slate-700/80 p-2.5 rounded-lg text-center">
          <div className="text-[10px] text-slateMuted">Gross Margin</div>
          <div className="text-sm font-bold text-emerald-300">{slide.unitEconomics.margin}</div>
        </div>
      </div>

      <div className="text-[11px] text-slateMuted mt-2 text-center">
        {slide.salesMotion}
      </div>
    </div>
  );
};
