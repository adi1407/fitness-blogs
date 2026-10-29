const CLOUDINARY_UPLOAD =
  /^(https:\/\/res\.cloudinary\.com\/[^/]+\/image\/upload\/)(?:[a-z]{1,3}_[^,/]+(?:,[a-z]{1,3}_[^,/]+)*\/)?(.+)$/;

/**
 * Google recommends 16:9, 4:3 and 1:1 versions of a rich-result image. Cloudinary
 * crops them on the fly; any other host gets the single original URL.
 */
export function structuredDataImages(url: string): string[] {
  const m = url.match(CLOUDINARY_UPLOAD);
  if (!m) return [url];
  const [, base, rest] = m;
  return ["16:9", "4:3", "1:1"].map(
    (ar) => `${base}c_fill,g_auto,ar_${ar},w_1200,f_jpg,q_auto/${rest}`,
  );
}
