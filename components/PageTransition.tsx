import { ViewTransition } from "react";
import type { ReactNode } from "react";

// Shared by every app/**/template.tsx — templates (unlike layouts) remount
// per navigation, which is what makes ViewTransition's enter/exit actually
// fire. `default="none"` keeps this from also animating on unrelated
// transitions (e.g. a future named ViewTransition elsewhere on the page).
export default function PageTransition({ children }: { children: ReactNode }) {
  return (
    <ViewTransition enter="page-in" exit="page-out" default="none">
      {children}
    </ViewTransition>
  );
}
