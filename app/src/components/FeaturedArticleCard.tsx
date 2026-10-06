import Ionicons from "@expo/vector-icons/Ionicons";
import { Image } from "expo-image";
import { router } from "expo-router";
import { StyleSheet, View } from "react-native";

import { articleImage, type ArticleSummary } from "@/api/articles";
import { IMG } from "@/lib/images";
import { colors, fonts, radius, shadow, space } from "@/theme";
import { ArticleTags } from "./ArticleCard";
import { PressableScale } from "./PressableScale";
import { Text } from "./Text";

type Props = { article: ArticleSummary };

/** Spotlight card for carousels — the cover art carries its own text, so it is never cropped or darkened. */
export function FeaturedArticleCard({ article }: Props) {
  const img = articleImage(article) ?? IMG.gymInterior;
  const byline = [article.authorName, article.readingTime ? `${article.readingTime} min read` : null]
    .filter(Boolean)
    .join(" · ");

  return (
    <PressableScale
      onPress={() => router.push(`/article/${article.articleNumber}`)}
      accessibilityLabel={article.title}
      style={styles.card}
      scaleTo={0.985}
    >
      <View style={styles.cover}>
        <Image source={img} style={StyleSheet.absoluteFill} contentFit="contain" transition={250} />
      </View>
      <View style={styles.body}>
        <ArticleTags article={article} />
        <Text variant="heading" style={styles.title} numberOfLines={2}>
          {article.title}
        </Text>
        <View style={styles.footer}>
          <Text style={styles.byline} numberOfLines={1}>
            {byline}
          </Text>
          <View style={styles.go}>
            <Ionicons name="arrow-forward" size={14} color={colors.bg} />
          </View>
        </View>
      </View>
    </PressableScale>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.bg,
    overflow: "hidden",
    ...shadow.sm,
  },
  cover: { width: "100%", aspectRatio: 16 / 9, backgroundColor: colors.surface },
  body: { padding: space.lg, paddingTop: space.md, gap: space.sm },
  title: { fontSize: 17, lineHeight: 23 },
  footer: { flexDirection: "row", alignItems: "center", gap: space.sm, marginTop: 2 },
  byline: { flex: 1, fontFamily: fonts.regular, fontSize: 12, color: colors.subtle },
  go: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.ink,
    alignItems: "center",
    justifyContent: "center",
  },
});
