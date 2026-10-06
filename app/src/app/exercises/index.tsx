import { useQuery } from "@tanstack/react-query";
import { router } from "expo-router";
import { useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

import { MUSCLE_GROUPS, MUSCLE_GROUP_LABEL, fetchExercises } from "@/api/library";
import { ExerciseRow } from "@/components/ExerciseRow";
import { GradientHero } from "@/components/GradientHero";
import { ImageTile } from "@/components/ImageTile";
import { Screen } from "@/components/Screen";
import { SearchInput } from "@/components/SearchInput";
import { SkeletonList } from "@/components/Skeleton";
import { EmptyState, ErrorState } from "@/components/States";
import { Text } from "@/components/Text";
import { MUSCLE_GROUP_IMAGE, thumb } from "@/lib/images";
import { space } from "@/theme";

export default function ExercisesScreen() {
  const query = useQuery({ queryKey: ["exercises"], queryFn: ({ signal }) => fetchExercises(signal) });
  const [search, setSearch] = useState("");

  const counts = useMemo(() => {
    const m = new Map<string, number>();
    for (const e of query.data ?? []) m.set(e.muscleGroup, (m.get(e.muscleGroup) ?? 0) + 1);
    return m;
  }, [query.data]);

  const results = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return [];
    return (query.data ?? []).filter(
      (e) =>
        e.title.toLowerCase().includes(q) ||
        e.primaryMuscles.some((m) => m.toLowerCase().includes(q)) ||
        e.equipment.some((m) => m.toLowerCase().includes(q)),
    );
  }, [query.data, search]);

  return (
    <Screen refreshing={query.isRefetching} onRefresh={() => query.refetch()}>
      <GradientHero
        eyebrow="Exercise library"
        title="Train with intent."
        subtitle={`${query.data?.length ?? 50} lifts with form cues, common mistakes and programming notes.`}
      />
      <SearchInput value={search} onChangeText={setSearch} placeholder="Search lifts, muscles or equipment" />

      {query.isError ? (
        <ErrorState error={query.error} onRetry={() => query.refetch()} />
      ) : search.trim() ? (
        <View style={styles.list}>
          {query.isPending ? (
            <SkeletonList count={3} image={false} />
          ) : results.length ? (
            results.map((e) => <ExerciseRow key={e.id} exercise={e} showGroup />)
          ) : (
            <EmptyState title="No matching exercises" hint="Try a muscle like 'glutes' or equipment like 'dumbbells'." />
          )}
        </View>
      ) : (
        <View style={styles.grid}>
          {MUSCLE_GROUPS.map((g, i) => (
            <Animated.View key={g} entering={FadeInDown.delay(i * 50).duration(320)} style={styles.cell}>
              <ImageTile
                image={thumb(MUSCLE_GROUP_IMAGE[g])}
                title={MUSCLE_GROUP_LABEL[g]}
                subtitle={counts.get(g) ? `${counts.get(g)} exercises` : undefined}
                onPress={() => router.push(`/exercises/${g}`)}
                height={150}
              />
            </Animated.View>
          ))}
        </View>
      )}

      <Text variant="small">Warm up first, and stop any lift that causes sharp pain. Not a substitute for a coach.</Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  grid: { flexDirection: "row", flexWrap: "wrap", gap: space.md },
  cell: { width: "47.5%", flexGrow: 1 },
  list: { gap: space.sm },
});
