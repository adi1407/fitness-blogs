import Ionicons from "@expo/vector-icons/Ionicons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Stack, useLocalSearchParams } from "expo-router";
import { useState, type ComponentType } from "react";
import { ActivityIndicator, KeyboardAvoidingView, Platform, StyleSheet } from "react-native";

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
import { WaterCalculator } from "@/calculators/WaterCalculator";
import { PressableScale } from "@/components/PressableScale";
import { Screen } from "@/components/Screen";
import { EmptyState } from "@/components/States";
import { Text } from "@/components/Text";
import { useToast } from "@/components/Toast";
import { SITE_URL } from "@/config";
import { useAuth } from "@/lib/auth";
import { openLink } from "@/lib/links";
import { TOOLS, isToolId, type ToolId, type ToolMeta } from "@/lib/tools";
import { colors, radius, space } from "@/theme";

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
      <Text variant="heading" style={saved ? styles.savedText : styles.saveText}>
        {saved ? "Saved to account" : "Save this result"}
      </Text>
    </PressableScale>
  );
}

export default function CalculatorScreen() {
  const { tool } = useLocalSearchParams<{ tool: string }>();
  const [result, setResult] = useState<ReportedResult | null>(null);
  if (!isToolId(tool)) return <EmptyState title="Calculator not found" />;

  const meta = TOOLS.find((t) => t.id === tool)!;
  const Calculator = CALCULATORS[tool];

  return (
    <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <Stack.Screen options={{ title: meta.title }} />
      <Screen>
        <Text variant="small">{meta.blurb}</Text>
        <CalcResultContext.Provider value={setResult}>
          <Calculator />
        </CalcResultContext.Provider>
        {result ? <SaveResult meta={meta} result={result} /> : null}
        <Text variant="small" style={styles.link} onPress={() => openLink(`${SITE_URL}${meta.webPath}`)}>
          Full guide and method on fitlives.in
        </Text>
      </Screen>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: colors.bg },
  link: { color: colors.ink, textDecorationLine: "underline", textAlign: "center" },
  save: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: space.sm,
    minHeight: 52,
    borderRadius: radius.pill,
    backgroundColor: colors.ink,
  },
  saved: { backgroundColor: colors.accentSoft },
  saveText: { color: colors.bg },
  savedText: { color: colors.ink },
});
