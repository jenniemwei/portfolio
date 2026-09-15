"use client";

import { useLayoutEffect, useRef, useState, type CSSProperties, type FocusEvent } from "react";

import { ProjectCard } from "@/components/cards/ProjectCard";
import { type GalleryRowGap } from "@/components/gallery/GalleryRow";
import { HomeProjectVisual } from "@/components/gallery/HomeProjectVisual";
import {
  sortProjectsByIndex,
  visualAspectRatio,
  type HomeGalleryRow,
  type HomeProjectItem,
} from "@/data/home-projects";
import { cn } from "@/lib/cn";

import styles from "./ProjectGallery.module.css";

type ProjectGalleryProps = {
  rows: readonly HomeGalleryRow[];
  gap?: GalleryRowGap;
  sizes: string;
  className?: string;
};

/** Full-width rows with weighted columns and independently sized row heights. */
export function ProjectGallery({
  rows,
  gap = "md",
  sizes,
  className,
}: ProjectGalleryProps) {
  const [emphasizedProject, setEmphasizedProject] =
    useState<HomeProjectItem | null>(null);

  const galleryRef = useRef<HTMLDivElement>(null);
  const animatedOffsets = useRef<number[]>([]);
  const activeRowIndex = rows.findIndex((row) => emphasizedProject && row.projects.includes(emphasizedProject));

  // Measure once on row entry, so switching siblings cannot change its footprint.
  useLayoutEffect(() => {
    const row = galleryRef.current?.querySelectorAll<HTMLElement>("[data-gallery-row]")[activeRowIndex];
    if (!row) return;
    const projects = rows[activeRowIndex].projects;
    const totalWeight = projects.reduce((sum, project) => sum + (project.widthWeight ?? 1), 0);
    const largestScale = Math.max(1, ...projects.map((project) =>
      1.1 * totalWeight / (totalWeight + (project.widthWeight ?? 1) * 0.1),
    ));
    const baseline = row.querySelector<HTMLElement>("[data-row-baseline]");
    const visualHeight = Math.max(0, (baseline?.getBoundingClientRect().height ?? 12) - 12);
    const captionHeight = Math.max(0, ...Array.from(row.querySelectorAll<HTMLElement>("[data-caption-content]"), (caption) => caption.scrollHeight));
    row.style.setProperty("--row-expanded-extra", `${visualHeight * (largestScale - 1) + captionHeight}px`);
  }, [activeRowIndex, rows]);

  useLayoutEffect(() => {
    const gallery = galleryRef.current;
    if (!gallery) return;
    const rowElements = Array.from(gallery.querySelectorAll<HTMLElement>("[data-gallery-row]"));
    const desktop = window.matchMedia("(min-width: 72.001rem) and (hover: hover)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;

    const animate = () => {
      cancelAnimationFrame(frame);
      if (!desktop.matches) {
        animatedOffsets.current = [];
        rowElements.forEach((row) => {
          row.style.removeProperty("--row-height-offset");
          row.querySelectorAll<HTMLElement>("[data-gallery-cell]").forEach((cell) => cell.style.removeProperty("--animated-media-height"));
        });
        return;
      }
      const expansion = activeRowIndex >= 0
        ? parseFloat(rowElements[activeRowIndex].style.getPropertyValue("--row-expanded-extra")) || 0
        : 0;
      const targets = rowElements.map((_, index) => activeRowIndex < 0 ? 0
        : index === activeRowIndex ? expansion : -expansion / Math.max(1, rowElements.length - 1));
      const starts = rowElements.map((_, index) => animatedOffsets.current[index] ?? 0);
      const media = rowElements.flatMap((row, index) => {
        const baseline = row.querySelector<HTMLElement>("[data-row-baseline]");
        const baseHeight = Math.max(0, (baseline?.getBoundingClientRect().height ?? 12) - 12);
        return Array.from(row.querySelectorAll<HTMLElement>("[data-gallery-cell]"), (cell) => {
          const frameElement = cell.querySelector("article")?.firstElementChild;
          const scale = parseFloat(cell.style.getPropertyValue("--project-hover-scale")) || 1;
          return { cell, start: frameElement?.getBoundingClientRect().height ?? baseHeight,
            target: Math.max(0, baseHeight * scale + Math.min(0, targets[index])) };
        });
      });
      const startTime = performance.now();
      // Match cubic-bezier(0.22, 1, 0.36, 1) used by the card width/caption.
      const ease = (progress: number) => {
        let low = 0, high = 1;
        for (let i = 0; i < 16; i++) {
          const t = (low + high) / 2;
          const x = 3 * (1 - t) ** 2 * t * 0.22 + 3 * (1 - t) * t * t * 0.36 + t ** 3;
          if (x < progress) low = t; else high = t;
        }
        return 1 - (1 - (low + high) / 2) ** 3;
      };
      const tick = (now: number) => {
        const progress = reducedMotion.matches ? 1 : Math.min(1, (now - startTime) / 400);
        const amount = progress === 1 ? 1 : ease(progress);
        rowElements.forEach((row, index) => {
          const offset = starts[index] + (targets[index] - starts[index]) * amount;
          animatedOffsets.current[index] = offset;
          row.style.setProperty("--row-height-offset", `${offset}px`);
        });
        media.forEach(({cell, start, target}) => cell.style.setProperty("--animated-media-height", `${start + (target - start) * amount}px`));
        if (progress < 1) frame = requestAnimationFrame(tick);
      };
      tick(startTime);
    };
    animate();
    window.addEventListener("resize", animate);
    desktop.addEventListener("change", animate);
    reducedMotion.addEventListener("change", animate);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", animate);
      desktop.removeEventListener("change", animate);
      reducedMotion.removeEventListener("change", animate);
    };
  }, [activeRowIndex, emphasizedProject, rows]);

  const clearEmphasis = () => setEmphasizedProject(null);
  const clearWhenFocusLeaves = (event: FocusEvent<HTMLDivElement>) => {
    const next = event.relatedTarget;
    if (next instanceof Node && event.currentTarget.contains(next)) return;
    clearEmphasis();
  };

  const style = {
    "--gallery-gap": `var(--spacing-${gap})`,
  } as CSSProperties;

  return (
    <div
      ref={galleryRef}
      className={cn(styles.gallery, className)}
      style={style}
      onMouseLeave={clearEmphasis}
      onBlurCapture={clearWhenFocusLeaves}
    >
      {rows.map((row, rowIndex) => {
        const ratioSum = row.projects.reduce(
          (sum, project) => sum + visualAspectRatio(project), 0,
        );
        const rowStyle = {
          "--gallery-visual-height": `min(400px, calc((100cqw - ${Math.max(0, row.projects.length - 1)} * var(--gallery-gap)) / ${ratioSum || 1}))`,
        } as CSSProperties;
        const weightSum = row.projects.reduce(
          (sum, project) => sum + (project.widthWeight ?? 1), 0,
        );
        const activeWeight = emphasizedProject && row.projects.includes(emphasizedProject)
          ? (emphasizedProject.widthWeight ?? 1)
          : 0;

        return (
        <div data-gallery-row data-row-active={rowIndex === activeRowIndex ? "true" : undefined} className={styles.row} key={rowIndex} style={rowStyle} onMouseLeave={clearEmphasis}>
          <div data-row-baseline className={styles.rowBaseline} aria-hidden />
          {sortProjectsByIndex(row.projects).map((project, projectIndex) => (
            <div
              data-gallery-cell
              className={cn(styles.cell, project.hidden && "invisible")}
              aria-hidden={project.hidden || undefined}
              key={project.id ?? `${rowIndex}-${projectIndex}`}
              style={{
                "--project-visual-ratio": visualAspectRatio(project),
                "--project-width-weight": project.widthWeight ?? 1,
                "--project-hover-weight": (project.widthWeight ?? 1)
                  * (emphasizedProject === project ? 1.1 : 1),
                "--project-hover-scale": (emphasizedProject === project ? 1.1 : 1)
                  * weightSum / (weightSum + activeWeight * 0.1),
              } as CSSProperties}
            >
              <ProjectCard
                id={project.id}
                href={project.href}
                title={project.heading}
                date={project.subheading}
                description={project.subheadDesc}
                active={emphasizedProject === project}
                dimmed={emphasizedProject !== null && emphasizedProject !== project}
                onActivate={() => setEmphasizedProject(project)}
                visual={<HomeProjectVisual project={project} sizes={sizes} />}
              />
            </div>
          ))}
        </div>
        );
      })}
    </div>
  );
}
