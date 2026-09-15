import type { StaticImageData } from "next/image";

import g2AiThumb from "../../public/thumbnails/g2-ai-thumb.png";
import widgetsThumb from "../../public/thumbnails/widgets-thumb.png";

/** Home page work / visual gallery content — edit here. */

export type HomeProjectItem = {
  /** Keep the card's layout space without displaying it. */
  hidden?: boolean;
  /** Relative width within a filled desktop row; defaults to 1. */
  widthWeight?: number;
  /** Visual width / height; used to calculate each row’s resting height. */
  visualAspectRatio?: readonly [number, number];
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
        projects: [
          {
            visualAspectRatio: [8, 5],
            index: 0,
            id: "grammarly-editor",
            widthWeight: 1,
            href: "/work/grammarly-editor",
            heading: "Grammarly Editor",
            subheading: "Summer 2026",
            subheadDesc: "Design patterns for Grammarly editor agents",
            img: "/thumbnails/grammarly-blankpg-thumb.png",
            imgAlt: "Grammarly editor agents",
          },
          {
            visualAspectRatio: [16, 15],
            index: 1,
            id: "g2-search",
            widthWeight: 1,
            href: "/work/g2-search",
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
        projects: [
          {
            visualAspectRatio: [4, 3],
            index: 0,
            id: "docs-ai-widgets",
            href: "https://www.figma.com/deck/yxuLhkFn8D9ZfAYCD2Bq5R",
            heading: "Docs AI widgets",
            subheading: "Summer 2026",
            subheadDesc: "Prototyping AI widgets in Superhuman docs",
            img: widgetsThumb,
            imgAlt: "AI widgets in Superhuman docs",
          },
          {
            visualAspectRatio: [4, 3],
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
      {
        projects: [
          {
            visualAspectRatio: [4, 3],
            widthWeight: 1,
            index: 0,
            id: "go-for-students",
            heading: "Go for students",
            subheading: "2026",
            subheadDesc: "Northstar sprint concept prototype",
            img: null,
            imgAlt: "Go for students concept prototype",
            video: "https://res.cloudinary.com/dlaz3infq/video/upload/v1789339361/Scene-1_1_j3t0k9.mp4",
          },
          {
            visualAspectRatio: [4, 3],
            widthWeight: 1,
            index: 1,
            id: "work-placeholder-2",
            hidden: true,
            heading: "Upcoming project 2",
            subheading: "Coming soon",
            img: null,
          },
        ],
      },
    ],
  },
  visual: {
    rows: [
      {
        projects: [
          {
            visualAspectRatio: [4, 3],
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
            visualAspectRatio: [4, 3],
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
        projects: [
          {
            visualAspectRatio: [4, 3],
            index: 0,
            heading: "HCII 30",
            subheading: "Summer 2024",
            subheadDesc: "Celebrating 30 years of HCII",
            img: "/thumbnails/HCII-thumb.jpeg",
            imgAlt: "HCII",
          },
          {
            visualAspectRatio: [4, 3],
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

export function visualAspectRatio(project: HomeProjectItem): number {
  const [width, height] = project.visualAspectRatio ?? [4, 3];
  return Number.isFinite(width) && Number.isFinite(height) && width > 0 && height > 0
    ? width / height
    : 4 / 3;
}
