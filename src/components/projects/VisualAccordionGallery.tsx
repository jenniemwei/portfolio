"use client";

import type { StaticImageData } from "next/image";
import { useState, type CSSProperties } from "react";

import { GalleryProjectVisual } from "@/components/gallery/GalleryProjectVisual";

import styles from "./VisualAccordionGallery.module.css";

export type VisualGalleryProject = {
  id: string;
  heading: string;
  href?: string;
  visuals: readonly {
    id: string;
    alt: string;
    subtitle?: string;
    src?: string | StaticImageData;
    video?: string;
    fill?: string;
    fit?: "contain" | "cover";
  }[];
};

function VisualAccordionRow({ project }: { project: VisualGalleryProject }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [playbackKey, setPlaybackKey] = useState(0);
  const activeSubtitle = project.visuals[activeIndex]?.subtitle?.trim() ?? "";
  const hasSubtitles = project.visuals.some((visual) => visual.subtitle?.trim());

  return (
    <figure className={styles.project}>
      <div
        className={styles.row}
        style={{ "--visual-count": project.visuals.length } as CSSProperties}
        role="group"
        aria-label={`${project.heading} visuals`}
      >
        {project.visuals.map((visual, index) => (
          <button
            key={visual.id}
            type="button"
            className={styles.visual}
            data-active={index === activeIndex}
            aria-label={`Show ${visual.alt}, ${index + 1} of ${project.visuals.length}`}
            aria-pressed={index === activeIndex}
            onPointerEnter={(event) => {
              if (event.pointerType !== "touch" && window.matchMedia("(min-width: 48.001rem)").matches) {
                setActiveIndex(index);
                setPlaybackKey((key) => key + 1);
              }
            }}
            onFocus={() => setActiveIndex(index)}
            onClick={() => setActiveIndex(index)}
          >
            <span className={styles.media}>
              <GalleryProjectVisual
                img={visual.src}
                video={visual.video}
                active={index === activeIndex}
                playbackKey={index === activeIndex ? playbackKey : 0}
                label={visual.alt}
                fill={visual.fill}
                fit={visual.fit}
                sizes="(max-width: 768px) 80vw, (max-width: 1250px) 56vw, 700px"
              />
            </span>
          </button>
        ))}
      </div>
      <figcaption className={styles.caption}>
        <span className={styles.captionTitle}>
          {project.href ? <a href={project.href}>{project.heading}</a> : project.heading}
        </span>
        {hasSubtitles ? (
          <span className={styles.subtitle}>
            <span aria-hidden="true" className={!activeSubtitle ? styles.subtitleSizer : undefined}>/</span>
            <span className={styles.subtitleText}>
              {/* Reserve the tallest caption so switching assets never shifts the next row. */}
              {project.visuals.map((visual) => (
                <span key={visual.id} className={styles.subtitleSizer} aria-hidden="true">
                  {visual.subtitle?.trim()}
                </span>
              ))}
              <span className={styles.subtitleValue} aria-live="polite" aria-atomic="true">
                {activeSubtitle}
              </span>
            </span>
          </span>
        ) : null}
      </figcaption>
    </figure>
  );
}

export function VisualAccordionGallery({
  projects,
}: {
  projects: readonly VisualGalleryProject[];
}) {
  return (
    <div
      className={styles.gallery}
      style={{ "--max-visual-count": Math.max(1, ...projects.map((project) => project.visuals.length)) } as CSSProperties}
    >
      {projects.filter((project) => project.visuals.length > 0).map((project) => (
        <VisualAccordionRow key={project.id} project={project} />
      ))}
    </div>
  );
}
