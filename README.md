# AIM Germany homepage demo

Presentation-only homepage built with Next.js App Router, React, TypeScript, Tailwind CSS 4, Lucide React, and lightweight CSS / IntersectionObserver animations. No Framer Motion is needed. The original `../meeting-pack/` files are unchanged.

## Run locally

From PowerShell:

```powershell
cd D:\Ambedkar\homepage-demo
npm install
npm run dev
```

Open http://localhost:3000. For a production preview: `npm run build`, then `npm start`. Do not run dev and production on the same port simultaneously. If port 3000 is occupied, use `npm run dev -- --port 3001`.

## Replace content

Edit `src/lib/content.ts` for the provisional organisation name, approved contact email, image locations, navigation, events, values and resource collections. The name is explicitly marked as provisional. No membership counts, affiliation claims, payment information or legal identifiers have been invented.

Longer section copy lives in `src/components/sections.tsx`; hero text in `src/components/hero.tsx`; footer copy in `src/components/footer.tsx`. Styling, responsive breakpoints and reduced-motion rules are in `src/app/globals.css`.

## Add approved photographs

Place client-approved/licensed files at:

```
public/ambedkar-hero.png
public/ambedkar-legacy.png
public/community-germany.jpg
public/gallery/gallery-1.jpg
public/gallery/gallery-2.jpg
public/gallery/gallery-3.jpg
public/gallery/gallery-4.jpg
public/gallery/gallery-5.jpg
```

Hero: a tall portrait with breathing room, ideally 1200 × 1500 or larger. Legacy: portrait around 1000 × 1200. Community: landscape around 1400 × 1100. Gallery: at least 1000 pixels wide; check crops after replacement. Match the actual format and filename, or update the config. A transparent portrait can use `.png` after updating its path.

Missing files render intentional geometric / typographic placeholders without requesting missing URLs. Existing files that fail to decode also fall back. Images are not downloaded or hotlinked. When adding files, refresh in development; rebuild for the production preview because the homepage asset inventory is generated at build time. Review meaningful alt text in the components when selecting final images.

## What works in the demo

- Sticky navigation, section links and scroll transitions.
- Responsive mobile menu with keyboard focus handling, Escape dismissal and scroll locking.
- Ordinary section anchors replace all modal previews. Joining/contact links reach the inline footer note; when an approved email is configured, Contact opens an email draft. Unconfirmed events/resources stay clearly inactive. Supplied gallery photos open directly.
- DE is inactive pending approved translations. EN is the current language.
- Legal and social destinations remain inactive, with a discreet preview note in the footer.
- Subtle scroll reveals, card hover treatments, 5px portrait float and reduced-motion support.

This is not a live membership or contact service. No forms, payments, tracking or third-party embeds are connected. No personal information is collected by the UI. Legal content needs approval before launch. Search engine indexing is disabled via metadata. Event cards are explicitly demo content; the April date is illustrative, not a confirmed booking.

## Validation

```powershell
npm run typecheck
npm run build
# With npm start running:
npm run qa
```

`scripts/browser-check.mjs` uses installed Chrome or Edge through Playwright. It checks requested viewport widths, horizontal overflow, console/page/network errors, sections, missing images, mobile navigation, modal absence, inline contact navigation, section backgrounds and reduced motion. It saves desktop/mobile screenshots and a JSON report under ignored `qa-artifacts/`.

Runtime dependencies: next, react, react-dom, lucide-react. Development dependencies: typescript, @types/node, @types/react, @types/react-dom, tailwindcss, @tailwindcss/postcss, @playwright/test. Exact resolved versions are in package-lock.json.

## Supplied portraits and visual refinement

The supplied cutout is installed as `public/ambedkar-hero.png`; the wide blue composition is `public/ambedkar-legacy.png`. Both originals are preserved unchanged. Manrope is bundled locally through `@fontsource-variable/manrope`, with no third-party font requests. Community and gallery image slots remain placeholders pending real community photos.

## Visual polish

`src/app/polish.css` holds the shared surface palette, 20px card treatment, portrait halo, heading accents and CTA refinement. Philosophy, community and gallery use #F2F7FF; legacy and values use #F8FBFF. Events and resources retain white surfaces. All popup interactions were removed.
