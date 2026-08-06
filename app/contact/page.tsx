import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Contact — MithunERP",
  description: "Get in touch with MithunERP about web design, software, or photography.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-20">
      <Reveal>
        <SectionHeading as="h1" label="Contact" title="Get In Touch" />
        <p className="mt-6 max-w-xl text-muted">
          Tell us about your project — web design, custom software, or photography — and we&apos;ll
          follow up shortly.
        </p>
      </Reveal>

      <Reveal delay={1} className="mt-12 grid gap-12 md:grid-cols-[1fr_1.4fr]">
        <div className="space-y-6 text-sm text-muted">
          <div>
            <p className="text-xs uppercase tracking-widest text-foreground">Location</p>
            <p>Available for remote engagements worldwide.</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-foreground">Response time</p>
            <p>We typically reply within one business day.</p>
          </div>
        </div>

        <ContactForm />
      </Reveal>
    </div>
  );
}
