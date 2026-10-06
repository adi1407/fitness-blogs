import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, View } from "react-native";

import { NumberField, SegmentField, parseRange } from "@/components/Field";
import { Text } from "@/components/Text";
import { usePersistentState } from "@/hooks/usePersistentState";
import { calcWater } from "@/lib/calcMore";
import { colors, space } from "@/theme";
import { FormCard, HeroStat, HeroStats, Notice, ResultHero, calcStyles, useBodyProfile } from "./ui";

const CLIMATE = [
  { id: "mild", label: "Mild" },
  { id: "hot", label: "Hot / humid" },
] as const;

const STATUS = [
  { id: "none", label: "None" },
  { id: "pregnant", label: "Pregnant" },
  { id: "breastfeeding", label: "Breastfeeding" },
] as const;

export function WaterCalculator() {
  const profile = useBodyProfile();
  const [form, setForm] = usePersistentState("calc:water", {
    exercise: "30",
    climate: "hot" as "mild" | "hot",
    status: "none" as "none" | "pregnant" | "breastfeeding",
  });
  const kg = parseRange(profile.form.kg, 30, 250, "weight");
  const ex = parseRange(form.exercise || "0", 0, 300, "exercise minutes");
  const r =
    kg.value != null && ex.value != null
      ? calcWater({ kg: kg.value, exerciseMin: ex.value, climate: form.climate, status: form.status })
      : null;

  return (
    <View style={calcStyles.wrap}>
      <FormCard>
        <View style={calcStyles.row}>
          <View style={calcStyles.flex}>
            <NumberField label="Weight" unit="kg" value={profile.form.kg} onChangeText={(v) => profile.setForm((f) => ({ ...f, kg: v }))} error={kg.error} />
          </View>
          <View style={calcStyles.flex}>
            <NumberField label="Exercise" unit="min/day" value={form.exercise} onChangeText={(v) => setForm((f) => ({ ...f, exercise: v }))} error={ex.error} />
          </View>
        </View>
        <SegmentField label="Climate" options={CLIMATE} value={form.climate} onChange={(climate) => setForm((f) => ({ ...f, climate }))} />
        {profile.form.sex === "female" ? (
          <SegmentField label="Pregnancy / lactation" options={STATUS} value={form.status} onChange={(status) => setForm((f) => ({ ...f, status }))} />
        ) : null}
      </FormCard>

      {r ? (
        <>
          <ResultHero label="Drink about" value={r.litres} decimals={1} unit="litres/day" caption={`≈ ${r.glasses} glasses of 250 ml`}>
            <HeroStats>
              <HeroStat label="Baseline" value={`${r.parts.base} ml`} />
              <HeroStat label="Exercise" value={`+${r.parts.exercise} ml`} />
              <HeroStat label="Heat" value={`+${r.parts.heat} ml`} />
            </HeroStats>
          </ResultHero>
          <View style={styles.glasses} accessibilityLabel={`${r.glasses} glasses`}>
            {Array.from({ length: Math.min(r.glasses, 20) }).map((_, i) => (
              <Ionicons key={i} name="water" size={22} color={colors.accent} />
            ))}
          </View>
          <Text variant="small">Includes drinks like tea, milk and buttermilk; food adds roughly another 20%.</Text>
        </>
      ) : null}

      <Notice>
        If you have kidney or heart conditions, your doctor may advise a different amount. Pale-yellow urine is a simple
        sign you&apos;re drinking enough.
      </Notice>
    </View>
  );
}

const styles = StyleSheet.create({
  glasses: { flexDirection: "row", flexWrap: "wrap", gap: space.xs },
});
