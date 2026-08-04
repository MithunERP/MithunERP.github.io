import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact — MithunERP",
  description: "Get in touch with MithunERP about web design, software, or photography.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-20">
      <p className="text-xs uppercase tracking-[0.3em] text-accent">Contact</p>
      <h1 className="mt-4 font-display text-3xl text-foreground md:text-5xl">Get In Touch</h1>
      <p className="mt-6 max-w-xl text-muted">
        Tell us about your project — web design, custom software, or photography — and we&apos;ll
        follow up shortly.
      </p>

      <div className="mt-12 grid gap-12 md:grid-cols-[1fr_1.4fr]">
        <div className="space-y-6 text-sm text-muted">
          <div>
            <p className="text-xs uppercase tracking-widest text-foreground">Email</p>
            <a href="mailto:info@mithun-erp.com" className="transition-colors hover:text-accent">
              info@mithun-erp.com
            </a>
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-foreground">Location</p>
            <p>Available for remote engagements worldwide.</p>
          </div>
        </div>

        <ContactForm />
      </div>
    </div>
  );
}
