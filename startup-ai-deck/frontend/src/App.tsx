import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { MessageSquareQuote, Sparkles, CheckCircle2 } from "lucide-react";

// Remove the .tsx and .ts extensions here:
import { Navbar } from "./components/Navbar";
import { StepWizard } from "./components/StepWizard";
import { DeckViewer } from "./components/DeckViewer";
import { ReasoningLoader } from "./components/ReasoningLoader";
import { ScoreCard } from "./components/ScoreCard";
import { InvestorQAModal } from "./components/InvestorQAModal";
import { InvestorChatbot } from "./components/InvestorChatbot";
import { ExportModal } from "./components/ExportModal";
import {
  PitchInput,
  DeckData,
  ReadinessScore,
  InvestorQA,
  SlideType,
  SlideData,
  DEMO_PRESETS,
} from "./types/index";
import {
  generatePitchDeck,
  regenerateSingleSlide,
  checkSystemHealth,
} from "./services/api";

// ... rest of your App component code ...

export function App() {
  const [pitchInput, setPitchInput] = useState<PitchInput>(DEMO_PRESETS[0].data);
  const [deck, setDeck] = useState<DeckData | null>(null);
  const [score, setScore] = useState<ReadinessScore | null>(null);
  const [qa, setQA] = useState<InvestorQA | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [regeneratingSlide, setRegeneratingSlide] = useState<SlideType | null>(null);
  const [activeProvider, setActiveProvider] = useState<string>("Initializing...");

  // Modals state
  const [isScoreOpen, setIsScoreOpen] = useState<boolean>(false);
  const [isQAOpen, setIsQAOpen] = useState<boolean>(false);
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const [isExportOpen, setIsExportOpen] = useState<boolean>(false);

  // Toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  // Check system health on mount
  useEffect(() => {
    checkSystemHealth()
      .then((health) => {
        setActiveProvider(health.activePrimary);
      })
      .catch(() => {
        setActiveProvider("Offline Mock / Fallback");
      });
  }, []);

  const handleGenerate = async (input: PitchInput) => {
    setPitchInput(input);
    setIsLoading(true);

    try {
      const response = await generatePitchDeck(input);
      setDeck(response.slides);
      setScore(response.score);
      setQA(response.qa);

      // Trigger celebration confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#06B6D4", "#6366F1", "#10B981"],
      });

      showToast("Pitch deck generated successfully!");
    } catch (err: any) {
      alert(`Generation failed: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegenerateSlide = async (slideType: SlideType) => {
    if (!deck) return;
    setRegeneratingSlide(slideType);

    try {
      const response = await regenerateSingleSlide(slideType, pitchInput);
      setDeck((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          [slideType]: response.slide,
        };
      });
      showToast(`Regenerated ${slideType} slide!`);
    } catch (err: any) {
      alert(`Slide regeneration failed: ${err.message}`);
    } finally {
      setRegeneratingSlide(null);
    }
  };

  const handleUpdateSlide = (slideType: SlideType, updated: SlideData) => {
    setDeck((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        [slideType]: updated,
      };
    });
    showToast("Slide updated!");
  };

  const handleSelectPreset = (presetData: PitchInput) => {
    setPitchInput(presetData);
    setDeck(null);
    showToast(`Loaded ${presetData.startupName} preset!`);
  };

  const handleReset = () => {
    setDeck(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-obsidian text-platinum relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 p-3 px-4 rounded-xl bg-cardNavy/95 border border-cyanAccent/50 text-xs font-semibold text-cyan-200 shadow-glowCyan flex items-center gap-2 backdrop-blur-md animate-in fade-in slide-in-from-top-4">
          <CheckCircle2 className="w-4 h-4 text-cyanAccent" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Navbar */}
      <Navbar
        onSelectPreset={handleSelectPreset}
        onOpenScore={() => setIsScoreOpen(true)}
        onOpenQA={() => setIsQAOpen(true)}
        onOpenChat={() => setIsChatOpen(true)}
        onOpenExport={() => setIsExportOpen(true)}
        onReset={handleReset}
        hasDeck={Boolean(deck)}
        scoreGrade={score?.grade}
        activeProvider={activeProvider}
      />

      {/* Page Body Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Loading Reasoning State */}
        {isLoading && <ReasoningLoader startupName={pitchInput.startupName} />}

        {/* View Mode: Input Wizard vs Deck Viewer */}
        {!deck ? (
          <div className="space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-mono font-semibold px-3 py-1 rounded-full bg-cyanAccent/10 text-cyan-400 border border-cyanAccent/30">
                AI Pitch Architect & Partner Simulator
              </span>
              <h1 className="text-3xl sm:text-5xl font-black text-platinum tracking-tight">
                Turn Raw Startup Ideas Into{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyanAccent via-indigo-400 to-emerald-400">
                  Investor-Grade Decks
                </span>
              </h1>
              <p className="text-sm text-slateMuted leading-relaxed">
                Generate 9 structured pitch slides, market sizing formulas, defensible unit economics,
                tailored visual diagrams, and prep for 10 tough investor diligence questions in seconds.
              </p>
            </div>

            <StepWizard
              initialData={pitchInput}
              onSubmit={handleGenerate}
              isLoading={isLoading}
            />
          </div>
        ) : (
          <DeckViewer
            deck={deck}
            pitchInput={pitchInput}
            onRegenerateSlide={handleRegenerateSlide}
            onUpdateSlide={handleUpdateSlide}
            regeneratingSlide={regeneratingSlide}
          />
        )}
      </main>

      {/* Floating "Ask the VC" Launcher when deck is loaded */}
      {deck && !isChatOpen && (
        <button
          type="button"
          onClick={() => setIsChatOpen(true)}
          className="fixed bottom-6 right-6 z-40 p-4 rounded-2xl bg-gradient-to-tr from-cyanAccent via-indigoAccent to-emeraldHighlight text-obsidian font-extrabold shadow-glowCyan hover:scale-105 transition-all flex items-center gap-2 group"
          title="Roleplay diligence with Marcus Vance (Skeptical VC)"
        >
          <MessageSquareQuote className="w-5 h-5 stroke-[2.5]" />
          <span className="text-xs font-black tracking-wide">
            Ask the VC Simulator
          </span>
          <span className="w-2 h-2 rounded-full bg-emerald-950 animate-ping" />
        </button>
      )}

      {/* Modals */}
      {isScoreOpen && score && (
        <ScoreCard score={score} onClose={() => setIsScoreOpen(false)} />
      )}

      {isQAOpen && qa && (
        <InvestorQAModal qaList={qa} onClose={() => setIsQAOpen(false)} />
      )}

      <InvestorChatbot
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        pitchInput={pitchInput}
        deck={deck || undefined}
      />

      {isExportOpen && deck && (
        <ExportModal
          deck={deck}
          pitchInput={pitchInput}
          score={score || undefined}
          qa={qa || undefined}
          onClose={() => setIsExportOpen(false)}
        />
      )}

      {/* Footer */}
      <footer className="border-t border-white/5 py-6 bg-cardNavy/40 text-center text-xs text-slateMuted">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>PitchCraft AI • Production Pitch Deck Generator & Diligence Simulator</span>
          <span className="font-mono text-[11px] text-slate-500">
            Engine: {activeProvider}
          </span>
        </div>
      </footer>
    </div>
  );
}

export default App;