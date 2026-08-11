import { getSiteSettings } from "@/lib/settings";
import { DEFAULT_DECORATIONS, eyebrowClassName, headingDecorationClassName } from "@/lib/decorations";
import { pageMetadata } from "@/lib/metadata";
import BlogPostsList from "@/components/BlogPostsList";

export const metadata = pageMetadata(
  "Blog",
  "Writing on projects, process, and the occasional lesson learned the hard way.",
);

export default async function BlogPage() {
  const settings = await getSiteSettings();
  const { eyebrow_style, eyebrow_weight, heading } = settings.theme.decorations ?? DEFAULT_DECORATIONS;

  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <p className={`text-xs uppercase tracking-[0.3em] text-accent ${eyebrowClassName(eyebrow_style, eyebrow_weight)}`}>
        Blog
      </p>
      <h1 className={`mt-4 font-display text-3xl text-foreground md:text-5xl ${headingDecorationClassName(heading)}`}>
        Notes from the studio.
      </h1>
      <p className="mt-6 max-w-2xl text-muted">
        Writing on projects, process, and the occasional lesson learned the hard way.
      </p>

      <div className="mt-10">
        <BlogPostsList />
      </div>
    </div>
  );
}
