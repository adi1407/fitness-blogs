import Ionicons from "@expo/vector-icons/Ionicons";
import { useQuery } from "@tanstack/react-query";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Pressable, RefreshControl, Share, StyleSheet, View } from "react-native";
import Animated, { useAnimatedScrollHandler, useSharedValue } from "react-native-reanimated";

import { fetchRecipe } from "@/api/library";
import { HeroStat, HeroStats, ResultHero } from "@/calculators/ui";
import { HorizontalRail } from "@/components/HorizontalRail";
import { HtmlBody } from "@/components/HtmlBody";
import { ImageTile } from "@/components/ImageTile";
import { ParallaxHeader } from "@/components/ParallaxHeader";
import { RingChart } from "@/components/RingChart";
import { SectionHeader } from "@/components/SectionHeader";
import { ErrorState, LoadingState } from "@/components/States";
import { Text } from "@/components/Text";
import { SITE_URL } from "@/config";
import { haptic } from "@/lib/haptics";
import { recipeImage, thumb } from "@/lib/images";
import { openLink } from "@/lib/links";
import { mealLabel, scaleIngredient } from "@/lib/recipes";
import { colors, fonts, layout, radius, space } from "@/theme";

const MAX_SERVINGS = 8;

function Stepper({ value, onChange }: { value: number; onChange: (n: number) => void }) {
  const step = (d: number) => {
    const next = Math.min(MAX_SERVINGS, Math.max(1, value + d));
    if (next !== value) {
      haptic.tap();
      onChange(next);
    }
  };
  return (
    <View style={styles.stepper} accessibilityRole="adjustable" accessibilityValue={{ min: 1, max: MAX_SERVINGS, now: value }}>
      <Pressable onPress={() => step(-1)} hitSlop={8} accessibilityLabel="Fewer servings" style={styles.stepBtn} disabled={value <= 1}>
        <Ionicons name="remove" size={20} color={value <= 1 ? colors.subtle : colors.ink} />
      </Pressable>
      <Text variant="heading" style={styles.stepValue}>
        {value}
      </Text>
      <Pressable onPress={() => step(1)} hitSlop={8} accessibilityLabel="More servings" style={styles.stepBtn} disabled={value >= MAX_SERVINGS}>
        <Ionicons name="add" size={20} color={value >= MAX_SERVINGS ? colors.subtle : colors.ink} />
      </Pressable>
    </View>
  );
}

export default function RecipeScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const query = useQuery({
    queryKey: ["recipe", slug],
    queryFn: ({ signal }) => fetchRecipe(String(slug), signal),
    enabled: !!slug,
  });
  const [servings, setServings] = useState(1);
  const [checked, setChecked] = useState<Set<number>>(new Set());
  const scrollY = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler((e) => {
    scrollY.value = e.contentOffset.y;
  });

  const r = query.data?.recipe;
  const webUrl = `${SITE_URL}${r?.path ?? `/recipes/${slug}`}`;
  const header = (
    <Stack.Screen
      options={{
        title: "",
        headerTransparent: true,
        headerTintColor: colors.bg,
        headerRight: () =>
          r ? (
            <Ionicons
              name="share-outline"
              size={22}
              color={colors.bg}
              accessibilityLabel="Share recipe"
              onPress={() => Share.share({ message: `${r.title} — ${webUrl}` }).catch(() => {})}
            />
          ) : null,
      }}
    />
  );

  if (query.isPending) return <>{header}<LoadingState label="Loading recipe…" /></>;
  if (query.isError) return <>{header}<ErrorState error={query.error} onRetry={() => query.refetch()} /></>;

  const { recipe, related } = query.data;
  const k = servings;
  const scaled = (v: number | null) => (v == null ? null : Math.round(v * k));
  const hasMacros = recipe.proteinG != null && recipe.carbsG != null && recipe.fatG != null;

  const toggle = (i: number) => {
    haptic.tap();
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };

  return (
    <View style={styles.root}>
      {header}
      <Animated.ScrollView
        onScroll={onScroll}
        scrollEventThrottle={16}
        contentContainerStyle={{ paddingBottom: layout.bottomClearance }}
        refreshControl={<RefreshControl refreshing={query.isRefetching} onRefresh={() => query.refetch()} tintColor={colors.accent} />}
      >
        <ParallaxHeader image={recipeImage(recipe.slug)} height={320} scrollY={scrollY}>
          <Text variant="label" style={styles.eyebrow}>
            {mealLabel(recipe.mealType) || "Recipe"}
          </Text>
          <Text variant="display" style={styles.heroTitle}>
            {recipe.title}
          </Text>
          {recipe.excerpt ? (
            <Text variant="body" style={styles.heroSub}>
              {recipe.excerpt}
            </Text>
          ) : null}
        </ParallaxHeader>

        <View style={styles.body}>
          {recipe.calories != null ? (
            <ResultHero
              label={servings === 1 ? "Per serving" : `For ${servings} servings`}
              value={scaled(recipe.calories)!}
              unit="kcal"
              aside={
                hasMacros ? (
                  <RingChart
                    size={88}
                    stroke={10}
                    dark
                    track="rgba(255,255,255,0.08)"
                    segments={[
                      { value: recipe.proteinG! * 4, color: colors.bg },
                      { value: recipe.carbsG! * 4, color: colors.carbs },
                      { value: recipe.fatG! * 9, color: colors.inkMuted },
                    ]}
                  />
                ) : undefined
              }
            >
              <HeroStats>
                {recipe.proteinG != null ? <HeroStat label="Protein" value={`${scaled(recipe.proteinG)} g`} /> : null}
                {recipe.carbsG != null ? <HeroStat label="Carbs" value={`${scaled(recipe.carbsG)} g`} /> : null}
                {recipe.fatG != null ? <HeroStat label="Fat" value={`${scaled(recipe.fatG)} g`} /> : null}
              </HeroStats>
            </ResultHero>
          ) : null}

          {recipe.quickAnswer ? (
            <View style={styles.quick}>
              <Text variant="label" style={styles.quickLabel}>
                Quick answer
              </Text>
              <Text variant="body" style={styles.quickText}>
                {recipe.quickAnswer}
              </Text>
            </View>
          ) : null}

          {recipe.ingredients.length ? (
            <View style={styles.section}>
              <View style={styles.ingredientsHead}>
                <View style={styles.flex}>
                  <Text variant="label">Ingredients</Text>
                  <Text variant="title">Servings</Text>
                </View>
                <Stepper value={servings} onChange={setServings} />
              </View>
              {recipe.ingredients.map((line, i) => {
                const done = checked.has(i);
                return (
                  <Pressable
                    key={`${i}-${line}`}
                    onPress={() => toggle(i)}
                    style={styles.ingredient}
                    accessibilityRole="checkbox"
                    accessibilityState={{ checked: done }}
                  >
                    <Ionicons name={done ? "checkmark-circle" : "ellipse-outline"} size={22} color={done ? colors.accent : colors.subtle} />
                    <Text variant="body" style={[styles.flex, done && styles.done]}>
                      {scaleIngredient(line, servings)}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          ) : null}

          {recipe.steps.length ? (
            <View style={styles.section}>
              <SectionHeader eyebrow="Method" title="Steps" />
              {recipe.steps.map((s, i) => (
                <View key={`${i}-${s}`} style={styles.step}>
                  <View style={styles.stepNum}>
                    <Text variant="label" style={styles.stepNumText}>
                      {i + 1}
                    </Text>
                  </View>
                  <Text variant="body" style={styles.flex}>
                    {s}
                  </Text>
                </View>
              ))}
            </View>
          ) : null}

          {recipe.bodyHtml ? (
            <View style={styles.bodyWrap}>
              <HtmlBody html={recipe.bodyHtml} />
            </View>
          ) : null}

          {related.length ? (
            <View style={styles.section}>
              <SectionHeader eyebrow="Cook next" title="More recipes" onAction={() => router.push("/recipes")} />
              <HorizontalRail
                data={related}
                itemWidth={220}
                keyExtractor={(x) => x.id}
                renderItem={(x) => (
                  <ImageTile
                    image={thumb(recipeImage(x.slug))}
                    title={x.title}
                    subtitle={x.proteinG != null ? `${x.proteinG} g protein` : undefined}
                    height={170}
                    onPress={() => router.push(`/recipe/${x.slug}`)}
                  />
                )}
              />
            </View>
          ) : null}

          <Text variant="small" style={styles.link} onPress={() => openLink(webUrl)}>
            View on fitlives.in
          </Text>
          <Text variant="small" style={styles.disclaimer}>
            Macros are estimates; check labels for allergens and brand differences.
          </Text>
        </View>
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  flex: { flex: 1 },
  eyebrow: { color: colors.accent },
  heroTitle: { color: colors.bg, fontSize: 30, lineHeight: 36 },
  heroSub: { color: "#D4D4D4" },
  body: { padding: space.lg, gap: space.xl },
  quick: {
    backgroundColor: colors.accentSoft,
    borderLeftWidth: 4,
    borderLeftColor: colors.accent,
    borderRadius: radius.md,
    padding: space.lg,
    gap: space.xs,
  },
  quickLabel: { color: colors.ink },
  quickText: { fontFamily: fonts.medium, color: colors.ink },
  section: { gap: space.md },
  ingredientsHead: { flexDirection: "row", alignItems: "center", gap: space.md },
  stepper: {
    flexDirection: "row",
    alignItems: "center",
    gap: space.sm,
    backgroundColor: colors.surface,
    borderRadius: radius.pill,
    padding: 4,
  },
  stepBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.bg,
    alignItems: "center",
    justifyContent: "center",
  },
  stepValue: { minWidth: 24, textAlign: "center" },
  ingredient: { flexDirection: "row", alignItems: "center", gap: space.md, minHeight: 40 },
  done: { color: colors.subtle, textDecorationLine: "line-through" },
  step: { flexDirection: "row", gap: space.md, alignItems: "flex-start" },
  stepNum: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.ink,
    alignItems: "center",
    justifyContent: "center",
  },
  stepNumText: { color: colors.accent },
  bodyWrap: { marginHorizontal: -space.lg },
  link: { color: colors.ink, textDecorationLine: "underline", textAlign: "center" },
  disclaimer: { textAlign: "center", color: colors.subtle },
});
