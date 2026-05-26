import {
  Children,
  type CSSProperties,
  type ReactNode,
} from "react";

import styles from "./GalleryRow.module.css";

/** Positive `fr` weights per column, e.g. `[1, 1]` → 50/50, `[3, 7]` → 30/70. */
export type GalleryRowTracks = readonly number[];

/** Named rhythm gaps — maps to `--spacing-*` in `globals.css` (`gap-xs` … `gap-xl`). */
export const GALLERY_ROW_GAP_CLASS = {
  xs: "gap-xs",
  sm: "gap-sm",
  md: "gap-md",
  lg: "gap-lg",
  xl: "gap-xl",
} as const;

export type GalleryRowGap = keyof typeof GALLERY_ROW_GAP_CLASS;

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
  /** Column + row gutter — `xs` | `sm` | `md` | `lg` | `xl` (`--spacing-*` tokens). Default `md`. */
  gap?: GalleryRowGap;
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
  gap = "md",
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
  const gapClass = GALLERY_ROW_GAP_CLASS[gap];
  const tracksCompactClass = tracksCompact ? styles.tracksCompactAtMd : "";
  const scrollRevealClass =
    measure === "gallery" || measure === "viewport" ? styles.rowScrollReveal : "";
  const rowStyle = {
    "--gallery-tracks": tracksCssValue(tracks),
    ...(tracksCompact
      ? { "--gallery-tracks-compact": tracksCssValue(tracksCompact) }
      : {}),
  } as CSSProperties;

  return (
    <div
      className={`${rowClass} ${gapClass} ${scrollRevealClass} ${tracksCompactClass} ${alignClass} ${className}`.trim()}
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
