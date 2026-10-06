import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import { QueryClient, focusManager, onlineManager } from "@tanstack/react-query";
import { AppState, Platform } from "react-native";

import { shouldRetry } from "@/api/client";

const DAY = 24 * 60 * 60 * 1000;

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 10 * 60 * 1000,
      /** Must be >= persister maxAge or restored data is garbage-collected immediately. */
      gcTime: 7 * DAY,
      retry: shouldRetry,
      retryDelay: 1500,
      refetchOnReconnect: true,
    },
  },
});

export const persister = createAsyncStoragePersister({
  storage: AsyncStorage,
  key: "fitlives-query-cache",
  throttleTime: 2000,
});

export const persistOptions = {
  persister,
  maxAge: 7 * DAY,
  /** Bump when cached response shapes change. */
  buster: "v1",
  dehydrateOptions: {
    shouldDehydrateQuery: (q: { state: { status: string }; queryKey: readonly unknown[] }) =>
      q.state.status === "success" && q.queryKey[0] !== "me",
  },
};

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
