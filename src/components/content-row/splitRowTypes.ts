import type { GalleryRowTracks } from "@/components/gallery/GalleryRow";

/**
 * Allowed `@utility type-*` tokens for `TextboxSegment` (see `src/styles/globals.css` case-study block + shared `type-*`).
 * Regenerate from `globals.css`: `npm run update-type-styles` (updates this list + `typeStyleClass` in `SplitRow.tsx`). Then refresh docs/design-tokens.md if roles changed.
 */
export const SPLIT_ROW_TYPE_STYLES = [
  "type-body",
  "type-body-sm",
  "type-display",
  "type-proj-title",
  "type-proj-subtitle",
  "type-h2-section",
  "type-h3-subhead",
  "type-h2-special",
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

/** One image block inside a `content` cell (`part: "visual"`). */
export type SplitContentVisualPart = {
  part: "visual";
  src: string;
  alt: string;
  /**
   * Natural pixel size of the asset (for `measure="content"` intrinsic layout + `sizes`).
   * When both are set, Next/Image can reserve the correct aspect; omit either to fall back to `<img>`.
   */
  intrinsicWidth?: number;
  intrinsicHeight?: number;
  /** Default `fill` (cover cell). `fitWidth` = letterbox vertically, no horizontal overflow. */
  fit?: SplitImageFit;
};

/** One text block inside a `content` cell (`part: "text"`). */
export type SplitContentTextPart = {
  part: "text";
  textbox: readonly TextboxSegment[];
};

/** Ordered slice inside a `content` column: stack any combination of image(s) and text block(s). */
export type SplitContentPart = SplitContentVisualPart | SplitContentTextPart;

/**
 * One grid column: optional visuals + optional copy, rendered top-to-bottom in `parts` order.
 * `SplitRow` applies the same grid cell rules as legacy separate image/text columns.
 */
export type SplitContentCell = {
  kind: "content";
  parts: readonly SplitContentPart[];
  /**
   * Optional Tailwind classes on the **inner** column wrapper (`flex flex-col` in `SplitRow`).
   * For main-axis spacing (`justify-between`, …), `SplitRow` stretches the grid cell when any
   * `part: "text"` exists so those utilities have vertical slack.
   */
  cellClassNames?: readonly string[];
};

/** Empty track; `position` documents which track this cell occupies for authoring / validation. */
export type SplitSpacerCell = {
  kind: "spacer";
  position: "start" | "middle";
};

export type SplitCell = SplitContentCell | SplitSpacerCell;

export type SplitRowMeasure = "gallery" | "content";

/**
 * Data for one `GalleryRow` band: `cells.length` must equal `tracks.length`.
 */
export type SplitRowData = {
  tracks: GalleryRowTracks;
  cells: readonly SplitCell[];
  /**
   * `gallery` = fixed strip aspect (home / hero). `content` = row height follows columns
   * (`SplitRow` default). Hero `SplitRow` still passes `measure` from `ProjHeroGallery` (defaults to `gallery`).
   */
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

/** Dev-only: warn on empty `content` cells or empty text parts. */
export function assertSplitContentCells(cells: readonly SplitCell[]): void {
  if (process.env.NODE_ENV === "production") return;

  cells.forEach((cell, cellIndex) => {
    if (cell.kind !== "content") return;
    if (cell.parts.length === 0) {
      console.warn("[SplitRow] content cell has empty `parts`.", { cellIndex });
    }
    cell.parts.forEach((part, partIndex) => {
      if (part.part === "text" && part.textbox.length === 0) {
        console.warn("[SplitRow] text part has empty `textbox`.", {
          cellIndex,
          partIndex,
        });
      }
    });
  });
}
