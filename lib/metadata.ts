import type { Metadata } from "next";

// Shared by every page with a static (non-CMS-fetched) title/description —
// fills in matching Open Graph + Twitter card fields instead of repeating
// the same few lines on every page. Pages needing their own image or a
// `type: "article"` still set those directly.
export function pageMetadata(title: string, description: string): Metadata {
  return {
    title,
    description,
    openGraph: { title, description, type: "website" },
    twitter: { card: "summary_large_image", title, description },
  };
}
