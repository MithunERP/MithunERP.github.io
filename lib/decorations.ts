import type { DecorationSettings, EyebrowStyle, EyebrowWeight, HeadingDecoration, QuoteDecoration } from "./settings";

// Fallback for a page built before migrations/0011_content_decorations.sql
// has run against the backend — settings.theme.decorations would be
// `undefined` in that JSON response (a required TS field doesn't stop it
// being genuinely missing at runtime). Every call site does
// `settings.theme.decorations ?? DEFAULT_DECORATIONS` rather than trusting
// the type, so a page never crashes just because the migration hasn't run
// yet — same defensive pattern as the footer/[slug] pages toggles before
// this. Values match today's actual look (plain/left-bar/plain/bold).
export const DEFAULT_DECORATIONS: DecorationSettings = {
  heading: "plain",
  quote: "left-bar",
  eyebrow_style: "plain",
  eyebrow_weight: "bold",
};

// Centralizes the class-name pattern for content decoration so it's built
// the same way everywhere it's used (SectionHeading.tsx, BlockRenderer.tsx's
// hero case, PostDetailView.tsx) — matching CSS lives in app/globals.css.
// "plain" decorations intentionally still get a class (`heading-deco-plain`
// etc.) even though there's no matching CSS rule for it — harmless no-op,
// keeps every call site's className construction uniform.

export function eyebrowClassName(style: EyebrowStyle, weight: EyebrowWeight): string {
  const weightClass = weight === "normal" ? "font-normal" : "font-bold";
  return `eyebrow-${style} ${weightClass}`;
}

export function headingDecorationClassName(decoration: HeadingDecoration): string {
  return `heading-deco-${decoration}`;
}

export function quoteDecorationClassName(decoration: QuoteDecoration): string {
  return `quote-deco-${decoration}`;
}
