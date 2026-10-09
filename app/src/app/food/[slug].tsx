import Ionicons from "@expo/vector-icons/Ionicons";
import { useQuery } from "@tanstack/react-query";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { useMemo } from "react";
import { Pressable, StyleSheet, View } from "react-native";

import { DIET_LABEL, FOOD_CATEGORY_LABEL, fetchFood, type Food } from "@/api/foods";
import { Accordion } from "@/components/Accordion";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FoodCard } from "@/components/FoodCard";
import { Screen } from "@/components/Screen";
import { ServingCalculator } from "@/components/ServingCalculator";
import { Skeleton } from "@/components/Skeleton";
import { ErrorState } from "@/components/States";
import { Text } from "@/components/Text";
import { SITE_URL } from "@/config";
import { FOOD_CALCULATORS, FOOD_CATEGORY_GUIDES } from "@/lib/guideLinks";
import { openLink } from "@/lib/links";
import { forGrams, formatG, goalNotes, isHighProtein, proteinPer100Kcal, shortName } from "@/lib/nutrition";
import { toolById } from "@/lib/tools";
import { colors, fonts, radius, space } from "@/theme";

const IFCT_URL = "https://www.nin.res.in/ebooks/IFCT2017.pdf";

function faqFor(food: Food) {
  const name = shortName(food.name);
  const lower = name.toLowerCase();
  const per100 = forGrams(food, 100);
  const notes = goalNotes(food);
  const items = food.servings
    .filter((s) => !/^100 g/.test(s.label))
    .slice(0, 2)
    .map((s) => {
      const n = forGrams(food, s.grams);
      return {
        question: `How many calories are in ${lower} (${s.label.replace(/\s*\(.*\)$/, "")})?`,
        answer: `${name}, ${s.label}: about ${n.kcal} kcal, with ${formatG(n.proteinG)} protein, ${formatG(n.carbsG)} carbohydrate and ${formatG(n.fatG)} fat.`,
      };
    });
  items.push({
    question: `How much protein is in 100 g of ${lower}?`,
    answer: `100 g of ${food.basisLabel} has about ${formatG(per100.proteinG)} protein and ${per100.kcal} kcal — roughly ${proteinPer100Kcal(food)} g of protein per 100 kcal.`,
  });
  items.push({ question: `Is ${lower} good for weight loss?`, answer: notes.weightLoss });
  items.push({ question: `Is ${lower} good for muscle building?`, answer: notes.muscle });
  return items;
}

function Table({ rows, head }: { rows: string[][]; head?: string[] }) {
  return (
    <View style={styles.table}>
      {head ? (
        <View style={[styles.tr, styles.thead]}>
          {head.map((h, i) => (
            <Text key={`${h}-${i}`} style={[styles.th, i === 0 ? styles.colKey : styles.colVal]} numberOfLines={2}>
              {h}
            </Text>
          ))}
        </View>
      ) : null}
      {rows.map((r, ri) => (
        <View key={r[0]} style={[styles.tr, (head || ri > 0) && styles.trBorder]}>
          {r.map((c, i) => (
            <Text
              key={`${c}-${i}`}
              variant="body"
              style={i === 0 ? [styles.colKey, styles.tdKey] : [styles.colVal, styles.tdVal]}
            >
              {c}
            </Text>
          ))}
        </View>
      ))}
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

export default function FoodScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const query = useQuery({
    queryKey: ["food", slug],
    queryFn: ({ signal }) => fetchFood(String(slug), signal),
    enabled: !!slug,
  });

  const data = query.data;
  const derived = useMemo(() => {
    if (!data) return null;
    const f = data.food;
    const serving = f.servings[0] ?? f.defaultServing ?? { label: "100 g", grams: 100 };
    return {
      serving,
      n: forGrams(f, serving.grams),
      per100: forGrams(f, 100),
      notes: goalNotes(f),
      faq: faqFor(f),
      highProtein: isHighProtein(f),
    };
  }, [data]);

  if (query.isError) {
    return (
      <>
        <Stack.Screen options={{ title: "" }} />
        <ErrorState error={query.error} onRetry={() => query.refetch()} />
      </>
    );
  }

  if (!data || !derived) {
    return (
      <Screen>
        <Stack.Screen options={{ title: "" }} />
        <Skeleton height={14} width="60%" />
        <Skeleton height={36} width="85%" />
        <Skeleton height={96} rounded={radius.lg} />
        <Skeleton height={320} rounded={radius.xl} />
      </Screen>
    );
  }

  const { food: f, compare, related } = data;
  const { serving, n, per100, notes, faq, highProtein } = derived;
  const name = shortName(f.name);
  const guides = FOOD_CATEGORY_GUIDES[f.category] ?? [];
  const calculators = (highProtein ? FOOD_CALCULATORS.protein : FOOD_CALCULATORS.energy).map(toolById);
  const updated = new Date(f.updatedAt);

  const per100Rows: string[][] = [
    ["Calories", `${per100.kcal} kcal`],
    ["Protein", formatG(per100.proteinG)],
    ["Carbohydrates", formatG(per100.carbsG)],
    ["Fat", formatG(per100.fatG)],
    ["Fibre", formatG(per100.fiberG)],
    ...(f.calciumMg != null ? [["Calcium", `${Math.round(f.calciumMg)} mg`]] : []),
    ...(f.ironMg != null ? [["Iron", `${f.ironMg.toFixed(1)} mg`]] : []),
  ];

  const compareRows = (other: Food): string[][] => {
    const a = forGrams(f, 100);
    const b = forGrams(other, 100);
    return [
      ["Calories", `${a.kcal} kcal`, `${b.kcal} kcal`],
      ["Protein", formatG(a.proteinG), formatG(b.proteinG)],
      ["Carbs", formatG(a.carbsG), formatG(b.carbsG)],
      ["Fat", formatG(a.fatG), formatG(b.fatG)],
      ["Fibre", formatG(a.fiberG), formatG(b.fiberG)],
      ["Protein / 100 kcal", formatG(proteinPer100Kcal(f)), formatG(proteinPer100Kcal(other))],
    ];
  };

  return (
    <Screen refreshing={query.isRefetching} onRefresh={() => query.refetch()}>
      <Stack.Screen options={{ title: "" }} />

      <View style={styles.intro}>
        <Breadcrumbs
          items={[{ label: "Library", href: "/library" }, { label: "Indian foods", href: "/foods" }, { label: name }]}
        />
        <Text style={styles.kicker}>
          {FOOD_CATEGORY_LABEL[f.category] ?? "Food"} · {DIET_LABEL[f.diet]}
        </Text>
        <Text style={styles.title} accessibilityRole="header" maxFontSizeMultiplier={1.3}>
          {name} calories & nutrition
        </Text>
        {f.hindiName ? (
          <Text variant="body" style={styles.hindi}>
            {f.hindiName}
          </Text>
        ) : null}
      </View>

      <View style={styles.quick} accessibilityLabel="Quick answer">
        <Text style={styles.quickLabel}>Quick answer</Text>
        <Text variant="body" style={styles.quickText}>
          {name}, <Text style={styles.strong}>{serving.label}</Text>: about{" "}
          <Text style={styles.strong}>{n.kcal} kcal</Text>, {formatG(n.proteinG)} protein, {formatG(n.carbsG)} carbs
          and {formatG(n.fatG)} fat. Per 100 g ({f.basisLabel}): {per100.kcal} kcal and {formatG(per100.proteinG)}{" "}
          protein.
        </Text>
      </View>

      {f.intro ? (
        <Text variant="body" style={styles.introText}>
          {f.intro}
        </Text>
      ) : null}

      <ServingCalculator food={f} />

      <View style={styles.section}>
        <View style={styles.sectionHead}>
          <SectionTitle>Nutrition per 100 g</SectionTitle>
          <Text variant="small">For {f.basisLabel}.</Text>
        </View>
        <Table rows={per100Rows} />
      </View>

      <View style={styles.section}>
        <SectionTitle>{`Is ${name.toLowerCase()} good for your goals?`}</SectionTitle>
        {[
          { title: "Weight loss", text: notes.weightLoss },
          { title: "Muscle building", text: notes.muscle },
        ].map((g) => (
          <View key={g.title} style={styles.goal}>
            <Text variant="heading">{g.title}</Text>
            <Text variant="small" style={styles.goalText}>
              {g.text}
            </Text>
          </View>
        ))}
        {f.tips.length ? (
          <View style={styles.tips}>
            {f.tips.map((t) => (
              <View key={t} style={styles.tip}>
                <View style={styles.bullet} />
                <Text variant="body" style={styles.tipText}>
                  {t}
                </Text>
              </View>
            ))}
          </View>
        ) : null}
      </View>

      <View style={styles.calcCard}>
        <Text style={styles.calcTitle}>How much should you eat?</Text>
        <Text variant="small" style={styles.calcText}>
          {highProtein
            ? `Find your daily protein target, then see how much ${name.toLowerCase()} helps you hit it.`
            : "Work out your daily calories, then fit your favourite foods around them."}
        </Text>
        <View style={styles.calcList}>
          {calculators.map((c) => (
            <Pressable
              key={c.id}
              onPress={() => router.push(`/calculator/${c.id}`)}
              accessibilityRole="link"
              style={({ pressed }) => [styles.calcLink, pressed && styles.calcLinkPressed]}
            >
              <Text style={styles.calcLinkText}>{c.title}</Text>
              <Ionicons name="arrow-forward" size={16} color={colors.bg} />
            </Pressable>
          ))}
        </View>
      </View>

      {compare ? (
        <View style={styles.section}>
          <SectionTitle>{`${name} vs ${shortName(compare.name).toLowerCase()}`}</SectionTitle>
          <Text variant="small">
            Per 100 g ({f.basisLabel} vs {compare.basisLabel})
          </Text>
          <Table head={["Nutrient", name, shortName(compare.name)]} rows={compareRows(compare)} />
          <Text
            style={styles.link}
            onPress={() => router.push({ pathname: "/compare", params: { a: f.slug, b: compare.slug } })}
            accessibilityRole="link"
            suppressHighlighting
          >
            Compare with another food
          </Text>
        </View>
      ) : (
        <Text
          style={styles.link}
          onPress={() => router.push({ pathname: "/compare", params: { a: f.slug } })}
          accessibilityRole="link"
          suppressHighlighting
        >
          Compare {name.toLowerCase()} with another food
        </Text>
      )}

      <View style={styles.section}>
        <View style={styles.sectionHead}>
          <SectionTitle>Frequently asked questions</SectionTitle>
          <Text variant="small">Answers calculated from {f.source} values. Educational information only.</Text>
        </View>
        <View style={styles.faqList}>
          {faq.map((q) => (
            <Accordion key={q.question} title={q.question}>
              <Text variant="body" style={styles.answer}>
                {q.answer}
              </Text>
            </Accordion>
          ))}
        </View>
      </View>

      {guides.length ? (
        <View style={styles.guides}>
          <Text variant="heading">Related guides</Text>
          {guides.map((g) => (
            <Text
              key={g.url}
              style={styles.guideLink}
              onPress={() => openLink(g.url)}
              accessibilityRole="link"
              suppressHighlighting
            >
              {g.title}
            </Text>
          ))}
        </View>
      ) : null}

      <View style={styles.sourceCard}>
        <Text variant="heading">Source & method</Text>
        <Text variant="small" style={styles.sourceText}>
          Values per 100 g are from the{" "}
          <Text style={styles.inlineLink} onPress={() => openLink(IFCT_URL)} accessibilityRole="link" suppressHighlighting>
            Indian Food Composition Tables 2017
          </Text>{" "}
          (ICMR–National Institute of Nutrition, Hyderabad)
          {f.sourceRef ? `, food code ${f.sourceRef}${f.sourceName ? ` “${f.sourceName}”` : ""}` : ""}. Serving
          values are calculated from those figures; serving weights are typical household measures.
        </Text>
        {f.sourceNote ? (
          <Text variant="small" style={styles.sourceText}>
            {f.sourceNote}
          </Text>
        ) : null}
        <Text variant="small" style={styles.updated}>
          {Number.isNaN(updated.getTime())
            ? ""
            : `Last updated ${updated.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}. `}
          Values vary with variety, brand and cooking. Not medical advice —{" "}
          <Text
            style={styles.inlineLink}
            onPress={() => openLink(`${SITE_URL}/nutrition-disclaimer`)}
            accessibilityRole="link"
            suppressHighlighting
          >
            nutrition disclaimer
          </Text>
          .
        </Text>
      </View>

      {related.length ? (
        <View style={styles.section}>
          <SectionTitle>Related foods</SectionTitle>
          <View style={styles.related}>
            {related.map((r) => (
              <FoodCard key={r.slug} food={r} />
            ))}
          </View>
          <Text style={styles.link} onPress={() => router.navigate("/foods")} accessibilityRole="link" suppressHighlighting>
            Browse all Indian foods →
          </Text>
        </View>
      ) : null}
    </Screen>
  );
}

const styles = StyleSheet.create({
  intro: { gap: space.sm, paddingTop: space.sm },
  kicker: {
    fontFamily: fonts.semibold,
    fontSize: 12.5,
    letterSpacing: 0.6,
    textTransform: "uppercase",
    color: colors.accent,
    marginTop: space.sm,
  },
  title: { fontFamily: fonts.semibold, fontSize: 32, lineHeight: 37, letterSpacing: -1, color: colors.ink },
  hindi: { color: colors.muted, fontSize: 17 },
  quick: {
    gap: 4,
    paddingHorizontal: space.lg,
    paddingVertical: space.md,
    borderLeftWidth: 4,
    borderLeftColor: colors.accent,
    borderRadius: radius.lg,
    backgroundColor: "#FFF8E1",
  },
  quickLabel: {
    fontFamily: fonts.semibold,
    fontSize: 11.5,
    letterSpacing: 0.6,
    textTransform: "uppercase",
    color: "rgba(10,10,10,0.7)",
  },
  quickText: { fontSize: 16.5, lineHeight: 26 },
  strong: { fontFamily: fonts.semibold },
  introText: { color: "rgba(10,10,10,0.8)", fontSize: 16.5, lineHeight: 26 },
  section: { gap: space.md },
  sectionHead: { gap: 2 },
  sectionTitle: { fontSize: 21, lineHeight: 27 },
  table: { borderWidth: 1, borderColor: colors.border, borderRadius: radius.lg, overflow: "hidden" },
  tr: { flexDirection: "row", alignItems: "center", gap: space.sm, paddingHorizontal: space.md, paddingVertical: 10 },
  thead: { backgroundColor: colors.surface },
  trBorder: { borderTopWidth: 1, borderTopColor: colors.border },
  th: { fontFamily: fonts.semibold, fontSize: 13, color: colors.ink },
  colKey: { flex: 1.3 },
  colVal: { flex: 1, textAlign: "right" },
  tdKey: { fontFamily: fonts.medium, fontSize: 14 },
  tdVal: { fontSize: 14, color: colors.muted, fontVariant: ["tabular-nums"] },
  goal: { gap: space.xs, padding: space.lg, borderRadius: radius.lg, borderWidth: 1, borderColor: colors.border },
  goalText: { color: "rgba(10,10,10,0.8)", lineHeight: 20 },
  tips: { gap: space.sm, marginTop: space.xs },
  tip: { flexDirection: "row", gap: space.md, alignItems: "flex-start" },
  bullet: { width: 6, height: 6, borderRadius: 3, backgroundColor: colors.accent, marginTop: 9 },
  tipText: { flex: 1, color: "rgba(10,10,10,0.8)" },
  calcCard: { gap: space.sm, padding: space.lg, borderRadius: radius.xl, backgroundColor: colors.ink },
  calcTitle: { fontFamily: fonts.semibold, fontSize: 15, color: colors.bg },
  calcText: { color: "rgba(255,255,255,0.7)", lineHeight: 19 },
  calcList: { gap: space.sm, marginTop: space.sm },
  calcLink: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    minHeight: 44,
    paddingHorizontal: space.md,
    borderRadius: radius.md,
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  calcLinkPressed: { backgroundColor: "rgba(255,255,255,0.2)" },
  calcLinkText: { fontFamily: fonts.semibold, fontSize: 14, color: colors.bg },
  link: { fontFamily: fonts.semibold, fontSize: 14, color: colors.ink, textDecorationLine: "underline", textDecorationColor: colors.accent },
  faqList: { gap: space.sm },
  answer: { color: colors.muted, lineHeight: 24 },
  guides: { gap: space.sm, padding: space.lg, borderRadius: radius.xl, borderWidth: 1, borderColor: colors.border },
  guideLink: {
    fontFamily: fonts.medium,
    fontSize: 14,
    lineHeight: 21,
    color: colors.ink,
    textDecorationLine: "underline",
    textDecorationColor: colors.accent,
  },
  sourceCard: {
    gap: space.sm,
    padding: space.lg,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: "rgba(245,245,245,0.5)",
  },
  sourceText: { color: "rgba(10,10,10,0.8)", lineHeight: 20 },
  inlineLink: { fontFamily: fonts.semibold, color: colors.ink, textDecorationLine: "underline" },
  updated: { fontSize: 12, lineHeight: 18 },
  related: { gap: space.md },
});
