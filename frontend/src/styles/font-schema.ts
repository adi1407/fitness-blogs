/**
 * Brand type stack — Oceanic Text Mono (Interval Type).
 * Drop licensed .woff2 files into /public/fonts (see README there).
 */
export const fontSchema = {
  family: "Oceanic Text Mono",
  cssVariable: "--font-oceanic-text-mono",
  fallback: [
    "ui-monospace",
    "SFMono-Regular",
    "Menlo",
    "Monaco",
    "Consolas",
    "Liberation Mono",
    "Courier New",
    "monospace",
  ],
  weights: {
    regular: 400,
    book: 450,
    medium: 500,
    bold: 700,
  },
  files: {
    regular: "/fonts/OceanicTextMono-Regular.woff2",
    book: "/fonts/OceanicTextMono-Book.woff2",
    medium: "/fonts/OceanicTextMono-Medium.woff2",
    bold: "/fonts/OceanicTextMono-Bold.woff2",
  },
} as const;

export type FontSchema = typeof fontSchema;

export const fontFamilyCss = `"${fontSchema.family}", ${fontSchema.fallback.join(", ")}`;
