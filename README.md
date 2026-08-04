# MithunERP.github.io

Public static frontend for **MithunERP** — web design, custom software, and professional
photography. Built with [Next.js](https://nextjs.org) (App Router, static export) and deployed
to [GitHub Pages](https://pages.github.com) at `MithunERP.github.io`.

Dynamic behavior (contact form, and future booking / photo-store features) is served by a
separate private backend deployed on [Vercel](https://vercel.com); this repo only ever calls
that API over `fetch()` — it has no server of its own.

## Getting started

```bash
npm install
npm run dev       # http://localhost:3000
```

Copy `.env.example` to `.env.local` and point `NEXT_PUBLIC_API_URL` at a running backend
(see the `shade` repo) if you want the contact form to work locally.

## Build

```bash
npm run build      # static export to /out
```

## Deployment

Pushing to `main` runs [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml), which
builds the static export and publishes it via GitHub Pages (Settings → Pages → Source:
**GitHub Actions**). No branch or `/docs` folder deployment is used.

## Project structure

```
app/            Next.js App Router pages
components/     Shared UI (Navbar, Footer, ThemeToggle, ContactForm, ...)
public/         Static assets, .nojekyll
legacy-static/  Reference copy of the original plain-HTML site (not built or deployed)
```

---

Internal project documentation (architecture, ADRs, API reference, roadmap, etc.) lives in the
private `shade` repo and is intentionally not part of this public repo.
