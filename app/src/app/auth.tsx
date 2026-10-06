import { router, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";

import { LoadingState } from "@/components/States";
import { useToast } from "@/components/Toast";
import { useAuth } from "@/lib/auth";

/** Deep-link landing for `fitlives://auth?token=` when the OS hands the link to the app directly. */
export default function AuthCallbackScreen() {
  const { token, error } = useLocalSearchParams<{ token?: string; error?: string }>();
  const { completeSignIn } = useAuth();
  const toast = useToast();

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const ok = token ? await completeSignIn(token) : false;
      if (cancelled) return;
      if (!ok && (error || token)) toast("Sign-in didn't complete. Please try again.", "error");
      router.replace("/account");
    })();
    return () => {
      cancelled = true;
    };
  }, [token, error, completeSignIn, toast]);

  return <LoadingState label="Signing you in…" />;
}
