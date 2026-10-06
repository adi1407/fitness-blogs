import { useQueryClient } from "@tanstack/react-query";
import * as Linking from "expo-linking";
import * as SecureStore from "expo-secure-store";
import * as WebBrowser from "expo-web-browser";
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";

import { ApiError } from "@/api/client";
import { fetchGoogleAuthUrl, fetchMe, type Member } from "@/api/member";
import { syncProfileOnSignIn } from "./profileSync";

const TOKEN_KEY = "fitlives.member-token";

type Status = "loading" | "signedOut" | "signedIn";

type SignInResult = { ok: true } | { ok: false; reason: "cancelled" | "error"; message?: string };

type AuthValue = {
  status: Status;
  token: string | null;
  member: Member | null;
  signIn: () => Promise<SignInResult>;
  /** Finish sign-in from a deep link (`fitlives://auth?token=`). */
  completeSignIn: (token: string) => Promise<boolean>;
  signOut: () => Promise<void>;
  /** Call when an authenticated request returns 401. */
  handleUnauthorized: (error: unknown) => void;
};

const AuthContext = createContext<AuthValue | null>(null);

const ERROR_COPY: Record<string, string> = {
  google_not_configured: "Google sign-in isn't available right now.",
  email_not_verified: "Your Google email isn't verified yet.",
  account_disabled: "This account has been disabled.",
};

async function readToken() {
  try {
    return await SecureStore.getItemAsync(TOKEN_KEY);
  } catch {
    return null;
  }
}

async function writeToken(token: string | null) {
  try {
    if (token) await SecureStore.setItemAsync(TOKEN_KEY, token);
    else await SecureStore.deleteItemAsync(TOKEN_KEY);
  } catch {
    // secure storage unavailable (e.g. web) — session lasts until restart
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();
  const [status, setStatus] = useState<Status>("loading");
  const [token, setToken] = useState<string | null>(null);
  const [member, setMember] = useState<Member | null>(null);
  const completing = useRef<string | null>(null);

  const clear = useCallback(async () => {
    await writeToken(null);
    setToken(null);
    setMember(null);
    setStatus("signedOut");
    queryClient.removeQueries({ queryKey: ["me"] });
  }, [queryClient]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const saved = await readToken();
      if (!saved) {
        if (!cancelled) setStatus("signedOut");
        return;
      }
      if (cancelled) return;
      setToken(saved);
      setStatus("signedIn");
      try {
        const me = await fetchMe(saved);
        if (!cancelled) setMember(me);
      } catch (err) {
        // Keep the session offline; only drop it when the server rejects it.
        if (!cancelled && err instanceof ApiError && err.status === 401) await clear();
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [clear]);

  const completeSignIn = useCallback(
    async (next: string) => {
      if (completing.current === next) return true;
      completing.current = next;
      try {
        const me = await fetchMe(next);
        await writeToken(next);
        setToken(next);
        setMember(me);
        setStatus("signedIn");
        queryClient.invalidateQueries({ queryKey: ["me"] });
        syncProfileOnSignIn(next);
        return true;
      } catch {
        completing.current = null;
        return false;
      }
    },
    [queryClient],
  );

  const signIn = useCallback(async (): Promise<SignInResult> => {
    const redirect = Linking.createURL("auth");
    try {
      const { url } = await fetchGoogleAuthUrl(redirect);
      const result = await WebBrowser.openAuthSessionAsync(url, redirect);
      if (result.type !== "success") return { ok: false, reason: "cancelled" };
      const { queryParams } = Linking.parse(result.url);
      const error = typeof queryParams?.error === "string" ? queryParams.error : null;
      const next = typeof queryParams?.token === "string" ? queryParams.token : null;
      if (error || !next) return { ok: false, reason: "error", message: ERROR_COPY[error ?? ""] };
      return (await completeSignIn(next)) ? { ok: true } : { ok: false, reason: "error" };
    } catch (err) {
      return { ok: false, reason: "error", message: err instanceof ApiError ? err.message : undefined };
    }
  }, [completeSignIn]);

  const handleUnauthorized = useCallback(
    (error: unknown) => {
      if (error instanceof ApiError && error.status === 401) clear();
    },
    [clear],
  );

  const value = useMemo<AuthValue>(
    () => ({ status, token, member, signIn, completeSignIn, signOut: clear, handleUnauthorized }),
    [status, token, member, signIn, completeSignIn, clear, handleUnauthorized],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
