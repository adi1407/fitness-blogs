import { LinearGradient } from "expo-linear-gradient";
import { router, type Href } from "expo-router";
import { StyleSheet, View } from "react-native";

import { colors, fonts, space } from "@/theme";
import { PillButton } from "./PillButton";
import { Text } from "./Text";

const LINKS: { label: string; href: Href; primary?: boolean }[] = [
  { label: "Muscle building guides", href: "/hub/muscle-building", primary: true },
  { label: "Indian high-protein foods", href: "/foods" },
  { label: "Exercise library", href: "/exercises" },
];

/** Website closing band: dark canvas, big statement, next-step pills. */
export function ClarityBand() {
  return (
    <View style={styles.root}>
      <LinearGradient
        colors={["#0A0A0A", "#171717", "#0A0A0A"]}
        style={StyleSheet.absoluteFill}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      />
      <LinearGradient
        colors={["rgba(255,152,0,0)", "rgba(255,152,0,0.14)"]}
        style={styles.glow}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        pointerEvents="none"
      />
      <Text style={styles.title} accessibilityRole="header" maxFontSizeMultiplier={1.25}>
        Train with clarity
      </Text>
      <Text variant="small" style={styles.body}>
        From protein questions to exercise technique — every page pushes you toward the next useful action.
      </Text>
      <View style={styles.actions}>
        {LINKS.map((l) => (
          <PillButton
            key={l.label}
            label={l.label}
            variant={l.primary ? "accent" : "ghostDark"}
            onPress={() => router.push(l.href)}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    marginHorizontal: -space.lg,
    paddingHorizontal: space.xl,
    paddingVertical: 56,
    alignItems: "center",
    overflow: "hidden",
    backgroundColor: colors.ink,
  },
  glow: { position: "absolute", left: 0, right: 0, bottom: 0, height: "55%" },
  title: {
    fontFamily: fonts.bold,
    fontSize: 38,
    lineHeight: 42,
    letterSpacing: -1.4,
    color: colors.bg,
    textAlign: "center",
  },
  body: { marginTop: space.lg, color: "rgba(255,255,255,0.7)", textAlign: "center", maxWidth: 340 },
  actions: { marginTop: space.xl, alignSelf: "stretch", gap: space.md },
});
