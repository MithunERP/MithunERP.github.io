const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

export type PostType = "blog" | "portfolio";

export interface PostSummary {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  post_type: PostType;
  cover_image_url: string | null;
  published_at: string;
}

export interface PostDetail extends PostSummary {
  content_markdown: string;
  content_html: string;
}

export async function getPublishedPosts(type?: PostType): Promise<PostSummary[]> {
  const url = new URL(`${API_URL}/api/posts`);
  if (type) url.searchParams.set("type", type);

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(`Failed to load posts (${res.status})`);

  const data = await res.json();
  return data.posts as PostSummary[];
}

export async function getPostBySlug(slug: string): Promise<PostDetail> {
  const res = await fetch(`${API_URL}/api/posts/${encodeURIComponent(slug)}`);

  if (!res.ok) {
    const data = await res.json().catch(() => null);
    throw new Error(data?.error ?? `Failed to load post (${res.status})`);
  }

  return res.json();
}
