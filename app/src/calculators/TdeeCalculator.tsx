import { View } from "react-native";

import { RingChart } from "@/components/RingChart";
import { ACTIVITY_LEVELS, calcTdee } from "@/lib/calc";
import { colors } from "@/theme";
import { BodyProfileFields, FormCard, HeroStat, HeroStats, Notice, ResultHero, calcStyles, useBodyProfile } from "./ui";

export function TdeeCalculator() {
  const profile = useBodyProfile();
  const r = profile.values ? calcTdee(profile.values.sex, profile.values.kg, profile.values.cm, profile.values.age, profile.values.activity) : null;
  const factor = ACTIVITY_LEVELS.find((a) => a.id === profile.form.activity)?.factor ?? 1.55;

  return (
    <View style={calcStyles.wrap}>
      <FormCard>
        <BodyProfileFields {...profile} />
      </FormCard>

      {r ? (
        <ResultHero
          label="Your TDEE"
          value={r.tdee}
          unit="kcal/day"
          caption={`BMR ${r.bmr.toLocaleString("en-IN")} × ${factor} activity factor`}
          aside={
            <RingChart
              size={96}
              stroke={10}
              dark
              track="rgba(255,255,255,0.08)"
              max={r.tdee}
              segments={[
                { value: r.bmr, color: colors.bg },
                { value: r.tdee - r.bmr, color: colors.accent },
              ]}
            />
          }
        >
          <HeroStats>
            <HeroStat label="Cut (−20%)" value={r.cut.toLocaleString("en-IN")} />
            <HeroStat label="Maintain" value={r.maintain.toLocaleString("en-IN")} />
            <HeroStat label="Bulk (+10%)" value={r.bulk.toLocaleString("en-IN")} />
          </HeroStats>
        </ResultHero>
      ) : null}

      <Notice>
        The ring shows resting energy (white) versus activity (orange). TDEE is an estimate — adjust by 100–200 kcal based
        on how your weight actually changes.
      </Notice>
    </View>
  );
}
