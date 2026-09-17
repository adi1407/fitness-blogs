/**
 * Brand type stack.
 * Primary: Diet (BP Diet) — display/fat face for UI + headings.
 * Mono: Oceanic Text Mono when licensed files are present.
 */
export const fontSchema = {
  primary: {
    family: "Diet",
    cssVariable: "--font-diet",
    files: {
      regular: "/fonts/Diet-Regular.otf",
      italic: "/fonts/Diet-Italic.otf",
    },
    source: "https://backpacker.gr/fonts/8",
    license: "Creative Commons Attribution-No Derivative Works",
  },
  mono: {
    family: "Oceanic Text Mono",
    cssVariable: "--font-oceanic-text-mono",
    files: {
      regular: "/fonts/OceanicTextMono-Regular.woff2",
      book: "/fonts/OceanicTextMono-Book.woff2",
      medium: "/fonts/OceanicTextMono-Medium.woff2",
      bold: "/fonts/OceanicTextMono-Bold.woff2",
    },
  },
} as const;

export type FontSchema = typeof fontSchema;
