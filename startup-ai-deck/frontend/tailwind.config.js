/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        obsidian: "#0F172A", // Primary Background
        cardNavy: "#1E293B", // Secondary Surface
        cyanAccent: "#06B6D4", // Primary Accent 1 (Electric Cyan)
        indigoAccent: "#6366F1", // Primary Accent 2 (Indigo)
        emeraldHighlight: "#10B981", // Reasoning / Confidence Metric
        platinum: "#F8FAFC", // Crisp Text
        slateMuted: "#94A3B8", // Cool Slate Muted
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
        glowCyan: "0 0 25px -5px rgba(6, 182, 212, 0.4)",
        glowIndigo: "0 0 25px -5px rgba(99, 102, 241, 0.4)",
        glowEmerald: "0 0 25px -5px rgba(16, 185, 129, 0.4)",
      },
    },
  },
  plugins: [],
};
