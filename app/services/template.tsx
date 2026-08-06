import PageTransition from "@/components/PageTransition";

// Covers /services <-> /services/[detail] transitions — same reasoning as
// app/blog/template.tsx (root template doesn't remount within one segment).
export default function ServicesTemplate({ children }: { children: React.ReactNode }) {
  return <PageTransition>{children}</PageTransition>;
}
