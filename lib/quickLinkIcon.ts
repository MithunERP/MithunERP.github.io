// Mirrors mithunerp-source's lib/quickLinkIcon.ts (kind-detection only —
// icon rendering itself lives in QuickConnect.tsx, mirrored in that repo's
// QuickLinksManager.tsx).

export type QuickLinkKind =
  | "phone"
  | "mail"
  | "whatsapp"
  | "facebook"
  | "instagram"
  | "linkedin"
  | "external";

// Auto-detected from the href — no manual "kind" field/dropdown (see
// docs/plan.md round 8 for why that was removed). Recognized platforms get
// a custom themed icon (QuickConnect.tsx's ChannelIcon); anything else
// falls back to a generic link icon — no third-party favicon fetch,
// everything stays on-brand.
export function detectKind(href: string): QuickLinkKind {
  const trimmed = href.trim();
  if (/^tel:/i.test(trimmed)) return "phone";
  if (/^mailto:/i.test(trimmed) || trimmed === "/contact") return "mail";

  try {
    const hostname = new URL(trimmed).hostname.replace(/^www\./i, "").toLowerCase();
    if (hostname === "wa.me" || hostname.endsWith("whatsapp.com")) return "whatsapp";
    if (hostname.endsWith("facebook.com") || hostname === "fb.com") return "facebook";
    if (hostname.endsWith("instagram.com")) return "instagram";
    if (hostname.endsWith("linkedin.com")) return "linkedin";
  } catch {
    // Not a parseable absolute URL (e.g. a bare internal path) — falls
    // through to the generic icon.
  }

  return "external";
}
