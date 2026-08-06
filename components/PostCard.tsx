import Link from "next/link";
import type { PostSummary } from "@/lib/posts";

export default function PostCard({ post }: { post: PostSummary }) {
  return (
    <Link
      href={`/blog/post?slug=${encodeURIComponent(post.slug)}`}
      className="group flex flex-col rounded-sm border border-panel-border bg-panel p-6 transition-colors hover:border-accent"
    >
      {post.cover_image_url && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={post.cover_image_url}
          alt=""
          className="mb-4 aspect-video w-full rounded-sm object-cover"
        />
      )}
      <span className="text-xs uppercase tracking-widest text-accent">{post.post_type}</span>
      <h3 className="mt-2 font-display text-lg text-foreground">{post.title}</h3>
      {post.excerpt && <p className="mt-2 flex-1 text-sm text-muted">{post.excerpt}</p>}
      <span className="mt-4 text-xs uppercase tracking-widest text-foreground transition-colors group-hover:text-accent">
        Read more →
      </span>
    </Link>
  );
}
