"use client";

import { useState, type FocusEvent } from "react";

import { ProjectCard } from "@/components/cards/ProjectCard";
import {
  GalleryRow,
  type GalleryRowGap,
} from "@/components/gallery/GalleryRow";
import { HomeProjectVisual } from "@/components/gallery/HomeProjectVisual";
import { PageColumns } from "@/components/layout/PageColumns";
import {
  sortProjectsByIndex,
  type HomeGalleryRow,
  type HomeProjectItem,
} from "@/data/home-projects";
import { cn } from "@/lib/cn";

type ProjectGalleryProps = {
  rows: readonly HomeGalleryRow[];
  gap?: GalleryRowGap;
  sizes: string;
  className?: string;
};

/** Centered project rows with width and caption emphasis on hover/focus. */
export function ProjectGallery({
  rows,
  gap = "md",
  sizes,
  className,
}: ProjectGalleryProps) {
  const [emphasizedProject, setEmphasizedProject] =
    useState<HomeProjectItem | null>(null);
  const [sameRowHandoff, setSameRowHandoff] = useState(false);

  const activateProject = (project: HomeProjectItem, rowIndex: number) => {
    const currentRowIndex = emphasizedProject
      ? rows.findIndex((row) => row.projects.includes(emphasizedProject))
      : -1;

    setSameRowHandoff(
      currentRowIndex >= 0 && currentRowIndex === rowIndex,
    );
    setEmphasizedProject(project);
  };

  const clearWhenFocusLeaves = (event: FocusEvent<HTMLDivElement>) => {
    const next = event.relatedTarget;
    if (next instanceof Node && event.currentTarget.contains(next)) return;
    setSameRowHandoff(false);
    setEmphasizedProject(null);
  };

  return (
      <div
        className={cn("w-full min-w-0", className)}
        onMouseLeave={(event) => {
          if (event.currentTarget.contains(document.activeElement)) return;
          setSameRowHandoff(false);
          setEmphasizedProject(null);
        }}
        onBlurCapture={clearWhenFocusLeaves}
      >
        <div className="flex min-w-0 flex-col gap-md">
          {rows.map((row, rowIndex) => {
            const projects = sortProjectsByIndex(row.projects);
            const emphasizedIndex = projects.findIndex(
              (project) => project === emphasizedProject,
            );
            const columnCount = Math.max(projects.length, row.tracks.length);
            const tracks = Array.from({ length: columnCount }, (_, columnIndex) =>
              columnIndex === emphasizedIndex ? 1.1 : 1,
            );

            return (
              <PageColumns key={`${row.tracks.join("-")}-${rowIndex}`}>
                <div
                  className="min-w-0"
                  onMouseLeave={(event) => {
                    if (event.currentTarget.contains(document.activeElement)) {
                      return;
                    }
                    setSameRowHandoff(false);
                    setEmphasizedProject(null);
                  }}
                >
                  <GalleryRow tracks={tracks} measure="viewport" gap={gap}>
                    {projects.map((project, projectIndex) => (
                      <ProjectCard
                        key={project.id ?? `${rowIndex}-${projectIndex}`}
                        id={project.id}
                        title={project.heading}
                        date={project.subheading}
                        description={project.subheadDesc}
                        active={emphasizedProject === project}
                        dimmed={
                          emphasizedProject !== null &&
                          emphasizedProject !== project
                        }
                        delayCaptionCollapse={
                          sameRowHandoff && emphasizedProject !== project
                        }
                        onActivate={() => {
                          activateProject(project, rowIndex);
                        }}
                        visual={
                          <HomeProjectVisual project={project} sizes={sizes} />
                        }
                      />
                    ))}
                  </GalleryRow>
                </div>
              </PageColumns>
            );
          })}
        </div>
      </div>
  );
}
