import { Children, type ReactNode } from "react";

import styles from "./GalleryRow.module.css";

export type GalleryRowVariant = "60-40" | "50-50" | "100" | "70-30" | "30-70";

type GalleryRowProps = {
  variant: GalleryRowVariant;
  children: ReactNode;
  /** `gallery` = card row aspect ratio; `content` = hero / intro (height from content) */
  measure?: "gallery" | "content";
  className?: string;
  /** Per-cell classes (e.g. hide a spacer column below the stack breakpoint) */
  cellClassName?: (index: number) => string | undefined;
};

function variantClassName(variant: GalleryRowVariant): string {
  switch (variant) {
    case "60-40":
      return styles.row6040;
    case "50-50":
      return styles.row5050;
    case "100":
      return styles.row100;
    case "70-30":
      return styles.row7030;
    case "30-70":
      return styles.row3070;
    default: {
      const _exhaustive: never = variant;
      return _exhaustive;
    }
  }
}

export function GalleryRow({
  variant,
  children,
  measure = "gallery",
  className = "",
  cellClassName,
}: GalleryRowProps) {
  const rowClass = measure === "gallery" ? styles.row : styles.rowContent;
  const vClass = variantClassName(variant);

  return (
    <div className={`${rowClass} ${vClass} ${className}`.trim()}>
      {Children.map(children, (child, index) => {
        const extra = cellClassName?.(index);
        return (
          <div
            key={index}
            className={
              `${styles.cell} ${measure === "gallery" ? styles.cellAspectMobile : ""} ${extra ?? ""}`.trim()
            }
          >
            {child}
          </div>
        );
      })}
    </div>
  );
}
