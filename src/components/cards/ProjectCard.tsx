"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";

import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

import styles from "./ProjectCard.module.css";
import { runScrambleAnimation } from "./scrambleSubhead";

type ProjectCardProps = {
  id?: string;
  className?: string;
  href?: string;
  projTitle?: string;
  projTitleHover?: string;
  visual?: ReactNode;
};

const cardClass =
  "box-border flex h-full min-h-[max(var(--gallery-row-min-height),var(--gallery-row-height))] w-full min-w-0 flex-col items-start justify-end gap-xs overflow-hidden pb-sm origin-center";

/**
 * Animated title — mounts fresh when copy changes (`key`), so scramble state resets without a sync sync effect.
 * Updates React state only from rAF callback (acceptable to the exhaustive-deps linter rules in this project).
 */
function ScrambleAnimatedHeading({
  base,
  alternate,
  hovered,
  className,
}: {
  base: string;
  alternate: string;
  hovered: boolean;
  className?: string;
}) {
  const displayRef = useRef(base);
  const [text, setText] = useState(base);

  useEffect(() => {
    const from = displayRef.current;
    const to = hovered ? alternate : base;
    if (from === to) return;
    return runScrambleAnimation(from, to, (v) => {
      displayRef.current = v;
      setText(v);
    }, 500);
  }, [hovered, alternate, base]);

  return <p className={className}>{text}</p>;
}

/** Title text with optional scramble on hover (`projTitleHover`). */
function ScrambledHeading({
  base,
  alternate,
  hovered,
  className,
}: {
  base: string;
  alternate?: string;
  hovered: boolean;
  className?: string;
}) {
  const reduceMotion = usePrefersReducedMotion();

  if (!alternate) {
    return <p className={className}>{base}</p>;
  }

  if (reduceMotion) {
    return (
      <p className={className}>{hovered ? alternate : base}</p>
    );
  }

  return (
    <ScrambleAnimatedHeading
      key={`${base}::${alternate}`}
      base={base}
      alternate={alternate}
      hovered={hovered}
      className={className ?? ""}
    />
  );
}

/**
 * Portfolio grid card — one media region (video / image / both) + one title row.
 *
 * Hover: `group-hover` siblings in `GalleryVideoHoverThumb`; shell scale on the visual layer.
 */
export function ProjectCard({
  id,
  className = "",
  href,
  projTitle = "Project Headline",
  projTitleHover,
  visual,
}: ProjectCardProps) {
  const [hovered, setHovered] = useState(false);

  const article = (
    <article
      id={id}
      className={`${cardClass} ${styles.cardScrollReveal} group ${className}`.trim()}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative min-h-0 w-full flex-[1_1_0]">
        <div
          className={`absolute inset-0 origin-center overflow-hidden opacity-100 transition-[transform,opacity] duration-200 motion-reduce:transition-none ${hovered ? "scale-[0.98] opacity-70" : ""
            }`}
        >
          {visual ?? (
            <div
              className="absolute inset-0 bg-g3"
              aria-hidden
            />
          )}
        </div>
      </div>
      <ScrambledHeading
        base={projTitle}
        alternate={projTitleHover}
        hovered={hovered}
        className="type-body-bold w-full min-w-0 shrink-0 text-default"
      />
    </article>
  );

  if (!href) {
    return article;
  }

  return (
    <Link
      href={href}
      className={`${styles.cardLink} rounded-none text-inherit no-underline outline-none focus-visible:ring-2 focus-visible:ring-default focus-visible:ring-offset-2 focus-visible:ring-offset-canvas`}
      aria-label={`View ${projTitle}`}
    >
      {article}
    </Link>
  );
}
