const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

export interface QuickLink {
  id: string;
  label: string;
  href: string;
  external: boolean;
  sort_order: number;
}

// CMS-backed — see mithunerp-source's docs/adr/0006-cms-content-model-and-
// rebuild-on-publish.md. Called at build time (Server Components), not from
// the browser, so `output: "export"` still produces real static HTML.
export async function getEnabledQuickLinks(): Promise<QuickLink[]> {
  const res = await fetch(`${API_URL}/api/quick-links`);
  if (!res.ok) throw new Error(`Failed to load quick links (${res.status})`);
  const data = await res.json();
  return data.quick_links as QuickLink[];
}
