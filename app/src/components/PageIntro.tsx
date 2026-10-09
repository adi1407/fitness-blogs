import type { ReactNode } from "react";
import { StyleSheet, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

import { SITE_URL } from "@/config";
import { openLink } from "@/lib/links";
import { colors, fonts, radius, space } from "@/theme";
import { Breadcrumbs, type Crumb } from "./Breadcrumbs";
import { Text } from "./Text";

type Props = {
  crumbs: Crumb[];
  title: string;
  kicker?: string;
  lede?: string | null;
  children?: ReactNode;
};

/** Website page header: breadcrumbs, optional kicker, large title, muted lede. */
export function PageIntro({ crumbs, title, kicker, lede, children }: Props) {
  return (
    <Animated.View entering={FadeInDown.duration(380)} style={styles.intro}>
      <Breadcrumbs items={crumbs} />
      {kicker ? <Text style={styles.kicker}>{kicker}</Text> : null}
      <Text style={styles.title} accessibilityRole="header" maxFontSizeMultiplier={1.3}>
        {title}
      </Text>
      {lede ? (
        <Text variant="body" style={styles.lede}>
          {lede}
        </Text>
      ) : null}
      {children}
    </Animated.View>
  );
}

/** Website "Educational content" panel used on exercise, recipe and program pages. */
export function KnowledgeDisclaimer() {
  return (
    <View style={styles.disclaimer}>
      <Text variant="heading" style={styles.disclaimerTitle}>
        Educational content
      </Text>
      <Text variant="small" style={styles.disclaimerText}>
        Not medical advice. Form cues and programs are general guidance — stop if you feel sharp pain, and consult a
        qualified professional for injuries or health conditions.{" "}
        <Text
          style={styles.link}
          onPress={() => openLink(`${SITE_URL}/medical-disclaimer`)}
          accessibilityRole="link"
          suppressHighlighting
        >
          Medical disclaimer
        </Text>
        .
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  intro: { gap: space.sm, paddingTop: space.sm },
  kicker: { fontFamily: fonts.medium, fontSize: 13, color: colors.muted, textTransform: "capitalize", marginTop: space.sm },
  title: { fontFamily: fonts.semibold, fontSize: 32, lineHeight: 37, letterSpacing: -1, color: colors.ink },
  lede: { color: colors.muted, fontSize: 16, lineHeight: 25, marginTop: space.xs },
  disclaimer: {
    gap: 4,
    paddingHorizontal: space.lg,
    paddingVertical: space.md,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: "rgba(255,152,0,0.4)",
    backgroundColor: "rgba(255,152,0,0.1)",
  },
  disclaimerTitle: { fontSize: 14 },
  disclaimerText: { lineHeight: 19 },
  link: { fontFamily: fonts.semibold, color: colors.ink, textDecorationLine: "underline" },
});
