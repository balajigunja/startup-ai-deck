import React from "react";
import { AskSlide } from "../../types/index.ts";

export const DonutAllocationDiagram: React.FC<{ slide: AskSlide }> = ({ slide }) => {
  const colors = ["#6366F1", "#06B6D4", "#10B981", "#F59E0B", "#EC4899"];

  return (
    <div className="bg-obsidian/80 rounded-xl p-4 border border-cyanAccent/20 flex flex-col items-center">
      <div className="text-xs uppercase tracking-wider text-cyanAccent font-mono mb-2">
        Capital Use & Runway ({slide.runwayMonths})
      </div>

      <div className="flex items-center justify-center gap-4 w-full max-w-[340px] my-2">
        {/* Simple SVG Donut Indicator */}
        <div className="relative w-28 h-28 flex-shrink-0 flex items-center justify-center">
          <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
            {/* SVG circle segments */}
            <circle cx="50" cy="50" r="38" stroke="#1E293B" strokeWidth="16" fill="none" />
            <circle
              cx="50"
              cy="50"
              r="38"
              stroke="#6366F1"
              strokeWidth="16"
              fill="none"
              strokeDasharray="100 240"
              strokeDashoffset="0"
            />
            <circle
              cx="50"
              cy="50"
              r="38"
              stroke="#06B6D4"
              strokeWidth="16"
              fill="none"
              strokeDasharray="80 240"
              strokeDashoffset="-105"
            />
            <circle
              cx="50"
              cy="50"
              r="38"
              stroke="#10B981"
              strokeWidth="16"
              fill="none"
              strokeDasharray="55 240"
              strokeDashoffset="-190"
            />
          </svg>
          <div className="absolute flex flex-col items-center justify-center">
            <span className="text-[10px] text-slateMuted">Round</span>
            <span className="text-xs font-bold text-platinum">{slide.targetRaise.split(" ")[0]}</span>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-col gap-1.5 flex-1 min-w-0">
          {slide.allocation.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5 truncate">
                <span
                  className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: colors[idx % colors.length] }}
                />
                <span className="text-slate-300 truncate text-[11px]">{item.category}</span>
              </div>
              <span className="font-mono text-platinum font-semibold ml-2">
                {item.percentage}%
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="text-[11px] text-slateMuted mt-1 text-center">
        Terms: <span className="text-cyanAccent">{slide.terms}</span>
      </div>
    </div>
  );
};
