# Vexora · Operational AI Infrastructure

Production-ready Next.js 14 codebase for [vexora.uk](https://vexora.uk).
Operational AI infrastructure for the modern enterprise — 65 systems · 26 sectors · 6 continents.

## Tech stack

- **Next.js 14** (App Router, RSC, dynamic routes)
- **TypeScript** (strict)
- **TailwindCSS** + custom design tokens
- **Three.js** + **React Three Fiber** + **drei**
- **Framer Motion** for cinematic transitions
- **GSAP** for legacy timeline support

## Project structure

```
vexora-nextjs/
├── app/
│   ├── layout.tsx              # Root layout (Preloader, Cursor, Particles, Nav, CommandPalette)
│   ├── page.tsx                # Homepage
│   ├── globals.css             # Design system + custom cursor + utilities
│   └── systems/[slug]/page.tsx # Dynamic per-system page (one per system)
├── components/
│   ├── core/                   # CustomCursor · AmbientParticles · Preloader · Nav · CommandPalette · Footer
│   ├── sections/               # Hero · Divisions · Ecosystem · Catalog · Operations · Sections (Industries/Stats/Voices/Process/Contact) · SystemDashboard
│   ├── three/                  # HeroScene · SolarSystem · Globe
│   └── ui/                     # SystemCard · DivisionCard · Primitives (Button, ArchBrackets, FlowDivider, etc.)
├── lib/
│   ├── systems.ts              # 65 enterprise system definitions + helpers
│   ├── divisions.ts            # 6 operating divisions
│   └── utils.ts                # cn, INDUSTRY_VERBS, REGIONS
├── public/
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build for production

```bash
npm run build
npm run start
```

## Deploy to Vercel

The fastest path is via the Vercel dashboard:

1. Push this repository to GitHub (e.g. `Vexorasystems/VexoraAi`):
   ```bash
   git init
   git add .
   git commit -m "Initial Vexora platform"
   git branch -M main
   git remote add origin https://github.com/Vexorasystems/VexoraAi.git
   git push -u origin main
   ```
2. Import the repo into Vercel ([vercel.com/new](https://vercel.com/new)).
3. Vercel auto-detects Next.js — no configuration needed.
4. Click **Deploy**.

Or via CLI:
```bash
npm i -g vercel
vercel
```

## Adding a new system

Edit `lib/systems.ts`. Add a new tuple to the `raw` array following the existing pattern:

```ts
['VEX/SECTOR/NAME', 'op', 'Name', 'Industry', 'Category', 'Description', ['Feat 1', 'Feat 2', 'Feat 3'], 'metric · 24h', '184k'],
```

The system will automatically:
- Appear in the catalog and command palette
- Generate its own page at `/systems/sector-name`
- Inherit the full enterprise dashboard, ROI section, related systems, and CTA
- Get appropriate industry-specific live activity verbs

## Design system

- **Colors** — `ink #030305` · `text #f5f5f7` · `text-2 #a8a8ad` · `text-3 #65656a` · `signal-green #6cf07a`
- **Type** — Fraunces (italic display) · Inter (body) · JetBrains Mono (system readouts)
- **Easing** — `cubic-bezier(0.65, 0, 0.35, 1)` for cinema · `cubic-bezier(0.22, 1, 0.36, 1)` for cinematic curves

## Performance

- All Three.js scenes lazy-loaded via `next/dynamic` with `ssr: false`
- `next/font` for zero-CLS web fonts
- Static rendering of all 65 system pages at build time via `generateStaticParams`
- Tailwind purges unused CSS in production builds
- Image optimisation via `next/image`

## License

© Vexora Systems Ltd. All rights reserved.

## Contact

[hello@vexora.uk](mailto:hello@vexora.uk) · Leicester, UK
