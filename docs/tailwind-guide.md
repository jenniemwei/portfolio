# Tailwind breakpoints (defaults)

This project uses **Tailwind’s default breakpoints** only. Do not add custom `--breakpoint-*` tokens in the design-tokens section of `globals.css` for layout; use responsive prefixes in components instead.

Official reference: [Tailwind CSS — breakpoints](https://tailwindcss.com/docs/responsive-design) (v4 defaults match the table below unless you override `@theme`).

## Min-width (mobile-first)

Each prefix applies from that width **up** (`min-width`).

| Prefix | Theme variable | Default | Typical px (16px root) |
| --- | --- | --- | --- |
| _(none)_ | — | `0` | Base / small screens |
| `sm:` | `--breakpoint-sm` | `40rem` | 640px |
| `md:` | `--breakpoint-md` | `48rem` | 768px |
| `lg:` | `--breakpoint-lg` | `64rem` | 1024px |
| `xl:` | `--breakpoint-xl` | `80rem` | 1280px |
| `2xl:` | `--breakpoint-2xl` | `96rem` | 1536px |

Example: `md:col-span-4` → from 768px up, use four columns.

## Max-width variants

`max-sm:`, `max-md:`, `max-lg:`, `max-xl:`, `max-2xl:` apply **below** the matching breakpoint (Tailwind generates a `max-width` media query one step below the next tier).

Example: `max-lg:hidden` → hidden when viewport is **under** `lg` (under 64rem / 1024px with default theme).

## Plain CSS next to Tailwind

When a CSS Module cannot use Tailwind variants (e.g. shared `@media` for a grid), mirror the same boundary as the Tailwind class you would use:

- To match **`max-lg:`** (stack / single column below `lg`), use  
  `@media (max-width: 1023px)`  
  (1024px − 1px, i.e. just below Tailwind’s default `64rem` at a 16px root).

If you change Tailwind’s `--breakpoint-lg` in `@theme`, update any such raw media queries to stay in sync.

## `next/image` `sizes`

The `sizes` attribute cannot read CSS variables. Use a **literal width** that matches the breakpoint you care about, and keep it aligned with this doc (e.g. `(max-width: 1023px)` pairs with `max-lg` / default `lg`).

## Responsive token overrides

### Referencing Tailwind breakpoints inside plain `@media`

Tailwind’s theme defines `--breakpoint-md: 48rem` (and similar for `sm`, `lg`, …) in its bundled CSS. **Browsers** can evaluate `@media (max-width: var(--breakpoint-md))`, but **Next.js’ CSS pipeline (Lightning CSS)** often flags `var()` inside `@media` as an invalid media query and may not optimize it reliably.

So in raw CSS for this project we **repeat the literal** that matches the theme default, with a comment:

```css
/* = Tailwind default --breakpoint-md (48rem). If you override md in @theme, update this. */
@media (max-width: 48rem) { ... }
```

### Avoiding `@media` entirely

When the target element is in TSX, prefer Tailwind’s **`max-md:`** / **`md:``** prefixes so breakpoints stay 100% on the Tailwind theme with no duplication in CSS files.

Example in this repo: [`globals.css`](../src/styles/globals.css) narrows `--hero-visual-max-width` below `md` with `@media (max-width: 48rem)`; the value is documented to match [`--breakpoint-md` in Tailwind’s theme](https://tailwindcss.com/docs/theme).

## Related files

- [`src/styles/globals.css`](../src/styles/globals.css) — design tokens (`:root`), `@import "tailwindcss"`, `@theme` aliases, responsive token overrides, `@layer base`.
- [`docs/tailwind-guide.md`](./tailwind-guide.md) — this file; breakpoint tables and plain-CSS notes.
