import { QueryClient, focusManager, onlineManager } from "@tanstack/react-query";
import { AppState, Platform } from "react-native";

import { shouldRetry } from "@/api/client";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 10 * 60 * 1000,
      gcTime: 60 * 60 * 1000,
      retry: shouldRetry,
      retryDelay: 1500,
      refetchOnReconnect: true,
    },
  },
});

let wired = false;

/** Refetch stale queries when the app returns to the foreground. */
export function wireReactQueryToAppState() {
  if (wired || Platform.OS === "web") return;
  wired = true;
  onlineManager.setOnline(true);
  AppState.addEventListener("change", (status) => {
    focusManager.setFocused(status === "active");
  });
}
