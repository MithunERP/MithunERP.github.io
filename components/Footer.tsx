export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-panel-border">
      <div className="mx-auto max-w-6xl px-6 py-10 text-sm text-muted">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="font-display text-lg text-foreground">
              Mithun<span className="text-accent">ERP</span>
            </p>
            <p className="mt-2 max-w-xs">
              Web design, custom software, and professional photography — crafted with precision.
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-foreground">Get in touch</span>
            <a href="mailto:info@mithun-erp.com" className="transition-colors hover:text-accent">
              info@mithun-erp.com
            </a>
          </div>
        </div>
        <p className="mt-8 border-t border-panel-border pt-6 text-xs">
          &copy; {year} MithunERP. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
