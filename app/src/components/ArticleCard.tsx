import { Image } from "expo-image";
import { router } from "expo-router";
import { StyleSheet, View } from "react-native";

import { articleImage, type ArticleSummary } from "@/api/articles";
import { colors, fonts, radius, space } from "@/theme";
import { PressableScale } from "./PressableScale";
import { Text } from "./Text";

type Props = { article: ArticleSummary; compact?: boolean };

export function articleMeta(article: ArticleSummary) {
  const path = [article.categorySlug, article.subcategorySlug].filter(Boolean).join(" / ") || "fitlives";
  return article.readingTime ? `${path} · ${article.readingTime} min` : path;
}

export function ArticleTags({ article, max = 2 }: { article: ArticleSummary; max?: number }) {
  const tags = [article.categoryLabel, article.subcategoryLabel].filter(Boolean).slice(0, max) as string[];
  if (!tags.length) return null;
  return (
    <View style={styles.tags}>
      {tags.map((t) => (
        <View key={t} style={styles.tag}>
          <Text style={styles.tagText} numberOfLines={1}>
            {t}
          </Text>
        </View>
      ))}
    </View>
  );
}

/** Website "keep" card: uncropped 16:9 cover, tags, title, excerpt, path meta. */
export function ArticleCard({ article, compact = false }: Props) {
  const img = articleImage(article);
  const open = () => router.push(`/article/${article.articleNumber}`);

  if (compact) {
    return (
      <PressableScale onPress={open} accessibilityLabel={article.title} style={styles.row}>
        <View style={styles.rowThumb}>
          {img ? <Image source={img} style={StyleSheet.absoluteFill} contentFit="contain" transition={200} /> : null}
        </View>
        <View style={styles.rowBody}>
          <Text variant="heading" numberOfLines={2} style={styles.rowTitle}>
            {article.title}
          </Text>
          <Text style={styles.meta} numberOfLines={1}>
            {articleMeta(article)}
          </Text>
        </View>
      </PressableScale>
    );
  }

  return (
    <PressableScale onPress={open} accessibilityLabel={article.title} style={styles.card} scaleTo={0.985}>
      <View style={styles.cover}>
        {img ? (
          <Image
            source={img}
            style={StyleSheet.absoluteFill}
            contentFit="contain"
            transition={200}
            accessibilityLabel={article.featuredImageAlt || article.title}
          />
        ) : null}
      </View>
      <View style={styles.body}>
        <ArticleTags article={article} />
        <Text variant="heading" numberOfLines={2}>
          {article.title}
        </Text>
        {article.excerpt ? (
          <Text variant="small" numberOfLines={2} style={styles.excerpt}>
            {article.excerpt}
          </Text>
        ) : null}
        <Text style={styles.meta} numberOfLines={1}>
          {articleMeta(article)}
        </Text>
      </View>
    </PressableScale>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.bg,
    overflow: "hidden",
  },
  cover: { width: "100%", aspectRatio: 16 / 9, backgroundColor: colors.surface },
  body: { padding: space.md, gap: 6 },
  excerpt: { fontSize: 12.5, lineHeight: 18 },
  meta: { fontFamily: fonts.regular, fontSize: 11, color: colors.subtle, marginTop: 2 },
  tags: { flexDirection: "row", flexWrap: "wrap", gap: 4 },
  tag: { backgroundColor: colors.surface, borderRadius: 4, paddingHorizontal: 6, paddingVertical: 2 },
  tagText: { fontFamily: fonts.medium, fontSize: 10.5, color: colors.muted },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: space.md,
    padding: space.sm,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.bg,
  },
  rowThumb: {
    width: 104,
    aspectRatio: 16 / 9,
    borderRadius: radius.sm,
    overflow: "hidden",
    backgroundColor: colors.surface,
  },
  rowBody: { flex: 1, gap: 4 },
  rowTitle: { fontSize: 14, lineHeight: 19 },
});
