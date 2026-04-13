"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { GalleryRow } from "@/components/sitewide/GalleryRow";
import { HeroRiveDog } from "@/components/home/HeroRiveDog";

import styles from "./HeroVis.module.css";

const HERO_CURSOR_HAND_SRC = "/icons/hand-cursor.svg";
const HERO_CURSOR_SCRATCH_SRC = "/icons/hand-scratching.gif";
const DOG_TARGET_SELECTOR = "[data-hero-dog-target]";

/**
 * Hero band (75vh): Rive visual + intro, with optional fine-pointer custom cursor in-zone.
 */
export function HeroVis() {
  const zoneRef = useRef<HTMLDivElement>(null);
  const [useCustomCursor, setUseCustomCursor] = useState(false);
  const [insideHero, setInsideHero] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [scratching, setScratching] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine) and (hover: hover)");
    const apply = () => setUseCustomCursor(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  /**
   * Rive attaches listeners on the canvas and often stops `mousemove` from bubbling, so the zone
   * never sees moves over the dog. Capture on `document` runs first and keeps the follower in sync.
   */
  useEffect(() => {
    if (!useCustomCursor) return;

    const handleMove = (e: MouseEvent) => {
      const root = zoneRef.current;
      if (!root) return;
      const t = e.target;
      if (t instanceof Node && root.contains(t)) {
        setInsideHero(true);
        setCoords({ x: e.clientX, y: e.clientY });
        const dog = root.querySelector(DOG_TARGET_SELECTOR);
        if (dog instanceof HTMLElement) {
          const r = dog.getBoundingClientRect();
          setScratching(
            e.clientX >= r.left &&
            e.clientX <= r.right &&
            e.clientY >= r.top &&
            e.clientY <= r.bottom,
          );
        } else {
          setScratching(false);
        }
      } else {
        setInsideHero(false);
        setScratching(false);
      }
    };

    document.addEventListener("mousemove", handleMove, true);
    return () => document.removeEventListener("mousemove", handleMove, true);
  }, [useCustomCursor]);

  const heroSection = (
    <section
      className="flex h-[75vh] min-h-0 w-full flex-col overflow-visible"
      aria-label="Hero"
    >
      <div className="flex min-h-0 flex-1 flex-col overflow-visible">
        <GalleryRow
          variant="60-40"
          measure="content"
          className="h-full min-h-0 overflow-visible"
          cellClassName={(i) => (i === 0 ? "max-[900px]:hidden" : undefined)}
        >
          <div className="min-h-0" aria-hidden />
          <div className="flex h-full min-h-0 flex-col items-center justify-end overflow-visible border-border-default border-l border-solid p-[var(--space-m)] max-[900px]:border-l-0">
            <div className="relative w-full min-w-0 overflow-visible">
              <HeroRiveDog />
            </div>
          </div>
        </GalleryRow>
      </div>
      <header className="shrink-0 border-border-default border-t border-solid pt-[var(--space-lg)] pb-[var(--space-xl)]">
        <GalleryRow variant="30-70" measure="content">
          <div className="flex flex-col gap-[var(--space-intro-credentials)] p-[var(--space-s)]">
            <div className="w-full space-y-0 [font:var(--text-intro-meta-font)] [letter-spacing:var(--text-intro-meta-letter-spacing)]">
              <p className="text-text-default">Incoming @ Superhuman </p>
            </div>
            <p className="w-full [font:var(--text-intro-meta-font)] [letter-spacing:var(--text-intro-meta-letter-spacing)] text-text-subtle">
              Design HCI + Info Systems @ Carnegie Mellon
            </p>
          </div>
          <div>
            <p className="leading-[var(--lead-base)] [font:var(--text-display-title-font)] [letter-spacing:var(--text-display-title-letter-spacing)]">
              <span className="text-text-default">Jennie Wei is a product designer </span>
              <span className="text-text-subtle">
                creating with intention, curiosity, and a drive to understand people.
              </span>
            </p>
          </div>
        </GalleryRow>
      </header>
    </section>
  );

  if (!useCustomCursor) {
    return heroSection;
  }

  return (
    <div ref={zoneRef} className={styles.zone}>
      {heroSection}
      <div
        className={`${styles.follower} ${insideHero ? styles.followerVisible : ""}`}
        style={{
          transform: `translate(${coords.x}px, ${coords.y}px)`,
        }}
        aria-hidden
      >
        <Image
          key={scratching ? "scratch" : "hand"}
          src={scratching ? HERO_CURSOR_SCRATCH_SRC : HERO_CURSOR_HAND_SRC}
          alt=""
          width={256}
          height={256}
          unoptimized
          className={`${styles.cursorGraphic}${scratching ? ` ${styles.cursorGraphicScratching}` : ""}`}
        />
      </div>
    </div>
  );
}
