import React from "react";

interface MatrixProps {
  title?: string;
  ourStartupName: string;
  competitors?: Array<{ name: string }>;
  xAxisLabel?: string;
  yAxisLabel?: string;
}

export const MatrixDiagram: React.FC<MatrixProps> = ({
  title = "2x2 Competitive Advantage Matrix",
  ourStartupName,
  competitors = [],
  xAxisLabel = "Speed to Deployment →",
  yAxisLabel = "Automation & Intelligence Power →",
}) => {
  return (
    <div className="bg-obsidian/80 rounded-xl p-4 border border-indigoAccent/20 flex flex-col items-center">
      <div className="text-xs uppercase tracking-wider text-indigoAccent font-mono mb-2">
        {title}
      </div>
      <div className="relative w-full max-w-[340px] aspect-[4/3] flex items-center justify-center">
        <svg viewBox="0 0 360 280" className="w-full h-full">
          {/* Quadrant Backgrounds */}
          <rect x="180" y="30" width="150" height="110" fill="#06B6D4" fillOpacity="0.08" rx="6" />
          <rect x="30" y="30" width="150" height="110" fill="#1E293B" fillOpacity="0.3" rx="6" />
          <rect x="30" y="140" width="150" height="110" fill="#0F172A" fillOpacity="0.4" rx="6" />
          <rect x="180" y="140" width="150" height="110" fill="#1E293B" fillOpacity="0.3" rx="6" />

          {/* Axes */}
          <line x1="30" y1="140" x2="330" y2="140" stroke="#475569" strokeWidth="2" strokeDasharray="3 3" />
          <line x1="180" y1="30" x2="180" y2="250" stroke="#475569" strokeWidth="2" strokeDasharray="3 3" />

          {/* Axis Labels */}
          <text x="330" y="155" textAnchor="end" fill="#94A3B8" fontSize="10" fontFamily="sans-serif">
            {xAxisLabel}
          </text>
          <text x="185" y="42" textAnchor="start" fill="#94A3B8" fontSize="10" fontFamily="sans-serif">
            {yAxisLabel}
          </text>

          {/* Competitor Nodes in lower/other quadrants */}
          <g>
            <circle cx="90" cy="80" r="7" fill="#64748B" />
            <text x="90" y="102" textAnchor="middle" fill="#94A3B8" fontSize="10" fontWeight="500">
              {competitors[0]?.name || "Legacy Suite"}
            </text>
          </g>
          <g>
            <circle cx="100" cy="190" r="7" fill="#64748B" />
            <text x="100" y="212" textAnchor="middle" fill="#94A3B8" fontSize="10" fontWeight="500">
              Manual Tools / DIY
            </text>
          </g>
          <g>
            <circle cx="250" cy="195" r="7" fill="#64748B" />
            <text x="250" y="217" textAnchor="middle" fill="#94A3B8" fontSize="10" fontWeight="500">
              {competitors[1]?.name || "Point Tools"}
            </text>
          </g>

          {/* Our Startup in Top-Right Leader Quadrant */}
          <g className="animate-pulse">
            <circle cx="260" cy="75" r="16" fill="#06B6D4" fillOpacity="0.3" />
            <circle cx="260" cy="75" r="9" fill="#06B6D4" stroke="#FFFFFF" strokeWidth="2" />
            <text x="260" y="105" textAnchor="middle" fill="#22D3EE" fontSize="12" fontWeight="bold">
              ★ {ourStartupName}
            </text>
          </g>
        </svg>
      </div>
      <div className="text-[11px] text-slateMuted text-center mt-1">
        Top-Right Quadrant: High Velocity & Maximum Automation Defensibility
      </div>
    </div>
  );
};
