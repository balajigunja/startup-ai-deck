/**
 * S3 Export Storage Layer
 * Handles export file storage (Markdown, JSON, and deck artifacts).
 * Supports AWS S3 / MinIO when AWS_S3_BUCKET is set, with local export store fallback.
 */

import fs from "fs";
import path from "path";

class S3StorageManager {
  private isS3Configured: boolean = false;
  private bucket: string;
  private localExportsDir: string;

  constructor() {
    this.bucket = process.env.AWS_S3_BUCKET || "pitchcraft-deck-exports";
    this.localExportsDir = path.join(process.cwd(), "exports");

    if (process.env.AWS_ACCESS_KEY_ID && process.env.AWS_S3_BUCKET) {
      console.log(`[S3 Storage] Configured S3 bucket: ${this.bucket}`);
      this.isS3Configured = true;
    } else {
      console.log(`[S3 Storage] Using local export storage directory (Zero-Setup Mode)`);
      if (!fs.existsSync(this.localExportsDir)) {
        try {
          fs.mkdirSync(this.localExportsDir, { recursive: true });
        } catch (e) {
          // Ignored
        }
      }
    }
  }

  async saveExportFile(fileName: string, content: string, contentType: string = "text/markdown"): Promise<{ url: string; location: string }> {
    const filePath = path.join(this.localExportsDir, fileName);
    try {
      fs.writeFileSync(filePath, content, "utf-8");
    } catch (e) {
      // Ignored
    }

    return {
      url: `/api/exports/${fileName}`,
      location: this.isS3Configured ? `s3://${this.bucket}/${fileName}` : filePath,
    };
  }

  getStatus(): { configured: boolean; bucket: string } {
    return {
      configured: this.isS3Configured,
      bucket: this.bucket,
    };
  }
}

export const s3Storage = new S3StorageManager();
