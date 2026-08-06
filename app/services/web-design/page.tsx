import type { Metadata } from "next";
import Link from "next/link";
import { getService } from "@/lib/services";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import CtaButton from "@/components/CtaButton";

const service = getService("web-design")!;

export const metadata: Metadata = {
  title: `${service.name} — MithunERP`,
  description: service.summary,
};

export default function WebDesignPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-20">
      <Link href="/services" className="text-xs uppercase tracking-widest text-muted hover:text-accent">
        ← Services
      </Link>

      <Reveal className="mt-6">
        <SectionHeading as="h1" label={service.name} title={service.tagline} />
        <p className="mt-6 max-w-2xl text-muted">{service.summary}</p>
      </Reveal>

      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {service.items.map((item, i) => (
          <Reveal key={item} delay={((i % 3) + 1) as 1 | 2 | 3}>
            <div className="rounded-sm border border-panel-border bg-panel p-6">
              <p className="text-sm text-foreground">{item}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-16 rounded-sm border border-panel-border bg-panel p-8">
        <p className="font-display text-lg text-foreground">
          {/* Placeholder — replace with real portfolio pieces once available. */}
          Portfolio
        </p>
        <p className="mt-2 text-sm text-muted">
          Selected work goes here once real projects are ready to show — reach out and we&apos;ll
          walk through examples directly.
        </p>
      </Reveal>

      <div className="mt-12">
        <CtaButton href="/contact">Start a Web Design Project</CtaButton>
      </div>
    </div>
  );
}
