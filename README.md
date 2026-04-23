# Calmido Design System

The source of truth for Calmido and wiebeltme.nl — colors, typography, components, and signature widgets.

**Live site:** https://calmido.github.io/design-system/

---

## What's in here

| File | Purpose |
|---|---|
| [`index.html`](./index.html) | The full browsable design system (open in any browser) |
| `assets/` | SVG assets referenced by the system |
| `.github/workflows/pages.yml` | Auto-deploys `index.html` to GitHub Pages on every push to `main` |

Open `index.html` locally or visit the Pages URL above.

---

## Tokens at a glance

### Brand colors

| Token | Hex | Usage |
|---|---|---|
| Calmido Blue | `#07369E` | Headlines, primary ink on light |
| Bright Blue | `#2050FF` | Action accent, links |
| Dark Blue | `#081748` | Dark surfaces, deep ink |
| Dark Green | `#10C186` | Primary action, toggle state |
| Bright Green | `#40EDAB` | Filled button, hero highlight |

### Status

| Token | Hex | Usage |
|---|---|---|
| Stop Red | `#FF3260` | Scam / block |
| Alert Red | `#FD5240` | Warning chips |
| Dark Red | `#690005` | Error text |

### Neutrals

| Token | Hex |
|---|---|
| White | `#FFFFFF` |
| Light Theme BG | `#FBFBFB` |
| Warm Canvas | `#F2EEED` |
| Content Light Grey | `#DADBE0` |
| Content Mid Grey | `#C1C3EB` |
| Content Dark Grey | `#6F797A` |
| BG Dark Grey | `#202128` |
| Infocard Dark | `#16171C` |

---

## Typography

Three families — all free / Google Fonts:

- **Geologica** — Display and headlines (weights 300, 700)
- **Open Sans** — Body, UI, labels (400, 600, 700)
- **Courier Prime** — Phone numbers, meta, attestations (400, 700)

### Scale

| Style | Font | Size / line-height |
|---|---|---|
| Calm_Display XL | Geologica 700 | 50 / 58 |
| Calm_Display M | Geologica 700 | 45 / 52 |
| Calm_Display S | Geologica 300 | 45 / 52 |
| Calm_Headline L | Geologica 700 | 36 / 44 |
| Calm_Headline M | Geologica 700 | 32 / 40 |
| Calm_Headline S | Geologica 700 | 28 / 36 |
| Calm_Title L | Geologica 700 | 24 / 32 |
| Calm_Title M | Geologica 700 | 22 / 28 |
| Calm_Title S | Open Sans 700 | 16 / 24 |
| Calm_Body L | Open Sans 400 | 16 / 24 |
| Calm_Body M | Open Sans 400 | 14 / 20 |
| Calm_Body S | Open Sans 400 | 12 / 16 |
| Calm_label s | Open Sans 600 | 11 / 16 · 0.08em tracked |

---

## Radius, spacing, elevation

- **Radius:** `4` input · `12` tile · `16` card · `20` panel · `30` avatar button · `100` pill / button
- **Spacing:** multiples of 4 — `4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96`
- **Elevation:**
  - `0 1px 2px rgba(8,23,72,0.06)` — list row / default card
  - `0 6px 18px rgba(8,23,72,0.08)` — modal / info card
  - `0 18px 40px rgba(8,23,72,0.18)` — overlay / who-is-calling widget

---

## Components

Styles reference (all pill 100px radius, 40px tall):

- **Filled** — `#40EDAB` bg, `#030815` ink
- **Outlined** — `#6F797A` border, `#004F54` ink
- **Tonal** — `#DBF6ED` bg, `#324D4D` ink
- **Text** — `#10C186` ink, no bg

See `index.html` for live specimens including forms, switches, avatars, badges, the full Material-style icon set, and the three Who-is-calling card variants.

---


## Updating

This system was extracted from `Calmido Website en wiebeltme.nl.fig`, page `CSS styles` (node `1:2369`). When the Figma file changes, update tokens in `index.html` inside the `:root { … }` block — everything cascades from there.

---

## License

Internal use — Calmido / wiebeltme.nl.
