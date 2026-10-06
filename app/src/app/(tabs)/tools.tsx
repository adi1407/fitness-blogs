import Ionicons from "@expo/vector-icons/Ionicons";
import { router, type Href } from "expo-router";
import { useRef } from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ClarityBand } from "@/components/ClarityBand";
import { Screen } from "@/components/Screen";
import { SectionHeader } from "@/components/SectionHeader";
import { Text } from "@/components/Text";
import { ToolCard } from "@/components/ToolTile";
import { haptic } from "@/lib/haptics";
import { TOOL_GUIDE, TOOL_SECTIONS, TOOLS, toolById } from "@/lib/tools";
import { colors, fonts, radius, space } from "@/theme";

const GUIDE_ID = "which-calculator";

function InlineLink({ label, href }: { label: string; href: Href }) {
  return (
    <Text style={styles.inlineLink} onPress={() => router.push(href)} accessibilityRole="link" suppressHighlighting>
      {label}
    </Text>
  );
}

export default function CalculatorsScreen() {
  const scrollRef = useRef<ScrollView>(null);
  const offsets = useRef<Record<string, number>>({});

  const jumpTo = (id: string) => {
    const y = offsets.current[id];
    if (y == null) return;
    haptic.tap();
    scrollRef.current?.scrollTo({ y: Math.max(0, y - space.md), animated: true });
  };

  const track = (id: string) => (e: { nativeEvent: { layout: { y: number } } }) => {
    offsets.current[id] = e.nativeEvent.layout.y;
  };

  const jumps = [...TOOL_SECTIONS.map((s) => ({ id: s.id, label: s.heading })), { id: GUIDE_ID, label: "Which one do I need?" }];

  return (
    <Screen ref={scrollRef}>
      <Animated.View entering={FadeInDown.duration(420)} style={styles.intro}>
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Calculators" }]} />
        <Text style={styles.title} accessibilityRole="header" maxFontSizeMultiplier={1.3}>
          Free fitness calculators
        </Text>
        <Text variant="body" style={styles.lede}>
          Quick, evidence-based numbers for calories, protein, body composition and training — with Indian food
          context and the method behind every formula. Free, no sign-in needed.
        </Text>
        <View style={styles.stats}>
          <View style={styles.stat}>
            <Text style={styles.statValue}>{TOOLS.length}</Text>
            <Text variant="small">calculators</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.stat}>
            <Text style={styles.statValue}>Free</Text>
            <Text variant="small">no sign-in</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.stat}>
            <Text style={styles.statValue}>Cited</Text>
            <Text variant="small">methods</Text>
          </View>
        </View>
      </Animated.View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.jumpRail}
        contentContainerStyle={styles.jumps}
      >
        {jumps.map((j) => (
          <Pressable
            key={j.id}
            onPress={() => jumpTo(j.id)}
            accessibilityRole="button"
            accessibilityLabel={`Jump to ${j.label}`}
            style={({ pressed }) => [styles.jump, pressed && styles.jumpPressed]}
          >
            <Text style={styles.jumpText}>{j.label}</Text>
          </Pressable>
        ))}
      </ScrollView>

      {TOOL_SECTIONS.map((section, si) => (
        <Animated.View
          key={section.id}
          onLayout={track(section.id)}
          entering={FadeInDown.delay(80 + si * 70).duration(380)}
          style={styles.section}
        >
          <SectionHeader title={section.heading} subtitle={section.blurb} />
          <View style={styles.cards}>
            {section.tools.map((id) => (
              <ToolCard key={id} tool={toolById(id)} />
            ))}
          </View>
        </Animated.View>
      ))}

      <View onLayout={track(GUIDE_ID)} style={styles.section}>
        <SectionHeader title="Which calculator do I need?" subtitle="Start from your question." />
        <View style={styles.table}>
          <View style={[styles.tr, styles.thead]}>
            <Text style={[styles.th, styles.colQuestion]}>Your question</Text>
            <Text style={styles.th}>Use</Text>
          </View>
          {TOOL_GUIDE.map((row, i) => {
            const tool = toolById(row.tool);
            const name = tool.title.replace(/ calculator$/i, "");
            return (
              <Pressable
                key={row.goal}
                onPress={() => {
                  haptic.tap();
                  router.push(`/calculator/${tool.id}`);
                }}
                accessibilityRole="link"
                accessibilityLabel={`${row.goal} Use the ${tool.title}`}
                style={({ pressed }) => [styles.tr, i > 0 && styles.trBorder, pressed && styles.trPressed]}
              >
                <Text variant="small" style={[styles.td, styles.colQuestion]}>
                  {row.goal}
                </Text>
                <View style={styles.use}>
                  <Text style={styles.useText} numberOfLines={2}>
                    {name}
                  </Text>
                  <Ionicons name="arrow-forward" size={13} color={colors.ink} />
                </View>
              </Pressable>
            );
          })}
        </View>
        <Text variant="small" style={styles.starter}>
          New to this? Most people start with the <InlineLink label="calorie calculator" href="/calculator/calorie" /> and{" "}
          <InlineLink label="protein calculator" href="/calculator/protein" />, then read the guides to{" "}
          <InlineLink label="weight loss" href="/hub/weight-loss" /> and{" "}
          <InlineLink label="muscle building" href="/hub/muscle-building" />. All results are educational estimates —
          speak to a qualified professional if you have a medical condition.
        </Text>
      </View>

      <ClarityBand />
    </Screen>
  );
}

const styles = StyleSheet.create({
  intro: { gap: space.md, paddingTop: space.sm },
  title: { fontFamily: fonts.semibold, fontSize: 34, lineHeight: 39, letterSpacing: -1.1, color: colors.ink },
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
  stat: { flex: 1, alignItems: "center", gap: 1 },
  statValue: { fontFamily: fonts.bold, fontSize: 22, lineHeight: 27, letterSpacing: -0.5, color: colors.ink },
  statDivider: { width: 1, height: 28, backgroundColor: colors.border },
  jumpRail: { marginHorizontal: -space.lg, marginTop: -space.sm },
  jumps: { paddingHorizontal: space.lg, gap: space.sm },
  jump: {
    paddingHorizontal: space.lg,
    paddingVertical: space.sm,
    minHeight: 38,
    justifyContent: "center",
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.bg,
  },
  jumpPressed: { borderColor: colors.accent },
  jumpText: { fontFamily: fonts.semibold, fontSize: 13, color: colors.ink },
  section: { gap: space.lg },
  cards: { gap: space.md },
  table: { borderRadius: radius.lg, borderWidth: 1, borderColor: colors.border, overflow: "hidden" },
  tr: { flexDirection: "row", alignItems: "center", gap: space.md, paddingHorizontal: space.md, paddingVertical: 11 },
  thead: { backgroundColor: colors.surface },
  trBorder: { borderTopWidth: 1, borderTopColor: colors.border },
  trPressed: { backgroundColor: colors.accentSoft },
  th: { fontFamily: fonts.semibold, fontSize: 13, color: colors.ink, width: 112 },
  colQuestion: { flex: 1, width: undefined },
  td: { color: "#3D3D3D", lineHeight: 19 },
  use: { width: 112, flexDirection: "row", alignItems: "center", gap: 4 },
  useText: { flexShrink: 1, fontFamily: fonts.semibold, fontSize: 13, lineHeight: 17, color: colors.ink },
  starter: { lineHeight: 20 },
  inlineLink: { fontFamily: fonts.semibold, fontSize: 13, lineHeight: 20, color: colors.ink, textDecorationLine: "underline" },
});
