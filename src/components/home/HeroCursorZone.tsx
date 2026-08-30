"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const HERO_CURSOR_HAND_SRC = "/icons/hand-cursor.svg";
const HERO_CURSOR_SCRATCH_SRC = "/icons/hand-scratching.gif";
const DOG_TARGET_SELECTOR = "[data-hero-dog-target]";
const HERO_CONTAINER_SELECTOR = "#hero-container";
const CURSOR_DISABLED_SELECTOR = "#hero-icon-row";

const HERO_ZONE_LAYOUT =
  "flex h-full min-h-0 w-full flex-row items-stretch gap-md";

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

    const hero = document.querySelector(HERO_CONTAINER_SELECTOR);
    if (!(hero instanceof HTMLElement)) return;
    hero.classList.add("cursor-none");

    return () => hero.classList.remove("cursor-none");
  }, [useCustomCursor]);

  useEffect(() => {
    if (!useCustomCursor) return;

    const handleMove = (e: MouseEvent) => {
      const root = document.querySelector(HERO_CONTAINER_SELECTOR);
      if (!root) return;
      const t = e.target;
      if (t instanceof Node && root.contains(t)) {
        const cursorDisabledArea = root.querySelector(CURSOR_DISABLED_SELECTOR);
        if (cursorDisabledArea?.contains(t)) {
          setInsideHero(false);
          setScratching(false);
          return;
        }

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
    const el = document.querySelector(HERO_CONTAINER_SELECTOR);
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
    return <div className={HERO_ZONE_LAYOUT}>{children}</div>;
  }

  return (
    <div
      ref={zoneRef}
      className={`${HERO_ZONE_LAYOUT} cursor-none [&_canvas]:cursor-none`}
    >
      {children}
      <div
        className={[
          "pointer-events-none fixed left-0 top-0 z-[var(--hero-follow-z)] w-[var(--hero-follow-w)] opacity-0 transition-opacity duration-[150ms] ease-in",
          insideHero ? "opacity-100" : "",
        ]
          .filter(Boolean)
          .join(" ")}
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
          className={[
            "block h-auto w-[var(--hero-follow-w)] translate-x-[var(--hero-follow-nudge-x)] translate-y-[var(--hero-follow-nudge-y)]",
            scratching ? "rotate-[30deg]" : "",
          ]
            .filter(Boolean)
            .join(" ")}
        />
      </div>
    </div>
  );
}
