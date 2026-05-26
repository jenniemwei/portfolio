import { GalleryThumbImage } from "@/components/gallery/GalleryThumbImage";
import { GalleryVideoThumb } from "@/components/gallery/GalleryVideoThumb";

type GalleryProjectVisualProps = {
  video?: string;
  img?: string | null;
  label: string;
  sizes: string;
  fill?: string;
  fit?: "contain" | "cover";
};

export function GalleryProjectVisual({
  video,
  img,
  label,
  sizes,
  fill,
  fit = "cover",
}: GalleryProjectVisualProps) {
  if (video) {
    return (
      <GalleryVideoThumb
        src={video}
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
