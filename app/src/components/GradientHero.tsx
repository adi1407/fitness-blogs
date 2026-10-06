import { LinearGradient } from "expo-linear-gradient";
import type { ReactNode } from "react";
import { StyleSheet, View, type StyleProp, type ViewStyle } from "react-native";

import { colors, gradients, radius, shadow, space } from "@/theme";
import { Text } from "./Text";

type Props = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
};

/** Near-black gradient panel with an orange glow — the app's signature surface. */
export function GradientHero({ eyebrow, title, subtitle, children, style }: Props) {
  return (
    <View style={[styles.shadow, style]}>
      <LinearGradient colors={gradients.inkGlow} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.hero}>
        <View style={styles.glow} pointerEvents="none" />
        {eyebrow ? (
          <Text variant="label" style={styles.eyebrow}>
            {eyebrow}
          </Text>
        ) : null}
        <Text variant="display" style={styles.title}>
          {title}
        </Text>
        {subtitle ? (
          <Text variant="body" style={styles.subtitle}>
            {subtitle}
          </Text>
        ) : null}
        {children}
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  shadow: { borderRadius: radius.xl, ...shadow.lg },
  hero: { borderRadius: radius.xl, padding: space.xl, gap: space.sm, overflow: "hidden" },
  glow: {
    position: "absolute",
    right: -60,
    top: -60,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: colors.accent,
    opacity: 0.18,
  },
  eyebrow: { color: colors.accent },
  title: { color: colors.bg },
  subtitle: { color: colors.inkMuted },
});
