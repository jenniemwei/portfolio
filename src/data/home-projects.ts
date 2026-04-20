/** Home page work / visual gallery content — edit here. */

export type HomeProjectItem = {
  id?: string;
  heading: string;
  subheading: string;
  /** Shown on card hover (subtitle scrambles from `subheading` → this, then back). */
  subheadDesc?: string;
  img: string | null;
  imgAlt?: string;
  /** MP4 URL (e.g. Cloudinary). When set, used instead of `img` for the card visual. */
  video?: string;
  /** Solid fill behind video (e.g. letterboxing). Use token vars like `var(--g0)` or `white`. */
  videoThumbBg?: string;
  /** Default is cover (like images). Set `contain` for letterboxed / width-first video. */
  videoThumbFit?: "contain" | "cover";
  /** App route for full case study; first card click opens preview modal. */
  projectHref?: string;
};

export type HomeGalleryRow = {
  /** `fr` weights per column (e.g. `[1, 1]` = 50/50). */
  tracks: readonly number[];
  projects: readonly HomeProjectItem[];
};

export const homeProjects = {
  work: {
    rows: [
      {
        tracks: [4, 6],
        projects: [
          {
            id: "g2-ai",
            heading: "G2 AI",
            subheading: "Fall 2025",
            subheadDesc: "Conversational software search",
            img: "/thumbnails/g2-ai-thumb.png",
            imgAlt: "G2 AI",
            projectHref: "/work/g2-ai",
      
          },
          {
            id: "folding-at-home",
            heading: "Folding@Home",
            subheading: "Spring 2026",
            subheadDesc: "Dynamic brand for a citizen science supercomputer",
            img: "/thumbnails/fah-thumb-backup.jpg",
            imgAlt: "Folding@Home",
            video:
              "https://res.cloudinary.com/dlaz3infq/video/upload/v1776208966/logoanilight_rklxrq.webm",
            videoThumbBg: "var(--g0)",
          },
        ],
      },
      {
        tracks: [6, 4],
        projects: [
          {
            id: "g2-search",
            heading: "G2 Search",
            subheading: "Summer 2025",
            subheadDesc: "Smart search AI interaction patterns",
            img: "/thumbnails/g2-search-thumb.png",
            imgAlt: "G2 Search",
            projectHref: "/work/g2-search",
          },
          { id: "mclubs",
            heading: "Mclubs",
            subheading: "Summer 2024",
            subheadDesc: "Club discovery and engagement platform",
            img: "/thumbnails/mclubs-thumb-backup.png",
            imgAlt: "Mclubs",
            video:
            "https://res.cloudinary.com/dlaz3infq/video/upload/v1776166382/Mobile-Screens-Grid-remix_1_flex5t.webm",
          videoThumbBg: "var(--g0)",
            
          },
        ],
      },
    ],
  },
  visual: {
    rows: [
      {
        tracks: [6, 4],
        projects: [
          {
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
            id: "intouch",
            heading: "InTouch",
            subheading: "Spring 2025",
            subheadDesc: "Voted winning product pitch by real investors",
            img: "/thumbnails/intouch-thumb-backup.png",
            imgAlt: "InTouch",
            video:
              "https://res.cloudinary.com/dlaz3infq/video/upload/v1767846803/intouch-short_bqnv1v.mp4",
            projectHref: "/work/intouch",
          },
        ],
      },
      {
        tracks: [1, 1],
        projects: [
          {
            heading: "HCII 30",
            subheading: "Summer 2024",
            subheadDesc: "Celebrating 30 years of HCII",
            img: "/thumbnails/HCII-thumb.jpeg",
            imgAlt: "HCII",
          },
          {
            heading: "Meeting of the Minds",
            subheading: "Spring 2025",
            subheadDesc: "Event identity & collateral",
            img: "/thumbnails/MOM-thumb.png",
          },
        ],
      },
      // {
      //   tracks: [1],
      //   projects: [
      //     {
      //       heading: "Project Headline",
      //       subheading: "Subhead",
      //       img: null,
      //     },
      //   ],
      // },
    ],
  },
} as const satisfies {
  work: { rows: readonly HomeGalleryRow[] };
  visual: { rows: readonly HomeGalleryRow[] };
};
