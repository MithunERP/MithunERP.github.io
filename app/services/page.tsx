import type { Metadata } from "next";
import Link from "next/link";
import { getPublishedServices } from "@/lib/services";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Services — MithunERP",
  description: "Web design, custom software and ERP, and professional photography services.",
};

export default async function ServicesPage() {
  const services = await getPublishedServices();

  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <Reveal>
        <SectionHeading as="h1" label="Services" title="Three disciplines, one standard." />
        <p className="mt-6 max-w-2xl text-muted">
          Whether you need a new website, software to run your operations, or photography that
          actually looks like your brand, every engagement starts with understanding the problem
          before touching a single pixel or line of code.
        </p>
      </Reveal>

      <div className="mt-16 grid gap-px overflow-hidden rounded-sm bg-panel-border md:grid-cols-3">
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
    </div>
  );
}
