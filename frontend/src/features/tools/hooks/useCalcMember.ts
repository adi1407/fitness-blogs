"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useMemberAuth } from "@/features/auth/MemberAuthContext";
import {
  fetchCalcProfile,
  saveCalcProfile,
  saveCalcResult,
  takePendingSave,
} from "@/features/tools/lib/calcMemberApi";
import { clearLegacyCalcPrefs } from "@/features/tools/lib/calcHandoff";
import type {
  CalcProfile,
  CalcSavePayload,
  CalcTool,
} from "@/features/tools/types";

export type CalcMember = ReturnType<typeof useCalcMember>;

/**
 * Optional member layer for calculators. Results never depend on it: signed-in
 * members additionally get a saved profile (pre-fill) and saved results.
 */
export function useCalcMember(tool: CalcTool) {
  const { member, loading } = useMemberAuth();
  const memberId = member?.id ?? null;
  const [loaded, setLoaded] = useState<{
    memberId: string;
    profile: CalcProfile | null;
  } | null>(null);
  const profile = loaded && loaded.memberId === memberId ? loaded.profile : null;
  const [notice, setNotice] = useState<string | null>(null);
  const pendingHandled = useRef(false);

  useEffect(() => {
    clearLegacyCalcPrefs();
  }, []);

  useEffect(() => {
    if (!memberId) return;
    let cancelled = false;
    fetchCalcProfile()
      .then((p) => {
        if (!cancelled) setLoaded({ memberId, profile: p });
      })
      .catch(() => {
        if (!cancelled) setLoaded({ memberId, profile: null });
      });
    return () => {
      cancelled = true;
    };
  }, [memberId]);

  const saveResult = useCallback(
    async (payload: CalcSavePayload, updateProfile: boolean) => {
      await saveCalcResult(payload);
      if (updateProfile && payload.profile && memberId) {
        const next = await saveCalcProfile(payload.profile);
        setLoaded({ memberId, profile: next });
      }
    },
    [memberId],
  );

  useEffect(() => {
    if (loading || !memberId || pendingHandled.current) return;
    pendingHandled.current = true;
    const pending = takePendingSave(tool);
    if (!pending) return;
    const { payload, updateProfile } = pending;
    saveCalcResult(payload)
      .then(async () => {
        if (updateProfile && payload.profile) {
          const next = await saveCalcProfile(payload.profile);
          setLoaded({ memberId, profile: next });
        }
        setNotice(
          "Signed in — your result was saved. Find it anytime under My numbers in your account.",
        );
      })
      .catch(() =>
        setNotice("Signed in, but we couldn't save that result. Please calculate and save again."),
      );
  }, [loading, memberId, tool]);

  return {
    memberId,
    memberName: member ? member.name?.trim() || member.email : null,
    authLoading: loading,
    profile,
    saveResult,
    notice,
    dismissNotice: () => setNotice(null),
  };
}
