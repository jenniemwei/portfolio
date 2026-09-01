import type { StaticImageData } from "next/image";

import g2AiThumb from "../../public/thumbnails/g2-ai-thumb.png";
import widgetsThumb from "../../public/thumbnails/widgets-thumb.png";

/** Home page work / visual gallery content — edit here. */

export type HomeProjectItem = {
  /** Gallery sort order within a row (ascending). */
  index: number;
  id?: string;
  /** Internal case-study route or external project URL. */
  href?: string;
  heading: string;
  subheading: string;
  /** Contextual helper copy shown beneath the active project title. */
  subheadDesc?: string;
  img: string | StaticImageData | null;
  imgAlt?: string;
  /** MP4 URL (e.g. Cloudinary). Default card visual; `img` shows on hover when both are set. */
  video?: string;
  /** Solid fill behind video (e.g. letterboxing). Use `var(--color-fill-default)` or `white`. */
  videoThumbBg?: string;
  /** Default is cover (like images). Set `contain` for letterboxed / width-first video. */
  videoThumbFit?: "contain" | "cover";
};

export type HomeGalleryRow = {
  /** `fr` weights per column (e.g. `[1, 1]` = 50/50). */
  tracks: readonly number[];
  projects: readonly HomeProjectItem[];
};

/** Sort projects by `index` ascending (smallest first). */
export function sortProjectsByIndex<T extends HomeProjectItem>(
  projects: readonly T[],
): T[] {
  return [...projects].sort((a, b) => a.index - b.index);
}

export const homeProjects = {
  work: {
    rows: [
      {
        tracks: [1, 1],
        projects: [
          {
            index: 0,
            id: "grammarly-editor",
            href: "/work/grammarly-editor",
            heading: "Grammarly editor",
            subheading: "Summer 2026",
            subheadDesc: "Design patterns for Grammarly editor agents,",
            img: "/thumbnails/grammarly-blankpg-thumb.png",
            imgAlt: "Grammarly editor agents",
          },
          {
            index: 1,
            id: "g2-search",
            href: "https://www.figma.com/deck/IOmNiw3cmBlR7PvVa4Ur9z",
            heading: "G2 Search",
            subheading: "Summer 2025",
            subheadDesc: "Smart search AI interaction patterns",
            img: "/thumbnails/g2-search-thumb.png",
            imgAlt: "G2 Search",
            video:
              "https://res.cloudinary.com/dlaz3infq/video/upload/v1779490718/g2-search_qc2aoo.mp4",
          },
        ],
      },
      {
        tracks: [1, 1],
        projects: [
          {
            index: 0,
            id: "docs-ai-widgets",
            href: "https://www.figma.com/deck/yxuLhkFn8D9ZfAYCD2Bq5R",
            heading: "Docs AI widgets",
            subheading: "Summer 2026",
            subheadDesc: "Prototyping AI widgets in Superhuman docs,",
            img: widgetsThumb,
            imgAlt: "AI widgets in Superhuman docs",
          },
          {
            index: 1,
            id: "g2-ai",
            href: "https://www.figma.com/deck/NhP5MMr5Kr3Pm7eEq8jCH4",
            heading: "G2 AI",
            subheading: "Fall 2025",
            subheadDesc: "Conversational software search",
            img: g2AiThumb,
            imgAlt: "G2 AI",
          },
        ],
      },
    ],
  },
  visual: {
    rows: [
      {
        tracks: [1, 1],
        projects: [
          {
            index: 0,
            id: "dhero",
            heading: "The Designers Republic",
            subheading: "Spring 2025",
            subheadDesc: "Multimedia tribute to my design hero",
            img: "/thumbnails/dhero-thumb-backup.webp",
            imgAlt: "The Designers Republic",
            video:
              "https://res.cloudinary.com/dlaz3infq/video/upload/v1767847688/ian_anderson_video_nzysfl.mp4",
          },
          {
            index: 1,
            id: "folding-at-home",
            href: "https://www.figma.com/deck/EkFeEVcLIn79PKESBb9QZ8",
            heading: "Folding@Home",
            subheading: "Spring 2026",
            subheadDesc: "Dynamic brand for a citizen science supercomputer",
            img: "/thumbnails/fah-thumb-backup.jpg",
            imgAlt: "Folding@Home",
            video:
              "https://res.cloudinary.com/dlaz3infq/video/upload/v1776208966/logoanilight_rklxrq.webm",
            videoThumbBg: "var(--color-fill-default)",
          },
        ],
      },
      {
        tracks: [1, 1],
        projects: [
          {
            index: 0,
            heading: "HCII 30",
            subheading: "Summer 2024",
            subheadDesc: "Celebrating 30 years of HCII",
            img: "/thumbnails/HCII-thumb.jpeg",
            imgAlt: "HCII",
          },
          {
            index: 1,
            heading: "Meeting of the Minds",
            subheading: "Spring 2025",
            subheadDesc: "Event identity & collateral",
            img: "/thumbnails/MOM-thumb.png",
          },
        ],
      },
    ],
  },
} as const satisfies {
  work: { rows: readonly HomeGalleryRow[] };
  visual: { rows: readonly HomeGalleryRow[] };
};
