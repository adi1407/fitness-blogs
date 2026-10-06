import { Stack, useLocalSearchParams } from "expo-router";
import type { ComponentType } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet } from "react-native";

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
import { WaterCalculator } from "@/calculators/WaterCalculator";
import { Screen } from "@/components/Screen";
import { EmptyState } from "@/components/States";
import { Text } from "@/components/Text";
import { SITE_URL } from "@/config";
import { openLink } from "@/lib/links";
import { TOOLS, isToolId, type ToolId } from "@/lib/tools";
import { colors } from "@/theme";

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

export default function CalculatorScreen() {
  const { tool } = useLocalSearchParams<{ tool: string }>();
  if (!isToolId(tool)) return <EmptyState title="Calculator not found" />;

  const meta = TOOLS.find((t) => t.id === tool)!;
  const Calculator = CALCULATORS[tool];

  return (
    <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <Stack.Screen options={{ title: meta.title }} />
      <Screen>
        <Text variant="small">{meta.blurb}</Text>
        <Calculator />
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
});
