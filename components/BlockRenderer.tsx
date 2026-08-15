import Link from "next/link";
import { Suspense } from "react";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import CtaButton from "@/components/CtaButton";
import Divider from "@/components/Divider";
import ContactForm from "@/components/ContactForm";
import type { BlockLayout, PageBlock } from "@/lib/pageBlocks";
import type { Service } from "@/lib/services";
import type { DecorationSettings } from "@/lib/settings";
import { headingDecorationClassName, quoteDecorationClassName } from "@/lib/decorations";

const SPACER_HEIGHT: Record<string, string> = { sm: "h-8", md: "h-16", lg: "h-28" };

const WIDTH_CLASS: Record<NonNullable<BlockLayout["width"]>, string> = {
  contained: "max-w-4xl",
  wide: "max-w-6xl",
  full: "max-w-none",
};

const SPACING_TOP_CLASS: Record<NonNullable<BlockLayout["spacing_top"]>, string> = {
  none: "pt-0",
  sm: "pt-8",
  md: "pt-12",
  lg: "pt-24",
};

const SPACING_BOTTOM_CLASS: Record<NonNullable<BlockLayout["spacing_bottom"]>, string> = {
  none: "pb-0",
  sm: "pb-8",
  md: "pb-12",
  lg: "pb-24",
};

const BACKGROUND_CLASS: Record<NonNullable<BlockLayout["background"]>, string> = {
  none: "",
  panel: "bg-panel",
  "accent-tint": "bg-accent/5",
};

// Generic per-block layout — every block type that carries real content
// renders through this, so width/spacing/background are admin-controlled
// (via each block's Layout sub-section in /admin/pages) instead of hardcoded
// per block type. `decorate` is for a block's own absolutely-positioned
// background flourish (hero's radial gradient) — kept separate from the
// `background` layout option (a plain panel/accent-tint fill) since they can
// coexist.
function LayoutWrap({
  layout,
  children,
  defaultWidth = "contained",
  defaultSpacingTop = "md",
  defaultSpacingBottom = "md",
  decorate,
}: {
  layout: BlockLayout;
  children: React.ReactNode;
  defaultWidth?: NonNullable<BlockLayout["width"]>;
  defaultSpacingTop?: NonNullable<BlockLayout["spacing_top"]>;
  defaultSpacingBottom?: NonNullable<BlockLayout["spacing_bottom"]>;
  decorate?: React.ReactNode;
}) {
  const width = layout.width ?? defaultWidth;
  const spacingTop = layout.spacing_top ?? defaultSpacingTop;
  const spacingBottom = layout.spacing_bottom ?? defaultSpacingBottom;
  const background = layout.background ?? "none";

  return (
    <section className={`relative overflow-hidden ${BACKGROUND_CLASS[background]}`}>
      {decorate}
      <div
        className={`relative mx-auto px-6 ${WIDTH_CLASS[width]} ${SPACING_TOP_CLASS[spacingTop]} ${SPACING_BOTTOM_CLASS[spacingBottom]}`}
      >
        {children}
      </div>
    </section>
  );
}

// Only the hero/heading/about_bio blocks ever render an <h1> — but the page
// builder lets an admin add more than one of these to a page, which would
// silently produce multiple <h1>s (bad for SEO/a11y). Only the first one in
// position order gets to be the real h1; any later one downgrades to h2.
const H1_CAPABLE_TYPES = new Set(["hero", "heading", "about_bio"]);

export default function BlockRenderer({
  blocks,
  services,
  decorations,
}: {
  blocks: PageBlock[];
  services: Service[];
  decorations: DecorationSettings;
}) {
  const firstH1BlockId = blocks.find((b) => H1_CAPABLE_TYPES.has(b.block_type))?.id;

  return (
    <>
      {blocks.map((block) => {
        const p = block.props;
        const layout = block.layout ?? {};
        // Per-block overrides (layout.*) win over the site-wide default.
        const headingDecoration = layout.heading_decoration ?? decorations.heading;
        const eyebrowStyle = layout.eyebrow_style ?? decorations.eyebrow_style;
        const eyebrowWeight = layout.eyebrow_weight ?? decorations.eyebrow_weight;
        const quoteDecoration = layout.quote_decoration ?? decorations.quote;

        switch (block.block_type) {
          case "hero": {
            const HeroHeading = block.id === firstH1BlockId ? "h1" : "h2";
            // Editorial redesign (2026-08-15): no eyebrow, no split visual
            // panel — a single huge two-line statement carries the hero,
            // set in the body face (not font-display) at heavy weight, the
            // accent word in --accent-glow rather than --accent for a
            // sharper pop against the background. The index bar below
            // reuses the `services` prop BlockRenderer already receives —
            // it's a real anchor nav, not decorative numbering.
            const indexItems = [
              ...services.map((service) => ({ label: service.name, href: `/services/${service.slug}` })),
              { label: "Portfolio", href: "/portfolio" },
              { label: "Contact", href: "/contact" },
            ];
            return (
              <LayoutWrap key={block.id} layout={layout} defaultWidth="wide" defaultSpacingTop="lg" defaultSpacingBottom="none">
                <Reveal>
                  <HeroHeading
                    className={`max-w-4xl font-sans text-5xl font-extrabold leading-[0.98] tracking-tight text-foreground md:text-7xl ${headingDecorationClassName(headingDecoration)}`}
                  >
                    {(p.title_main as string) ?? ""}
                    <br />
                    <span className="text-accent-glow">{(p.title_accent as string) ?? ""}</span>
                  </HeroHeading>
                  <p className="mt-10 max-w-lg text-lg leading-relaxed text-muted">{(p.description as string) ?? ""}</p>
                  <div className="mt-8 flex flex-wrap gap-8">
                    <Link
                      href={(p.cta_primary_href as string) || "/services"}
                      className="border-b border-accent pb-0.5 text-sm text-foreground transition-colors hover:border-accent-glow hover:text-accent-glow"
                    >
                      {(p.cta_primary_label as string) ?? ""}
                    </Link>
                    <Link
                      href={(p.cta_secondary_href as string) || "/contact"}
                      className="border-b border-panel-border pb-0.5 text-sm text-muted transition-colors hover:border-foreground hover:text-foreground"
                    >
                      {(p.cta_secondary_label as string) ?? ""}
                    </Link>
                  </div>
                </Reveal>

                <nav aria-label="Section index" className="mt-16 flex flex-wrap border-y border-panel-border">
                  {indexItems.map((item, i) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-baseline gap-2.5 border-r border-panel-border px-5 py-4 text-xs uppercase tracking-wider text-muted transition-colors last:border-r-0 hover:text-foreground"
                    >
                      <span className="font-display text-[0.7rem] text-accent">{String(i + 1).padStart(2, "0")}</span>
                      {item.label}
                    </Link>
                  ))}
                </nav>
              </LayoutWrap>
            );
          }

          case "heading": {
            const label = (p.label as string) || "";
            const title = (p.title as string) || "";
            const description = p.description as string | undefined;
            return (
              <LayoutWrap key={block.id} layout={layout}>
                <Reveal>
                  <SectionHeading
                    as={block.id === firstH1BlockId ? "h1" : "h2"}
                    label={label}
                    title={title}
                    eyebrowStyle={eyebrowStyle}
                    eyebrowWeight={eyebrowWeight}
                    headingDecoration={headingDecoration}
                  />
                  {description && <p className="mt-6 max-w-2xl text-muted">{description}</p>}
                </Reveal>
              </LayoutWrap>
            );
          }

          case "about_bio": {
            const label = (p.label as string) || "About";
            const title = (p.title as string) || "";
            const bioParagraphs = (p.bio_paragraphs as string[]) || [];
            return (
              <LayoutWrap key={block.id} layout={layout}>
                <Reveal>
                  <SectionHeading
                    as={block.id === firstH1BlockId ? "h1" : "h2"}
                    label={label}
                    title={title}
                    eyebrowStyle={eyebrowStyle}
                    eyebrowWeight={eyebrowWeight}
                    headingDecoration={headingDecoration}
                  />
                  {bioParagraphs.map((paragraph, i) => (
                    <p key={i} className={`${i === 0 ? "mt-8" : "mt-4"} text-muted leading-relaxed`}>
                      {paragraph}
                    </p>
                  ))}
                </Reveal>
              </LayoutWrap>
            );
          }

          case "stats": {
            const label = p.label as string | undefined;
            const title = p.title as string | undefined;
            const items = (p.items as { value: string; label: string }[]) || [];
            return (
              <LayoutWrap key={block.id} layout={layout}>
                {label && title && (
                  <Reveal className="mb-10">
                    <SectionHeading
                      label={label}
                      title={title}
                      eyebrowStyle={eyebrowStyle}
                      eyebrowWeight={eyebrowWeight}
                      headingDecoration={headingDecoration}
                    />
                  </Reveal>
                )}
                <Reveal className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                  {items.map((stat) => (
                    <div key={stat.label}>
                      <p className="font-display text-3xl text-accent md:text-4xl">{stat.value}</p>
                      <p className="mt-1 text-xs uppercase tracking-widest text-muted">{stat.label}</p>
                    </div>
                  ))}
                </Reveal>
              </LayoutWrap>
            );
          }

          case "services_grid": {
            const variant = (p.variant as string) || "pillars";
            if (variant === "cards") {
              return (
                <LayoutWrap key={block.id} layout={layout} defaultWidth="wide">
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
                </LayoutWrap>
              );
            }
            // Editorial redesign (2026-08-15): a stacked list, not a card
            // grid — no section-intro label (the hero's index bar already
            // named these). Each row reveals a left accent rule + arrow on
            // hover instead of a background-color swap.
            return (
              <LayoutWrap key={block.id} layout={layout} defaultWidth="wide">
                <div>
                  {services.map((service) => (
                    <Reveal key={service.slug}>
                      <Link
                        href={`/services/${service.slug}`}
                        className="group relative grid grid-cols-1 gap-3 border-t border-panel-border py-10 transition-[padding] duration-300 last:border-b hover:pl-5 md:grid-cols-[1fr_auto_auto] md:items-baseline md:gap-6"
                      >
                        <span
                          aria-hidden
                          className="absolute -left-5 top-0 bottom-0 w-0.5 origin-top scale-y-0 bg-accent transition-transform duration-300 group-hover:scale-y-100"
                        />
                        <span>
                          <h3 className="font-display text-3xl font-bold text-foreground md:text-4xl">{service.name}</h3>
                          <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">{service.short_description}</p>
                        </span>
                        <span className="self-start text-xs uppercase tracking-wider text-muted">{service.tagline}</span>
                        <span
                          aria-hidden
                          className="self-start font-display text-xl text-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                        >
                          →
                        </span>
                      </Link>
                    </Reveal>
                  ))}
                </div>
              </LayoutWrap>
            );
          }

          case "contact_form": {
            const intro = (p.intro as string) || "";
            const location = (p.location as string) || "";
            const responseTime = (p.response_time as string) || "";
            return (
              <LayoutWrap key={block.id} layout={layout}>
                <Reveal className="mb-6 max-w-xl text-muted">
                  <p>{intro}</p>
                </Reveal>
                <Reveal className="grid gap-12 md:grid-cols-[1fr_1.4fr]">
                  <div className="space-y-6 text-sm text-muted">
                    <div>
                      <p className="text-xs uppercase tracking-widest text-foreground">Location</p>
                      <p>{location}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-widest text-foreground">Response time</p>
                      <p>{responseTime}</p>
                    </div>
                  </div>
                  <Suspense fallback={null}>
                    <ContactForm />
                  </Suspense>
                </Reveal>
              </LayoutWrap>
            );
          }

          case "richtext": {
            const html = (p.html as string) || "";
            return (
              <LayoutWrap key={block.id} layout={layout}>
                <Reveal>
                  <div className="post-content text-muted" dangerouslySetInnerHTML={{ __html: html }} />
                </Reveal>
              </LayoutWrap>
            );
          }

          case "image": {
            const url = p.url as string | undefined;
            const alt = (p.alt as string) || "";
            const caption = p.caption as string | undefined;
            if (!url) return null;
            return (
              <LayoutWrap key={block.id} layout={layout}>
                <Reveal>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={url} alt={alt} className="w-full rounded-sm object-cover" />
                  {caption && <p className="mt-2 text-center text-xs text-muted">{caption}</p>}
                </Reveal>
              </LayoutWrap>
            );
          }

          case "gallery": {
            const images = (p.images as { url: string; alt: string }[]) || [];
            if (images.length === 0) return null;
            return (
              <LayoutWrap key={block.id} layout={layout} defaultWidth="wide">
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
              </LayoutWrap>
            );
          }

          case "quote": {
            const text = (p.text as string) || "";
            const attribution = p.attribution as string | undefined;
            return (
              <LayoutWrap key={block.id} layout={layout}>
                <Reveal className={quoteDecorationClassName(quoteDecoration)}>
                  <p className="font-display text-xl italic text-foreground">&ldquo;{text}&rdquo;</p>
                  {attribution && <p className="mt-3 text-sm text-muted">— {attribution}</p>}
                </Reveal>
              </LayoutWrap>
            );
          }

          case "cta_banner": {
            const heading = (p.heading as string) || "";
            const buttonLabel = (p.button_label as string) || "";
            const buttonHref = (p.button_href as string) || "/contact";
            return (
              <LayoutWrap key={block.id} layout={layout} defaultWidth="wide" defaultSpacingTop="lg" defaultSpacingBottom="lg">
                <Reveal className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
                  <h2 className="font-display text-2xl text-foreground md:text-3xl">{heading}</h2>
                  <CtaButton href={buttonHref}>{buttonLabel}</CtaButton>
                </Reveal>
              </LayoutWrap>
            );
          }

          case "divider":
            return (
              <div key={block.id} className={BACKGROUND_CLASS[layout.background ?? "none"]}>
                <Divider />
              </div>
            );

          case "spacer": {
            const size = (p.size as string) || "md";
            return (
              <div
                key={block.id}
                className={`${SPACER_HEIGHT[size] ?? SPACER_HEIGHT.md} ${BACKGROUND_CLASS[layout.background ?? "none"]}`}
                aria-hidden
              />
            );
          }

          case "custom_html": {
            const html = (p.html as string) || "";
            return (
              <LayoutWrap key={block.id} layout={layout} defaultSpacingTop="none" defaultSpacingBottom="none">
                <div dangerouslySetInnerHTML={{ __html: html }} />
              </LayoutWrap>
            );
          }

          default:
            return null;
        }
      })}
    </>
  );
}
