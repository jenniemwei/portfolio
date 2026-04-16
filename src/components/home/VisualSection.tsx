import {
  homeProjects,
  type HomeProjectItem,
} from "@/data/home-projects";
import { GalleryRow } from "@/components/gallery/GalleryRow";
import { GalleryThumbImage } from "@/components/gallery/GalleryThumbImage";
import { GalleryVideoThumb } from "@/components/gallery/GalleryVideoThumb";
import gallerySectionStyles from "@/components/gallery/GallerySectionReveal.module.css";
import { ProjectCard } from "@/components/cards/ProjectCard";

export function VisualSection() {
  return (
    <section id="visual" className="w-full">
      <div className="grid w-full grid-cols-6 gap-x-[var(--intro-grid-gap)] gap-y-[var(--intro-grid-gap)] border-line border-y border-solid py-[var(--space-xl)]">
        <p className="type-display col-span-6 text-default md:col-span-4">
          who also loves visual design...
        </p>
      </div>
      {/* <SectionHeader title="Visual" /> */}
      <div
        className={`${gallerySectionStyles.sectionReveal} flex w-full flex-col gap-[var(--space-32)] py-[var(--space-m)]`}
      >
        {homeProjects.visual.rows.map((row, rowIndex) => (
          <GalleryRow key={`visual-${row.variant}-${rowIndex}`} variant={row.variant}>
            {(row.projects as readonly HomeProjectItem[]).map(
              (project, i) => (
                <ProjectCard
                  key={project.id ?? `visual-${rowIndex}-${i}`}
                  id={project.id}
                  projTitle={project.heading}
                  projSub={project.subheading}
                  projSubDesc={project.subheadDesc}
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
                        sizes="(max-width: 1023px) 100vw, 50vw"
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
