import type { CaseStudyHeroBlock } from "@/data/case-studies/types";

import { ProjOverview } from "./Overview";
import { ProjHeroGallery } from "./ProjHeroGallery";

export type ProjHeroProps = {
  hero: CaseStudyHeroBlock;
};

/**
 * Case-study hero: gallery strip → rule + full-width title → intro (30–70 specs | description).
 * Route usage: `projPageRouteRegistry` in `projPageRouteRegistry.ts`.
 */
export function ProjHero({ hero }: ProjHeroProps) {
  return (
    <header className="flex w-full flex-col gap-[var(--space-xl)]">
      <ProjHeroGallery heroGallery={hero.heroGallery} />

      <div className="flex w-full flex-col gap-[var(--space-m)]">
        <hr className="m-0 w-full border-0 border-t border-[var(--g2)]" />
        <h1 className="type-proj-title whitespace-pre-line text-pretty text-default">
          {hero.title}
        </h1>
      </div>

      <ProjOverview intro={hero.intro} />
    </header>
  );
}
