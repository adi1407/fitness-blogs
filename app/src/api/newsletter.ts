import { apiRequest } from "./client";

/** `source` must match the backend's `^[a-z0-9_-]{1,40}$`, e.g. `app_calc_tdee`. */
export function subscribe(email: string, source: string) {
  return apiRequest<{ ok: true }>("/public/subscribe", { method: "POST", body: { email, source } });
}
