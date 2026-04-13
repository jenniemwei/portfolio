/** ScrollIntoView behavior respecting `prefers-reduced-motion`. */
export function getScrollIntoViewBehavior(): ScrollBehavior {
  if (typeof window === "undefined") return "auto";
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ? "auto"
    : "smooth";
}
