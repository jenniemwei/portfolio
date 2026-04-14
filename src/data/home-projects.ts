/** Home page work / visual gallery content — edit here. */

export type HomeProjectItem = {
  id?: string;
  heading: string;
  subheading: string;
  img: string | null;
  imgAlt?: string;
  /** MP4 URL (e.g. Cloudinary). When set, used instead of `img` for the card visual. */
  video?: string;
  /** Solid fill behind video (e.g. letterboxing). */
  videoThumbBg?: "white";
  /** `cover` = fill card, may crop; `contain` = full width, letterbox (default). */
  videoThumbFit?: "contain" | "cover";
  /** App route for full case study; first card click opens preview modal. */
  projectHref?: string;
};

export type HomeGalleryRow = {
  variant:
    | "60-40"
    | "40-60"
    | "50-50"
    | "100"
    | "70-30"
    | "30-70"
    | "fit-fill"
    | "fill-fit";
  projects: readonly HomeProjectItem[];
};

export const homeProjects = {
  work: {
    rows: [
      {
        variant: "fill-fit",
        projects: [
          {
            id: "mclubs",
            heading: "Mclubs",
            subheading: "Summer 2024",
            img: "/thumbnails/mclubs-thumb.png",
            imgAlt: "Mclubs",
            video:
            "https://res.cloudinary.com/dlaz3infq/video/upload/v1776166382/Mobile-Screens-Grid-remix_1_flex5t.webm",
          videoThumbBg: "white",
          },
          {
            id: "folding-at-home",
            heading: "Folding@Home",
            subheading: "Spring 2026",
            img: null,
            imgAlt: "Folding@Home",
            video:
              "https://res.cloudinary.com/dlaz3infq/video/upload/v1776204467/logoanilight_rklxrq.webm",
            videoThumbBg: "white",
          },
        ],
      },
      {
        variant: "60-40",
        projects: [
          {
            id: "g2-search",
            heading: "G2 Search",
            subheading: "Summer 2025",
            img: "/thumbnails/g2-search-thumb.png",
            imgAlt: "G2 Search",
            projectHref: "/work/g2-search",
          },
          {
            id: "g2-ai",
            heading: "G2 AI",
            subheading: "Fall 2025",
            img: "/thumbnails/g2-ai-thumb.png",
            imgAlt: "G2 AI",
            projectHref: "/work/g2-ai",
          },
        ],
      },
    ],
  },
  visual: {
    rows: [
      {
        variant: "60-40",
        projects: [
          {
            id: "dhero",
            heading: "The Designers Republic",
            subheading: "Spring 2025",
            img: null,
            imgAlt: "The Designers Republic",
            video:
              "https://res.cloudinary.com/dlaz3infq/video/upload/v1767847688/ian_anderson_video_nzysfl.mp4",
          },
         
          {
            id: "intouch",
            heading: "InTouch",
            subheading: "Spring 2025",
            img: null,
            imgAlt: "InTouch",
            video:
              "https://res.cloudinary.com/dlaz3infq/video/upload/v1767846803/intouch-short_bqnv1v.mp4",
            videoThumbFit: "cover",
            projectHref: "/work/intouch",
          },
        ],
      },
      {
        variant: "50-50",
        projects: [
          {
            heading: "HCII 30",
            subheading: "Summer 2024",
            img: "/thumbnails/HCII-thumb.jpeg",
            imgAlt: "HCII",
          },
          {
            heading: "Meeting of the Minds",
            subheading: "Spring 2025",
            img: "/thumbnails/MOM-thumb.png",
          },
        ],
      },
      // {
      //   variant: "100",
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
