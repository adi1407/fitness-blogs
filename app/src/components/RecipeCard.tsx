import { Image } from "expo-image";
import { router } from "expo-router";
import { StyleSheet, View } from "react-native";

import type { Recipe } from "@/api/library";
import { recipeImage, thumb } from "@/lib/images";
import { mealLabel } from "@/lib/recipes";
import { colors, fonts, radius, space } from "@/theme";
import { PressableScale } from "./PressableScale";
import { Text } from "./Text";

export function recipeMacros(r: Pick<Recipe, "proteinG" | "calories">) {
  return [r.proteinG != null ? `${r.proteinG} g protein` : null, r.calories != null ? `${r.calories} kcal` : null]
    .filter(Boolean)
    .join(" · ");
}

/** Website recipe card with an illustrative photo strip. */
export function RecipeCard({ recipe }: { recipe: Recipe }) {
  const macros = recipeMacros(recipe);
  const meal = mealLabel(recipe.mealType);
  return (
    <PressableScale
      onPress={() => router.push(`/recipe/${recipe.slug}`)}
      accessibilityRole="link"
      accessibilityLabel={[recipe.title, macros].filter(Boolean).join(". ")}
      scaleTo={0.985}
      style={styles.card}
    >
      <Image source={thumb(recipeImage(recipe.slug))} style={styles.image} contentFit="cover" transition={250} />
      <View style={styles.body}>
        {meal ? <Text style={styles.meal}>{meal}</Text> : null}
        <Text variant="heading" style={styles.title}>
          {recipe.title}
        </Text>
        {recipe.excerpt ? (
          <Text variant="small" style={styles.excerpt} numberOfLines={3}>
            {recipe.excerpt}
          </Text>
        ) : null}
        {macros ? <Text style={styles.macros}>{macros}</Text> : null}
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
  image: { width: "100%", aspectRatio: 16 / 7, backgroundColor: colors.surface },
  body: { gap: 6, padding: space.lg },
  meal: {
    fontFamily: fonts.semibold,
    fontSize: 11.5,
    letterSpacing: 0.6,
    textTransform: "uppercase",
    color: colors.accent,
  },
  title: { fontSize: 17, lineHeight: 23 },
  excerpt: { lineHeight: 19 },
  macros: { fontFamily: fonts.medium, fontSize: 12, color: colors.ink, marginTop: 2 },
});
