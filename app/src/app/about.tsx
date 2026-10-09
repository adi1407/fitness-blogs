import { Image } from "expo-image";
import { Stack, router, type Href } from "expo-router";
import { Linking, StyleSheet, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

import { ImageTile } from "@/components/ImageTile";
import { LinkGroup, LinkRow } from "@/components/LinkRow";
import { KnowledgeDisclaimer, PageIntro } from "@/components/PageIntro";
import { PillButton } from "@/components/PillButton";
import { PressableScale } from "@/components/PressableScale";
import { Screen } from "@/components/Screen";
import { Text } from "@/components/Text";
import { SITE_URL } from "@/config";
import { IMG, thumb } from "@/lib/images";
import { openLink } from "@/lib/links";
import { PILLARS } from "@/lib/pillars";
import { CONTACT_EMAIL, SOCIAL, TRUST_PAGES } from "@/lib/trust";
import { colors, radius, space } from "@/theme";

const PRINCIPLES = [
  "Search intent first, keywords second",
  "Cite reputable sources for health and nutrition claims",
  "Prefer educational framing over medical promises",
  "Build topic clusters that interconnect with tools and databases",
  "Highlight Indian nutrition context as a differentiator",
];

const DATABASES: { title: string; blurb: string; image: string; href: Href }[] = [
  { title: "Calculators", blurb: "Educational tools that teach and link into guides.", image: IMG.healthConsult, href: "/tools" },
  { title: "Indian foods", blurb: "High-protein staples mapped to real goals.", image: IMG.indianThali, href: "/foods" },
  { title: "Exercises", blurb: "Browse by muscle group, then connect to guidance.", image: IMG.gymFloor, href: "/exercises" },
];

function SectionTitle({ title, lede }: { title: string; lede: string }) {
  return (
    <View style={styles.sectionHead}>
      <Text variant="title" style={styles.sectionTitle} accessibilityRole="header">
        {title}
      </Text>
      <Text variant="small" style={styles.sectionLede}>
        {lede}
      </Text>
    </View>
  );
}

export default function AboutScreen() {
  return (
    <Screen>
      <Stack.Screen options={{ title: "" }} />
      <PageIntro
        crumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
        kicker="About the platform"
        title="Build a stronger body. Understand your nutrition."
        lede="fitlives is a searchable fitness knowledge platform — articles, guides, calculators, foods and exercises — designed to answer real questions better than a thin blog post."
      >
        <View style={styles.pills}>
          <PillButton label="Latest guides" onPress={() => router.navigate("/learn")} style={styles.pill} />
          <PillButton label="Free calculators" variant="ghost" onPress={() => router.navigate("/tools")} style={styles.pill} />
        </View>
      </PageIntro>

      <View style={styles.section}>
        <SectionTitle
          title="Three knowledge pillars"
          lede="Deep clusters — muscle building, weight loss and nutrition — with articles under each subcategory."
        />
        {PILLARS.map((p, i) => (
          <Animated.View key={p.slug} entering={FadeInDown.delay(60 + i * 50).duration(320)}>
            <ImageTile image={thumb(p.image)} title={p.title} subtitle={p.tagline} height={120} onPress={() => router.push(`/hub/${p.slug}`)} />
          </Animated.View>
        ))}
      </View>

      <View style={styles.section}>
        <SectionTitle
          title="Tools & databases"
          lede="Calculators and libraries that complement the articles — the part a blog alone can't do."
        />
        {DATABASES.map((d) => (
          <PressableScale
            key={d.title}
            onPress={() => router.push(d.href)}
            accessibilityRole="link"
            accessibilityLabel={`${d.title}. ${d.blurb}`}
            scaleTo={0.985}
            style={styles.dbCard}
          >
            <Image source={thumb(d.image)} style={styles.dbImage} contentFit="cover" transition={200} />
            <View style={styles.dbText}>
              <Text variant="heading">{d.title}</Text>
              <Text variant="small">{d.blurb}</Text>
            </View>
          </PressableScale>
        ))}
      </View>

      <View style={styles.section}>
        <SectionTitle title="Editorial philosophy" lede="How every article, tool and database entry is put together." />
        <View style={styles.principles}>
          {PRINCIPLES.map((p) => (
            <View key={p} style={styles.principle}>
              <View style={styles.bullet} />
              <Text variant="body" style={styles.flex}>
                {p}
              </Text>
            </View>
          ))}
        </View>
      </View>

      <LinkGroup title="Trust & transparency">
        {TRUST_PAGES.map((p) => (
          <LinkRow key={p.path} icon={p.icon} label={p.label} external onPress={() => openLink(`${SITE_URL}${p.path}`)} />
        ))}
      </LinkGroup>

      <LinkGroup title="Follow & contact">
        {SOCIAL.map((s) => (
          <LinkRow key={s.href} icon={s.icon} label={s.label} detail={s.handle} external onPress={() => openLink(s.href)} />
        ))}
        <LinkRow
          icon="mail-outline"
          label="Email us"
          detail="Corrections & feedback"
          external
          onPress={() => Linking.openURL(`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("fitlives app feedback")}`).catch(() => {})}
        />
      </LinkGroup>

      <KnowledgeDisclaimer />
    </Screen>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  pills: { flexDirection: "row", flexWrap: "wrap", gap: space.sm, marginTop: space.sm },
  pill: { minHeight: 40, paddingHorizontal: space.lg },
  section: { gap: space.md },
  sectionHead: { gap: 4 },
  sectionTitle: { fontSize: 21, lineHeight: 27 },
  sectionLede: { lineHeight: 19 },
  dbCard: {
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.bg,
    overflow: "hidden",
  },
  dbImage: { width: "100%", height: 110, backgroundColor: colors.surface },
  dbText: { paddingHorizontal: space.lg, paddingVertical: space.md, gap: 2 },
  principles: { gap: space.sm },
  principle: { flexDirection: "row", alignItems: "flex-start", gap: space.md },
  bullet: { width: 6, height: 6, borderRadius: 3, backgroundColor: colors.accent, marginTop: 9 },
});
