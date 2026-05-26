"use client";

import type { CSSProperties } from "react";

import { HeroCursorZone } from "@/components/home/HeroCursorZone";
import { HeroRiveDog } from "@/components/home/HeroRiveDog";
import { HeroTypewriterTagline } from "@/components/home/HeroTypewriterTagline";

const HERO_ICON_LINK_CLASS =
  "group inline-flex size-6 items-center justify-center origin-center rotate-0 outline-none transition-[transform,filter] duration-[350ms] ease-in-out hover:rotate-[30deg] hover:drop-shadow-[0_8px_16px_rgba(0,0,0,0.24)] focus-visible:rotate-[30deg] focus-visible:drop-shadow-[0_8px_16px_rgba(0,0,0,0.24)]";

const HERO_ICON_MASK_CLASS =
  "block size-6 aspect-square bg-text-secondary opacity-80 transition-opacity duration-[250ms] ease-in group-hover:opacity-100 group-focus-visible:opacity-100 [mask-image:var(--hero-icon-url)] [mask-repeat:no-repeat] [mask-position:center] [mask-size:contain] [-webkit-mask-image:var(--hero-icon-url)] [-webkit-mask-repeat:no-repeat] [-webkit-mask-position:center] [-webkit-mask-size:contain]";

const HERO_SOCIAL_LINKS = [
  {
    href: "mailto:jenniew@andrew.cmu.edu",
    label: "Send email to Jennie Wei",
    icon: "/icons/email.svg",
  },
  {
    href: "https://www.linkedin.com/in/jenniewei/",
    label: "LinkedIn profile",
    icon: "/icons/linkedin.svg",
    external: true,
  },
  {
    href: "https://drive.google.com/drive/folders/19OuC2GBTdKbCcStpXL2HzcYGEMkKCDvW",
    label: "Open dog assets folder",
    icon: "/icons/dog.svg",
    external: true,
  },
] as const;

function HeroSocialLinks() {
  return (
    <div
      id="hero-icon-row"
      className="flex h-full min-h-0 w-fit flex-row items-start justify-end max-md:h-auto max-md:justify-start gap-8"
    >
        {HERO_SOCIAL_LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            {...("external" in link && link.external
              ? { target: "_blank", rel: "noreferrer" }
              : {})}
            aria-label={link.label}
            className={HERO_ICON_LINK_CLASS}
          >
            <span
              aria-hidden
              className={HERO_ICON_MASK_CLASS}
              style={{ "--hero-icon-url": `url('${link.icon}')` } as CSSProperties}
            />
          </a>
        ))}
      </div>
  );
}

export function Hero() {
  return (
    <section
      id="hero-container"
      className="relative z-[60] flex w-full shrink-0 flex-col items-center justify-center pt-[80px] h-auto lg:h-[60vh]"
    >
        <section
          id="hero-box"
          className="relative pg-w-90 flex flex-col gap-md overflow-visible rounded-3xl p-md"
          aria-label="Hero"
        >
              <HeroCursorZone>
              <div
              id="text-dog"
              className="h-[var(--hero-text-dog-height)] flex flex-row justify-between w-full shrink-0 overflow-visible"
            >
                <header className="type-display max-w-[800px] flex flex-1 flex-col items-start justify-start text-left pt-lg">
                  <span className="text-text-default">Jennie Wei is a product designer </span>
                  <HeroTypewriterTagline className="text-left text-text-subtle" />
                </header>
                <HeroRiveDog />
                </div>
              </HeroCursorZone>
          <div className="relative z-[1] flex min-h-0 w-full flex-1 flex-row overflow-visible max-lg:flex-none lg:h-[60%]">
                  <HeroSocialLinks />
       
          </div>
          <hr className="bottom-hr" aria-hidden />
        </section>
    </section>
  );
}
