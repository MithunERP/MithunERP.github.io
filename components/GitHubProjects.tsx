"use client";

import { useEffect, useState } from "react";

const OWNER = process.env.NEXT_PUBLIC_GITHUB_OWNER ?? "MithunERP";
// The site's own source repo isn't a "project" in the showcase sense. The
// backend (mithunerp-source) lives under a different, personal GitHub
// account now (see ADR 0004 in mithunerp-source/docs), so it never appears
// in this org's fetched repo list and doesn't need an entry here.
const EXCLUDED = new Set(["MithunERP.github.io"]);

interface Repo {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  fork: boolean;
  updated_at: string;
}

type Status = "loading" | "ready" | "empty" | "error";

async function fetchRepos(owner: string): Promise<Repo[]> {
  const params = "sort=updated&per_page=12";
  // Try org first, fall back to user — we don't know which `owner` is up front.
  const orgRes = await fetch(`https://api.github.com/orgs/${owner}/repos?${params}`);
  if (orgRes.ok) return orgRes.json();

  const userRes = await fetch(`https://api.github.com/users/${owner}/repos?${params}`);
  if (userRes.ok) return userRes.json();

  throw new Error(`GitHub API returned ${userRes.status}`);
}

export default function GitHubProjects() {
  const [status, setStatus] = useState<Status>("loading");
  const [repos, setRepos] = useState<Repo[]>([]);

  useEffect(() => {
    let cancelled = false;

    fetchRepos(OWNER)
      .then((data) => {
        if (cancelled) return;
        const visible = data.filter((repo) => !repo.fork && !EXCLUDED.has(repo.name));
        setRepos(visible);
        setStatus(visible.length > 0 ? "ready" : "empty");
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });

    return () => {
      cancelled = true;
    };
  }, []);

  if (status === "loading") {
    return (
      <div className="grid gap-4 sm:grid-cols-2">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="h-28 animate-pulse rounded-sm border border-panel-border bg-panel" />
        ))}
      </div>
    );
  }

  if (status === "error") {
    return (
      <p className="text-sm text-muted">
        Couldn&apos;t load projects from GitHub right now — see them directly at{" "}
        <a
          href={`https://github.com/${OWNER}`}
          className="text-accent hover:underline"
          target="_blank"
          rel="noreferrer"
        >
          github.com/{OWNER}
        </a>
        .
      </p>
    );
  }

  if (status === "empty") {
    return <p className="text-sm text-muted">No public projects to show yet.</p>;
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {repos.map((repo) => (
        <a
          key={repo.id}
          href={repo.html_url}
          target="_blank"
          rel="noreferrer"
          className="flex flex-col rounded-sm border border-panel-border bg-panel p-6 transition-colors hover:border-accent"
        >
          <span className="font-display text-lg text-foreground">{repo.name}</span>
          <span className="mt-2 flex-1 text-sm text-muted">
            {repo.description ?? "No description provided."}
          </span>
          <span className="mt-4 flex items-center gap-4 text-xs uppercase tracking-widest text-muted">
            {repo.language && <span>{repo.language}</span>}
            <span>★ {repo.stargazers_count}</span>
          </span>
        </a>
      ))}
    </div>
  );
}
