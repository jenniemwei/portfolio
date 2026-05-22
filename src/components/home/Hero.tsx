"use client";

import type { CSSProperties } from "react";

import { GalleryRow } from "@/components/gallery/GalleryRow";
import { HeroCursorZone } from "@/components/home/HeroCursorZone";
import { HeroRiveDog } from "@/components/home/HeroRiveDog";
import { HeroTypewriterTagline } from "@/components/home/HeroTypewriterTagline";

import styles from "./Hero.module.css";

export function Hero() {
  return (
    <section id="hero-container" className="flex h-[90vh] w-screen shrink-0 flex-col items-center justify-center">

      <section id="hero-box"
        className="relative z-[60] box-border flex h-[80%] w-[60%] max-w-page-lg shrink-0 flex-col justify-start overflow-visible bg-white p-[3vw]"
        aria-label="Hero">
        <header id="hero-text" className="relative z-0 flex h-[40%] shrink-0 flex-col gap-md overflow-visible">
          <div>
            <p className="type-display max-w-[800px] overflow-visible">
              <span className="text-default">Jennie Wei is a product designer </span>
              <HeroTypewriterTagline className="text-subtle" />
            </p>
          </div>
          <div className="flex w-[50%] flex-col gap-sm">
            <p className="type-body-sm w-full text-subtle">
              Design HCI + Info Systems @ Carnegie Mellon
            </p>
          </div>
        </header>
        <div
          id="hero-gallery"
          className="relative z-[1] flex h-[60%] shrink-0 flex-col min-h-0 overflow-visible"
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
