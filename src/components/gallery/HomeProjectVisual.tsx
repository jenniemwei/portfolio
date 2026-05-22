import type { HomeProjectItem } from "@/data/home-projects";

import { GalleryProjectVisual } from "./GalleryProjectVisual";

type HomeProjectVisualProps = {
  project: HomeProjectItem;
  sizes: string;
};

/** Shared card media for home gallery rows. */
export function HomeProjectVisual({ project, sizes }: HomeProjectVisualProps) {
  return (
    <GalleryProjectVisual
      video={project.video}
      img={project.img}
      label={project.imgAlt ?? project.heading}
      sizes={sizes}
      fill={project.videoThumbBg}
      fit={project.videoThumbFit ?? "cover"}
    />
  );
}
