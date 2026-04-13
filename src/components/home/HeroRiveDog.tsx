"use client";

import { useMemo } from "react";
import {
  Alignment,
  Fit,
  Layout,
  useRive,
} from "@rive-app/react-canvas";

/** Hero dog Rive: `public/rive/dog.riv`. */
const HERO_RIVE_SRC = "/rive/dog.riv";
const HERO_RIVE_STATE_MACHINES = ["State Machine 1"] as const;
const HERO_RIVE_ARIA_LABEL = "Interactive illustration of a dog";

type HeroRiveDogProps = {
  className?: string;
  style?: React.CSSProperties;
};

export function HeroRiveDog({
  className = "relative z-10 block w-full max-w-full overflow-visible border border-solid border-line",
  style,
}: HeroRiveDogProps) {
  const layout = useMemo(
    () =>
      new Layout({
        fit: Fit.Contain,
        alignment: Alignment.BottomCenter,
      }),
    [],
  );

  const { RiveComponent } = useRive(
    {
      src: HERO_RIVE_SRC,
      stateMachines: [...HERO_RIVE_STATE_MACHINES],
      autoplay: true,
      layout,
      /** Required for pointer / hover listeners on the state machine */
      shouldDisableRiveListeners: false,
      /** Binds default ViewModel when the file uses one (e.g. isPetting) */
      autoBind: true,
      /** Avoid blocking page scroll when dragging on the canvas (mobile) */
      isTouchScrollEnabled: true,
    },
    {
      shouldResizeCanvasToContainer: true,
    },
  );

  /**
   * Rive’s `RiveComponent` only merges `style` onto its wrapper when `className` is empty.
   * Outer: full width of the hero cell; height follows design aspect ratio (width-driven).
   */
  return (
    <div
      className={className}
      style={{
        aspectRatio: "var(--hero-visual-aspect-ratio)",
        width: "100%",
        maxWidth: "100%",
        ...style,
      }}
    >
      <div
        className="pointer-events-auto h-full w-full overflow-visible"
        data-hero-dog-target
      >
        <RiveComponent
          style={{ width: "100%", height: "100%", display: "block" }}
          role="img"
          aria-label={HERO_RIVE_ARIA_LABEL}
        />
      </div>
    </div>
  );
}
