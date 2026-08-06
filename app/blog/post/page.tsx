"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { getPostBySlug, type PostDetail } from "@/lib/posts";

interface FetchState {
  status: "loading" | "ready" | "error";
  post: PostDetail | null;
  errorMessage: string;
}

// Keyed by `slug` in the parent so a slug change remounts this component —
// its loading state comes from the useState initializer below, not from a
// setState call inside the effect body.
function PostFetcher({ slug }: { slug: string }) {
  const [state, setState] = useState<FetchState>({
    status: "loading",
    post: null,
    errorMessage: "",
  });

  useEffect(() => {
    let cancelled = false;

    getPostBySlug(slug)
      .then((data) => {
        if (cancelled) return;
        setState({ status: "ready", post: data, errorMessage: "" });
      })
      .catch((err) => {
        if (cancelled) return;
        setState({
          status: "error",
          post: null,
          errorMessage: err instanceof Error ? err.message : "Failed to load post.",
        });
      });

    return () => {
      cancelled = true;
    };
  }, [slug]);

  const { status, post, errorMessage } = state;

  if (status === "loading") {
    return <div className="h-96 animate-pulse rounded-sm border border-panel-border bg-panel" />;
  }

  if (status === "error" || !post) {
    return <p className="text-sm text-muted">{errorMessage || "Post not found."}</p>;
  }

  return (
    <article>
      <span className="text-xs uppercase tracking-widest text-accent">{post.post_type}</span>
      <h1 className="mt-4 font-display text-3xl text-foreground md:text-5xl">{post.title}</h1>
      <p className="mt-4 text-sm text-muted">{new Date(post.published_at).toLocaleDateString()}</p>
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
  );
}

function PostDetailContent() {
  const searchParams = useSearchParams();
  const slug = searchParams.get("slug");

  if (!slug) {
    return <p className="text-sm text-muted">No post specified.</p>;
  }

  return <PostFetcher key={slug} slug={slug} />;
}

export default function BlogPostPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <Link href="/blog" className="text-xs uppercase tracking-widest text-muted hover:text-accent">
        ← Blog
      </Link>
      <div className="mt-8">
        <Suspense
          fallback={
            <div className="h-96 animate-pulse rounded-sm border border-panel-border bg-panel" />
          }
        >
          <PostDetailContent />
        </Suspense>
      </div>
    </div>
  );
}
