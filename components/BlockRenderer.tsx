import Link from "next/link";
import { Suspense } from "react";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import CtaButton from "@/components/CtaButton";
import Divider from "@/components/Divider";
import ContactForm from "@/components/ContactForm";
import type { PageBlock } from "@/lib/pageBlocks";
import type { SiteSettings } from "@/lib/settings";
import type { Service } from "@/lib/services";

const SPACER_HEIGHT: Record<string, string> = { sm: "h-8", md: "h-16", lg: "h-28" };

function Wrap({
  wide,
  children,
}: {
  wide?: boolean;
  children: React.ReactNode;
}) {
  return <div className={`mx-auto px-6 py-12 ${wide ? "max-w-6xl" : "max-w-4xl"}`}>{children}</div>;
}

// Only the hero/heading/about_bio blocks ever render an <h1> — but the page
// builder lets an admin add more than one of these to a page, which would
// silently produce multiple <h1>s (bad for SEO/a11y). Only the first one in
// position order gets to be the real h1; any later one downgrades to h2.
const H1_CAPABLE_TYPES = new Set(["hero", "heading", "about_bio"]);

export default function BlockRenderer({
  blocks,
  settings,
  services,
}: {
  blocks: PageBlock[];
  settings: SiteSettings;
  services: Service[];
}) {
  const firstH1BlockId = blocks.find((b) => H1_CAPABLE_TYPES.has(b.block_type))?.id;

  return (
    <>
      {blocks.map((block) => {
        const p = block.props;

        switch (block.block_type) {
          case "hero": {
            const { hero } = settings;
            const HeroHeading = block.id === firstH1BlockId ? "h1" : "h2";
            return (
              <section key={block.id} className="relative overflow-hidden">
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--accent-strong)_0%,_transparent_55%)] opacity-30"
                />
                <div className="relative mx-auto grid max-w-6xl gap-12 px-6 py-28 md:grid-cols-2 md:items-center md:py-36">
                  <Reveal>
                    <p className="mb-4 text-xs uppercase tracking-[0.3em] font-bold text-accent">
                      {hero.eyebrow}
                    </p>
                    <HeroHeading className="max-w-3xl font-display text-4xl font-bold leading-tight text-foreground md:text-6xl">
                      {hero.title_main} <span className="text-accent">{hero.title_accent}</span>
                    </HeroHeading>
                    <p className="mt-6 max-w-xl text-lg text-muted">{hero.description}</p>
                    <div className="mt-10 flex gap-4">
                      <CtaButton href="/services">{hero.cta_primary_label}</CtaButton>
                      <CtaButton href="/contact" variant="secondary">
                        {hero.cta_secondary_label}
                      </CtaButton>
                    </div>
                  </Reveal>
                  <Reveal delay={2} className="hidden md:block">
                    <div className="relative aspect-square overflow-hidden rounded-sm border border-panel-border bg-panel">
                      <div
                        aria-hidden
                        className="absolute inset-0 bg-[linear-gradient(160deg,_var(--panel)_0%,_var(--accent-strong)_150%)] opacity-70"
                      />
                      <div
                        aria-hidden
                        className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:28px_28px]"
                      />
                      <div
                        aria-hidden
                        className="pointer-events-none absolute -bottom-16 -right-6 select-none font-display text-[260px] font-black leading-none text-accent/[0.09]"
                      >
                        M
                      </div>
                    </div>
                  </Reveal>
                </div>
              </section>
            );
          }

          case "heading": {
            const label = (p.label as string) || "";
            const title = (p.title as string) || "";
            const description = p.description as string | undefined;
            return (
              <Wrap key={block.id}>
                <Reveal>
                  <SectionHeading as={block.id === firstH1BlockId ? "h1" : "h2"} label={label} title={title} />
                  {description && <p className="mt-6 max-w-2xl text-muted">{description}</p>}
                </Reveal>
              </Wrap>
            );
          }

          case "about_bio": {
            const { about } = settings;
            const label = (p.label as string) || "About";
            const title = (p.title as string) || "";
            return (
              <Wrap key={block.id}>
                <Reveal>
                  <SectionHeading as={block.id === firstH1BlockId ? "h1" : "h2"} label={label} title={title} />
                  {about.bio_paragraphs.map((paragraph, i) => (
                    <p key={i} className={`${i === 0 ? "mt-8" : "mt-4"} text-muted leading-relaxed`}>
                      {paragraph}
                    </p>
                  ))}
                </Reveal>
              </Wrap>
            );
          }

          case "stats": {
            const { about } = settings;
            const label = p.label as string | undefined;
            const title = p.title as string | undefined;
            return (
              <Wrap key={block.id}>
                {label && title && (
                  <Reveal className="mb-10">
                    <SectionHeading label={label} title={title} />
                  </Reveal>
                )}
                <Reveal className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                  {about.stats.map((stat) => (
                    <div key={stat.label}>
                      <p className="font-display text-3xl text-accent md:text-4xl">{stat.value}</p>
                      <p className="mt-1 text-xs uppercase tracking-widest text-muted">{stat.label}</p>
                    </div>
                  ))}
                </Reveal>
              </Wrap>
            );
          }

          case "services_grid": {
            const variant = (p.variant as string) || "pillars";
            const label = (p.label as string) || "";
            const title = (p.title as string) || "";
            if (variant === "cards") {
              return (
                <Wrap key={block.id} wide>
                  <div className="grid gap-px overflow-hidden rounded-sm bg-panel-border sm:grid-cols-2 md:grid-cols-3">
                    {services.map((service, i) => (
                      <Reveal key={service.slug} delay={((i % 3) + 1) as 1 | 2 | 3}>
                        <Link
                          href={`/services/${service.slug}`}
                          className="group flex h-full flex-col bg-panel p-8 transition-colors hover:bg-background"
                        >
                          <h2 className="font-display text-xl text-foreground">{service.name}</h2>
                          <p className="mt-2 text-sm text-accent">{service.tagline}</p>
                          <ul className="mt-6 space-y-3 text-sm text-muted">
                            {service.items.map((item) => (
                              <li key={item} className="flex gap-3">
                                <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                          <span className="mt-8 text-xs uppercase tracking-widest text-foreground transition-colors group-hover:text-accent">
                            Learn more →
                          </span>
                        </Link>
                      </Reveal>
                    ))}
                  </div>
                </Wrap>
              );
            }
            return (
              <Wrap key={block.id} wide>
                {label && title && (
                  <Reveal>
                    <SectionHeading label={label} title={title} />
                  </Reveal>
                )}
                <div className="mt-10 grid gap-px overflow-hidden rounded-sm bg-panel-border sm:grid-cols-2 md:grid-cols-3">
                  {services.map((service, i) => (
                    <Reveal key={service.slug} delay={((i % 3) + 1) as 1 | 2 | 3}>
                      <div className="h-full bg-panel p-8 transition-colors hover:bg-background">
                        <h3 className="font-display text-xl text-foreground">{service.name}</h3>
                        <p className="mt-3 text-sm leading-relaxed text-muted">{service.short_description}</p>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </Wrap>
            );
          }

          case "contact_form": {
            const { contact } = settings;
            return (
              <Wrap key={block.id}>
                <Reveal className="mb-6 max-w-xl text-muted">
                  <p>{contact.intro}</p>
                </Reveal>
                <Reveal className="grid gap-12 md:grid-cols-[1fr_1.4fr]">
                  <div className="space-y-6 text-sm text-muted">
                    <div>
                      <p className="text-xs uppercase tracking-widest text-foreground">Location</p>
                      <p>{contact.location}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-widest text-foreground">Response time</p>
                      <p>{contact.response_time}</p>
                    </div>
                  </div>
                  <Suspense fallback={null}>
                    <ContactForm />
                  </Suspense>
                </Reveal>
              </Wrap>
            );
          }

          case "richtext": {
            const html = (p.html as string) || "";
            return (
              <Wrap key={block.id}>
                <Reveal>
                  <div className="post-content text-muted" dangerouslySetInnerHTML={{ __html: html }} />
                </Reveal>
              </Wrap>
            );
          }

          case "image": {
            const url = p.url as string | undefined;
            const alt = (p.alt as string) || "";
            const caption = p.caption as string | undefined;
            if (!url) return null;
            return (
              <Wrap key={block.id}>
                <Reveal>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={url} alt={alt} className="w-full rounded-sm object-cover" />
                  {caption && <p className="mt-2 text-center text-xs text-muted">{caption}</p>}
                </Reveal>
              </Wrap>
            );
          }

          case "gallery": {
            const images = (p.images as { url: string; alt: string }[]) || [];
            if (images.length === 0) return null;
            return (
              <Wrap key={block.id} wide>
                <Reveal className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                  {images.map((img, i) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      key={i}
                      src={img.url}
                      alt={img.alt}
                      className="aspect-square w-full rounded-sm object-cover"
                    />
                  ))}
                </Reveal>
              </Wrap>
            );
          }

          case "quote": {
            const text = (p.text as string) || "";
            const attribution = p.attribution as string | undefined;
            return (
              <Wrap key={block.id}>
                <Reveal className="border-l-2 border-accent pl-6">
                  <p className="font-display text-xl italic text-foreground">&ldquo;{text}&rdquo;</p>
                  {attribution && <p className="mt-3 text-sm text-muted">— {attribution}</p>}
                </Reveal>
              </Wrap>
            );
          }

          case "cta_banner": {
            const heading = (p.heading as string) || "";
            const buttonLabel = (p.button_label as string) || "";
            const buttonHref = (p.button_href as string) || "/contact";
            return (
              <section key={block.id}>
                <Reveal className="mx-auto flex max-w-6xl flex-col items-start gap-4 px-6 py-20 md:flex-row md:items-center md:justify-between">
                  <h2 className="font-display text-2xl text-foreground md:text-3xl">{heading}</h2>
                  <CtaButton href={buttonHref}>{buttonLabel}</CtaButton>
                </Reveal>
              </section>
            );
          }

          case "divider":
            return <Divider key={block.id} />;

          case "spacer": {
            const size = (p.size as string) || "md";
            return <div key={block.id} className={SPACER_HEIGHT[size] ?? SPACER_HEIGHT.md} aria-hidden />;
          }

          case "custom_html": {
            const html = (p.html as string) || "";
            return (
              <div key={block.id} dangerouslySetInnerHTML={{ __html: html }} />
            );
          }

          default:
            return null;
        }
      })}
    </>
  );
}
