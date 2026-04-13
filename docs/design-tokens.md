# Tokens & text styles

Hand-edited CSS lives next to this file:

- **`design-tokens.css`** — palette, space, type scale, semantic fills/ink/borders, layout, motion, component-specific sizes.
- **`text-styles.css`** — preset `--body`, `--display`, `--section-h2`, etc.; optional `--*-tracking` only when ≠ 0 (use `var(--token, 0)` at call sites).

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

## Text presets (`text-styles.css`)

| Variables | Use |
|-----------|-----|
| `--body`, optional `--body-tracking`; `--body-sm`, optional `--body-sm-tracking` | Body copy (base and small) |
| `--display` + `--display-tracking`, `--section-h2` + `--section-h2-tracking` | Serif headings |
| `--nav-link`, optional `--nav-link-tracking` | Nav labels |
| `--card-title` + `--card-title-tracking`, `--card-subtitle` | Home cards |
| `--page-heading` + `--page-heading-tracking`, `--link-back` | Placeholder routes |

Tailwind bridges these in `globals.css` `@theme inline` (e.g. `bg-canvas` → `--bg-default`, `text-default` / `text-secondary` / `text-subtle` → `--default` / `--secondary` / `--subtle`, `border-line` → `--border-default`).
