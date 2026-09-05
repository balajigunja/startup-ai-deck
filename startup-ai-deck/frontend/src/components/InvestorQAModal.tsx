import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  X,
  HelpCircle,
  AlertOctagon,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Filter,
} from "lucide-react";
import { InvestorQA } from "../types/index.ts";

interface InvestorQAModalProps {
  qaList: InvestorQA;
  onClose: () => void;
}

export const InvestorQAModal: React.FC<InvestorQAModalProps> = ({
  qaList,
  onClose,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [expandedId, setExpandedId] = useState<string>(qaList[0]?.id || "");

  const categories = ["All", ...Array.from(new Set(qaList.map((q) => q.category)))];

  const filteredQA =
    selectedCategory === "All"
      ? qaList
      : qaList.filter((q) => q.category === selectedCategory);

  const difficultyColors = {
    Crucial: "bg-rose-500/20 text-rose-300 border-rose-500/40",
    Tough: "bg-amber-500/20 text-amber-300 border-amber-500/40",
    Aggressive: "bg-purple-500/20 text-purple-300 border-purple-500/40",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-obsidian/85 backdrop-blur-md p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-3xl glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl relative max-h-[90vh] flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigoAccent/20 border border-indigoAccent/40 flex items-center justify-center text-indigo-300">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-platinum">Investor Q&A Prep Room</h2>
              <p className="text-xs text-slateMuted">
                10 aggressive partner-meeting questions with battle-tested counter-points
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-white/10 text-slateMuted hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-1.5 py-4 overflow-x-auto flex-shrink-0">
          <Filter className="w-3.5 h-3.5 text-slateMuted mr-1" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? "bg-cyanAccent text-obsidian font-bold shadow-sm"
                  : "bg-cardNavy text-slateMuted hover:text-white border border-white/5"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Q&A List */}
        <div className="space-y-3 overflow-y-auto pr-1 flex-1">
          {filteredQA.map((item, idx) => {
            const isExpanded = expandedId === item.id;

            return (
              <div
                key={item.id || idx}
                className="rounded-2xl bg-cardNavy/60 border border-white/5 overflow-hidden transition-all hover:border-white/15"
              >
                {/* Header row */}
                <button
                  type="button"
                  onClick={() => setExpandedId(isExpanded ? "" : item.id)}
                  className="w-full p-4 text-left flex items-start justify-between gap-3"
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-white/5 text-slate-400">
                        Q{idx + 1}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigoAccent/15 text-indigo-300">
                        {item.category}
                      </span>
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                          difficultyColors[item.difficulty] || "bg-slate-700 text-slate-300"
                        }`}
                      >
                        {item.difficulty}
                      </span>
                    </div>
                    <div className="font-bold text-sm text-platinum">{item.question}</div>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-slateMuted mt-1" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slateMuted mt-1" />
                  )}
                </button>

                {/* Expanded details */}
                {isExpanded && (
                  <div className="p-4 pt-0 space-y-3 border-t border-white/5 mt-1 text-xs">
                    {/* Talking points */}
                    <div className="space-y-1.5">
                      <div className="text-[11px] font-semibold text-emerald-300 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emeraldHighlight" />
                        Recommended Talking-Point Answers:
                      </div>
                      <ul className="space-y-1 text-slate-200 pl-4">
                        {item.suggestedTalkingPoints.map((tp, tpIdx) => (
                          <li key={tpIdx} className="list-disc">
                            {tp}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Trap to avoid */}
                    <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-200 flex items-start gap-2">
                      <AlertOctagon className="w-4 h-4 text-rose-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="font-bold text-rose-300">Fatal Trap to Avoid: </span>
                        <span>{item.trapToAvoid}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};
