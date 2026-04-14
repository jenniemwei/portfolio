import { getScrollIntoViewBehavior } from "@/lib/scroll-behavior";

/** Sections on `/` that nav links scroll to (hash + in-page Link). */
export const HOME_PAGE_SECTION_IDS = ["work", "visual"] as const;
export type HomePageSectionId = (typeof HOME_PAGE_SECTION_IDS)[number];

const HASH_SECTION_IDS = new Set<string>(HOME_PAGE_SECTION_IDS);

function scrollElementIntoView(el: HTMLElement): void {
  el.scrollIntoView({
    behavior: getScrollIntoViewBehavior(),
    block: "start",
  });
}

/** Scroll to `#work` / `#visual` when present on the home URL hash (after navigation / load). */
export function scrollHomePageSectionFromHash(): void {
  const id = window.location.hash.slice(1);
  if (!HASH_SECTION_IDS.has(id)) return;
  const el = document.getElementById(id);
  if (!el) return;
  scrollElementIntoView(el);
}

/** Instant scroll from an in-page nav link (already on `/`). */
export function scrollHomePageSection(id: HomePageSectionId): void {
  const el = document.getElementById(id);
  if (!el) return;
  scrollElementIntoView(el);
}
