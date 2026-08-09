const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

export interface SitePage {
  slug: string;
  title: string;
  meta_description: string;
  is_home: boolean;
}

// All published admin-created pages — used by app/[slug]/page.tsx's
// `generateStaticParams()` to know which pages need a static route at
// build time. Includes the 4 seeded pages (home/about/services/contact)
// too; the catch-all route skips generating those since they already have
// their own dedicated route files.
export async function getPages(): Promise<SitePage[]> {
  const res = await fetch(`${API_URL}/api/pages`);
  if (!res.ok) throw new Error(`Failed to load pages (${res.status})`);
  const data = await res.json();
  return data.pages as SitePage[];
}
