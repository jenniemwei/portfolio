"use client";

import Link from "next/link";
import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

import styles from "./ProjectCard.module.css";

type ProjectCardProps = {
  id?: string;
  className?: string;
  href?: string;
  title?: string;
  date?: string;
  description?: string;
  visual?: ReactNode;
  active?: boolean;
  dimmed?: boolean;
  onActivate?: () => void;
};

const cardClass =
  "box-border flex w-full min-w-0 origin-center flex-col items-start rounded-xl";

/** Portfolio media card with a fixed-ratio visual and an active caption reveal. */
export function ProjectCard({
  id,
  className,
  href,
  title = "Project Headline",
  date = "",
  description,
  visual,
  active = false,
  dimmed = false,
  onActivate,
}: ProjectCardProps) {
  const isExternal = href?.startsWith("http://") || href?.startsWith("https://");
  const year = date.match(/\b\d{4}\b/)?.[0];
  const article = (
    <article
      id={id}
      className={cn(
        cardClass,
        styles.card,
        active && styles.cardActive,
        dimmed && styles.cardDimmed,
        className,
      )}
      onMouseEnter={onActivate}
      onFocus={onActivate}
      {...(!href ? { tabIndex: 0, "aria-label": title } : {})}
    >
      <div className={styles.mediaFrame}>
        <div
          className="absolute inset-0 origin-center overflow-hidden rounded-xl"
        >
          {visual ?? (
            <div className="absolute inset-0 bg-fill-default" aria-hidden />
          )}
        </div>
      </div>
      <div className={styles.caption}>
        <div data-caption-content className={styles.captionContent}>
        <div className="flex w-full items-baseline justify-between gap-3">
          <p className="type-body-bold m-0 min-w-0 text-[14px] text-text-default">
            {title}
          </p>
          {year ? (
            <p className="type-body m-0 shrink-0 text-[14px] text-text-subtle">
              {year}
            </p>
          ) : null}
        </div>
        {description || (!year && date) ? (
          <p className="type-body m-0 text-[14px] text-pretty text-text-subtle">
            {[description, !year && date].filter(Boolean).join(" ")}
          </p>
        ) : null}
        </div>
      </div>
    </article>
  );

  if (!href) return article;

  return (
    <Link
      href={href}
      className={cn(
        styles.cardLink,
        "rounded-xl text-inherit no-underline outline-none focus-visible:ring-2 focus-visible:ring-text-default focus-visible:ring-offset-2 focus-visible:ring-offset-fill-default",
      )}
      aria-label={`View ${title}`}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      onMouseEnter={onActivate}
      onFocus={onActivate}
    >
      {article}
    </Link>
  );
}
