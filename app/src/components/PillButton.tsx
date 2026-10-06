import Ionicons from "@expo/vector-icons/Ionicons";
import type { ComponentProps } from "react";
import { StyleSheet, type StyleProp, type ViewStyle } from "react-native";

import { colors, fonts, radius, shadow, space } from "@/theme";
import { PressableScale } from "./PressableScale";
import { Text } from "./Text";

type Variant = "primary" | "ghost" | "accent" | "ghostDark";

type Props = {
  label: string;
  onPress: () => void;
  variant?: Variant;
  icon?: ComponentProps<typeof Ionicons>["name"];
  style?: StyleProp<ViewStyle>;
};

const TEXT: Record<Variant, string> = {
  primary: colors.bg,
  ghost: colors.ink,
  accent: colors.ink,
  ghostDark: colors.bg,
};

/** Website pill CTA: black primary, outlined ghost, orange accent, ghost-on-dark. */
export function PillButton({ label, onPress, variant = "primary", icon, style }: Props) {
  return (
    <PressableScale
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={label}
      scaleTo={0.96}
      style={[styles.base, styles[variant], style]}
    >
      <Text style={[styles.text, { color: TEXT[variant] }]} numberOfLines={1}>
        {label}
      </Text>
      {icon ? <Ionicons name={icon} size={15} color={TEXT[variant]} /> : null}
    </PressableScale>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: 46,
    paddingHorizontal: space.xl,
    borderRadius: radius.pill,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  primary: { backgroundColor: colors.ink, ...shadow.md },
  ghost: { backgroundColor: colors.bg, borderWidth: 1, borderColor: colors.border },
  accent: { backgroundColor: colors.accent },
  ghostDark: { borderWidth: 1, borderColor: "rgba(255,255,255,0.3)" },
  text: { fontFamily: fonts.semibold, fontSize: 14 },
});
