import type { Metadata } from "next";
import Link from "next/link";
import { getServiceBySlug } from "@/lib/services";
import { getPublishedPosts } from "@/lib/posts";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import CtaButton from "@/components/CtaButton";
import ServicePortfolio from "@/components/ServicePortfolio";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const service = await getServiceBySlug("web-design");
  return pageMetadata(`${service?.name ?? "Web Design"} — MithunERP`, service?.summary ?? "");
}

export default async function WebDesignPage() {
  const [service, portfolio] = await Promise.all([
    getServiceBySlug("web-design"),
    getPublishedPosts({ type: "portfolio", service: "web-design", limit: 5 }),
  ]);
  const s = service!;

  return (
    <div className="mx-auto max-w-4xl px-6 py-20">
      <Link href="/services" className="text-xs uppercase tracking-widest text-muted hover:text-accent">
        ← Services
      </Link>

      <Reveal className="mt-6">
        <SectionHeading as="h1" label={s.name} title={s.tagline} />
        <p className="mt-6 max-w-2xl text-muted">{s.summary}</p>
      </Reveal>

      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {s.items.map((item, i) => (
          <Reveal key={item} delay={((i % 3) + 1) as 1 | 2 | 3}>
            <div className="rounded-sm border border-panel-border bg-panel p-6">
              <p className="text-sm text-foreground">{item}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <ServicePortfolio posts={portfolio} serviceSlug="web-design" />

      <div className="mt-12">
        <CtaButton href={`/contact?subject=${encodeURIComponent(`${s.name} Inquiry`)}`}>
          Start a Web Design Project
        </CtaButton>
      </div>
    </div>
  );
}
