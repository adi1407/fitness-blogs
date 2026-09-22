"use client";

import { useCallback, useState, type ReactNode } from "react";
import { useMemberAuth } from "@/features/auth/MemberAuthContext";
import { SignInGateModal } from "@/features/auth/SignInGateModal";
import { EducationalCalcGate } from "@/features/tools/components/EducationalCalcGate";

type CalcAuthGateProps = {
  toolName: string;
  tool: string;
  /** Short phrase for SignInGateModal title, e.g. "unlock your TDEE estimate" */
  actionLabel: string;
  children: (args: {
    memberId: string | null;
    memberName: string | null;
    isSignedIn: boolean;
    acknowledged: boolean;
    requestAck: () => void;
    requestSignIn: () => void;
    requireAuth: (fn?: () => void) => void;
  }) => ReactNode;
};

/**
 * Gates calculator interactivity: sign-in first, then educational disclaimer.
 * SEO shell stays outside this component.
 */
export function CalcAuthGate({
  toolName,
  tool,
  actionLabel,
  children,
}: CalcAuthGateProps) {
  const { member, loading } = useMemberAuth();
  const [signInOpen, setSignInOpen] = useState(false);
  const isSignedIn = Boolean(member);

  const requestSignIn = useCallback(() => setSignInOpen(true), []);

  return (
    <EducationalCalcGate toolName={toolName} tool={tool}>
      {({ acknowledged, requestAck }) => {
        const requireAuth = (fn?: () => void) => {
          if (!member) {
            setSignInOpen(true);
            return;
          }
          fn?.();
        };

        return (
          <>
            {children({
              memberId: member?.id ?? null,
              memberName: member?.name?.trim() || member?.email || null,
              isSignedIn,
              acknowledged: isSignedIn && acknowledged,
              requestAck: () => {
                if (!member) {
                  setSignInOpen(true);
                  return;
                }
                requestAck();
              },
              requestSignIn,
              requireAuth,
            })}

            {!loading ? (
              <SignInGateModal
                open={signInOpen}
                actionLabel={actionLabel}
                description={`Sign in or create an account with Google to use the ${toolName} and see educational estimates.`}
                onClose={() => setSignInOpen(false)}
              />
            ) : null}
          </>
        );
      }}
    </EducationalCalcGate>
  );
}
