"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { TransitionSettings } from "@/lib/settings";

const TransitionsContext = createContext<TransitionSettings | null>(null);

// Config is fetched once at build time (app/layout.tsx already calls
// getSiteSettings() for header/theme) and handed down through Context —
// layout.tsx doesn't remount on navigation, so this avoids a runtime fetch
// on every single page transition. components/PageTransition.tsx (deep in
// the tree via each app/**/template.tsx) reads it via useTransitionsConfig()
// and resolves the actual style to use client-side.
export function TransitionsProvider({
  config,
  children,
}: {
  config: TransitionSettings;
  children: ReactNode;
}) {
  return <TransitionsContext.Provider value={config}>{children}</TransitionsContext.Provider>;
}

export function useTransitionsConfig(): TransitionSettings | null {
  return useContext(TransitionsContext);
}
