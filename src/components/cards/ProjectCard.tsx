"use client";

import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

import styles from "./ProjectCard.module.css";
import { runScrambleAnimation } from "./scrambleSubhead";

type ProjectCardProps = {
  id?: string;
  className?: string;
  projTitle?: string;
  projSub?: string;
  /** Hover label: subtitle scrambles between `projSub` and this. */
  projSubDesc?: string;
  visual?: ReactNode;
};

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
  const displayRef = useRef(base);
  const [text, setText] = useState(base);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const onChange = () => setReduceMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!alternate) {
      setText(base);
      displayRef.current = base;
      return;
    }
    setText(base);
    displayRef.current = base;
  }, [base, alternate]);

  useEffect(() => {
    if (!alternate) return;

    if (reduceMotion) {
      const t = hovered ? alternate : base;
      setText(t);
      displayRef.current = t;
      return;
    }

    const from = displayRef.current;
    const to = hovered ? alternate : base;
    if (from === to) return;

    return runScrambleAnimation(from, to, (v) => {
      setText(v);
      displayRef.current = v;
    }, 500);
  }, [hovered, base, alternate, reduceMotion]);

  return <p className={className}>{text}</p>;
}

export function ProjectCard({
  id,
  className = "",
  projTitle = "Project Headline",
  projSub = "Subhead",
  projSubDesc,
  visual,
}: ProjectCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <article
      id={id}
      className={`${styles.reveal} flex h-full min-h-0 min-w-0 w-full flex-col items-start justify-end gap-[var(--space-s)] overflow-hidden pb-[var(--space-s)] ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative min-h-0 min-w-0 w-full flex-1 overflow-hidden">
        <div
          className={`${styles.visualShell} ${hovered ? styles.visualShellHovered : ""}`}
        >
          {visual ?? (
            <div
              className="absolute inset-0 bg-[var(--fill-placeholder)]"
              aria-hidden
            />
          )}
        </div>
      </div>
      <div className="flex w-full min-w-0 shrink-0 items-end gap-[var(--space-s)] whitespace-nowrap ">
        <p className="type-card-title shrink-0 text-default">
          {projTitle}
        </p>
        <ScrambledSubheading
          base={projSub}
          alternate={projSubDesc}
          hovered={hovered}
          className="type-card-subtitle shrink-0 text-subtle"
        />
      </div>
    </article>
  );
}
