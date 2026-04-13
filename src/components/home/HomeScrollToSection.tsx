"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

import { getScrollIntoViewBehavior } from "@/lib/scroll-behavior";

const SECTION_IDS = new Set(["work", "visual"]);

function scrollToHashIfSection() {
  const id = window.location.hash.slice(1);
  if (!SECTION_IDS.has(id)) return;
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({
    behavior: getScrollIntoViewBehavior(),
    block: "start",
  });
}

/**
 * When landing on `/` with `#work` / `#visual` (or client-navigating from another route),
 * scroll after paint so the section top aligns with the viewport (see `scroll-margin-top` on sections).
 */
export function HomeScrollToSection() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/") return;

    scrollToHashIfSection();
    const t0 = window.setTimeout(scrollToHashIfSection, 0);
    const t1 = window.setTimeout(scrollToHashIfSection, 120);

    return () => {
      window.clearTimeout(t0);
      window.clearTimeout(t1);
    };
  }, [pathname]);

  return null;
}
