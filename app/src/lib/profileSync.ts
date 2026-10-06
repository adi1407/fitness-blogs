import AsyncStorage from "@react-native-async-storage/async-storage";

import { fetchCalcProfile, saveCalcProfile, type CalcProfile } from "@/api/member";
import type { BodyProfileForm } from "@/calculators/ui";
import { isActivityId } from "./calc";

const KEY = "calc:profile";

async function readLocal(): Promise<Partial<BodyProfileForm> | null> {
  try {
    const raw = await AsyncStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Partial<BodyProfileForm>) : null;
  } catch {
    return null;
  }
}

function toServer(form: Partial<BodyProfileForm>): CalcProfile {
  const num = (v: string | undefined) => (v && Number.isFinite(Number(v)) ? Number(v) : undefined);
  const p: CalcProfile = {};
  if (form.sex === "male" || form.sex === "female") p.sex = form.sex;
  const age = num(form.age);
  const kg = num(form.kg);
  const cm = num(form.cm);
  if (age != null) p.age = age;
  if (kg != null) p.kg = kg;
  if (cm != null) p.cm = cm;
  if (isActivityId(form.activity)) p.activity = form.activity;
  return p;
}

function toLocal(p: CalcProfile): Partial<BodyProfileForm> {
  const out: Partial<BodyProfileForm> = {};
  if (p.sex) out.sex = p.sex;
  if (p.age != null) out.age = String(p.age);
  if (p.kg != null) out.kg = String(p.kg);
  if (p.cm != null) out.cm = String(p.cm);
  if (p.activity) out.activity = p.activity;
  return out;
}

/** Copy the account's body profile onto this device (calculators read it on mount). */
export async function pullProfile(token: string) {
  const { profile } = await fetchCalcProfile(token);
  if (!profile || !Object.keys(profile).length) return false;
  const local = (await readLocal()) ?? {};
  await AsyncStorage.setItem(KEY, JSON.stringify({ ...local, ...toLocal(profile) }));
  return true;
}

/** Save this device's body profile to the account. */
export async function pushProfile(token: string) {
  const local = await readLocal();
  if (!local) return false;
  const profile = toServer(local);
  if (!Object.keys(profile).length) return false;
  await saveCalcProfile(profile, token);
  return true;
}

/** After sign-in: prefer the account profile; otherwise seed it from this device. */
export async function syncProfileOnSignIn(token: string) {
  try {
    if (await pullProfile(token)) return "pulled" as const;
    if (await pushProfile(token)) return "pushed" as const;
  } catch {
    // non-critical
  }
  return null;
}
