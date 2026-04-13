# Tokens & text styles

Hand-edited CSS lives next to this file:

- **`design-tokens.css`** — palette, space, type scale, semantic fills/ink/borders, layout, motion, component-specific sizes.
- **`text-styles.css`** — preset `--text-*-font` and `--text-*-letter-spacing` pairs for arbitrary Tailwind props.

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
| `--letter-spacing-none`, `--tracking-*` | Tracking |

## Semantics (`:root`)

| Variable | Role |
|----------|------|
| `--fill-bg-default` | Page / canvas background |
| `--text-default`, `--text-secondary`, `--text-subtle` | Body ink hierarchy |
| `--border-default`, `--border-dark-mode` | Strokes |
| `--fill-placeholder` | Image / card placeholder surface |

## Text presets (`text-styles.css`)

| Variable prefix | Use |
|-----------------|-----|
| `--text-body-*` | Default body |
| `--text-display-title-*`, `--text-section-title-*` | Serif headings |
| `--text-nav-link-*` | Nav labels |
| `--text-intro-meta-*`, `--text-card-title-*`, `--text-card-subtitle-*` | Home blocks |
| `--text-page-heading-*`, `--text-link-back-*` | Placeholder routes |

Tailwind bridges these in `globals.css` `@theme inline` (`--color-canvas` → `--fill-bg-default`, etc.).
