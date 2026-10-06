import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";
import { router } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { Alert, Platform, StyleSheet, View } from "react-native";

import { LinkGroup, LinkRow } from "@/components/LinkRow";
import { Screen } from "@/components/Screen";
import { Text } from "@/components/Text";
import { useToast } from "@/components/Toast";
import { API_URL, SITE_URL } from "@/config";
import { useAuth } from "@/lib/auth";
import { openLink } from "@/lib/links";
import { persister, queryClient } from "@/lib/queryClient";
import { LEGAL_PAGES } from "@/lib/trust";
import { space } from "@/theme";

const CACHE_KEY = "fitlives-query-cache";

function formatBytes(n: number) {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(0)} KB`;
  return `${(n / 1024 / 1024).toFixed(1)} MB`;
}

export default function SettingsScreen() {
  const toast = useToast();
  const { status, member } = useAuth();
  const [cacheSize, setCacheSize] = useState<number | null>(null);

  const measure = useCallback(async () => {
    try {
      const raw = await AsyncStorage.getItem(CACHE_KEY);
      setCacheSize(raw ? raw.length : 0);
    } catch {
      setCacheSize(null);
    }
  }, []);

  useEffect(() => {
    measure();
  }, [measure]);

  const confirm = (title: string, message: string, action: string, run: () => Promise<void>) =>
    Alert.alert(title, message, [
      { text: "Cancel", style: "cancel" },
      { text: action, style: "destructive", onPress: () => run().catch(() => toast("Something went wrong.", "error")) },
    ]);

  const clearCache = () =>
    confirm("Clear offline cache?", "Articles, foods and other content will download again next time you open them.", "Clear", async () => {
      await persister.removeClient();
      queryClient.clear();
      await measure();
      toast("Offline cache cleared", "success");
    });

  const clearRecent = () =>
    confirm("Clear recent searches?", "This only affects this device.", "Clear", async () => {
      await AsyncStorage.removeItem("search:recent");
      toast("Recent searches cleared", "success");
    });

  const resetCalculators = () =>
    confirm("Reset calculators?", "Your body profile and calculator inputs on this device go back to defaults.", "Reset", async () => {
      const keys = await AsyncStorage.getAllKeys();
      await AsyncStorage.multiRemove(keys.filter((k) => k.startsWith("calc:")));
      toast("Calculators reset", "success");
    });

  const version = Constants.expoConfig?.version ?? "1.0.0";
  const apiHost = (() => {
    try {
      return new URL(API_URL).host;
    } catch {
      return API_URL;
    }
  })();

  return (
    <Screen>
      <LinkGroup title="Account">
        <LinkRow
          icon="person-circle-outline"
          label={status === "signedIn" ? (member?.email ?? "Signed in") : "Not signed in"}
          onPress={() => router.push("/account")}
        />
      </LinkGroup>

      <LinkGroup title="Storage">
        <LinkRow icon="cloud-offline-outline" label="Offline cache" detail={cacheSize == null ? "—" : formatBytes(cacheSize)} onPress={clearCache} />
        <LinkRow icon="time-outline" label="Clear recent searches" onPress={clearRecent} />
        <LinkRow icon="refresh-outline" label="Reset calculators" onPress={resetCalculators} destructive />
      </LinkGroup>

      <LinkGroup title="About">
        <LinkRow icon="information-circle-outline" label="About fitlives" onPress={() => router.push("/about")} />
        {LEGAL_PAGES.map((p) => (
          <LinkRow key={p.path} icon={p.icon} label={p.label} external onPress={() => openLink(`${SITE_URL}${p.path}`)} />
        ))}
        <LinkRow icon="globe-outline" label="Open fitlives.in" external onPress={() => openLink(SITE_URL)} />
      </LinkGroup>

      <View style={styles.meta}>
        <Text variant="small" style={styles.center}>
          fitlives {version} · {Platform.OS === "ios" ? "iOS" : Platform.OS === "android" ? "Android" : Platform.OS}
        </Text>
        <Text variant="small" style={styles.center}>
          Content from {apiHost}
        </Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  meta: { gap: space.xs, paddingTop: space.md },
  center: { textAlign: "center" },
});
