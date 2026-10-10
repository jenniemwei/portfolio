import type { StaticImageData } from "next/image";

import { GalleryThumbImage } from "@/components/gallery/GalleryThumbImage";
import { GalleryVideoThumb } from "@/components/gallery/GalleryVideoThumb";

type GalleryProjectVisualProps = {
  video?: string;
  active?: boolean;
  playbackKey?: number;
  img?: string | StaticImageData | null;
  label: string;
  sizes: string;
  fill?: string;
  fit?: "contain" | "cover";
};

export function GalleryProjectVisual({
  video,
  active = true,
  playbackKey,
  img,
  label,
  sizes,
  fill,
  fit = "cover",
}: GalleryProjectVisualProps) {
  if (video) {
    return (
      <GalleryVideoThumb
        key={video}
        src={video}
        active={active}
        playbackKey={playbackKey}
        label={label}
        fill={fill}
        fit={fit}
        fallbackSrc={img ?? undefined}
        sizes={sizes}
      />
    );
  }

  if (img) {
    return <GalleryThumbImage src={img} alt={label} sizes={sizes} />;
  }

  return null;
}
