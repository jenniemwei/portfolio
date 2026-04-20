import type {
  CaseStudyHeroBlock,
  CaseStudySection,
} from "@/data/case-studies/types";

/** Temporary: one asset in both cells until distinct hero frames exist. */
const G2_HERO_FRAME = "/thumbnails/g2-search-thumb.png";

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
          kind: "image",
          src: G2_HERO_FRAME,
          alt: "G2 Search — hero frame (70%)",
        },
        {
          kind: "image",
          src: G2_HERO_FRAME,
          alt: "G2 Search — hero frame (30%)",
        },
      ],
    },
    intro: {
      timeline: {
        label: "Timeline",
        body: "Summer 2025, 10 weeks",
      },
      contributors: {
        label: "With",
        body: "Mentored by: Allison Horrell, Aryn Silverberg",
      },
      description: {
        label: "",
        body: "As a Product Design Intern, I owned the redesign of G2's core search experience, handing off MVP changes that drove an 8.5% lift in user conversion on search pages, and defining new AI design patterns now used across the product.",
      },
    },
  } satisfies CaseStudyHeroBlock,

  sections: [
    {
      sectionId: "process",
      heading: "Process",
      body: "Placeholder — section intro before stacked rows.",
      rows: [
        {
          rowKind: "prose",
          body: "Placeholder — discovery, synthesis, and early directions.",
        },
        {
          rowKind: "prose",
          body: "Placeholder — iteration and validation notes.",
        },
        {
          rowKind: "split-row",
          tracks: [1, 1],
          measure: "content",
          cells: [
            {
              kind: "image",
              src: G2_HERO_FRAME,
              alt: "Process — frame A",
            },
            {
              kind: "image",
              src: G2_HERO_FRAME,
              alt: "Process — frame B",
            },
          ],
        },
      ],
    },
    {
      sectionId: "outcomes",
      heading: "Outcomes",
      body: "Placeholder — impact, learnings, and next steps will live here.",
    },
  ] satisfies readonly CaseStudySection[],
};

export type G2SearchCaseStudy = typeof g2SearchCaseStudy;
