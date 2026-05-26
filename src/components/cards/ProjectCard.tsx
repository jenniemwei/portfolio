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
  projSub?: string;
  /** Hover: subhead scrambles between `projSub` and this. */
  projSubDesc?: string;
  visual?: ReactNode;
};

const cardClass =
  "box-border flex h-full min-h-[max(var(--gallery-row-min-height),var(--gallery-row-height))] w-full min-w-0 flex-col items-start justify-end gap-xs overflow-hidden pb-sm origin-center";

function ScrambleAnimatedSubhead({
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

/** Subhead with optional scramble on hover (`projSubDesc`). */
function ScrambledSubheading({
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
    return <p className={className}>{hovered ? alternate : base}</p>;
  }

  return (
    <ScrambleAnimatedSubhead
      key={`${base}::${alternate}`}
      base={base}
      alternate={alternate}
      hovered={hovered}
      className={className ?? ""}
    />
  );
}

/**
 * Portfolio grid card — media + title row (heading + subtle subhead).
 *
 * Hover: visual scale/opacity; subhead scrambles from `projSub` → `projSubDesc` when set.
 * Scroll scale: `GalleryRow` `.rowScrollReveal` (row-level), not on the card.
 */
export function ProjectCard({
  id,
  className = "",
  href,
  projTitle = "Project Headline",
  projSub = "Subhead",
  projSubDesc,
  visual,
}: ProjectCardProps) {
  const [hovered, setHovered] = useState(false);

  const article = (
    <article
      id={id}
      className={`${cardClass} group ${className}`.trim()}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative min-h-0 w-full flex-[1_1_0]">
        <div
          className={`absolute inset-0 origin-center overflow-hidden rounded-sm opacity-100 transition-[transform,opacity] duration-200 motion-reduce:transition-none ${
            hovered ? "scale-[0.98] opacity-70" : ""
          }`}
        >
          {visual ?? (
            <div className="absolute inset-0 bg-fill-default" aria-hidden />
          )}
        </div>
      </div>
      <div className="flex w-full min-w-0 shrink-0 items-end gap-xs whitespace-nowrap">
        <p className="type-body-bold shrink-0 text-text-default">{projTitle}</p>
        <ScrambledSubheading
          base={projSub}
          alternate={projSubDesc}
          hovered={hovered}
          className="type-body min-w-0 shrink-0 text-text-subtle"
        />
      </div>
    </article>
  );

  if (!href) {
    return article;
  }

  return (
    <Link
      href={href}
      className={`${styles.cardLink} rounded-none text-inherit no-underline outline-none focus-visible:ring-2 focus-visible:ring-text-default focus-visible:ring-offset-2 focus-visible:ring-offset-fill-default`}
      aria-label={`View ${projTitle}`}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
    >
      {article}
    </Link>
  );
}
