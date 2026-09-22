"use client";

import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogPopup,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
} from "@/components/animate-ui/components/base/alert-dialog";
import { Button } from "@/components/ui/button";
import { LEGAL_CONTACT_MAILTO } from "@/lib/legal";

export function ContactEmailDialog() {
  return (
    <div className="mt-6 flex flex-wrap items-center gap-3">
      <AlertDialog>
        <AlertDialogTrigger
          render={<Button variant="outline">Before you email</Button>}
        />
        <AlertDialogPopup from="bottom" className="sm:max-w-[425px]">
          <AlertDialogHeader>
            <AlertDialogTitle>Educational platform only</AlertDialogTitle>
            <AlertDialogDescription>
              fitlives cannot provide medical diagnosis or emergency care.
              For clinical concerns, contact a qualified professional or local
              emergency services. Corrections and partnerships are welcome.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Got it</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogPopup>
      </AlertDialog>
      <a
        href={LEGAL_CONTACT_MAILTO}
        className="inline-flex h-9 items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/80"
      >
        Email us
      </a>
    </div>
  );
}
