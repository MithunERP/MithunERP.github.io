const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

export type PageSlug = "home" | "about" | "services" | "contact";

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

export interface PageBlock {
  id: string;
  page_slug: PageSlug;
  block_type: BlockType;
  position: number;
  props: Record<string, unknown>;
}

// CMS-backed layout — see mithunerp-source's docs/adr/0007-page-block-system.md.
// Called at build time (Server Components), not from the browser, so
// `output: "export"` still produces real static HTML.
export async function getPageBlocks(slug: PageSlug): Promise<PageBlock[]> {
  const res = await fetch(`${API_URL}/api/pages/${slug}/blocks`);
  if (!res.ok) throw new Error(`Failed to load page (${res.status})`);
  const data = await res.json();
  return data.blocks as PageBlock[];
}
