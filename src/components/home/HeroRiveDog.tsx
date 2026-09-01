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
        fit: Fit.FitWidth,
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
      shouldDisableRiveListeners: false,
      autoBind: true,
      isTouchScrollEnabled: true,
    },
    {
      shouldResizeCanvasToContainer: true,
      fitCanvasToArtboardHeight: true,
    },
  );

  return (
    <div
      id="dog-column"
      className="hero-visual-column relative z-[61] mr-xl flex items-start justify-center max-md:mr-0"
    >
      <div
        id="dog-layout-slot"
        className="relative w-full aspect-square overflow-visible"
      >
        <div
          className="pointer-events-auto absolute inset-0 flex items-center justify-center w-full h-full overflow-visible"
     
          data-hero-dog-target
        >
          <RiveComponent
            className="block w-full overflow-visible [&_canvas]:overflow-visible"
            role="img"
            aria-label={HERO_RIVE_ARIA_LABEL}
          />
        </div>
      </div>
    </div>
  );
}
