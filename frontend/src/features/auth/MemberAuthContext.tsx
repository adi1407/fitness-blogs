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
import { getApiBase } from "@/lib/api/client";

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
  setSession: (token: string) => Promise<void>;
  logout: () => void;
  refresh: () => Promise<void>;
};

const MemberAuthContext = createContext<MemberAuthContextValue | null>(null);

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
      const res = await fetch(`${getApiBase()}/public/auth/me`, {
        headers: { Authorization: `Bearer ${stored}` },
        cache: "no-store",
      });
      if (!res.ok) throw new Error("invalid");
      const data = (await res.json()) as { member: Member };
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

  const setSession = useCallback(async (nextToken: string) => {
    localStorage.setItem(TOKEN_KEY, nextToken);
    setToken(nextToken);
    setLoading(true);
    try {
      const res = await fetch(`${getApiBase()}/public/auth/me`, {
        headers: { Authorization: `Bearer ${nextToken}` },
        cache: "no-store",
      });
      if (!res.ok) throw new Error("invalid");
      const data = (await res.json()) as { member: Member };
      setMember(data.member);
    } catch {
      localStorage.removeItem(TOKEN_KEY);
      setToken(null);
      setMember(null);
      throw new Error("Could not establish session");
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
    setMember(null);
    void fetch(`${getApiBase()}/public/auth/logout`, { method: "POST" }).catch(
      () => undefined,
    );
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
