# Tokens & text styles

Hand-edited CSS lives next to this file:

- **`globals.css`** — design tokens in [`src/styles/globals.css`](../src/styles/globals.css): primitives and semantics on `:root`, then `@theme`, **`@utility type-*`** (typography composites reference primitives only; no duplicate `--body` / `--display` variables), then base layers.

## Palette (`:root`)

| Variable        | Role                          |
|----------------|-------------------------------|
| `--g0` (canvas `#f7f7f7`), `--g1` (`#e7e7e7`), `--g2` … `--g10`, `--white`, `--placeholder` | Raw fills; semantic tokens reference these |

## Space (`:root`)

| Variable    | Role |
|------------|------|
| `--space-{n}` | Pixel steps (`2` … `72`) |
| `--space-s`, `--space-m`, `--space-lg`, `--space-xl`, `--space-intro-credentials` | Named rhythm |

### Below `md` (`max-width: 48rem`, Tailwind `max-md`)

[`globals.css`](../src/styles/globals.css) redefines these on `:root` under that single `@media` (literal `48rem`; no `var()` in the query — see [tailwind-guide.md](./tailwind-guide.md)):

| Token | From `md` up (default) | Below `md` |
|-------|-------------------------|------------|
| `--space-s` | `12px` (`--space-12`) | `8px` (`--space-8`) |
| `--space-m` | `24px` (`--space-24`) | `20px` (`--space-20`) |
| `--space-lg` | `48px` (`--space-48`) | `32px` (`--space-32`) |
| `--hero-visual-max-width` | `360px` | `240px` |

`--space-xl` and other tokens are unchanged by that block.

## Type scale (`:root`)

| Variable | Role |
|----------|------|
| `--font-xs` … `--font-3xl` | Rem sizes |
| `--regular`, `--semibold`, `--bold` | Weights |
| `--lead-note`, `--lead-base` | Line heights (body vs tight display) |
| `--tracking-*` | Letter-spacing presets for text styles that need non-zero tracking |

## Semantics (`:root`)

| Variable | Role |
|----------|------|
| `--bg-default` | Page / canvas background (`--g0`) |
| `--default`, `--secondary`, `--subtle` | Body ink hierarchy |
| `--border-default`, `--border-dark-mode` | Strokes |
| `--border-width-default` (`1px`), `--border-width-sm` (`0.5px`) | Hairline vs default rule |
| `--fill-placeholder` | Image / card placeholder surface |

Hero borders use `--hero-border-width` (`var(--border-width-sm)`) in `Hero.tsx` and `HeroRiveDog.tsx`.

## Typography roles (`type-*` utilities)

Composites are defined only in `@utility` (they use `--font-*`, `--lead-*`, primitive `--tracking-*` or `0`, and stacks).

| Class | Use |
|-------|-----|
| `type-body`, `type-body-sm` | Body copy (`<body>` matches `type-body` via `@layer base`) |
| `type-display`, `type-section-h2` | Serif headings |
| `type-nav-link` | Nav labels |
| `type-card-title`, `type-card-subtitle` | Home cards |
| `type-page-heading`, `type-link-back` | Placeholder routes |

Colors and font families: `globals.css` `@theme inline` (e.g. `bg-canvas`, `text-default` / `text-secondary` / `text-subtle`, `border-line`).
