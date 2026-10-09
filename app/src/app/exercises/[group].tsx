import { useQuery } from "@tanstack/react-query";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";

import { MUSCLE_GROUP_LABEL, fetchExercises } from "@/api/library";
import { Chip } from "@/components/Chip";
import { ExerciseCard, capitalise } from "@/components/ExerciseRow";
import { KnowledgeDisclaimer, PageIntro } from "@/components/PageIntro";
import { PillButton } from "@/components/PillButton";
import { Screen } from "@/components/Screen";
import { SkeletonList } from "@/components/Skeleton";
import { EmptyState, ErrorState } from "@/components/States";
import { Text } from "@/components/Text";
import { GROUP_INTRO } from "@/lib/exerciseGroups";
import { space } from "@/theme";

const LEVELS = ["all", "beginner", "intermediate", "advanced"] as const;

export default function MuscleGroupScreen() {
  const { group } = useLocalSearchParams<{ group: string }>();
  const key = String(group ?? "");
  const label = MUSCLE_GROUP_LABEL[key] ?? capitalise(key);
  const query = useQuery({ queryKey: ["exercises"], queryFn: ({ signal }) => fetchExercises(signal) });
  const [level, setLevel] = useState<(typeof LEVELS)[number]>("all");

  const inGroup = useMemo(() => (query.data ?? []).filter((e) => e.muscleGroup === key), [query.data, key]);
  const levels = useMemo(() => LEVELS.filter((l) => l === "all" || inGroup.some((e) => e.difficulty === l)), [inGroup]);
  const list = level === "all" ? inGroup : inGroup.filter((e) => e.difficulty === level);

  return (
    <Screen refreshing={query.isRefetching} onRefresh={() => query.refetch()}>
      <Stack.Screen options={{ title: "" }} />
      <PageIntro
        crumbs={[{ label: "Library", href: "/library" }, { label: "Exercises", href: "/exercises" }, { label }]}
        title={`${label} exercises`}
        lede={GROUP_INTRO[key]}
      >
        <View style={styles.pills}>
          <PillButton label="Muscle building guide" onPress={() => router.push("/hub/muscle-building")} style={styles.pill} />
          <PillButton
            label="Training programs"
            variant="ghost"
            onPress={() => router.push("/guides/programs")}
            style={styles.pill}
          />
        </View>
      </PageIntro>

      {levels.length > 2 ? (
        <View style={styles.chips} accessibilityLabel="Difficulty">
          {levels.map((l) => (
            <Chip key={l} label={l === "all" ? "All levels" : capitalise(l)} active={level === l} onPress={() => setLevel(l)} />
          ))}
        </View>
      ) : null}

      {query.isPending ? (
        <SkeletonList count={4} image={false} />
      ) : query.isError ? (
        <ErrorState error={query.error} onRetry={() => query.refetch()} />
      ) : list.length ? (
        <View style={styles.list}>
          <Text variant="small">
            {list.length} {list.length === 1 ? "exercise" : "exercises"}
          </Text>
          {list.map((e) => (
            <ExerciseCard key={e.id} exercise={e} />
          ))}
        </View>
      ) : (
        <EmptyState
          title={inGroup.length ? "Nothing at this level yet" : "Exercises are being published"}
          hint={inGroup.length ? "Try another difficulty." : "Check back soon."}
        />
      )}

      <KnowledgeDisclaimer />
    </Screen>
  );
}

const styles = StyleSheet.create({
  pills: { flexDirection: "row", flexWrap: "wrap", gap: space.sm, marginTop: space.sm },
  pill: { minHeight: 40, paddingHorizontal: space.lg },
  chips: { flexDirection: "row", flexWrap: "wrap", gap: space.sm },
  list: { gap: space.md },
});
