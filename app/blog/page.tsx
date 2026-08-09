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
// PortfolioBrowser.tsx). Used to also show portfolio posts here behind a
// filter; the user asked for a clean split instead.
function PostsList() {
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

export default function BlogPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <p className="text-xs uppercase tracking-[0.3em] font-bold text-accent">Blog</p>
      <h1 className="mt-4 font-display text-3xl text-foreground md:text-5xl">
        Notes from the studio.
      </h1>
      <p className="mt-6 max-w-2xl text-muted">
        Writing on projects, process, and the occasional lesson learned the hard way.
      </p>

      <div className="mt-10">
        <PostsList />
      </div>
    </div>
  );
}
