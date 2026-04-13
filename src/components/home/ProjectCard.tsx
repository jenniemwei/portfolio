import type { ReactNode } from "react";

import styles from "./ProjectCard.module.css";

type ProjectCardProps = {
  id?: string;
  className?: string;
  projTitle?: string;
  projSub?: string;
  visual?: ReactNode;
};

export function ProjectCard({
  id,
  className = "",
  projTitle = "Project Headline",
  projSub = "Subhead",
  visual,
}: ProjectCardProps) {
  return (
    <article
      id={id}
      className={`${styles.reveal} flex h-full min-h-0 flex-col items-start justify-end gap-[var(--space-s)] overflow-hidden pb-[var(--space-s)] ${className}`}
    >
      <div className="relative min-h-0 w-full flex-1 overflow-hidden">
        {visual ?? (
          <div
            className="absolute inset-0 bg-[var(--fill-placeholder)]"
            aria-hidden
          />
        )}
      </div>
      <div className="flex w-full shrink-0 items-end gap-[var(--space-s)] whitespace-nowrap px-[var(--space-s)]">
        <p className="type-card-title shrink-0 text-default">
          {projTitle}
        </p>
        <p className="type-card-subtitle shrink-0 text-subtle">
          {projSub}
        </p>
      </div>
    </article>
  );
}
