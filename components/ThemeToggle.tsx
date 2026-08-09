"use client";

import { useEffect, useState } from "react";

type Theme = "dark" | "light";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    // Can't read this in a lazy useState initializer instead: `document` doesn't
    // exist during server rendering, so that would crash the SSR pass outright,
    // not just mismatch it. theme-script.tsx sets the real data-theme attribute
    // on <html> before hydration runs; this effect is the sanctioned way to pull
    // that already-resolved value from the DOM into this component's own state
    // once we're definitely on the client — exactly the "external system" case
    // the lint rule's own docs carve out, not the cascading-render case it's
    // meant to catch.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTheme((document.documentElement.getAttribute("data-theme") as Theme | null) ?? "dark");
  }, []);

  function toggle() {
    const next: Theme = theme === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("mithunerp-theme", next);
    setTheme(next);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle light and dark theme"
      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-panel-border text-foreground transition-colors hover:border-accent hover:text-accent"
    >
      {theme === "light" ? (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
        </svg>
      )}
    </button>
  );
}
