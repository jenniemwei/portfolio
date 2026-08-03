"use client";

import { NavShell } from "@/components/nav/NavShell";
import { WORK_SUBNAV_LINKS } from "@/components/nav/navConfig";
import { useCollapsibleNav } from "@/components/nav/useCollapsibleNav";

export function SubNav() {
  const nav = useCollapsibleNav({ collapsedUntilInteraction: true });

  return (
    <NavShell
      links={WORK_SUBNAV_LINKS}
      idPrefix="subnav"
      slideHidden={nav.slideHidden}
      labelLeaveEnabled={nav.labelLeaveEnabled}
      onLabelInteraction={nav.enableLabelLeave}
      headerHandlers={nav.headerHandlers}
    />
  );
}
