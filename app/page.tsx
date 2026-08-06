import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import CtaButton from "@/components/CtaButton";
import Divider from "@/components/Divider";

const PILLARS = [
  {
    title: "Web Design",
    description:
      "Distinctive, fast, accessible websites built to convert — from marketing sites to full web apps.",
  },
  {
    title: "Custom Software",
    description:
      "Bespoke software and ERP systems engineered around how your business actually operates.",
  },
  {
    title: "Professional Photography",
    description:
      "Editorial-grade product, portrait, and event photography, delivered with a distinct visual identity.",
  },
];

export default function Home() {
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
              <p className="font-display text-sm italic text-accent">
                Web · Software · Photography
              </p>
            </div>
            <h1 className="max-w-3xl font-display text-4xl font-bold leading-tight text-foreground md:text-6xl">
              Crafted in shadow, <span className="text-accent">built to command attention.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted">
              MithunERP is a small studio delivering striking web design, dependable custom
              software, and professional photography — each project treated as a singular work,
              not a template.
            </p>
            <div className="mt-10 flex gap-4">
              <CtaButton href="/services">Explore Services</CtaButton>
              <CtaButton href="/contact" variant="secondary">
                Start a Project
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
          {PILLARS.map((pillar, i) => (
            <Reveal key={pillar.title} delay={((i % 3) + 1) as 1 | 2 | 3}>
              <div className="h-full bg-panel p-8 transition-colors hover:bg-background">
                <h3 className="font-display text-xl text-foreground">{pillar.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{pillar.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <Divider />

      <section>
        <Reveal className="mx-auto flex max-w-6xl flex-col items-start gap-4 px-6 py-20 md:flex-row md:items-center md:justify-between">
          <h2 className="font-display text-2xl text-foreground md:text-3xl">
            Ready to bring your project into the light?
          </h2>
          <CtaButton href="/contact">Get in Touch</CtaButton>
        </Reveal>
      </section>
    </>
  );
}
