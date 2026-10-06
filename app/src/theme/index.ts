import { DefaultTheme, type Theme } from "expo-router";

export const colors = {
  bg: "#FFFFFF",
  ink: "#0A0A0A",
  accent: "#FF9800",
  accentSoft: "#FFF3E0",
  surface: "#F5F5F5",
  border: "#E5E5E5",
  muted: "#525252",
  subtle: "#8A8A8A",
  canvas: "#FAFAFA",
  accentBorder: "#FFE0B2",
  danger: "#B42318",
  protein: "#0A0A0A",
  carbs: "#FF9800",
  fat: "#BDBDBD",
  inkSoft: "#1A1A1A",
  inkMuted: "#A3A3A3",
  overlay: "rgba(10,10,10,0.55)",
  success: "#2E7D32",
} as const;

export const space = { xs: 4, sm: 8, md: 12, lg: 16, xl: 24, xxl: 32 } as const;

/** Mirrors the website scale (rounded-lg 10 · xl 14 · 2xl 18 · 3xl 22). */
export const radius = { sm: 8, md: 10, lg: 14, xl: 20, pill: 999 } as const;

export const gradients = {
  ink: ["#0A0A0A", "#1F1F1F"] as const,
  inkGlow: ["#0A0A0A", "#1A1A1A", "#3A2200"] as const,
  accent: ["#FFB547", "#FF9800"] as const,
  fadeBottom: ["rgba(10,10,10,0)", "rgba(10,10,10,0.85)"] as const,
  surface: ["#FFFFFF", "#F5F5F5"] as const,
};

export const shadow = {
  sm: {
    shadowColor: "#0A0A0A",
    shadowOpacity: 0.05,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },
  md: {
    shadowColor: "#0A0A0A",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  lg: {
    shadowColor: "#0A0A0A",
    shadowOpacity: 0.12,
    shadowRadius: 22,
    shadowOffset: { width: 0, height: 10 },
    elevation: 8,
  },
} as const;

/** bottomClearance: scroll padding so content clears the floating tab bar. */
export const layout = { bottomClearance: 128 } as const;

export const motion = { fast: 140, base: 240, slow: 420, countUp: 900 } as const;

export const fonts = {
  regular: "RobotoSlab_400Regular",
  medium: "RobotoSlab_500Medium",
  semibold: "RobotoSlab_600SemiBold",
  bold: "RobotoSlab_700Bold",
} as const;

export const navTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.ink,
    background: colors.bg,
    card: colors.bg,
    text: colors.ink,
    border: colors.border,
    notification: colors.accent,
  },
};
