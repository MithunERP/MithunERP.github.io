"use client";

import { useEffect, useState } from "react";
import { getPublishedPosts, type PostSummary, type PostType } from "@/lib/posts";
import PostCard from "@/components/PostCard";

type Status = "loading" | "ready" | "empty" | "error";

interface PostsState {
  status: Status;
  posts: PostSummary[];
}

const FILTERS: { label: string; value: PostType | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Blog", value: "blog" },
  { label: "Portfolio", value: "portfolio" },
];

// Keyed by `filter` in the parent so a filter change remounts this component —
// its loading state comes from the useState initializer below, not from a
// setState call inside the effect body.
function PostsList({ filter }: { filter: PostType | "all" }) {
  const [state, setState] = useState<PostsState>({ status: "loading", posts: [] });

  useEffect(() => {
    let cancelled = false;

    getPublishedPosts(filter === "all" ? {} : { type: filter })
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
  }, [filter]);

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
  const [filter, setFilter] = useState<PostType | "all">("all");

  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <p className="text-xs uppercase tracking-[0.3em] font-bold text-accent">Blog</p>
      <h1 className="mt-4 font-display text-3xl text-foreground md:text-5xl">
        Notes from the studio.
      </h1>
      <p className="mt-6 max-w-2xl text-muted">
        Writing on projects, process, and the occasional lesson learned the hard way.
      </p>

      <div className="mt-10 flex gap-3">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            type="button"
            onClick={() => setFilter(f.value)}
            className={`rounded-sm border px-4 py-2 text-xs uppercase tracking-widest transition-colors ${
              filter === f.value
                ? "border-accent text-accent"
                : "border-panel-border text-muted hover:border-accent hover:text-accent"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="mt-10">
        <PostsList key={filter} filter={filter} />
      </div>
    </div>
  );
}
