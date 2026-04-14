"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

import { scrollHomePageSectionFromHash } from "@/lib/home-section-scroll";

/**
 * When landing on `/` with `#work` / `#visual` (or client-navigating from another route),
 * scroll after paint so the section top aligns with the viewport (see `scroll-margin-top` on sections).
 */
export function HomeScrollToSection() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/") return;

    scrollHomePageSectionFromHash();
    const t0 = window.setTimeout(scrollHomePageSectionFromHash, 0);
    const t1 = window.setTimeout(scrollHomePageSectionFromHash, 120);

    return () => {
      window.clearTimeout(t0);
      window.clearTimeout(t1);
    };
  }, [pathname]);

  return null;
}
