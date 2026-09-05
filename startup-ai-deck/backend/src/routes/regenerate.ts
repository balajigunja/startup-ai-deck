import { Router, Request, Response } from "express";
import { z } from "zod";
import { pitchInputSchema, slideTypeEnum, SlideType } from "../types/schema.js";
import { regenerateSlide } from "../ai/router.js";

const router = Router();

const regenerateBodySchema = z.object({
  pitchInput: pitchInputSchema,
  currentContext: z.string().optional(),
});

router.post("/:slideType", async (req: Request, res: Response): Promise<void> => {
  try {
    const slideTypeParam = req.params.slideType;
    const typeValidation = slideTypeEnum.safeParse(slideTypeParam);

    if (!typeValidation.success) {
      res.status(400).json({
        error: "Invalid slideType parameter",
        allowed: slideTypeEnum.options,
      });
      return;
    }

    const slideType: SlideType = typeValidation.data;
    const bodyValidation = regenerateBodySchema.safeParse(req.body);

    if (!bodyValidation.success) {
      res.status(400).json({
        error: "Invalid body for regenerate",
        details: bodyValidation.error.errors,
      });
      return;
    }

    const { pitchInput, currentContext } = bodyValidation.data;
    console.log(`[POST /api/regenerate/${slideType}] Regenerating slide for "${pitchInput.startupName}"...`);

    const result = await regenerateSlide(slideType, pitchInput, currentContext);

    res.status(200).json({
      success: true,
      slideType,
      slide: result.result,
      meta: {
        model: result.model,
        isMock: result.isMock,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error: any) {
    console.error("[POST /api/regenerate] Error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to regenerate slide",
      details: error.message || "Internal server error",
    });
  }
});

export default router;
