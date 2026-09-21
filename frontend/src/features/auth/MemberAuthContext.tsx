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

export type Member = {
  id: string;
  email: string;
  name: string;
  picture: string;
  createdAt?: string;
  lastLoginAt?: string;
};

type MemberAuthContextValue = {
  member: Member | null;
  loading: boolean;
  logout: () => void;
  refresh: () => Promise<void>;
};

const MemberAuthContext = createContext<MemberAuthContextValue | null>(null);

const ME_URL = "/api/auth/me";
const LOGOUT_URL = "/api/auth/logout";
const LEGACY_TOKEN_KEY = "fk_member_token";

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
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    if (typeof window !== "undefined") {
      try {
        localStorage.removeItem(LEGACY_TOKEN_KEY);
      } catch {
        /* ignore */
      }
    }
    try {
      const res = await fetch(ME_URL, {
        cache: "no-store",
        credentials: "same-origin",
      });
      if (!res.ok) throw new Error("invalid");
      const data = (await res.json()) as { member: Member };
      if (!isMember(data.member)) throw new Error("invalid");
      setMember(data.member);
    } catch {
      setMember(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const logout = useCallback(() => {
    setMember(null);
    void fetch(LOGOUT_URL, { method: "POST", credentials: "same-origin" }).catch(
      () => undefined,
    );
  }, []);

  const value = useMemo(
    () => ({ member, loading, logout, refresh }),
    [member, loading, logout, refresh],
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
