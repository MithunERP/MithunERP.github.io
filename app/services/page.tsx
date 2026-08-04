import type { Metadata } from "next";
import Link from "next/link";
import { SERVICES } from "@/lib/services";

export const metadata: Metadata = {
  title: "Services — MithunERP",
  description: "Web design, custom software and ERP, and professional photography services.",
};

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <p className="text-xs uppercase tracking-[0.3em] text-accent">Services</p>
      <h1 className="mt-4 font-display text-3xl text-foreground md:text-5xl">
        Three disciplines, one standard.
      </h1>
      <p className="mt-6 max-w-2xl text-muted">
        Whether you need a new website, software to run your operations, or photography that
        actually looks like your brand, every engagement starts with understanding the problem
        before touching a single pixel or line of code.
      </p>

      <div className="mt-16 grid gap-8 md:grid-cols-3">
        {SERVICES.map((service) => (
          <Link
            key={service.slug}
            href={`/services/${service.slug}`}
            className="group flex flex-col rounded-sm border border-panel-border bg-panel p-8 transition-colors hover:border-accent"
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
        ))}
      </div>
    </div>
  );
}
