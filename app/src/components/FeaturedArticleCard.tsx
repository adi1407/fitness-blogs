import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { StyleSheet, View } from "react-native";

import { articleImage, type ArticleSummary } from "@/api/articles";
import { IMG } from "@/lib/images";
import { colors, gradients, radius, shadow, space } from "@/theme";
import { PressableScale } from "./PressableScale";
import { Text } from "./Text";

type Props = { article: ArticleSummary; height?: number };

/** Full-bleed image card with title over a dark fade — used in carousels. */
export function FeaturedArticleCard({ article, height = 300 }: Props) {
  const img = articleImage(article) ?? IMG.gymInterior;
  return (
    <PressableScale
      onPress={() => router.push(`/article/${article.articleNumber}`)}
      accessibilityLabel={article.title}
      style={[styles.card, { height }]}
    >
      <Image source={img} style={StyleSheet.absoluteFill} contentFit="cover" transition={250} />
      <LinearGradient colors={gradients.fadeBottom} style={StyleSheet.absoluteFill} start={{ x: 0, y: 0.35 }} end={{ x: 0, y: 1 }} />
      <View style={styles.body}>
        {article.categoryLabel ? (
          <View style={styles.badge}>
            <Text variant="label" style={styles.badgeText}>
              {article.categoryLabel}
            </Text>
          </View>
        ) : null}
        <Text variant="title" style={styles.title} numberOfLines={3}>
          {article.title}
        </Text>
        <Text variant="small" style={styles.meta}>
          {[article.authorName, article.readingTime ? `${article.readingTime} min read` : null].filter(Boolean).join(" · ")}
        </Text>
      </View>
    </PressableScale>
  );
}

const styles = StyleSheet.create({
  card: { borderRadius: radius.xl, overflow: "hidden", backgroundColor: colors.ink, ...shadow.md },
  body: { flex: 1, justifyContent: "flex-end", padding: space.xl, gap: space.sm },
  badge: {
    alignSelf: "flex-start",
    backgroundColor: colors.accent,
    borderRadius: radius.pill,
    paddingHorizontal: space.md,
    paddingVertical: 4,
  },
  badgeText: { color: colors.ink },
  title: { color: colors.bg },
  meta: { color: colors.inkMuted },
});
