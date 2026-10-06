import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { StyleSheet, View } from "react-native";

import type { KnowledgePage } from "@/api/library";
import { KNOWLEDGE_SECTIONS } from "@/lib/knowledge";
import { colors, radius, space } from "@/theme";
import { Card } from "./Card";
import { Text } from "./Text";

export function KnowledgeRow({ page, index }: { page: KnowledgePage; index?: number }) {
  const meta = KNOWLEDGE_SECTIONS[page.section];
  return (
    <Card onPress={() => router.push(`/guides/${page.section}/${page.slug}`)} accessibilityLabel={page.title} style={styles.card}>
      <View style={styles.badge}>
        {index != null ? (
          <Text variant="heading" style={styles.badgeText}>
            {String(index + 1).padStart(2, "0")}
          </Text>
        ) : (
          <Ionicons name={meta?.icon ?? "document-text-outline"} size={20} color={colors.accent} />
        )}
      </View>
      <View style={styles.text}>
        <Text variant="heading">{page.title}</Text>
        {page.excerpt ? (
          <Text variant="small" numberOfLines={3}>
            {page.excerpt}
          </Text>
        ) : null}
      </View>
      <Ionicons name="chevron-forward" size={18} color={colors.subtle} />
    </Card>
  );
}

const styles = StyleSheet.create({
  card: { flexDirection: "row", alignItems: "flex-start", gap: space.md },
  badge: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    backgroundColor: colors.ink,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeText: { color: colors.accent },
  text: { flex: 1, gap: 4 },
});
