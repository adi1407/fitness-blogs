import Ionicons from "@expo/vector-icons/Ionicons";
import { useQuery } from "@tanstack/react-query";
import { router } from "expo-router";
import { useMemo, useState } from "react";
import { Pressable, StyleSheet, useWindowDimensions, View } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";

import { fetchArticles, articleImage, type ArticleSummary } from "@/api/articles";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { HorizontalRail } from "@/components/HorizontalRail";
import { ImageTile } from "@/components/ImageTile";
import { PillButton } from "@/components/PillButton";
import { Screen } from "@/components/Screen";
import { Skeleton } from "@/components/Skeleton";
import { EmptyState, ErrorState } from "@/components/States";
import { StoryLead, StoryRailCard, StoryRow } from "@/components/Story";
import { Text } from "@/components/Text";
import { UnderlineTabs } from "@/components/UnderlineTabs";
import { SITE_URL } from "@/config";
import { thumb } from "@/lib/images";
import { KNOWLEDGE_SECTIONS } from "@/lib/knowledge";
import { openLink } from "@/lib/links";
import { PILLARS, PILLAR_BY_SLUG, isPillarSlug, type PillarSlug } from "@/lib/pillars";
import { colors, fonts, radius, space } from "@/theme";

type TabId = "latest" | PillarSlug;

const TABS: { id: TabId; label: string }[] = [{ id: "latest", label: "Latest" }, ...PILLARS.map((p) => ({ id: p.slug, label: p.title }))];
const RAIL_SIZE = 4;

function pickLead(list: ArticleSummary[]) {
  return list.find((a) => articleImage(a)) ?? list[0] ?? null;
}

function SectionTitle({ title, subtitle, onSeeAll }: { title: string; subtitle?: string; onSeeAll?: () => void }) {
  return (
    <View style={styles.sectionHead}>
      <View style={styles.flex}>
        <Text variant="title" accessibilityRole="header">
          {title}
        </Text>
        {subtitle ? (
          <Text variant="small" style={styles.sectionSub}>
            {subtitle}
          </Text>
        ) : null}
      </View>
      {onSeeAll ? (
        <Pressable onPress={onSeeAll} hitSlop={10} accessibilityRole="link" accessibilityLabel={`See all ${title}`} style={styles.seeAll}>
          <Text style={styles.seeAllText}>See all</Text>
          <Ionicons name="arrow-forward" size={13} color={colors.ink} />
        </Pressable>
      ) : null}
    </View>
  );
}

export default function LearnScreen() {
  const { width } = useWindowDimensions();
  const [tab, setTab] = useState<TabId>("latest");
  const query = useQuery({ queryKey: ["articles"], queryFn: ({ signal }) => fetchArticles(signal) });

  const view = useMemo(() => {
    const all = query.data ?? [];
    if (tab !== "latest") {
      const list = all.filter((a) => a.categorySlug === tab);
      const lead = pickLead(list);
      return { lead, rails: [], rest: list.filter((a) => a !== lead) };
    }
    const lead = pickLead(all);
    const used = new Set<ArticleSummary>(lead ? [lead] : []);
    const rails = PILLARS.map((p) => {
      const items = all.filter((a) => a.categorySlug === p.slug && !used.has(a)).slice(0, RAIL_SIZE);
      items.forEach((a) => used.add(a));
      return { pillar: p, items };
    }).filter((r) => r.items.length);
    return { lead, rails, rest: all.filter((a) => !used.has(a)) };
  }, [query.data, tab]);

  const pillar = isPillarSlug(tab) ? PILLAR_BY_SLUG[tab] : null;
  const railWidth = Math.min(width * 0.68, 264);

  return (
    <Screen refreshing={query.isRefetching} onRefresh={() => query.refetch()}>
      <View style={styles.intro}>
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Learn" }]} />
        <Text style={styles.title} accessibilityRole="header" maxFontSizeMultiplier={1.3}>
          {pillar ? pillar.title : "Latest"}
        </Text>
        <Text variant="body" style={styles.lede}>
          {pillar
            ? pillar.intro
            : "Evidence-informed guides across muscle building, weight loss and nutrition — written to answer real questions and link into tools and databases."}
        </Text>
        <Text variant="small" style={styles.note}>
          Educational content only. Consult a qualified professional for personal medical or diet advice.{" "}
          <Text style={styles.noteLink} onPress={() => openLink(`${SITE_URL}/medical-disclaimer`)} accessibilityRole="link">
            Medical disclaimer
          </Text>
        </Text>
      </View>

      <UnderlineTabs tabs={TABS} value={tab} onChange={setTab} />

      {query.isPending ? (
        <View style={styles.loading}>
          <Skeleton height={200} rounded={radius.md} />
          <Skeleton height={28} width="85%" />
          <Skeleton height={18} width="60%" />
        </View>
      ) : query.isError ? (
        <ErrorState error={query.error} onRetry={() => query.refetch()} />
      ) : !view.lead ? (
        <EmptyState title="No guides here yet" hint="Our writers are working on this topic." />
      ) : (
        <Animated.View key={tab} entering={FadeIn.duration(260)} style={styles.feed}>
          <StoryLead
            article={view.lead}
            label={pillar ? `Featured in ${pillar.title}` : "Featured"}
            context={pillar ? "category" : "all"}
          />

          {view.rails.map(({ pillar: p, items }) => (
            <View key={p.slug} style={styles.rail}>
              <SectionTitle title={p.title} subtitle={p.tagline} onSeeAll={() => router.push(`/hub/${p.slug}`)} />
              <HorizontalRail
                data={items}
                itemWidth={railWidth}
                gap={space.lg}
                keyExtractor={(a) => a.id}
                renderItem={(a) => <StoryRailCard article={a} />}
              />
            </View>
          ))}

          {pillar ? (
            <View style={styles.hubCard}>
              <Text variant="heading">Explore the {pillar.title} hub</Text>
              <Text variant="small">Topics, calculators and a quick-start path for {pillar.title.toLowerCase()}.</Text>
              <PillButton label={`Open ${pillar.title}`} icon="arrow-forward" onPress={() => router.push(`/hub/${pillar.slug}`)} style={styles.hubButton} />
            </View>
          ) : (
            <View style={styles.callout}>
              <Text variant="label" style={styles.calloutLabel}>
                Tools
              </Text>
              <Text variant="title">Prefer a number first?</Text>
              <Text variant="small" style={styles.calloutText}>
                Free calculators for protein, TDEE, macros and more — each one teaches and links back into guides.
              </Text>
              <PillButton label="Open calculators" onPress={() => router.push("/tools")} style={styles.hubButton} />
            </View>
          )}

          {!pillar ? (
            <View style={styles.rail}>
              <SectionTitle title="Go deeper" subtitle="Structured programs and honest buyer's guides." />
              <View style={styles.guides}>
                {(Object.keys(KNOWLEDGE_SECTIONS) as (keyof typeof KNOWLEDGE_SECTIONS)[]).map((s) => (
                  <ImageTile
                    key={s}
                    image={thumb(KNOWLEDGE_SECTIONS[s].image)}
                    eyebrow={KNOWLEDGE_SECTIONS[s].eyebrow}
                    title={KNOWLEDGE_SECTIONS[s].label}
                    height={140}
                    style={styles.flex}
                    onPress={() => router.push(`/guides/${s}`)}
                  />
                ))}
              </View>
            </View>
          ) : null}

          {view.rest.length ? (
            <View>
              <SectionTitle title={pillar ? `More in ${pillar.title}` : "More guides"} />
              <View style={styles.rows}>
                {view.rest.map((a, i) => (
                  <StoryRow key={a.id} article={a} first={i === 0} context={pillar ? "category" : "all"} />
                ))}
              </View>
            </View>
          ) : null}
        </Animated.View>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  intro: { gap: space.md, paddingTop: space.sm },
  title: { fontFamily: fonts.semibold, fontSize: 38, lineHeight: 43, letterSpacing: -1.3, color: colors.ink },
  lede: { color: colors.muted, fontSize: 16, lineHeight: 25 },
  note: { lineHeight: 19 },
  noteLink: { fontFamily: fonts.semibold, fontSize: 13, color: colors.ink, textDecorationLine: "underline" },
  loading: { gap: space.md },
  feed: { gap: space.xxl },
  rail: { gap: space.lg, paddingBottom: space.xl, borderBottomWidth: 1, borderBottomColor: colors.border },
  sectionHead: { flexDirection: "row", alignItems: "flex-end", gap: space.md },
  sectionSub: { marginTop: 3 },
  seeAll: { flexDirection: "row", alignItems: "center", gap: 4, paddingBottom: 3 },
  seeAllText: { fontFamily: fonts.semibold, fontSize: 13, color: colors.ink },
  callout: {
    gap: space.sm,
    padding: space.xl,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: "rgba(245,245,245,0.5)",
  },
  calloutLabel: { color: colors.ink },
  calloutText: { lineHeight: 19 },
  hubCard: {
    gap: space.sm,
    padding: space.xl,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.accentBorder,
    backgroundColor: "#FFF8EE",
  },
  hubButton: { alignSelf: "flex-start", marginTop: space.sm },
  guides: { flexDirection: "row", gap: space.md },
  rows: { marginTop: space.md },
});
