import Image from "next/image";

import { GalleryRow } from "@/components/gallery/GalleryRow";

import {
  assertSplitSpacerPositions,
  type SplitRowData,
  type TypeStyle,
} from "./splitRowTypes";

function typeStyleClass(utility: TypeStyle): string {
  switch (utility) {
    case "type-body":
      return "type-body";
    case "type-body-sm":
      return "type-body-sm";
    case "type-display":
      return "type-display";
    case "type-section-h2":
      return "type-section-h2";
    case "type-proj-title":
      return "type-proj-title";
    case "type-proj-subtitle":
      return "type-proj-subtitle";
    case "type-proj-h2":
      return "type-proj-h2";
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

/** `GalleryRow` + cell mapping for `SplitRowData` (images, textbox, spacers). */
export function SplitRow({
  tracks,
  cells,
  measure = "gallery",
}: SplitRowData) {
  assertSplitSpacerPositions(cells);

  const sizes =
    tracks.length >= 3
      ? "(max-width: 1023px) 100vw, 33vw"
      : "(max-width: 1023px) 100vw, 45vw";

  const firstImageIndex = cells.findIndex((c) => c.kind === "image");

  return (
    <GalleryRow tracks={tracks} measure={measure}>
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

        if (cell.kind === "text") {
          return (
            <div
              key={`text-${index}`}
              className="flex min-h-0 min-w-0 flex-col gap-[var(--space-xs)] text-default"
            >
              {cell.textbox.map((seg, segIndex) => (
                <span
                  key={segIndex}
                  className={`${typeStyleClass(seg.utility)} whitespace-pre-line text-pretty text-default`}
                >
                  {seg.text}
                </span>
              ))}
            </div>
          );
        }

        const fit = cell.fit ?? "fill";
        const objectClass =
          fit === "fitWidth" ? "object-contain" : "object-cover";

        return (
          <div
            key={`${cell.src}-${index}`}
            className="relative h-full min-h-0 min-w-0 overflow-hidden bg-[var(--g1)]"
          >
            <Image
              src={cell.src}
              alt={cell.alt}
              fill
              className={objectClass}
              sizes={sizes}
              priority={index === firstImageIndex}
            />
          </div>
        );
      })}
    </GalleryRow>
  );
}
