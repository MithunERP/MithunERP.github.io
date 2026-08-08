import type { Metadata } from "next";
import { Suspense } from "react";
import ContactForm from "@/components/ContactForm";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { getSiteSettings } from "@/lib/settings";

export const metadata: Metadata = {
  title: "Contact — MithunERP",
  description: "Get in touch with MithunERP about web design, software, or photography.",
};

export default async function ContactPage() {
  const { contact } = await getSiteSettings();

  return (
    <div className="mx-auto max-w-4xl px-6 py-20">
      <Reveal>
        <SectionHeading as="h1" label="Contact" title="Get In Touch" />
        <p className="mt-6 max-w-xl text-muted">{contact.intro}</p>
      </Reveal>

      <Reveal delay={1} className="mt-12 grid gap-12 md:grid-cols-[1fr_1.4fr]">
        <div className="space-y-6 text-sm text-muted">
          <div>
            <p className="text-xs uppercase tracking-widest text-foreground">Location</p>
            <p>{contact.location}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-foreground">Response time</p>
            <p>{contact.response_time}</p>
          </div>
        </div>

        <Suspense fallback={null}>
          <ContactForm />
        </Suspense>
      </Reveal>
    </div>
  );
}
