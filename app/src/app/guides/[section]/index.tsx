import { useQuery } from "@tanstack/react-query";
import { Stack, useLocalSearchParams } from "expo-router";
import { RefreshControl, StyleSheet, View } from "react-native";
import Animated, { FadeInDown, useAnimatedScrollHandler, useSharedValue } from "react-native-reanimated";

import { fetchKnowledge } from "@/api/library";
import { HtmlBody } from "@/components/HtmlBody";
import { KnowledgeRow } from "@/components/KnowledgeRow";
import { ParallaxHeader } from "@/components/ParallaxHeader";
import { SectionHeader } from "@/components/SectionHeader";
import { SkeletonList } from "@/components/Skeleton";
import { EmptyState, ErrorState } from "@/components/States";
import { Text } from "@/components/Text";
import { SITE_URL } from "@/config";
import { KNOWLEDGE_SECTIONS, isKnowledgeSection } from "@/lib/knowledge";
import { openLink } from "@/lib/links";
import { colors, layout, space } from "@/theme";

export default function KnowledgeHubScreen() {
  const { section } = useLocalSearchParams<{ section: string }>();
  const valid = isKnowledgeSection(section);
  const meta = valid ? KNOWLEDGE_SECTIONS[section] : null;
  const query = useQuery({
    queryKey: ["knowledge", section],
    queryFn: ({ signal }) => fetchKnowledge(section as "programs" | "reviews", signal),
    enabled: valid,
  });
  const scrollY = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler((e) => {
    scrollY.value = e.contentOffset.y;
  });

  if (!valid || !meta) return <EmptyState title="Section not found" />;

  const hub = query.data?.hub;
  const pages = query.data?.pages ?? [];

  return (
    <View style={styles.root}>
      <Stack.Screen options={{ title: "", headerTransparent: true, headerTintColor: colors.bg }} />
      <Animated.ScrollView
        onScroll={onScroll}
        scrollEventThrottle={16}
        contentContainerStyle={{ paddingBottom: layout.bottomClearance }}
        refreshControl={<RefreshControl refreshing={query.isRefetching} onRefresh={() => query.refetch()} tintColor={colors.accent} />}
      >
        <ParallaxHeader image={meta.image} height={300} scrollY={scrollY}>
          <Text variant="label" style={styles.eyebrow}>
            {meta.eyebrow}
          </Text>
          <Text variant="display" style={styles.heroTitle}>
            {hub?.title ?? meta.label}
          </Text>
          {hub?.excerpt ? (
            <Text variant="body" style={styles.heroSub}>
              {hub.excerpt}
            </Text>
          ) : null}
        </ParallaxHeader>

        <View style={styles.body}>
          <SectionHeader eyebrow={`${pages.length || ""} guides`.trim()} title={section === "programs" ? "Pick a plan" : "Read before you buy"} />
          {query.isPending ? (
            <SkeletonList count={3} image={false} />
          ) : query.isError ? (
            <ErrorState error={query.error} onRetry={() => query.refetch()} />
          ) : pages.length ? (
            pages.map((p, i) => (
              <Animated.View key={p.id} entering={FadeInDown.delay(i * 60).duration(320)}>
                <KnowledgeRow page={p} index={section === "programs" ? i : undefined} />
              </Animated.View>
            ))
          ) : (
            <EmptyState title="Guides are on the way" />
          )}

          {hub?.bodyHtml ? (
            <View style={styles.bodyWrap}>
              <HtmlBody html={hub.bodyHtml} />
            </View>
          ) : null}

          <Text variant="small" style={styles.link} onPress={() => openLink(`${SITE_URL}${hub?.path ?? `/${section}`}`)}>
            View on fitlives.in
          </Text>
        </View>
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  eyebrow: { color: colors.accent },
  heroTitle: { color: colors.bg, fontSize: 32, lineHeight: 38 },
  heroSub: { color: "#D4D4D4" },
  body: { padding: space.lg, gap: space.md },
  bodyWrap: { marginHorizontal: -space.lg, marginTop: space.lg },
  link: { color: colors.ink, textDecorationLine: "underline", textAlign: "center", marginTop: space.lg },
});
