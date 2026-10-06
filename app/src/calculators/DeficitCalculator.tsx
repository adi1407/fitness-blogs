import { View } from "react-native";

import { NumberField, parseRange } from "@/components/Field";
import { usePersistentState } from "@/hooks/usePersistentState";
import { calcDeficitPlan } from "@/lib/calcMore";
import { BodyProfileFields, FormCard, HeroStat, HeroStats, Notice, ResultHero, calcStyles, useBodyProfile } from "./ui";

export function DeficitCalculator() {
  const profile = useBodyProfile();
  const [form, setForm] = usePersistentState("calc:deficit", { targetKg: "65", weeks: "12" });
  const target = parseRange(form.targetKg, 30, 250, "goal weight");
  const weeks = parseRange(form.weeks, 1, 104, "number of weeks");

  const plan =
    profile.values && target.value != null && weeks.value != null && target.value < profile.values.kg
      ? calcDeficitPlan({ ...profile.values, targetKg: target.value, weeks: weeks.value })
      : null;
  const notLower = profile.values && target.value != null && target.value >= profile.values.kg;

  return (
    <View style={calcStyles.wrap}>
      <FormCard>
        <BodyProfileFields {...profile} />
        <View style={calcStyles.row}>
          <View style={calcStyles.flex}>
            <NumberField
              label="Goal weight"
              unit="kg"
              value={form.targetKg}
              onChangeText={(v) => setForm((f) => ({ ...f, targetKg: v }))}
              error={target.error}
            />
          </View>
          <View style={calcStyles.flex}>
            <NumberField
              label="Timeline"
              unit="weeks"
              value={form.weeks}
              onChangeText={(v) => setForm((f) => ({ ...f, weeks: v }))}
              error={weeks.error}
            />
          </View>
        </View>
      </FormCard>

      {notLower ? <Notice>Set a goal weight below your current weight to plan a deficit.</Notice> : null}

      {plan ? (
        <>
          <ResultHero
            label={plan.noRoom ? "Suggested intake" : "Daily target"}
            value={plan.noRoom ? plan.tdee : plan.target}
            unit="kcal/day"
            caption={`Lose ${plan.kgToLose} kg · ${plan.weeklyKg} kg/week (${plan.weeklyPct}% of body weight)`}
          >
            <HeroStats>
              <HeroStat label="Maintenance" value={plan.tdee.toLocaleString("en-IN")} />
              <HeroStat label="Daily deficit" value={plan.dailyDeficit.toLocaleString("en-IN")} />
              <HeroStat label="Safe floor" value={plan.floor.toLocaleString("en-IN")} />
            </HeroStats>
          </ResultHero>

          {plan.noRoom ? (
            <Notice tone="warn">
              Your maintenance is already at the safe minimum, so a deficit isn&apos;t advised. Increase activity and
              speak with a professional.
            </Notice>
          ) : plan.tooFast || plan.belowFloor ? (
            <Notice tone="warn">
              {plan.tooFast
                ? "That pace is faster than about 1% of body weight per week, which risks muscle loss."
                : "That timeline would need a target below the safe minimum."}{" "}
              {plan.safeWeeks
                ? `A safer plan: ${plan.safeWeeks} weeks at about ${plan.safeTarget.toLocaleString("en-IN")} kcal/day.`
                : ""}
            </Notice>
          ) : (
            <Notice>This pace is within commonly advised limits. Keep protein high and strength-train to protect muscle.</Notice>
          )}
        </>
      ) : null}

      <Notice>
        Uses 7,700 kcal per kg of fat as an average — real loss slows over time as your body adapts. Not suitable during
        pregnancy or for eating disorders.
      </Notice>
    </View>
  );
}
