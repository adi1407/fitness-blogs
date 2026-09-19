"use client";

import { useEffect, useState, type ReactNode } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogPopup,
  AlertDialogTitle,
} from "@/components/animate-ui/components/base/alert-dialog";
import { trackEvent } from "@/lib/analytics/openpanel";

const STORAGE_KEY = "fitknowledge-calc-edu-ack";

type Props = {
  /** Human label shown in the dialog (e.g. "protein calculator"). */
  toolName: string;
  /** Stable tool id for analytics (e.g. "protein-calculator"). */
  tool: string;
  children: (args: {
    acknowledged: boolean;
    requestAck: () => void;
  }) => ReactNode;
};

/** Gates calculator results behind a one-time educational acknowledgement. */
export function EducationalCalcGate({ toolName, tool, children }: Props) {
  const [open, setOpen] = useState(false);
  const [acknowledged, setAcknowledged] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY) === "1") {
        setAcknowledged(true);
      }
    } catch {
      /* ignore */
    }
  }, []);

  const accept = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
    setAcknowledged(true);
    setOpen(false);
    trackEvent("calc_complete", { tool });
  };

  return (
    <>
      {children({
        acknowledged,
        requestAck: () => setOpen(true),
      })}

      <AlertDialog
        open={open}
        onOpenChange={(next) => setOpen(Boolean(next))}
      >
        <AlertDialogPopup>
          <AlertDialogHeader>
            <AlertDialogTitle>Educational estimate only</AlertDialogTitle>
            <AlertDialogDescription>
              The {toolName} provides simplified estimates for learning — not
              medical advice, diagnosis, or a personalized clinical plan. If you
              have a medical condition, are pregnant, or have dietary
              restrictions, consult a qualified professional before changing
              your diet or training.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={accept}>
              I understand — show results
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogPopup>
      </AlertDialog>
    </>
  );
}
