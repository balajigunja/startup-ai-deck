import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  X,
  Download,
  Copy,
  Check,
  FileText,
  Code2,
  HelpCircle,
} from "lucide-react";
import { DeckData, PitchInput, InvestorQA, ReadinessScore } from "../types/index.ts";

interface ExportModalProps {
  deck: DeckData;
  pitchInput: PitchInput;
  score?: ReadinessScore;
  qa?: InvestorQA;
  onClose: () => void;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  deck,
  pitchInput,
  score,
  qa,
  onClose,
}) => {
  const [copiedType, setCopiedType] = useState<string>("");

  const generateFullMarkdown = (): string => {
    let md = `# ${pitchInput.startupName} - Pitch Deck\n`;
    md += `**One-Liner**: ${pitchInput.oneLiner}\n`;
    md += `**Industry**: ${pitchInput.industry} | **Target Customer**: ${pitchInput.targetCustomer}\n`;
    if (score) {
      md += `**Investor Readiness Score**: ${score.overallScore}/100 (${score.grade})\n`;
    }
    md += `\n---\n\n`;

    const slidesList = [
      deck.problem,
      deck.solution,
      deck.marketSize,
      deck.product,
      deck.businessModel,
      deck.competition,
      deck.traction,
      deck.team,
      deck.ask,
    ];

    slidesList.forEach((slide, idx) => {
      md += `## Slide ${idx + 1}: ${slide.title}\n`;
      md += `### ${slide.headline}\n\n`;

      if (slide.slideType === "problem") {
        md += `#### Core Pain Points:\n`;
        slide.painPoints.forEach((p) => (md += `- **${p.point}**: ${p.impact}\n`));
        md += `\n**Why Alternatives Fail**: ${slide.currentAlternatives}\n`;
        md += `**Why Now**: ${slide.whyNow}\n\n`;
      } else if (slide.slideType === "solution") {
        md += `**Value Proposition**: ${slide.valueProposition}\n\n`;
        md += `#### Key Pillars:\n`;
        slide.keyPillars.forEach((p) => (md += `- **${p.title}**: ${p.description}\n`));
        md += `\n**Secret Sauce**: ${slide.secretSauce}\n\n`;
      } else if (slide.slideType === "marketSize") {
        md += `- **TAM**: ${slide.tam.value} (${slide.tam.explanation})\n`;
        md += `- **SAM**: ${slide.sam.value} (${slide.sam.explanation})\n`;
        md += `- **SOM**: ${slide.som.value} (${slide.som.explanation})\n`;
        md += `**Growth Driver**: ${slide.growthDriver}\n\n`;
      } else if (slide.slideType === "product") {
        md += `${slide.overview}\n\n`;
        slide.coreFeatures.forEach((f) => (md += `- **${f.feature}**: ${f.benefit}\n`));
        md += `\n**Moat**: ${slide.techMoat} | **Status**: ${slide.status}\n\n`;
      } else if (slide.slideType === "businessModel") {
        md += `**Pricing**: ${slide.pricingModel}\n`;
        md += `**Unit Economics**: CAC ${slide.unitEconomics.cac} | LTV ${slide.unitEconomics.ltv} | Payback ${slide.unitEconomics.payback}\n`;
        md += `**Sales Motion**: ${slide.salesMotion}\n\n`;
      } else if (slide.slideType === "competition") {
        md += `**Landscape**: ${slide.landscape}\n\n`;
        slide.competitors.forEach(
          (c) => (md += `- **${c.name}**: Limits: ${c.limitation} | Our Edge: ${c.ourAdvantage}\n`)
        );
        md += `\n**Defensibility**: ${slide.defensibilityMoat}\n\n`;
      } else if (slide.slideType === "traction") {
        md += `#### Metrics:\n`;
        slide.metrics.forEach((m) => (md += `- **${m.label}**: ${m.value} (${m.change})\n`));
        md += `\n**Social Proof**: ${slide.socialProof}\n\n`;
      } else if (slide.slideType === "team") {
        slide.members.forEach(
          (m) => (md += `- **${m.role}**: ${m.background} (Superpower: ${m.superpower})\n`)
        );
        md += `\n**Why Us**: ${slide.whyUs}\n\n`;
      } else if (slide.slideType === "ask") {
        md += `**Target Raise**: ${slide.targetRaise} (${slide.runwayMonths})\n`;
        md += `**Terms**: ${slide.terms}\n`;
        md += `#### Allocation:\n`;
        slide.allocation.forEach((a) => (md += `- ${a.category}: ${a.percentage}%\n`));
      }

      md += `\n> **Suggested Diagram**: ${slide.suggestedVisual.label} — ${slide.suggestedVisual.description}\n`;
      md += `> **Speaker Script**: "${slide.speakerNotes}"\n\n---\n\n`;
    });

    if (qa && qa.length > 0) {
      md += `## Investor Q&A Battlecard (10 Tough Questions)\n\n`;
      qa.forEach((q, i) => {
        md += `### Q${i + 1}: ${q.question} [${q.category} • ${q.difficulty}]\n`;
        md += `**Recommended Talking Points:**\n`;
        q.suggestedTalkingPoints.forEach((tp) => (md += `- ${tp}\n`));
        md += `**Trap to Avoid:** ${q.trapToAvoid}\n\n`;
      });
    }

    return md;
  };

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(""), 2000);
  };

  const handleDownloadMarkdown = () => {
    const md = generateFullMarkdown();
    const blob = new Blob([md], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${pitchInput.startupName.toLowerCase().replace(/\s+/g, "-")}-pitch-deck.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDownloadJSON = () => {
    const data = JSON.stringify({ pitchInput, deck, score, qa }, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${pitchInput.startupName.toLowerCase().replace(/\s+/g, "-")}-pitch-deck.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const fullMarkdown = generateFullMarkdown();

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
            <div className="w-10 h-10 rounded-xl bg-cyanAccent/20 border border-cyanAccent/40 flex items-center justify-center text-cyan-300">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-platinum">Export Pitch Deck & Assets</h2>
              <p className="text-xs text-slateMuted">
                Download or copy in standard Markdown, plain text, or structured JSON
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

        {/* Quick Action Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-4 flex-shrink-0">
          <button
            type="button"
            onClick={handleDownloadMarkdown}
            className="p-3.5 rounded-2xl bg-cyanAccent/15 border border-cyanAccent/40 hover:bg-cyanAccent/25 text-cyan-300 text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-glowCyan"
          >
            <Download className="w-4 h-4" />
            Download (.md) File
          </button>

          <button
            type="button"
            onClick={() => handleCopy(fullMarkdown, "md")}
            className="p-3.5 rounded-2xl bg-indigoAccent/15 border border-indigoAccent/40 hover:bg-indigoAccent/25 text-indigo-200 text-xs font-bold flex items-center justify-center gap-2 transition-all"
          >
            {copiedType === "md" ? <Check className="w-4 h-4 text-emeraldHighlight" /> : <Copy className="w-4 h-4" />}
            {copiedType === "md" ? "Markdown Copied!" : "Copy Full Markdown"}
          </button>

          <button
            type="button"
            onClick={handleDownloadJSON}
            className="p-3.5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 text-slate-300 text-xs font-bold flex items-center justify-center gap-2 transition-all"
          >
            <Code2 className="w-4 h-4" />
            Download (.json) Backup
          </button>
        </div>

        {/* Markdown Preview Window */}
        <div className="flex-1 overflow-hidden flex flex-col min-h-[260px] bg-cardNavy/80 rounded-2xl border border-white/5 p-4">
          <div className="flex justify-between items-center pb-2 mb-2 border-b border-white/5 text-[11px] font-mono text-slateMuted">
            <span>Markdown Live Preview</span>
            <span>Formatted for Notion, Pitch, Slidebean, Keynote</span>
          </div>
          <pre className="flex-1 overflow-y-auto text-xs font-mono text-slate-300 whitespace-pre-wrap select-all leading-relaxed">
            {fullMarkdown}
          </pre>
        </div>
      </motion.div>
    </div>
  );
};
