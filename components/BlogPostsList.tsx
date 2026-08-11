"use client";

import { useEffect, useState } from "react";
import { getPublishedPosts, type PostSummary } from "@/lib/posts";
import PostCard from "@/components/PostCard";

type Status = "loading" | "ready" | "empty" | "error";

interface PostsState {
  status: Status;
  posts: PostSummary[];
}

// Blog-only — portfolio posts live at /portfolio instead (see
// PortfolioBrowser.tsx). Client-fetched (not build-time) so a new post
// appears without a full rebuild — same reasoning /blog has always used.
// Split out from app/blog/page.tsx so that page can be a Server Component
// again (needed to fetch site-wide decoration settings for its eyebrow).
export default function BlogPostsList() {
  const [state, setState] = useState<PostsState>({ status: "loading", posts: [] });

  useEffect(() => {
    let cancelled = false;

    getPublishedPosts({ type: "blog" })
      .then((data) => {
        if (cancelled) return;
        setState({ status: data.length > 0 ? "ready" : "empty", posts: data });
      })
      .catch(() => {
        if (!cancelled) setState((s) => ({ ...s, status: "error" }));
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const { status, posts } = state;

  if (status === "loading") {
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="h-56 animate-pulse rounded-sm border border-panel-border bg-panel"
          />
        ))}
      </div>
    );
  }

  if (status === "error") {
    return (
      <p className="text-sm text-muted">
        Couldn&apos;t load posts right now — try again shortly.
      </p>
    );
  }

  if (status === "empty") {
    return <p className="text-sm text-muted">No posts published yet.</p>;
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
