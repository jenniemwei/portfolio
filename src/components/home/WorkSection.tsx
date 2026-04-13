import Image from "next/image";

import {
  homeProjects,
  type HomeProjectItem,
} from "@/data/home-projects";
import { GalleryRow } from "@/components/sitewide/GalleryRow";
import { ProjectCard } from "@/components/home/ProjectCard";
import gallerySectionStyles from "@/components/home/GallerySectionReveal.module.css";
import { SectionHeader } from "@/components/sitewide/SectionHeader";

function WorkThumb({ src, alt }: { src: string; alt: string }) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      className="object-cover"
      sizes="(max-width: 1023px) 100vw, 60vw"
    />
  );
}

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
                <ProjectCard
                  key={project.id ?? `work-${rowIndex}-${i}`}
                  id={project.id}
                  projTitle={project.heading}
                  projSub={project.subheading}
                  visual={
                    project.img ? (
                      <WorkThumb
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
    </section>
  );
}
