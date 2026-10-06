import { Image } from "expo-image";
import { router } from "expo-router";
import { StyleSheet, View } from "react-native";

import { articleImage, type ArticleSummary } from "@/api/articles";
import { colors, space } from "@/theme";
import { Card } from "./Card";
import { Text } from "./Text";

type Props = { article: ArticleSummary; compact?: boolean };

export function ArticleCard({ article, compact = false }: Props) {
  const img = articleImage(article);
  const meta = [article.categoryLabel, article.readingTime ? `${article.readingTime} min read` : null]
    .filter(Boolean)
    .join(" · ");

  return (
    <Card
      onPress={() => router.push(`/article/${article.articleNumber}`)}
      accessibilityLabel={article.title}
      style={styles.card}
    >
      {img && !compact ? (
        <Image
          source={img}
          style={styles.image}
          contentFit="cover"
          transition={200}
          accessibilityLabel={article.featuredImageAlt || article.title}
        />
      ) : null}
      <View style={styles.body}>
        {meta ? <Text variant="label">{meta}</Text> : null}
        <Text variant="heading" numberOfLines={3}>
          {article.title}
        </Text>
        {article.excerpt && !compact ? (
          <Text variant="small" numberOfLines={2}>
            {article.excerpt}
          </Text>
        ) : null}
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: { padding: 0, overflow: "hidden" },
  image: { width: "100%", aspectRatio: 16 / 9, backgroundColor: colors.surface },
  body: { padding: space.lg, gap: space.xs },
});
