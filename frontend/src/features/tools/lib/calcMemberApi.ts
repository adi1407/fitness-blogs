import type {
  CalcProfile,
  CalcSavePayload,
  SavedCalcResult,
} from "@/features/tools/types";

const PENDING_KEY = "fitlives-calc-pending";
const PENDING_TTL_MS = 30 * 60 * 1000;

type PendingSave = {
  payload: CalcSavePayload;
  updateProfile: boolean;
  at: number;
};

async function jsonOrThrow<T>(res: Response): Promise<T> {
  const data = (await res.json().catch(() => ({}))) as T & { message?: string };
  if (!res.ok) throw new Error(data.message || `Request failed (${res.status})`);
  return data;
}

export async function fetchCalcProfile(): Promise<CalcProfile | null> {
  const res = await fetch("/api/me/calc-profile", {
    cache: "no-store",
    credentials: "same-origin",
  });
  const data = await jsonOrThrow<{ profile: CalcProfile | null }>(res);
  return data.profile;
}

export async function saveCalcProfile(profile: CalcProfile): Promise<CalcProfile> {
  const res = await fetch("/api/me/calc-profile", {
    method: "PUT",
    credentials: "same-origin",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ profile }),
  });
  const data = await jsonOrThrow<{ profile: CalcProfile }>(res);
  return data.profile;
}

export async function fetchCalcResults(): Promise<SavedCalcResult[]> {
  const res = await fetch("/api/me/calc-results", {
    cache: "no-store",
    credentials: "same-origin",
  });
  const data = await jsonOrThrow<{ results?: SavedCalcResult[] }>(res);
  return data.results ?? [];
}

export async function saveCalcResult(
  payload: CalcSavePayload,
): Promise<SavedCalcResult> {
  const res = await fetch("/api/me/calc-results", {
    method: "POST",
    credentials: "same-origin",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      tool: payload.tool,
      inputs: payload.inputs,
      result: payload.result,
    }),
  });
  const data = await jsonOrThrow<{ result: SavedCalcResult }>(res);
  return data.result;
}

export async function deleteCalcResult(id: string): Promise<void> {
  const res = await fetch(`/api/me/calc-results/${encodeURIComponent(id)}`, {
    method: "DELETE",
    credentials: "same-origin",
  });
  await jsonOrThrow<unknown>(res);
}

/** Remember a result across the Google sign-in round trip (same tab only). */
export function stashPendingSave(
  payload: CalcSavePayload,
  updateProfile: boolean,
): void {
  try {
    const pending: PendingSave = { payload, updateProfile, at: Date.now() };
    sessionStorage.setItem(PENDING_KEY, JSON.stringify(pending));
  } catch {
    /* storage unavailable — sign-in still works, the save is just skipped */
  }
}

export function clearPendingSave(): void {
  try {
    sessionStorage.removeItem(PENDING_KEY);
  } catch {
    /* ignore */
  }
}

/** Read and remove the pending save for this tool, if still fresh. */
export function takePendingSave(tool: string): PendingSave | null {
  try {
    const raw = sessionStorage.getItem(PENDING_KEY);
    if (!raw) return null;
    const pending = JSON.parse(raw) as PendingSave;
    if (pending?.payload?.tool !== tool) return null;
    sessionStorage.removeItem(PENDING_KEY);
    if (Date.now() - pending.at > PENDING_TTL_MS) return null;
    return pending;
  } catch {
    return null;
  }
}
