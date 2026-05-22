"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import styles from "./Hero.module.css";

const HERO_CURSOR_HAND_SRC = "/icons/hand-cursor.svg";
const HERO_CURSOR_SCRATCH_SRC = "/icons/hand-scratching.gif";
const DOG_TARGET_SELECTOR = "[data-hero-dog-target]";

type HeroCursorZoneProps = {
  children: React.ReactNode;
};

export function HeroCursorZone({ children }: HeroCursorZoneProps) {
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

  useEffect(() => {
    if (!useCustomCursor) return;
    const el = zoneRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          setInsideHero(false);
          setScratching(false);
        }
      },
      { threshold: 0 },
    );
    io.observe(el);
    return () => io.disconnect();
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
