import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { Linking, StyleSheet, View } from "react-native";

import { GradientHero } from "@/components/GradientHero";
import { ImageTile } from "@/components/ImageTile";
import { LinkGroup, LinkRow } from "@/components/LinkRow";
import { Screen } from "@/components/Screen";
import { SectionHeader } from "@/components/SectionHeader";
import { Text } from "@/components/Text";
import { SITE_URL } from "@/config";
import { IMG, thumb } from "@/lib/images";
import { openLink } from "@/lib/links";
import { PILLARS } from "@/lib/pillars";
import { CONTACT_EMAIL, SOCIAL, TRUST_PAGES } from "@/lib/trust";
import { colors, radius, space } from "@/theme";

const PRINCIPLES = [
  { icon: "search-outline", title: "Search intent first", text: "Every page answers a real question completely." },
  { icon: "library-outline", title: "Cited sources", text: "Health and nutrition claims link to reputable research." },
  { icon: "shield-checkmark-outline", title: "Educational, not medical", text: "No cures or medication advice — we point you to professionals." },
  { icon: "flag-outline", title: "Built for India", text: "Indian foods, portions and BMI cut-offs, not copy-pasted Western norms." },
] as const;

const DATABASES = [
  { title: "Calculators", image: IMG.healthConsult, go: () => router.push("/tools") },
  { title: "Indian foods", image: IMG.indianThali, go: () => router.push("/foods") },
  { title: "Exercises", image: IMG.gymFloor, go: () => router.push("/exercises") },
];

export default function AboutScreen() {
  return (
    <Screen>
      <GradientHero
        eyebrow="About fitlives"
        title="Fitness knowledge, not filler."
        subtitle="A searchable platform of articles, calculators, Indian foods and exercises — written to answer real questions better than a thin blog post."
      />

      <View style={styles.section}>
        <SectionHeader eyebrow="What we cover" title="Three knowledge pillars" />
        {PILLARS.map((p) => (
          <ImageTile key={p.slug} image={thumb(p.image)} title={p.title} subtitle={p.tagline} height={120} onPress={() => router.push(`/hub/${p.slug}`)} />
        ))}
      </View>

      <View style={styles.section}>
        <SectionHeader eyebrow="Beyond articles" title="Tools & databases" />
        <View style={styles.row}>
          {DATABASES.map((d) => (
            <ImageTile key={d.title} image={thumb(d.image)} title={d.title} height={110} style={styles.flex} onPress={d.go} />
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <SectionHeader eyebrow="How we work" title="Editorial philosophy" />
        {PRINCIPLES.map((p) => (
          <View key={p.title} style={styles.principle}>
            <View style={styles.principleIcon}>
              <Ionicons name={p.icon} size={20} color={colors.accent} />
            </View>
            <View style={styles.flexText}>
              <Text variant="heading">{p.title}</Text>
              <Text variant="small">{p.text}</Text>
            </View>
          </View>
        ))}
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

      <View style={styles.disclaimer}>
        <Ionicons name="information-circle-outline" size={18} color={colors.ink} />
        <Text variant="small" style={styles.flexText}>
          fitlives is educational. It isn&apos;t a substitute for advice from a doctor, registered dietitian or physiotherapist
          — consult a qualified professional for personal health decisions.
        </Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  section: { gap: space.md },
  row: { flexDirection: "row", gap: space.sm },
  flex: { flex: 1 },
  flexText: { flex: 1, gap: 2 },
  principle: { flexDirection: "row", gap: space.md, alignItems: "flex-start" },
  principleIcon: {
    width: 40,
    height: 40,
    borderRadius: radius.md,
    backgroundColor: colors.ink,
    alignItems: "center",
    justifyContent: "center",
  },
  disclaimer: {
    flexDirection: "row",
    gap: space.sm,
    backgroundColor: colors.accentSoft,
    borderRadius: radius.md,
    padding: space.md,
  },
});
