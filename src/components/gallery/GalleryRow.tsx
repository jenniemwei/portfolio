import {
  Children,
  type CSSProperties,
  type ReactNode,
} from "react";

import styles from "./GalleryRow.module.css";

/** Positive `fr` weights per column, e.g. `[1, 1]` → 50/50, `[3, 7]` → 30/70. */
export type GalleryRowTracks = readonly number[];

type GalleryRowProps = {
  tracks: GalleryRowTracks;
  /**
   * Below `md` (48rem): these fr weights (omit spacer column). From `md`: `tracks`.
   * Pair with hiding spacer cells (`hidden md:block`) so column count matches.
   */
  tracksCompact?: GalleryRowTracks;
  children: ReactNode;
  /**
   * `gallery` = aspect-ratio strip; `viewport` = fixed `--gallery-row-height` (home);
   * `content` = height from children (hero / intro).
   */
  measure?: "gallery" | "viewport" | "content";
  /**
   * `start` = grid items use intrinsic cross-size (pair with non-`fill` media for natural image height).
   * Default stretch keeps card / `fill` columns equal height.
   */
  alignItems?: "stretch" | "start";
  /**
   * Column + row gutter. Omitted or `"media"` → `gap-md` from row classes; `"large"` → `gap-lg`.
   * Any other string is applied as both `column-gap` and `row-gap` (e.g. `gap-xl`, `1.5rem`).
   */
  gap?: string;
  className?: string;
  /** Per-cell classes (e.g. hide a spacer column below the stack breakpoint) */
  cellClassName?: (index: number) => string | undefined;
};

function tracksCssValue(tracks: GalleryRowTracks): string {
  return tracks.map((w) => `${w}fr`).join(" ");
}

export function GalleryRow({
  tracks,
  tracksCompact,
  children,
  measure = "gallery",
  alignItems = "stretch",
  gap,
  className = "",
  cellClassName,
}: GalleryRowProps) {
  const rowClass =
    measure === "viewport"
      ? styles.rowViewport
      : measure === "gallery"
        ? styles.row
        : styles.rowContent;
  const alignClass =
    alignItems === "start" ? styles.rowAlignStart : "";
  const gapRaw = gap?.trim();
  const gapIsMedia = !gapRaw || gapRaw === "media";
  const gapIsLarge = gapRaw === "large";
  const gapClass = gapIsLarge ? styles.rowGapLarge : "";
  const tracksCompactClass = tracksCompact ? styles.tracksCompactAtMd : "";
  const rowStyle = {
    "--gallery-tracks": tracksCssValue(tracks),
    ...(tracksCompact
      ? { "--gallery-tracks-compact": tracksCssValue(tracksCompact) }
      : {}),
    ...(gapIsMedia || gapIsLarge || !gapRaw
      ? {}
      : { columnGap: gapRaw, rowGap: gapRaw }),
  } as CSSProperties;

  return (
    <div
      className={`${rowClass} ${tracksCompactClass} ${gapClass} ${alignClass} ${className}`.trim()}
      style={rowStyle}
    >
      {Children.map(children, (child, index) => {
        const extra = cellClassName?.(index);
        const cellIntrinsic =
          alignItems === "start" ? styles.cellIntrinsic : "";

        const viewportCell =
          measure === "viewport" && alignItems !== "start"
            ? styles.cellViewport
            : "";

        return (
          <div
            key={index}
            className={
              `${styles.cell} ${cellIntrinsic} ${viewportCell} ${measure === "gallery" ? styles.cellAspectMobile : ""} ${extra ?? ""}`.trim()
            }
          >
            {child}
          </div>
        );
      })}
    </div>
  );
}
