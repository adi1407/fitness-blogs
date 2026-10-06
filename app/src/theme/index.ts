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
} as const;

export const space = { xs: 4, sm: 8, md: 12, lg: 16, xl: 24, xxl: 32 } as const;

export const radius = { sm: 8, md: 12, lg: 16, pill: 999 } as const;

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
