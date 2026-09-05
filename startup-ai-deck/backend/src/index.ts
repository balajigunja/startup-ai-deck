import express, { Request, Response, NextFunction } from "express";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";
import path from "path";

import generateRouter from "./routes/generate.js";
import regenerateRouter from "./routes/regenerate.js";
import scoreRouter from "./routes/score.js";
import qaRouter from "./routes/qa.js";
import chatRouter from "./routes/chat.js";
import exportRouter from "./routes/export.js";
import pitchHealthCheckRouter from "./routes/pitchHealthCheck.js";

import { redisCache } from "./data/redis.js";
import { postgresDb } from "./data/postgres.js";
import { s3Storage } from "./data/s3.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Security & Optimization Middleware
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(compression());
app.use(express.json({ limit: "2mb" }));

// Rate Limiting: 120 requests per 10 minutes per IP
const apiLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 120,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: "Too many requests from this IP. Please try again later.",
  },
});

app.use("/api/", apiLimiter);

// Serve local export files if any
app.use("/api/exports", express.static(path.join(process.cwd(), "exports")));

// System & Infrastructure Status Endpoint
app.get("/api/health", (_req: Request, res: Response) => {
  const hasGemini = Boolean(process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY);

  res.status(200).json({
    status: "ok",
    timestamp: new Date().toISOString(),
    aiEngine: {
      primary: "Google Gemini AI (gemini-2.5-flash)",
      geminiConfigured: hasGemini,
      fallbackEngine: "Context-Aware Reasoning Engine",
    },
    infrastructure: {
      cachingAndQueue: {
        engine: "Redis (Task Queue & Cache)",
        ...redisCache.getStatus(),
      },
      database: {
        engine: "PostgreSQL (Persistent Data)",
        ...postgresDb.getStatus(),
      },
      storage: {
        engine: "S3 (Export Storage)",
        ...s3Storage.getStatus(),
      },
    },
  });
});

// Mount Routes
app.use("/api/generate", generateRouter);
app.use("/api/regenerate", regenerateRouter);
app.use("/api/score", scoreRouter);
app.use("/api/qa", qaRouter);
app.use("/api/chat", chatRouter);
app.use("/api/export", exportRouter);
app.use("/api/pitch-health-check", pitchHealthCheckRouter);

// 404 Route
app.use((_req: Request, res: Response) => {
  res.status(404).json({ error: "Endpoint not found" });
});

// Central Error Handler
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error("[Server Error]", err);
  res.status(500).json({
    error: "Internal server error",
    details: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

app.listen(PORT, () => {
  console.log(`===================================================`);
  console.log(`🚀 PitchCraft AI Backend running on port ${PORT}`);
  console.log(`⚡ AI Engine: Google Gemini 2.5 Flash exclusively`);
  console.log(`🗄️ Infrastructure: Redis + PostgreSQL + S3`);
  console.log(`===================================================`);
});

export default app;
