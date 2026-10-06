import Ionicons from "@expo/vector-icons/Ionicons";
import { useQuery } from "@tanstack/react-query";
import { router } from "expo-router";
import { useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, useWindowDimensions, View } from "react-native";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";

import { fetchArticles } from "@/api/articles";
import { fetchFoods } from "@/api/foods";
import { MUSCLE_GROUP_LABEL, fetchExercises, fetchRecipes } from "@/api/library";
import { Accordion } from "@/components/Accordion";
import { ArticleCard } from "@/components/ArticleCard";
import { Chip } from "@/components/Chip";
import { ClarityBand } from "@/components/ClarityBand";
import { FeaturedArticleCard } from "@/components/FeaturedArticleCard";
import { HorizontalRail } from "@/components/HorizontalRail";
import { ImageTile } from "@/components/ImageTile";
import { MarqueeHero } from "@/components/MarqueeHero";
import { PillButton } from "@/components/PillButton";
import { PressableScale } from "@/components/PressableScale";
import { Screen } from "@/components/Screen";
import { SectionHeader } from "@/components/SectionHeader";
import { Skeleton } from "@/components/Skeleton";
import { ErrorState } from "@/components/States";
import { Text } from "@/components/Text";
import { ToolTile } from "@/components/ToolTile";
import { IMG, MUSCLE_GROUP_IMAGE, recipeImage, thumb } from "@/lib/images";
import { isHighProtein, shortName } from "@/lib/nutrition";
import { PILLARS } from "@/lib/pillars";
import { TOOLS } from "@/lib/tools";
import { colors, fonts, radius, space } from "@/theme";

const HERO_IMAGES = [
  IMG.barbellSquat,
  IMG.powerBowl,
  IMG.outdoorRun,
  IMG.indianThali,
  IMG.deadlift,
  IMG.veggieBowl,
  IMG.dumbbellRow,
  IMG.mealPrep,
  IMG.mobilityStretch,
  IMG.healthyBreakfast,
  IMG.bicepCurl,
].map(thumb);

const FILTERS = [{ id: "all", label: "All" }, ...PILLARS.map((p) => ({ id: p.slug as string, label: p.title }))];

const FAQS = [
  {
    q: "How much protein should I eat per day?",
    a: "Most active adults aiming to build or keep muscle do well around 1.6–2.2 g per kg of body weight. Use the protein calculator, then map the number onto Indian foods.",
  },
  {
    q: "Do I need a calorie deficit to lose fat?",
    a: "Yes — fat loss requires eating fewer calories than you burn over time. Strength training and enough protein help preserve muscle while you cut.",
  },
  {
    q: "How often should I train each muscle?",
    a: "Hitting each major muscle group about 2× per week works well for most people. Progress load or reps when form stays solid.",
  },
  {
    q: "Are fitlives calculators medical advice?",
    a: "No. Tools and articles are educational only. Talk with a qualified professional for personal medical or diet decisions.",
  },
];

const KEEP_LIMIT = 4;

/** Days since epoch in local time — rotates daily picks. */
function dayIndex() {
  const now = new Date();
  return Math.floor((now.getTime() - now.getTimezoneOffset() * 60_000) / 86_400_000);
}

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return <Animated.View entering={FadeInDown.duration(420).delay(delay)}>{children}</Animated.View>;
}

export default function HomeScreen() {
  const { width } = useWindowDimensions();
  const [filter, setFilter] = useState("all");
  const articles = useQuery({ queryKey: ["articles"], queryFn: ({ signal }) => fetchArticles(signal) });
  const foods = useQuery({ queryKey: ["foods"], queryFn: ({ signal }) => fetchFoods(signal) });
  const exercises = useQuery({ queryKey: ["exercises"], queryFn: ({ signal }) => fetchExercises(signal) });
  const recipes = useQuery({ queryKey: ["recipes"], queryFn: ({ signal }) => fetchRecipes(signal) });
  const all = [articles, foods, exercises, recipes];
  const refreshing = all.some((q) => q.isRefetching);
  const onRefresh = () => all.forEach((q) => q.refetch());

  const keep = useMemo(() => {
    const list = articles.data ?? [];
    return (filter === "all" ? list : list.filter((a) => a.categorySlug === filter)).slice(0, KEEP_LIMIT);
  }, [articles.data, filter]);
  const moreToRead = useMemo(() => {
    const shown = new Set(keep.map((a) => a.id));
    return (articles.data ?? []).filter((a) => !shown.has(a.id)).slice(0, 6);
  }, [articles.data, keep]);
  const proteinPicks = useMemo(
    () =>
      (foods.data ?? [])
        .filter(isHighProtein)
        .sort((a, b) => b.proteinG - a.proteinG)
        .slice(0, 8),
    [foods.data],
  );
  const cardWidth = Math.min(width - space.lg * 2 - 28, 360);
  const exerciseOfDay = exercises.data?.length ? exercises.data[dayIndex() % exercises.data.length] : null;

  return (
    <Screen refreshing={refreshing} onRefresh={onRefresh}>
      <View style={styles.bleed}>
        <MarqueeHero
          tagline="Evidence-informed fitness for India"
          title="Better knowledge. Better health."
          description="Clear guides on muscle building, weight loss and nutrition — plus free calculators and an Indian food database."
          images={HERO_IMAGES}
        >
          <View style={styles.ctaRow}>
            <PillButton label="Browse guides" icon="arrow-forward" onPress={() => router.push("/learn")} style={styles.cta} />
            <PillButton label="Calculators" variant="ghost" onPress={() => router.push("/tools")} style={styles.cta} />
          </View>
          <Pressable
            onPress={() => router.push("/search")}
            style={({ pressed }) => [styles.search, pressed && styles.searchPressed]}
            accessibilityRole="search"
            accessibilityLabel="Search fitlives"
          >
            <Ionicons name="search" size={17} color={colors.subtle} />
            <Text variant="small" style={styles.searchText}>
              Search protein, dal, fat loss…
            </Text>
          </Pressable>
        </MarqueeHero>
      </View>

      <Reveal>
        <View style={styles.section}>
          <SectionHeader
            title="Guides worth opening"
            subtitle="Browse like a keep — pick a goal to filter."
            actionLabel="Full library"
            onAction={() => router.push("/learn")}
          />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.chipsRail}
            contentContainerStyle={styles.chips}
          >
            {FILTERS.map((f) => (
              <Chip key={f.id} label={f.label} active={filter === f.id} onPress={() => setFilter(f.id)} />
            ))}
          </ScrollView>
          {articles.isPending ? (
            <>
              <Skeleton height={260} rounded={radius.lg} />
              <Skeleton height={260} rounded={radius.lg} />
            </>
          ) : articles.isError ? (
            <ErrorState error={articles.error} onRetry={() => articles.refetch()} />
          ) : keep.length ? (
            <Animated.View key={filter} entering={FadeIn.duration(260)} style={styles.keep}>
              {keep.map((a) => (
                <ArticleCard key={a.id} article={a} />
              ))}
            </Animated.View>
          ) : (
            <Text variant="small" style={styles.empty}>
              No guides in this goal yet — try another filter.
            </Text>
          )}
        </View>
      </Reveal>

      {moreToRead.length ? (
        <View style={styles.section}>
          <SectionHeader title="More to read" subtitle="Swipe through fresh answers." onAction={() => router.push("/learn")} />
          <HorizontalRail
            data={moreToRead}
            itemWidth={cardWidth}
            keyExtractor={(a) => String(a.id)}
            renderItem={(a) => <FeaturedArticleCard article={a} />}
          />
        </View>
      ) : null}

      <View style={styles.section}>
        <SectionHeader
          title="Free calculators"
          subtitle="Numbers with an explanation, not just a result."
          onAction={() => router.push("/tools")}
        />
        <HorizontalRail
          data={TOOLS}
          itemWidth={168}
          keyExtractor={(t) => t.id}
          renderItem={(t) => <ToolTile tool={t} />}
        />
      </View>

      <View style={styles.section}>
        <SectionHeader title="Pick your goal" subtitle="Three pillars, each with guides and tools." />
        {PILLARS.map((p) => (
          <ImageTile
            key={p.slug}
            image={p.image}
            eyebrow="Pillar guide"
            title={p.title}
            subtitle={p.tagline}
            height={150}
            onPress={() => router.push(`/hub/${p.slug}`)}
          />
        ))}
      </View>

      {exerciseOfDay ? (
        <View style={styles.section}>
          <SectionHeader title="Exercise of the day" onAction={() => router.push("/exercises")} />
          <ImageTile
            image={MUSCLE_GROUP_IMAGE[exerciseOfDay.muscleGroup] ?? MUSCLE_GROUP_IMAGE.chest}
            eyebrow={MUSCLE_GROUP_LABEL[exerciseOfDay.muscleGroup] ?? exerciseOfDay.muscleGroup}
            title={exerciseOfDay.title}
            subtitle={exerciseOfDay.quickAnswer ?? exerciseOfDay.excerpt ?? undefined}
            height={200}
            onPress={() => router.push(`/exercise/${exerciseOfDay.muscleGroup}/${exerciseOfDay.slug}`)}
          />
        </View>
      ) : null}

      {proteinPicks.length ? (
        <View style={styles.section}>
          <SectionHeader
            title="Protein-rich Indian foods"
            subtitle="Per 100 g, from the fitlives food database."
            onAction={() => router.push("/foods")}
          />
          <HorizontalRail
            data={proteinPicks}
            itemWidth={148}
            keyExtractor={(f) => f.slug}
            renderItem={(f) => (
              <PressableScale
                onPress={() => router.push(`/food/${f.slug}`)}
                accessibilityLabel={`${f.name}, ${Math.round(f.proteinG)} grams protein per 100 grams`}
                style={styles.food}
              >
                <View style={styles.foodBadge}>
                  <Text style={styles.foodBadgeText}>{f.kcal} kcal</Text>
                </View>
                <Text style={styles.foodProtein} maxFontSizeMultiplier={1.3}>
                  {Math.round(f.proteinG)}
                  <Text style={styles.foodUnit}> g</Text>
                </Text>
                <Text variant="small" style={styles.foodLabel}>
                  protein
                </Text>
                <Text variant="heading" numberOfLines={2} style={styles.foodName}>
                  {shortName(f.name)}
                </Text>
              </PressableScale>
            )}
          />
        </View>
      ) : null}

      {recipes.data?.length ? (
        <View style={styles.section}>
          <SectionHeader title="High-protein recipes" onAction={() => router.push("/recipes")} />
          <HorizontalRail
            data={recipes.data}
            itemWidth={220}
            keyExtractor={(r) => r.id}
            renderItem={(r) => (
              <ImageTile
                image={thumb(recipeImage(r.slug))}
                title={r.title}
                subtitle={r.proteinG != null ? `${r.proteinG} g protein · ${r.calories ?? "–"} kcal` : undefined}
                height={180}
                onPress={() => router.push(`/recipe/${r.slug}`)}
              />
            )}
          />
        </View>
      ) : null}

      <View style={[styles.bleed, styles.faq]}>
        <SectionHeader title="Common questions" subtitle="Quick answers that route into guides and tools." />
        <View style={styles.faqList}>
          {FAQS.map((f) => (
            <Accordion key={f.q} title={f.q}>
              <Text variant="small" style={styles.faqAnswer}>
                {f.a}
              </Text>
            </Accordion>
          ))}
        </View>
      </View>

      <ClarityBand style={styles.joined} />

      <Pressable
        onPress={() => router.push("/about")}
        style={({ pressed }) => [styles.trust, pressed && styles.searchPressed]}
        accessibilityRole="button"
        accessibilityLabel="How fitlives works: expert reviewed, cited sources, built for India"
      >
        <Ionicons name="shield-checkmark-outline" size={18} color={colors.accent} />
        <Text variant="small" style={styles.trustText}>
          Expert reviewed · cited sources · built for India. Educational only — not medical advice.
        </Text>
        <Ionicons name="chevron-forward" size={16} color={colors.muted} />
      </Pressable>
    </Screen>
  );
}

const styles = StyleSheet.create({
  bleed: { marginHorizontal: -space.lg, marginTop: -space.lg },
  section: { gap: space.md },
  ctaRow: { flexDirection: "row", gap: space.sm },
  cta: { flex: 1, paddingHorizontal: space.md },
  search: {
    flexDirection: "row",
    alignItems: "center",
    gap: space.sm,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.pill,
    paddingHorizontal: space.lg,
    minHeight: 46,
  },
  searchPressed: { borderColor: colors.accent },
  searchText: { color: colors.subtle },
  chipsRail: { marginHorizontal: -space.lg },
  chips: { paddingHorizontal: space.lg, gap: space.sm },
  keep: { gap: space.md },
  empty: { textAlign: "center", paddingVertical: space.xl },
  food: {
    minHeight: 172,
    padding: space.lg,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.bg,
  },
  foodBadge: {
    alignSelf: "flex-start",
    backgroundColor: colors.surface,
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginBottom: space.md,
  },
  foodBadgeText: { fontFamily: fonts.medium, fontSize: 10.5, color: colors.muted },
  foodProtein: { fontFamily: fonts.bold, fontSize: 34, lineHeight: 38, letterSpacing: -1, color: colors.ink },
  foodUnit: { fontFamily: fonts.semibold, fontSize: 15, letterSpacing: 0, color: colors.accent },
  foodLabel: { marginTop: -2 },
  foodName: { marginTop: space.md, fontSize: 14, lineHeight: 19 },
  faq: {
    marginTop: 0,
    backgroundColor: colors.canvas,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: space.lg,
    paddingVertical: space.xxl,
    gap: space.lg,
  },
  faqList: { gap: space.sm },
  joined: { marginTop: -space.xl },
  faqAnswer: { lineHeight: 20 },
  trust: {
    flexDirection: "row",
    alignItems: "center",
    gap: space.md,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.accentBorder,
    backgroundColor: colors.accentSoft,
    padding: space.lg,
  },
  trustText: { flex: 1, color: colors.ink, fontSize: 12, lineHeight: 17 },
});
