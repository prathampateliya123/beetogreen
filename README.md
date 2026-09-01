# BeeToGreen

Production Next.js site for [BeeToGreen](https://beetogreen.com) — sustainable mobility marketplace for companies and employees.

## Stack

- Next.js 16 (App Router)
- React 19
- Tailwind CSS v4
- GSAP + Lenis (animations & smooth scroll)
- Google Fonts: Parkinsans, Instrument Sans

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project structure

```
beetogreen/
├── app/                    # Next.js App Router (layout, pages, global CSS)
├── components/
│   ├── layout/             # Header, Footer
│   ├── sections/           # Homepage sections
│   ├── ui/                 # Reusable UI (buttons, logos, marquee)
│   └── providers/          # App-wide providers (Lenis, preloader)
├── context/                # React context
├── data/                   # Static content (home, navigation)
├── lib/                    # Utilities (co2 calculator, helpers)
├── public/                 # Static assets served at /
│   ├── images/
│   ├── media/
│   └── fonts/
├── styles/                 # Ported site CSS from original export
├── scripts/                # Dev tooling (CSS extraction, etc.)
└── _legacy/
    └── static-export/      # Original Nuxt/Prismic static export (reference only)
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | ESLint |
| `npm run process-css` | Re-process CSS from legacy export |

## Notes

- Content lives in `data/` (no CMS wired up yet).
- Sub-pages (`/solutions/*`, `/blog`, `/contact`, etc.) are linked but not yet implemented.
- Legacy static export is archived under `_legacy/static-export/` for reference.
