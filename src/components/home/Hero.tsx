"use client";

import { HeroCursorZone } from "@/components/home/HeroCursorZone";
import { HeroRiveDog } from "@/components/home/HeroRiveDog";
import { HeroTypewriterTagline } from "@/components/home/HeroTypewriterTagline";
import { SocialLinks } from "@/components/ui/SocialLinks";
import {
  HERO_HEADLINE_PREFIX,
  HERO_TAGLINE_LONGEST,
} from "@/data/hero-text";

export function Hero() {
  return (
    <section
      id="hero-container"
      className="relative z-[60] flex w-full flex-col justify-end pt-[80px] h-auto min-h-[500px] "
    >
        <section
          id="hero-box"
          className="relative pg-w-90 flex flex-col overflow-visible px-md"
          aria-label="Hero"
        >
              <HeroCursorZone>
              <div
              id="text-dog"
              className="h-auto flex flex-row max-md:flex-col gap-xl w-full overflow-visible"
            >
                <header className="type-display grid min-w-0 max-w-[800px] flex-2 pt-md text-left">
                  <span
                    className="invisible col-start-1 row-start-1 block min-w-0"
                    aria-hidden
                  >
                    <span className="text-text-default">
                      {HERO_HEADLINE_PREFIX}
                    </span>
                    <span className="text-text-subtle">
                      {HERO_TAGLINE_LONGEST}
                    </span>
                  </span>
                  <span className="col-start-1 row-start-1 block min-w-0">
                    <span className="text-text-default">
                      {HERO_HEADLINE_PREFIX}
                    </span>
                    <HeroTypewriterTagline className="text-text-subtle" />
                  </span>
                </header>
                <div className="flex flex-1justify-center items-center">
                <HeroRiveDog />
                </div>
                </div>
              </HeroCursorZone>
          <div className="relative z-[1] flex min-h-0 w-full flex-row overflow-visible 
          max-lg:flex-none max-md:pt-xl">
                  <SocialLinks
                    id="hero-icon-row"
                    className="flex h-full min-h-0 w-fit flex-row items-start justify-end max-md:h-auto max-md:justify-start gap-8"
                  />
          </div>
        </section>
        <hr className="bottom-hr pg-w-90 pt-md" aria-hidden />
    </section>
  );
}
