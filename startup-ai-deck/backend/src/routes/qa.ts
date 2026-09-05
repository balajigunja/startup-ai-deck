import { Router, Request, Response } from "express";
import { pitchInputSchema, PitchInput } from "../types/schema.js";
import { validateBody } from "../middleware/validate.js";
import { generateInvestorQA } from "../ai/router.js";

const router = Router();

router.post(
  "/",
  validateBody(pitchInputSchema),
  async (req: Request, res: Response): Promise<void> => {
    try {
      const input: PitchInput = req.body;
      const qaResult = await generateInvestorQA(input);

      res.status(200).json({
        success: true,
        qa: qaResult.result,
        meta: {
          model: qaResult.model,
          isMock: qaResult.isMock,
        },
      });
    } catch (error: any) {
      console.error("[POST /api/qa] Error:", error);
      res.status(500).json({
        success: false,
        error: "Failed to generate investor Q&A",
        details: error.message || "Internal server error",
      });
    }
  }
);

export default router;
