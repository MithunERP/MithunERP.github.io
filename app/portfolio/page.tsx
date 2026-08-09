import { Suspense } from "react";
import { getPublishedServices } from "@/lib/services";
import PortfolioBrowser from "@/components/PortfolioBrowser";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "Portfolio — MithunERP",
  "Selected work across web design, custom software, and photography.",
);

export default async function PortfolioPage() {
  const services = await getPublishedServices();

  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <p className="text-xs uppercase tracking-[0.3em] font-bold text-accent">Portfolio</p>
      <h1 className="mt-4 font-display text-3xl text-foreground md:text-5xl">Selected work.</h1>
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
