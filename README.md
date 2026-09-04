# gennydee.com

Personal site for Genny Dee. Next.js (App Router), React, Tailwind v4. Essays are pulled from Substack's RSS feed at build time and rendered natively on the site.

---

## ⚠️ One rename before you run it

This bundle was authored in an environment that can't create square-bracket folder names. Rename one directory:

```
app/writing/-slug-/   →   app/writing/[slug]/
```

Nothing else needs touching. (On macOS Finder you can rename it directly; brackets are valid in filenames.)

## Add your photo

Drop your portrait at `public/portrait.jpg` — square, ideally 176×176 or larger. It renders as an 88px circle on the homepage. Also add a real `app/favicon.ico` (or `icon.png`); there isn't one yet.

## Run it locally

```bash
npm install
npm run dev          # http://localhost:3000
```

```bash
npm run build && npm start   # production build
```

## Deploy on Railway

1. Push this folder to `github.com/gennydee/gennydee` (see below).
2. In Railway: **New Project → Deploy from GitHub repo → gennydee/gennydee**.
3. Railway detects Next.js and runs `npm install` → `npm run build` → `npm start`. No config needed; `start` already binds Railway's `$PORT`.
4. **Settings → Networking → Custom Domain**, add `gennydee.com`, and copy the CNAME target Railway gives you.
5. At your registrar, point the domain at that CNAME. (You mentioned needing to buy one — Namecheap, Cloudflare Registrar, or Porkbun are all fine. Cloudflare sells at cost.)
6. Set `metadataBase` in `app/layout.jsx` if the final domain differs from `https://gennydee.com`.

### First push to GitHub

```bash
cd site
git init
git add .
git commit -m "First version of the site"
git branch -M main
git remote add origin https://github.com/gennydee/gennydee.git
git push -u origin main
```

From then on: `git add . && git commit -m "..." && git push` — Railway redeploys automatically.

## How essays work

`lib/substack.js` fetches `https://gennydee.substack.com/feed` and parses it. Public posts include their full body in `content:encoded`, so they render on your site inside the native article shell. **Write in Substack as you always have; new posts appear here on the next build.** Pages revalidate hourly (`export const revalidate = 3600`), so a new essay shows up within the hour without a redeploy.

Two things to know:

- **Paywalled posts** only expose an excerpt in RSS. Those render the excerpt plus a "Read the rest on Substack ↗" link. Nothing breaks.
- **Category and the optional context line** aren't in the feed. Add them per-slug in `lib/content.js → essayMeta`. Essays not listed there still render, just without a category.

If Substack is unreachable during a build, `getEssays()` logs a warning and returns an empty list rather than failing the deploy.

### Canonical URLs

Each essay page sets `alternates.canonical` to its own URL, telling search engines your site is the original. If you'd rather Substack hold that status, remove the `alternates` block in `app/writing/[slug]/page.jsx`.

### Overriding one essay

If a post deserves special typographic treatment, add a native version: create `app/writing/that-slug/page.jsx`. A concrete route wins over the dynamic one, and everything else keeps flowing through RSS.

## Structure

```
app/
  layout.jsx            fonts, metadata, no-flash theme script
  globals.css           theme tokens + the whole type/rule system
  page.jsx              /
  writing/page.jsx      /writing
  writing/[slug]/       /writing/:slug   ← rename from -slug-
  work/page.jsx         /work
  about/page.jsx        /about
  not-found.jsx
components/
  Shell.jsx             the 640px column + footer
  ThemeToggle.jsx       sun/moon switch (only client component)
  Headline.jsx, Label.jsx, BackLink.jsx, WorkList.jsx, EssayRow.jsx
lib/
  content.js            roles, per-essay metadata, Substack URLs
  substack.js           RSS fetch, parse, sanitize
```

## The design system, briefly

Everything derives from three CSS custom properties in `globals.css`:

| Token | Light | Dark |
|---|---|---|
| `--bg` | `#F7F3EC` | `#14120F` |
| `--ink` | `#17140F` | `#F2EDE3` |
| `--ink-rgb` | `23 20 15` | `242 237 227` |

All softer ink is `rgb(var(--ink-rgb) / <alpha>)`. **0.55 is the floor** for 13–16px text — below that it fails contrast. There is no accent color, on purpose.

**Type:** Geist for everything, weight 400. Geist Pixel (`ELSH 1`, the `.pixel` class) for small labels only. No all-caps anywhere.

**Scale:** page headlines 30px/40, essay titles 32px/40, company names 24px/32, body 18px/32, secondary 16px/24, labels 13px/16. Body copy caps at 46ch, headlines at 38ch.

**Spacing:** every margin, padding, and gap is a multiple of 8. Column is 640px, centered — including the footer.

**Rules:** solid hairlines separate writing; dotted rules separate roles. No shadows, no radii except the portrait and the toggle, no cards.

**Motion:** the toggle knob (240ms), link hovers, and an 8px hover shift on work rows. That's the complete inventory.

## Editorial rules

- No em dashes in copy. En dashes in year ranges only.
- No fake metrics, no case studies, no testimonials.
- Job entries state the role and what was actually built. The Vercel entry leads with building the function, not leading it.

## Notes

- Fonts load from Google Fonts. To self-host later, `npm i geist` and import from `geist/font`.
- Only `ThemeToggle` is a client component; everything else is server-rendered.
- Dependencies: next, react, react-dom, fast-xml-parser, tailwindcss. That's it.
