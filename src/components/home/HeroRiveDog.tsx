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

export function HeroRiveDog() {
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
   * Layout contract:
   * - `#dog-container`: width = 90% of parent cell (capped), `aspect-square`; height follows width.
   *   Border on this box only. `overflow-visible` so `#dog-wrapper` (taller 7:10) can extend below.
   * - `#dog-wrapper`: `w-full`, `aspect-ratio` = artboard 7:10; top + horizontal center within `#dog-container` (hero cell uses `items-end justify-end` for bottom-right placement).
   * - Rive: `Fit.Contain` + full-size canvas in wrapper → artboard always fully visible, letterboxed if needed.
   * `min-h-0` avoids flex `min-height:auto` inflating the square past `aspect-square`.
   */
  return (
    <div
      id="dog-container"
      className="relative z-20 flex aspect-square w-[90%] max-w-[var(--hero-visual-max-width)] min-h-0 shrink-0 flex-col items-center justify-start overflow-visible border border-solid border-line"
    >
      <div
        id="dog-wrapper"
        className="relative w-full shrink-0 overflow-visible aspect-[var(--hero-visual-aspect-ratio)]"
      >
        <div
          className="pointer-events-auto absolute inset-0 min-h-0 min-w-0"
          data-hero-dog-target
        >
          <RiveComponent
            style={{ width: "100%", height: "100%", display: "block" }}
            role="img"
            aria-label={HERO_RIVE_ARIA_LABEL}
          />
        </div>
      </div>
    </div>
  );
}
