import { View } from "react-native";

import { NumberField, parseRange } from "@/components/Field";
import { RingChart } from "@/components/RingChart";
import { usePersistentState } from "@/hooks/usePersistentState";
import { BODY_FAT_BAND_LABEL, calcBodyFat } from "@/lib/calcMore";
import { colors } from "@/theme";
import { BodyProfileFields, FormCard, HeroStat, HeroStats, Notice, ResultHero, calcStyles, useBodyProfile } from "./ui";

export function BodyFatCalculator() {
  const profile = useBodyProfile();
  const [form, setForm] = usePersistentState("calc:body-fat", { neck: "38", waist: "85", hip: "95" });
  const neck = parseRange(form.neck, 20, 70, "neck");
  const waist = parseRange(form.waist, 40, 200, "waist");
  const hip = parseRange(form.hip, 50, 200, "hip");
  const female = profile.form.sex === "female";
  const v = profile.values;

  const result =
    v && neck.value != null && waist.value != null && (!female || hip.value != null)
      ? calcBodyFat({
          sex: v.sex,
          cm: v.cm,
          neckCm: neck.value,
          waistCm: waist.value,
          hipCm: female ? (hip.value ?? undefined) : undefined,
          kg: v.kg,
        })
      : null;

  const set = (k: "neck" | "waist" | "hip") => (val: string) => setForm((f) => ({ ...f, [k]: val }));

  return (
    <View style={calcStyles.wrap}>
      <FormCard>
        <BodyProfileFields {...profile} fields={["sex", "cm", "kg"]} />
        <View style={calcStyles.row}>
          <View style={calcStyles.flex}>
            <NumberField label="Neck" unit="cm" value={form.neck} onChangeText={set("neck")} error={neck.error} />
          </View>
          <View style={calcStyles.flex}>
            <NumberField label="Waist" unit="cm" value={form.waist} onChangeText={set("waist")} error={waist.error} />
          </View>
          {female ? (
            <View style={calcStyles.flex}>
              <NumberField label="Hip" unit="cm" value={form.hip} onChangeText={set("hip")} error={hip.error} />
            </View>
          ) : null}
        </View>
      </FormCard>

      {result ? (
        <ResultHero
          label="Estimated body fat"
          value={result.pct}
          decimals={1}
          unit="%"
          caption={BODY_FAT_BAND_LABEL[result.band]}
          aside={
            <RingChart
              size={96}
              stroke={10}
              track={colors.border}
              max={100}
              segments={[{ value: result.pct, color: colors.accent }]}
            />
          }
        >
          <HeroStats>
            {result.fatKg != null ? <HeroStat label="Fat mass" value={`${result.fatKg} kg`} /> : null}
            {result.leanKg != null ? <HeroStat label="Lean mass" value={`${result.leanKg} kg`} /> : null}
            <HeroStat label="Waist ÷ height" value={`${result.waistToHeight}`} />
          </HeroStats>
        </ResultHero>
      ) : v && neck.value != null && waist.value != null ? (
        <Notice tone="warn">Those measurements don&apos;t produce a valid estimate — check that waist is larger than neck.</Notice>
      ) : null}

      <Notice>
        Measure waist at the navel (men) or narrowest point (women), neck just below the larynx. The US Navy method is
        typically within ±3–4% of lab tests. A waist-to-height ratio under 0.5 is a good target.
      </Notice>
    </View>
  );
}
