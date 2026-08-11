import { Suspense } from "react";
import { getPublishedServices } from "@/lib/services";
import { getSiteSettings } from "@/lib/settings";
import { DEFAULT_DECORATIONS, eyebrowClassName, headingDecorationClassName } from "@/lib/decorations";
import PortfolioBrowser from "@/components/PortfolioBrowser";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "Portfolio",
  "Selected work across web design, custom software, and photography.",
);

export default async function PortfolioPage() {
  const [services, settings] = await Promise.all([getPublishedServices(), getSiteSettings()]);
  const { eyebrow_style, eyebrow_weight, heading } = settings.theme.decorations ?? DEFAULT_DECORATIONS;

  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <p className={`text-xs uppercase tracking-[0.3em] text-accent ${eyebrowClassName(eyebrow_style, eyebrow_weight)}`}>
        Portfolio
      </p>
      <h1 className={`mt-4 font-display text-3xl text-foreground md:text-5xl ${headingDecorationClassName(heading)}`}>
        Selected work.
      </h1>
      <p className="mt-6 max-w-2xl text-muted">
        Projects across web design, custom software, and photography — filter by service or sort
        by date.
      </p>

      <div className="mt-10">
        <Suspense fallback={null}>
          <PortfolioBrowser services={services} />
        </Suspense>
      </div>
    </div>
  );
}
