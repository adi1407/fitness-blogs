import { StyleSheet, View } from "react-native";

import { Card } from "@/components/Card";
import { NumberField, parseRange } from "@/components/Field";
import { StatBox } from "@/components/StatBox";
import { Text } from "@/components/Text";
import { usePersistentState } from "@/hooks/usePersistentState";
import { BMI_CATEGORY_LABEL, calcBmi } from "@/lib/calc";
import { colors, radius, space } from "@/theme";

const SCALE = [
  { upTo: 18.5, label: "<18.5" },
  { upTo: 23, label: "18.5–22.9" },
  { upTo: 25, label: "23–24.9" },
  { upTo: 99, label: "25+" },
];

export function BmiCalculator() {
  const [form, setForm] = usePersistentState("calc:bmi", { kg: "70", cm: "170" });
  const kg = parseRange(form.kg, 25, 300, "weight");
  const cm = parseRange(form.cm, 120, 230, "height");
  const result = kg.value != null && cm.value != null ? calcBmi(kg.value, cm.value) : null;

  const m = (cm.value ?? 0) / 100;
  const healthyLow = m ? Math.round(18.5 * m * m) : null;
  const healthyHigh = m ? Math.round(22.9 * m * m) : null;
  const activeBand = result ? SCALE.findIndex((s) => result.bmi < s.upTo) : -1;

  return (
    <View style={styles.wrap}>
      <View style={styles.row}>
        <View style={styles.flex}>
          <NumberField label="Height" unit="cm" value={form.cm} onChangeText={(v) => setForm((f) => ({ ...f, cm: v }))} error={cm.error} />
        </View>
        <View style={styles.flex}>
          <NumberField label="Weight" unit="kg" value={form.kg} onChangeText={(v) => setForm((f) => ({ ...f, kg: v }))} error={kg.error} />
        </View>
      </View>

      {result ? (
        <Card style={styles.result}>
          <View style={styles.row}>
            <StatBox label="Your BMI" value={result.bmi.toFixed(1)} highlight />
            <StatBox label="Asian-Indian" value={BMI_CATEGORY_LABEL[result.asianCategoryId]} />
          </View>
          <View style={styles.scale} accessibilityLabel={`BMI band ${SCALE[activeBand]?.label ?? ""}`}>
            {SCALE.map((s, i) => (
              <View key={s.label} style={[styles.band, i === activeBand && styles.bandActive]}>
                <Text variant="small" style={i === activeBand ? styles.bandActiveText : undefined}>
                  {s.label}
                </Text>
              </View>
            ))}
          </View>
          <Text variant="small">
            WHO category: {result.categoryLabel}. Indian guidelines use lower cut-offs (23 overweight, 25 obesity) because
            health risks start at lower BMI for South Asians.
          </Text>
          {healthyLow && healthyHigh ? (
            <Text variant="small">
              Healthy range for your height (Asian cut-offs): about {healthyLow}–{healthyHigh} kg.
            </Text>
          ) : null}
        </Card>
      ) : null}

      <Text variant="small">
        BMI is a screening tool — it doesn&apos;t measure body fat or muscle. Waist size and a doctor&apos;s assessment
        tell you more.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { gap: space.lg },
  row: { flexDirection: "row", gap: space.md },
  flex: { flex: 1 },
  result: { gap: space.md },
  scale: { flexDirection: "row", gap: 4 },
  band: {
    flex: 1,
    alignItems: "center",
    paddingVertical: space.sm,
    borderRadius: radius.sm,
    backgroundColor: colors.surface,
  },
  bandActive: { backgroundColor: colors.accent },
  bandActiveText: { color: colors.ink, fontWeight: "600" },
});
