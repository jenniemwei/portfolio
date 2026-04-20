/**
 * Shared shapes for `/work/*` case study content modules.
 * In string literals, use `\n` for line breaks — UI preserves them where body copy is rendered.
 */

import type { SplitRowData } from "@/components/content-row/splitRowTypes";

export type CaseStudyImageRef = {
  src: string;
  alt: string;
};

/** One full-bleed hero frame (same intent as a single `GalleryThumbImage` row). */
export type CaseStudyHeroGallerySingle = {
  kind: "single";
  image: CaseStudyImageRef;
};

/** Layered hero: paint order is array order (index 0 = back). */
export type CaseStudyHeroGalleryComposition = {
  kind: "composition";
  layers: ReadonlyArray<
    CaseStudyImageRef & {
      /** Optional layout frame (Tailwind). Default full-bleed `inset-0`. */
      frameClassName?: string;
    }
  >;
};

/** Solid-color hero strip (no image assets). */
export type CaseStudyHeroGalleryPlaceholder = {
  kind: "placeholder";
  /** Any CSS color, e.g. `var(--g2)` or `#e8e4f2`. */
  backgroundColor: string;
};

/** Split-row hero strip; `tracks` / `cells` — see `SplitRowData` in `@/components/content-row/splitRowTypes`. */
export type CaseStudyHeroGallerySplitRow = {
  kind: "split-row";
} & SplitRowData;

export type CaseStudyHeroGallery =
  | CaseStudyHeroGallerySingle
  | CaseStudyHeroGalleryComposition
  | CaseStudyHeroGalleryPlaceholder
  | CaseStudyHeroGallerySplitRow;

export type CaseStudyIntroBlock = {
  label: string;
  body: string;
};

export type CaseStudyHeroBlock = {
  title: string;
  heroGallery: CaseStudyHeroGallery;
  /** Below title: 30% specs (timeline + contributors), 70% description. */
  intro: {
    timeline: CaseStudyIntroBlock;
    contributors: CaseStudyIntroBlock;
    description: CaseStudyIntroBlock;
  };
};

/** One horizontal band inside a case-study body section. */
export type CaseStudySectionRow =
  | { rowKind: "prose"; body: string }
  | { rowKind: "callout"; heading: string }
  | ({ rowKind: "split-row" } & SplitRowData);

/**
 * Body slice after the hero. Use `body` alone, `rows` alone, or both (intro paragraph + rows).
 */
export type CaseStudySection = {
  sectionId: string;
  sectionHeader: string;
  body?: string;
  rows?: readonly CaseStudySectionRow[];
};
