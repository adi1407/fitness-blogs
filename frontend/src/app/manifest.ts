import type { MetadataRoute } from "next";
import { BRAND_LOGO_SRC, BRAND_NAME, BRAND_TAGLINE } from "@/lib/brand";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: BRAND_NAME,
    short_name: BRAND_NAME,
    description: BRAND_TAGLINE,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0a0a0a",
    icons: [
      {
        src: BRAND_LOGO_SRC,
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: BRAND_LOGO_SRC,
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
