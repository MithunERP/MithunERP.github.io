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
            <p className="font-display text-lg text-foreground">
              Mithun<span className="text-accent">ERP</span>
            </p>
            <p className="mt-2 max-w-xs">{footer.tagline}</p>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-foreground">Get in touch</span>
            <Link href="/contact" className="transition-colors hover:text-accent">
              Send us a message →
            </Link>
          </div>
        </div>
        <Divider className="py-6" />
        <p className="text-center text-xs">&copy; {year} MithunERP. All rights reserved.</p>
      </div>
    </footer>
  );
}
