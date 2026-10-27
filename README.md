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
[`App/store-listing/`](https://github.com/Calmido/knowledge-base/tree/main/App/store-listing).

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

> **Native:** `build-tokens.mjs` also emits Kotlin and Swift
> (`CalmidoColors` / `CalmidoFontInk` / `CalmidoSpacing` / `CalmidoRadius`,
> plus `CalmidoThemeColors` with a light and a dark instance) straight into
> `calmido-phone-android/.../ui/theme/generated/CalmidoTokens.kt` and
> `calmido-phone-ios/.../UI/Theme/generated/CalmidoTokens.swift` when those
> checkouts sit alongside this repo (skipped on CI). Token names match the
> DS (`brightGreen`, `darkGreen`, `blue`, `midGrey`…).

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

**Logo on a background you don't control (email).** Use `logo/calmido_email_logo.png`: the wordmark on a white rounded tile (200 × 56, radius 12, padding 0 × 14), baked into the PNG at 2× (400 × 112). A transparent Logo Blue wordmark disappears on a dark card, and mail clients (Gmail, Outlook) recolour backgrounds in dark mode but never images, so a CSS or `prefers-color-scheme` swap is not reliable. Send it inline (`cid:`), not as a remote URL: clients block or proxy remote images. Shown at `width="200" height="56"`, `alt="Calmido"`.

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
| Content Dark Grey | `#6F797A` — borders and outlines only (4.48:1 on white: not for text) |
| Grey Ink | `#5F6869` — muted text and placeholders on light (5.72:1 on white, 5.53:1 on `#FBFBFB`, 4.14:1 on Light Grey: not on `surface-muted`) |
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
| `--c-surface-raised` | White | `#040B20` (iOS card navy) |
| `--c-surface-muted` | Light Grey `#DADBE0` | `#1A2340` |
| `--c-border` | Light Grey | `#55565B` |
| `--c-border-strong` | Dark Grey `#6F797A` | Dark Grey |
| `--c-outline` | Calmido Blue | `#BEC8C9` (iOS outlined button) |
| `--c-font-title` / `-body` / `-muted` | Blue / Dark Blue / Grey Ink `#5F6869` | White / White / `#B8B8BA` (as iOS) |
| `--c-placeholder` | Grey Ink `#5F6869` | `#8E9094` |
| `--c-edge-shadow` | Light Grey `#DADBE0` | `#131417` (black 40% over BG Dark) |
| `--c-ink-link` | Blue `#07369E` | White (underlined) |
| `--c-ink-green` | Green Ink `#0A7A55` | Bright Green `#40EDAB` |
| `--c-ink-danger` | `#D0103A` | Alert Red `#FD5240` (as iOS) |
| `--c-ink-warning` | `#8A5300` | `#F5A623` |
| `--c-focus-ring` / `--c-focus-halo` | Dark Blue / White | Bright Green / Dark Blue |

Fills stay the same in both themes: bright-green button, threat gradient,
caller-card gradients. `tokens.css` applies the dark values under
`@media (prefers-color-scheme: dark) { :root:not([data-theme="light"]) }`
and `[data-theme="dark"]`; `data-theme="light|dark"` on any element pins
a theme, so a manual toggle wins either way. A surface that has not moved
to roles yet pins `data-theme="light"` on `<html>`, because the
`--c-font-*` inks already flip. Natively the roles are
`CalmidoThemeColors`: Kotlin `CalmidoThemeLight` / `CalmidoThemeDark`,
Swift `CalmidoThemeColors.light` / `.dark`; the app picks one from the
system setting.

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
- **Muted text and placeholders.** Light uses `grey-ink` `#5F6869` (`font-muted`, `placeholder`), never `dark-grey` `#6F797A` (4.48:1 on white, 4.33:1 on `#FBFBFB`): that is for borders and outlines. `grey-ink` is not for text on `surface-muted` (4.14:1). Dark: `font-muted` `#B8B8BA` (8.1:1 on `#202128`), `placeholder` `#8E9094` (5.0:1 on `#202128`, 4.8:1 on `#1A2340`, 6.1:1 on `#040B20`). A surface takes the `placeholder` role; it does not hard-code a grey.
- **Dark pairs.** `ink-danger` `#FD5240` is 4.93:1 on `#202128` and 4.75:1 on `#1A2340` (`surface-muted`). `border` `#55565B` is 2.19:1 on `#202128`: decorative only (dividers, card edges), never the only sign of an input, control or state. Controls use `border-strong` (3.6:1 in dark).
- **Reduced motion.** Honour the system setting (`prefers-reduced-motion`, iOS Reduce Motion, Android animator duration scale 0). Nothing animates forever (WCAG 2.2.2): decorative motion plays once or for at most 5 s, then stops; a spinner may loop only while work is in progress and slows or becomes static under reduced motion. No wiggle, shake or pulse on buttons, cards or errors.
- **Forced colors.** Under `forced-colors: active` (Windows high contrast) or Increase Contrast, nothing may rely on a background or gradient fill to be seen: the threat meter keeps a 1px border on the track and a system-colour marker (`CanvasText`) for the arrow and band; mask icons use `background-color: CanvasText` (or `currentColor`); focus is a real `outline`, not a `box-shadow`; filled states (selected, checked, pressed) get a border or an icon, not only a fill.
- **Toasts.** Visible for at least 6 s, longer with more text (about 1 s per 3 words after the first 6 s). With a screen reader on (TalkBack, VoiceOver, or an `aria-live` region in use) they do not auto-dismiss; they stay until closed, announced politely. A toast never carries the only way to an action.
- **No colour-only status.** Every status (error, warning, success, verdict, selected, online) has an icon or a word as well as a colour. Form errors say what is wrong in text, next to the field.
- **Cards grow.** Text in cards, rows and chips wraps and the card grows; no truncation or fixed heights for meaningful text (names, numbers, verdicts, warnings). Must hold at iOS Dynamic Type XXL, Android font scale 200% and 200% browser zoom (WCAG 1.4.4, 1.4.10). Only decorative secondary text may use `…`, with the full text in the accessible name.

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
- **Outlined** — border `--c-outline` (Calmido Blue · dark `#BEC8C9`), ink `--c-font-title` (Calmido Blue · dark white) · pressed fills with `--c-outline`, ink `--c-surface-raised`
- **Tonal** — `#DBF6ED` bg, `#081748` ink · hover flips to `#10C186` bg, ink stays `#081748` in hover and pressed, on every surface (7.3:1; white on `#10C186` is 2.33:1)
- **Text** — `--c-ink-green` (Green Ink · dark Bright Green), no bg · pressed adds a 12% green tint
- **Round icon buttons** — fixed icon size, never a share of the circle: **S** 36 circle / 20 icon (top bar, inline) · **M** 50 / 24 (bottom bar, call actions) · **L** 56 / 24 (dialpad). Outlined: 1px border `--c-font-body` at 70%, icon `--c-font-body`. Filled: Bright Green / Dark Blue icon in both themes. Touch target ≥ 44 iOS / 48 Android.
- **Disabled** — `opacity 0.6`, `cursor: not-allowed`

See `index.html` for live specimens including forms, switches, avatars, badges, the full Material-style icon set, the three Who-is-calling card variants, the cross-platform **Threat meter**, and the generic **Section card** primitive (light + inverse, linked + static).

### Threat meter

Horizontal community-threat gauge (`threat-bar`) shared by web, iOS, and Android. Safe on the left (green), dangerous on the right (red), so the raw values map to a left-origin percentage. Fed entirely by the backend threat interval on `community.threat` (see `domain-service/docs/rank-algorithm.md`) — no client-side heuristics, so every channel shows the same verdict.

- **Input:** `community.threat = { mean, lower, upper, band }`. `mean/lower/upper ∈ [0, 1]` on a danger axis (0 = safe, 1 = dangerous); `band` is the ordinal `0 Unknown · 1 Low · 2 Elevated · 3 High`. Absent object → render nothing (never infer "safe" from missing data).
- **Marks:** gradient track (danger axis) · confidence band spanning `[lower, upper]`, tinted by level · downward arrow at `mean` (clamped to `[2%, 98%]`).
- **Track gradient:** `--c-dark-green` 0% → `#9ACD32` 30% → `#F5A623` 58% → `--c-stop-red` 100%.
- **Level colour** (band + arrow): Low `--c-dark-green` · Elevated `#F5A623` · High `--c-stop-red` · Unknown `--c-mid-grey`.
- **Verdict chip:** every surface shows the verdict as icon + word next to the meter — Safe (check, green ink) · Suspicious (attention, elevated ink) · Dangerous (danger, dangerous ink) · Unrated (question mark, neutral). Every band has a chip, including Low and Unknown; never colour or position alone. Chip = pill 28 tall, padding 0 × 10, gap 6, 14px icon next to 14px semibold text. Fill, light: the verdict colour as a tint (Safe #10C186 14%, Suspicious #F5A623 16%, Dangerous #FF3260 12%), ink 4.5–5.7:1 on it; never `surface-muted` in light (green and red drop to 3.9–4.0:1). Fill, dark: `surface-muted` #1A2340 with the dark inks (4.75–10.3:1). **Unrated** (band 0, no score or interval too thin): fill `light-grey`, ink `body-ink` `#3A4268`, `question_mark` icon, the word "Unrated" (nl: "Niet beoordeeld"); neutral grey, never green or red, and it implies neither safe nor unsafe. The meter marks the missing score with a grey band and a centred pointer, not a position on the scale.
- **Band fallback** (if server `band` absent): derive from the *lower* bound — `≥ 0.72 → High`, `≥ 0.45 → Elevated`, else Low; null interval → Unknown. Gating on the lower bound means a lone unconfirmed complaint self-suppresses until corroborated.

### List rows

Recents, Reports, Contacts and the dialpad result. Same on Android and iOS (`calmido-phone-android/docs/avatars.md`).

- **One row for Recents and Reports:** the 40 avatar · the name (semibold) over the date and time (small, secondary) · the chip, icon + word. Only the chip's place and the right side differ: Recents puts one compact chip after the name and the call button on the right; Reports puts the full-size chip(s) on the right, with no call button.

- **Avatar badge: a member's only, never a verdict.** Locked (red lock) › Shielded (dark lock) › verified member seal (Bright Green). Blocked, Dangerous or Warning: no badge, not even the seal; the chip says it.
- **Recents rows: the first is the caller, the second the call.**
- **Recents, first row (the caller):** the name · then **one compact chip** (Blocked › Suspicious / Dangerous › Safe › Confirmed), when there is one. Safe is the user's own Safe report, Confirmed a business card they confirmed. The chip is about the number or the person, never about this call. The name takes **up to two lines**, so a long name next to a long chip ("Suspicious", "Geblokkeerd") wraps instead of being cut. The chip stays beside the name's first line (top-aligned), in the same place on every row. Only past two lines does the name shorten (…); the chip is never cut.
- **Recents, second row (the call):** call-direction icon · date and time · the **lock** when the call was verified · the region. The region always shows; it is the first to shorten. The outcome is shown by the direction icon and the lock: a green icon and the lock when verified, the danger ink and no lock otherwise, the block icon when declined. Never the outcome in words. Screen readers hear it on the direction icon ("Incoming, timed out").
- **Recents, third row:** shows the number, `+31 20 123 4567`. Only expanded, and only for a contact, a business or a member: an unknown caller's first row already is the number, so it has no third row. The region is on the second row, so it isn't repeated here.
- **Recents, question row** (Report this call / Confirm the name): at most one per number, always on that number's **newest** row, whichever of its calls asks it. Calling someone back doesn't push the question down to an older row.
- **Compact chip:** the verdict chip at 20 tall, padding 0 × 8, gap 4, 12px icon; the word stays 14px semibold (the floor for a verdict). Icon + word, same fills and inks. **Blocked** (`block`) uses the Dangerous fill and ink.
- **Reports:** the verdict or Confirmed chip at full size, and a **Blocked** chip next to it for a blocked number.

### Switch

Same on web, iOS and Android, in light and dark.

- Track 52 × 32, pill. Thumb 24, white, 4 inset, same size on and off.
- On: Bright Green track (#40EDAB). Off: track in `--c-border` (#DADBE0 light, #55565B dark).
- Disabled: the whole row at 60% opacity.
- Settings row: label Open Sans 15 / 20 in `font-body`, optional subtitle 12 / 16 in `font-muted`. Padding 12 × 16, min height 48, switch trailing. The whole row toggles.
- iOS uses the system switch tinted Bright Green. Android uses the Material 3 `Switch` with these colours and no outline.

### App controls

The look is shared; where a control sits on a screen is up to each app.

| Control | Light | Dark |
|---|---|---|
| Search field fill | `surface-raised` White | `surface-raised` #040B20 |
| Search field border | `border-strong` #6F797A, 1 px | same |
| Search field, focused | `ink-green` Green Ink #0A7A55, 1.5 px | `ink-green` Bright Green #40EDAB, 1.5 px |
| Search text / icon + placeholder | `font-body` / `font-muted` | same roles |
| Dialpad button fill / icon | Bright Green #40EDAB / Dark Blue #081748 | same |
| Dialpad button, pressed | Calmido Blue #07369E / White | same |

Search field: 44 high, pill, `search` icon 20, Open Sans 15. Dialpad button: 56 circle, `dialpad` icon 24, shadow black 30% blur 6 y 3 (Android elevation 6).

**List section header** — one style for letters (Contacts) and words (Recents: Today, Yesterday, Older). Plain text, no circle or fill: Open Sans 14 / 20 semibold in `font-muted` (#5F6869 light · #B8B8BA dark), transparent background, sentence case, padding 8 top · 4 bottom · 16 sides. Hidden while a search query is typed. **Recents pins it** at the top while its day scrolls, still transparent: the rows pass under it, as in an iOS plain list. Contacts lets it scroll with the rows. **Android:** bold, as on iOS; Recents and Contacts both pin it, with the page background (`surface`) at 90% behind it only while a row passes under it, transparent at rest. Alignment is up to each app.

**Scroll edges** — the top and bottom bars have no fill of their own; two treatments separate them from the content scrolling beneath. **Edge band:** 6 tall at the top and bottom of the scroll area, `edge-shadow` (#DADBE0 · #131417) fading to transparent away from the bar; always drawn, in light and dark. **More below:** 48 tall at the bottom, `surface` (#FBFBFB · #202128) fading in from transparent, shown only while there is more content below (fade in and out over 200 ms); it sits under the edge band. Screens without a bottom bar get only the top band.

**Notice banner** — for a setting outside the app that stops Calmido from protecting the user (iOS: Live Caller ID or Call Directory off; Android: Do Not Disturb on). iOS `CallDirectoryBanner` is the reference. Full width, min height 48, padding 12 × 16, gap 12; fill `surface-raised` (white · #040B20) with a 1 px bottom line in Bright Green at 40%, no side borders or radius. `attention` icon 22 in `ink-green`; title Open Sans 14 / 20 semibold `font-body`, body 14 / 20 `font-muted` (14 is the floor for instructions; iOS has 12 today), 2 apart, both wrapping; trailing `chevron_right` 14 in `font-muted`. The whole banner is one button to the right settings page. It stays until the setting changes and has no close button. Placement is up to each app.

**Loading indicator** — spinner 24, 3 stroke, a 270° arc in `ink-green` (Green Ink #0A7A55 light · Bright Green #40EDAB dark), no track, one turn a second; never a fixed Dark Blue. Pull to refresh puts it on a 40 disc: `surface-raised` fill (white · #040B20), 1 px `border` (#DADBE0 · #55565B), shadow black 30% blur 3 y 1 (Android elevation 3). Inside a button: 16 spinner, 2 stroke, in the button's ink. Android: `PullToRefreshDefaults.Indicator` / `CircularProgressIndicator` with these colours; iOS: `UIRefreshControl.appearance().tintColor` and `ProgressView().tint` = `ink-green`.

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

One icon is drawn as a stroke rather than a fill: `message.svg`, Android's `icon_message` (a
1.5 pt outline on a 16 × 16 grid, scaled to 24 × 24). It uses `stroke="currentColor"`, so it
takes its colour the same way.

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
