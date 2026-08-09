import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug, getPublishedPosts } from "@/lib/posts";

// Pre-renders one static page per published post (blog or portfolio — both
// share this same detail view) so each gets its own crawlable URL/title,
// unlike the old `/blog/post?slug=` client-fetched pattern which had no
// per-post metadata at all.
export async function generateStaticParams() {
  const posts = await getPublishedPosts({});
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  try {
    const post = await getPostBySlug(slug);
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

  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <Link href="/blog" className="text-xs uppercase tracking-widest text-muted hover:text-accent">
        ← Blog
      </Link>
      <article className="mt-8">
        <span className="text-xs uppercase tracking-widest text-accent">{post.post_type}</span>
        <h1 className="mt-4 font-display text-3xl text-foreground md:text-5xl">{post.title}</h1>
        <p className="mt-4 text-sm text-muted">
          {new Date(post.published_at).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
        {post.cover_image_url && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={post.cover_image_url}
            alt=""
            className="mt-8 aspect-video w-full rounded-sm object-cover"
          />
        )}
        <div
          className="post-content mt-10 text-muted"
          dangerouslySetInnerHTML={{ __html: post.content_html }}
        />
      </article>
    </div>
  );
}
