import { View } from "react-native";

import { NumberField, SegmentField, parseRange } from "@/components/Field";
import { RingChart } from "@/components/RingChart";
import { usePersistentState } from "@/hooks/usePersistentState";
import { WALK_PACES, calcStepsCalories, type WalkPaceId } from "@/lib/calcMore";
import { colors } from "@/theme";
import { BodyProfileFields, FormCard, HeroStat, HeroStats, Notice, ResultHero, calcStyles, useBodyProfile } from "./ui";

const GOAL_STEPS = 10_000;

export function StepsCalculator() {
  const profile = useBodyProfile();
  const [form, setForm] = usePersistentState("calc:steps", { steps: "8000", pace: "moderate" as WalkPaceId });
  const steps = parseRange(form.steps, 100, 100_000, "step count");
  const v = profile.values;
  const r = v && steps.value != null ? calcStepsCalories({ steps: steps.value, kg: v.kg, cm: v.cm, sex: v.sex, pace: form.pace }) : null;

  return (
    <View style={calcStyles.wrap}>
      <FormCard>
        <NumberField label="Steps" unit="steps" value={form.steps} onChangeText={(s) => setForm((f) => ({ ...f, steps: s }))} error={steps.error} />
        <SegmentField
          label="Pace"
          options={WALK_PACES}
          value={form.pace}
          onChange={(pace) => setForm((f) => ({ ...f, pace }))}
          hint={WALK_PACES.find((p) => p.id === form.pace)?.helper}
        />
        <BodyProfileFields {...profile} fields={["sex", "cm", "kg"]} />
      </FormCard>

      {r && steps.value != null ? (
        <ResultHero
          label="Calories burned"
          value={r.kcal}
          unit="kcal"
          caption={`${r.netKcal} kcal above resting`}
          aside={
            <RingChart
              size={96}
              stroke={10}
              dark
              track="rgba(255,255,255,0.08)"
              max={GOAL_STEPS}
              segments={[{ value: Math.min(steps.value, GOAL_STEPS), color: colors.accent }]}
              centerValue={`${Math.round((Math.min(steps.value, GOAL_STEPS) / GOAL_STEPS) * 100)}%`}
            />
          }
        >
          <HeroStats>
            <HeroStat label="Distance" value={`${r.km} km`} />
            <HeroStat label="Time" value={`${r.minutes} min`} />
            <HeroStat label="Stride" value={`${r.strideCm} cm`} />
          </HeroStats>
        </ResultHero>
      ) : null}

      <Notice>Ring shows progress toward 10,000 steps. Stride is estimated from height; a fitness tracker can be more precise.</Notice>
    </View>
  );
}
