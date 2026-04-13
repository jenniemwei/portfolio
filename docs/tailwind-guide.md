# Tailwind shorthand cheat sheet

Tailwind builds class names from **pieces**. Once you see the pattern, most utilities read left-to-right: *what* → *where* (optional) → *size*.

---

## Spacing: `p` and `m` (padding and margin)

| Prefix | Meaning |
|--------|---------|
| **`p`** | **p**adding on all sides |
| **`px`** | padding **x** (left **and** right) |
| **`py`** | padding **y** (top **and** bottom) |
| **`pt`** | padding **t**op |
| **`pr`** | padding **r**ight |
| **`pb`** | padding **b**ottom |
| **`pl`** | padding **l**eft |

Same letters work for **margin**: **`m`**, **`mx`**, **`my`**, **`mt`**, **`mr`**, **`mb`**, **`ml`**.

**Examples**

- `px-4` — horizontal padding (left + right), size `4` in Tailwind’s scale  
- `pt-[var(--space-4)]` — top padding using a CSS variable (arbitrary value)

Sizes are usually from the theme (e.g. `4` = `1rem`). Bracket syntax `[...]` means a **custom** value.

---

## Size: width and height

| Prefix | Meaning |
|--------|---------|
| **`w`** | **w**idth |
| **`h`** | **h**eight |
| **`min-w`** | minimum width |
| **`max-w`** | maximum width |
| **`min-h`** | minimum height |
| **`max-h`** | maximum height |

**Examples**

- `w-full` — width 100% of the parent  
- `min-h-0` — lets flex/grid children shrink instead of overflowing  
- `max-w-[var(--content-max)]` — cap width with a design token  

---

## Layout: flex and grid

| Fragment | Meaning |
|----------|---------|
| **`flex`** | CSS `display: flex` |
| **`grid`** | `display: grid` |
| **`flex-col`** | stack children vertically (column direction) |
| **`items-center`** | align items on the **cross** axis (often vertical in a row) |
| **`items-stretch`** | stretch items to fill the cross axis |
| **`justify-center`** | align on the **main** axis (often horizontal in a row) |
| **`justify-between`** | space between items on the main axis |
| **`gap-4`** | gap between flex/grid children |

---

## Typography

| Prefix | Typical meaning |
|--------|------------------|
| **`text-sm`**, **`text-base`** | font **size** (from theme) |
| **`text-center`** | text **align** center (not color) |
| **`font-bold`** | font **weight** |
| **`leading-tight`** | **line** height (leading) |

Colors often look like **`text-default`** — `text-` sets **foreground color**; names match `:root` semantics (`default`, `secondary`, `subtle`). Page background uses **`bg-canvas`** (`--bg-default`). Rules use **`border-line`** (`--border-default`).

---

## Borders and radius

| Prefix | Meaning |
|--------|---------|
| **`border`** | default border width + style |
| **`border-t`** | border on **t**op only (also `r`, `b`, `l`) |
| **`rounded`** | border **radius** (corners) |
| **`rounded-full`** | pill / circle (large radius) |

---

## Position and stacking

| Prefix | Meaning |
|--------|---------|
| **`relative`** / **`absolute`** / **`fixed`** / **`sticky`** | CSS `position` |
| **`inset-0`** | top/right/bottom/left all `0` (with absolute/fixed) |
| **`z-10`**, **`z-[1]`** | **z**-index (stacking order) |

---

## State prefixes (go *in front* of another utility)

| Prefix | When it applies |
|--------|------------------|
| **`hover:`** | pointer is over the element |
| **`focus:`** | element is focused |
| **`focus-visible:`** | keyboard-style focus (good for a11y) |
| **`motion-safe:`** | only if the user allows animation |

**Example:** `hover:opacity-80` — apply opacity when hovered.

---

## Where to learn more

- [Tailwind docs — spacing](https://tailwindcss.com/docs/padding)  
- [Tailwind docs — layout](https://tailwindcss.com/docs/display)  

Design tokens and text presets live in **`src/styles/design-tokens.css`** and **`src/styles/text-styles.css`**; see [design-tokens.md](../src/styles/design-tokens.md).
