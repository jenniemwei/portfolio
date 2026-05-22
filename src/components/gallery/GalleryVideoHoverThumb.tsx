"use client";

import { GalleryThumbImage } from "@/components/gallery/GalleryThumbImage";
import { GalleryVideoThumb } from "@/components/gallery/GalleryVideoThumb";

type GalleryVideoHoverThumbProps = {
  videoSrc: string;
  imageSrc: string;
  label: string;
  sizes: string;
  fill?: string;
  fit?: "contain" | "cover";
};

/** Video at rest; still image on card hover (`group` on parent `ProjectCard`). */
export function GalleryVideoHoverThumb({
  videoSrc,
  imageSrc,
  label,
  sizes,
  fill,
  fit = "cover",
}: GalleryVideoHoverThumbProps) {
  return (
    <>
      <div
        className="absolute inset-0 z-0 opacity-100 transition-opacity duration-200 group-hover:pointer-events-none group-hover:opacity-0 motion-reduce:transition-none"
      >
        <GalleryVideoThumb
          src={videoSrc}
          label={label}
          fill={fill}
          fit={fit}
          fallbackSrc={imageSrc}
        />
      </div>
      <div className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-200 group-hover:opacity-100 motion-reduce:transition-none">
        <GalleryThumbImage src={imageSrc} alt={label} sizes={sizes} />
      </div>
    </>
  );
}
