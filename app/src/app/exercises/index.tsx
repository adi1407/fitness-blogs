import Ionicons from "@expo/vector-icons/Ionicons";
import { useQuery } from "@tanstack/react-query";
import { Stack, router } from "expo-router";
import { useDeferredValue, useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

import { MUSCLE_GROUPS, MUSCLE_GROUP_LABEL, fetchExercises } from "@/api/library";
import { ExerciseCard } from "@/components/ExerciseRow";
import { HorizontalRail } from "@/components/HorizontalRail";
import { ImageTile } from "@/components/ImageTile";
import { KnowledgeDisclaimer, PageIntro } from "@/components/PageIntro";
import { PillButton } from "@/components/PillButton";
import { PressableScale } from "@/components/PressableScale";
import { Screen } from "@/components/Screen";
import { SearchInput } from "@/components/SearchInput";
import { SkeletonList } from "@/components/Skeleton";
import { EmptyState, ErrorState } from "@/components/States";
import { Text } from "@/components/Text";
import { GROUP_BLURB } from "@/lib/exerciseGroups";
import { MUSCLE_GROUP_IMAGE, thumb } from "@/lib/images";
import { colors, fonts, radius, space } from "@/theme";

export default function ExercisesScreen() {
  const query = useQuery({ queryKey: ["exercises"], queryFn: ({ signal }) => fetchExercises(signal) });
  const [search, setSearch] = useState("");
  const deferred = useDeferredValue(search);

  const counts = useMemo(() => {
    const m = new Map<string, number>();
    for (const e of query.data ?? []) m.set(e.muscleGroup, (m.get(e.muscleGroup) ?? 0) + 1);
    return m;
  }, [query.data]);

  const results = useMemo(() => {
    const q = deferred.trim().toLowerCase();
    if (!q) return [];
    return (query.data ?? []).filter(
      (e) =>
        e.title.toLowerCase().includes(q) ||
        e.primaryMuscles.some((m) => m.toLowerCase().includes(q)) ||
        e.equipment.some((m) => m.toLowerCase().includes(q)),
    );
  }, [query.data, deferred]);

  const searching = deferred.trim().length > 0;

  return (
    <Screen refreshing={query.isRefetching} onRefresh={() => query.refetch()}>
      <Stack.Screen options={{ title: "" }} />
      <PageIntro
        crumbs={[{ label: "Library", href: "/library" }, { label: "Exercises" }]}
        title="Exercise library"
        lede={`${query.data?.length ? `${query.data.length} lifts` : "Lifts"} by muscle group, each with form cues, common mistakes and programming notes you can use on a busy gym floor.`}
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

      <SearchInput value={search} onChangeText={setSearch} placeholder="Search lifts, muscles or equipment" />

      {query.isError ? (
        <ErrorState error={query.error} onRetry={() => query.refetch()} />
      ) : searching ? (
        <View style={styles.list}>
          {query.isPending ? (
            <SkeletonList count={3} image={false} />
          ) : results.length ? (
            <>
              <Text variant="small">
                {results.length} {results.length === 1 ? "exercise" : "exercises"}
              </Text>
              {results.map((e) => (
                <ExerciseCard key={e.id} exercise={e} showGroup />
              ))}
            </>
          ) : (
            <EmptyState title="No matching exercises" hint="Try a muscle like 'glutes' or equipment like 'dumbbells'." />
          )}
        </View>
      ) : (
        <>
          <View>
            <HorizontalRail
              data={[...MUSCLE_GROUPS]}
              itemWidth={132}
              gap={space.md}
              keyExtractor={(g) => g}
              renderItem={(g) => (
                <ImageTile
                  image={thumb(MUSCLE_GROUP_IMAGE[g])}
                  title={MUSCLE_GROUP_LABEL[g]}
                  subtitle={counts.get(g) ? `${counts.get(g)} lifts` : undefined}
                  height={170}
                  onPress={() => router.push(`/exercises/${g}`)}
                />
              )}
            />
          </View>

          <View style={styles.list}>
            {MUSCLE_GROUPS.map((g, i) => (
              <Animated.View key={g} entering={FadeInDown.delay(60 + i * 45).duration(320)}>
                <PressableScale
                  onPress={() => router.push(`/exercises/${g}`)}
                  accessibilityRole="link"
                  accessibilityLabel={`${MUSCLE_GROUP_LABEL[g]}. ${GROUP_BLURB[g]}`}
                  scaleTo={0.985}
                  style={styles.groupCard}
                >
                  <View style={styles.groupText}>
                    <Text variant="heading" style={styles.groupTitle}>
                      {MUSCLE_GROUP_LABEL[g]}
                    </Text>
                    <Text variant="small">{GROUP_BLURB[g]}</Text>
                  </View>
                  <View style={styles.groupMeta}>
                    {counts.get(g) ? <Text style={styles.count}>{counts.get(g)}</Text> : null}
                    <Ionicons name="arrow-forward" size={16} color={colors.ink} />
                  </View>
                </PressableScale>
              </Animated.View>
            ))}
          </View>
        </>
      )}

      <KnowledgeDisclaimer />
    </Screen>
  );
}

const styles = StyleSheet.create({
  pills: { flexDirection: "row", flexWrap: "wrap", gap: space.sm, marginTop: space.sm },
  pill: { minHeight: 40, paddingHorizontal: space.lg },
  list: { gap: space.md },
  groupCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: space.md,
    padding: space.lg,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.bg,
  },
  groupText: { flex: 1, gap: 3 },
  groupTitle: { fontSize: 17, lineHeight: 23 },
  groupMeta: { flexDirection: "row", alignItems: "center", gap: space.sm },
  count: { fontFamily: fonts.semibold, fontSize: 13, color: colors.muted },
});
