import { homeProjects, type HomeProjectItem } from "@/data/home-projects";
import {
  FlowerDoodle,
  GrassDoodle,
} from "@/components/doodles";
import { PageColumns } from "@/components/layout/PageColumns";
import { VisualAccordionGallery } from "@/components/projects/VisualAccordionGallery";
import { cn } from "@/lib/cn";

import styles from "./VisualSection.module.css";

const visualProjects = homeProjects.visual.rows.flatMap((row) =>
  row.projects.map((project: HomeProjectItem) => ({
    id: project.id ?? project.heading,
    heading: project.heading,
    href: project.href,
    visuals: [
      ...(project.video || project.img ? [{
          id: `${project.id ?? project.heading}-primary`,
          alt: project.video ? `${project.heading} reel` : project.imgAlt ?? project.heading,
          subtitle: project.visualSubtitle,
          video: project.video,
          src: project.img ?? undefined,
          fill: project.videoThumbBg,
          fit: project.videoThumbFit,
      }] : []),
      ...(project.additionalVisuals ?? []),
    ].filter((visual) => visual.src || visual.video),
  })),
);

export function VisualSection() {
  return (
    <section id="visual" className="w-full py-xl">
      <PageColumns centerClassName="px-md sm:px-[3vw]">
        <div className="layout-fluid pb-md">
          <div className="grid w-full grid-cols-6 items-center gap-x-sm gap-y-sm py-xl">
            <p className="type-display col-span-6 text-text-default md:col-span-4">
              who also loves visual design...
            </p>
            <div
              className={styles.doodleField}
              data-visual-doodles
              aria-hidden="true"
            >
              <GrassDoodle
                className={cn(styles.doodle, styles.grassUpper)}
                frameInterval={640}
                swayDelay={-1700}
                swayDuration={9800}
              />
              <FlowerDoodle
                className={cn(styles.doodle, styles.flowerLower)}
                frameInterval={830}
                swayDelay={-5600}
                swayDuration={11400}
              />
            </div>
          </div>
        </div>
      </PageColumns>
      <VisualAccordionGallery projects={visualProjects} />
    </section>
  );
}
