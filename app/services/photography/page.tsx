import type { Metadata } from "next";
import Link from "next/link";
import { getService } from "@/lib/services";

const service = getService("photography")!;

export const metadata: Metadata = {
  title: `${service.name} — MithunERP`,
  description: service.summary,
};

export default function PhotographyPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-20">
      <Link href="/services" className="text-xs uppercase tracking-widest text-muted hover:text-accent">
        ← Services
      </Link>
      <p className="mt-6 text-xs uppercase tracking-[0.3em] text-accent">{service.name}</p>
      <h1 className="mt-4 font-display text-3xl text-foreground md:text-5xl">{service.tagline}</h1>
      <p className="mt-6 max-w-2xl text-muted">{service.summary}</p>

      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {service.items.map((item) => (
          <div key={item} className="rounded-sm border border-panel-border bg-panel p-6">
            <p className="text-sm text-foreground">{item}</p>
          </div>
        ))}
      </div>

      <div className="mt-16 rounded-sm border border-panel-border bg-panel p-8">
        <p className="font-display text-lg text-foreground">
          {/* Placeholder — replace with a real gallery once photos are ready. */}
          Gallery
        </p>
        <p className="mt-2 text-sm text-muted">
          A full portfolio gallery is coming once real photos are ready to publish — see
          <code className="mx-1 rounded bg-background px-1.5 py-0.5 text-xs">docs/plan.md</code>
          in the backend repo for status.
        </p>
      </div>

      <div className="mt-12">
        <Link
          href="/contact"
          className="inline-block rounded-sm bg-accent px-6 py-3 text-sm font-semibold uppercase tracking-widest text-white transition-colors hover:bg-accent-strong"
        >
          Book a Shoot
        </Link>
      </div>
    </div>
  );
}
