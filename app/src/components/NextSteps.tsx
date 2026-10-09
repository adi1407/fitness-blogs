import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import type { ComponentProps } from "react";
import { StyleSheet, View } from "react-native";

import { openLink } from "@/lib/links";
import type { NextStep } from "@/lib/journeys";
import { colors, fonts, radius, space } from "@/theme";
import { PressableScale } from "./PressableScale";
import { Text } from "./Text";

const ICONS: Record<NextStep["kind"], ComponentProps<typeof Ionicons>["name"]> = {
  calculator: "calculator-outline",
  article: "book-outline",
  food: "restaurant-outline",
};

function go(step: NextStep) {
  if (step.href) router.push(step.href);
  else if (step.url) openLink(step.url);
}

/** Website "Your next step" list under a calculator result; the first step is the highlighted one. */
export function NextSteps({ steps }: { steps: NextStep[] }) {
  if (!steps.length) return null;
  return (
    <View style={styles.wrap} accessibilityLabel="Next steps">
      <Text variant="label" style={styles.label}>
        Your next step
      </Text>
      {steps.map((step, i) => {
        const primary = i === 0;
        return (
          <PressableScale
            key={step.title}
            onPress={() => go(step)}
            accessibilityRole="link"
            accessibilityLabel={`${step.title}. ${step.why}`}
            scaleTo={0.985}
            style={[styles.step, primary && styles.primary]}
          >
            <Ionicons name={ICONS[step.kind]} size={17} color={primary ? colors.accent : colors.muted} style={styles.icon} />
            <View style={styles.text}>
              <Text style={[styles.title, primary && styles.onDark]}>{step.title}</Text>
              <Text variant="small" style={[styles.why, primary && styles.whyDark]}>
                {step.why}
              </Text>
            </View>
            <Ionicons name="arrow-forward" size={16} color={primary ? colors.bg : colors.muted} style={styles.icon} />
          </PressableScale>
        );
      })}
      {steps[0]?.kind === "calculator" ? (
        <Text variant="small" style={styles.note}>
          Your details carry over, so the next calculator opens ready to use.
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { gap: space.sm },
  label: { color: colors.muted },
  step: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: space.md,
    padding: space.md,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.bg,
  },
  primary: { backgroundColor: colors.ink, borderColor: colors.ink },
  icon: { marginTop: 2 },
  text: { flex: 1, gap: 2 },
  title: { fontFamily: fonts.semibold, fontSize: 14.5, lineHeight: 20, color: colors.ink },
  onDark: { color: colors.bg },
  why: { fontSize: 12.5, lineHeight: 17 },
  whyDark: { color: "rgba(255,255,255,0.75)" },
  note: { fontSize: 12, color: colors.muted },
});
