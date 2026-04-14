/**
 * Project page metadata for modal preview behavior and future per-page UI hooks.
 */
export type ProjectPage = {
  href: string;
  pageTitle: string;
  altText: string;
  previewImage: string | null;
  heroImage: string | null;
  disableFullscreen: boolean;
};

const projectPages: readonly ProjectPage[] = [
  {
    href: "/work/g2-search",
    pageTitle: "G2 Search",
    altText: "G2 Search case study",
    previewImage: "/thumbnails/g2-search-thumb.png",
    heroImage: "/thumbnails/G2-search-home-img.png",
    disableFullscreen: true,
  },
  {
    href: "/work/g2-ai",
    pageTitle: "G2 AI",
    altText: "G2 AI case study",
    previewImage: "/thumbnails/g2-ai-thumb.png",
    heroImage: "/thumbnails/g2ai-home-img.png",
    disableFullscreen: true,
  },
  {
    href: "/work/mclubs",
    pageTitle: "Mclubs",
    altText: "Mclubs case study",
    previewImage: "/thumbnails/mclubs-thumb.png",
    heroImage: "/thumbnails/Mclubs-home-img.png",
    disableFullscreen: true,
  },
  {
    href: "/work/intouch",
    pageTitle: "InTouch",
    altText: "InTouch case study",
    previewImage: "/thumbnails/intouch-home-img.webp",
    heroImage: "/thumbnails/intouch-home-img.webp",
    disableFullscreen: true,
  },
];

/**
 * Resolve by pathname only (`/work/x`), ignoring query/hash for preview iframe URLs.
 */
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
