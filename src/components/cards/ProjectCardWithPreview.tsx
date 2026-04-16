"use client";

import type { ReactNode } from "react";

import { ProjectCard } from "@/components/cards/ProjectCard";
import type { HomeProjectItem } from "@/data/home-projects";

import { useProjectPreview } from "./ProjectPreviewProvider";

type ProjectCardWithPreviewProps = {
  project: HomeProjectItem;
  visual?: ReactNode;
};

export function ProjectCardWithPreview({
  project,
  visual,
}: ProjectCardWithPreviewProps) {
  const { openPreview } = useProjectPreview();
  const href = project.projectHref;

  const card = (
    <ProjectCard
      id={project.id}
      projTitle={project.heading}
      projSub={project.subheading}
      projSubDesc={project.subheadDesc}
      visual={visual}
    />
  );

  if (!href) {
    return card;
  }

  const label = `Open ${project.heading} preview`;

  return (
    <div
      role="button"
      tabIndex={0}
      className="block h-full min-h-0 w-full cursor-pointer rounded-none border-0 bg-transparent p-0 text-left outline-none focus-visible:ring-2 focus-visible:ring-default focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
      onClick={() => openPreview(href)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openPreview(href);
        }
      }}
      aria-label={label}
    >
      {card}
    </div>
  );
}
