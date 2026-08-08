import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import Divider from "@/components/Divider";
import { getSiteSettings } from "@/lib/settings";

export const metadata: Metadata = {
  title: "About — MithunERP",
  description: "About MithunERP — web design, custom software, and photography.",
};

export default async function AboutPage() {
  const { about } = await getSiteSettings();

  return (
    <div className="mx-auto max-w-4xl px-6 py-20">
      <Reveal>
        <SectionHeading as="h1" label="About" title="About MithunERP" />
        {about.bio_paragraphs.map((paragraph, i) => (
          <p key={i} className={`${i === 0 ? "mt-8" : "mt-4"} text-muted leading-relaxed`}>
            {paragraph}
          </p>
        ))}
      </Reveal>

      <Divider className="mt-16" />

      <Reveal delay={1} className="grid grid-cols-3 gap-6">
        {about.stats.map((stat) => (
          <div key={stat.label}>
            <p className="font-display text-3xl text-accent md:text-4xl">{stat.value}</p>
            <p className="mt-1 text-xs uppercase tracking-widest text-muted">{stat.label}</p>
          </div>
        ))}
      </Reveal>
    </div>
  );
}
