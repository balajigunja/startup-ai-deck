import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Activity,
  X,
  AlertTriangle,
  Stethoscope,
  HeartPulse,
  ShieldAlert,
  Flame,
  BatteryCharging,
  TrendingUp,
  Copy,
  Check,
  Zap,
} from "lucide-react";
import { PitchHealthCheck, PitchInput } from "../types/index.ts";

interface PitchHealthCheckModalProps {
  healthCheck: PitchHealthCheck;
  pitchInput: PitchInput;
  onClose: () => void;
}

export const PitchHealthCheckModal: React.FC<PitchHealthCheckModalProps> = ({
  healthCheck,
  pitchInput,
  onClose,
}) => {
  const [copied, setCopied] = useState<boolean>(false);

  const statusBadge = (status: "Healthy" | "Caution" | "Critical") => {
    switch (status) {
      case "Healthy":
        return (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
            ● Healthy
          </span>
        );
      case "Caution":
        return (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
            ▲ Caution
          </span>
        );
      case "Critical":
        return (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40">
            ✖ Critical
          </span>
        );
    }
  };

  const handleCopyReport = () => {
    let report = `🩺 STARTUP PITCH HEALTH CHECK: ${pitchInput.startupName}\n`;
    report += `Health Index: ${healthCheck.healthIndex}/100 [${healthCheck.overallCondition}]\n`;
    report += `Verdict: ${healthCheck.investorVerdict}\n\n`;
    report += `--- VITAL SIGNS ---\n`;
    report += `1. Narrative Vitality: ${healthCheck.vitalSigns.narrativeVitality.score}% (${healthCheck.vitalSigns.narrativeVitality.status}) - ${healthCheck.vitalSigns.narrativeVitality.diagnosis}\n`;
    report += `2. Financial Pulse: ${healthCheck.vitalSigns.financialPulse.score}% (${healthCheck.vitalSigns.financialPulse.status}) - ${healthCheck.vitalSigns.financialPulse.diagnosis}\n`;
    report += `3. Moat Immunity: ${healthCheck.vitalSigns.moatImmunity.score}% (${healthCheck.vitalSigns.moatImmunity.status}) - ${healthCheck.vitalSigns.moatImmunity.diagnosis}\n`;
    report += `4. Growth Velocity: ${healthCheck.vitalSigns.growthVelocity.score}% (${healthCheck.vitalSigns.growthVelocity.status}) - ${healthCheck.vitalSigns.growthVelocity.diagnosis}\n`;
    report += `5. Runway Oxygen: ${healthCheck.vitalSigns.runwayOxygen.score}% (${healthCheck.vitalSigns.runwayOxygen.status}) - ${healthCheck.vitalSigns.runwayOxygen.diagnosis}\n\n`;
    report += `--- RED FLAGS ---\n`;
    healthCheck.redFlags.forEach((rf) => (report += `- ${rf}\n`));
    report += `\n--- PRESCRIPTIONS ---\n`;
    healthCheck.prescriptions.forEach((p) => (report += `- ${p}\n`));

    navigator.clipboard.writeText(report);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const vitalSignIcons = {
    narrativeVitality: Flame,
    financialPulse: HeartPulse,
    moatImmunity: ShieldAlert,
    growthVelocity: TrendingUp,
    runwayOxygen: BatteryCharging,
  };

  const vitalSignTitles = {
    narrativeVitality: "Narrative Vitality",
    financialPulse: "Financial Pulse (Unit Economics)",
    moatImmunity: "Moat Immunity (Defensibility)",
    growthVelocity: "Growth Velocity & Pull",
    runwayOxygen: "Runway Oxygen & Burn",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-obsidian/85 backdrop-blur-md p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-3xl glass-panel rounded-3xl p-6 sm:p-8 border border-cyanAccent/30 shadow-2xl relative max-h-[92vh] flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyanAccent/20 border border-cyanAccent/40 flex items-center justify-center text-cyan-300 shadow-glowCyan">
              <Stethoscope className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-black text-platinum">Pitch Health Check & Vital Signs</h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  CLINICAL DIAGNOSTIC
                </span>
              </div>
              <p className="text-xs text-slateMuted">
                Diligence health check evaluating survival probability and venture scalability
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

        {/* Scrollable Clinical Body */}
        <div className="flex-1 overflow-y-auto space-y-6 py-4 pr-1">
          {/* Hero Diagnostic Card */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-cardNavy via-obsidian to-cardNavy border border-cyanAccent/40 flex flex-wrap items-center justify-between gap-4 relative overflow-hidden">
            <div className="space-y-1.5 max-w-md">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-cyanAccent animate-pulse" />
                <span className="text-xs font-mono uppercase text-cyan-300 font-bold tracking-wider">
                  Health Condition:
                </span>
                <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-cyanAccent/20 text-cyan-200 border border-cyanAccent/40 font-extrabold">
                  {healthCheck.overallCondition}
                </span>
              </div>
              <p className="text-xs text-slate-200 leading-relaxed font-medium">
                {healthCheck.investorVerdict}
              </p>
            </div>

            {/* Health Index Circle */}
            <div className="flex items-center gap-3">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-cyanAccent/20 via-indigoAccent/20 to-emeraldHighlight/20 border border-cyanAccent/50 flex flex-col items-center justify-center text-center shadow-glowCyan">
                <span className="text-[10px] font-mono text-cyan-300 uppercase">Health Index</span>
                <span className="text-2xl font-black text-platinum">{healthCheck.healthIndex}%</span>
              </div>
            </div>
          </div>

          {/* 5 Vital Signs Diagnostic Grid */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold mb-3 flex items-center gap-1.5">
              <HeartPulse className="w-3.5 h-3.5 text-cyanAccent" />
              Startup Vital Signs (5 Diagnostic Pillars):
            </h3>

            <div className="space-y-3">
              {(Object.keys(healthCheck.vitalSigns) as Array<keyof typeof healthCheck.vitalSigns>).map(
                (key) => {
                  const item = healthCheck.vitalSigns[key];
                  const Icon = vitalSignIcons[key] || Activity;
                  const title = vitalSignTitles[key] || key;

                  return (
                    <div
                      key={key}
                      className="p-3.5 rounded-xl bg-cardNavy/70 border border-white/5 hover:border-white/15 transition-all"
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-2">
                          <Icon className="w-4 h-4 text-cyanAccent" />
                          <span className="font-bold text-xs text-platinum">{title}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {statusBadge(item.status)}
                          <span className="font-mono text-xs font-bold text-platinum">
                            {item.score}%
                          </span>
                        </div>
                      </div>

                      {/* Progress line */}
                      <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden mb-2">
                        <div
                          className={`h-full rounded-full ${
                            item.status === "Healthy"
                              ? "bg-emeraldHighlight"
                              : item.status === "Caution"
                              ? "bg-amber-400"
                              : "bg-rose-500"
                          }`}
                          style={{ width: `${item.score}%` }}
                        />
                      </div>

                      <p className="text-[11px] text-slate-300 leading-relaxed">
                        {item.diagnosis}
                      </p>
                    </div>
                  );
                }
              )}
            </div>
          </div>

          {/* Red Flags & Prescriptions Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Red Flag Warnings */}
            <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 space-y-2 text-xs">
              <div className="font-bold text-rose-300 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-rose-400" />
                Critical Red Flag Risks
              </div>
              <ul className="space-y-1.5 text-rose-200/90 pl-1">
                {healthCheck.redFlags.map((rf, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-rose-400 font-bold">•</span>
                    <span>{rf}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Prescriptions & Treatment Plan */}
            <div className="p-4 rounded-2xl bg-emeraldHighlight/10 border border-emeraldHighlight/30 space-y-2 text-xs">
              <div className="font-bold text-emerald-300 flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-emeraldHighlight" />
                Doctor's Treatment Plan
              </div>
              <ul className="space-y-1.5 text-emerald-200/90 pl-1">
                {healthCheck.prescriptions.map((rx, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span>{rx}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-white/10 flex items-center justify-between flex-shrink-0">
          <span className="text-[11px] text-slateMuted">
            Review these diagnostics to inoculate your deck against skeptical VCs.
          </span>
          <button
            type="button"
            onClick={handleCopyReport}
            className="px-4 py-2 rounded-xl bg-cyanAccent/15 border border-cyanAccent/40 hover:bg-cyanAccent/25 text-cyan-300 text-xs font-bold flex items-center gap-1.5 transition-all shadow-glowCyan"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emeraldHighlight" />
                <span>Diagnostic Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Diagnostic Report</span>
              </>
            )}
          </button>
        </div>
      </motion.div>
    </div>
  );
};
