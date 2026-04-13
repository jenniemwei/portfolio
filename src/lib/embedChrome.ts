/**
 * True in project preview iframe (`?embed=1`) or when the document is embedded
 * (`frameElement` / `top`), so preview-only UI (e.g. `#preview-section`) can run.
 */
export function isPreviewOrEmbedFrame(): boolean {
  if (typeof window === "undefined") return false;
  if (new URLSearchParams(window.location.search).get("embed") === "1") {
    return true;
  }
  if (window.frameElement != null) {
    return true;
  }
  try {
    return window.self !== window.top;
  } catch {
    return true;
  }
}
