import Link from "next/link";

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
      <section className="relative overflow-hidden border-b border-panel-border">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--accent-strong)_0%,_transparent_55%)] opacity-30"
        />
        <div className="relative mx-auto flex max-w-6xl flex-col items-start px-6 py-28 md:py-36">
          <p className="mb-4 text-xs uppercase tracking-[0.3em] text-accent">
            Web · Software · Photography
          </p>
          <h1 className="max-w-3xl font-display text-4xl font-bold leading-tight text-foreground md:text-6xl">
            Crafted in shadow, <span className="text-accent">built to command attention.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted">
            MithunERP is a small studio delivering striking web design, dependable custom
            software, and professional photography — each project treated as a singular work,
            not a template.
          </p>
          <div className="mt-10 flex gap-4">
            <Link
              href="/services"
              className="rounded-sm bg-accent px-6 py-3 text-sm font-semibold uppercase tracking-widest text-white transition-colors hover:bg-accent-strong"
            >
              Explore Services
            </Link>
            <Link
              href="/contact"
              className="rounded-sm border border-panel-border px-6 py-3 text-sm font-semibold uppercase tracking-widest text-foreground transition-colors hover:border-accent hover:text-accent"
            >
              Start a Project
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="font-display text-2xl text-foreground md:text-3xl">What we do</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {PILLARS.map((pillar) => (
            <div
              key={pillar.title}
              className="rounded-sm border border-panel-border bg-panel p-8 transition-colors hover:border-accent"
            >
              <h3 className="font-display text-xl text-foreground">{pillar.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{pillar.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-panel-border">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-4 px-6 py-20 md:flex-row md:items-center md:justify-between">
          <h2 className="font-display text-2xl text-foreground md:text-3xl">
            Ready to bring your project into the light?
          </h2>
          <Link
            href="/contact"
            className="rounded-sm bg-accent px-6 py-3 text-sm font-semibold uppercase tracking-widest text-white transition-colors hover:bg-accent-strong"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </>
  );
}
