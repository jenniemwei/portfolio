export const SOCIAL_LINKS = [
  {
    href: "mailto:jenniew@andrew.cmu.edu",
    label: "Send email to Jennie Wei",
    icon: "/icons/email.svg",
  },
  {
    href: "https://www.linkedin.com/in/jenniewei/",
    label: "LinkedIn profile",
    icon: "/icons/linkedin.svg",
    external: true,
  },
  {
    href: "https://drive.google.com/drive/folders/19OuC2GBTdKbCcStpXL2HzcYGEMkKCDvW",
    label: "Open dog assets folder",
    icon: "/icons/dog.svg",
    external: true,
  },
] as const;

export type SocialLink = (typeof SOCIAL_LINKS)[number];
