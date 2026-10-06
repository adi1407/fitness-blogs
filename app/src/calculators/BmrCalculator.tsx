import { View } from "react-native";

import { NumberField, parseRange } from "@/components/Field";
import { usePersistentState } from "@/hooks/usePersistentState";
import { katchMcArdleBmr, mifflinBmr } from "@/lib/calc";
import { BodyProfileFields, FormCard, HeroStat, HeroStats, Notice, ResultHero, calcStyles, useBodyProfile } from "./ui";

export function BmrCalculator() {
  const profile = useBodyProfile();
  const [form, setForm] = usePersistentState("calc:bmr", { bodyFat: "" });
  const bf = parseRange(form.bodyFat, 3, 60, "body fat %");

  const v = profile.values;
  const mifflin = v ? Math.round(mifflinBmr(v.sex, v.kg, v.cm, v.age)) : null;
  const katch = v && bf.value != null ? Math.round(katchMcArdleBmr(v.kg, bf.value)) : null;
  const headline = katch ?? mifflin;

  return (
    <View style={calcStyles.wrap}>
      <FormCard>
        <BodyProfileFields {...profile} fields={["sex", "age", "cm", "kg"]} />
        <NumberField
          label="Body fat (optional)"
          unit="%"
          value={form.bodyFat}
          onChangeText={(v) => setForm({ bodyFat: v })}
          error={bf.error}
          placeholder="e.g. 20"
        />
      </FormCard>

      {headline != null ? (
        <ResultHero
          label="Basal metabolic rate"
          value={headline}
          unit="kcal/day"
          caption={katch != null ? "Katch–McArdle (uses your lean mass)" : "Mifflin–St Jeor"}
        >
          <HeroStats>
            {mifflin != null ? <HeroStat label="Mifflin–St Jeor" value={mifflin.toLocaleString("en-IN")} /> : null}
            {katch != null ? <HeroStat label="Katch–McArdle" value={katch.toLocaleString("en-IN")} /> : null}
            <HeroStat label="Per hour" value={`${Math.round(headline / 24)}`} />
          </HeroStats>
        </ResultHero>
      ) : null}

      <Notice>
        BMR is what you burn at complete rest. Eating below it long-term isn&apos;t recommended — use the TDEE or calorie
        calculator to set an intake target.
      </Notice>
    </View>
  );
}
