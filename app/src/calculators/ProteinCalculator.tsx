import { StyleSheet, View } from "react-native";

import { Card } from "@/components/Card";
import { NumberField, SegmentField, parseRange } from "@/components/Field";
import { StatBox } from "@/components/StatBox";
import { Text } from "@/components/Text";
import { usePersistentState } from "@/hooks/usePersistentState";
import { PROTEIN_GOALS, calcProtein, type ProteinGoalId } from "@/lib/calc";
import { space } from "@/theme";

export function ProteinCalculator() {
  const [form, setForm] = usePersistentState("calc:protein", { kg: "70", goal: "muscle" as ProteinGoalId });
  const kg = parseRange(form.kg, 30, 250, "weight");
  const result = kg.value != null ? calcProtein(kg.value, form.goal) : null;

  return (
    <View style={styles.wrap}>
      <NumberField
        label="Body weight"
        unit="kg"
        value={form.kg}
        onChangeText={(v) => setForm((f) => ({ ...f, kg: v }))}
        error={kg.error}
      />
      <SegmentField
        label="Goal"
        options={PROTEIN_GOALS}
        value={form.goal}
        onChange={(goal) => setForm((f) => ({ ...f, goal }))}
      />

      {result ? (
        <Card style={styles.result}>
          <View style={styles.stats}>
            <StatBox label="Daily target" value={String(result.grams)} unit="g/day" highlight />
            <StatBox label="Range" value={`${result.low}–${result.high}`} unit="g" />
          </View>
          <Text variant="small">
            That&apos;s {result.factor} g per kg of body weight. Split it across 3–4 meals of roughly{" "}
            {Math.round(result.grams / 4)}–{Math.round(result.grams / 3)} g each.
          </Text>
          <Text variant="small">
            Indian sources: 100 g paneer ≈ 19 g, 1 katori cooked dal ≈ 7–9 g, 2 eggs ≈ 12 g, 100 g cooked chicken breast ≈ 31 g.
          </Text>
        </Card>
      ) : null}

      <Text variant="small">
        If you have kidney disease or another medical condition, ask your doctor before increasing protein.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { gap: space.lg },
  result: { gap: space.md },
  stats: { flexDirection: "row", gap: space.md },
});
