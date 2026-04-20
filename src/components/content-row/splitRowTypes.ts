import type { GalleryRowTracks } from "@/components/gallery/GalleryRow";

/**
 * Allowed `@utility type-*` tokens for `TextboxSegment` (see `src/styles/globals.css`).
 * Keep in sync when adding utilities.
 */
export const SPLIT_ROW_TYPE_STYLES = [
  "type-body",
  "type-body-sm",
  "type-display",
  "type-section-h2",
  "type-proj-title",
  "type-proj-subtitle",
  "type-proj-h2",
  "type-nav-link",
  "type-card-title",
  "type-card-subtitle",
  "type-page-heading",
  "type-link-back",
] as const;

export type TypeStyle = (typeof SPLIT_ROW_TYPE_STYLES)[number];

export type TextboxSegment = {
  text: string;
  utility: TypeStyle;
};

export type SplitImageFit = "fill" | "fitWidth";

/** Full-bleed image column. */
export type SplitImageCell = {
  kind: "image";
  src: string;
  alt: string;
  /** Default `fill` (cover cell). `fitWidth` = letterbox vertically, no horizontal overflow. */
  fit?: SplitImageFit;
};

/** Rich text column: ordered runs, each with a typography utility. */
export type SplitTextCell = {
  kind: "text";
  textbox: readonly TextboxSegment[];
};

/** Empty track; `position` documents which track this cell occupies for authoring / validation. */
export type SplitSpacerCell = {
  kind: "spacer";
  position: "start" | "middle";
};

export type SplitCell = SplitImageCell | SplitTextCell | SplitSpacerCell;

export type SplitRowMeasure = "gallery" | "content";

/**
 * Data for one `GalleryRow` band: `cells.length` must equal `tracks.length`.
 */
export type SplitRowData = {
  tracks: GalleryRowTracks;
  cells: readonly SplitCell[];
  measure?: SplitRowMeasure;
};

/** Dev-only: warn when spacer `position` does not match column index / row length. */
export function assertSplitSpacerPositions(cells: readonly SplitCell[]): void {
  if (process.env.NODE_ENV === "production") return;

  cells.forEach((cell, index) => {
    if (cell.kind !== "spacer") return;
    if (cell.position === "middle") {
      if (cells.length !== 3 || index !== 1) {
        console.warn(
          "[SplitRow] spacer position \"middle\" expects a 3-column row and index 1.",
          { index, length: cells.length },
        );
      }
    }
    if (cell.position === "start" && index !== 0) {
      console.warn(
        "[SplitRow] spacer position \"start\" expects index 0.",
        { index },
      );
    }
  });
}
