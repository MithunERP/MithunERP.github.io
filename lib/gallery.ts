const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

export interface GalleryImage {
  id: string;
  url: string;
  alt: string;
  sort_order: number;
}

// CMS-backed (mithunerp-source's /admin/gallery) — build-time fetch, same
// shape as lib/quickLinks.ts, so `output: "export"` still produces real
// static HTML.
export async function getGalleryImages(): Promise<GalleryImage[]> {
  const res = await fetch(`${API_URL}/api/gallery`);
  if (!res.ok) throw new Error(`Failed to load gallery (${res.status})`);
  const data = await res.json();
  return data.images as GalleryImage[];
}
