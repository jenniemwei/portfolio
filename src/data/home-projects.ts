/** Home page work / visual gallery content — edit here. */

export type HomeProjectItem = {
  /** Gallery sort order within a row (ascending). */
  index: number;
  id?: string;
  /** Case-study route. Omit while a project has no published page. */
  href?: `/work/${string}`;
  heading: string;
  subheading: string;
  /** Contextual helper copy shown in the project detail rail. */
  subheadDesc?: string;
  img: string | null;
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
            id: "g2-search",
            href: "/work/g2-search",
            heading: "G2 Search",
            subheading: "Summer 2025",
            subheadDesc: "Smart search AI interaction patterns",
            img: "/thumbnails/g2-search-thumb.png",
            imgAlt: "G2 Search",
            video:
              "https://res.cloudinary.com/dlaz3infq/video/upload/v1779490718/g2-search_qc2aoo.mp4",
          },
          {
            index: 1,
            id: "g2-ai",
            heading: "G2 AI",
            subheading: "Fall 2025",
            subheadDesc: "Conversational software search",
            img: "/thumbnails/g2-ai-thumb.png",
            imgAlt: "G2 AI",
          },
        ],
      },
      {
        tracks: [1, 1],
        projects: [
          {
            index: 0,
            id: "mclubs",
            heading: "Mclubs",
            subheading: "Summer 2024",
            subheadDesc: "Club discovery and engagement platform",
            img: "/thumbnails/mclubs-thumb-backup.png",
            imgAlt: "Mclubs",
            video:
              "https://res.cloudinary.com/dlaz3infq/video/upload/v1776166382/Mobile-Screens-Grid-remix_1_flex5t.webm",
            videoThumbBg: "var(--color-fill-default)",
          },
          {
            index: 1,
            id: "folding-at-home",
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
