import type { EyebrowStyle, EyebrowWeight, HeadingDecoration, QuoteDecoration } from "@/lib/settings";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

// Pages are admin-creatable now (see mithunerp-source's `pages` table,
// migration 0008) — any string, not a fixed union. home/about/services/
// contact are just the 4 seeded slugs, not special-cased here.
export type PageSlug = string;

export type BlockType =
  | "hero"
  | "heading"
  | "about_bio"
  | "stats"
  | "services_grid"
  | "contact_form"
  | "richtext"
  | "image"
  | "gallery"
  | "quote"
  | "cta_banner"
  | "divider"
  | "spacer"
  | "custom_html";

export interface BlockLayout {
  width?: "contained" | "wide" | "full";
  spacing_top?: "none" | "sm" | "md" | "lg";
  spacing_bottom?: "none" | "sm" | "md" | "lg";
  background?: "none" | "panel" | "accent-tint";
  heading_decoration?: HeadingDecoration;
  eyebrow_style?: EyebrowStyle;
  eyebrow_weight?: EyebrowWeight;
  quote_decoration?: QuoteDecoration;
}

export interface PageBlock {
  id: string;
  page_slug: PageSlug;
  block_type: BlockType;
  position: number;
  props: Record<string, unknown>;
  layout: BlockLayout;
}

// CMS-backed layout — see mithunerp-source's docs/adr/0007-page-block-system.md
// and docs/adr/0011-cms-admin-redesign.md. Called at build time (Server
// Components), not from the browser, so `output: "export"` still produces
// real static HTML. Throws (404 from the backend) for an unknown or
// unpublished slug — callers of the `[slug]` catch-all route rely on this
// to trigger a real 404 instead of rendering an empty page.
export async function getPageBlocks(slug: PageSlug): Promise<PageBlock[]> {
  const res = await fetch(`${API_URL}/api/pages/${slug}/blocks`);
  if (!res.ok) throw new Error(`Failed to load page (${res.status})`);
  const data = await res.json();
  return data.blocks as PageBlock[];
}
