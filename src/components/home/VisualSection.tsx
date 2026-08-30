import { homeProjects } from "@/data/home-projects";
import {
  FlowerDoodle,
  GrassDoodle,
} from "@/components/doodles";
import gallerySectionStyles from "@/components/gallery/GallerySectionReveal.module.css";
import { PageColumns } from "@/components/layout/PageColumns";
import { ProjectGallery } from "@/components/projects/ProjectGallery";
import { cn } from "@/lib/cn";

import styles from "./VisualSection.module.css";

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
      <ProjectGallery
        rows={homeProjects.visual.rows}
        sizes="(max-width: 1023px) 100vw, 50vw"
        className={gallerySectionStyles.sectionReveal}
      />
    </section>
  );
}
