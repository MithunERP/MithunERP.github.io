import Link from "next/link";
import type { PostSummary } from "@/lib/posts";

// serviceName is optional context for portfolio cards shown alongside other
// services (e.g. on /portfolio unfiltered) — omit it where the surrounding
// page already makes the service obvious (a single service's own page).
export default function PostCard({
  post,
  serviceName,
}: {
  post: PostSummary;
  serviceName?: string;
}) {
  return (
    <Link
      href={`/${post.post_type === "portfolio" ? "portfolio" : "blog"}/${post.slug}`}
      className="group flex h-full flex-col rounded-sm border border-panel-border bg-panel p-6 shadow-md transition-all duration-200 hover:-translate-y-1 hover:border-accent hover:shadow-[0_12px_32px_-8px_var(--accent-glow)]"
    >
      {post.cover_image_url && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={post.cover_image_url}
          alt=""
          className="mb-4 aspect-video w-full rounded-sm object-cover"
        />
      )}
      <span className="text-xs uppercase tracking-widest text-accent">
        {serviceName ?? post.post_type}
      </span>
      <h3 className="mt-2 font-display text-lg text-foreground">{post.title}</h3>
      {post.excerpt && <p className="mt-2 flex-1 text-sm text-muted">{post.excerpt}</p>}
      <span className="mt-4 text-xs uppercase tracking-widest text-foreground transition-colors group-hover:text-accent">
        Read more →
      </span>
    </Link>
  );
}
