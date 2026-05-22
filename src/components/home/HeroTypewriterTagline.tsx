"use client";

import { useEffect, useRef, useState } from "react";

import {
  runTypewriterTransition,
  typewriterTransitionDuration,
} from "@/components/home/heroTypewriter";
import { HERO_TAGLINES } from "@/data/hero-text";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const HOLD_MS = 4500;
const TYPEWRITER_OPTS = {
  deleteMsPerChar: 28,
  typeMsPerChar: 28,
  pauseMs: 100,
} as const;

/** Cycles hero taglines with letter-by-letter delete, then retype. */
export function HeroTypewriterTagline({ className }: { className?: string }) {
  const reduceMotion = usePrefersReducedMotion();
  const displayRef = useRef<string>(HERO_TAGLINES[0]);
  const [text, setText] = useState<string>(HERO_TAGLINES[0]);

  useEffect(() => {
    if (reduceMotion) {
      let index = 0;
      const id = window.setInterval(() => {
        index = (index + 1) % HERO_TAGLINES.length;
        const next = HERO_TAGLINES[index]!;
        displayRef.current = next;
        setText(next);
      }, HOLD_MS);
      return () => window.clearInterval(id);
    }

    let index = 0;
    let timeout = 0;
    let cancelTypewriter: (() => void) | undefined;

    const transitionTo = (nextIndex: number) => {
      const next = HERO_TAGLINES[nextIndex]!;
      const from = displayRef.current;
      if (from === next) {
        scheduleHold(nextIndex);
        return;
      }

      cancelTypewriter = runTypewriterTransition(
        from,
        next,
        (value) => {
          displayRef.current = value;
          setText(value);
        },
        TYPEWRITER_OPTS,
      );

      timeout = window.setTimeout(() => {
        index = nextIndex;
        displayRef.current = next;
        scheduleHold(index);
      }, typewriterTransitionDuration(from, next, TYPEWRITER_OPTS));
    };

    const scheduleHold = (current: number) => {
      timeout = window.setTimeout(() => {
        transitionTo((current + 1) % HERO_TAGLINES.length);
      }, HOLD_MS);
    };

    scheduleHold(0);

    return () => {
      window.clearTimeout(timeout);
      cancelTypewriter?.();
    };
  }, [reduceMotion]);

  return (
    <span className={className} aria-live="polite">
      {text}
    </span>
  );
}
