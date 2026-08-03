import type { HomeProjectItem } from "@/data/home-projects";
import { cn } from "@/lib/cn";

import styles from "./ProjectGallery.module.css";

type ProjectDetailRailProps = {
  project: HomeProjectItem | null;
};

/** Contextual project subheader aligned with its active gallery row. */
export function ProjectDetailRail({ project }: ProjectDetailRailProps) {
  return (
    <div className={styles.rail}>
      <div
        className={cn(
          styles.railContent,
          project && styles.railContentActive,
        )}
        aria-live="polite"
        aria-atomic="true"
      >
        {project ? (
          <div className="flex flex-col gap-xs">
            <p className="type-body-sm m-0 text-text-subtle">
              {project.subheading}
            </p>
            {project.subheadDesc ? (
              <p className="type-body-sm m-0 text-pretty text-text-subtle">
                {project.subheadDesc}
              </p>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}
