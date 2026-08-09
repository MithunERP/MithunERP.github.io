import type { Metadata } from "next";
import type { PostDetail } from "@/lib/posts";

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

// Shared by /blog/[slug] and /portfolio/[slug] — same post shape, same
// metadata fields either way.
export function postMetadata(post: PostDetail): Metadata {
  return {
    title: `${post.title} — MithunERP`,
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
