import Link from "next/link";
import Divider from "./Divider";
import { getSiteSettings } from "@/lib/settings";

export default async function Footer() {
  const year = new Date().getFullYear();
  const { footer } = await getSiteSettings();

  return (
    <footer>
      <Divider />
      <div className="mx-auto max-w-6xl px-6 pb-10 text-sm text-muted">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="select-none font-display text-lg text-foreground">
              Mithun<span className="text-accent">ERP</span>
            </p>
            <p className="mt-2 max-w-xs">{footer.tagline}</p>
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
          <div className="flex flex-col gap-1">
            <span className="text-foreground">{footer.contact_cta.heading}</span>
            <Link href={footer.contact_cta.href} className="transition-colors hover:text-accent">
              {footer.contact_cta.label}
            </Link>
          </div>
        </div>
        <Divider className="py-6" />
        <p className="text-center text-xs">
          &copy; {year} {footer.copyright_text}
        </p>
      </div>
    </footer>
  );
}
