import Link from "next/link";
import Divider from "./Divider";
import { getSiteSettings } from "@/lib/settings";

const COPYRIGHT_ALIGN_CLASS: Record<string, string> = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

export default async function Footer() {
  const year = new Date().getFullYear();
  const { footer } = await getSiteSettings();

  // Explicit `=== false`/`!== false` (not just truthy/falsy) throughout so
  // this degrades safely to today's always-shown behavior if the frontend
  // deploys before a migration adding one of these keys has run yet —
  // undefined must mean "show", not "hide".
  const showLogo = footer.show_logo !== false;
  const hasContent =
    showLogo || Boolean(footer.tagline) || footer.columns.length > 0 ||
    footer.social_links.length > 0 || Boolean(footer.contact_cta.heading);
  // "Show footer on every page" only controls this content block (logo/
  // tagline/columns/social/contact) — copyright is independent below, so
  // disabling this doesn't take the copyright line down with it. Also
  // skipped when there's genuinely nothing to show in it (every field left
  // blank), rather than rendering an empty section between two dividers.
  const showContent = footer.enabled !== false && hasContent;
  const showCopyright = footer.copyright_enabled !== false;

  if (!showContent && !showCopyright) return null;

  return (
    <footer>
      {showContent && (
        <>
          <Divider />
          <div className="mx-auto max-w-6xl px-6 pb-10 text-sm text-muted">
            <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
              <div>
                {showLogo && (
                  <p className="select-none font-display text-lg text-foreground">
                    Mithun<span className="text-accent">ERP</span>
                  </p>
                )}
                {footer.tagline && (
                  <p className={showLogo ? "mt-2 max-w-xs" : "max-w-xs"}>{footer.tagline}</p>
                )}
              </div>
              {footer.columns.map((column) => (
                <div key={column.heading} className="flex flex-col gap-1">
                  <span className="text-foreground">{column.heading}</span>
                  {column.links.map((link) => (
                    <Link key={link.href} href={link.href} className="transition-colors hover:text-accent">
                      {link.label}
                    </Link>
                  ))}
                </div>
              ))}
              {footer.social_links.length > 0 && (
                <div className="flex flex-col gap-1">
                  <span className="text-foreground">Follow</span>
                  {footer.social_links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-colors hover:text-accent"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
              {footer.contact_cta.heading && (
                <div className="flex flex-col gap-1">
                  <span className="text-foreground">{footer.contact_cta.heading}</span>
                  {footer.contact_cta.href && (
                    <Link href={footer.contact_cta.href} className="transition-colors hover:text-accent">
                      {footer.contact_cta.label}
                    </Link>
                  )}
                </div>
              )}
            </div>
          </div>
        </>
      )}
      {showCopyright && (
        <div className="mx-auto max-w-6xl px-6 pb-10 text-sm text-muted">
          <Divider className="py-6" />
          <p className={`text-xs ${COPYRIGHT_ALIGN_CLASS[footer.copyright_alignment] ?? "text-center"}`}>
            &copy; {year} {footer.copyright_text}
          </p>
        </div>
      )}
    </footer>
  );
}
