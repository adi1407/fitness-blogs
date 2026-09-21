"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

const TOKEN_KEY = "fk_member_token";

export type Member = {
  id: string;
  email: string;
  name: string;
  picture: string;
};

type MemberAuthContextValue = {
  member: Member | null;
  token: string | null;
  loading: boolean;
  setSession: (token: string, member?: Member | null) => Promise<void>;
  logout: () => void;
  refresh: () => Promise<void>;
};

const MemberAuthContext = createContext<MemberAuthContextValue | null>(null);

/** Same-origin Next proxies — do not call Render from the browser. */
const ME_URL = "/api/auth/me";
const LOGOUT_URL = "/api/auth/logout";

function isMember(value: unknown): value is Member {
  if (!value || typeof value !== "object") return false;
  const m = value as Record<string, unknown>;
  return (
    typeof m.id === "string" &&
    typeof m.email === "string" &&
    typeof m.name === "string" &&
    typeof m.picture === "string"
  );
}

export function MemberAuthProvider({ children }: { children: ReactNode }) {
  const [member, setMember] = useState<Member | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    const stored =
      typeof window !== "undefined" ? localStorage.getItem(TOKEN_KEY) : null;
    if (!stored) {
      setMember(null);
      setToken(null);
      setLoading(false);
      return;
    }
    try {
      const res = await fetch(ME_URL, {
        headers: { Authorization: `Bearer ${stored}` },
        cache: "no-store",
      });
      if (!res.ok) throw new Error("invalid");
      const data = (await res.json()) as { member: Member };
      if (!isMember(data.member)) throw new Error("invalid");
      setToken(stored);
      setMember(data.member);
    } catch {
      localStorage.removeItem(TOKEN_KEY);
      setToken(null);
      setMember(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const setSession = useCallback(
    async (nextToken: string, bootstrapMember?: Member | null) => {
      localStorage.setItem(TOKEN_KEY, nextToken);
      setToken(nextToken);
      setLoading(true);
      try {
        // Prefer member from OAuth redirect — avoids /me when proxy isn't ready.
        if (isMember(bootstrapMember)) {
          setMember(bootstrapMember);
          return;
        }

        const res = await fetch(ME_URL, {
          headers: { Authorization: `Bearer ${nextToken}` },
          cache: "no-store",
        });
        const data = (await res.json().catch(() => ({}))) as {
          member?: Member;
          message?: string;
        };
        if (!res.ok || !isMember(data.member)) {
          throw new Error(
            data.message || `Session check failed (${res.status})`,
          );
        }
        setMember(data.member);
      } catch (err) {
        localStorage.removeItem(TOKEN_KEY);
        setToken(null);
        setMember(null);
        throw err instanceof Error
          ? err
          : new Error("Could not establish session");
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
    setMember(null);
    void fetch(LOGOUT_URL, { method: "POST" }).catch(() => undefined);
  }, []);

  const value = useMemo(
    () => ({ member, token, loading, setSession, logout, refresh }),
    [member, token, loading, setSession, logout, refresh],
  );

  return (
    <MemberAuthContext.Provider value={value}>
      {children}
    </MemberAuthContext.Provider>
  );
}

export function useMemberAuth() {
  const ctx = useContext(MemberAuthContext);
  if (!ctx) {
    throw new Error("useMemberAuth must be used within MemberAuthProvider");
  }
  return ctx;
}
