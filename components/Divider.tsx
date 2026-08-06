// Short, centered section divider — replaces full-width solid border lines.
// A crisp gradient line (fades to transparent at both ends) with a blurred
// duplicate underneath for a soft glow, rather than a hard edge-to-edge rule.
// Self-contained (no assumed page width) so it works both between full-width
// sections and nested inside a narrower content container.
export default function Divider({ className = "" }: { className?: string }) {
  return (
    <div className={`py-4 ${className}`} aria-hidden>
      <div className="relative mx-auto h-px w-40 md:w-56">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent to-transparent opacity-70 blur-sm" />
      </div>
    </div>
  );
}
