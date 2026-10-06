import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { StyleSheet, View } from "react-native";

import { MUSCLE_GROUP_LABEL, type Exercise } from "@/api/library";
import { colors, radius, space } from "@/theme";
import { Card } from "./Card";
import { Text } from "./Text";

const LEVEL: Record<string, number> = { beginner: 1, intermediate: 2, advanced: 3 };

export function capitalise(s: string) {
  return s ? s[0].toUpperCase() + s.slice(1) : s;
}

/** Three-bar difficulty meter (beginner → advanced). */
export function DifficultyMeter({ difficulty, light = false }: { difficulty: string | null; light?: boolean }) {
  const level = LEVEL[difficulty ?? ""] ?? 0;
  if (!level) return null;
  return (
    <View style={styles.meterRow} accessibilityLabel={`Difficulty: ${difficulty}`}>
      <View style={styles.meter}>
        {[1, 2, 3].map((n) => (
          <View
            key={n}
            style={[
              styles.bar,
              { height: 4 + n * 3 },
              { backgroundColor: n <= level ? colors.accent : light ? "rgba(255,255,255,0.25)" : colors.border },
            ]}
          />
        ))}
      </View>
      <Text variant="small" style={light ? styles.light : undefined}>
        {capitalise(difficulty ?? "")}
      </Text>
    </View>
  );
}

export function ExerciseRow({ exercise, showGroup = false }: { exercise: Exercise; showGroup?: boolean }) {
  return (
    <Card
      onPress={() => router.push(`/exercise/${exercise.muscleGroup}/${exercise.slug}`)}
      accessibilityLabel={exercise.title}
      style={styles.card}
    >
      <View style={styles.icon}>
        <Ionicons name="barbell-outline" size={20} color={colors.accent} />
      </View>
      <View style={styles.text}>
        {showGroup ? (
          <Text variant="label">{MUSCLE_GROUP_LABEL[exercise.muscleGroup] ?? exercise.muscleGroup}</Text>
        ) : null}
        <Text variant="heading" numberOfLines={1}>
          {exercise.title}
        </Text>
        <View style={styles.meta}>
          <DifficultyMeter difficulty={exercise.difficulty} />
          {exercise.equipment.length ? (
            <Text variant="small" numberOfLines={1} style={styles.equipment}>
              · {exercise.equipment.map(capitalise).join(", ")}
            </Text>
          ) : null}
        </View>
      </View>
      <Ionicons name="chevron-forward" size={18} color={colors.subtle} />
    </Card>
  );
}

const styles = StyleSheet.create({
  card: { flexDirection: "row", alignItems: "center", gap: space.md, paddingVertical: space.md },
  icon: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    backgroundColor: colors.ink,
    alignItems: "center",
    justifyContent: "center",
  },
  text: { flex: 1, gap: 2 },
  meta: { flexDirection: "row", alignItems: "center", gap: space.xs },
  meterRow: { flexDirection: "row", alignItems: "center", gap: 6 },
  meter: { flexDirection: "row", alignItems: "flex-end", gap: 2 },
  bar: { width: 4, borderRadius: 1 },
  equipment: { flexShrink: 1 },
  light: { color: "#D4D4D4" },
});
