import { HeroCursorZone } from "@/components/home/HeroCursorZone";
import { HeroRiveDog } from "@/components/home/HeroRiveDog";
import { HeroTypewriterTagline } from "@/components/home/HeroTypewriterTagline";
import { PageColumns } from "@/components/layout/PageColumns";
import { SocialLinks } from "@/components/ui/SocialLinks";
import {
  HERO_HEADLINE_PREFIX,
  HERO_TAGLINE_LONGEST,
} from "@/data/hero-text";

export function Hero() {
  return (
    <section
      id="hero-container"
      className="relative z-[60] flex min-h-[40vh] w-full flex-col justify-center pt-xl"
    >
      <PageColumns centerClassName="px-md">
        <section
          id="hero-box"
          className="relative flex flex-col overflow-visible"
          aria-label="Hero"
        >
          <div
            id="text-dog"
            className="flex w-full shrink-0 flex-row gap-xl overflow-visible max-md:flex-col"
          >
            <HeroCursorZone>
              <header className="flex min-w-0 flex-1 flex-col items-start justify-between text-left">
                <h1 className="type-hero-name grid min-w-0 text-pretty">
                  <span
                    className="invisible col-start-1 row-start-1 block min-w-0"
                    aria-hidden
                  >
                    <span className="text-text-default">{HERO_HEADLINE_PREFIX}</span>
                    <span className="text-text-subtle">{HERO_TAGLINE_LONGEST}</span>
                  </span>
                  <span className="col-start-1 row-start-1 block min-w-0">
                    <span className="text-text-default">{HERO_HEADLINE_PREFIX}</span>
                    <HeroTypewriterTagline className="text-text-subtle" />
                  </span>
                </h1>
                <SocialLinks
                  id="hero-icon-row"
                  className="flex w-fit flex-row items-start gap-8"
                />
              </header>
              <div className="flex shrink-0 items-start justify-end max-md:justify-center">
                <HeroRiveDog />
              </div>
            </HeroCursorZone>
          </div>
        </section>
        <div className="pt-md" aria-hidden />
      </PageColumns>
    </section>
  );
}
