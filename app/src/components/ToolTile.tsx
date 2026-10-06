import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { StyleSheet, View } from "react-native";

import type { ToolMeta } from "@/lib/tools";
import { colors, fonts, radius, space } from "@/theme";
import { PressableScale } from "./PressableScale";
import { Text } from "./Text";

/** Website tool card: soft orange panel, ink icon chip, title and blurb. */
export function ToolTile({ tool, height = 150 }: { tool: ToolMeta; height?: number }) {
  return (
    <PressableScale
      onPress={() => router.push(`/calculator/${tool.id}`)}
      accessibilityLabel={tool.title}
      style={[styles.tile, { height }]}
    >
      <View style={styles.top}>
        <View style={styles.icon}>
          <Ionicons name={tool.icon} size={20} color={colors.accent} />
        </View>
        <Ionicons name="arrow-forward" size={16} color={colors.muted} />
      </View>
      <View style={styles.text}>
        <Text variant="heading" numberOfLines={2}>
          {tool.title.replace(/ calculator$/i, "")}
        </Text>
        <Text variant="small" style={styles.blurb} numberOfLines={2}>
          {tool.blurb}
        </Text>
      </View>
    </PressableScale>
  );
}

/** Website tools-index panel: full-width card ending in "Open calculator →". */
export function ToolCard({ tool }: { tool: ToolMeta }) {
  return (
    <PressableScale
      onPress={() => router.push(`/calculator/${tool.id}`)}
      accessibilityLabel={`${tool.title}. ${tool.blurb}`}
      style={styles.card}
      scaleTo={0.985}
    >
      <View style={styles.cardIcon}>
        <Ionicons name={tool.icon} size={20} color={colors.ink} />
      </View>
      <View style={styles.cardBody}>
        <Text variant="heading" style={styles.cardTitle}>
          {tool.title}
        </Text>
        <Text variant="small" style={styles.cardBlurb}>
          {tool.blurb}
        </Text>
        <View style={styles.open}>
          <Text style={styles.openText}>Open calculator</Text>
          <Ionicons name="arrow-forward" size={14} color={colors.ink} />
        </View>
      </View>
    </PressableScale>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    gap: space.md,
    padding: space.lg,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.bg,
  },
  cardIcon: {
    width: 42,
    height: 42,
    borderRadius: radius.md,
    backgroundColor: colors.accentSoft,
    borderWidth: 1,
    borderColor: colors.accentBorder,
    alignItems: "center",
    justifyContent: "center",
  },
  cardBody: { flex: 1, gap: 4 },
  cardTitle: { fontSize: 17, lineHeight: 23 },
  cardBlurb: { lineHeight: 19 },
  open: { flexDirection: "row", alignItems: "center", gap: 6, marginTop: space.sm },
  openText: { fontFamily: fonts.semibold, fontSize: 13, color: colors.ink },
  tile: {
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.accentBorder,
    backgroundColor: "#FFF8EE",
    padding: space.lg,
    justifyContent: "space-between",
  },
  top: { flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between" },
  icon: {
    width: 40,
    height: 40,
    borderRadius: radius.md,
    backgroundColor: colors.ink,
    alignItems: "center",
    justifyContent: "center",
  },
  text: { gap: 2 },
  blurb: { fontSize: 12, lineHeight: 16 },
});
