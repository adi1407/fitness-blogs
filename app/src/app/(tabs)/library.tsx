import { useQuery } from "@tanstack/react-query";
import { router, type Href } from "expo-router";
import { useMemo } from "react";
import { StyleSheet, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

import { fetchFoods } from "@/api/foods";
import { fetchExercises, fetchRecipes } from "@/api/library";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FoodCard } from "@/components/FoodCard";
import { ImageTile } from "@/components/ImageTile";
import { PillButton } from "@/components/PillButton";
import { Screen } from "@/components/Screen";
import { SectionHeader } from "@/components/SectionHeader";
import { Skeleton } from "@/components/Skeleton";
import { Text } from "@/components/Text";
import { IMG, thumb } from "@/lib/images";
import { proteinPer100Kcal } from "@/lib/nutrition";
import { colors, fonts, radius, space } from "@/theme";

type Database = { title: string; eyebrow: string; blurb: string; image: string; href: Href };

const DATABASES: Database[] = [
  {
    title: "Indian food calories & protein",
    eyebrow: "Foods · IFCT 2017",
    blurb: "Per katori, roti and 100 g — filter veg, egg or non-veg.",
    image: IMG.indianThali,
    href: "/foods",
  },
  {
    title: "Exercise library",
    eyebrow: "Exercises",
    blurb: "Form cues and common mistakes for every major lift.",
    image: IMG.deadlift,
    href: "/exercises",
  },
  {
    title: "High-protein recipes",
    eyebrow: "Recipes",
    blurb: "Simple Indian meals with macros per serving.",
    image: IMG.mealPrep,
    href: "/recipes",
  },
];

const TOP_PROTEIN = 4;

export default function LibraryScreen() {
  const foods = useQuery({ queryKey: ["foods"], queryFn: ({ signal }) => fetchFoods(signal) });
  const exercises = useQuery({ queryKey: ["exercises"], queryFn: ({ signal }) => fetchExercises(signal) });
  const recipes = useQuery({ queryKey: ["recipes"], queryFn: ({ signal }) => fetchRecipes(signal) });

  const topProtein = useMemo(
    () => [...(foods.data ?? [])].sort((a, b) => proteinPer100Kcal(b) - proteinPer100Kcal(a)).slice(0, TOP_PROTEIN),
    [foods.data],
  );

  const stats = [
    { value: foods.data?.length, label: "foods" },
    { value: exercises.data?.length, label: "exercises" },
    { value: recipes.data?.length, label: "recipes" },
  ];

  const refreshing = foods.isRefetching || exercises.isRefetching || recipes.isRefetching;
  const refresh = () => {
    foods.refetch();
    exercises.refetch();
    recipes.refetch();
  };

  return (
    <Screen refreshing={refreshing} onRefresh={refresh}>
      <Animated.View entering={FadeInDown.duration(420)} style={styles.intro}>
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Library" }]} />
        <Text style={styles.title} accessibilityRole="header" maxFontSizeMultiplier={1.3}>
          Look it up
        </Text>
        <Text variant="body" style={styles.lede}>
          Reference data you can check: Indian food values from the national food composition tables, exercise
          technique, and recipes with macros worked out per serving.
        </Text>
        <View style={styles.stats}>
          {stats.map((s, i) => (
            <View key={s.label} style={styles.statWrap}>
              {i > 0 ? <View style={styles.statDivider} /> : null}
              <View style={styles.stat}>
                {s.value != null ? (
                  <Text style={styles.statValue}>{s.value}</Text>
                ) : (
                  <Skeleton height={24} width={36} />
                )}
                <Text variant="small">{s.label}</Text>
              </View>
            </View>
          ))}
        </View>
      </Animated.View>

      <View style={styles.tiles}>
        {DATABASES.map((d, i) => (
          <Animated.View key={d.title} entering={FadeInDown.delay(80 + i * 70).duration(380)}>
            <ImageTile
              image={thumb(d.image)}
              eyebrow={d.eyebrow}
              title={d.title}
              subtitle={d.blurb}
              height={i === 0 ? 200 : 150}
              onPress={() => router.push(d.href)}
            />
          </Animated.View>
        ))}
      </View>

      <View style={styles.section}>
        <SectionHeader
          title="Most protein per calorie"
          subtitle="Per typical serving, from the food database."
          actionLabel={foods.data ? `All ${foods.data.length}` : "See all"}
          onAction={() => router.push("/foods")}
        />
        {foods.isPending ? (
          <View style={styles.cards}>
            <Skeleton height={130} rounded={radius.lg} />
            <Skeleton height={130} rounded={radius.lg} />
          </View>
        ) : (
          <View style={styles.cards}>
            {topProtein.map((f) => (
              <FoodCard key={f.slug} food={f} />
            ))}
          </View>
        )}
      </View>

      <View style={styles.callout}>
        <Text variant="label" style={styles.calloutLabel}>
          Plan with your numbers
        </Text>
        <Text variant="title">Know your targets first</Text>
        <Text variant="small" style={styles.calloutText}>
          Find your daily protein and calories, then pick 2–3 foods from the database to build each meal around.
        </Text>
        <View style={styles.buttons}>
          <PillButton label="Protein calculator" onPress={() => router.push("/calculator/protein")} style={styles.button} />
          <PillButton
            label="Compare foods"
            variant="ghost"
            icon="git-compare-outline"
            onPress={() => router.push("/compare")}
            style={styles.button}
          />
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  intro: { gap: space.md, paddingTop: space.sm },
  title: { fontFamily: fonts.semibold, fontSize: 38, lineHeight: 43, letterSpacing: -1.3, color: colors.ink },
  lede: { color: colors.muted, fontSize: 16, lineHeight: 25 },
  stats: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: space.sm,
    paddingVertical: space.md,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.border,
  },
  statWrap: { flex: 1, flexDirection: "row", alignItems: "center" },
  stat: { flex: 1, alignItems: "center", gap: 1 },
  statValue: { fontFamily: fonts.bold, fontSize: 22, lineHeight: 27, letterSpacing: -0.5, color: colors.ink },
  statDivider: { width: 1, height: 28, backgroundColor: colors.border },
  tiles: { gap: space.md },
  section: { gap: space.lg },
  cards: { gap: space.md },
  callout: {
    gap: space.sm,
    padding: space.xl,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: "rgba(245,245,245,0.5)",
  },
  calloutLabel: { color: colors.ink },
  calloutText: { lineHeight: 19 },
  buttons: { flexDirection: "row", flexWrap: "wrap", gap: space.sm, marginTop: space.sm },
  button: { minHeight: 40, paddingHorizontal: space.lg },
});
