import { Router, Request, Response } from "express";
import { chatRequestSchema, ChatRequest } from "../types/schema.js";
import { validateBody } from "../middleware/validate.js";
import { generateVCChatResponse } from "../ai/router.js";

const router = Router();

router.post(
  "/",
  validateBody(chatRequestSchema),
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { messages, pitchInput, deckSummary }: ChatRequest = req.body;
      const result = await generateVCChatResponse(messages, pitchInput, deckSummary);

      res.status(200).json({
        success: true,
        ...result.result,
        meta: {
          model: result.model,
          isMock: result.isMock,
        },
      });
    } catch (error: any) {
      console.error("[POST /api/chat] Error:", error);
      res.status(500).json({
        success: false,
        error: "Failed to generate VC response",
        details: error.message || "Internal server error",
      });
    }
  }
);

export default router;
