import Image from "next/image";

import { SplitRow } from "@/components/content-row/SplitRow";
import { GalleryRow } from "@/components/gallery/GalleryRow";
import type { CaseStudyHeroGallery } from "@/data/case-studies/types";

type ProjHeroGalleryProps = {
  heroGallery: CaseStudyHeroGallery;
};

/** Hero strip: one `GalleryRow` track; layout switches on `heroGallery.kind`. */
export function ProjHeroGallery({ heroGallery }: ProjHeroGalleryProps) {
  if (heroGallery.kind === "placeholder") {
    return (
      <GalleryRow tracks={[1]} measure="gallery">
        <div
          className="h-full min-h-0 min-w-0 w-full"
          style={{ backgroundColor: heroGallery.backgroundColor }}
          role="img"
          aria-label="Case study hero (placeholder)"
        />
      </GalleryRow>
    );
  }

  if (heroGallery.kind === "split-row") {
    return (
      <SplitRow
        tracks={heroGallery.tracks}
        cells={heroGallery.cells}
        measure={heroGallery.measure ?? "gallery"}
      />
    );
  }

  if (heroGallery.kind === "single") {
    const { image } = heroGallery;
    return (
      <GalleryRow tracks={[1]} measure="gallery">
        <div className="relative h-full min-h-0 min-w-0 w-full overflow-hidden">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </div>
      </GalleryRow>
    );
  }

  if (heroGallery.kind === "composition") {
    return (
      <GalleryRow tracks={[1]} measure="gallery">
        <div className="relative h-full min-h-0 min-w-0 w-full overflow-hidden">
          {heroGallery.layers.map((layer, index) => (
            <div
              key={`${index}-${layer.alt}`}
              className={`absolute overflow-hidden ${layer.frameClassName ?? "inset-0 min-h-0 min-w-0"}`}
            >
              <Image
                src={layer.src}
                alt={layer.alt}
                fill
                className="object-cover"
                sizes="100vw"
                priority={index === 0}
              />
            </div>
          ))}
        </div>
      </GalleryRow>
    );
  }

  const _exhaustive: never = heroGallery;
  return _exhaustive;
}
