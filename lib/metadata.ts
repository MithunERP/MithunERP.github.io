import type { Metadata } from "next";
import type { PostDetail } from "@/lib/posts";

// Every page's <title> follows this one pattern: "MithunERP-<page name>" —
// centralized here so it can't drift per-page. `titleFor()` is also
// exported directly for the handful of spots that need just the string
// (not-found fallbacks, app/layout.tsx's site-wide default).
export function titleFor(pageName: string): string {
  return `MithunERP-${pageName}`;
}

// Shared by every page with a static (non-CMS-fetched) title/description —
// fills in matching Open Graph + Twitter card fields instead of repeating
// the same few lines on every page. Takes the bare page name (e.g. "About"),
// not a pre-formatted title — pageMetadata() applies the "MithunERP-X"
// pattern itself. Pages needing their own image or a `type: "article"`
// still set those directly.
export function pageMetadata(pageName: string, description: string): Metadata {
  const title = titleFor(pageName);
  return {
    title,
    description,
    openGraph: { title, description, type: "website" },
    twitter: { card: "summary_large_image", title, description },
  };
}

// Shared by /blog/[slug] and /portfolio/[slug] — same post shape, same
// metadata fields either way.
export function postMetadata(post: PostDetail): Metadata {
  return {
    title: titleFor(post.title),
    description: post.excerpt ?? undefined,
    openGraph: {
      title: post.title,
      description: post.excerpt ?? undefined,
      type: "article",
      images: post.cover_image_url ? [post.cover_image_url] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt ?? undefined,
      images: post.cover_image_url ? [post.cover_image_url] : undefined,
    },
  };
}
