import Ionicons from "@expo/vector-icons/Ionicons";
import { useQuery } from "@tanstack/react-query";
import { router, type Href } from "expo-router";
import { useDeferredValue, useMemo, useState, type ComponentProps } from "react";
import { Pressable, ScrollView, SectionList, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { fetchArticles } from "@/api/articles";
import { fetchFoods } from "@/api/foods";
import { MUSCLE_GROUP_LABEL, fetchExercises, fetchKnowledge, fetchRecipes } from "@/api/library";
import { Chip } from "@/components/Chip";
import { SearchInput } from "@/components/SearchInput";
import { EmptyState } from "@/components/States";
import { Text } from "@/components/Text";
import { usePersistentState } from "@/hooks/usePersistentState";
import { haptic } from "@/lib/haptics";
import { KNOWLEDGE_SECTIONS } from "@/lib/knowledge";
import { shortName } from "@/lib/nutrition";
import { mealLabel } from "@/lib/recipes";
import { score } from "@/lib/search";
import { TOOLS } from "@/lib/tools";
import { colors, fonts, layout, radius, space } from "@/theme";

type Kind = "article" | "food" | "exercise" | "recipe" | "tool" | "guide";
type IconName = ComponentProps<typeof Ionicons>["name"];

const KINDS: { id: Kind; label: string; icon: IconName; browse: string; href: Href }[] = [
  { id: "tool", label: "Calculators", icon: "calculator-outline", browse: `All calculators (${TOOLS.length})`, href: "/tools" },
  { id: "article", label: "Articles", icon: "newspaper-outline", browse: "All articles", href: "/learn" },
  { id: "food", label: "Foods", icon: "nutrition-outline", browse: "Indian food calories", href: "/foods" },
  { id: "exercise", label: "Exercises", icon: "barbell-outline", browse: "Exercise library", href: "/exercises" },
  { id: "recipe", label: "Recipes", icon: "restaurant-outline", browse: "High-protein recipes", href: "/recipes" },
  { id: "guide", label: "Programs & guides", icon: "calendar-outline", browse: "Training programs", href: "/guides/programs" },
];

const SUGGESTIONS = ["protein", "paneer", "fat loss", "TDEE", "squat", "dal", "creatine", "breakfast"];
const MAX_RECENT = 8;
const PER_KIND = 8;

type Hit = { key: string; kind: Kind; title: string; subtitle?: string; href: Href; rank: number };

export default function SearchScreen() {
  const insets = useSafeAreaInsets();
  const [q, setQ] = useState("");
  const term = useDeferredValue(q.trim());
  const [kind, setKind] = useState<Kind | "all">("all");
  const [recent, setRecent] = usePersistentState<{ items: string[] }>("search:recent", { items: [] });

  const articles = useQuery({ queryKey: ["articles"], queryFn: ({ signal }) => fetchArticles(signal) });
  const foods = useQuery({ queryKey: ["foods"], queryFn: ({ signal }) => fetchFoods(signal) });
  const exercises = useQuery({ queryKey: ["exercises"], queryFn: ({ signal }) => fetchExercises(signal) });
  const recipes = useQuery({ queryKey: ["recipes"], queryFn: ({ signal }) => fetchRecipes(signal) });
  const programs = useQuery({ queryKey: ["knowledge", "programs"], queryFn: ({ signal }) => fetchKnowledge("programs", signal) });
  const reviews = useQuery({ queryKey: ["knowledge", "reviews"], queryFn: ({ signal }) => fetchKnowledge("reviews", signal) });
  const loading = [articles, foods, exercises, recipes].some((x) => x.isPending);

  const sections = useMemo(() => {
    if (term.length < 2) return [];
    const hits: Hit[] = [];
    const push = (h: Omit<Hit, "rank">, rank: number) => {
      if (rank > 0) hits.push({ ...h, rank });
    };

    for (const t of TOOLS) {
      push({ key: `t-${t.id}`, kind: "tool", title: t.title, subtitle: t.blurb, href: `/calculator/${t.id}` }, score(term, t.title, [t.blurb, t.group]));
    }
    for (const a of articles.data ?? []) {
      push(
        { key: `a-${a.id}`, kind: "article", title: a.title, subtitle: a.categoryLabel ?? undefined, href: `/article/${a.articleNumber}` },
        score(term, a.title, [a.excerpt, a.subcategoryLabel, a.categoryLabel]),
      );
    }
    for (const f of foods.data ?? []) {
      push(
        { key: `f-${f.slug}`, kind: "food", title: shortName(f.name), subtitle: `${f.proteinG} g protein · ${f.kcal} kcal per 100 g`, href: `/food/${f.slug}` },
        score(term, f.name, [f.hindiName, f.category]),
      );
    }
    for (const e of exercises.data ?? []) {
      push(
        {
          key: `e-${e.id}`,
          kind: "exercise",
          title: e.title,
          subtitle: [MUSCLE_GROUP_LABEL[e.muscleGroup], ...e.equipment].filter(Boolean).join(" · "),
          href: `/exercise/${e.muscleGroup}/${e.slug}`,
        },
        score(term, e.title, [e.muscleGroup, ...e.primaryMuscles, ...e.equipment]),
      );
    }
    for (const r of recipes.data ?? []) {
      push(
        {
          key: `r-${r.id}`,
          kind: "recipe",
          title: r.title,
          subtitle: [mealLabel(r.mealType), r.proteinG != null ? `${r.proteinG} g protein` : null].filter(Boolean).join(" · "),
          href: `/recipe/${r.slug}`,
        },
        score(term, r.title, [r.excerpt, r.mealType, ...r.cuisineTags, ...r.ingredients]),
      );
    }
    for (const p of [...(programs.data?.pages ?? []), ...(reviews.data?.pages ?? [])]) {
      push(
        { key: `g-${p.id}`, kind: "guide", title: p.title, subtitle: KNOWLEDGE_SECTIONS[p.section]?.label, href: `/guides/${p.section}/${p.slug}` },
        score(term, p.title, [p.excerpt]),
      );
    }

    return KINDS.filter((k) => kind === "all" || k.id === kind)
      .map((k) => {
        const data = hits.filter((h) => h.kind === k.id).sort((x, y) => y.rank - x.rank);
        return { ...k, total: data.length, data: kind === "all" ? data.slice(0, PER_KIND) : data };
      })
      .filter((s) => s.data.length);
  }, [term, kind, articles.data, foods.data, exercises.data, recipes.data, programs.data, reviews.data]);

  const total = sections.reduce((n, s) => n + s.total, 0);

  const remember = (value: string) => {
    const v = value.trim();
    if (v.length < 2) return;
    setRecent(({ items }) => ({ items: [v, ...items.filter((x) => x.toLowerCase() !== v.toLowerCase())].slice(0, MAX_RECENT) }));
  };

  const open = (h: Hit) => {
    haptic.tap();
    remember(q);
    router.push(h.href);
  };

  const browse = (href: Href) => {
    haptic.tap();
    router.back();
    router.navigate(href);
  };

  const showIdle = term.length < 2;

  return (
    <View style={[styles.root, { paddingTop: insets.top + space.md }]}>
      <View style={styles.head}>
        <View style={styles.titleRow}>
          <Text style={styles.title} accessibilityRole="header" maxFontSizeMultiplier={1.3}>
            Search
          </Text>
          <Pressable onPress={() => router.back()} hitSlop={10} accessibilityRole="button">
            <Text variant="body" style={styles.cancel}>
              Cancel
            </Text>
          </Pressable>
        </View>
        <SearchInput
          value={q}
          onChangeText={setQ}
          placeholder="Try “protein”, “paneer” or “calorie deficit”"
          autoFocus
          onSubmitEditing={() => remember(q)}
        />
      </View>

      {!showIdle ? (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.kinds} style={styles.kindsWrap}>
          <Chip label="All" active={kind === "all"} onPress={() => setKind("all")} />
          {KINDS.map((k) => (
            <Chip key={k.id} label={k.label} active={kind === k.id} onPress={() => setKind(k.id)} />
          ))}
        </ScrollView>
      ) : null}

      {showIdle ? (
        <ScrollView contentContainerStyle={styles.idle} keyboardShouldPersistTaps="handled" keyboardDismissMode="on-drag">
          {recent.items.length ? (
            <View style={styles.block}>
              <View style={styles.blockHead}>
                <Text variant="heading" style={styles.blockTitle}>
                  Recent
                </Text>
                <Text variant="small" style={styles.underline} onPress={() => setRecent({ items: [] })} accessibilityRole="button">
                  Clear
                </Text>
              </View>
              {recent.items.map((r) => (
                <Pressable key={r} onPress={() => setQ(r)} style={styles.recent} accessibilityRole="button" accessibilityLabel={`Search ${r}`}>
                  <Ionicons name="time-outline" size={18} color={colors.subtle} />
                  <Text variant="body" style={styles.flex}>
                    {r}
                  </Text>
                  <Ionicons name="arrow-up-outline" size={16} color={colors.subtle} style={styles.recentArrow} />
                </Pressable>
              ))}
            </View>
          ) : null}

          <View style={styles.block}>
            <Text variant="heading" style={styles.blockTitle}>
              Popular searches
            </Text>
            <View style={styles.suggest}>
              {SUGGESTIONS.map((s) => (
                <Chip key={s} label={s} onPress={() => setQ(s)} />
              ))}
            </View>
          </View>

          <View style={styles.block}>
            <Text variant="heading" style={styles.blockTitle}>
              Or browse
            </Text>
            <View style={styles.browseList}>
              {KINDS.map((k, i) => (
                <Pressable
                  key={k.id}
                  onPress={() => browse(k.href)}
                  style={({ pressed }) => [styles.browse, i > 0 && styles.browseDivider, pressed && styles.pressed]}
                  accessibilityRole="link"
                >
                  <View style={styles.browseIcon}>
                    <Ionicons name={k.icon} size={18} color={colors.ink} />
                  </View>
                  <Text variant="body" style={styles.flex}>
                    {k.browse}
                  </Text>
                  <Ionicons name="arrow-forward" size={16} color={colors.ink} />
                </Pressable>
              ))}
            </View>
          </View>
        </ScrollView>
      ) : (
        <SectionList
          sections={sections}
          keyExtractor={(h) => h.key}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          stickySectionHeadersEnabled={false}
          contentContainerStyle={styles.list}
          ListHeaderComponent={
            total ? (
              <Text variant="small" accessibilityLiveRegion="polite">
                {total} {total === 1 ? "result" : "results"} for “{term}”
              </Text>
            ) : null
          }
          renderSectionHeader={({ section }) => (
            <View style={styles.sectionHead}>
              <Text style={styles.kindLabel}>{section.label}</Text>
              {kind === "all" && section.total > section.data.length ? (
                <Text variant="small" style={styles.underline} onPress={() => setKind(section.id)} accessibilityRole="button">
                  All {section.total}
                </Text>
              ) : null}
            </View>
          )}
          renderItem={({ item }) => (
            <Pressable onPress={() => open(item)} style={({ pressed }) => [styles.hit, pressed && styles.pressed]} accessibilityRole="link">
              <View style={styles.hitText}>
                <Text variant="heading" style={styles.hitTitle} numberOfLines={2}>
                  {item.title}
                </Text>
                {item.subtitle ? (
                  <Text variant="small" numberOfLines={2}>
                    {item.subtitle}
                  </Text>
                ) : null}
              </View>
              <Ionicons name="arrow-forward" size={16} color={colors.subtle} />
            </Pressable>
          )}
          ListEmptyComponent={
            loading ? (
              <EmptyState title="Searching…" />
            ) : (
              <EmptyState title={`No results for “${term}”`} hint="Try a simpler word, like “protein”, “dal” or “squat”." />
            )
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  flex: { flex: 1 },
  head: { gap: space.md, paddingHorizontal: space.lg },
  titleRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  title: { fontFamily: fonts.semibold, fontSize: 32, lineHeight: 37, letterSpacing: -1, color: colors.ink },
  cancel: { fontFamily: fonts.medium },
  kindsWrap: { flexGrow: 0, marginTop: space.md },
  kinds: { gap: space.sm, paddingHorizontal: space.lg },
  idle: { padding: space.lg, gap: space.xl, paddingBottom: layout.bottomClearance },
  block: { gap: space.sm },
  blockHead: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  blockTitle: { fontSize: 16 },
  underline: { color: colors.ink, textDecorationLine: "underline" },
  recent: { flexDirection: "row", alignItems: "center", gap: space.md, minHeight: 44 },
  recentArrow: { transform: [{ rotate: "-45deg" }] },
  suggest: { flexDirection: "row", flexWrap: "wrap", gap: space.sm },
  browseList: { borderRadius: radius.lg, borderWidth: 1, borderColor: colors.border, overflow: "hidden" },
  browse: { flexDirection: "row", alignItems: "center", gap: space.md, minHeight: 52, paddingHorizontal: space.md },
  browseDivider: { borderTopWidth: 1, borderTopColor: colors.border },
  browseIcon: {
    width: 32,
    height: 32,
    borderRadius: radius.sm,
    backgroundColor: colors.accentSoft,
    borderWidth: 1,
    borderColor: colors.accentBorder,
    alignItems: "center",
    justifyContent: "center",
  },
  list: { padding: space.lg, paddingBottom: layout.bottomClearance },
  sectionHead: { flexDirection: "row", alignItems: "center", gap: space.sm, marginTop: space.lg, marginBottom: space.xs },
  kindLabel: {
    flex: 1,
    fontFamily: fonts.semibold,
    fontSize: 12,
    letterSpacing: 0.8,
    textTransform: "uppercase",
    color: colors.muted,
  },
  hit: {
    flexDirection: "row",
    alignItems: "center",
    gap: space.md,
    paddingVertical: space.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  hitTitle: { fontSize: 16, lineHeight: 22 },
  pressed: { opacity: 0.6 },
  hitText: { flex: 1, gap: 2 },
});
