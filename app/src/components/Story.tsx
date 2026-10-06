import Ionicons from "@expo/vector-icons/Ionicons";
import { Image } from "expo-image";
import { router } from "expo-router";
import { StyleSheet, View } from "react-native";

import { articleImage, type ArticleSummary } from "@/api/articles";
import { colors, fonts, radius, space } from "@/theme";
import { PressableScale } from "./PressableScale";
import { Text } from "./Text";

const open = (a: ArticleSummary) => router.push(`/article/${a.articleNumber}`);

/** "NUTRITION · Dietary fats · 7 min read" — orange category, muted rest. */
function StoryMeta({ article, author = false }: { article: ArticleSummary; author?: boolean }) {
  const rest = [
    article.subcategoryLabel,
    article.readingTime ? `${article.readingTime} min read` : null,
    author ? article.authorName : null,
  ].filter(Boolean);
  return (
    <Text style={styles.meta} numberOfLines={1}>
      {article.categoryLabel ? <Text style={styles.metaCategory}>{article.categoryLabel.toUpperCase()}</Text> : null}
      {rest.length ? `${article.categoryLabel ? "  ·  " : ""}${rest.join("  ·  ")}` : ""}
    </Text>
  );
}

function Cover({ article, ratio, style }: { article: ArticleSummary; ratio: number; style?: object }) {
  const img = articleImage(article);
  return (
    <View style={[styles.cover, { aspectRatio: ratio }, style]}>
      {img ? (
        <Image
          source={img}
          style={StyleSheet.absoluteFill}
          contentFit="contain"
          transition={220}
          accessibilityLabel={article.featuredImageAlt || article.title}
        />
      ) : null}
    </View>
  );
}

/** Website featured lead: big uncropped cover, meta, large title, dek, byline, read link. */
export function StoryLead({ article, label = "Featured" }: { article: ArticleSummary; label?: string }) {
  const dek = article.excerpt || article.quickAnswer;
  return (
    <View style={styles.lead}>
      <Text variant="label" style={styles.leadLabel}>
        {label}
      </Text>
      <PressableScale onPress={() => open(article)} accessibilityLabel={article.title} scaleTo={0.985} style={styles.leadPress}>
        <Cover article={article} ratio={16 / 9} />
        <StoryMeta article={article} />
        <Text style={styles.leadTitle} maxFontSizeMultiplier={1.3}>
          {article.title}
        </Text>
        {dek ? (
          <Text variant="body" style={styles.leadDek} numberOfLines={4}>
            {dek}
          </Text>
        ) : null}
        {article.authorName ? (
          <Text variant="small">
            Written by <Text style={styles.author}>{article.authorName}</Text>
          </Text>
        ) : null}
        <View style={styles.read}>
          <Text style={styles.readText}>Read article</Text>
          <Ionicons name="arrow-forward" size={14} color={colors.ink} />
        </View>
      </PressableScale>
    </View>
  );
}

/** Website topic-rail card: 4:3 cover, orange subcategory, title, dek, read time. */
export function StoryRailCard({ article }: { article: ArticleSummary }) {
  return (
    <PressableScale onPress={() => open(article)} accessibilityLabel={article.title} scaleTo={0.98} style={styles.railCard}>
      <Cover article={article} ratio={4 / 3} />
      <Text style={styles.railKicker} numberOfLines={1}>
        {(article.subcategoryLabel || article.categoryLabel || "Guide").toUpperCase()}
      </Text>
      <Text variant="heading" numberOfLines={3}>
        {article.title}
      </Text>
      {article.excerpt ? (
        <Text variant="small" numberOfLines={2}>
          {article.excerpt}
        </Text>
      ) : null}
      {article.readingTime ? <Text style={styles.minutes}>{article.readingTime} min read</Text> : null}
    </PressableScale>
  );
}

/** Website latest-feed row: thumbnail, meta, title, dek, read link — hairline separated. */
export function StoryRow({ article, first = false }: { article: ArticleSummary; first?: boolean }) {
  return (
    <PressableScale
      onPress={() => open(article)}
      accessibilityLabel={article.title}
      scaleTo={0.985}
      style={[styles.row, first && styles.rowFirst]}
    >
      <Cover article={article} ratio={7 / 5} style={styles.rowThumb} />
      <View style={styles.rowBody}>
        <StoryMeta article={article} />
        <Text variant="heading" numberOfLines={3} style={styles.rowTitle}>
          {article.title}
        </Text>
        {article.excerpt ? (
          <Text variant="small" numberOfLines={2}>
            {article.excerpt}
          </Text>
        ) : null}
      </View>
    </PressableScale>
  );
}

const styles = StyleSheet.create({
  cover: {
    width: "100%",
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    overflow: "hidden",
  },
  meta: { fontFamily: fonts.regular, fontSize: 11.5, color: colors.muted },
  metaCategory: { fontFamily: fonts.semibold, color: colors.accent, letterSpacing: 0.6 },
  lead: { gap: space.md, paddingBottom: space.xl, borderBottomWidth: 1, borderBottomColor: colors.border },
  leadLabel: { color: colors.ink },
  leadPress: { gap: space.md },
  leadTitle: { fontFamily: fonts.semibold, fontSize: 26, lineHeight: 32, letterSpacing: -0.7, color: colors.ink },
  leadDek: { color: colors.muted, lineHeight: 24 },
  author: { fontFamily: fonts.medium, color: colors.ink, fontSize: 13 },
  read: { flexDirection: "row", alignItems: "center", gap: 6 },
  readText: { fontFamily: fonts.semibold, fontSize: 14, color: colors.ink },
  railCard: { gap: 6 },
  railKicker: { fontFamily: fonts.semibold, fontSize: 11, letterSpacing: 0.6, color: colors.accent, marginTop: space.sm },
  minutes: { fontFamily: fonts.regular, fontSize: 11.5, color: colors.subtle },
  row: {
    flexDirection: "row",
    gap: space.md,
    paddingVertical: space.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  rowFirst: { borderTopWidth: 1, borderTopColor: colors.border },
  rowThumb: { width: 112, alignSelf: "flex-start" },
  rowBody: { flex: 1, gap: 5 },
  rowTitle: { fontSize: 15.5, lineHeight: 21 },
});
