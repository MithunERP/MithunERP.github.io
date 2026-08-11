import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getServiceBySlug, getPublishedServices } from "@/lib/services";
import { getPublishedPosts } from "@/lib/posts";
import { getGalleryImages } from "@/lib/gallery";
import { getSiteSettings } from "@/lib/settings";
import { DEFAULT_DECORATIONS } from "@/lib/decorations";
import GitHubProjects from "@/components/GitHubProjects";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import CtaButton from "@/components/CtaButton";
import ServicePortfolio from "@/components/ServicePortfolio";
import PhotoCollage from "@/components/PhotoCollage";
import { pageMetadata, titleFor } from "@/lib/metadata";

// One page per published service, generic — any service created from
// /admin/services gets a working detail page automatically, not just the
// three that used to have their own hardcoded route file. `software` and
// `photography` keep their bespoke extra sections (GitHub projects, photo
// gallery) via the slug checks below; a new service gets the plain layout.
export async function generateStaticParams() {
  const services = await getPublishedServices();
  // See app/blog/[slug]/page.tsx's comment — output: "export" requires at
  // least one generated path per dynamic route, even in the (currently
  // unlikely, but not impossible) case of zero published services.
  if (services.length === 0) return [{ slug: "_placeholder" }];
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) return { title: titleFor("Service not found") };
  return pageMetadata(service.name, service.summary);
}

const CTA_LABELS: Record<string, string> = {
  "web-design": "Start a Web Design Project",
  software: "Discuss a Software Project",
  photography: "Book a Shoot",
};

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) notFound();

  const [portfolio, gallery, settings] = await Promise.all([
    getPublishedPosts({ type: "portfolio", service: slug, limit: 5 }),
    slug === "photography" ? getGalleryImages() : Promise.resolve([]),
    getSiteSettings(),
  ]);
  const { eyebrow_style, eyebrow_weight, heading } = settings.theme.decorations ?? DEFAULT_DECORATIONS;

  return (
    <div className="mx-auto max-w-4xl px-6 py-20">
      <Link href="/services" className="text-xs uppercase tracking-widest text-muted hover:text-accent">
        ← Services
      </Link>

      <Reveal className="mt-6">
        <SectionHeading
          as="h1"
          label={service.name}
          title={service.tagline}
          eyebrowStyle={eyebrow_style}
          eyebrowWeight={eyebrow_weight}
          headingDecoration={heading}
        />
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

      {slug === "photography" &&
        (gallery.length > 0 ? (
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
        ))}

      <ServicePortfolio
        posts={portfolio}
        serviceSlug={slug}
        eyebrowStyle={eyebrow_style}
        eyebrowWeight={eyebrow_weight}
        headingDecoration={heading}
      />

      {slug === "software" && (
        <Reveal className="mt-16">
          <h2 className="font-display text-xl text-foreground">Completed Projects</h2>
          <p className="mt-2 text-sm text-muted">Live from GitHub — updated automatically.</p>
          <div className="mt-6">
            <GitHubProjects />
          </div>
        </Reveal>
      )}

      <div className="mt-12">
        <CtaButton href={`/contact?subject=${encodeURIComponent(`${service.name} Inquiry`)}`}>
          {CTA_LABELS[slug] ?? `Start a ${service.name} Project`}
        </CtaButton>
      </div>
    </div>
  );
}
