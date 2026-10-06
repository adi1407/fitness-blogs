import { RobotoSlab_400Regular } from "@expo-google-fonts/roboto-slab/400Regular";
import { RobotoSlab_500Medium } from "@expo-google-fonts/roboto-slab/500Medium";
import { RobotoSlab_600SemiBold } from "@expo-google-fonts/roboto-slab/600SemiBold";
import { RobotoSlab_700Bold } from "@expo-google-fonts/roboto-slab/700Bold";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { useFonts } from "expo-font";
import { Stack, ThemeProvider } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";

import { ToastProvider } from "@/components/Toast";
import { persistOptions, queryClient, wireReactQueryToAppState } from "@/lib/queryClient";
import { colors, fonts, navTheme } from "@/theme";

SplashScreen.preventAutoHideAsync().catch(() => {});
wireReactQueryToAppState();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    RobotoSlab_400Regular,
    RobotoSlab_500Medium,
    RobotoSlab_600SemiBold,
    RobotoSlab_700Bold,
  });
  const ready = loaded || !!error;

  useEffect(() => {
    if (ready) SplashScreen.hideAsync().catch(() => {});
  }, [ready]);

  if (!ready) return null;

  return (
    <PersistQueryClientProvider client={queryClient} persistOptions={persistOptions}>
      <ThemeProvider value={navTheme}>
        <StatusBar style="dark" />
        <ToastProvider>
          <Stack
            screenOptions={{
              headerTintColor: colors.ink,
              headerTitleStyle: { fontFamily: fonts.semibold },
              headerBackButtonDisplayMode: "minimal",
              headerShadowVisible: false,
              contentStyle: { backgroundColor: colors.bg },
              animation: "ios_from_right",
            }}
          >
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen
              name="search"
              options={{ presentation: "modal", headerShown: false, animation: "slide_from_bottom" }}
            />
            <Stack.Screen name="article/[number]" options={{ title: "" }} />
            <Stack.Screen name="foods" options={{ title: "Indian food database" }} />
            <Stack.Screen name="food/[slug]" options={{ title: "Food" }} />
            <Stack.Screen name="compare" options={{ title: "Compare foods" }} />
            <Stack.Screen name="calculator/[tool]" options={{ title: "Calculator" }} />
          </Stack>
        </ToastProvider>
      </ThemeProvider>
    </PersistQueryClientProvider>
  );
}
