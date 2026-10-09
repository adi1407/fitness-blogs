import { useQuery } from "@tanstack/react-query";
import { Stack, router } from "expo-router";
import { useMemo, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

import { fetchRecipes } from "@/api/library";
import { Chip } from "@/components/Chip";
import { KnowledgeDisclaimer, PageIntro } from "@/components/PageIntro";
import { PillButton } from "@/components/PillButton";
import { RecipeCard } from "@/components/RecipeCard";
import { Screen } from "@/components/Screen";
import { Skeleton } from "@/components/Skeleton";
import { EmptyState, ErrorState } from "@/components/States";
import { Text } from "@/components/Text";
import { MEAL_FILTERS, mealsOf, type Meal } from "@/lib/recipes";
import { colors, fonts, radius, space } from "@/theme";

type Sort = "protein" | "kcal";

const SORTS: { id: Sort; label: string }[] = [
  { id: "protein", label: "Most protein" },
  { id: "kcal", label: "Fewest kcal" },
];

export default function RecipesScreen() {
  const query = useQuery({ queryKey: ["recipes"], queryFn: ({ signal }) => fetchRecipes(signal) });
  const [meal, setMeal] = useState<Meal | "all">("all");
  const [sort, setSort] = useState<Sort>("protein");

  const meals = useMemo(
    () => MEAL_FILTERS.filter((m) => (query.data ?? []).some((r) => mealsOf(r.mealType).includes(m))),
    [query.data],
  );

  const list = useMemo(() => {
    const items = (query.data ?? []).filter((r) => meal === "all" || mealsOf(r.mealType).includes(meal));
    return [...items].sort((a, b) =>
      sort === "protein"
        ? (b.proteinG ?? 0) - (a.proteinG ?? 0)
        : (a.calories ?? Number.MAX_SAFE_INTEGER) - (b.calories ?? Number.MAX_SAFE_INTEGER),
    );
  }, [query.data, meal, sort]);

  return (
    <Screen refreshing={query.isRefetching} onRefresh={() => query.refetch()}>
      <Stack.Screen options={{ title: "" }} />
      <PageIntro
        crumbs={[{ label: "Library", href: "/library" }, { label: "Recipes" }]}
        title="Recipes"
        lede="High-protein, calorie-aware meals you can cook on a weeknight — with macros listed so you can plug them into your targets."
      >
        <View style={styles.pills}>
          <PillButton label="Macro calculator" onPress={() => router.push("/calculator/macro")} style={styles.pill} />
          <PillButton label="Indian foods" variant="ghost" onPress={() => router.push("/foods")} style={styles.pill} />
        </View>
      </PageIntro>

      {meals.length > 1 ? (
        <View style={styles.chips} accessibilityLabel="Meal type">
          <Chip label="All meals" active={meal === "all"} onPress={() => setMeal("all")} />
          {meals.map((m) => (
            <Chip key={m} label={m[0].toUpperCase() + m.slice(1)} active={meal === m} onPress={() => setMeal(m)} />
          ))}
        </View>
      ) : null}

      <View style={styles.meta}>
        <Text variant="small">
          {query.isPending ? "Loading recipes…" : `${list.length} ${list.length === 1 ? "recipe" : "recipes"}`}
        </Text>
        <View style={styles.sorts} accessibilityRole="radiogroup" accessibilityLabel="Sort recipes">
          {SORTS.map((s) => {
            const active = sort === s.id;
            return (
              <Pressable
                key={s.id}
                onPress={() => setSort(s.id)}
                accessibilityRole="radio"
                accessibilityState={{ checked: active }}
                style={[styles.sort, active && styles.sortActive]}
              >
                <Text style={[styles.sortText, active && styles.sortTextActive]}>{s.label}</Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      {query.isPending ? (
        <View style={styles.list}>
          {[0, 1, 2].map((i) => (
            <Skeleton key={i} height={240} rounded={radius.lg} />
          ))}
        </View>
      ) : query.isError ? (
        <ErrorState error={query.error} onRetry={() => query.refetch()} />
      ) : list.length ? (
        <View style={styles.list}>
          {list.map((r, i) => (
            <Animated.View key={r.id} entering={FadeInDown.delay(Math.min(i, 6) * 50).duration(320)}>
              <RecipeCard recipe={r} />
            </Animated.View>
          ))}
        </View>
      ) : (
        <EmptyState title="No recipes for this meal yet" hint="Try another meal type." />
      )}

      <Text variant="small" style={styles.note}>
        Photos are illustrative. Macros are estimates per serving and vary with brands and portions.
      </Text>
      <KnowledgeDisclaimer />
    </Screen>
  );
}

const styles = StyleSheet.create({
  pills: { flexDirection: "row", flexWrap: "wrap", gap: space.sm, marginTop: space.sm },
  pill: { minHeight: 40, paddingHorizontal: space.lg },
  chips: { flexDirection: "row", flexWrap: "wrap", gap: space.sm },
  meta: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: space.md },
  sorts: { flexDirection: "row", padding: 3, borderRadius: radius.md, backgroundColor: colors.surface },
  sort: { minHeight: 32, justifyContent: "center", paddingHorizontal: space.md, borderRadius: radius.sm },
  sortActive: { backgroundColor: colors.bg, borderWidth: 1, borderColor: colors.border },
  sortText: { fontFamily: fonts.medium, fontSize: 12, color: colors.muted },
  sortTextActive: { fontFamily: fonts.semibold, color: colors.ink },
  list: { gap: space.md },
  note: { lineHeight: 19 },
});
