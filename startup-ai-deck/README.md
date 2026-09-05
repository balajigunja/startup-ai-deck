# PitchCraft AI - Startup Pitch Deck Generator & Investor Diligence Simulator

> **An interactive, production-ready full-stack AI application that transforms raw startup ideas into structured, investor-grade pitch decks with tailored SVG visual diagrams, pre-pitch readiness scoring, 10 tough investor Q&As, and an interactive skeptical VC chatbot.**

[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18-61dafb.svg)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8.svg)](https://tailwindcss.com/)
[![Express](https://img.shields.io/badge/Express-4.21-lightgrey.svg)](https://expressjs.com/)
[![Google Gemini](https://img.shields.io/badge/Google_Gemini-2.5_Flash-orange.svg)](https://aistudio.google.com/)
[![Zod](https://img.shields.io/badge/Zod-3.24-3068b7.svg)](https://zod.dev/)
[![Redis](https://img.shields.io/badge/Redis-Queue_%26_Cache-dc382d.svg)](https://redis.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Persistence-336791.svg)](https://www.postgresql.org/)

---

## 🌟 Overview & Problem Context

Student founders and first-time entrepreneurs often have visionary technical concepts but struggle to translate them into the polished, structured narrative that venture capitalists and accelerators demand. Writing compelling problem statements, defensible market sizing, and scalable unit economics requires specific storytelling skills that early technical founders haven't developed.

**PitchCraft AI** bridges this divide:
1. Takes a founder's raw pitch description and synthesizes **9 structured, investor-ready slides** in seconds with 100% narrative consistency.
2. Evaluates the startup's readiness via a **0-100 Investor Readiness Scorecard**.
3. Equips founders with a **10-question investor defense battlecard** with talking-point answers and fatal traps to avoid.
4. Provides an interactive **"Ask the VC" Diligence Chatbot** to roleplay partner meetings with a skeptical VC.

---

## 🏛️ System Architecture & Stack

```
                              ┌───────────────────────────────────┐
                              │     PitchCraft AI Frontend        │
                              │ React 18 + Vite + TS + Tailwind   │
                              │ Framer Motion + Lucide + RHF + Zod│
                              └─────────────────┬─────────────────┘
                                                │ REST API
                                                ▼
                              ┌───────────────────────────────────┐
                              │      Express.js API Gateway       │
                              │  Helmet + CORS + RateLimit + Zod  │
                              └────────┬──────────────┬───────────┘
                                       │              │
                       ┌───────────────┴────┐   ┌─────┴──────────────────┐
                       │ Caching & Data     │   │ AI Processing Engine   │
                       │ Layer              │   │ (Google Gemini AI)     │
                       ├────────────────────┤   ├────────────────────────┤
                       │ • Redis (Queue)    │   │ • Google Gemini 2.5    │
                       │ • Postgres (Store) │   │ • Anti-Hallucination   │
                       │ • S3 (Exports)     │   │   Zod Schema Gate      │
                       └────────────────────┘   └────────────────────────┘
```

- **Frontend**: React 18 (Vite) + TypeScript + Tailwind CSS (Pleasant Obsidian & Cyan theme) + Framer Motion + Lucide Icons + React Hook Form + Zod.
- **Backend**: Node.js + Express + TypeScript + Zod Validation + Helmet + Compression + Rate Limiting.
- **Caching & Data**:
  - **Redis**: Asynchronous task queue and 1-hour TTL pitch deck caching.
  - **PostgreSQL**: Persistent storage for generated decks, readiness scores, and audit history.
  - **S3**: Artifact storage for exported Markdown and JSON decks.
- **AI Pipeline**: **Google Gemini AI** (`gemini-2.5-flash` via `@google/genai`) with strict Zod anti-hallucination validation and built-in contextual reasoning engine fallback. *(Zero dependency on OpenAI or Anthropic).*

---

## 🎨 UI/UX Design System & Theme

- **Primary Background**: Deep Slate Blue / Obsidian Gray (`#0F172A`)
- **Secondary Surface**: Soft Card Navy (`#1E293B`)
- **Primary Accents**: Electric Cyan (`#06B6D4`) & Indigo (`#6366F1`)
- **Reasoning Highlight**: Muted Emerald/Teal (`#10B981`)
- **Text & Elements**: Crisp Platinum (`#F8FAFC`) & Slate Muted (`#94A3B8`)
- **Design Language**: Glassmorphism cards (`backdrop-blur-md`), micro-animations, real-time visual step-indicators, active thinking loaders with granular reasoning steps, and custom SVG visual suggestions for every pitch slide.

---

## 🎯 Implementation Checkpoints & Features

### Checkpoint 1: Structured Input & Input Validation
- Interactive multi-step form wizard supporting:
  - **Startup Profile**: Name, One-Liner, Industry, Free-Text Raw Description.
  - **Problem & Market**: Acute Problem Statement, Target Customer (ICP).
  - **Audience Persona**: `VC`, `Accelerator`, `Angel`.
  - **Narrative Tone**: `Professional`, `Enthusiastic`, `Formal`, `VC-Punchy`, `Story-Driven`, `Deep-Tech`.
  - **Slide Depth**: `Concise`, `Standard`, `Detailed`.
- **4 Instant 1-Click Demo Presets**: CampusBite (Robotics), PathoScan AI (HealthTech), EcoPack Materials (ClimateTech), MicroVest Africa (FinTech).
- Frontend & Backend dual Zod validation.

### Checkpoint 2: Robust AI Processing Engine & Structured Generation
- **API Gateway**:
  - `POST /api/generate`: Parallel generation of 9 slides, readiness score, and 10 investor Q&As.
  - `POST /api/regenerate/:slideType`: Single-slide regeneration injecting surrounding deck context.
  - `POST /api/score`: Pre-generation / post-generation readiness scoring.
  - `POST /api/qa`: 10 tough partner-meeting investor questions.
  - `POST /api/chat`: Interactive VC diligence chatbot session.
  - `POST /api/export`: S3 artifact export endpoint.
- **Anti-Hallucination Prompt Protocol**: Forces structured raw JSON strictly matching per-slide Zod schemas.

### Checkpoint 3: Market Validation & Deck Scoring
- **0-100 Investor Readiness Scorecard**: Overall score, letter grade (`A`, `B+`, etc.), category scores (Narrative, Market, Defensibility, Business Model).
- Granular breakdown of **Core Strengths**, **Vulnerabilities to Address**, and **Actionable Recommendations**.
- **Investor Q&A Prep Room**: 10 tough questions categorized by Defensibility, GTM, Unit Economics, Market Size, Execution, and Team Risk, with talking points and fatal traps to avoid.

### Checkpoint 4: Interactive Visual Deck & Single-Slide Refinement UI
- **Deck Viewer**: Presentation mode (flip-through with keyboard arrows) and 9-slide Grid Overview.
- **Rendered SVG Diagram Suggestions**:
  - Problem: Pain Severity vs Frequency 2x2 Matrix
  - Solution: 3-Stage Value Stream Pipeline Funnel
  - Market Size: Concentric TAM / SAM / SOM Target Circles
  - Product: 3-Tier System Architecture
  - Business Model: Revenue Acceleration & Unit Economics Dashboard
  - Competition: 2x2 Competitive Positioning Grid
  - Traction: MoM Adoption & Growth Hockey-Stick Curve
  - Team: Leadership & Domain Competency Node Hierarchy
  - Ask: Capital Use & Runway Donut Chart
- **Granular Actions**: Inline text editing with save, single-slide AI regeneration, copy slide markdown, speaker notes pitch script.
- **Multi-Format Export**: One-click Markdown file download, copy full deck, JSON backup.
- **🤖 "Ask the VC" Live Diligence Simulator Chatbot**: Multi-turn roleplay with Marcus Vance, Partner at Horizon Capital, with dynamic VC mood tags (`Skeptical`, `Probing`, `Intrigued`, `Impressed`).

---

## 🚀 Getting Started

### 1. Installation
Install all dependencies across root, backend, and frontend:
```bash
npm run install:all
```

### 2. Environment Configuration
Create your `.env` in the `backend/` directory:
```bash
cp backend/.env.example backend/.env
```
Configure your Google Gemini API Key:
```env
PORT=3001
NODE_ENV=development

# Google Gemini API Key (Exclusive AI Provider)
# Get a free key at https://aistudio.google.com/
GEMINI_API_KEY=your_gemini_api_key_here
```

> **Zero-Setup Demo Mode**: If no API key is provided, the built-in **Context-Aware Reasoning Engine** automatically activates. It produces rich, domain-specific, realistic pitch decks for any startup input, allowing immediate testing with zero setup.

### 3. Run the Application
Launch both backend and frontend concurrently with one command:
```bash
npm run dev
```

- **Frontend Application**: [http://localhost:5173](http://localhost:5173)
- **Backend API**: [http://localhost:3001](http://localhost:3001)

---

## 🧪 Verification & Build Commands

1. **Compile Backend TypeScript**:
   ```bash
   npm --prefix backend run build
   ```
2. **Compile Frontend & Build Production Bundle**:
   ```bash
   npm --prefix frontend run build
   ```
3. **Run Backend Integration Smoke Test**:
   ```bash
   node test-backend.js
   ```

---

## 📄 License
MIT License.
