import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPostBySlug, getPublishedPosts } from "@/lib/posts";
import { getSiteSettings } from "@/lib/settings";
import { DEFAULT_DECORATIONS } from "@/lib/decorations";
import { postMetadata, titleFor } from "@/lib/metadata";
import PostDetailView from "@/components/PostDetailView";

// Portfolio-type posts get their own URL namespace here, separate from
// /blog/[slug] — a portfolio piece isn't a blog post, even though both are
// `posts` rows under the hood. Same shared PostDetailView either way.
export async function generateStaticParams() {
  const posts = await getPublishedPosts({ type: "portfolio" });
  // See app/blog/[slug]/page.tsx's comment — output: "export" requires at
  // least one generated path per dynamic route, even when there's currently
  // no published content of this type.
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
    return { title: titleFor("Post not found") };
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

  const settings = await getSiteSettings();

  return (
    <PostDetailView
      post={post}
      backHref="/portfolio"
      backLabel="Portfolio"
      decorations={settings.theme.decorations ?? DEFAULT_DECORATIONS}
    />
  );
}
