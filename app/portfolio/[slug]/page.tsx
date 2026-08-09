import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPostBySlug, getPublishedPosts } from "@/lib/posts";
import { postMetadata } from "@/lib/metadata";
import PostDetailView from "@/components/PostDetailView";

// Portfolio-type posts get their own URL namespace here, separate from
// /blog/[slug] — a portfolio piece isn't a blog post, even though both are
// `posts` rows under the hood. Same shared PostDetailView either way.
export async function generateStaticParams() {
  const posts = await getPublishedPosts({ type: "portfolio" });
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

export default async function PortfolioPostPage({
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

  return <PostDetailView post={post} backHref="/portfolio" backLabel="Portfolio" />;
}
