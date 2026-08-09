import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPostBySlug, getPublishedPosts } from "@/lib/posts";
import { postMetadata } from "@/lib/metadata";
import PostDetailView from "@/components/PostDetailView";

// Only blog-type posts get a static page here — portfolio posts live at
// /portfolio/[slug] instead (separate route, same shared PostDetailView),
// so the URL a post is reachable at matches the section it belongs to.
export async function generateStaticParams() {
  const posts = await getPublishedPosts({ type: "blog" });
  // `output: "export"` requires every dynamic route to generate at least one
  // path — zero published blog posts is a normal content state (e.g. before
  // the first one is published), not something that should be able to take
  // the whole static export down. The placeholder slug resolves to a real
  // 404 via the notFound() call below, it's never a working URL.
  if (posts.length === 0) return [{ slug: "_placeholder" }];
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  try {
    return postMetadata(await getPostBySlug(slug));
  } catch {
    return { title: "Post not found — MithunERP" };
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let post;
  try {
    post = await getPostBySlug(slug);
  } catch {
    notFound();
  }

  return <PostDetailView post={post} backHref="/blog" backLabel="Blog" />;
}
