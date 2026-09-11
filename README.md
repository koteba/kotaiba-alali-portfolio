# Kotaiba Alali — Portfolio

A bilingual (Arabic RTL / English LTR) portfolio for a Full Stack Developer &
Business Analyst, built with Next.js 14 (App Router), React, TypeScript, and
Tailwind CSS. Statically exportable, so it deploys for free on Vercel (or any
static host) with no server required.

## Stack

- **Next.js 14** (App Router, static export via `output: 'export'`)
- **TypeScript**
- **Tailwind CSS** — custom design tokens (colors, fonts, gradient) in `tailwind.config.ts`
- **Framer Motion** — scroll reveals, staggered sections, animated bars, timeline, navbar blur
- **next-themes** — dark/light mode with system-preference detection, persisted to localStorage
- **lucide-react** — icon set

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000. The admin panel lives at http://localhost:3000/admin
(not linked anywhere in the public UI — it's a hidden route, see below).

## Build & deploy

```bash
npm run build
```

This produces a fully static site in `/out` (because of `output: 'export'` in
`next.config.mjs`). To deploy on Vercel:

1. Push this repo to GitHub.
2. Import it in Vercel — no configuration needed, it auto-detects Next.js.
3. Vercel will run `next build` and serve the static export. Free tier is enough.

You can also drag the `/out` folder into any static host (Netlify, GitHub
Pages, Cloudflare Pages, S3, etc).

## Content architecture — how to edit copy

**Every piece of visible text lives in `lib/content.ts`.** It exports a single
`defaultContent` object typed by `lib/types.ts` (`SiteContent`). Nothing in the
components hardcodes copy — they all read from this object via the
`useContent()` hook, and pick the right language with `t()` from
`useLocale()`.

To permanently change the default copy (what ships to every visitor with no
admin edits), just edit `lib/content.ts` directly and redeploy.

Fixed interface chrome (nav labels, section eyebrows, footer text) that isn't
part of the editable content model lives separately in `lib/ui-strings.ts`.

## Admin panel (`/admin`)

A lightweight content editor, **not linked from the public site and with no
authentication** (per the brief — add auth before using this in a context
where that matters). It lets you edit:

- Hero (name, title, tagline, value proposition, location, CTA labels)
- About (heading, paragraph, education line)
- Skills (add/edit/remove categories and individual skills + levels)
- Experience (add/edit/remove roles and their achievement bullets)
- Projects (add/edit/remove, tech stack, links, key metric)
- Certifications (add/edit/remove)
- Social links (email, phone, GitHub, LinkedIn)

Edits are saved as a JSON **override** object in `localStorage` under the key
`portfolio_content_overrides`. On every page load, the site deep-merges this
override on top of `defaultContent` from `lib/content.ts` — so an edit only
needs to touch the fields that changed.

Toolbar actions:
- **Save changes** — writes the current draft to localStorage.
- **Reset to default** — clears all overrides, reverting to `lib/content.ts`.
- **Export JSON** — downloads the current overrides as a `.json` file, so you
  can back them up or move them to another browser/device.
- **Import JSON** — uploads a previously exported (or hand-written) JSON file
  and applies it as the new overrides.

Because overrides live in `localStorage`, they are **per-browser, per-device**
— they do not sync automatically across visitors or devices. Use Export/Import
to move content between machines, or promote a finished edit into
`lib/content.ts` and redeploy to make it the new default for everyone.

## Replacing the CV

Drop a real PDF at `public/cv.pdf` (same filename) — the navbar and hero
"Download CV" buttons link straight to `/cv.pdf`. A placeholder CV generated
from the default content ships in that path today; `scripts/generate_cv.py`
(requires `pip install reportlab`) shows how it was built if you want to
regenerate it programmatically instead of designing one by hand.

## Bilingual / RTL support

- `lib/locale-context.tsx` manages the active locale (`en` / `ar`), persists it
  to `localStorage`, and flips `<html dir>` between `ltr` and `rtl`.
- Tailwind's logical properties (`ps-`, `pe-`, `start-`, `end-`, etc.) are used
  wherever a value needs to flip between RTL and LTR automatically.
- Arabic renders in **IBM Plex Sans Arabic** (a refined, professional
  typeface with real medium/bold weights); English renders in **Inter**
  (body) and **Space Grotesk** (display/headings). All three load via
  `next/font/google` in `app/layout.tsx`.
- Headings use the `font-display` class (Space Grotesk) by default, but
  Space Grotesk has no Arabic glyphs — so `app/globals.css` swaps
  `.font-display` to the Arabic face whenever `dir="rtl"`, at a heavier
  weight, so Arabic headings never silently fall back to a generic system
  font.
- The root font size bumps up (16px → 17.5px, 18px on larger screens) when
  the page is RTL. Since the whole type scale is built on Tailwind's
  rem-based sizes, this one rule scales every Arabic heading, paragraph, and
  button proportionally larger than the Latin sizing, per the brief.

## Folder structure

```
app/
  layout.tsx        — fonts, providers (theme/locale/content), SEO metadata
  page.tsx           — assembles all public sections
  globals.css        — Tailwind layers + base styles
  sitemap.ts         — SEO sitemap
  robots.ts          — SEO robots (disallows /admin)
  admin/
    layout.tsx       — noindex metadata for the admin route
    page.tsx          — admin dashboard (tabs, save/reset/export/import)
components/
  Navbar.tsx, Hero.tsx, About.tsx, Skills.tsx, Experience.tsx,
  Projects.tsx, Certifications.tsx, Languages.tsx, Contact.tsx, Footer.tsx
  ThemeToggle.tsx, LanguageSwitcher.tsx, AnimatedSection.tsx
  admin/AdminFields.tsx — reusable form primitives for the admin panel
lib/
  types.ts            — SiteContent type model
  content.ts           — default bilingual copy (single source of truth)
  ui-strings.ts         — fixed nav/section/footer chrome strings
  content-context.tsx    — merges localStorage overrides with defaults
  locale-context.tsx      — locale + RTL/LTR state
  merge.ts                 — deep-merge utility
public/
  cv.pdf              — downloadable CV (replace with the real one)
  favicon.svg
scripts/
  generate_cv.py       — regenerates the placeholder CV PDF
```

## Notes

- The contact form is client-only (no backend wired up), since the site is a
  static export. Wire `handleSubmit` in `components/Contact.tsx` to an email
  API route, a form service (Formspree, etc.), or a serverless function once
  you have a backend target.
- Update `siteUrl` in `app/layout.tsx`, `app/sitemap.ts`, and `app/robots.ts`
  once you have a real production domain.
