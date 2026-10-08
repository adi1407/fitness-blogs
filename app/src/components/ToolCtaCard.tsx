import { router } from "expo-router";
import { StyleSheet, View } from "react-native";

import type { ToolMeta } from "@/lib/tools";
import { colors, fonts, radius, space } from "@/theme";
import { PillButton } from "./PillButton";
import { Text } from "./Text";

/** Website "Related tool" card. Without a tool it points to every calculator. */
export function ToolCtaCard({ tool }: { tool: ToolMeta | null }) {
  const title = tool?.title ?? "Fitness calculators";
  const blurb = tool?.blurb ?? "Free educational tools for calories, macros, and more.";
  return (
    <View style={styles.card}>
      <Text style={styles.kicker}>Related tool</Text>
      <Text variant="heading" style={styles.title}>
        {title}
      </Text>
      <Text variant="small">{blurb}</Text>
      <PillButton
        label={tool ? "Open calculator" : "Browse calculators"}
        icon="arrow-forward"
        onPress={() => router.push(tool ? `/calculator/${tool.id}` : "/tools")}
        style={styles.button}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: colors.accentBorder,
    backgroundColor: colors.accentSoft,
    borderRadius: radius.lg,
    padding: space.lg,
    gap: 6,
  },
  kicker: {
    fontFamily: fonts.semibold,
    fontSize: 11.5,
    letterSpacing: 0.6,
    textTransform: "uppercase",
    color: colors.accent,
  },
  title: { marginTop: 2 },
  button: { alignSelf: "flex-start", minHeight: 40, paddingHorizontal: space.lg, marginTop: space.sm },
});
