import { useQuery } from "@tanstack/react-query";
import { router } from "expo-router";
import { useMemo, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

import { fetchRecipes } from "@/api/library";
import { Chip } from "@/components/Chip";
import { GradientHero } from "@/components/GradientHero";
import { ImageTile } from "@/components/ImageTile";
import { Screen } from "@/components/Screen";
import { Skeleton } from "@/components/Skeleton";
import { EmptyState, ErrorState } from "@/components/States";
import { Text } from "@/components/Text";
import { recipeImage, thumb } from "@/lib/images";
import { MEAL_FILTERS, mealLabel, mealsOf, type Meal } from "@/lib/recipes";
import { radius, space } from "@/theme";

type Sort = "protein" | "kcal";

export default function RecipesScreen() {
  const query = useQuery({ queryKey: ["recipes"], queryFn: ({ signal }) => fetchRecipes(signal) });
  const [meal, setMeal] = useState<Meal | "all">("all");
  const [sort, setSort] = useState<Sort>("protein");

  const list = useMemo(() => {
    const items = (query.data ?? []).filter((r) => meal === "all" || mealsOf(r.mealType).includes(meal));
    return [...items].sort((a, b) =>
      sort === "protein" ? (b.proteinG ?? 0) - (a.proteinG ?? 0) : (a.calories ?? 0) - (b.calories ?? 0),
    );
  }, [query.data, meal, sort]);

  return (
    <Screen refreshing={query.isRefetching} onRefresh={() => query.refetch()}>
      <GradientHero
        eyebrow="High-protein recipes"
        title="Desi food, more protein."
        subtitle="Simple Indian meals with macros per serving — scale them to your household."
      />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chips}>
        <Chip label="All meals" active={meal === "all"} onPress={() => setMeal("all")} />
        {MEAL_FILTERS.map((m) => (
          <Chip key={m} label={m[0].toUpperCase() + m.slice(1)} active={meal === m} onPress={() => setMeal(m)} />
        ))}
        <View style={styles.divider} />
        <Chip label="Most protein" active={sort === "protein"} onPress={() => setSort("protein")} />
        <Chip label="Fewest kcal" active={sort === "kcal"} onPress={() => setSort("kcal")} />
      </ScrollView>

      {query.isPending ? (
        [0, 1, 2].map((i) => <Skeleton key={i} height={210} rounded={radius.lg} />)
      ) : query.isError ? (
        <ErrorState error={query.error} onRetry={() => query.refetch()} />
      ) : list.length ? (
        list.map((r, i) => (
          <Animated.View key={r.id} entering={FadeInDown.delay(Math.min(i, 6) * 50).duration(320)}>
            <ImageTile
              image={thumb(recipeImage(r.slug))}
              eyebrow={mealLabel(r.mealType) || "Recipe"}
              title={r.title}
              subtitle={[
                r.proteinG != null ? `${r.proteinG} g protein` : null,
                r.calories != null ? `${r.calories} kcal` : null,
              ]
                .filter(Boolean)
                .join(" · ")}
              height={210}
              onPress={() => router.push(`/recipe/${r.slug}`)}
            />
          </Animated.View>
        ))
      ) : (
        <EmptyState title="No recipes for this meal yet" hint="Try another meal type." />
      )}

      <Text variant="small">Photos are illustrative. Macros are estimates per serving and vary with brands and portions.</Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  chips: { gap: space.sm, alignItems: "center" },
  divider: { width: 1, height: 24, backgroundColor: "#E5E5E5", marginHorizontal: space.xs },
});
