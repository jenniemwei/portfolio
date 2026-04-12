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

/** Layout frame (design); Rive draws in a taller surface so the canvas can extend below the frame. */
const HERO_DOG_CONTAINER_ASPECT = "320 / 280";
/** Inner drawing surface height as % of the framed box — extra area below for overlap with content under the hero. */
const HERO_RIVE_SURFACE_HEIGHT_PCT = 135;

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
        alignment: Alignment.TopCenter,
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
   * Outer div: fixed aspect frame + border. Inner: taller surface so canvas can paint below the frame.
   */
  return (
    <div
      className={className}
      style={{
        aspectRatio: HERO_DOG_CONTAINER_ASPECT,
        width: "100%",
        ...style,
      }}
    >
      <div
        className="pointer-events-auto absolute top-0 right-0 left-0 overflow-visible"
        data-hero-dog-target
        style={{ height: `${HERO_RIVE_SURFACE_HEIGHT_PCT}%` }}
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
