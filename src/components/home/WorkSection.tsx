import {
  homeProjects,
  sortProjectsByIndex,
  type HomeProjectItem,
} from "@/data/home-projects";
import { GalleryRow } from "@/components/gallery/GalleryRow";
import { HomeProjectVisual } from "@/components/gallery/HomeProjectVisual";
import gallerySectionStyles from "@/components/gallery/GallerySectionReveal.module.css";
import { ProjectCard } from "@/components/cards/ProjectCard";
import { resolveProjectCardHref } from "@/data/project-pages";

export function WorkSection() {
  return (
    <section id="work" className="w-full py-md">
      <div className="pg-w-xl">
        <div
          className={`${gallerySectionStyles.sectionReveal} flex w-full min-w-0 flex-col gap-md`}
        >
          {homeProjects.work.rows.map((row, rowIndex) => (
            <GalleryRow
              key={`work-${row.tracks.join("-")}-${rowIndex}`}
              tracks={row.tracks}
              measure="viewport"
              gap="md"
            >
              {sortProjectsByIndex(row.projects as readonly HomeProjectItem[]).map(
                (project, i) => (
                  <ProjectCard
                    key={project.id ?? `work-${rowIndex}-${i}`}
                    id={project.id}
                    href={resolveProjectCardHref(project)}
                    projTitle={project.heading}
                    projSub={project.subheading}
                    projSubDesc={project.subheadDesc}
                    visual={
                      <HomeProjectVisual
                        project={project}
                        sizes="(max-width: 1023px) 100vw, 60vw"
                      />
                    }
                  />
                ),
              )}
            </GalleryRow>
          ))}
        </div>
      </div>
    </section>
  );
}
