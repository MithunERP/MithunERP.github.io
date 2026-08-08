"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getPublishedPosts, type PostSummary } from "@/lib/posts";
import type { Service } from "@/lib/services";
import PostCard from "@/components/PostCard";

type Status = "loading" | "ready" | "empty" | "error";
type Sort = "newest" | "oldest";

interface PostsState {
  status: Status;
  posts: PostSummary[];
}

// Keyed by `service`+`sort` in the parent so a filter/sort change remounts
// this component — its loading state comes from the useState initializer
// below, not from a setState call inside the effect body (same pattern as
// app/blog/page.tsx's PostsList).
function PortfolioList({ service, sort }: { service: string | "all"; sort: Sort }) {
  const [state, setState] = useState<PostsState>({ status: "loading", posts: [] });

  useEffect(() => {
    let cancelled = false;

    getPublishedPosts({ type: "portfolio", service: service === "all" ? undefined : service })
      .then((data) => {
        if (cancelled) return;
        const ordered = sort === "oldest" ? [...data].reverse() : data;
        setState({ status: ordered.length > 0 ? "ready" : "empty", posts: ordered });
      })
      .catch(() => {
        if (!cancelled) setState((s) => ({ ...s, status: "error" }));
      });

    return () => {
      cancelled = true;
    };
  }, [service, sort]);

  const { status, posts } = state;

  if (status === "loading") {
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-56 animate-pulse rounded-sm border border-panel-border bg-panel" />
        ))}
      </div>
    );
  }

  if (status === "error") {
    return <p className="text-sm text-muted">Couldn&apos;t load the portfolio right now — try again shortly.</p>;
  }

  if (status === "empty") {
    return <p className="text-sm text-muted">No portfolio pieces published yet.</p>;
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}

export default function PortfolioBrowser({ services }: { services: Service[] }) {
  const searchParams = useSearchParams();
  const initialService = searchParams.get("service") ?? "all";
  const [service, setService] = useState(initialService);
  const [sort, setSort] = useState<Sort>("newest");

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => setService("all")}
            className={`rounded-sm border px-4 py-2 text-xs uppercase tracking-widest transition-colors ${
              service === "all"
                ? "border-accent text-accent"
                : "border-panel-border text-muted hover:border-accent hover:text-accent"
            }`}
          >
            All
          </button>
          {services.map((s) => (
            <button
              key={s.slug}
              type="button"
              onClick={() => setService(s.slug)}
              className={`rounded-sm border px-4 py-2 text-xs uppercase tracking-widest transition-colors ${
                service === s.slug
                  ? "border-accent text-accent"
                  : "border-panel-border text-muted hover:border-accent hover:text-accent"
              }`}
            >
              {s.name}
            </button>
          ))}
        </div>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as Sort)}
          className="rounded-sm border border-panel-border bg-panel px-3 py-2 text-xs uppercase tracking-widest text-muted"
        >
          <option value="newest">Newest first</option>
          <option value="oldest">Oldest first</option>
        </select>
      </div>

      <div className="mt-10">
        <PortfolioList key={`${service}-${sort}`} service={service} sort={sort} />
      </div>
    </div>
  );
}
