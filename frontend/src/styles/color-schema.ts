/**
 * Brand color schema — near-black primary on white; orange for warnings only.
 */
export const colorSchema = {
  background: "#FFFFFF",
  /** Neutral scale (maps to brand-* utilities) */
  brand: {
    50: "#F5F5F5",
    100: "#E5E5E5",
    200: "#D4D4D4",
    300: "#A3A3A3",
    400: "#0A0A0A",
  },
  /** Orange — disclaimer / EEAT warning surfaces only */
  orange: {
    50: "#FFE0B2",
    100: "#FFCC80",
    200: "#FFB74D",
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
    accentSoft: "#FFE0B2",
    accentHover: "#FFA726",
    foreground: "#0A0A0A",
    mutedForeground: "#525252",
  },
} as const;

export type ColorSchema = typeof colorSchema;
