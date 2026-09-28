import path from "node:path";
import { Router } from "express";
import multer from "multer";
import { authenticate, authorize } from "../middleware/auth";
import { env } from "../config/env";
import { pool } from "../db/pool";
import { STAFF_ROLES } from "../utils/roles";
import { isCloudinaryConfigured, uploadImageBuffer } from "../services/cloudinary";

const ALLOWED_MIME = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);

/** Max upload size: 5 MB — enough for 1920px JPEG/WebP at high quality. */
export const MAX_IMAGE_BYTES = 5 * 1024 * 1024;

/** Editorial guidance returned to CMS (not enforced as pixel dims). */
export const IMAGE_SIZE_GUIDANCE = {
  inArticle: {
    recommendedWidthPx: "1600–1920",
    recommendedAspect: "16:9 or 3:2",
    maxFileMb: 5,
    formats: ["JPEG", "PNG", "WebP", "GIF"],
    note: "Use landscape photos ~1600–1920px wide so they stay sharp on desktop monitors. Height auto-scales on the site.",
  },
  featured: {
    recommendedWidthPx: "1920",
    recommendedHeightPx: "1080",
    recommendedAspect: "16:9",
    maxFileMb: 5,
    formats: ["JPEG", "PNG", "WebP"],
    note: "Cover/OG: 1920×1080 (16:9) looks best as the article hero and social share image.",
  },
};

const FILENAME_PATTERN = /^[a-z0-9-]+\.(jpg|png|webp|gif)$/;

/**
 * Buffered in memory, then stored in Cloudinary (or Postgres when Cloudinary
 * is not configured). Never local disk: the host filesystem is wiped on deploy.
 */
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MAX_IMAGE_BYTES, files: 1 },
  fileFilter: (_req, file, cb) => {
    if (!ALLOWED_MIME.has(file.mimetype)) {
      cb(
        Object.assign(
          new Error("Only JPEG, PNG, WebP, or GIF images are allowed"),
          { status: 400 },
        ),
      );
      return;
    }
    cb(null, true);
  },
});

function extFromMime(mime: string): string {
  switch (mime) {
    case "image/png":
      return ".png";
    case "image/webp":
      return ".webp";
    case "image/gif":
      return ".gif";
    default:
      return ".jpg";
  }
}

/** Detect the real image type from magic bytes; the client-sent MIME is untrusted. */
function sniffImageMime(buf: Buffer): string | null {
  if (buf.length < 12) return null;
  if (buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) return "image/jpeg";
  if (buf.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))) {
    return "image/png";
  }
  if (buf.subarray(0, 4).toString("ascii") === "GIF8") return "image/gif";
  if (
    buf.subarray(0, 4).toString("ascii") === "RIFF" &&
    buf.subarray(8, 12).toString("ascii") === "WEBP"
  ) {
    return "image/webp";
  }
  return null;
}

function publicUrlFor(
  req: { protocol: string; get: (h: string) => string | undefined },
  filename: string,
): string {
  const configured = env.publicAssetBaseUrl.replace(/\/$/, "");
  const protocol = env.nodeEnv === "production" ? "https" : req.protocol;
  const base = configured || `${protocol}://${req.get("host")}`;
  return `${base}/uploads/articles/${filename}`;
}

export const uploadsRouter = Router();

uploadsRouter.get("/guidance", authenticate, authorize(...STAFF_ROLES), (_req, res) => {
  res.json({
    maxBytes: MAX_IMAGE_BYTES,
    maxMb: MAX_IMAGE_BYTES / (1024 * 1024),
    allowedMime: [...ALLOWED_MIME],
    guidance: IMAGE_SIZE_GUIDANCE,
  });
});

uploadsRouter.post(
  "/image",
  authenticate,
  authorize(...STAFF_ROLES),
  (req, res, next) => {
    upload.single("file")(req, res, (err) => {
      if (err) {
        if (err instanceof multer.MulterError) {
          if (err.code === "LIMIT_FILE_SIZE") {
            res.status(400).json({
              message: `Image too large. Max ${MAX_IMAGE_BYTES / (1024 * 1024)} MB.`,
            });
            return;
          }
          res.status(400).json({ message: err.message });
          return;
        }
        const status = typeof (err as { status?: number }).status === "number"
          ? (err as { status: number }).status
          : 400;
        res.status(status).json({
          message: err instanceof Error ? err.message : "Upload failed",
        });
        return;
      }
      next();
    });
  },
  async (req, res, next) => {
    try {
      if (!req.file) {
        res.status(400).json({ message: "No image file received" });
        return;
      }

      const mime = sniffImageMime(req.file.buffer);
      if (!mime) {
        res.status(400).json({
          message: "File is not a valid JPEG, PNG, WebP, or GIF image",
        });
        return;
      }

      const stamp = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
      const filename = `${stamp}${extFromMime(mime)}`;

      let url: string;
      if (isCloudinaryConfigured()) {
        try {
          url = await uploadImageBuffer(req.file.buffer, filename);
        } catch (err) {
          console.error("[uploads] Cloudinary upload failed", err);
          res.status(502).json({
            message: "Image storage is unavailable right now. Please try again.",
          });
          return;
        }
      } else {
        await pool.query(
          `INSERT INTO uploaded_images (filename, mime, size_bytes, data, uploaded_by)
           VALUES ($1, $2, $3, $4, $5)`,
          [filename, mime, req.file.size, req.file.buffer, req.user?.id ?? null],
        );
        url = publicUrlFor(req, filename);
      }

      res.status(201).json({
        url,
        filename,
        mime,
        size: req.file.size,
        guidance: IMAGE_SIZE_GUIDANCE,
      });
    } catch (err) {
      next(err);
    }
  },
);

/** Public image delivery, mounted at `/uploads/articles`. Filenames are unique, so cache forever. */
export const uploadedImagesRouter = Router();

uploadedImagesRouter.get("/:filename", async (req, res, next) => {
  try {
    const filename = path.basename(req.params.filename).toLowerCase();
    if (!FILENAME_PATTERN.test(filename)) {
      res.status(404).end();
      return;
    }

    const result = await pool.query<{ mime: string; data: Buffer }>(
      `SELECT mime, data FROM uploaded_images WHERE filename = $1 LIMIT 1`,
      [filename],
    );
    const row = result.rows[0];
    if (!row) {
      res.status(404).end();
      return;
    }

    res.setHeader("Content-Type", row.mime);
    res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
    res.setHeader("Content-Length", String(row.data.length));
    res.end(row.data);
  } catch (err) {
    next(err);
  }
});
