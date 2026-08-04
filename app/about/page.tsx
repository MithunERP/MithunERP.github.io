import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — MithunERP",
  description: "About MithunERP — web design, custom software, and photography.",
};

const STATS = [
  { value: "50+", label: "Clients Served" },
  { value: "15+", label: "Years Experience" },
  { value: "100%", label: "Client Satisfaction" },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-20">
      <p className="text-xs uppercase tracking-[0.3em] text-accent">About</p>
      <h1 className="mt-4 font-display text-3xl text-foreground md:text-5xl">
        About MithunERP
      </h1>
      <p className="mt-8 text-muted leading-relaxed">
        {/* Placeholder copy — replace with the real founder/studio story. */}
        MithunERP specializes in cutting-edge, professionally customized web design, software,
        and photography tailored to your business. With years of experience across enterprise
        software and visual craft, we deliver work that streamlines operations and stands out
        visually.
      </p>
      <p className="mt-4 text-muted leading-relaxed">
        Every engagement is treated as its own project, not a template — we take the time to
        understand your challenges and deliver solutions that provide real, measurable value.
      </p>

      <div className="mt-16 grid grid-cols-3 gap-6 border-t border-panel-border pt-10">
        {STATS.map((stat) => (
          <div key={stat.label}>
            <p className="font-display text-3xl text-accent md:text-4xl">{stat.value}</p>
            <p className="mt-1 text-xs uppercase tracking-widest text-muted">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
