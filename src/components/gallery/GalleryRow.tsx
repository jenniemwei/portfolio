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
  children: ReactNode;
  /** `gallery` = card row aspect ratio; `content` = hero / intro (height from content) */
  measure?: "gallery" | "content";
  /**
   * `start` = grid items use intrinsic cross-size (pair with non-`fill` media for natural image height).
   * Default stretch keeps card / `fill` columns equal height.
   */
  alignItems?: "stretch" | "start";
  /**
   * Column + row gutter. Omitted or `"media"` → `--space-m` from row classes; `"large"` → `--space-lg`.
   * Any other string is applied as both `column-gap` and `row-gap` (e.g. `var(--space-xl)`, `1.5rem`).
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
  children,
  measure = "gallery",
  alignItems = "stretch",
  gap,
  className = "",
  cellClassName,
}: GalleryRowProps) {
  const rowClass = measure === "gallery" ? styles.row : styles.rowContent;
  const alignClass =
    alignItems === "start" ? styles.rowAlignStart : "";
  const gapRaw = gap?.trim();
  const gapIsMedia = !gapRaw || gapRaw === "media";
  const gapIsLarge = gapRaw === "large";
  const gapClass = gapIsLarge ? styles.rowGapLarge : "";
  const rowStyle = {
    "--gallery-tracks": tracksCssValue(tracks),
    ...(gapIsMedia || gapIsLarge || !gapRaw
      ? {}
      : { columnGap: gapRaw, rowGap: gapRaw }),
  } as CSSProperties;

  return (
    <div
      className={`${rowClass} ${gapClass} ${alignClass} ${className}`.trim()}
      style={rowStyle}
    >
      {Children.map(children, (child, index) => {
        const extra = cellClassName?.(index);
        const cellIntrinsic =
          alignItems === "start" ? styles.cellIntrinsic : "";

        return (
          <div
            key={index}
            className={
              `${styles.cell} ${cellIntrinsic} ${measure === "gallery" ? styles.cellAspectMobile : ""} ${extra ?? ""}`.trim()
            }
          >
            {child}
          </div>
        );
      })}
    </div>
  );
}
