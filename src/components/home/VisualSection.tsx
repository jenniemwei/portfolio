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

export function VisualSection() {
  return (
    <section id="visual" className="w-full py-xl">
      <div className="mx-auto w-[95%] min-w-0 max-w-page-lg">
        <div className="grid w-full grid-cols-6 gap-x-sm gap-y-sm border-line border-y border-solid py-xl">
          <p className="type-display col-span-6 text-default md:col-span-4">
            who also loves visual design...
          </p>
        </div>
        <div
          className={`${gallerySectionStyles.sectionReveal} flex flex-col gap-12 py-md`}
        >
          {homeProjects.visual.rows.map((row, rowIndex) => (
            <GalleryRow
              key={`visual-${row.tracks.join("-")}-${rowIndex}`}
              tracks={row.tracks}
              measure="viewport"
            >
              {sortProjectsByIndex(row.projects as readonly HomeProjectItem[]).map(
                (project, i) => (
                  <ProjectCard
                    key={project.id ?? `visual-${rowIndex}-${i}`}
                    id={project.id}
                    href={resolveProjectCardHref(project)}
                    projTitle={project.heading}
                    projTitleHover={project.subheadDesc}
                    visual={
                      <HomeProjectVisual
                        project={project}
                        sizes="(max-width: 1023px) 100vw, 50vw"
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
