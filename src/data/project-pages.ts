/**
 * Case study routes — used for card links and per-page metadata.
 */
export type ProjectPage = {
  id: string;
  href: string;
  pageTitle: string;
  altText: string;
  heroImage: string | null;
};

const projectPages: readonly ProjectPage[] = [
  {
    id: "g2-search",
    href: "/work/g2-search",
    pageTitle: "G2 Search",
    altText: "G2 Search case study",
    heroImage: null,
  },
];

export function getProjectPageById(id: string): ProjectPage | undefined {
  return projectPages.find((page) => page.id === id);
}

export function getProjectPageByHref(href: string): ProjectPage | undefined {
  try {
    const origin =
      typeof window !== "undefined" ? window.location.origin : "http://localhost";
    const u = new URL(href, origin);
    return projectPages.find((page) => page.href === u.pathname);
  } catch {
    return projectPages.find((page) => page.href === href);
  }
}

/** Card link from `home-projects` item `id`, when a case study exists. */
export function resolveProjectCardHref(project: {
  id?: string;
}): string | undefined {
  if (!project.id) return undefined;
  return getProjectPageById(project.id)?.href;
}
