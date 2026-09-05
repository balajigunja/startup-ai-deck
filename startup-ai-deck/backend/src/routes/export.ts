import { Router, Request, Response } from "express";
import { z } from "zod";
import { s3Storage } from "../data/s3.js";

const router = Router();

const exportRequestSchema = z.object({
  startupName: z.string(),
  markdownContent: z.string(),
  format: z.enum(["markdown", "json"]).default("markdown"),
});

router.post("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const validation = exportRequestSchema.safeParse(req.body);
    if (!validation.success) {
      res.status(400).json({ error: "Invalid export payload", details: validation.error.errors });
      return;
    }

    const { startupName, markdownContent, format } = validation.data;
    const sanitizedName = startupName.toLowerCase().replace(/[^a-z0-9]/g, "-");
    const extension = format === "json" ? "json" : "md";
    const fileName = `${sanitizedName}-pitch-deck-${Date.now()}.${extension}`;

    const saved = await s3Storage.saveExportFile(
      fileName,
      markdownContent,
      format === "json" ? "application/json" : "text/markdown"
    );

    res.status(200).json({
      success: true,
      fileName,
      url: saved.url,
      storageLocation: saved.location,
    });
  } catch (err: any) {
    res.status(500).json({ error: "Failed to store export", details: err.message });
  }
});

export default router;
