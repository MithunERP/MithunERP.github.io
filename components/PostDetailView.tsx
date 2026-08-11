import Link from "next/link";
import type { PostDetail } from "@/lib/posts";
import type { DecorationSettings } from "@/lib/settings";
import { eyebrowClassName, headingDecorationClassName, quoteDecorationClassName } from "@/lib/decorations";

// Shared full-article rendering for both /blog/[slug] (blog posts) and
// /portfolio/[slug] (portfolio posts) — same content shape, only the "back"
// link differs, since which section a post belongs to now decides its URL
// namespace, not just a label on an otherwise-shared /blog/ URL.
export default function PostDetailView({
  post,
  backHref,
  backLabel,
  decorations,
}: {
  post: PostDetail;
  backHref: string;
  backLabel: string;
  decorations: DecorationSettings;
}) {
  const { eyebrow_style, eyebrow_weight, heading, quote } = decorations;

  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <Link href={backHref} className="text-xs uppercase tracking-widest text-muted hover:text-accent">
        ← {backLabel}
      </Link>
      <article className="mt-8">
        <span className={`text-xs uppercase tracking-widest text-accent ${eyebrowClassName(eyebrow_style, eyebrow_weight)}`}>
          {post.post_type}
        </span>
        <h1 className={`mt-4 font-display text-3xl text-foreground md:text-5xl ${headingDecorationClassName(heading)}`}>
          {post.title}
        </h1>
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
          className={`post-content mt-10 text-muted ${headingDecorationClassName(heading)} ${quoteDecorationClassName(quote)}`}
          dangerouslySetInnerHTML={{ __html: post.content_html }}
        />
      </article>
    </div>
  );
}
