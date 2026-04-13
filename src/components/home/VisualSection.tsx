import Image from "next/image";

import {
  homeProjects,
  type HomeProjectItem,
} from "@/data/home-projects";
import { GalleryRow } from "@/components/sitewide/GalleryRow";
import { ProjectCard } from "@/components/home/ProjectCard";
import { GalleryHeader } from "@/components/sitewide/GalleryHeader";

function VisualThumb({ src, alt }: { src: string; alt: string }) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      className="object-cover"
      sizes="(max-width: 900px) 100vw, 50vw"
    />
  );
}

export function VisualSection() {
  return (
    <>
      <GalleryHeader variant="intro" title="who also loves visual design..." />
      <GalleryHeader title="Visual" />
      <div className="flex w-full flex-col gap-[var(--space-32)] py-[var(--space-m)]">
        {homeProjects.visual.rows.map((row, rowIndex) => (
          <GalleryRow key={`visual-${row.variant}-${rowIndex}`} variant={row.variant}>
            {(row.projects as readonly HomeProjectItem[]).map(
              (project, i) => (
                <ProjectCard
                  key={project.id ?? `visual-${rowIndex}-${i}`}
                  id={project.id}
                  projTitle={project.heading}
                  projSub={project.subheading}
                  visual={
                    project.img ? (
                      <VisualThumb
                        src={project.img}
                        alt={project.imgAlt ?? project.heading}
                      />
                    ) : undefined
                  }
                />
              ),
            )}
          </GalleryRow>
        ))}
      </div>
    </>
  );
}
