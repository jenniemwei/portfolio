"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const SCROLL_TOP_SHOW_PX = 56;
const SCROLL_DELTA_PX = 6;

type CollapsibleNavOptions = {
  trackHomeHero?: boolean;
  collapsedUntilInteraction?: boolean;
};

/** Shared scroll, hover, and keyboard state for the global and work navigation. */
export function useCollapsibleNav({
  trackHomeHero = false,
  collapsedUntilInteraction = false,
}: CollapsibleNavOptions = {}) {
  const lastScrollY = useRef(0);
  const [atTop, setAtTop] = useState(true);
  const [hiddenByScroll, setHiddenByScroll] = useState(false);
  const [inHeroSection, setInHeroSection] = useState(false);
  const [pointerHover, setPointerHover] = useState(false);
  const [focusWithin, setFocusWithin] = useState(false);
  const [hasActivated, setHasActivated] = useState(false);
  const [labelLeaveEnabled, setLabelLeaveEnabled] = useState(false);

  useEffect(() => {
    lastScrollY.current = window.scrollY;
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        const y = window.scrollY;
        const dy = y - lastScrollY.current;
        lastScrollY.current = y;

        if (collapsedUntilInteraction && Math.abs(dy) > 0) {
          setHasActivated(true);
        }

        setAtTop(y < SCROLL_TOP_SHOW_PX);
        setInHeroSection(
          trackHomeHero
            ? y < (document.getElementById("home-sky")?.offsetHeight ?? 0)
            : false,
        );

        if (y < SCROLL_TOP_SHOW_PX) {
          setHiddenByScroll(false);
        } else if (dy > SCROLL_DELTA_PX) {
          setHiddenByScroll(true);
        } else if (dy < -SCROLL_DELTA_PX) {
          setHiddenByScroll(false);
        }
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    queueMicrotask(onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [collapsedUntilInteraction, trackHomeHero]);

  const onBlurCapture = useCallback((event: React.FocusEvent<HTMLElement>) => {
    const next = event.relatedTarget;
    if (next instanceof Node && event.currentTarget.contains(next)) return;
    setFocusWithin(false);
  }, []);

  const activate = useCallback(() => setHasActivated(true), []);
  const enableLabelLeave = useCallback(() => setLabelLeaveEnabled(true), []);
  const expandedByState =
    atTop || !hiddenByScroll || pointerHover || focusWithin;
  const expanded = collapsedUntilInteraction
    ? hasActivated
      ? expandedByState
      : pointerHover || focusWithin
    : inHeroSection || expandedByState;

  return {
    slideHidden: !expanded,
    pillNoFill: trackHomeHero && inHeroSection,
    labelLeaveEnabled,
    enableLabelLeave,
    headerHandlers: {
      onMouseEnter: () => {
        setPointerHover(true);
        if (collapsedUntilInteraction) activate();
      },
      onMouseLeave: () => setPointerHover(false),
      onFocusCapture: () => {
        setFocusWithin(true);
        if (collapsedUntilInteraction) activate();
      },
      onBlurCapture,
    },
  };
}
