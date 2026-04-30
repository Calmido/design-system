# Calmido Design System

The source of truth for Calmido and wiebeltme.nl — colors, typography, components, and signature widgets.

**Live site:** https://calmido.github.io/design-system/

---

## What's in here

| File | Purpose |
|---|---|
| [`index.html`](./index.html) | The full browsable design system (open in any browser) |
| `Calmido-DesignSystem.html` | Redirect stub for the legacy deep-link URL |
| `assets/` | SVG assets referenced by the system |
| `icons/` | Icon set — 24×24 SVGs with `currentColor` fill (see [Icons](#icons)) |

Open `index.html` locally or visit the Pages URL above. GitHub Pages is
configured (legacy mode, `main` / root) to auto-deploy on every push.

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
| Calm_Display_XL | Geologica 700 | 50 / 58 |
| Calm_Display_M | Geologica 700 | 45 / 52 |
| Calm_Display_S | Geologica 300 | 45 / 52 |
| Calm_Headline_L | Geologica 700 | 36 / 44 |
| Calm_Headline_M | Geologica 700 | 32 / 40 |
| Calm_Headline_S | Geologica 700 | 28 / 36 |
| Calm_Title_L | Geologica 700 | 24 / 32 |
| Calm_Title_M | Geologica 700 | 22 / 28 |
| Calm_Title_S | Open Sans 700 | 16 / 24 |
| Calm_Body_L | Open Sans 400 | 16 / 24 |
| Calm_Body_M | Open Sans 400 | 14 / 20 |
| Calm_Body_S | Open Sans 400 | 12 / 16 |
| Calm_Label_S | Open Sans 600 | 11 / 16 · 0.08em tracked |
| Calm_Mono_M | Courier Prime 700 | 18 / 24 |

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

- **Filled** — `#40EDAB` bg, `#081748` ink · hover flips to `#07369E` bg + white ink
- **Outlined** — `#07369E` border + ink · hover flips to `#07369E` bg + white ink
- **Tonal** — `#DBF6ED` bg, `#081748` ink · hover flips to `#10C186` bg + white ink
- **Text** — `#10C186` ink, no bg · hover adds soft green tint
- **Disabled** — `opacity 0.6`, `cursor: not-allowed`

See `index.html` for live specimens including forms, switches, avatars, badges, the full Material-style icon set, the three Who-is-calling card variants, and the generic **Section card** primitive (light + inverse, linked + static).

### Section card

Generic content-card primitive used for download cards, testimonials, feature highlights, and similar grid content.

- Slots (all optional, fixed order): `label` · `icon + title + subTitle` · `body` · `cta`
- Variants: light (default) · inverse (over dark surfaces)
- Linked vs static: when a `cta` href is present, render as `<a>` with a hover state; otherwise render as `<div>`
- Specs: radius 16 · padding 24 · gap 16 · icon slot 40×40 (radius 12 tile, 50% for avatars) · cta has `::after` arrow + underline

---

## Icons

The icon set lives in `icons/`. Each icon is a standalone 24×24 SVG with
`fill="currentColor"`, so consumers control the color via CSS (`color`) or
inline `style`.

### Layout

| Path | Purpose |
|---|---|
| `icons/*.svg` | The icon set — semantically named, ready to use. **Only these count as part of the design system.** |
| `icons/extracted/*.svg` | Staging area for unadopted icons (raw Figma output, grid-position names). Rename and move up to `icons/` to promote. |

### Naming

The filename **is** the icon name. There is no manifest / index file —
`icons/account.svg` is consumed as `<Icon name="account" />`. The filesystem
is the registry.

### Promoting an icon

1. Open the file in `icons/extracted/`
2. Rename it to a semantic name (e.g., `account.svg`, `arrow_forward.svg`)
3. Move it up one level to `icons/`

Anything left in `icons/extracted/` is unadopted and not considered part of
the design system.

---


## Updating

This system was extracted from `Calmido Website en wiebeltme.nl.fig`, page `CSS styles` (node `1:2369`). When the Figma file changes, update tokens in `index.html` inside the `:root { … }` block — everything cascades from there.

---

## License

Internal use — Calmido / wiebeltme.nl.
