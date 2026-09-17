/**
 * Brand type stack.
 * Primary: Roboto Slab (Google Fonts) for UI + headings.
 * Display utility: Diet. Mono: Oceanic Text Mono when licensed files exist.
 */
export const fontSchema = {
  primary: {
    family: "Roboto Slab",
    cssVariable: "--font-roboto-slab",
    source: "https://fonts.google.com/specimen/Roboto+Slab",
    weights: [300, 400, 500, 600, 700, 800, 900],
  },
  display: {
    family: "Diet",
    cssVariable: "--font-diet",
    files: {
      regular: "/fonts/Diet-Regular.otf",
      italic: "/fonts/Diet-Italic.otf",
    },
    source: "https://backpacker.gr/fonts/8",
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
