import { Router, Request, Response } from "express";
import { pitchInputSchema, PitchInput } from "../types/schema.js";
import { validateBody } from "../middleware/validate.js";
import { generatePitchHealthCheck } from "../ai/router.js";

const router = Router();

router.post(
  "/",
  validateBody(pitchInputSchema),
  async (req: Request, res: Response): Promise<void> => {
    try {
      const input: PitchInput = req.body;
      const result = await generatePitchHealthCheck(input);

      res.status(200).json({
        success: true,
        healthCheck: result.result,
        meta: {
          model: result.model,
          isMock: result.isMock,
          timestamp: new Date().toISOString(),
        },
      });
    } catch (error: any) {
      console.error("[POST /api/pitch-health-check] Error:", error);
      res.status(500).json({
        success: false,
        error: "Failed to perform pitch health check",
        details: error.message || "Internal server error",
      });
    }
  }
);

export default router;
