"use client";

import { useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

type Status = "idle" | "sending" | "sent" | "error";

// Service pages link here with ?subject=<name> Inquiry (see e.g.
// app/services/web-design/page.tsx) so a visitor arriving from a specific
// service doesn't have to re-type what they're asking about.
export default function ContactForm() {
  const searchParams = useSearchParams();
  const initialSubject = searchParams.get("subject") ?? "";
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setErrorMessage("");

    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error ?? "Something went wrong. Please try again.");
      }

      setStatus("sent");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-sm border border-accent bg-panel p-8 text-foreground">
        <p className="font-display text-xl text-accent">Message received.</p>
        <p className="mt-2 text-sm text-muted">
          Thank you — we&apos;ll get back to you shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid gap-4 md:grid-cols-2">
        <input
          name="name"
          type="text"
          required
          placeholder="Your Name"
          className="rounded-sm border border-panel-border bg-panel px-4 py-3 text-foreground placeholder:text-muted focus:border-accent focus:outline-none"
        />
        <input
          name="email"
          type="email"
          required
          placeholder="Your Email"
          className="rounded-sm border border-panel-border bg-panel px-4 py-3 text-foreground placeholder:text-muted focus:border-accent focus:outline-none"
        />
      </div>
      <input
        name="subject"
        type="text"
        required
        defaultValue={initialSubject}
        placeholder="Subject"
        className="rounded-sm border border-panel-border bg-panel px-4 py-3 text-foreground placeholder:text-muted focus:border-accent focus:outline-none"
      />
      <textarea
        name="message"
        required
        rows={5}
        placeholder="Your Message"
        className="rounded-sm border border-panel-border bg-panel px-4 py-3 text-foreground placeholder:text-muted focus:border-accent focus:outline-none"
      />

      {status === "error" && <p className="text-sm text-accent-glow">{errorMessage}</p>}

      <button
        type="submit"
        disabled={status === "sending"}
        className="self-start rounded-sm bg-accent px-6 py-3 text-sm font-semibold uppercase tracking-widest text-white transition-colors hover:bg-accent-strong disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}
