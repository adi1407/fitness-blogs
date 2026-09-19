/**
 * Brand: near-black primary on white; warm orange for contrast accents
 * (links hover, focus, secondary emphasis, disclaimer). No blue.
 */
export const colorSchema = {
  background: "#FFFFFF",
  brand: {
    50: "#F5F5F5",
    100: "#E5E5E5",
    200: "#D4D4D4",
    300: "#A3A3A3",
    400: "#0A0A0A",
  },
  orange: {
    50: "#FFF3E0",
    100: "#FFE0B2",
    200: "#FFCC80",
    300: "#FFA726",
    400: "#FF9800",
  },
  semantic: {
    background: "#FFFFFF",
    surface: "#FFFFFF",
    surfaceMuted: "#F5F5F5",
    border: "#E5E5E5",
    primary: "#0A0A0A",
    primaryHover: "#262626",
    accent: "#FF9800",
    accentSoft: "#FFF3E0",
    accentHover: "#F57C00",
    foreground: "#0A0A0A",
    mutedForeground: "#525252",
  },
} as const;

export type ColorSchema = typeof colorSchema;
