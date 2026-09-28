import { v2 as cloudinary, type UploadApiResponse } from "cloudinary";
import { env } from "../config/env";

const FOLDER = "fitlives/articles";
const UPLOAD_TIMEOUT_MS = 60_000;

let configured = false;

export function isCloudinaryConfigured(): boolean {
  const { cloudName, apiKey, apiSecret } = env.cloudinary;
  if (!cloudName || !apiKey || !apiSecret) return false;
  if (!configured) {
    cloudinary.config({
      cloud_name: cloudName,
      api_key: apiKey,
      api_secret: apiSecret,
      secure: true,
    });
    configured = true;
  }
  return true;
}

/** Serve modern formats (WebP/AVIF) and auto quality from the stored original. */
function deliveryUrl(secureUrl: string): string {
  return secureUrl.replace("/image/upload/", "/image/upload/f_auto,q_auto/");
}

function publicIdFor(filename: string): string {
  return filename.replace(/\.[a-z0-9]+$/i, "");
}

/**
 * Upload an image buffer. Public IDs are deterministic and `overwrite: false`,
 * so retrying the same file returns the existing asset instead of duplicating it.
 */
export async function uploadImageBuffer(
  buffer: Buffer,
  filename: string,
): Promise<string> {
  if (!isCloudinaryConfigured()) throw new Error("Cloudinary is not configured");
  const result = await new Promise<UploadApiResponse>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: FOLDER,
        public_id: publicIdFor(filename),
        resource_type: "image",
        overwrite: false,
        timeout: UPLOAD_TIMEOUT_MS,
      },
      (err, res) => {
        if (err || !res) reject(err ?? new Error("Empty Cloudinary response"));
        else resolve(res);
      },
    );
    stream.end(buffer);
  });
  return deliveryUrl(result.secure_url);
}

/** Let Cloudinary fetch a publicly reachable image by URL. */
export async function uploadImageFromUrl(
  sourceUrl: string,
  filename: string,
): Promise<string> {
  if (!isCloudinaryConfigured()) throw new Error("Cloudinary is not configured");
  const result = await cloudinary.uploader.upload(sourceUrl, {
    folder: FOLDER,
    public_id: publicIdFor(filename),
    resource_type: "image",
    overwrite: false,
    timeout: UPLOAD_TIMEOUT_MS,
  });
  return deliveryUrl(result.secure_url);
}
