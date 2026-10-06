import { StyleSheet, View } from "react-native";

import { NumberField, SegmentField, parseRange } from "@/components/Field";
import { Text } from "@/components/Text";
import { usePersistentState } from "@/hooks/usePersistentState";
import { PROTEIN_GOALS, calcProtein, type ProteinGoalId } from "@/lib/calc";
import { colors, radius, space } from "@/theme";
import { FormCard, HeroStat, HeroStats, Notice, ResultHero, calcStyles, useBodyProfile } from "./ui";

const SOURCES = [
  { food: "Paneer, 100 g", g: 19 },
  { food: "Chicken breast (cooked), 100 g", g: 31 },
  { food: "2 whole eggs", g: 12 },
  { food: "Cooked dal, 1 katori", g: 8 },
  { food: "Greek-style curd, 150 g", g: 15 },
  { food: "Soya chunks (dry), 30 g", g: 16 },
];

export function ProteinCalculator() {
  const profile = useBodyProfile();
  const [form, setForm] = usePersistentState("calc:protein", { goal: "muscle" as ProteinGoalId });
  const kg = parseRange(profile.form.kg, 30, 250, "weight");
  const result = kg.value != null ? calcProtein(kg.value, form.goal) : null;

  return (
    <View style={calcStyles.wrap}>
      <FormCard>
        <NumberField
          label="Body weight"
          unit="kg"
          value={profile.form.kg}
          onChangeText={(v) => profile.setForm((f) => ({ ...f, kg: v }))}
          error={kg.error}
        />
        <SegmentField label="Goal" options={PROTEIN_GOALS} value={form.goal} onChange={(goal) => setForm({ goal })} />
      </FormCard>

      {result ? (
        <>
          <ResultHero label="Daily protein" value={result.grams} unit="g/day" caption={`${result.factor} g per kg of body weight`}>
            <HeroStats>
              <HeroStat label="Range" value={`${result.low}–${result.high} g`} />
              <HeroStat label="Per meal (×4)" value={`${Math.round(result.grams / 4)} g`} />
              <HeroStat label="Per meal (×3)" value={`${Math.round(result.grams / 3)} g`} />
            </HeroStats>
          </ResultHero>

          <View style={styles.sources}>
            <Text variant="heading">Indian protein sources</Text>
            {SOURCES.map((s) => {
              const share = Math.min(1, s.g / result.grams);
              return (
                <View key={s.food} style={styles.source}>
                  <View style={styles.sourceHead}>
                    <Text variant="small" style={styles.sourceName}>
                      {s.food}
                    </Text>
                    <Text variant="small" style={styles.sourceG}>
                      {s.g} g
                    </Text>
                  </View>
                  <View style={styles.track}>
                    <View style={[styles.fill, { width: `${Math.max(4, share * 100)}%` }]} />
                  </View>
                </View>
              );
            })}
            <Text variant="small">Bars show each serving&apos;s share of your daily target.</Text>
          </View>
        </>
      ) : null}

      <Notice>If you have kidney disease or another medical condition, ask your doctor before increasing protein.</Notice>
    </View>
  );
}

const styles = StyleSheet.create({
  sources: { gap: space.md },
  source: { gap: 6 },
  sourceHead: { flexDirection: "row", justifyContent: "space-between" },
  sourceName: { color: colors.ink },
  sourceG: { color: colors.ink, fontWeight: "600" },
  track: { height: 8, borderRadius: radius.pill, backgroundColor: colors.surface, overflow: "hidden" },
  fill: { height: 8, borderRadius: radius.pill, backgroundColor: colors.accent },
});
