import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  apiFetch,
  getToken,
  setToken,
  type CmsUser,
} from "../lib/api/client";

/** Set when the last sign-in used a published default password; cleared after a change. */
const MUST_CHANGE_KEY = "cms_must_change_password";

type AuthContextValue = {
  user: CmsUser | null;
  loading: boolean;
  mustChangePassword: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

function setMustChange(value: boolean) {
  if (value) localStorage.setItem(MUST_CHANGE_KEY, "1");
  else localStorage.removeItem(MUST_CHANGE_KEY);
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<CmsUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [mustChangePassword, setMustChangePassword] = useState(
    () => localStorage.getItem(MUST_CHANGE_KEY) === "1",
  );

  const refresh = useCallback(async () => {
    const token = getToken();
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }
    try {
      const data = await apiFetch<{ user: CmsUser }>("/auth/me");
      setUser(data.user);
    } catch {
      setToken(null);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const login = useCallback(async (email: string, password: string) => {
    const data = await apiFetch<{
      token: string;
      user: CmsUser;
      mustChangePassword?: boolean;
    }>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    setToken(data.token);
    setUser(data.user);
    setMustChange(Boolean(data.mustChangePassword));
    setMustChangePassword(Boolean(data.mustChangePassword));
  }, []);

  const logout = useCallback(async () => {
    try {
      await apiFetch("/auth/logout", { method: "POST" });
    } catch {
      /* ignore */
    }
    setToken(null);
    setUser(null);
    setMustChange(false);
    setMustChangePassword(false);
  }, []);

  const changePassword = useCallback(
    async (currentPassword: string, newPassword: string) => {
      const data = await apiFetch<{ token: string }>("/auth/change-password", {
        method: "POST",
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      // Every older session (including this browser's old token) is now invalid.
      setToken(data.token);
      setMustChange(false);
      setMustChangePassword(false);
    },
    [],
  );

  const value = useMemo(
    () => ({ user, loading, mustChangePassword, login, logout, refresh, changePassword }),
    [user, loading, mustChangePassword, login, logout, refresh, changePassword],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth requires AuthProvider");
  return ctx;
}
