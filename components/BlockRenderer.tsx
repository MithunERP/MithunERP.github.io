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
import { eyebrowClassName, headingDecorationClassName, quoteDecorationClassName } from "@/lib/decorations";

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
            return (
              <LayoutWrap
                key={block.id}
                layout={layout}
                defaultWidth="wide"
                defaultSpacingTop="lg"
                defaultSpacingBottom="lg"
                decorate={
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--accent-strong)_0%,_transparent_55%)] opacity-30"
                  />
                }
              >
                <div className="grid gap-12 md:grid-cols-2 md:items-center">
                  <Reveal>
                    <p className={`mb-4 text-xs uppercase tracking-[0.3em] text-accent ${eyebrowClassName(eyebrowStyle, eyebrowWeight)}`}>
                      {(p.eyebrow as string) ?? ""}
                    </p>
                    <HeroHeading
                      className={`max-w-3xl font-display text-4xl font-bold leading-tight text-foreground md:text-6xl ${headingDecorationClassName(headingDecoration)}`}
                    >
                      {(p.title_main as string) ?? ""} <span className="text-accent">{(p.title_accent as string) ?? ""}</span>
                    </HeroHeading>
                    <p className="mt-6 max-w-xl text-lg text-muted">{(p.description as string) ?? ""}</p>
                    <div className="mt-10 flex gap-4">
                      <CtaButton href={(p.cta_primary_href as string) || "/services"}>
                        {(p.cta_primary_label as string) ?? ""}
                      </CtaButton>
                      <CtaButton href={(p.cta_secondary_href as string) || "/contact"} variant="secondary">
                        {(p.cta_secondary_label as string) ?? ""}
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
            const label = (p.label as string) || "";
            const title = (p.title as string) || "";
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
            return (
              <LayoutWrap key={block.id} layout={layout} defaultWidth="wide">
                {label && title && (
                  <Reveal>
                    <SectionHeading
                      label={label}
                      title={title}
                      eyebrowStyle={eyebrowStyle}
                      eyebrowWeight={eyebrowWeight}
                      headingDecoration={headingDecoration}
                    />
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
