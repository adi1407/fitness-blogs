import { DefaultTheme, type Theme } from "expo-router";

export const colors = {
  bg: "#FFFFFF",
  ink: "#0A0A0A",
  accent: "#FF9800",
  accentSoft: "#FFF3E0",
  surface: "#F5F5F5",
  border: "#E5E5E5",
  muted: "#5C5C5C",
  subtle: "#8A8A8A",
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

export const radius = { sm: 8, md: 12, lg: 16, xl: 24, pill: 999 } as const;

export const gradients = {
  ink: ["#0A0A0A", "#1F1F1F"] as const,
  inkGlow: ["#0A0A0A", "#1A1A1A", "#3A2200"] as const,
  accent: ["#FFB547", "#FF9800"] as const,
  fadeBottom: ["rgba(10,10,10,0)", "rgba(10,10,10,0.85)"] as const,
  surface: ["#FFFFFF", "#F5F5F5"] as const,
};

export const shadow = {
  sm: {
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  md: {
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },
    elevation: 5,
  },
  lg: {
    shadowColor: "#000",
    shadowOpacity: 0.16,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 12 },
    elevation: 10,
  },
} as const;

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
