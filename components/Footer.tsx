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

  // Explicit `=== false` (not just falsy) so this degrades safely to
  // today's always-shown behavior if the frontend deploys before
  // migrations/0009_footer_toggles.sql has run and these keys don't exist
  // in the DB row yet — undefined must mean "show", not "hide".
  if (footer.enabled === false) return null;

  return (
    <footer>
      <Divider />
      <div className="mx-auto max-w-6xl px-6 pb-10 text-sm text-muted">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div>
            {footer.show_logo !== false && (
              <p className="select-none font-display text-lg text-foreground">
                Mithun<span className="text-accent">ERP</span>
              </p>
            )}
            {footer.tagline && (
              <p className={footer.show_logo !== false ? "mt-2 max-w-xs" : "max-w-xs"}>{footer.tagline}</p>
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
        {footer.copyright_enabled !== false && (
          <>
            <Divider className="py-6" />
            <p className={`text-xs ${COPYRIGHT_ALIGN_CLASS[footer.copyright_alignment] ?? "text-center"}`}>
              &copy; {year} {footer.copyright_text}
            </p>
          </>
        )}
      </div>
    </footer>
  );
}
