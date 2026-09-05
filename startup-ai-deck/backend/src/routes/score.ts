import { Router, Request, Response } from "express";
import { pitchInputSchema, PitchInput } from "../types/schema.js";
import { validateBody } from "../middleware/validate.js";
import { generateReadinessScore } from "../ai/router.js";

const router = Router();

router.post(
  "/",
  validateBody(pitchInputSchema),
  async (req: Request, res: Response): Promise<void> => {
    try {
      const input: PitchInput = req.body;
      const scoreResult = await generateReadinessScore(input);

      res.status(200).json({
        success: true,
        score: scoreResult.result,
        meta: {
          model: scoreResult.model,
          isMock: scoreResult.isMock,
        },
      });
    } catch (error: any) {
      console.error("[POST /api/score] Error:", error);
      res.status(500).json({
        success: false,
        error: "Failed to score pitch",
        details: error.message || "Internal server error",
      });
    }
  }
);

export default router;
