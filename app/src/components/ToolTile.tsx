import Ionicons from "@expo/vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { StyleSheet, View } from "react-native";

import type { ToolMeta } from "@/lib/tools";
import { colors, gradients, radius, shadow, space } from "@/theme";
import { PressableScale } from "./PressableScale";
import { Text } from "./Text";

export function ToolTile({ tool, height = 150 }: { tool: ToolMeta; height?: number }) {
  return (
    <PressableScale
      onPress={() => router.push(`/calculator/${tool.id}`)}
      accessibilityLabel={tool.title}
      style={[styles.shadow, { height }]}
    >
      <LinearGradient colors={gradients.ink} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.tile}>
        <View style={styles.icon}>
          <Ionicons name={tool.icon} size={22} color={colors.ink} />
        </View>
        <View style={styles.text}>
          <Text variant="heading" style={styles.title} numberOfLines={2}>
            {tool.title.replace(/ calculator$/i, "")}
          </Text>
          <Text variant="small" style={styles.blurb} numberOfLines={2}>
            {tool.blurb}
          </Text>
        </View>
      </LinearGradient>
    </PressableScale>
  );
}

const styles = StyleSheet.create({
  shadow: { borderRadius: radius.lg, ...shadow.md },
  tile: { flex: 1, borderRadius: radius.lg, padding: space.lg, justifyContent: "space-between" },
  icon: {
    width: 40,
    height: 40,
    borderRadius: radius.md,
    backgroundColor: colors.accent,
    alignItems: "center",
    justifyContent: "center",
  },
  text: { gap: 2 },
  title: { color: colors.bg },
  blurb: { color: colors.inkMuted, fontSize: 12, lineHeight: 16 },
});
