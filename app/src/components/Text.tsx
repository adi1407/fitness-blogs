import { Text as RNText, type TextProps, StyleSheet } from "react-native";

import { colors, fonts } from "@/theme";

type Variant = "display" | "title" | "heading" | "body" | "small" | "label";

const variants = StyleSheet.create({
  display: { fontFamily: fonts.bold, fontSize: 28, lineHeight: 34, letterSpacing: -0.6, color: colors.ink },
  title: { fontFamily: fonts.semibold, fontSize: 22, lineHeight: 28, letterSpacing: -0.4, color: colors.ink },
  heading: { fontFamily: fonts.semibold, fontSize: 16, lineHeight: 22, letterSpacing: -0.2, color: colors.ink },
  body: { fontFamily: fonts.regular, fontSize: 15, lineHeight: 23, color: colors.ink },
  small: { fontFamily: fonts.regular, fontSize: 13, lineHeight: 18, color: colors.muted },
  label: {
    fontFamily: fonts.semibold,
    fontSize: 11,
    lineHeight: 14,
    letterSpacing: 0.8,
    textTransform: "uppercase",
    color: colors.muted,
  },
});

/** Honour Dynamic Type, but cap large display text so headings don't break layouts. */
const MAX_SCALE: Record<Variant, number> = { display: 1.3, title: 1.4, heading: 1.6, body: 1.8, small: 1.8, label: 1.5 };

export function Text({ variant = "body", style, ...rest }: TextProps & { variant?: Variant }) {
  return <RNText maxFontSizeMultiplier={MAX_SCALE[variant]} {...rest} style={[variants[variant], style]} />;
}
