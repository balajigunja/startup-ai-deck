import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquareQuote,
  X,
  Send,
  Sparkles,
  Bot,
  User,
  HelpCircle,
  Loader2,
  Minimize2,
} from "lucide-react";
import { PitchInput, ChatMessage, DeckData } from "../types/index.ts";
import { sendVCChat } from "../services/api.ts";

interface InvestorChatbotProps {
  isOpen: boolean;
  onClose: () => void;
  pitchInput: PitchInput;
  deck?: DeckData;
}

export const InvestorChatbot: React.FC<InvestorChatbotProps> = ({
  isOpen,
  onClose,
  pitchInput,
  deck,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "initial",
      role: "assistant",
      content: `Hello! I'm Marcus Vance, Partner at Horizon Capital. I've been reviewing your pitch for ${pitchInput.startupName}. The ${pitchInput.industry} space is competitive and incumbents aren't asleep. Pitch me your core advantage—why does ${pitchInput.startupName} win this category?`,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      sentiment: "probing",
      suggestedFollowUps: [
        "How our proprietary data engine prevents copying",
        "Why our unit economics beat legacy competitors",
        "Our customer acquisition and retention metrics",
      ],
    },
  ]);

  const [inputMessage, setInputMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (textToSend?: string) => {
    const text = textToSend || inputMessage;
    if (!text.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      role: "user",
      content: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInputMessage("");
    setIsLoading(true);

    try {
      const deckSummary = deck
        ? `Problem: ${deck.problem.headline}. Solution: ${deck.solution.headline}. TAM: ${deck.marketSize.tam.value}. Raise: ${deck.ask.targetRaise}.`
        : undefined;

      const response = await sendVCChat(newMessages, pitchInput, deckSummary);

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        role: "assistant",
        content: response.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        sentiment: response.sentiment,
        suggestedFollowUps: response.suggestedFollowUps,
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        role: "assistant",
        content: "Let's pause. That was an interesting point—could you clarify how you handle your customer acquisition payback window?",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        sentiment: "skeptical",
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 w-full max-w-lg">
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 30, scale: 0.95 }}
        className="glass-panel rounded-3xl border border-cyanAccent/30 shadow-2xl overflow-hidden flex flex-col h-[560px]"
      >
        {/* Chatbot Header */}
        <div className="p-4 bg-cardNavy/90 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyanAccent to-indigoAccent flex items-center justify-center text-obsidian font-bold shadow-glowCyan">
                <Bot className="w-5 h-5" />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emeraldHighlight border-2 border-cardNavy" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-bold text-platinum text-sm">Marcus Vance</h3>
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-indigoAccent/20 text-indigo-300">
                  VC Partner
                </span>
              </div>
              <p className="text-[11px] text-slateMuted">
                Horizon Capital • Diligence Simulator
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slateMuted hover:text-white hover:bg-white/10 transition-colors"
              title="Close chat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Message Log */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          {messages.map((msg) => {
            const isBot = msg.role === "assistant";

            return (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${isBot ? "items-start" : "items-end justify-end"}`}
              >
                {isBot && (
                  <div className="w-7 h-7 rounded-lg bg-cardNavy border border-white/10 flex items-center justify-center text-cyanAccent flex-shrink-0 mt-0.5">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div className={`max-w-[85%] space-y-1.5 ${isBot ? "text-left" : "text-right"}`}>
                  {/* Sentiment badge if bot */}
                  {isBot && msg.sentiment && (
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-cardNavy border border-white/10 text-cyan-300">
                      VC Mood: {msg.sentiment}
                    </span>
                  )}

                  <div
                    className={`p-3.5 rounded-2xl text-xs leading-relaxed ${
                      isBot
                        ? "bg-cardNavy/90 text-platinum border border-white/10 rounded-tl-sm"
                        : "bg-gradient-to-r from-cyanAccent to-indigoAccent text-obsidian font-medium rounded-br-sm shadow-sm"
                    }`}
                  >
                    {msg.content}
                  </div>

                  <div className="text-[10px] text-slateMuted font-mono px-1">
                    {msg.timestamp}
                  </div>

                  {/* Suggested Follow-Ups Pills */}
                  {isBot && msg.suggestedFollowUps && msg.suggestedFollowUps.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1.5">
                      {msg.suggestedFollowUps.map((prompt, pIdx) => (
                        <button
                          key={pIdx}
                          type="button"
                          onClick={() => handleSend(prompt)}
                          className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-cyanAccent/20 hover:border-cyanAccent/40 border border-white/10 text-[11px] text-slate-300 hover:text-cyan-200 transition-all text-left"
                        >
                          💬 {prompt}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {!isBot && (
                  <div className="w-7 h-7 rounded-lg bg-indigoAccent/30 border border-indigoAccent/40 flex items-center justify-center text-indigo-200 flex-shrink-0 mb-0.5">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}

          {isLoading && (
            <div className="flex items-center gap-2 text-xs text-cyanAccent font-mono p-2 bg-cardNavy/50 rounded-xl w-fit">
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              Marcus is reviewing your response...
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-cardNavy/90 border-t border-white/10">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Defend your metrics, moat, or roadmap..."
              className="glass-input flex-1 px-4 py-2.5 rounded-xl text-xs font-medium"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={!inputMessage.trim() || isLoading}
              className="p-2.5 rounded-xl bg-gradient-to-r from-cyanAccent to-indigoAccent hover:opacity-90 disabled:opacity-30 text-obsidian font-bold shadow-glowCyan transition-all flex-shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
          <div className="text-[10px] text-slateMuted mt-1.5 text-center">
            Roleplay mode: Ask Marcus tough questions or defend your pitch deck slides.
          </div>
        </div>
      </motion.div>
    </div>
  );
};
