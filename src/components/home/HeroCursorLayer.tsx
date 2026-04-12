"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import styles from "./HeroCursorLayer.module.css";

export const HERO_CURSOR_HAND_SRC = "/icons/hand-cursor.svg";
export const HERO_CURSOR_SCRATCH_SRC = "/icons/hand-scratching.gif";

const DOG_TARGET_SELECTOR = "[data-hero-dog-target]";

type HeroCursorLayerProps = {
  children: ReactNode;
};

export function HeroCursorLayer({ children }: HeroCursorLayerProps) {
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

  if (!useCustomCursor) {
    return <>{children}</>;
  }

  return (
    <div ref={zoneRef} className={styles.zone}>
      {children}
      <div
        className={`${styles.follower} ${insideHero ? styles.followerVisible : ""}`}
        style={{
          transform: `translate(${coords.x}px, ${coords.y}px)`,
        }}
        aria-hidden
      >
        {/* GIF + SVG cursors: native <img> keeps GIF animation reliable (same as prior hero). */}
        {/* eslint-disable-next-line @next/next/no-img-element -- animated GIF + plain SVG */}
        <img
          src={
            scratching ? HERO_CURSOR_SCRATCH_SRC : HERO_CURSOR_HAND_SRC
          }
          alt=""
          decoding="async"
          className={styles.cursorGraphic}
        />
      </div>
    </div>
  );
}
