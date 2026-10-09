import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { StyleSheet, View } from "react-native";

import type { KnowledgePage } from "@/api/library";
import { colors, fonts, radius, space } from "@/theme";
import { PressableScale } from "./PressableScale";
import { Text } from "./Text";

/** Website program / buyer's-guide card: bordered, title + excerpt, optional step number. */
export function KnowledgeRow({ page, index, compact }: { page: KnowledgePage; index?: number; compact?: boolean }) {
  return (
    <PressableScale
      onPress={() => router.push(`/guides/${page.section}/${page.slug}`)}
      accessibilityRole="link"
      accessibilityLabel={page.title}
      scaleTo={0.985}
      style={[styles.card, compact && styles.compact]}
    >
      <View style={styles.text}>
        {index != null ? <Text style={styles.index}>{String(index + 1).padStart(2, "0")}</Text> : null}
        <Text variant="heading" style={compact ? styles.titleCompact : styles.title}>
          {page.title}
        </Text>
        {page.excerpt && !compact ? (
          <Text variant="small" numberOfLines={3}>
            {page.excerpt}
          </Text>
        ) : null}
      </View>
      <Ionicons name="arrow-forward" size={16} color={colors.ink} />
    </PressableScale>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    gap: space.md,
    padding: space.lg,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.bg,
  },
  compact: { paddingVertical: space.md, borderRadius: radius.md },
  text: { flex: 1, gap: 4 },
  index: { fontFamily: fonts.semibold, fontSize: 12, letterSpacing: 1, color: colors.muted },
  title: { fontSize: 17, lineHeight: 23 },
  titleCompact: { fontSize: 15, lineHeight: 21 },
});
