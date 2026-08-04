import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services — MithunERP",
  description: "Web design, custom software and ERP, and professional photography services.",
};

const SERVICE_GROUPS = [
  {
    name: "Web Design",
    tagline: "Sites and web apps that feel deliberate.",
    items: [
      "Marketing & portfolio websites",
      "Web application UI/UX design",
      "Responsive, accessible front-end builds",
      "Design systems & component libraries",
    ],
  },
  {
    name: "Custom Software & ERP",
    tagline: "Systems built around how your business actually runs.",
    items: [
      "Custom ERP & business process software",
      "Workflow automation & integrations",
      "Business analytics & reporting dashboards",
      "Ongoing support & system maintenance",
    ],
  },
  {
    name: "Professional Photography",
    tagline: "Editorial-grade imagery, delivered on your timeline.",
    items: [
      "Product & e-commerce photography",
      "Portrait & brand photography",
      "Event coverage",
      "Photo retouching & delivery galleries",
    ],
  },
];

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
        {SERVICE_GROUPS.map((group) => (
          <div key={group.name} className="rounded-sm border border-panel-border bg-panel p-8">
            <h2 className="font-display text-xl text-foreground">{group.name}</h2>
            <p className="mt-2 text-sm text-accent">{group.tagline}</p>
            <ul className="mt-6 space-y-3 text-sm text-muted">
              {group.items.map((item) => (
                <li key={item} className="flex gap-3">
                  <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
