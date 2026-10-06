import { useQuery } from "@tanstack/react-query";
import { Stack, useLocalSearchParams } from "expo-router";
import { useMemo, useState } from "react";
import { RefreshControl, ScrollView, StyleSheet, View } from "react-native";
import Animated, { useAnimatedScrollHandler, useSharedValue } from "react-native-reanimated";

import { MUSCLE_GROUP_LABEL, fetchExercises } from "@/api/library";
import { Chip } from "@/components/Chip";
import { ExerciseRow, capitalise } from "@/components/ExerciseRow";
import { ParallaxHeader } from "@/components/ParallaxHeader";
import { SkeletonList } from "@/components/Skeleton";
import { EmptyState, ErrorState } from "@/components/States";
import { Text } from "@/components/Text";
import { MUSCLE_GROUP_IMAGE } from "@/lib/images";
import { colors, layout, space } from "@/theme";

const LEVELS = ["all", "beginner", "intermediate", "advanced"] as const;

export default function MuscleGroupScreen() {
  const { group } = useLocalSearchParams<{ group: string }>();
  const label = MUSCLE_GROUP_LABEL[group] ?? capitalise(String(group ?? ""));
  const query = useQuery({ queryKey: ["exercises"], queryFn: ({ signal }) => fetchExercises(signal) });
  const [level, setLevel] = useState<(typeof LEVELS)[number]>("all");
  const scrollY = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler((e) => {
    scrollY.value = e.contentOffset.y;
  });

  const inGroup = useMemo(() => (query.data ?? []).filter((e) => e.muscleGroup === group), [query.data, group]);
  const list = level === "all" ? inGroup : inGroup.filter((e) => e.difficulty === level);

  return (
    <View style={styles.root}>
      <Stack.Screen options={{ title: "", headerTransparent: true, headerTintColor: colors.bg }} />
      <Animated.ScrollView
        onScroll={onScroll}
        scrollEventThrottle={16}
        contentContainerStyle={{ paddingBottom: layout.bottomClearance }}
        refreshControl={<RefreshControl refreshing={query.isRefetching} onRefresh={() => query.refetch()} tintColor={colors.accent} />}
      >
        <ParallaxHeader image={MUSCLE_GROUP_IMAGE[group] ?? null} height={280} scrollY={scrollY}>
          <Text variant="label" style={styles.eyebrow}>
            Exercises
          </Text>
          <Text variant="display" style={styles.heroTitle}>
            {label}
          </Text>
          {inGroup.length ? (
            <Text variant="body" style={styles.heroSub}>
              {inGroup.length} movements
            </Text>
          ) : null}
        </ParallaxHeader>

        <View style={styles.body}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chips}>
            {LEVELS.map((l) => (
              <Chip key={l} label={l === "all" ? "All levels" : capitalise(l)} active={level === l} onPress={() => setLevel(l)} />
            ))}
          </ScrollView>
          {query.isPending ? (
            <SkeletonList count={4} image={false} />
          ) : query.isError ? (
            <ErrorState error={query.error} onRetry={() => query.refetch()} />
          ) : list.length ? (
            list.map((e) => <ExerciseRow key={e.id} exercise={e} />)
          ) : (
            <EmptyState title="Nothing at this level yet" hint="Try another difficulty." />
          )}
        </View>
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  eyebrow: { color: colors.accent },
  heroTitle: { color: colors.bg, fontSize: 34, lineHeight: 40 },
  heroSub: { color: "#D4D4D4" },
  body: { padding: space.lg, gap: space.sm },
  chips: { gap: space.sm, paddingBottom: space.sm },
});
