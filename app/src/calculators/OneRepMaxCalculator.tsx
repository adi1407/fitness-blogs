import { StyleSheet, View } from "react-native";

import { NumberField, parseRange } from "@/components/Field";
import { Text } from "@/components/Text";
import { usePersistentState } from "@/hooks/usePersistentState";
import { calcOneRepMax } from "@/lib/calcMore";
import { colors, fonts, radius, space } from "@/theme";
import { FormCard, HeroStat, HeroStats, Notice, ResultHero, calcStyles } from "./ui";

export function OneRepMaxCalculator() {
  const [form, setForm] = usePersistentState("calc:1rm", { weight: "60", reps: "8" });
  const weight = parseRange(form.weight, 1, 500, "weight");
  const reps = parseRange(form.reps, 1, 12, "rep count");
  const r = weight.value != null && reps.value != null ? calcOneRepMax(weight.value, Math.round(reps.value)) : null;

  return (
    <View style={calcStyles.wrap}>
      <FormCard>
        <View style={calcStyles.row}>
          <View style={calcStyles.flex}>
            <NumberField label="Weight lifted" unit="kg" value={form.weight} onChangeText={(v) => setForm((f) => ({ ...f, weight: v }))} error={weight.error} />
          </View>
          <View style={calcStyles.flex}>
            <NumberField label="Reps done" unit="reps" value={form.reps} onChangeText={(v) => setForm((f) => ({ ...f, reps: v }))} error={reps.error} />
          </View>
        </View>
      </FormCard>

      {r ? (
        <>
          <ResultHero label="Estimated 1RM" value={r.oneRm} decimals={1} unit="kg" caption="Average of Epley and Brzycki">
            <HeroStats>
              <HeroStat label="Epley" value={`${r.epley} kg`} />
              <HeroStat label="Brzycki" value={`${r.brzycki} kg`} />
            </HeroStats>
          </ResultHero>

          <View style={styles.table}>
            <View style={[styles.tr, styles.th]}>
              <Text variant="label" style={styles.thText}>Reps</Text>
              <Text variant="label" style={styles.thText}>% 1RM</Text>
              <Text variant="label" style={[styles.thText, styles.right]}>Load</Text>
            </View>
            {r.table.map((row, i) => (
              <View key={row.reps} style={[styles.tr, i % 2 === 1 && styles.alt]}>
                <Text variant="body" style={styles.cell}>{row.reps}</Text>
                <Text variant="body" style={styles.cell}>{row.pct}%</Text>
                <Text variant="body" style={[styles.cell, styles.right, styles.load]}>{row.load} kg</Text>
              </View>
            ))}
          </View>
        </>
      ) : null}

      <Notice>Estimates are most accurate from sets of 3–8 reps. Test true maxes only with a spotter and good technique.</Notice>
    </View>
  );
}

const styles = StyleSheet.create({
  table: { borderRadius: radius.lg, overflow: "hidden", borderWidth: 1, borderColor: colors.border },
  tr: { flexDirection: "row", paddingHorizontal: space.lg, paddingVertical: space.sm + 2 },
  th: { backgroundColor: colors.ink },
  thText: { flex: 1, color: colors.bg },
  alt: { backgroundColor: colors.surface },
  cell: { flex: 1 },
  right: { textAlign: "right" },
  load: { fontFamily: fonts.semibold },
});
