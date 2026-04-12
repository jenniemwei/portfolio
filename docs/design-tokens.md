# Design tokens

Companion reference for [`design-tokens.json`](./design-tokens.json). The sync script writes **primitives** first (`--primitive-color-*`, `--primitive-space-*`, `--primitive-font-size-*`), then **semantic** aliases (`--color-background`, `--space-s`, etc.). Exact values always live in `primitives`; semantics reference them with `var(--primitive-…)`.

After editing the JSON, run `npm run sync:tokens` to regenerate `src/app/design-tokens.generated.css`.

---

## Primitives — color

Raw palette (Figma gray scale + white + placeholder). CSS: `--primitive-color-{key}` (e.g. `--primitive-color-g1`).

| Key | Typical use |
| --- | --- |
| `g1` … `g10`, `white`, `placeholder` | Surfaces, text, borders — map via semantic color tokens below |

---

## Primitives — spacing

Pixel scale for inset, gap, and offset. CSS: `--primitive-space-{key}` (keys are the pixel amount: `12`, `24`, `64`, …).

| Keys (px) | Sample |
| --- | --- |
| `2`, `4`, `8`, `12`, `16`, `20`, `24`, `32`, `40`, `41`, `48`, `56`, `64`, `72` | Semantic `space-*`, gutters, gaps, focus ring |

Layout widths (e.g. `1280px` content max) stay as literals on semantic tokens when they are not part of this step scale.

---

## Primitives — font size

Rem scale. CSS: `--primitive-font-size-{key}` (`xs`, `sm`, `m`, `lg`, `xl`, `2xl`, `3xl`).

| Key | Role |
| --- | --- |
| `xs` | Smallest UI text |
| `sm` | Small body / nav |
| `m` | Default body |
| `lg` | Subhead |
| `xl`, `2xl`, `3xl` | Display / section / hero |

---

## Color (semantic)

Semantic fills and strokes; values reference **primitive color** variables.

| Token | Role |
| --- | --- |
| `color-background` | Page / canvas background |
| `color-foreground` | Primary text |
| `color-muted-foreground` | Secondary / de-emphasized text |
| `color-border` | Dividers and card frames |
| `color-white` | Pure white surfaces |
| `color-placeholder` | Image / media placeholders |

---

## Typography — font family

Stack references Next.js font variables (`--font-manrope`, `--font-crimson`).

| Token | Role |
| --- | --- |
| `font-sans-stack` | Sans UI (Manrope) |
| `font-serif-stack` | Display / headings (Crimson Pro) |

---

## Typography — font size (semantic)

Each token points at a **primitive font size** (`var(--primitive-font-size-*)`). Change the primitive to retune the scale globally.

| Token | Primitive | Typical use |
| --- | --- | --- |
| `font-size-xs` | `xs` | Smallest UI |
| `font-size-sm` | `sm` | Nav, small body |
| `font-size-m` | `m` | Body, cards |
| `font-size-lg` | `lg` | Subhead |
| `font-size-xl` | `xl` | Section labels |
| `font-size-2xl` | `2xl` | Mid display |
| `font-size-3xl` | `3xl` | Hero serif |

---

## Typography — font weight

| Token | Role |
| --- | --- |
| `font-weight-regular` | Body, serif display |
| `font-weight-semibold` | Card titles |
| `font-weight-bold` | Nav links |

---

## Typography — letter spacing / tracking

| Token | Role |
| --- | --- |
| `letter-spacing-none` | Default (no extra tracking) |
| `tracking-serif-base` | Serif section headers |
| `tracking-serif-3xl` | Large serif hero / intro |
| `tracking-sans-bold` | Semibold sans (e.g. card headline) |

---

## Typography — line height

| Token | Role |
| --- | --- |
| `line-height-none` | Tight display (1) |
| `line-height-nav` | Nav line height |
| `line-height-note` | Multi-line notes / credentials (~1.3) |

---

## Spacing — scale (semantic)

Core steps; each maps to a **primitive space** (`var(--primitive-space-*)`).

| Token | Primitive (px) | Role |
| --- | --- | --- |
| `space-s` | `12` | Small inset / gaps |
| `space-m` | `24` | Medium padding / gaps |
| `space-lg` | `48` | Large section padding |
| `space-xl` | `72` | Extra-large section padding |

---

## Spacing — semantic

Pattern-specific tokens; most reference **primitive spacing** (see primitives table). `page-gutter` stays a fluid `clamp()` literal.

| Token | Role |
| --- | --- |
| `space-intro-credentials` | Vertical rhythm in intro column → `40` |
| `page-gutter` | Horizontal page inset (fluid clamp) |
| `intro-grid-gap` | Intro header grid gap → `12` |
| `gallery-row-gap` | Gallery row gap → `32` |
| `gallery-column-gap` | Gallery column gap → `24` |
| `nav-link-gap` | Nav item gap → `64` |
| `hero-grid-gap-x` | Hero grid horizontal gap → `20` |
| `spacer-inner-gap` | Spacer block inner gap → `41` |
| `footer-padding-x` | Footer horizontal padding → `32` |
| `footer-padding-bottom` | Footer bottom inset → `16` |
| `placeholder-page-padding-y` | Placeholder pages vertical padding → `64` |
| `home-page-padding-bottom` | Home main bottom padding → `48` |
| `focus-ring-width` / `focus-ring-offset` | Focus ring → `2` |
| `footer-decoration-size` | Footer decoration → `56` |

---

## Layout — widths

Max widths and shells (frame / grid width analog).

| Token | Role |
| --- | --- |
| `content-max` | Main content column (e.g. 1280px) |
| `shell-max-width` | Outer shell (e.g. nav alignment, 1440px) |
| `footer-max-width` | Footer strip max width |
| `placeholder-body-max-width` | Placeholder page text column |
| `secondary-intro-max-width` | Optional secondary intro measure |

---

## Layout — component dimensions

Heights, icon sizes, and fixed regions tied to specific frames.

| Token | Role |
| --- | --- |
| `nav-height` | Nav bar height |
| `nav-icon-size` | Logo / mark touch target |
| `hero-height` | Hero band height |
| `hero-visual-max-width` | Hero illustration max width |
| `hero-visual-aspect-ratio` | Hero visual aspect ratio |
| `card-visual-height` | Project card image area height |
| `spacer-section-height` | Full-width spacer block height |
| `footer-height` | Footer strip height |
| `footer-decoration-size` | Decorative element size in footer |

---

## Effects

Non-layout visuals (opacity, gradients).

| Token | Role |
| --- | --- |
| `footer-gradient-placeholder` | Footer background (placeholder until asset) |
| `image-hover-opacity` | Image hover state |
| `link-hover-opacity` | Link hover state |

---

## Focus

Keyboard focus ring (accessibility).

| Token | Role |
| --- | --- |
| `focus-ring-width` | Outline width |
| `focus-ring-color` | Outline color (often references foreground) |
| `focus-ring-offset` | Outline offset from element |

---

## Breakpoints

Use in CSS or Tailwind arbitrary variants (e.g. `max-[var(--breakpoint-gallery-stack)]`).

| Token | Role |
| --- | --- |
| `breakpoint-md` | General medium breakpoint |
| `breakpoint-gallery-stack` | Gallery stacks to single column |

---

## Elevation / stacking

| Token | Role |
| --- | --- |
| `z-index-nav` | Sticky nav stacking |
