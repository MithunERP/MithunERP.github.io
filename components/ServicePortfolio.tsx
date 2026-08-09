import Link from "next/link";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import PostCard from "@/components/PostCard";
import type { PostSummary } from "@/lib/posts";

// Latest-5 portfolio cards for one service, with a link to the full,
// filterable /portfolio page — used on all three service detail pages.
export default function ServicePortfolio({
  posts,
  serviceSlug,
}: {
  posts: PostSummary[];
  serviceSlug: string;
}) {
  return (
    <Reveal className="mt-16">
      <SectionHeading label="Portfolio" title="Recent work" />
      {posts.length === 0 ? (
        <div className="mt-8 rounded-sm border border-panel-border bg-panel p-8">
          <p className="text-sm text-muted">
            Selected work goes here once real projects are ready to show — reach out and
            we&apos;ll walk through examples directly.
          </p>
        </div>
      ) : (
        <>
          <div className="mt-8 flex flex-wrap gap-6">
            {posts.map((post) => (
              <div key={post.id} className="w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]">
                <PostCard post={post} />
              </div>
            ))}
          </div>
          <div className="mt-8">
            <Link
              href={`/portfolio?service=${serviceSlug}`}
              className="text-xs uppercase tracking-widest text-foreground transition-colors hover:text-accent"
            >
              See all →
            </Link>
          </div>
        </>
      )}
    </Reveal>
  );
}
