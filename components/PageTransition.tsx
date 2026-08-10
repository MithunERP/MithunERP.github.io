"use client";

import { useState, ViewTransition } from "react";
import type { ReactNode } from "react";
import type { TransitionSettings, TransitionStyle } from "@/lib/settings";
import { useTransitionsConfig } from "./TransitionsProvider";

const STYLE_CLASSES: Record<TransitionStyle, { enter: string; exit: string }> = {
  fade: { enter: "page-in-fade", exit: "page-out-fade" },
  overlap: { enter: "page-in-overlap", exit: "page-out-overlap" },
  slide: { enter: "page-in-slide", exit: "page-out-slide" },
  zoom: { enter: "page-in-zoom", exit: "page-out-zoom" },
  wipe: { enter: "page-in-wipe", exit: "page-out-wipe" },
};

const ALL_STYLES: TransitionStyle[] = ["fade", "overlap", "slide", "zoom", "wipe"];
const SESSION_KEY = "mithunerp_transition_style";

// Resolves which style actually applies, once per mount (= once per
// navigation, since app/**/template.tsx remounts this on every route
// change). Synchronous — sessionStorage and Date are both synchronous
// browser APIs, so there's no need for a useEffect "correct after mount"
// step and no flicker risk.
function resolveStyle(config: TransitionSettings): TransitionStyle {
  if (config.mode === "fixed") return config.style;

  // Build-time static render pass (next build's RSC/HTML generation) has no
  // window/sessionStorage/real visitor clock — fall back to the configured
  // fixed style for that pass; the real resolution happens once this
  // actually mounts in a visitor's browser. Same defensive pattern as
  // Navbar.tsx/ThemeToggle.tsx use for other client-only browser APIs.
  if (typeof window === "undefined") return config.style;

  if (config.mode === "random") {
    const pool = config.random_styles.length > 0 ? config.random_styles : ALL_STYLES;
    const stored = window.sessionStorage.getItem(SESSION_KEY) as TransitionStyle | null;
    if (stored && pool.includes(stored)) return stored;
    const pick = pool[Math.floor(Math.random() * pool.length)];
    window.sessionStorage.setItem(SESSION_KEY, pick);
    return pick;
  }

  // mode === "scheduled" — the visitor's own local clock, so this rolls
  // over to the next day's style automatically with no rebuild needed.
  const day = String(new Date().getDay()) as keyof TransitionSettings["schedule"];
  return config.schedule[day] ?? config.style;
}

// Shared by every app/**/template.tsx — templates (unlike layouts) remount
// per navigation, which is what makes ViewTransition's enter/exit actually
// fire. `default="none"` keeps this from also animating on unrelated
// transitions (e.g. a future named ViewTransition elsewhere on the page).
export default function PageTransition({ children }: { children: ReactNode }) {
  const config = useTransitionsConfig();

  const [style] = useState<TransitionStyle | null>(() => {
    if (!config || config.enabled === false) return null;
    return resolveStyle(config);
  });

  if (!style) return <>{children}</>;

  const classes = STYLE_CLASSES[style];
  return (
    <ViewTransition enter={classes.enter} exit={classes.exit} default="none">
      {children}
    </ViewTransition>
  );
}
