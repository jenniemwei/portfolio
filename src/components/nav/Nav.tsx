"use client";

import { usePathname } from "next/navigation";

import { NavShell } from "@/components/nav/NavShell";
import { HOME_NAV_LINKS } from "@/components/nav/navConfig";
import { useCollapsibleNav } from "@/components/nav/useCollapsibleNav";

export function Nav() {
  const pathname = usePathname();
  const nav = useCollapsibleNav({ trackHomeHero: pathname === "/" });

  if (pathname.startsWith("/work/")) return null;

  return (
    <NavShell
      links={HOME_NAV_LINKS}
      slideHidden={nav.slideHidden}
      pillNoFill={nav.pillNoFill}
      labelLeaveEnabled={nav.labelLeaveEnabled}
      onLabelInteraction={nav.enableLabelLeave}
      headerHandlers={nav.headerHandlers}
    />
  );
}
