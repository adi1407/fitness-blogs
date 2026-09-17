/**
 * Brand color schema — sky blue scale + white background.
 * Source palette: #E1F5FE → #29B6F6
 */
export const colorSchema = {
  background: "#FFFFFF",
  brand: {
    50: "#E1F5FE",
    100: "#B3E5FC",
    200: "#81D4FA",
    300: "#4FC3F7",
    400: "#29B6F6",
  },
  /** Semantic aliases for product UI */
  semantic: {
    background: "#FFFFFF",
    surface: "#FFFFFF",
    surfaceMuted: "#E1F5FE",
    border: "#B3E5FC",
    accent: "#81D4FA",
    primary: "#29B6F6",
    primaryHover: "#4FC3F7",
    foreground: "#0B2533",
    mutedForeground: "#3A6070",
  },
} as const;

export type ColorSchema = typeof colorSchema;
