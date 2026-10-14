# Calmido Design System

The source of truth for Calmido — colors, typography, components, and signature widgets.

**Names.** *Calmido* is the company and the brand. *Calmido Phone* is the app
(iOS and Android). *wiebeltme.nl* / *wiebelt.me* are campaign domains, not a
separate brand: the Calmido website serves them with a campaign theme
(noindex), and their footer reads "een service van Calmido". They use this
design system because they are the Calmido website.

**Live site:** https://calmido.github.io/design-system/

---

## What's in here

| File | Purpose |
|---|---|
| [`index.html`](./index.html) | The full browsable design system (open in any browser) |
| [`tokens.json`](./tokens.json) | **Source of truth** for every design token (colors, type, spacing, radii) |
| [`tokens.css`](./tokens.css) | Generated CSS custom properties — consumed by `index.html` and downstream surfaces |
| `scripts/build-tokens.mjs` | Generator: reads `tokens.json` → writes `tokens.css` |
| `Calmido-DesignSystem.html` | Redirect stub for the legacy deep-link URL |
| `assets/` | SVG assets referenced by the system |
| `icons/` | Icon set — 24×24 SVGs with `currentColor` fill, grouped into subfolders by domain (see [Icons](#icons)) |

App Store and Google Play listing copy lives in the knowledge base, in
[`Organization/store-listing/`](https://github.com/Calmido/knowledge-base/tree/main/Organization/store-listing).

Open `index.html` locally or visit the Pages URL above. GitHub Pages is
configured (legacy mode, `main` / root) to auto-deploy on every push.

### Token pipeline

`tokens.json` is the **only** place token values are authored.
`tokens.css` is a generated artifact, committed so GitHub Pages can serve
it without running a build, but it must not be edited by hand. After
changing `tokens.json`, regenerate:

```sh
npm run build:tokens
```

The build is zero-dependency (Node ≥ 18, no `npm install` needed). Refs
of the form `{group.name}` in `tokens.json` resolve to `var(--c-name)` in
the output (e.g. `--c-font-title: var(--c-blue)`).

CI runs `npm run build:tokens` on every push / PR and fails if the
committed `tokens.css` doesn't match what the generator produces — so the
artifact can't silently drift from `tokens.json`. See
[`.github/workflows/ci.yml`](./.github/workflows/ci.yml).

> **Phase 2 (Android done):** `build-tokens.mjs` also emits Kotlin
> (`CalmidoColors` / `CalmidoFontInk` / `CalmidoSpacing` / `CalmidoRadius`)
> straight into the Android tree at
> `calmido-phone-android/app/src/main/java/com/calmido/app/ui/theme/generated/CalmidoTokens.kt`
> when that checkout sits alongside this repo (skipped on CI). The Android
> app consumes these instead of hand-copying — token names match the DS
> (`brightGreen`, `darkGreen`, `blue`, `brightBlue`, `darkBlue`, `midGrey`…).
> Swift (`CalmidoColors.swift`) is still pending. See issue #2.

---

## Tokens at a glance

### Brand colors

| Token | Hex | Usage |
|---|---|---|
| Logo Blue | `#05028E` | Canonical brand blue — logo art only (wordmark, C-mark on green, phone surface) |
| Calmido Blue | `#07369E` | Headlines, primary ink on light |
| Bright Blue | `#2050FF` | Action accent, links |
| Dark Blue | `#081748` | Dark surfaces, deep ink |
| Dark Green | `#10C186` | Fills only — primary action, toggle state. Never text (2.33:1) |
| Green Ink | `#0A7A55` | Green text, icons, links on light (5.35:1) |
| Bright Green | `#40EDAB` | Filled button, hero highlight |
| Tonal Green | `#DBF6ED` | Tonal button fill |
| Body Ink | `#3A4268` | Body prose on light |

> **Logo Blue is the single canonical value for all rendered logo art.**
> Prior to 2026-06-17 the four logo SVGs disagreed (`#05028E` wordmark,
> `#09298E` C-mark on green, `#0B2986` phone surface) and downstream
> surfaces picked different blues each (website `theme-color`,
> Android app-icon ground, email OTP frame). The reconciliation pins
> `#05028E` everywhere. Re-export `logo/calmido_*.png` rasters from the
> updated SVGs and align downstream surfaces — see issue #1.

### Status

| Token | Hex | Usage |
|---|---|---|
| Stop Red | `#FF3260` | Scam / block |
| Alert Red | `#FD5240` | Warning chips |
| Dark Red | `#690005` | Error text |
| Threat Dangerous Ink | `#D0103A` | "Gevaarlijk" text + icons, error messages (5.5:1) |
| Threat Elevated Ink | `#8A5300` | "Verdacht" text + icons (6.3:1) |

### Threat scale

Named for the band, not the hue; fills only (meter, badges, arcs).

| Token | Value |
|---|---|
| `threat-safe` | Dark Green `#10C186` |
| `threat-caution` | `#9ACD32` |
| `threat-elevated` | `#F5A623` |
| `threat-dangerous` | Stop Red `#FF3260` |
| `threat-unrated` | Mid Grey `#C1C3EB` |

Caller-card gradients: `caller-warning-start/end` `#B45309` → `#DF1803`, `caller-alert-start/end` `#D0103A` → `#C91300`.

### Neutrals

| Token | Hex |
|---|---|
| White | `#FFFFFF` |
| Light Theme BG | `#FBFBFB` — page background (`--c-surface` in light) |
| Canvas | `#F7F7F8` — neutral fill behind placeholders (map facade) |
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
| Calm_Display_XL | Geologica 700 | 57 / 64 |
| Calm_Display_M | Geologica 700 | 45 / 52 |
| Calm_Display_S | Geologica 300 | 45 / 52 |
| Calm_Headline_L | Geologica 700 | 32 / 36 |
| Calm_Headline_M | Geologica 700 | 28 / 36 |
| Calm_Headline_S | Geologica 700 | 24 / 32 |
| Calm_Title_L | Geologica 300 | 22 / 28 |
| Calm_Title_M | Geologica 700 | 16 / 24 |
| Calm_Title_S | Open Sans 700 | 14 / 20 |
| Calm_Body_L | Open Sans 400 | 16 / 24 |
| Calm_Body_M | Open Sans 400 | 14 / 20 |
| Calm_Body_S | Open Sans 400 | 12 / 16 |
| Calm_Label_S | Open Sans 400 | 12 / 16 · 0.08em tracked |

### Themes: light & dark

Every surface supports both themes and follows the system setting. Theme
**role** tokens carry a light `value` and a `dark` value in `tokens.json`;
palette tokens never change with the theme. Components use roles, not
palette names:

| Role | Light | Dark |
|---|---|---|
| `--c-surface` | Light BG `#FBFBFB` | BG Dark `#202128` |
| `--c-surface-raised` | White | Infocard Dark `#16171C` |
| `--c-surface-muted` | Light Grey `#DADBE0` | `#2E2F38` |
| `--c-border` | Light Grey | `#3A3B45` |
| `--c-border-strong` | Dark Grey `#6F797A` | `#80838C` |
| `--c-font-title` / `-body` / `-muted` | Blue / Dark Blue / Dark Grey | their `-inverse` pairs (white, 75%, 60%) |
| `--c-ink-link` | Blue `#07369E` | `#7DA2FF` |
| `--c-ink-green` | Green Ink `#0A7A55` | Bright Green `#40EDAB` |
| `--c-ink-danger` | `#D0103A` | `#FF6B87` |
| `--c-ink-warning` | `#8A5300` | `#F5A623` |
| `--c-focus-ring` / `--c-focus-halo` | Dark Blue / White | White / Dark Blue |

Fills stay the same in both themes: bright-green button, threat gradient,
caller-card gradients. `tokens.css` applies the dark values under
`@media (prefers-color-scheme: dark) { :root:not([data-theme="light"]) }`
and `[data-theme="dark"]`; `data-theme="light|dark"` on any element pins
a theme, so a manual toggle wins either way. A surface that has not moved
to roles yet pins `data-theme="light"` on `<html>`, because the
`--c-font-*` inks already flip. Native emitters (Kotlin/Swift) emit light
values only for now.

---

## Accessibility

Rules every surface follows. Calmido's audience includes older people,
low vision, colour blindness, ADHD, anxiety and motor impairments.

- **Fill vs ink.** Bright hues (`dark-green`, `threat-elevated`, `threat-dangerous`) are fills only. Text and icons on light use the ink: `green-ink`, `threat-elevated-ink`, `threat-dangerous-ink`, all ≥ 4.5:1 on white.
- **Caller-card gradients** carry white ink at ≥ 4.5:1 along the whole gradient: `caller-warning-start/end`, `caller-alert-start/end`.
- **Verdict = icon + word.** A threat verdict is never only a colour or a position; show the verdict chip, visibly, not only to screen readers.
- **Focus ring.** Two-tone on `:focus-visible`: 2px `dark-blue` outline, offset 2px, over a 2px white halo. A border colour is not a focus indicator; never `outline: none` on an input (put the ring on the pill shell instead).
- **Type floor.** 12px minimum; 14px for meaningful text (verdicts, warnings, instructions); 16px in inputs.
- **Touch targets.** 44px on the web, 44pt on iOS, 48dp on Android.

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

Styles reference (all pill 100px radius, 44px tall):

- **Filled** — `#40EDAB` bg, `#081748` ink · hover flips to `#07369E` bg + white ink
- **Outlined** — `#07369E` border + ink · hover flips to `#07369E` bg + white ink
- **Tonal** — `#DBF6ED` bg, `#081748` ink · hover flips to `#10C186` bg + white ink
- **Text** — Green Ink `#0A7A55`, no bg · hover adds soft green tint
- **Disabled** — `opacity 0.6`, `cursor: not-allowed`

See `index.html` for live specimens including forms, switches, avatars, badges, the full Material-style icon set, the three Who-is-calling card variants, the cross-platform **Threat meter**, and the generic **Section card** primitive (light + inverse, linked + static).

### Threat meter

Horizontal community-threat gauge (`threat-bar`) shared by web, iOS, and Android. Safe on the left (green), dangerous on the right (red), so the raw values map to a left-origin percentage. Fed entirely by the backend threat interval on `community.threat` (see `domain-service/docs/rank-algorithm.md`) — no client-side heuristics, so every channel shows the same verdict.

- **Input:** `community.threat = { mean, lower, upper, band }`. `mean/lower/upper ∈ [0, 1]` on a danger axis (0 = safe, 1 = dangerous); `band` is the ordinal `0 Unknown · 1 Low · 2 Elevated · 3 High`. Absent object → render nothing (never infer "safe" from missing data).
- **Marks:** gradient track (danger axis) · confidence band spanning `[lower, upper]`, tinted by level · downward arrow at `mean` (clamped to `[2%, 98%]`).
- **Track gradient:** `--c-dark-green` 0% → `#9ACD32` 30% → `#F5A623` 58% → `--c-stop-red` 100%.
- **Level colour** (band + arrow): Low `--c-dark-green` · Elevated `#F5A623` · High `--c-stop-red` · Unknown `--c-mid-grey`.
- **Verdict chip:** every surface shows the verdict as icon + word next to the meter — Safe (check, green ink) · Suspicious (attention, elevated ink) · Dangerous (danger, dangerous ink) · Unrated (word only). Never colour or position alone.
- **Band fallback** (if server `band` absent): derive from the *lower* bound — `≥ 0.72 → High`, `≥ 0.45 → Elevated`, else Low; null interval → Unknown. Gating on the lower bound means a lone unconfirmed complaint self-suppresses until corroborated.

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

Each icon is a standalone 24×24 SVG with `fill="currentColor"`. Top-level
icons sit directly in `icons/` (e.g. `icons/call.svg`); related sets are
grouped under a subfolder (e.g. `icons/report_categories/category_phishing.svg`).

### Naming

The filename **is** the icon name. There is no manifest / index file —
`icons/call.svg` is consumed as `<Icon name="call" />`, and
`icons/report_categories/category_phishing.svg` as
`<Icon group="report_categories" name="category_phishing" />`. The
filesystem is the registry.

---

## Images

User-supplied imagery uploaded by members. Every channel (web / Android / iOS) center-crops and re-encodes locally before upload so the server normalizer never has to resize a well-behaved payload.

### Avatar

| Setting | Value |
|---|---|
| Output dimensions | 512 × 512 (square) |
| Aspect | center-crop to square before encode |
| Upload format | `image/jpeg`, quality `0.85` |
| Server allowlist | PNG + JPEG recommended · GIF, BMP, TIFF, WBMP also accepted (legacy) |
| Server max dimension | 1024 px each side (downscaled bilinear, same format) |
| Server max payload | 2 MiB (typical 512² JPEG: 30–80 KB) |

Implementations:

- **Web** — `calmido-website/app/[locale]/(main)/settings/CropModal.js`
- **Android** — `calmido-phone-android/.../ui/util/AvatarUtils.kt` (`centerCropSquare` + `resize` + JPEG @ 85)
- **iOS** — `calmido-phone-ios/.../UI/Calmido/MemberEditScreen.swift` (`squareScaled` + `jpegData(0.85)`)
- **Server** — `domain-service/directory-service/.../converters/AvatarNormalizer.scala`

> Hero / background image upload spec — to be added when the feature is re-enabled.

---


## Updating

This system was extracted from `Calmido Website en wiebeltme.nl.fig`, page `CSS styles` (node `1:2369`). When the Figma file changes, update `tokens.json` and run `npm run build:tokens` — everything cascades from there.

---

## License

Internal use — Calmido.
