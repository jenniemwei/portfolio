"use client";

import {
  homeProjects,
  type HomeProjectItem,
} from "@/data/home-projects";
import { GalleryRow } from "@/components/gallery/GalleryRow";
import { GalleryThumbImage } from "@/components/gallery/GalleryThumbImage";
import { GalleryVideoThumb } from "@/components/gallery/GalleryVideoThumb";
import gallerySectionStyles from "@/components/gallery/GallerySectionReveal.module.css";
import { ProjectCardWithPreview } from "@/components/cards/ProjectCardWithPreview";

export function WorkSection() {
  return (
    <section id="work" className="w-full py-[var(--space-xl)]">
      {/* <SectionHeader title="Work" /> */}
      <div
        className={`${gallerySectionStyles.sectionReveal} flex w-full flex-col gap-[var(--space-32)] py-[var(--space-m)]`}
      >
        {homeProjects.work.rows.map((row, rowIndex) => (
          <GalleryRow key={`work-${row.variant}-${rowIndex}`} variant={row.variant}>
            {(row.projects as readonly HomeProjectItem[]).map(
              (project, i) => (
                <ProjectCardWithPreview
                  key={project.id ?? `work-${rowIndex}-${i}`}
                  project={project}
                  visual={
                    project.video ? (
                      <GalleryVideoThumb
                        src={project.video}
                        label={project.imgAlt ?? project.heading}
                        fill={project.videoThumbBg}
                        fit={project.videoThumbFit ?? "cover"}
                        fallbackSrc={project.img ?? undefined}
                      />
                    ) : project.img ? (
                      <GalleryThumbImage
                        src={project.img}
                        alt={project.imgAlt ?? project.heading}
                        sizes="(max-width: 1023px) 100vw, 60vw"
                      />
                    ) : undefined
                  }
                />
              ),
            )}
          </GalleryRow>
        ))}
      </div>
    </section>
  );
}
