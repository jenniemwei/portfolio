import { createElement, type ReactNode } from "react";

const CALLOUT_BG = "url('/decor/circle2.svg')";

type CalloutHeaderProps = {
  children: ReactNode;
  className?: string;
  /** Stable id for linking / `aria-labelledby`. */
  id?: string;
  /** Heading semantics; visual style is `type-h2 text-default`. Defaults to `h2`. */
  as?: "h2" | "h3" | "p" | "span";
  /**
   * `span` wrapper + tighter padding — use inside a sentence so only `children` sits in the ellipse
   * (e.g. one emphasized word). Pair with `as="span"`.
   */
  inline?: boolean;
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
  inline = false,
}: CalloutHeaderProps) {
  const outerClass = [
    "relative min-w-0 items-center justify-center text-center",
    inline
      ? "inline-flex w-fit max-w-full align-middle"
      : "mx-auto inline-flex w-fit max-w-full",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const paddingInline = inline
    ? "clamp(0.65rem, 2.2vw, 1.1rem)"
    : "clamp(1.5rem, 5vw, 2.75rem)";
  const paddingBlock = inline
    ? "clamp(0.2rem, 1vw, 0.45rem)"
    : "clamp(0.5rem, 2vw, 1rem)";

  const innerClass = [
    "type-h2 text-default relative z-[1] m-0 text-balance text-center",
    inline ? "max-w-none" : "max-w-[min(100%,42ch)]",
  ].join(" ");

  const style = {
    backgroundImage: CALLOUT_BG,
    backgroundRepeat: "no-repeat" as const,
    backgroundPosition: "center" as const,
    backgroundSize: "100% 100%" as const,
    paddingInline,
    paddingBlock,
  };

  return createElement(
    inline ? "span" : "div",
    { className: outerClass, style },
    createElement(as, { id, className: innerClass }, children),
  );
}

interface CalloutProps {
  children: ReactNode;
}

export function Callout({ children }: CalloutProps) {
  return (
    <div className="flex justify-center py-64">
      <CalloutHeader>{children}</CalloutHeader>
    </div>
  );
}
