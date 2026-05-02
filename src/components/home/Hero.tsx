"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";

import { GalleryRow } from "@/components/gallery/GalleryRow";
import { HeroRiveDog } from "@/components/home/HeroRiveDog";

import styles from "./Hero.module.css";

const HERO_CURSOR_HAND_SRC = "/icons/hand-cursor.svg";
const HERO_CURSOR_SCRATCH_SRC = "/icons/hand-scratching.gif";
const DOG_TARGET_SELECTOR = "[data-hero-dog-target]";

/** Hero: from `md`, section is at least `--hero-min-height`; top band flexes with a 400px floor. */
export function Hero() {
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

  /**
   * Scroll does not emit mousemove — if the pointer stays fixed while the hero scrolls away,
   * `insideHero` would stay true and the hand follower would remain visible. Clear when the
   * hero zone is not intersecting the viewport (any amount hidden = treat as out of view for
   * the cursor chrome; pointer target checks still gate showing it again).
   */
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

  const heroSection = (
    <section
      className="relative z-[60] flex h-auto min-h-0 w-full flex-col overflow-visible md:min-h-[var(--hero-min-height)]"
      aria-label="Hero"
    >
      <div className="relative z-[1] flex min-h-0 max-md:flex-none flex-col overflow-visible md:min-h-[400px] md:flex-1">
        <GalleryRow
          tracks={[6, 4]}
          measure="content"
          className="min-h-0 overflow-visible max-md:h-auto md:flex-1 md:grid-auto-rows-[minmax(0,1fr)]"
          cellClassName={(i) =>
            [
              "w-full min-w-0 justify-self-stretch",
              i === 0 ? "max-md:hidden" : "",
            ]
              .filter(Boolean)
              .join(" ")
          }
        >
          <div className="relative min-h-0 w-full max-md:h-auto md:h-full">
            <div className={styles.heroIconRow}>
              <a
                href="https://www.linkedin.com/in/jenniewei/"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn profile"
                className={styles.heroIconLink}
              >
                <span
                  aria-hidden
                  className={styles.heroIconMask}
                  style={{ "--hero-icon-url": "url('/icons/linkedin.svg')" } as CSSProperties}
                />
              </a>
              <a
                href="mailto:jenniew@andrew.cmu.edu"
                aria-label="Send email to Jennie Wei"
                className={styles.heroIconLink}
              >
                <span
                  aria-hidden
                  className={styles.heroIconMask}
                  style={{ "--hero-icon-url": "url('/icons/email.svg')" } as CSSProperties}
                />
              </a>
              <a
                href="https://drive.google.com/drive/folders/19OuC2GBTdKbCcStpXL2HzcYGEMkKCDvW"
                target="_blank"
                rel="noreferrer"
                aria-label="Open dog assets folder"
                className={styles.heroIconLink}
              >
                <span
                  aria-hidden
                  className={styles.heroIconMask}
                  style={{ "--hero-icon-url": "url('/icons/dog.svg')" } as CSSProperties}
                />
              </a>
            </div>
          </div>
          <div className="flex min-h-0 w-full min-w-0 flex-col items-end justify-end overflow-visible p-[var(--space-lg)] max-md:h-auto max-md:border-l-0 md:h-full">
            <HeroRiveDog />
          </div>
        </GalleryRow>
      </div>
      <header className="relative z-0 shrink-0 border-solid border-line border-y-[length:var(--hero-border-width)] pt-[var(--space-lg)] pb-[var(--space-xl)] md:min-h-[30vh]">
        <GalleryRow tracks={[3, 7]} measure="content">
          <div className="flex flex-col gap-[var(--space-s)] w-[50%]">
            {/* <div className="type-body-sm w-full space-y-0">
              <p className="text-default">Incoming @ Superhuman </p>
            </div> */}
            <p className="type-body-sm w-full text-subtle">
              Design HCI + Info Systems @ Carnegie Mellon
            </p>
          </div>
          <div>
            <p className="type-display">
              <span className="text-default">Jennie Wei is a product designer </span>
              <span className="text-subtle">
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
