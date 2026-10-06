import Ionicons from "@expo/vector-icons/Ionicons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { useState, type ComponentType } from "react";
import { ActivityIndicator, KeyboardAvoidingView, Platform, Pressable, StyleSheet, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

import { saveCalcResult } from "@/api/member";
import { BmiCalculator } from "@/calculators/BmiCalculator";
import { BmrCalculator } from "@/calculators/BmrCalculator";
import { BodyFatCalculator } from "@/calculators/BodyFatCalculator";
import { CalorieCalculator } from "@/calculators/CalorieCalculator";
import { DeficitCalculator } from "@/calculators/DeficitCalculator";
import { MacroCalculator } from "@/calculators/MacroCalculator";
import { OneRepMaxCalculator } from "@/calculators/OneRepMaxCalculator";
import { ProteinCalculator } from "@/calculators/ProteinCalculator";
import { StepsCalculator } from "@/calculators/StepsCalculator";
import { TdeeCalculator } from "@/calculators/TdeeCalculator";
import { CalcResultContext, type ReportedResult } from "@/calculators/ui";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { WaterCalculator } from "@/calculators/WaterCalculator";
import { PressableScale } from "@/components/PressableScale";
import { Screen } from "@/components/Screen";
import { EmptyState } from "@/components/States";
import { Text } from "@/components/Text";
import { useToast } from "@/components/Toast";
import { SITE_URL } from "@/config";
import { useAuth } from "@/lib/auth";
import { haptic } from "@/lib/haptics";
import { openLink } from "@/lib/links";
import { TOOL_SECTIONS, TOOLS, isToolId, toolById, type ToolId, type ToolMeta } from "@/lib/tools";
import { colors, fonts, radius, shadow, space } from "@/theme";

const CALCULATORS: Record<ToolId, ComponentType> = {
  calorie: CalorieCalculator,
  deficit: DeficitCalculator,
  tdee: TdeeCalculator,
  bmr: BmrCalculator,
  macro: MacroCalculator,
  protein: ProteinCalculator,
  bmi: BmiCalculator,
  "body-fat": BodyFatCalculator,
  water: WaterCalculator,
  "one-rep-max": OneRepMaxCalculator,
  steps: StepsCalculator,
};

const RELATED_COUNT = 4;

/** Same-section calculators first, topped up from the rest of the list. */
function relatedTools(id: ToolId): ToolMeta[] {
  const section = TOOL_SECTIONS.find((s) => s.tools.includes(id));
  const ordered = [...(section?.tools ?? []), ...TOOLS.map((t) => t.id)];
  return [...new Set(ordered)]
    .filter((t) => t !== id)
    .slice(0, RELATED_COUNT)
    .map(toolById);
}

function SaveResult({ meta, result }: { meta: ToolMeta; result: ReportedResult }) {
  const { token, handleUnauthorized } = useAuth();
  const queryClient = useQueryClient();
  const toast = useToast();
  const [savedKey, setSavedKey] = useState<string | null>(null);
  const key = `${result.label}:${result.value}`;

  const save = useMutation({
    mutationFn: () =>
      saveCalcResult(
        {
          tool: meta.webPath.replace(/^\//, ""),
          inputs: {},
          result: { label: result.label, value: result.value, ...(result.unit ? { unit: result.unit } : {}) },
        },
        token!,
      ),
    onSuccess: () => {
      setSavedKey(key);
      toast("Saved to your account", "success");
      queryClient.invalidateQueries({ queryKey: ["me", "calc-results"] });
    },
    onError: (err) => {
      handleUnauthorized(err);
      toast("Couldn't save this result. Try again.", "error");
    },
  });

  if (!token) return null;
  const saved = savedKey === key;

  return (
    <PressableScale
      onPress={() => !saved && !save.isPending && save.mutate()}
      accessibilityLabel={saved ? "Result saved" : "Save result to account"}
      style={[styles.save, saved && styles.saved]}
    >
      {save.isPending ? (
        <ActivityIndicator color={colors.bg} />
      ) : (
        <Ionicons name={saved ? "checkmark-circle" : "bookmark-outline"} size={18} color={saved ? colors.ink : colors.bg} />
      )}
      <Text style={[styles.saveText, saved && styles.savedText]}>{saved ? "Saved to account" : "Save this result"}</Text>
    </PressableScale>
  );
}

function LinkCard({ title, description, onPress, external }: { title: string; description?: string; onPress: () => void; external?: boolean }) {
  return (
    <Pressable
      onPress={() => {
        haptic.tap();
        onPress();
      }}
      accessibilityRole="link"
      accessibilityLabel={title}
      style={({ pressed }) => [styles.linkCard, pressed && styles.linkCardPressed]}
    >
      <View style={styles.linkBody}>
        <Text style={styles.linkTitle}>{title}</Text>
        {description ? (
          <Text variant="small" style={styles.linkDesc} numberOfLines={2}>
            {description}
          </Text>
        ) : null}
      </View>
      <Ionicons name={external ? "open-outline" : "arrow-forward"} size={16} color={colors.muted} />
    </Pressable>
  );
}

export default function CalculatorScreen() {
  const { tool } = useLocalSearchParams<{ tool: string }>();
  const { member } = useAuth();
  const [result, setResult] = useState<ReportedResult | null>(null);
  if (!isToolId(tool)) return <EmptyState title="Calculator not found" />;

  const meta = toolById(tool);
  const Calculator = CALCULATORS[tool];
  const related = relatedTools(tool);

  return (
    <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <Stack.Screen options={{ title: "" }} />
      <Screen>
        <Animated.View entering={FadeInDown.duration(380)} style={styles.intro}>
          <Breadcrumbs items={[{ label: "Calculators", href: "/tools" }, { label: meta.title }]} />
          <Text style={styles.title} accessibilityRole="header" maxFontSizeMultiplier={1.3}>
            {meta.title}
          </Text>
          <Text variant="body" style={styles.lede}>
            {meta.blurb}
          </Text>
          <Text style={styles.byline}>By the fitlives editorial team · Educational estimate, same method as fitlives.in</Text>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(80).duration(380)} style={styles.workspace}>
          <View style={styles.workspaceHead}>
            <View style={styles.workspaceIcon}>
              <Ionicons name={meta.icon} size={18} color={colors.ink} />
            </View>
            <Text style={styles.workspaceTitle} numberOfLines={1}>
              {meta.title.replace(/ calculator$/i, "")}
            </Text>
            <View style={styles.pill}>
              <Text style={styles.pillText} numberOfLines={1}>
                {member ? `Signed in as ${member.name.split(" ")[0]}` : "Free · no sign-in"}
              </Text>
            </View>
          </View>
          <View style={styles.workspaceBody}>
            <CalcResultContext.Provider value={setResult}>
              <Calculator />
            </CalcResultContext.Provider>
            {result ? <SaveResult meta={meta} result={result} /> : null}
            <Text style={styles.fineprint}>
              This calculator gives an estimate and isn&apos;t a substitute for individualised medical or dietary advice.
              If you have a medical condition, are pregnant, or take medication, talk to a qualified professional first.
            </Text>
          </View>
        </Animated.View>

        <View style={styles.section}>
          <Text variant="title" accessibilityRole="header">
            Related calculators
          </Text>
          <View style={styles.links}>
            {related.map((t) => (
              <LinkCard key={t.id} title={t.title} description={t.blurb} onPress={() => router.push(`/calculator/${t.id}`)} />
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text variant="title" accessibilityRole="header">
            Method, examples & FAQ
          </Text>
          <LinkCard
            title="Read the full guide on fitlives.in"
            description="Worked example, how the formula works, sources and frequently asked questions."
            onPress={() => openLink(`${SITE_URL}${meta.webPath}`)}
            external
          />
        </View>

        <View style={styles.disclaimer}>
          <Text style={styles.disclaimerText}>
            This calculator provides an estimate and isn&apos;t a substitute for individualised medical or dietary advice.
            Read our{" "}
            <Text style={styles.disclaimerLink} onPress={() => openLink(`${SITE_URL}/medical-disclaimer`)} accessibilityRole="link">
              medical disclaimer
            </Text>{" "}
            and{" "}
            <Text style={styles.disclaimerLink} onPress={() => openLink(`${SITE_URL}/editorial-policy`)} accessibilityRole="link">
              editorial policy
            </Text>
            .
          </Text>
        </View>
      </Screen>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: colors.bg },
  intro: { gap: space.sm },
  title: { fontFamily: fonts.semibold, fontSize: 30, lineHeight: 35, letterSpacing: -0.9, color: colors.ink, marginTop: space.xs },
  lede: { color: colors.muted, fontSize: 16, lineHeight: 24 },
  byline: { fontFamily: fonts.regular, fontSize: 12, lineHeight: 17, color: colors.subtle },
  workspace: {
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.bg,
    overflow: "hidden",
    ...shadow.sm,
  },
  workspaceHead: {
    flexDirection: "row",
    alignItems: "center",
    gap: space.sm,
    paddingHorizontal: space.lg,
    paddingVertical: space.md,
    backgroundColor: "rgba(245,245,245,0.6)",
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  workspaceIcon: {
    width: 32,
    height: 32,
    borderRadius: radius.sm,
    backgroundColor: colors.accentSoft,
    borderWidth: 1,
    borderColor: colors.accentBorder,
    alignItems: "center",
    justifyContent: "center",
  },
  workspaceTitle: { flex: 1, fontFamily: fonts.semibold, fontSize: 16, letterSpacing: -0.2, color: colors.ink },
  pill: {
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.bg,
    paddingHorizontal: space.md,
    paddingVertical: 4,
    maxWidth: 170,
  },
  pillText: { fontFamily: fonts.medium, fontSize: 11, color: colors.muted },
  workspaceBody: { padding: space.lg, gap: space.lg },
  fineprint: { fontFamily: fonts.regular, fontSize: 11.5, lineHeight: 17, color: colors.muted },
  save: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: space.sm,
    minHeight: 50,
    borderRadius: radius.pill,
    backgroundColor: colors.ink,
    ...shadow.md,
  },
  saved: { backgroundColor: colors.accentSoft, borderWidth: 1, borderColor: colors.accentBorder, shadowOpacity: 0, elevation: 0 },
  saveText: { fontFamily: fonts.semibold, fontSize: 15, color: colors.bg },
  savedText: { color: colors.ink },
  section: { gap: space.md },
  links: { gap: space.sm },
  linkCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: space.md,
    padding: space.lg,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.bg,
  },
  linkCardPressed: { borderColor: colors.ink },
  linkBody: { flex: 1, gap: 3 },
  linkTitle: { fontFamily: fonts.semibold, fontSize: 14.5, color: colors.ink },
  linkDesc: { fontSize: 12.5, lineHeight: 17 },
  disclaimer: {
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: "rgba(255,152,0,0.3)",
    backgroundColor: "#FFF8E1",
    paddingHorizontal: space.lg,
    paddingVertical: space.md,
  },
  disclaimerText: { fontFamily: fonts.regular, fontSize: 12, lineHeight: 18, color: "#3D3D3D" },
  disclaimerLink: { fontFamily: fonts.semibold, fontSize: 12, lineHeight: 18, color: colors.ink, textDecorationLine: "underline" },
});
