import type {
  CaseStudyHeroBlock,
  CaseStudySection,
} from "@/data/case-studies/types";

/**
 * Cheatsheet — case study content (`/work/g2-search`)
 *
 * Sections (`sections[]`): each needs `sectionId` (page anchor), `sectionHeader` (title + underline).
 * Optional `body` (intro blurb). Optional `rows` (stacked bands below).
 *
 * Row types (`rows[]`):
 * - Prose: `{ rowKind: "prose", body: "..." }` — one paragraph block; use `\n` in the string for line breaks.
 * - Callout: `{ rowKind: "callout", heading: "..." }` — short interstitial heading (`type-h2-special`).
 * - Split grid: `{ rowKind: "split-row", tracks, cells, measure? }` — same grid model as the hero `split-row`.
 *
 * `tracks`: one positive number per column → CSS `fr` ratios (not percentages). Examples: `[1, 1]` = 50/50,
 * `[7, 3]` ≈ 70/30, `[2, 1, 1]` = three columns with weights 2:1:1. `cells.length` must match `tracks.length`.
 *
 * `cells` in a split-row:
 * - `{ kind: "content", parts: [...], cellClassNames? }` — each column is an ordered `parts` list:
 *   `{ part: "visual", src, alt, intrinsicWidth?, intrinsicHeight?, fit? }` and/or
 *   `{ part: "text", textbox: [{ text, utility }, ...] }`. Order = top-to-bottom in the column.
 *   Optional `cellClassNames` (Tailwind) merge onto the inner wrapper when any `text` part exists, or
 *   onto a simple visual stack for visual-only columns. See `docs/layout-guide.md`.
 * - `{ kind: "spacer", position: "start" | "middle" }` — empty column. `"start"` only in column 0;
 *   `"middle"` only as the center cell of a 3-column row (`SplitRow` dev warnings).
 *
 * `measure`: optional. Body `split-row`s default to `"content"` (row height = max of columns; images
 *   scale `w-full` with natural height). Set `"gallery"` for the fixed strip aspect (hero).
 */


/**
 * G2 Search — all copy and media paths for `/work/g2-search`.
 * Add or remove `sections` entries as the case study grows.
 */
export const g2SearchCaseStudy = {
  route: "/work/g2-search",

  hero: {
    title: "Smarter search @ G2",
    heroGallery: {
      kind: "split-row",
      tracks: [7, 3],
      cells: [
        {
          kind: "content",
          parts: [
            {
              part: "visual",
              src: "/thumbnails/g2-search-thumb.png",
              alt: "G2 Search — hero frame (70%)",
            },
          ],
        },
        {
          kind: "content",
          parts: [
            {
              part: "visual",
              src: "/thumbnails/g2-search-thumb.png",
              alt: "G2 Search — hero frame (30%)",
            },
          ],
        },
      ],
    },
    intro: {
      timeline: {
        label: "Timeline",
        body: `Summer 2025, 
        10 weeks`,
      },
      contributors: {
        label: "With",
        body: `Mentored by: 
        Allison Horrell,
        Aryn Silverberg`,
      },
      description: {
        label: "",
        body: "As a Product Design Intern, I owned the redesign of G2's core search experience, handing off MVP changes that drove an 8.5% lift in user conversion on search pages, and defining new AI design patterns now used across the product.",
      },
    },
  } satisfies CaseStudyHeroBlock,

  sections: [
    {
      sectionId: "context",
      sectionHeader: "The Story",
      rows: [
        {
          rowKind: "split-row",
          tracks: [2, 1],
          cells: [
            {
              kind: "content",
              parts: [
                {
                  part: "visual",
                  src: "/g2-search-pg/search-stats1.png",
                  alt: "Search stats — chart frame",
                  intrinsicWidth: 1429,
                  intrinsicHeight: 626,
                },
              ],
            },
            {
              kind: "content",
              cellClassNames: ["text-left", "w-[80%]"],
              parts: [
                {
                  part: "text",
                  textbox: [
                    {
                      text: "Software buyers are searching a lot per session... but they're not seeing results worth engaging with",
                      utility: "type-h3-subhead",
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          rowKind: "callout",
          heading: "What's going on?",
        },
        {
          rowKind: "split-row",
          tracks: [1, 3],
          cells: [
            {
              kind: "content",
              parts: [
                {
                  part: "text",
                  textbox: [
                    {
                      text: "An outdated search page, optimized for SEO, not buyer needs",
                      utility: "type-h3-subhead",
                    },
                  ],
                },
              ],
            },
            {
              kind: "content",
              parts: [
                {
                  part: "visual",
                  src: "/g2-search-pg/old-pg.png",
                  alt: "Search stats — chart frame",
                  intrinsicWidth: 1429,
                  intrinsicHeight: 626,
                },
                {
                  part: "text",
                  textbox: [
                    {
                      text: `(01) Jargon filled product cards mean nothing to buyers and make cards impossible to scan quickly. 
                      (02) Hidden away filters are collapse by default. 
                      (03) AI button gives users no reason to use it or even know what it can do. `,
                      utility: "type-body",
                    },
                  ],
                },
                
              ],
            },
          ],
        },
      ],
    },
    {
      sectionId: "Brainstorm",
      sectionHeader: "Brainstorm",
    },
  ] satisfies readonly CaseStudySection[],
};

export type G2SearchCaseStudy = typeof g2SearchCaseStudy;
