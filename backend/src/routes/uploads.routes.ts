import fs from "node:fs";
import path from "node:path";
import { Router } from "express";
import multer from "multer";
import { authenticate, authorize } from "../middleware/auth";
import { env } from "../config/env";
import { STAFF_ROLES } from "../utils/roles";

export const uploadsRoot = path.resolve(process.cwd(), "uploads");
export const articleUploadsDir = path.join(uploadsRoot, "articles");

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

fs.mkdirSync(articleUploadsDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, articleUploadsDir);
  },
  filename: (_req, file, cb) => {
    const ext = extFromMime(file.mimetype) || path.extname(file.originalname).toLowerCase() || ".jpg";
    const safeExt = [".jpg", ".jpeg", ".png", ".webp", ".gif"].includes(ext)
      ? ext === ".jpeg"
        ? ".jpg"
        : ext
      : ".jpg";
    const stamp = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
    cb(null, `${stamp}${safeExt}`);
  },
});

const upload = multer({
  storage,
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

function extFromMime(mime: string): string | null {
  switch (mime) {
    case "image/jpeg":
      return ".jpg";
    case "image/png":
      return ".png";
    case "image/webp":
      return ".webp";
    case "image/gif":
      return ".gif";
    default:
      return null;
  }
}

function publicUrlFor(req: { protocol: string; get: (h: string) => string | undefined }, filename: string): string {
  const base =
    env.publicAssetBaseUrl.replace(/\/$/, "") ||
    `${req.protocol}://${req.get("host")}`;
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
  (req, res) => {
    if (!req.file) {
      res.status(400).json({ message: "No image file received" });
      return;
    }

    const url = publicUrlFor(req, req.file.filename);
    res.status(201).json({
      url,
      filename: req.file.filename,
      mime: req.file.mimetype,
      size: req.file.size,
      guidance: IMAGE_SIZE_GUIDANCE,
    });
  },
);
