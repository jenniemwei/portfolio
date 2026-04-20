import Image from "next/image";

import { GalleryRow } from "@/components/gallery/GalleryRow";

import {
  assertSplitContentCells,
  assertSplitSpacerPositions,
  type SplitCell,
  type SplitContentVisualPart,
  type SplitRowData,
  type SplitRowMeasure,
  type TypeStyle,
} from "./splitRowTypes";

function firstVisualInRow(
  cells: readonly SplitCell[],
): { cell: number; part: number } | null {
  for (let i = 0; i < cells.length; i++) {
    const cell = cells[i];
    if (cell.kind !== "content") continue;
    const p = cell.parts.findIndex((x) => x.part === "visual");
    if (p !== -1) return { cell: i, part: p };
  }
  return null;
}

type RenderVisualBlockArgs = {
  visual: SplitContentVisualPart;
  cellIndex: number;
  partIndex: number;
  firstVisual: { cell: number; part: number } | null;
  measure: SplitRowMeasure;
  sizes: string;
};

function renderVisualBlock({
  visual,
  cellIndex,
  partIndex,
  firstVisual,
  measure,
  sizes,
}: RenderVisualBlockArgs) {
  const fit = visual.fit ?? "fill";
  const priority =
    firstVisual != null &&
    firstVisual.cell === cellIndex &&
    firstVisual.part === partIndex;
  const wrapperClass = "relative min-w-0 w-full overflow-hidden";

  if (measure === "content") {
    const iw = visual.intrinsicWidth;
    const ih = visual.intrinsicHeight;

    if (iw != null && ih != null) {
      return (
        <div className={wrapperClass}>
          <Image
            src={visual.src}
            alt={visual.alt}
            width={iw}
            height={ih}
            sizes={sizes}
            priority={priority}
            className={
              fit === "fitWidth"
                ? "h-auto w-full max-w-full object-contain"
                : "h-auto w-full max-w-full"
            }
          />
        </div>
      );
    }

    return (
      <div className={wrapperClass}>
        <img
          src={visual.src}
          alt={visual.alt}
          className={
            fit === "fitWidth"
              ? "block h-auto w-full max-w-full object-contain"
              : "block h-auto w-full max-w-full"
          }
          loading={priority ? "eager" : "lazy"}
          decoding="async"
        />
      </div>
    );
  }

  const objectClass =
    fit === "fitWidth" ? "object-contain" : "object-cover";

  return (
    <div className={`${wrapperClass} h-full min-h-0`}>
      <Image
        src={visual.src}
        alt={visual.alt}
        fill
        className={objectClass}
        sizes={sizes}
        priority={priority}
      />
    </div>
  );
}

/**
 * `flex-col` main axis is vertical — these need the column to span the row
 * (`self-stretch` on the grid cell + `h-full` inner) or there is no slack to distribute.
 */
const FLEX_COL_MAIN_AXIS_SPACE = /\b(justify-between|justify-around|justify-evenly)\b/;

function textCellUsesMainAxisSpaceDistribution(
  classNames: readonly string[] | undefined,
): boolean {
  return classNames?.some((c) => FLEX_COL_MAIN_AXIS_SPACE.test(c)) ?? false;
}

function contentHasAnyText(cell: SplitCell): boolean {
  return (
    cell.kind === "content" && cell.parts.some((p) => p.part === "text")
  );
}

function typeStyleClass(utility: TypeStyle): string {
  switch (utility) {
    case "type-body":
      return "type-body";
    case "type-body-sm":
      return "type-body-sm";
    case "type-display":
      return "type-display";
    case "type-proj-title":
      return "type-proj-title";
    case "type-proj-subtitle":
      return "type-proj-subtitle";
    case "type-h2-section":
      return "type-h2-section";
    case "type-h3-subhead":
      return "type-h3-subhead";
    case "type-h2-special":
      return "type-h2-special";
    case "type-nav-link":
      return "type-nav-link";
    case "type-card-title":
      return "type-card-title";
    case "type-card-subtitle":
      return "type-card-subtitle";
    case "type-page-heading":
      return "type-page-heading";
    case "type-link-back":
      return "type-link-back";
    default: {
      const _exhaustive: never = utility;
      return _exhaustive;
    }
  }
}

/** `GalleryRow` + cell mapping for `SplitRowData` (`content` + `spacer` cells). */
export function SplitRow({
  tracks,
  cells,
  measure = "content",
}: SplitRowData) {
  assertSplitSpacerPositions(cells);
  assertSplitContentCells(cells);

  const sizes =
    tracks.length >= 3
      ? "(max-width: 1023px) 100vw, 33vw"
      : "(max-width: 1023px) 100vw, 45vw";

  const firstVisual = firstVisualInRow(cells);

  return (
    <GalleryRow
      tracks={tracks}
      measure={measure}
      alignItems={measure === "content" ? "start" : "stretch"}
      cellClassName={(i) => {
        const cell = cells[i];
        if (cell?.kind !== "content") return undefined;

        if (contentHasAnyText(cell)) {
          const stretchColumn = textCellUsesMainAxisSpaceDistribution(
            cell.cellClassNames,
          );
          return `w-full min-w-0 justify-self-stretch ${stretchColumn ? "self-stretch" : "self-center"}`;
        }

        if (measure === "content") {
          return "w-full min-w-0 justify-self-stretch";
        }
        return undefined;
      }}
    >
      {cells.map((cell, index) => {
        if (cell.kind === "spacer") {
          return (
            <div
              key={`spacer-${index}-${cell.position}`}
              aria-hidden
              className="min-h-0 min-w-0"
            />
          );
        }

        const visualOnly =
          cell.parts.length > 0 &&
          cell.parts.every((p) => p.part === "visual");

        if (visualOnly) {
          if (cell.parts.length === 1) {
            const visual = cell.parts[0] as SplitContentVisualPart;
            return (
              <div
                key={`content-${index}`}
                className="h-full min-h-0 min-w-0 w-full"
              >
                {renderVisualBlock({
                  visual,
                  cellIndex: index,
                  partIndex: 0,
                  firstVisual,
                  measure,
                  sizes,
                })}
              </div>
            );
          }
          return (
            <div
              key={`content-${index}`}
              className="flex h-full min-h-0 min-w-0 w-full flex-col gap-[var(--space-m)]"
            >
              {cell.parts.map((part, pi) => {
                const visual = part as SplitContentVisualPart;
                return (
                  <div
                    key={`${index}-v-${pi}`}
                    className={
                      measure === "gallery"
                        ? "min-h-0 min-w-0 w-full flex-1 basis-0"
                        : "min-h-0 min-w-0 w-full shrink-0"
                    }
                  >
                    {renderVisualBlock({
                      visual,
                      cellIndex: index,
                      partIndex: pi,
                      firstVisual,
                      measure,
                      sizes,
                    })}
                  </div>
                );
              })}
            </div>
          );
        }

        const textCellExtra =
          cell.cellClassNames != null && cell.cellClassNames.length > 0
            ? ` ${cell.cellClassNames.join(" ")}`
            : "";
        const mainAxisSpace = textCellUsesMainAxisSpaceDistribution(
          cell.cellClassNames,
        );
        const justifyMain = mainAxisSpace ? "" : " justify-center";

        return (
          <div
            key={`content-${index}`}
            className={`flex h-full min-h-0 min-w-0 flex-col items-start${justifyMain} gap-[var(--space-m)] text-default${textCellExtra}`.trim()}
          >
            {cell.parts.map((part, pi) => {
              if (part.part === "visual") {
                return (
                  <div
                    key={`${index}-v-${pi}`}
                    className={
                      measure === "gallery"
                        ? "h-full min-h-0 min-w-0 w-full shrink-0"
                        : "min-h-0 min-w-0 w-full shrink-0"
                    }
                  >
                    {renderVisualBlock({
                      visual: part,
                      cellIndex: index,
                      partIndex: pi,
                      firstVisual,
                      measure,
                      sizes,
                    })}
                  </div>
                );
              }

              return (
                <div
                  key={`${index}-t-${pi}`}
                  className="flex min-h-0 min-w-0 flex-col gap-[var(--space-m)]"
                >
                  {part.textbox.map((seg, segIndex) => (
                    <span
                      key={segIndex}
                      className={`${typeStyleClass(seg.utility)} whitespace-pre-line text-pretty text-default`}
                    >
                      {seg.text}
                    </span>
                  ))}
                </div>
              );
            })}
          </div>
        );
      })}
    </GalleryRow>
  );
}
