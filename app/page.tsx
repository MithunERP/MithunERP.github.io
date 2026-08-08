import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import CtaButton from "@/components/CtaButton";
import Divider from "@/components/Divider";
import { getSiteSettings } from "@/lib/settings";
import { getPublishedServices } from "@/lib/services";

export default async function Home() {
  const [settings, services] = await Promise.all([getSiteSettings(), getPublishedServices()]);
  const { hero } = settings;

  return (
    <>
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--accent-strong)_0%,_transparent_55%)] opacity-30"
        />
        <div className="relative mx-auto grid max-w-6xl gap-12 px-6 py-28 md:grid-cols-2 md:items-center md:py-36">
          <Reveal>
            <div className="mb-4 flex items-center gap-3">
              <span aria-hidden className="h-6 w-[3px] shrink-0 bg-accent" />
              <p className="font-display text-sm italic text-accent">{hero.eyebrow}</p>
            </div>
            <h1 className="max-w-3xl font-display text-4xl font-bold leading-tight text-foreground md:text-6xl">
              {hero.title_main} <span className="text-accent">{hero.title_accent}</span>
            </h1>
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

      <Divider />

      <section className="mx-auto max-w-6xl px-6 py-20">
        <Reveal>
          <SectionHeading label="Overview" title="What we do" />
        </Reveal>
        <div className="mt-10 grid gap-px overflow-hidden rounded-sm bg-panel-border md:grid-cols-3">
          {services.map((service, i) => (
            <Reveal key={service.slug} delay={((i % 3) + 1) as 1 | 2 | 3}>
              <div className="h-full bg-panel p-8 transition-colors hover:bg-background">
                <h3 className="font-display text-xl text-foreground">{service.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {service.short_description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <Divider />

      <section>
        <Reveal className="mx-auto flex max-w-6xl flex-col items-start gap-4 px-6 py-20 md:flex-row md:items-center md:justify-between">
          <h2 className="font-display text-2xl text-foreground md:text-3xl">
            {hero.bottom_cta_heading}
          </h2>
          <CtaButton href="/contact">Get in Touch</CtaButton>
        </Reveal>
      </section>
    </>
  );
}
