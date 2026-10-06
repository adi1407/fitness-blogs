import { StyleSheet, View } from "react-native";

import { SegmentField } from "@/components/Field";
import { RingChart } from "@/components/RingChart";
import { Text } from "@/components/Text";
import { usePersistentState } from "@/hooks/usePersistentState";
import { calcCaloriePlan, type CalorieGoal } from "@/lib/calc";
import { colors, radius, space } from "@/theme";
import { BodyProfileFields, FormCard, Notice, calcStyles, useBodyProfile } from "./ui";

const GOAL_OPTIONS = [
  { id: "loss", label: "Fat loss" },
  { id: "maintain", label: "Maintain" },
  { id: "gain", label: "Muscle gain" },
] as const;

function MacroCard({ label, grams, pct, kcalPerG, color }: { label: string; grams: number; pct: number; kcalPerG: number; color: string }) {
  return (
    <View style={styles.macro}>
      <View style={[styles.swatch, { backgroundColor: color }]} />
      <Text variant="label">{label}</Text>
      <Text variant="title">{grams} g</Text>
      <Text variant="small">
        {pct}% · {grams * kcalPerG} kcal
      </Text>
    </View>
  );
}

export function MacroCalculator() {
  const profile = useBodyProfile();
  const [form, setForm] = usePersistentState("calc:macro", { goal: "maintain" as CalorieGoal });
  const plan = profile.values ? calcCaloriePlan({ ...profile.values, goal: form.goal, pace: "moderate" }) : null;

  return (
    <View style={calcStyles.wrap}>
      <FormCard>
        <BodyProfileFields {...profile} />
        <SegmentField label="Goal" options={GOAL_OPTIONS} value={form.goal} onChange={(goal) => setForm({ goal })} />
      </FormCard>

      {plan ? (
        <View style={styles.result}>
          <View style={styles.ring}>
            <RingChart
              size={200}
              stroke={18}
              centerValue={plan.target.toLocaleString("en-IN")}
              centerLabel="kcal / day"
              segments={[
                { value: plan.macros.pct.protein, color: colors.protein },
                { value: plan.macros.pct.carbs, color: colors.carbs },
                { value: plan.macros.pct.fat, color: colors.fat },
              ]}
            />
          </View>
          <View style={styles.macros}>
            <MacroCard label="Protein" grams={plan.macros.protein} pct={plan.macros.pct.protein} kcalPerG={4} color={colors.protein} />
            <MacroCard label="Carbs" grams={plan.macros.carbs} pct={plan.macros.pct.carbs} kcalPerG={4} color={colors.carbs} />
            <MacroCard label="Fat" grams={plan.macros.fat} pct={plan.macros.pct.fat} kcalPerG={9} color={colors.fat} />
          </View>
          <Text variant="small">
            Protein is set at {plan.proteinPerKg} g/kg{plan.proteinAdjusted ? " of a reference weight" : ""}, fat at 25% of
            calories, and carbs fill the rest.
          </Text>
        </View>
      ) : null}

      <Notice>Hit protein first; carbs and fat can flex day to day as long as total calories stay on target.</Notice>
    </View>
  );
}

const styles = StyleSheet.create({
  result: { gap: space.lg },
  ring: { alignItems: "center", paddingVertical: space.md },
  macros: { flexDirection: "row", gap: space.sm },
  macro: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: space.md,
    gap: 2,
  },
  swatch: { width: 18, height: 4, borderRadius: 2, marginBottom: 4 },
});
