/** Home page work / visual gallery content — edit here. */

export type HomeProjectItem = {
  id?: string;
  heading: string;
  subheading: string;
  img: string | null;
  imgAlt?: string;
  /** MP4 URL (e.g. Cloudinary). When set, used instead of `img` for the card visual. */
  video?: string;
};

export type HomeGalleryRow = {
  variant: "60-40" | "50-50" | "100";
  projects: readonly HomeProjectItem[];
};

export const homeProjects = {
  work: {
    rows: [
      {
        variant: "60-40",
        projects: [
          {
            id: "g2-search",
            heading: "G2 Search",
            subheading: "Summer 2025",
            img: "/thumbnails/work/g2-search-thumb.png",
            imgAlt: "G2 Search",
          },
          {
            id: "g2-ai",
            heading: "G2 AI",
            subheading: "Fall 2025",
            img: "/thumbnails/work/g2-ai-thumb.png",
            imgAlt: "G2 AI",
          },
        ],
      },
      {
        variant: "50-50",
        projects: [
          {
            id: "mclubs",
            heading: "Mclubs",
            subheading: "Summer 2024",
            img: "/thumbnails/work/mclubs-thumb.png",
            imgAlt: "Mclubs",
          },
          {
            id: "intouch",
            heading: "InTouch",
            subheading: "Spring 2025",
            img: null,
            imgAlt: "InTouch",
            video:
              "https://res.cloudinary.com/dlaz3infq/video/upload/v1767846803/intouch-short_bqnv1v.mp4",
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
            heading: "Dhero",
            subheading: "Visual",
            img: "/thumbnails/visual/dhero-home-img.webp",
            imgAlt: "Dhero",
          },
          {
            heading: "Meeting of the Minds",
            subheading: "Subhead",
            img: null,
          },
        ],
      },
      {
        variant: "50-50",
        projects: [
          {
            heading: "HCII",
            subheading: "Research",
            img: "/thumbnails/visual/HCII-thumb.jpeg",
            imgAlt: "HCII",
          },
          {
            heading: "Project Headline",
            subheading: "Subhead",
            img: null,
          },
        ],
      },
      {
        variant: "100",
        projects: [
          {
            heading: "Project Headline",
            subheading: "Subhead",
            img: null,
          },
        ],
      },
    ],
  },
} as const satisfies {
  work: { rows: readonly HomeGalleryRow[] };
  visual: { rows: readonly HomeGalleryRow[] };
};
