/**
 * Which `/work/*` routes compose which `src/components/proj-page/*` modules.
 * **Update this file whenever you add a case study or change composition.**
 */
export const projPageRouteRegistry = {
  "/work/g2-search": {
    ProjHero: true,
    ProjHeroGallery: true,
    ProjOverview: true,
    ProjSection: true,
    SpacerSection: true,
  },
} as const;

export type ProjPageRegisteredRoute = keyof typeof projPageRouteRegistry;
