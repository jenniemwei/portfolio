import { GalleryThumbImage } from "@/components/gallery/GalleryThumbImage";
import { GalleryVideoHoverThumb } from "@/components/gallery/GalleryVideoHoverThumb";
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
  if (video && img) {
    return (
      <GalleryVideoHoverThumb
        videoSrc={video}
        imageSrc={img}
        label={label}
        sizes={sizes}
        fill={fill}
        fit={fit}
      />
    );
  }

  if (video) {
    return (
      <GalleryVideoThumb
        src={video}
        label={label}
        fill={fill}
        fit={fit}
        fallbackSrc={img ?? undefined}
      />
    );
  }

  if (img) {
    return <GalleryThumbImage src={img} alt={label} sizes={sizes} />;
  }

  return null;
}
