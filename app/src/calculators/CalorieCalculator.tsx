import { StyleSheet, View } from "react-native";

import { Card } from "@/components/Card";
import { NumberField, SegmentField, parseRange } from "@/components/Field";
import { MacroBar } from "@/components/MacroBar";
import { StatBox } from "@/components/StatBox";
import { Text } from "@/components/Text";
import { usePersistentState } from "@/hooks/usePersistentState";
import {
  ACTIVITY_LEVELS,
  calcCaloriePlan,
  type ActivityId,
  type CalorieGoal,
  type CaloriePace,
  type Sex,
} from "@/lib/calc";
import { colors, radius, space } from "@/theme";

const SEX_OPTIONS = [
  { id: "male", label: "Male" },
  { id: "female", label: "Female" },
] as const;

const GOAL_OPTIONS = [
  { id: "loss", label: "Lose fat" },
  { id: "maintain", label: "Maintain" },
  { id: "gain", label: "Gain muscle" },
] as const;

const PACE_OPTIONS = [
  { id: "gentle", label: "Gentle" },
  { id: "moderate", label: "Moderate" },
] as const;

export function CalorieCalculator() {
  const [form, setForm] = usePersistentState("calc:calorie", {
    sex: "male" as Sex,
    age: "28",
    cm: "170",
    kg: "70",
    activity: "moderate" as ActivityId,
    goal: "loss" as CalorieGoal,
    pace: "moderate" as CaloriePace,
  });
  const set = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) => setForm((f) => ({ ...f, [k]: v }));

  const age = parseRange(form.age, 18, 80, "age");
  const cm = parseRange(form.cm, 120, 230, "height");
  const kg = parseRange(form.kg, 30, 250, "weight");
  const plan =
    age.value != null && cm.value != null && kg.value != null
      ? calcCaloriePlan({
          sex: form.sex,
          age: age.value,
          cm: cm.value,
          kg: kg.value,
          activity: form.activity,
          goal: form.goal,
          pace: form.pace,
        })
      : null;

  const activityHelper = ACTIVITY_LEVELS.find((a) => a.id === form.activity)?.helper;

  return (
    <View style={styles.wrap}>
      <SegmentField label="Sex" options={SEX_OPTIONS} value={form.sex} onChange={(v) => set("sex", v)} />
      <View style={styles.row}>
        <View style={styles.flex}>
          <NumberField label="Age" unit="yrs" value={form.age} onChangeText={(v) => set("age", v)} error={age.error} />
        </View>
        <View style={styles.flex}>
          <NumberField label="Height" unit="cm" value={form.cm} onChangeText={(v) => set("cm", v)} error={cm.error} />
        </View>
        <View style={styles.flex}>
          <NumberField label="Weight" unit="kg" value={form.kg} onChangeText={(v) => set("kg", v)} error={kg.error} />
        </View>
      </View>
      <SegmentField
        label="Activity"
        options={ACTIVITY_LEVELS}
        value={form.activity}
        onChange={(v) => set("activity", v)}
        hint={activityHelper}
      />
      <SegmentField label="Goal" options={GOAL_OPTIONS} value={form.goal} onChange={(v) => set("goal", v)} />
      {form.goal !== "maintain" ? (
        <SegmentField label="Pace" options={PACE_OPTIONS} value={form.pace} onChange={(v) => set("pace", v)} />
      ) : null}

      {plan ? (
        <Card style={styles.result}>
          <View style={styles.row}>
            <StatBox label="Daily target" value={plan.target.toLocaleString("en-IN")} unit="kcal" highlight />
            <StatBox label="Maintenance" value={plan.tdee.toLocaleString("en-IN")} unit="kcal" />
          </View>
          <Text variant="small">
            BMR {plan.bmr.toLocaleString("en-IN")} kcal (Mifflin–St Jeor) ×{" "}
            {ACTIVITY_LEVELS.find((a) => a.id === form.activity)?.factor} activity.
            {plan.weeklyKg !== 0
              ? ` Expected change ≈ ${plan.weeklyKg > 0 ? "+" : ""}${plan.weeklyKg} kg/week.`
              : ""}
          </Text>
          {plan.floorApplied || plan.deficitNotAdvised ? (
            <View style={styles.notice}>
              <Text variant="small" style={styles.noticeText}>
                {plan.deficitNotAdvised
                  ? "Your maintenance is already near the safe minimum, so we don't suggest a deficit. Focus on activity and food quality, and talk to a professional."
                  : `We've kept your target at the ${plan.floor} kcal minimum. Going lower should be supervised by a professional.`}
              </Text>
            </View>
          ) : null}

          <Text variant="heading">Suggested macros</Text>
          <View style={styles.row}>
            <StatBox label="Protein" value={String(plan.macros.protein)} unit="g" />
            <StatBox label="Carbs" value={String(plan.macros.carbs)} unit="g" />
            <StatBox label="Fat" value={String(plan.macros.fat)} unit="g" />
          </View>
          <MacroBar
            proteinPct={plan.macros.pct.protein}
            carbsPct={plan.macros.pct.carbs}
            fatPct={plan.macros.pct.fat}
          />
        </Card>
      ) : null}

      <Text variant="small">
        Estimates only — real needs vary by ±10%. Track your weight for 2–3 weeks and adjust. Not suitable during
        pregnancy or for medical conditions without professional advice.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { gap: space.lg },
  row: { flexDirection: "row", gap: space.md },
  flex: { flex: 1 },
  result: { gap: space.md },
  notice: { backgroundColor: colors.accentSoft, borderRadius: radius.md, padding: space.md },
  noticeText: { color: colors.ink },
});
