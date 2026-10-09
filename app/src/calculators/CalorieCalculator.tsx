import { View } from "react-native";

import { MacroBar } from "@/components/MacroBar";
import { RingChart } from "@/components/RingChart";
import { SegmentField } from "@/components/Field";
import { Text } from "@/components/Text";
import { usePersistentState } from "@/hooks/usePersistentState";
import { ACTIVITY_LEVELS, calcCaloriePlan, type CalorieGoal, type CaloriePace } from "@/lib/calc";
import { colors } from "@/theme";
import { BodyProfileFields, FormCard, HeroStat, HeroStats, Notice, ResultHero, calcStyles, useBodyProfile } from "./ui";

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
  const profile = useBodyProfile();
  const [form, setForm] = usePersistentState("calc:calorie", {
    goal: "loss" as CalorieGoal,
    pace: "moderate" as CaloriePace,
  });

  const plan = profile.values ? calcCaloriePlan({ ...profile.values, goal: form.goal, pace: form.pace }) : null;
  const factor = ACTIVITY_LEVELS.find((a) => a.id === profile.form.activity)?.factor;

  return (
    <View style={calcStyles.wrap}>
      <FormCard>
        <BodyProfileFields {...profile} />
        <SegmentField label="Goal" options={GOAL_OPTIONS} value={form.goal} onChange={(goal) => setForm((f) => ({ ...f, goal }))} />
        {form.goal !== "maintain" ? (
          <SegmentField label="Pace" options={PACE_OPTIONS} value={form.pace} onChange={(pace) => setForm((f) => ({ ...f, pace }))} />
        ) : null}
      </FormCard>

      {plan ? (
        <>
          <ResultHero
            label="Daily target"
            value={plan.target}
            unit="kcal/day"
            goal={form.goal}
            caption={
              plan.weeklyKg !== 0
                ? `≈ ${plan.weeklyKg > 0 ? "+" : ""}${plan.weeklyKg} kg per week`
                : "Holds your current weight"
            }
            aside={
              <RingChart
                size={96}
                stroke={10}
                track={colors.border}
                segments={[
                  { value: plan.macros.pct.protein, color: colors.ink },
                  { value: plan.macros.pct.carbs, color: colors.accent },
                  { value: plan.macros.pct.fat, color: colors.fat },
                ]}
              />
            }
          >
            <HeroStats>
              <HeroStat label="Maintenance" value={`${plan.tdee.toLocaleString("en-IN")}`} />
              <HeroStat label="BMR" value={`${plan.bmr.toLocaleString("en-IN")}`} />
              <HeroStat label="Protein" value={`${plan.macros.protein} g`} />
              <HeroStat label="Carbs" value={`${plan.macros.carbs} g`} />
              <HeroStat label="Fat" value={`${plan.macros.fat} g`} />
              <HeroStat label="Activity" value={`×${factor}`} />
            </HeroStats>
          </ResultHero>

          <MacroBar proteinPct={plan.macros.pct.protein} carbsPct={plan.macros.pct.carbs} fatPct={plan.macros.pct.fat} />

          {plan.floorApplied || plan.deficitNotAdvised ? (
            <Notice tone="warn">
              {plan.deficitNotAdvised
                ? "Your maintenance is already near the safe minimum, so we don't suggest a deficit. Focus on activity and food quality, and talk to a professional."
                : `We've kept your target at the ${plan.floor} kcal minimum. Going lower should be supervised by a professional.`}
            </Notice>
          ) : null}

          <Text variant="small">
            Gentle loss {plan.loss.gentle.toLocaleString("en-IN")} · moderate loss {plan.loss.moderate.toLocaleString("en-IN")} ·
            lean gain {plan.gain.gentle.toLocaleString("en-IN")} kcal/day. Mifflin–St Jeor formula.
          </Text>
        </>
      ) : null}

      <Notice>
        Estimates only — real needs vary by about ±10%. Track your weight for 2–3 weeks and adjust. Not for pregnancy or
        medical conditions without professional advice.
      </Notice>
    </View>
  );
}
