import { Stack, router } from "expo-router";
import { StyleSheet, View } from "react-native";

import { EmptyState } from "@/components/States";
import { Text } from "@/components/Text";
import { colors, space } from "@/theme";

export default function NotFound() {
  return (
    <View style={styles.root}>
      <Stack.Screen options={{ title: "Not found" }} />
      <EmptyState title="This page doesn't exist" />
      <Text variant="body" style={styles.link} onPress={() => router.replace("/")}>
        Go to home
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg, paddingBottom: space.xxl },
  link: { textAlign: "center", textDecorationLine: "underline" },
});
