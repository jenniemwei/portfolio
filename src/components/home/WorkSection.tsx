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
    <section id="work" className="w-full py-xl">
      <div
        className={`mx-auto w-[95%] min-w-0 max-w-page-lg ${gallerySectionStyles.sectionReveal} flex flex-col gap-12 py-md`}
      >
        {homeProjects.work.rows.map((row, rowIndex) => (
          <GalleryRow
            key={`work-${row.tracks.join("-")}-${rowIndex}`}
            tracks={row.tracks}
            measure="viewport"
          >
            {sortProjectsByIndex(row.projects as readonly HomeProjectItem[]).map(
              (project, i) => (
                <ProjectCard
                  key={project.id ?? `work-${rowIndex}-${i}`}
                  id={project.id}
                  href={resolveProjectCardHref(project)}
                  projTitle={project.heading}
                  projTitleHover={project.subheadDesc}
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
    </section>
  );
}
