# Tokens & text styles

Hand-edited CSS lives next to this file:

- **`globals.css`** — design tokens in [`src/styles/globals.css`](../src/styles/globals.css): primitives and semantics on `:root`, then `@theme`, **`@utility type-*`** (typography composites reference primitives only; no duplicate `--body` / `--display` variables), then base layers.

## Palette (`:root`)

| Variable        | Role                          |
|----------------|-------------------------------|
| `--g1` … `--g10`, `--white`, `--placeholder` | Raw fills; semantic tokens reference these |

## Space (`:root`)

| Variable    | Role |
|------------|------|
| `--space-{n}` | Pixel steps (`2` … `72`) |
| `--space-s`, `--space-m`, `--space-lg`, `--space-xl`, `--space-intro-credentials` | Named rhythm |

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
| `--bg-default` | Page / canvas background |
| `--default`, `--secondary`, `--subtle` | Body ink hierarchy |
| `--border-default`, `--border-dark-mode` | Strokes |
| `--fill-placeholder` | Image / card placeholder surface |

## Typography roles (`type-*` utilities)

Composites are defined only in `@utility` (they use `--font-*`, `--lead-*`, `--tracking-*`, stacks). Optional overrides: set e.g. `--display-tracking` on a scope to replace the default `var(--tracking-serif-display)`.

| Class | Use |
|-------|-----|
| `type-body`, `type-body-sm` | Body copy (`<body>` matches `type-body` via `@layer base`) |
| `type-display`, `type-section-h2` | Serif headings |
| `type-nav-link` | Nav labels |
| `type-card-title`, `type-card-subtitle` | Home cards |
| `type-page-heading`, `type-link-back` | Placeholder routes |

Colors and font families: `globals.css` `@theme inline` (e.g. `bg-canvas`, `text-default` / `text-secondary` / `text-subtle`, `border-line`).
