import React, { useState } from "react";
import {
  RefreshCw,
  Copy,
  Check,
  Edit3,
  Save,
  X,
  PieChart,
  Mic,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { SlideData, SlideType, PitchInput } from "../types/index.ts";
import { SlideDiagram } from "./Diagrams/SlideDiagram.tsx";

interface SlideCardProps {
  slide: SlideData;
  slideIndex: number;
  totalSlides: number;
  pitchInput: PitchInput;
  onRegenerate: (slideType: SlideType) => Promise<void>;
  onUpdateSlide: (slideType: SlideType, updatedSlide: SlideData) => void;
  isRegenerating: boolean;
}

export const SlideCard: React.FC<SlideCardProps> = ({
  slide,
  slideIndex,
  totalSlides,
  pitchInput,
  onRegenerate,
  onUpdateSlide,
  isRegenerating,
}) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [showDiagram, setShowDiagram] = useState<boolean>(true);
  const [showSpeakerNotes, setShowSpeakerNotes] = useState<boolean>(true);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  // Edit local state for headline and speakerNotes
  const [editHeadline, setEditHeadline] = useState<string>(slide.headline);
  const [editNotes, setEditNotes] = useState<string>(slide.speakerNotes);

  const handleCopyMarkdown = () => {
    let md = `## ${slideIndex + 1}. ${slide.title}\n\n**${slide.headline}**\n\n`;
    md += `*Speaker Notes:* ${slide.speakerNotes}\n`;

    navigator.clipboard.writeText(md);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveEdit = () => {
    const updated = {
      ...slide,
      headline: editHeadline,
      speakerNotes: editNotes,
    };
    onUpdateSlide(slide.slideType, updated as SlideData);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditHeadline(slide.headline);
    setEditNotes(slide.speakerNotes);
    setIsEditing(false);
  };

  return (
    <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl relative">
      {/* Slide Header Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-white/10">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs px-2.5 py-1 rounded-lg bg-cyanAccent/10 text-cyan-400 border border-cyanAccent/30 font-semibold">
            Slide {String(slideIndex + 1).padStart(2, "0")} / {totalSlides}
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-platinum tracking-tight">
            {slide.title}
          </h2>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          {/* Toggle Diagram Button */}
          <button
            type="button"
            onClick={() => setShowDiagram(!showDiagram)}
            className={`px-2.5 py-1.5 rounded-lg border text-xs font-medium flex items-center gap-1.5 transition-all ${
              showDiagram
                ? "bg-cyanAccent/15 border-cyanAccent/40 text-cyan-300"
                : "bg-white/5 border-white/10 text-slate-400 hover:text-white"
            }`}
            title="Toggle Visual Diagram"
          >
            <PieChart className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Diagram</span>
          </button>

          {/* Edit Slide Button */}
          {isEditing ? (
            <>
              <button
                type="button"
                onClick={handleSaveEdit}
                className="px-2.5 py-1.5 rounded-lg bg-emeraldHighlight/20 border border-emeraldHighlight/40 text-emerald-300 hover:bg-emeraldHighlight/30 text-xs font-semibold flex items-center gap-1 transition-all"
              >
                <Save className="w-3.5 h-3.5" />
                Save
              </button>
              <button
                type="button"
                onClick={handleCancelEdit}
                className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-slate-400 hover:text-white text-xs transition-all"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="px-2.5 py-1.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-medium flex items-center gap-1.5 transition-all"
              title="Edit Slide Content"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Edit</span>
            </button>
          )}

          {/* Copy Markdown Button */}
          <button
            type="button"
            onClick={handleCopyMarkdown}
            className="px-2.5 py-1.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-medium flex items-center gap-1.5 transition-all"
            title="Copy Slide Markdown"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emeraldHighlight" />
                <span className="text-emeraldHighlight hidden sm:inline">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Copy</span>
              </>
            )}
          </button>

          {/* Regenerate Single Slide Button */}
          <button
            type="button"
            onClick={() => onRegenerate(slide.slideType)}
            disabled={isRegenerating}
            className="px-3 py-1.5 rounded-lg border border-indigoAccent/40 bg-indigoAccent/15 hover:bg-indigoAccent/25 text-indigo-200 text-xs font-semibold flex items-center gap-1.5 transition-all"
            title="Regenerate this slide with fresh copy"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRegenerating ? "animate-spin text-cyanAccent" : ""}`} />
            <span className="hidden sm:inline">{isRegenerating ? "Rewriting..." : "Regenerate"}</span>
          </button>
        </div>
      </div>

      {/* Main Slide Content Area */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left / Center Text Column */}
        <div className={showDiagram ? "lg:col-span-7 space-y-5" : "lg:col-span-12 space-y-5"}>
          {/* Headline */}
          {isEditing ? (
            <div>
              <label className="block text-[11px] font-mono uppercase text-slateMuted mb-1">
                Slide Headline
              </label>
              <input
                type="text"
                value={editHeadline}
                onChange={(e) => setEditHeadline(e.target.value)}
                className="glass-input w-full px-3 py-2 rounded-xl text-sm font-semibold"
              />
            </div>
          ) : (
            <h3 className="text-lg sm:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-platinum via-slate-100 to-cyanAccent leading-snug">
              {slide.headline}
            </h3>
          )}

          {/* Slide-Type Specific Structured Content */}
          <div className="space-y-4 text-sm text-slate-300">
            {/* PROBLEM SLIDE */}
            {slide.slideType === "problem" && (
              <>
                <div className="space-y-2">
                  <div className="text-xs font-mono text-cyanAccent uppercase">Acute Bottlenecks:</div>
                  {slide.painPoints.map((p, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-cardNavy/80 border border-white/5 space-y-1">
                      <div className="font-semibold text-platinum flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-400"></span>
                        {p.point}
                      </div>
                      <div className="text-xs text-slateMuted ml-3.5">{p.impact}</div>
                    </div>
                  ))}
                </div>
                <div className="p-3 rounded-xl bg-cardNavy/40 border border-white/5">
                  <span className="text-xs text-slateMuted font-medium">Why Incumbents Fail: </span>
                  <span className="text-xs text-slate-300">{slide.currentAlternatives}</span>
                </div>
                <div className="p-3 rounded-xl bg-indigoAccent/10 border border-indigoAccent/20 text-xs">
                  <span className="text-indigo-300 font-semibold">Why Now Catalyst: </span>
                  <span className="text-slate-200">{slide.whyNow}</span>
                </div>
              </>
            )}

            {/* SOLUTION SLIDE */}
            {slide.slideType === "solution" && (
              <>
                <div className="p-4 rounded-xl bg-cyanAccent/10 border border-cyanAccent/20">
                  <div className="text-xs text-cyan-300 font-mono uppercase mb-1">Value Proposition</div>
                  <div className="text-platinum font-medium">{slide.valueProposition}</div>
                </div>
                <div className="space-y-2">
                  <div className="text-xs font-mono text-cyanAccent uppercase">Strategic Solution Pillars:</div>
                  {slide.keyPillars.map((pillar, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-cardNavy/80 border border-white/5">
                      <div className="font-semibold text-platinum flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyanAccent"></span>
                        {pillar.title}
                      </div>
                      <div className="text-xs text-slateMuted mt-0.5 ml-3.5">{pillar.description}</div>
                    </div>
                  ))}
                </div>
                <div className="p-3 rounded-xl bg-emeraldHighlight/10 border border-emeraldHighlight/20 text-xs">
                  <span className="text-emerald-300 font-semibold">Unfair Secret Sauce: </span>
                  <span className="text-slate-200">{slide.secretSauce}</span>
                </div>
              </>
            )}

            {/* MARKET SIZE SLIDE */}
            {slide.slideType === "marketSize" && (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3.5 rounded-xl bg-indigoAccent/10 border border-indigoAccent/30">
                    <div className="text-[11px] text-indigo-300 font-mono">TAM (Total)</div>
                    <div className="text-xl font-extrabold text-platinum">{slide.tam.value}</div>
                    <div className="text-[11px] text-slateMuted mt-1">{slide.tam.explanation}</div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-cyanAccent/10 border border-cyanAccent/30">
                    <div className="text-[11px] text-cyan-300 font-mono">SAM (Serviceable)</div>
                    <div className="text-xl font-extrabold text-platinum">{slide.sam.value}</div>
                    <div className="text-[11px] text-slateMuted mt-1">{slide.sam.explanation}</div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-emeraldHighlight/10 border border-emeraldHighlight/30">
                    <div className="text-[11px] text-emerald-300 font-mono">SOM (3-Year Goal)</div>
                    <div className="text-xl font-extrabold text-platinum">{slide.som.value}</div>
                    <div className="text-[11px] text-slateMuted mt-1">{slide.som.explanation}</div>
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-cardNavy/60 border border-white/5 text-xs">
                  <span className="text-cyanAccent font-semibold">Growth Catalyst: </span>
                  <span className="text-slate-300">{slide.growthDriver}</span>
                </div>
                <div className="text-[10px] text-slateMuted italic">
                  Note: {slide.disclaimer}
                </div>
              </>
            )}

            {/* PRODUCT SLIDE */}
            {slide.slideType === "product" && (
              <>
                <p className="text-slate-300">{slide.overview}</p>
                <div className="space-y-2">
                  <div className="text-xs font-mono text-cyanAccent uppercase">Core Capabilities:</div>
                  {slide.coreFeatures.map((feat, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-cardNavy/80 border border-white/5 flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyanAccent mt-1.5 flex-shrink-0" />
                      <div>
                        <span className="font-semibold text-platinum">{feat.feature}: </span>
                        <span className="text-xs text-slate-300">{feat.benefit}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-3 rounded-xl bg-indigoAccent/10 border border-indigoAccent/20 text-xs flex justify-between items-center">
                  <div>
                    <span className="text-indigo-300 font-semibold">Technical Moat: </span>
                    <span className="text-slate-200">{slide.techMoat}</span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-cardNavy text-slate-300 font-mono text-[10px] border border-white/10">
                    {slide.status}
                  </span>
                </div>
              </>
            )}

            {/* BUSINESS MODEL SLIDE */}
            {slide.slideType === "businessModel" && (
              <>
                <div className="p-3.5 rounded-xl bg-cardNavy border border-white/10">
                  <div className="text-xs font-mono text-emerald-400 uppercase mb-1">Pricing Strategy</div>
                  <div className="text-platinum font-medium">{slide.pricingModel}</div>
                </div>
                <div className="space-y-2">
                  <div className="text-xs font-mono text-cyanAccent uppercase">Revenue Streams:</div>
                  {slide.revenueStreams.map((rev, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-cardNavy/80 border border-white/5 flex justify-between items-center">
                      <span className="font-semibold text-platinum">{rev.stream}</span>
                      <span className="text-xs text-slateMuted">{rev.details}</span>
                    </div>
                  ))}
                </div>
                <div className="p-3 rounded-xl bg-emeraldHighlight/10 border border-emeraldHighlight/20 text-xs">
                  <span className="text-emerald-300 font-semibold">Sales Motion: </span>
                  <span className="text-slate-200">{slide.salesMotion}</span>
                </div>
              </>
            )}

            {/* COMPETITION SLIDE */}
            {slide.slideType === "competition" && (
              <>
                <p className="text-slate-300 text-xs">{slide.landscape}</p>
                <div className="space-y-2">
                  <div className="text-xs font-mono text-cyanAccent uppercase">Competitive Differentiation:</div>
                  {slide.competitors.map((comp, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-cardNavy/80 border border-white/5 space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-rose-300">{comp.name}</span>
                        <span className="text-[11px] text-slateMuted italic">Limitation: {comp.limitation}</span>
                      </div>
                      <div className="text-xs text-emerald-300 font-medium">
                        Our Advantage: {comp.ourAdvantage}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-3 rounded-xl bg-cyanAccent/10 border border-cyanAccent/20 text-xs">
                  <span className="text-cyan-300 font-semibold">Defensibility Moat: </span>
                  <span className="text-slate-200">{slide.defensibilityMoat}</span>
                </div>
              </>
            )}

            {/* TRACTION SLIDE */}
            {slide.slideType === "traction" && (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {slide.metrics.map((m, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-cardNavy border border-white/10 text-center">
                      <div className="text-[11px] text-slateMuted">{m.label}</div>
                      <div className="text-xl font-extrabold text-emeraldHighlight mt-0.5">{m.value}</div>
                      <div className="text-[10px] text-cyan-300 font-mono mt-1">{m.change}</div>
                    </div>
                  ))}
                </div>
                <div className="space-y-2">
                  <div className="text-xs font-mono text-cyanAccent uppercase">Execution Milestones:</div>
                  {slide.milestones.map((ms, idx) => (
                    <div key={idx} className="p-2.5 rounded-xl bg-cardNavy/80 border border-white/5 flex items-center justify-between text-xs">
                      <span className="font-mono text-indigo-300 font-bold">{ms.time}</span>
                      <span className="text-slate-200">{ms.achievement}</span>
                    </div>
                  ))}
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs italic text-slate-300">
                  {slide.socialProof}
                </div>
              </>
            )}

            {/* TEAM SLIDE */}
            {slide.slideType === "team" && (
              <>
                <div className="space-y-2.5">
                  <div className="text-xs font-mono text-cyanAccent uppercase">Founding Leadership:</div>
                  {slide.members.map((mem, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-cardNavy/80 border border-white/5 space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-platinum">{mem.role}</span>
                        <span className="text-[11px] px-2 py-0.5 rounded bg-indigoAccent/20 text-indigo-300 font-medium">
                          {mem.superpower}
                        </span>
                      </div>
                      <div className="text-xs text-slateMuted">{mem.background}</div>
                    </div>
                  ))}
                </div>
                <div className="p-3 rounded-xl bg-cardNavy/40 border border-white/5 text-xs">
                  <span className="text-cyanAccent font-semibold">Advisory Board: </span>
                  <span className="text-slate-300">{slide.advisors}</span>
                </div>
                <div className="p-3 rounded-xl bg-emeraldHighlight/10 border border-emeraldHighlight/20 text-xs">
                  <span className="text-emerald-300 font-semibold">Unfair Founder-Market Fit: </span>
                  <span className="text-slate-200">{slide.whyUs}</span>
                </div>
              </>
            )}

            {/* ASK SLIDE */}
            {slide.slideType === "ask" && (
              <>
                <div className="p-4 rounded-xl bg-gradient-to-r from-cyanAccent/20 via-indigoAccent/20 to-emeraldHighlight/20 border border-cyanAccent/40 flex justify-between items-center">
                  <div>
                    <div className="text-xs font-mono text-cyan-300 uppercase">Target Capital Raise</div>
                    <div className="text-2xl font-black text-platinum">{slide.targetRaise}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-mono text-emerald-300 uppercase">Runway</div>
                    <div className="text-lg font-bold text-platinum">{slide.runwayMonths}</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-xs font-mono text-cyanAccent uppercase">Round Milestones:</div>
                  {slide.milestonesWithCapital.map((mc, idx) => (
                    <div key={idx} className="p-2.5 rounded-xl bg-cardNavy/80 border border-white/5 text-xs flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emeraldHighlight flex-shrink-0" />
                      <span className="text-slate-200">{mc}</span>
                    </div>
                  ))}
                </div>
                <div className="p-3 rounded-xl bg-cardNavy border border-white/10 text-xs flex justify-between">
                  <span className="text-slateMuted">Financing Structure:</span>
                  <span className="text-cyanAccent font-semibold">{slide.terms}</span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Right Column: Visual Diagram Suggestion */}
        {showDiagram && (
          <div className="lg:col-span-5 space-y-3">
            <SlideDiagram slide={slide} pitchInput={pitchInput} />
            <div className="p-3 rounded-xl bg-cardNavy/60 border border-white/5 text-[11px] text-slateMuted">
              <span className="text-cyanAccent font-semibold">Suggested Chart: </span>
              {slide.suggestedVisual.description}
            </div>
          </div>
        )}
      </div>

      {/* Speaker Notes Accordion */}
      <div className="mt-6 pt-4 border-t border-white/10">
        <button
          type="button"
          onClick={() => setShowSpeakerNotes(!showSpeakerNotes)}
          className="flex items-center justify-between w-full text-xs font-semibold text-slateMuted hover:text-cyanAccent transition-colors"
        >
          <span className="flex items-center gap-1.5">
            <Mic className="w-3.5 h-3.5 text-cyanAccent" />
            Founder Pitch Script & Speaker Notes
          </span>
          {showSpeakerNotes ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>

        {showSpeakerNotes && (
          <div className="mt-2 p-3 rounded-xl bg-cardNavy/40 border border-white/5 text-xs text-slate-300 font-mono leading-relaxed">
            {isEditing ? (
              <textarea
                rows={2}
                value={editNotes}
                onChange={(e) => setEditNotes(e.target.value)}
                className="glass-input w-full p-2 rounded-lg text-xs"
              />
            ) : (
              `"${slide.speakerNotes}"`
            )}
          </div>
        )}
      </div>
    </div>
  );
};
