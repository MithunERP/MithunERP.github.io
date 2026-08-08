// Mirrors mithunerp-source's lib/quickLinkIcon.ts (kind-detection + favicon
// half only — href normalization happens on save, admin-side).

export type QuickLinkKind = "phone" | "mail" | "external";

export function detectKind(href: string): QuickLinkKind {
  const trimmed = href.trim();
  if (/^tel:/i.test(trimmed)) return "phone";
  if (/^mailto:/i.test(trimmed) || trimmed === "/contact") return "mail";
  return "external";
}

// Google's public favicon service — no API key, no new dependency. A
// visitor's browser requests the icon directly from google.com at render
// time; a deliberate, disclosed trade-off, not a silent one.
export function faviconUrl(href: string, size = 64): string | null {
  try {
    const url = new URL(href);
    return `https://www.google.com/s2/favicons?sz=${size}&domain=${url.hostname}`;
  } catch {
    return null;
  }
}
