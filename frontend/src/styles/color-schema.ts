/**
 * Brand color schema — sky blue + orange accents, white background.
 */
export const colorSchema = {
  background: "#FFFFFF",
  /** Sky blue scale */
  brand: {
    50: "#E1F5FE",
    100: "#B3E5FC",
    200: "#81D4FA",
    300: "#4FC3F7",
    400: "#29B6F6",
  },
  /** Orange scale */
  orange: {
    50: "#FFE0B2",
    100: "#FFCC80",
    200: "#FFB74D",
    300: "#FFA726",
    400: "#FF9800",
  },
  /** Semantic aliases for product UI */
  semantic: {
    background: "#FFFFFF",
    surface: "#FFFFFF",
    surfaceMuted: "#E1F5FE",
    border: "#B3E5FC",
    primary: "#29B6F6",
    primaryHover: "#4FC3F7",
    accent: "#FF9800",
    accentSoft: "#FFE0B2",
    accentHover: "#FFA726",
    foreground: "#0B2533",
    mutedForeground: "#3A6070",
  },
} as const;

export type ColorSchema = typeof colorSchema;
