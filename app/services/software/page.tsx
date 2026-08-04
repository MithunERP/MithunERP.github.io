import type { Metadata } from "next";
import Link from "next/link";
import { getService } from "@/lib/services";
import GitHubProjects from "@/components/GitHubProjects";

const service = getService("software")!;

export const metadata: Metadata = {
  title: `${service.name} — MithunERP`,
  description: service.summary,
};

export default function SoftwarePage() {
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

      <div className="mt-16">
        <h2 className="font-display text-xl text-foreground">Completed Projects</h2>
        <p className="mt-2 text-sm text-muted">Live from GitHub — updated automatically.</p>
        <div className="mt-6">
          <GitHubProjects />
        </div>
      </div>

      <div className="mt-12">
        <Link
          href="/contact"
          className="inline-block rounded-sm bg-accent px-6 py-3 text-sm font-semibold uppercase tracking-widest text-white transition-colors hover:bg-accent-strong"
        >
          Discuss a Software Project
        </Link>
      </div>
    </div>
  );
}
