import { createElement, type ReactNode } from "react";

const CALLOUT_BG = "url('/decor/circle2.svg')";

type CalloutHeaderProps = {
  children: ReactNode;
  className?: string;
  /** Stable id for linking / `aria-labelledby`. */
  id?: string;
  /** Heading semantics; visual style is always `type-h2-special`. Defaults to `h2`. */
  as?: "h2" | "h3" | "p";
};

/**
 * Serif callout title inside the hand-drawn ellipse (`public/decor/circle2.svg`).
 * The frame stretches to the intrinsic width of `children` (plus padding); the SVG scales with it.
 */
export function CalloutHeader({
  children,
  className = "",
  id,
  as = "h2",
}: CalloutHeaderProps) {
  return (
    <div
      className={`relative mx-auto inline-flex w-fit max-w-full min-w-0 items-center justify-center text-center ${className}`.trim()}
      style={{
        backgroundImage: CALLOUT_BG,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "100% 100%",
        paddingInline: "clamp(1.5rem, 5vw, 2.75rem)",
        paddingBlock: "clamp(0.5rem, 2vw, 1rem)",
      }}
    >
      {createElement(
        as,
        {
          id,
          className:
            "type-h2-special relative z-[1] m-0 max-w-[min(100%,42ch)] text-balance text-center",
        },
        children,
      )}
    </div>
  );
}
