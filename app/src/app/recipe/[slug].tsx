import Ionicons from "@expo/vector-icons/Ionicons";
import { useQuery } from "@tanstack/react-query";
import { Image } from "expo-image";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Pressable, Share, StyleSheet, View } from "react-native";

import { fetchRecipe } from "@/api/library";
import { HtmlBody } from "@/components/HtmlBody";
import { KnowledgeDisclaimer, PageIntro } from "@/components/PageIntro";
import { PillButton } from "@/components/PillButton";
import { recipeMacros } from "@/components/RecipeCard";
import { Screen } from "@/components/Screen";
import { Skeleton } from "@/components/Skeleton";
import { ErrorState } from "@/components/States";
import { Text } from "@/components/Text";
import { SITE_URL } from "@/config";
import { haptic } from "@/lib/haptics";
import { recipeImage } from "@/lib/images";
import { openLink } from "@/lib/links";
import { mealLabel, scaleIngredient } from "@/lib/recipes";
import { colors, fonts, radius, space } from "@/theme";

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
    <View
      style={styles.stepper}
      accessibilityRole="adjustable"
      accessibilityLabel="Servings"
      accessibilityValue={{ min: 1, max: MAX_SERVINGS, now: value }}
      accessibilityActions={[{ name: "increment" }, { name: "decrement" }]}
      onAccessibilityAction={(e) => step(e.nativeEvent.actionName === "increment" ? 1 : -1)}
    >
      <Pressable
        onPress={() => step(-1)}
        hitSlop={8}
        accessibilityLabel="Fewer servings"
        style={styles.stepBtn}
        disabled={value <= 1}
      >
        <Ionicons name="remove" size={18} color={value <= 1 ? colors.subtle : colors.ink} />
      </Pressable>
      <Text style={styles.stepValue}>{value}</Text>
      <Pressable
        onPress={() => step(1)}
        hitSlop={8}
        accessibilityLabel="More servings"
        style={styles.stepBtn}
        disabled={value >= MAX_SERVINGS}
      >
        <Ionicons name="add" size={18} color={value >= MAX_SERVINGS ? colors.subtle : colors.ink} />
      </Pressable>
    </View>
  );
}

function SectionTitle({ children }: { children: string }) {
  return (
    <Text variant="title" style={styles.sectionTitle} accessibilityRole="header">
      {children}
    </Text>
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

  const r = query.data?.recipe;
  const webUrl = `${SITE_URL}${r?.path ?? `/recipes/${slug}`}`;
  const header = (
    <Stack.Screen
      options={{
        title: "",
        headerRight: () =>
          r ? (
            <Pressable
              onPress={() => Share.share({ message: `${r.title} — ${webUrl}` }).catch(() => {})}
              hitSlop={10}
              accessibilityRole="button"
              accessibilityLabel="Share recipe"
            >
              <Ionicons name="share-outline" size={22} color={colors.ink} />
            </Pressable>
          ) : null,
      }}
    />
  );

  if (query.isError) {
    return (
      <>
        {header}
        <ErrorState error={query.error} onRetry={() => query.refetch()} />
      </>
    );
  }

  if (!query.data) {
    return (
      <Screen>
        {header}
        <Skeleton height={14} width="50%" />
        <Skeleton height={36} width="85%" />
        <Skeleton height={180} rounded={radius.xl} />
        <Skeleton height={72} rounded={radius.lg} />
      </Screen>
    );
  }

  const { recipe, related } = query.data;
  const scaled = (v: number | null) => (v == null ? "—" : String(Math.round(v * servings)));
  const hasMacros = recipe.calories != null || recipe.proteinG != null;
  const macroCols: [string, string][] = [
    ["Calories", scaled(recipe.calories)],
    ["Protein", recipe.proteinG == null ? "—" : `${scaled(recipe.proteinG)} g`],
    ["Carbs", recipe.carbsG == null ? "—" : `${scaled(recipe.carbsG)} g`],
    ["Fat", recipe.fatG == null ? "—" : `${scaled(recipe.fatG)} g`],
  ];

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
    <Screen refreshing={query.isRefetching} onRefresh={() => query.refetch()}>
      {header}
      <PageIntro
        crumbs={[{ label: "Library", href: "/library" }, { label: "Recipes", href: "/recipes" }, { label: recipe.title }]}
        kicker={mealLabel(recipe.mealType) || undefined}
        title={recipe.title}
        lede={recipe.excerpt}
      />

      <View style={styles.figure}>
        <Image
          source={recipeImage(recipe.slug)}
          style={styles.image}
          contentFit="cover"
          transition={250}
          accessibilityLabel={`${recipe.title} (illustrative photo)`}
        />
        <Text variant="small" style={styles.caption}>
          Illustrative photo
        </Text>
      </View>

      {hasMacros ? (
        <View style={styles.macroCard}>
          <View style={styles.macroHead}>
            <View style={styles.flex}>
              <Text variant="heading">{servings === 1 ? "Per serving" : `For ${servings} servings`}</Text>
              <Text variant="small">Ingredients scale with servings.</Text>
            </View>
            <Stepper value={servings} onChange={setServings} />
          </View>
          <View style={styles.macroTable}>
            {macroCols.map(([k, v], i) => (
              <View key={k} style={[styles.macroCol, i > 0 && styles.macroColBorder]}>
                <Text style={styles.macroLabel}>{k}</Text>
                <Text style={styles.macroValue}>{v}</Text>
              </View>
            ))}
          </View>
        </View>
      ) : null}

      {recipe.quickAnswer ? (
        <View style={styles.quick}>
          <Text style={styles.quickLabel}>Quick answer</Text>
          <Text variant="body" style={styles.quickText}>
            {recipe.quickAnswer}
          </Text>
        </View>
      ) : null}

      {recipe.bodyHtml ? (
        <View style={styles.bodyWrap}>
          <HtmlBody html={recipe.bodyHtml} />
        </View>
      ) : null}

      {recipe.ingredients.length ? (
        <View style={styles.section}>
          <View style={styles.sectionHeadRow}>
            <SectionTitle>Ingredients</SectionTitle>
            {!hasMacros ? <Stepper value={servings} onChange={setServings} /> : null}
          </View>
          <Text variant="small">Tap an ingredient to tick it off.</Text>
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
                <Ionicons
                  name={done ? "checkmark-circle" : "ellipse-outline"}
                  size={22}
                  color={done ? colors.accent : colors.subtle}
                />
                <Text variant="body" style={[styles.flex, styles.ingredientText, done && styles.done]}>
                  {scaleIngredient(line, servings)}
                </Text>
              </Pressable>
            );
          })}
        </View>
      ) : null}

      {recipe.steps.length ? (
        <View style={styles.section}>
          <SectionTitle>Steps</SectionTitle>
          {recipe.steps.map((s, i) => (
            <View key={`${i}-${s}`} style={styles.step}>
              <View style={styles.stepNum}>
                <Text style={styles.stepNumText}>{i + 1}</Text>
              </View>
              <Text variant="body" style={[styles.flex, styles.stepText]}>
                {s}
              </Text>
            </View>
          ))}
        </View>
      ) : null}

      <View style={styles.pills}>
        <PillButton label="Protein guide" onPress={() => router.push("/hub/nutrition/protein")} style={styles.pill} />
        <PillButton
          label="Calorie calculator"
          variant="ghost"
          onPress={() => router.push("/calculator/calorie")}
          style={styles.pill}
        />
      </View>

      {related.length ? (
        <View style={styles.section}>
          <SectionTitle>More recipes</SectionTitle>
          {related.map((x) => (
            <Pressable
              key={x.id}
              onPress={() => router.push(`/recipe/${x.slug}`)}
              accessibilityRole="link"
              style={({ pressed }) => [styles.related, pressed && styles.relatedPressed]}
            >
              <View style={styles.flex}>
                <Text variant="body" style={styles.relatedTitle}>
                  {x.title}
                </Text>
                {recipeMacros(x) ? <Text variant="small">{recipeMacros(x)}</Text> : null}
              </View>
              <Ionicons name="arrow-forward" size={15} color={colors.muted} />
            </Pressable>
          ))}
        </View>
      ) : null}

      <KnowledgeDisclaimer />
      <Text variant="small" style={styles.note}>
        Macros are estimates; check labels for allergens and brand differences.
      </Text>

      <Pressable onPress={() => openLink(webUrl)} accessibilityRole="link" style={styles.webLink}>
        <Ionicons name="globe-outline" size={14} color={colors.muted} />
        <Text variant="small">View on fitlives.in</Text>
      </Pressable>
    </Screen>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  figure: { borderRadius: radius.xl, borderWidth: 1, borderColor: colors.border, overflow: "hidden" },
  image: { width: "100%", aspectRatio: 16 / 10, backgroundColor: colors.surface },
  caption: { textAlign: "center", fontSize: 12, paddingVertical: space.sm, backgroundColor: colors.surface },
  macroCard: { gap: space.md, padding: space.lg, borderRadius: radius.xl, borderWidth: 1, borderColor: colors.border },
  macroHead: { flexDirection: "row", alignItems: "center", gap: space.md },
  macroTable: { flexDirection: "row", borderRadius: radius.md, borderWidth: 1, borderColor: colors.border, overflow: "hidden" },
  macroCol: { flex: 1, alignItems: "center", gap: 2, paddingVertical: space.md },
  macroColBorder: { borderLeftWidth: 1, borderLeftColor: colors.border },
  macroLabel: {
    fontFamily: fonts.medium,
    fontSize: 10.5,
    letterSpacing: 0.5,
    textTransform: "uppercase",
    color: colors.muted,
  },
  macroValue: { fontFamily: fonts.semibold, fontSize: 17, color: colors.ink, fontVariant: ["tabular-nums"] },
  stepper: {
    flexDirection: "row",
    alignItems: "center",
    gap: space.xs,
    backgroundColor: colors.surface,
    borderRadius: radius.pill,
    padding: 3,
  },
  stepBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.bg,
    alignItems: "center",
    justifyContent: "center",
  },
  stepValue: { minWidth: 22, textAlign: "center", fontFamily: fonts.semibold, fontSize: 16, color: colors.ink },
  quick: {
    gap: space.sm,
    padding: space.lg,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: "rgba(245,245,245,0.4)",
  },
  quickLabel: {
    fontFamily: fonts.semibold,
    fontSize: 12,
    letterSpacing: 0.6,
    textTransform: "uppercase",
    color: colors.muted,
  },
  quickText: { fontSize: 16, lineHeight: 25 },
  bodyWrap: { marginHorizontal: -space.lg },
  section: { gap: space.md },
  sectionHeadRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: space.md },
  sectionTitle: { fontSize: 21, lineHeight: 27 },
  ingredient: { flexDirection: "row", alignItems: "center", gap: space.md, minHeight: 40 },
  ingredientText: { color: colors.ink },
  done: { color: colors.subtle, textDecorationLine: "line-through" },
  step: { flexDirection: "row", gap: space.md, alignItems: "flex-start" },
  stepNum: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: colors.ink,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 1,
  },
  stepNumText: { fontFamily: fonts.semibold, fontSize: 12, color: colors.accent },
  stepText: { color: colors.muted, lineHeight: 23 },
  pills: { flexDirection: "row", flexWrap: "wrap", gap: space.sm },
  pill: { minHeight: 40, paddingHorizontal: space.lg },
  related: {
    flexDirection: "row",
    alignItems: "center",
    gap: space.md,
    minHeight: 56,
    paddingHorizontal: space.lg,
    paddingVertical: space.sm,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  relatedPressed: { borderColor: colors.accent },
  relatedTitle: { fontFamily: fonts.medium },
  note: { textAlign: "center", lineHeight: 19 },
  webLink: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 6, paddingVertical: space.sm },
});
