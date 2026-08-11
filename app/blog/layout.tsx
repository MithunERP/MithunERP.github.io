import type { Metadata } from "next";
import { titleFor } from "@/lib/metadata";

// app/blog/page.tsx is a Client Component (interactive filter buttons),
// which can't export `metadata` itself — a sibling layout can, and Next
// applies it to the route the same way. `/blog/[slug]` has its own
// generateMetadata per post and isn't affected by this.
export const metadata: Metadata = {
  title: titleFor("Blog"),
  description: "Writing on projects, process, and the occasional lesson learned the hard way.",
  openGraph: {
    title: titleFor("Blog"),
    description: "Writing on projects, process, and the occasional lesson learned the hard way.",
    type: "website",
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
