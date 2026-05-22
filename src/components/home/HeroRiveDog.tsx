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
      shouldDisableRiveListeners: false,
      autoBind: true,
      isTouchScrollEnabled: true,
    },
    {
      shouldResizeCanvasToContainer: true,
    },
  );

  /**
   * `#dog-container`: 90% width, capped; square outer box.
   * `#dog-wrapper`: artboard aspect (7:10); Rive `Fit.Contain` fills wrapper.
   */
  return (
    <div
      id="dog-container"
      className="relative z-[61] flex aspect-square w-[90%] max-w-[var(--hero-visual-max-width)] min-h-0 shrink-0 flex-col items-center justify-start overflow-visible"
    >
      <div
        id="dog-wrapper"
        className="relative aspect-[var(--hero-visual-aspect-ratio)] w-full shrink-0 overflow-visible"
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
