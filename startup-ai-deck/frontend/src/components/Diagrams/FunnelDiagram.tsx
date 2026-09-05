import React from "react";

export const FunnelDiagram: React.FC<{
  stages?: Array<{ label: string; desc: string }>;
}> = ({
  stages = [
    { label: "1. Friction Ingestion", desc: "Fragmented customer data & manual tasks" },
    { label: "2. Autonomous AI Orchestration", desc: "Proprietary models & context engine" },
    { label: "3. 10x ROI Outcome", desc: "Instant automated delivery & measurable savings" },
  ],
}) => {
  return (
    <div className="bg-obsidian/80 rounded-xl p-4 border border-cyanAccent/20 flex flex-col items-center">
      <div className="text-xs uppercase tracking-wider text-cyanAccent font-mono mb-2">
        Value Stream Pipeline
      </div>
      <div className="w-full max-w-[340px] flex flex-col gap-2.5 py-2">
        {stages.map((stage, idx) => {
          const colors = [
            "from-indigo-600/30 to-indigo-800/40 border-indigo-500/40 text-indigo-200",
            "from-cyan-600/30 to-cyan-800/40 border-cyan-500/40 text-cyan-200",
            "from-emerald-600/30 to-emerald-800/40 border-emerald-500/40 text-emerald-200",
          ];
          const widths = ["w-full", "w-[88%] mx-auto", "w-[76%] mx-auto"];

          return (
            <div
              key={idx}
              className={`p-2.5 rounded-lg border bg-gradient-to-r text-center shadow-sm transition-transform hover:scale-[1.02] ${colors[idx % colors.length]} ${widths[idx % widths.length]}`}
            >
              <div className="text-xs font-bold tracking-wide">{stage.label}</div>
              <div className="text-[11px] opacity-80 mt-0.5">{stage.desc}</div>
            </div>
          );
        })}
      </div>
      <div className="text-[11px] text-slateMuted mt-1">
        Seamless conversion from raw friction to automated enterprise value
      </div>
    </div>
  );
};
