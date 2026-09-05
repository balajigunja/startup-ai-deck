import React from "react";

export const ArchitectureDiagram: React.FC<{ status?: string }> = ({
  status = "Active Production / Beta",
}) => {
  return (
    <div className="bg-obsidian/80 rounded-xl p-4 border border-cyanAccent/20 flex flex-col items-center">
      <div className="flex items-center justify-between w-full mb-2">
        <span className="text-xs uppercase tracking-wider text-cyanAccent font-mono">
          3-Tier System Architecture
        </span>
        <span className="text-[10px] px-2 py-0.5 rounded-full bg-emeraldHighlight/20 text-emerald-300 font-mono">
          {status}
        </span>
      </div>

      <div className="w-full max-w-[340px] flex flex-col gap-2 relative">
        {/* Layer 1: Client Layer */}
        <div className="p-2.5 rounded-lg border border-cyanAccent/30 bg-cardNavy/80 flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-platinum">Client Touchpoints</div>
            <div className="text-[10px] text-slateMuted">Web, Mobile Apps, REST & Webhook APIs</div>
          </div>
          <span className="text-xs px-2 py-0.5 bg-cyanAccent/20 text-cyan-300 rounded font-mono">L3</span>
        </div>

        {/* Connector */}
        <div className="flex justify-center -my-1 text-slateMuted text-xs">↓</div>

        {/* Layer 2: Core Intelligence Layer */}
        <div className="p-2.5 rounded-lg border border-indigoAccent/40 bg-indigoAccent/10 flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-indigo-200">AI Reasoning & Automation</div>
            <div className="text-[10px] text-indigo-300/80">LLM Router, Fine-Tuned Agent Stack, Vector Memory</div>
          </div>
          <span className="text-xs px-2 py-0.5 bg-indigoAccent/30 text-indigo-300 rounded font-mono">L2</span>
        </div>

        {/* Connector */}
        <div className="flex justify-center -my-1 text-slateMuted text-xs">↓</div>

        {/* Layer 3: Secure Data Layer */}
        <div className="p-2.5 rounded-lg border border-slate-700 bg-cardNavy/80 flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-platinum">Data & Storage Engine</div>
            <div className="text-[10px] text-slateMuted">Multi-Tenant Vault, SOC-2 Event Streams, Cache</div>
          </div>
          <span className="text-xs px-2 py-0.5 bg-slate-700 text-slate-300 rounded font-mono">L1</span>
        </div>
      </div>
    </div>
  );
};
