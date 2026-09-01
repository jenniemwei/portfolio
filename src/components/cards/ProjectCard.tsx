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
  delayCaptionCollapse?: boolean;
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
  delayCaptionCollapse = false,
  onActivate,
}: ProjectCardProps) {
  const isExternal = href?.startsWith("http://") || href?.startsWith("https://");
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
      <div
        className={cn(
          styles.caption,
          delayCaptionCollapse && styles.captionCollapseDelayed,
        )}
      >
        <p className="type-body-bold m-0 text-text-default">
          {title}
        </p>
        {description || date ? (
          <p className="type-body-sm m-0 text-pretty text-text-subtle">
            {[description, date].filter(Boolean).join(" ")}
          </p>
        ) : null}
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
