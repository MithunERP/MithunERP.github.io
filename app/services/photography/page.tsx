import type { Metadata } from "next";
import Link from "next/link";
import { getServiceBySlug } from "@/lib/services";
import { getPublishedPosts } from "@/lib/posts";
import { getGalleryImages } from "@/lib/gallery";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import CtaButton from "@/components/CtaButton";
import ServicePortfolio from "@/components/ServicePortfolio";
import PhotoCollage from "@/components/PhotoCollage";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const service = await getServiceBySlug("photography");
  return pageMetadata(
    `${service?.name ?? "Professional Photography"} — MithunERP`,
    service?.summary ?? "",
  );
}

export default async function PhotographyPage() {
  const [service, portfolio, gallery] = await Promise.all([
    getServiceBySlug("photography"),
    getPublishedPosts({ type: "portfolio", service: "photography", limit: 5 }),
    getGalleryImages(),
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

      {gallery.length > 0 ? (
        <PhotoCollage images={gallery} />
      ) : (
        <Reveal className="mt-16 rounded-sm border border-panel-border bg-panel p-8">
          <p className="font-display text-lg text-foreground">Gallery</p>
          <p className="mt-2 text-sm text-muted">
            A full photo gallery is coming once real photos are ready to publish — see
            <code className="mx-1 rounded bg-background px-1.5 py-0.5 text-xs">docs/plan.md</code>
            in the backend repo for status.
          </p>
        </Reveal>
      )}

      <ServicePortfolio posts={portfolio} serviceSlug="photography" />

      <div className="mt-12">
        <CtaButton href={`/contact?subject=${encodeURIComponent(`${s.name} Inquiry`)}`}>
          Book a Shoot
        </CtaButton>
      </div>
    </div>
  );
}
