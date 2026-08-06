import PageTransition from "@/components/PageTransition";

// Root app/template.tsx only remounts when the first path segment changes,
// so it doesn't fire between /blog and /blog/post (same first segment) —
// this nested template covers that transition specifically.
export default function BlogTemplate({ children }: { children: React.ReactNode }) {
  return <PageTransition>{children}</PageTransition>;
}
