"use client";

import type { CSSProperties } from "react";

import { GalleryRow } from "@/components/gallery/GalleryRow";
import { HeroCursorZone } from "@/components/home/HeroCursorZone";
import { HeroRiveDog } from "@/components/home/HeroRiveDog";
import { HeroTypewriterTagline } from "@/components/home/HeroTypewriterTagline";
import { SkyShader } from "@/components/home/SkyShader";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

import styles from "./Hero.module.css";

export function Hero() {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <section
      id="hero-container"
      className="relative flex h-[90vh] w-screen shrink-0 flex-col items-center justify-center overflow-hidden"
    >
      <SkyShader
        className="pointer-events-none absolute inset-0 z-0"
        paused={reduceMotion}
      />
      <div className={styles.heroSkyFade} aria-hidden />
      <section
        id="hero-box"
        className="relative z-[60] mx-auto box-border flex aspect-[4/3] h-[80%] max-h-[900px] min-w-0 max-w-page-lg shrink-0 flex-col justify-start overflow-visible rounded-lg bg-hero-box p-[3vw] lg:h-[70%]"
        aria-label="Hero"
      >
        <header
          id="hero-text"
          className="relative z-0 flex h-[40%] shrink-0 flex-col overflow-visible"
        >
          <div className={styles.heroTextBlock}>
            <p className="type-display max-w-[900px] overflow-visible">
              <span className="text-default">Jennie Wei is a product designer </span>
              <HeroTypewriterTagline className="text-subtle" />
            </p>
            <hr className={styles.heroTextRule} aria-hidden />
          </div>
        </header>
        <div
          id="hero-gallery"
          className="relative z-[1] flex h-[60%] min-h-0 shrink-0 flex-col overflow-visible"
        >
          <HeroCursorZone>
            <GalleryRow
              tracks={[1, 2]}
              measure="content"
              className="h-full min-h-0 overflow-visible max-md:items-center md:items-end md:grid-auto-rows-[minmax(0,1fr)]"
              cellClassName={(i) =>
                [
                  "w-full min-w-0 justify-self-stretch max-md:h-auto",
                  i === 0 ? "max-md:order-2" : "max-md:order-1",
                ].join(" ")
              }
            >
              <div id="hero-icon-row" className={styles.heroIconCell}>
                <div className={styles.heroIconRow}>
                  <a
                    href="mailto:jenniew@andrew.cmu.edu"
                    aria-label="Send email to Jennie Wei"
                    className={styles.heroIconLink}
                  >
                    <span
                      aria-hidden
                      className={styles.heroIconMask}
                      style={
                        { "--hero-icon-url": "url('/icons/email.svg')" } as CSSProperties
                      }
                    />
                  </a>
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
                      style={
                        {
                          "--hero-icon-url": "url('/icons/linkedin.svg')",
                        } as CSSProperties
                      }
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
                      style={
                        { "--hero-icon-url": "url('/icons/dog.svg')" } as CSSProperties
                      }
                    />
                  </a>
                </div>
              </div>
              <div className="flex min-h-0 w-full min-w-0 flex-col items-end justify-end overflow-visible max-md:h-auto max-md:items-center max-md:justify-start max-md:border-l-0 md:h-full">
                <HeroRiveDog />
              </div>
            </GalleryRow>
          </HeroCursorZone>
        </div>
      </section>
    </section>
  );
}
