export type NavSectionLink = {
  href: string;
  label: string;
  containerId: string;
  sectionId: "work" | "visual";
};

export type NavPlainLink = {
  href: string;
  label: string;
  containerId: string;
};

export type NavLinkItem = NavSectionLink | NavPlainLink;

export const HOME_NAV_LINKS: readonly NavLinkItem[] = [
  {
    href: "/#work",
    label: "WORK",
    containerId: "work-button",
    sectionId: "work",
  },
  {
    href: "/#visual",
    label: "VISUAL",
    containerId: "visual-button",
    sectionId: "visual",
  },
  { href: "/info", label: "ELSE", containerId: "else-button" },
] as const;

export const WORK_SUBNAV_LINKS: readonly NavLinkItem[] = [
  {
    href: "/#work",
    label: "WORK",
    containerId: "subnav-work-button",
    sectionId: "work",
  },
  {
    href: "/#visual",
    label: "VISUAL",
    containerId: "subnav-visual-button",
    sectionId: "visual",
  },
  { href: "/info", label: "ELSE", containerId: "subnav-else-button" },
] as const;

export const NAV_TEXT_LINK_CLASS =
  "group/nav-link flex items-center py-3";

export const NAV_LINK_LABEL_CLASS = "type-nav-link text-text-default";
