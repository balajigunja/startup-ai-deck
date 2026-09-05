import React from "react";
import { TeamSlide } from "../../types/index.ts";

export const TeamOrgDiagram: React.FC<{ slide: TeamSlide }> = ({ slide }) => {
  return (
    <div className="bg-obsidian/80 rounded-xl p-4 border border-indigoAccent/20 flex flex-col items-center">
      <div className="text-xs uppercase tracking-wider text-indigoAccent font-mono mb-2">
        Leadership & Domain Execution
      </div>

      <div className="w-full max-w-[340px] flex flex-col gap-2">
        {slide.members.slice(0, 3).map((member, idx) => (
          <div
            key={idx}
            className="p-2.5 rounded-lg border border-slate-700 bg-cardNavy/80 flex items-center justify-between"
          >
            <div>
              <div className="text-xs font-semibold text-platinum">{member.role}</div>
              <div className="text-[10px] text-slateMuted truncate max-w-[200px]">
                {member.background}
              </div>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded bg-indigoAccent/20 text-indigo-300 font-medium">
              Core
            </span>
          </div>
        ))}
      </div>

      <div className="text-[11px] text-slateMuted mt-2 text-center">
        {slide.whyUs}
      </div>
    </div>
  );
};
