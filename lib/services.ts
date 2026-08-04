export interface Service {
  slug: string;
  name: string;
  tagline: string;
  summary: string;
  items: string[];
}

export const SERVICES: Service[] = [
  {
    slug: "web-design",
    name: "Web Design",
    tagline: "Sites and web apps that feel deliberate.",
    summary:
      "Every site starts from what it needs to do, not a template — marketing pages that convert, and application UIs people can actually use.",
    items: [
      "Marketing & portfolio websites",
      "Web application UI/UX design",
      "Responsive, accessible front-end builds",
      "Design systems & component libraries",
    ],
  },
  {
    slug: "software",
    name: "Custom Software & ERP",
    tagline: "Systems built around how your business actually runs.",
    summary:
      "Off-the-shelf software bends your process to fit the tool. Custom software does the opposite — built around your workflow, not a generic template.",
    items: [
      "Custom ERP & business process software",
      "Workflow automation & integrations",
      "Business analytics & reporting dashboards",
      "Ongoing support & system maintenance",
    ],
  },
  {
    slug: "photography",
    name: "Professional Photography",
    tagline: "Editorial-grade imagery, delivered on your timeline.",
    summary:
      "Product, portrait, and event photography shot and retouched to a consistent visual identity — not just a memory card handed back unedited.",
    items: [
      "Product & e-commerce photography",
      "Portrait & brand photography",
      "Event coverage",
      "Photo retouching & delivery galleries",
    ],
  },
];

export function getService(slug: string): Service | undefined {
  return SERVICES.find((service) => service.slug === slug);
}
