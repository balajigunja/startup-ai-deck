import { Router, Request, Response } from "express";
import { pitchInputSchema, PitchInput } from "../types/schema.js";
import { validateBody } from "../middleware/validate.js";
import {
  generateFullDeck,
  generateReadinessScore,
  generateInvestorQA,
  generatePitchHealthCheck,
} from "../ai/router.js";
import { redisCache } from "../data/redis.js";
import { postgresDb } from "../data/postgres.js";

const router = Router();

router.post(
  "/",
  validateBody(pitchInputSchema),
  async (req: Request, res: Response): Promise<void> => {
    try {
      const input: PitchInput = req.body;
      const cacheKey = `deck:${input.startupName.toLowerCase().trim()}:${input.tone}:${input.length}`;

      // 1. Check Redis Cache
      const cached = await redisCache.get<any>(cacheKey);
      if (cached) {
        console.log(`[Cache Hit] Serving cached pitch deck for "${input.startupName}"`);
        res.status(200).json({ ...cached, fromCache: true });
        return;
      }

      console.log(`[POST /api/generate] Generating pitch deck for "${input.startupName}" via Gemini Pipeline...`);

      // 2. Generate Slides, Score, Investor Q&A, and Pitch Health Check concurrently
      const [deckResult, scoreResult, qaResult, healthResult] = await Promise.all([
        generateFullDeck(input),
        generateReadinessScore(input),
        generateInvestorQA(input),
        generatePitchHealthCheck(input),
      ]);

      const payload = {
        success: true,
        slides: deckResult.result,
        score: scoreResult.result,
        qa: qaResult.result,
        healthCheck: healthResult.result,
        meta: {
          primaryModel: deckResult.model,
          isMock: deckResult.isMock,
          generatedAt: new Date().toISOString(),
        },
      };

      // 3. Cache in Redis (1 hour TTL)
      await redisCache.set(cacheKey, payload, 3600);

      // 4. Persist in PostgreSQL persistent store
      const recordId = `deck_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
      await postgresDb.saveDeck({
        id: recordId,
        startupName: input.startupName,
        createdAt: new Date().toISOString(),
        input,
        deck: deckResult.result,
        score: scoreResult.result,
        qa: qaResult.result,
      });

      res.status(200).json(payload);
    } catch (error: any) {
      console.error("[POST /api/generate] Execution error:", error);
      res.status(500).json({
        success: false,
        error: "Failed to generate pitch deck",
        details: error.message || "Internal server error",
      });
    }
  }
);

export default router;
