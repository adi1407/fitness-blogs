"use client";

import Image, { type ImageLoader } from "next/image";

const CLOUDINARY_UPLOAD =
  /^(https:\/\/res\.cloudinary\.com\/[^/]+\/image\/upload\/)(?:([a-z]{1,3}_[^,/]+(?:,[a-z]{1,3}_[^,/]+)*)\/)?(.+)$/;

/**
 * Resize on Cloudinary's CDN instead of re-processing through the Next image
 * optimizer. Keeps any existing transformation (e.g. `f_auto,q_auto`).
 */
const cloudinaryLoader: ImageLoader = ({ src, width }) => {
  const m = src.match(CLOUDINARY_UPLOAD);
  if (!m) return src;
  const [, base, existing, rest] = m;
  const parts = (existing ?? "f_auto,q_auto")
    .split(",")
    .filter((p) => !/^(w|c)_/.test(p));
  if (!parts.some((p) => p.startsWith("f_"))) parts.push("f_auto");
  if (!parts.some((p) => p.startsWith("q_"))) parts.push("q_auto");
  parts.push(`w_${width}`, "c_limit");
  return `${base}${parts.join(",")}/${rest}`;
};

type Props = {
  src: string;
  alt: string;
  className?: string;
  /** Responsive `sizes` hint — the main lever for downloading the right width. */
  sizes: string;
  priority?: boolean;
  width?: number;
  height?: number;
};

/** Article/cover image: Cloudinary-resized, local images via the Next optimizer, others passed through. */
export function CoverImage({
  src,
  alt,
  className,
  sizes,
  priority = false,
  width = 1600,
  height = 900,
}: Props) {
  const isCloudinary = CLOUDINARY_UPLOAD.test(src);
  const isLocal = src.startsWith("/");
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      sizes={sizes}
      priority={priority}
      className={className}
      loader={isCloudinary ? cloudinaryLoader : undefined}
      unoptimized={!isCloudinary && !isLocal}
    />
  );
}
