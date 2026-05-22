"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

import {
  HOME_NAV_LINKS,
  NAV_LINK_LABEL_CLASS,
  NAV_TEXT_LINK_CLASS,
} from "@/components/nav/navConfig";
import { SectionScrollLink } from "@/components/nav/SectionScrollLink";

import styles from "./Nav.module.css";

const SCROLL_TOP_SHOW_PX = 56;
const SCROLL_DELTA_PX = 6;

const navTextLinkClassName = `${styles.navTextLink} ${NAV_TEXT_LINK_CLASS}`;
const navLinkLabelClassName = `${styles.navLinkLabel} ${NAV_LINK_LABEL_CLASS}`;

export function Nav() {
  const pathname = usePathname();
  const isWorkPage = pathname.startsWith("/work/");
  const lastScrollY = useRef(0);
  const isHome = pathname === "/";
  const [atTop, setAtTop] = useState(true);
  const [hiddenByScroll, setHiddenByScroll] = useState(false);
  const [inHeroSection, setInHeroSection] = useState(false);
  const [pointerHover, setPointerHover] = useState(false);
  const [focusWithin, setFocusWithin] = useState(false);
  const [navLabelLeaveEnabled, setNavLabelLeaveEnabled] = useState(false);

  const enableNavLabelLeaveAnim = useCallback(() => {
    setNavLabelLeaveEnabled(true);
  }, []);

  useEffect(() => {
    lastScrollY.current = window.scrollY;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        const y = window.scrollY;
        const prev = lastScrollY.current;
        const dy = y - prev;
        lastScrollY.current = y;

        setAtTop(y < SCROLL_TOP_SHOW_PX);

        if (isHome) {
          const hero = document.getElementById("hero-container");
          setInHeroSection(hero ? y < hero.offsetHeight : false);
        } else {
          setInHeroSection(false);
        }

        if (y < SCROLL_TOP_SHOW_PX) {
          setHiddenByScroll(false);
          return;
        }
        if (dy > SCROLL_DELTA_PX) setHiddenByScroll(true);
        else if (dy < -SCROLL_DELTA_PX) setHiddenByScroll(false);
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    queueMicrotask(onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [isHome]);

  const onBlurCapture = useCallback((e: React.FocusEvent<HTMLElement>) => {
    const next = e.relatedTarget;
    if (next instanceof Node && e.currentTarget.contains(next)) return;
    setFocusWithin(false);
  }, []);

  const pillNoFill = isHome && inHeroSection;
  const expanded =
    pillNoFill ||
    atTop ||
    !hiddenByScroll ||
    pointerHover ||
    focusWithin;
  const slideHidden = !expanded;

  if (isWorkPage) {
    return null;
  }

  return (
    <header
      className="fixed inset-x-0 top-0 z-[var(--nav-z)] w-full pt-4 pb-2"
      data-nav-label-leave={navLabelLeaveEnabled ? "true" : undefined}
      onMouseEnter={() => setPointerHover(true)}
      onMouseLeave={() => setPointerHover(false)}
      onFocusCapture={() => setFocusWithin(true)}
      onBlurCapture={onBlurCapture}
    >
      <div className="mx-auto flex w-full max-w-xl items-center gap-md px-md">
        <Link
          id="logo-button"
          href="/"
          className={`${styles.logoButton} relative z-[2] inline-flex items-center justify-center p-4`}
        >
          <Image
            src="/icons/favicon-1.png"
            alt="Home"
            width={32}
            height={32}
            className="size-[var(--nav-icon-size)] shrink-0"
            sizes="32px"
            priority
          />
        </Link>

        <div className="min-h-[var(--nav-icon-size)] min-w-0 flex-1 overflow-hidden">
          <div className="relative w-full overflow-hidden rounded-full">
            <div
              className={`pointer-events-none absolute inset-0 z-0 rounded-full ${styles.navBackdropPlate} ${slideHidden ? styles.navBackdropPlateHidden : ""} ${pillNoFill ? styles.navBackdropPlateNoFill : ""}`}
              aria-hidden
            />
            <div
              className={`relative z-[1] rounded-full  ${styles.slideLayer} ${slideHidden ? styles.slideLayerHidden : ""}`}
            >
              <div
                id="nav-pill"
                className={`${styles.navPill} ${pillNoFill ? styles.navPillNoFill : ""} group/nav-pill relative w-full overflow-hidden rounded-full py-2`}
              >
                <div id="nav-pill-fill" className={styles.navPillFill} aria-hidden />
                <div className="relative z-[1] grid min-h-[var(--nav-icon-size)] w-full grid-cols-[1fr_auto] items-center gap-x-md">
                  <div className="flex min-w-0 items-stretch justify-center gap-64">
                    {HOME_NAV_LINKS.map((item) => {
                      const { href, label, containerId } = item;
                      if ("sectionId" in item) {
                        return (
                          <SectionScrollLink
                            key={href}
                            href={href}
                            sectionId={item.sectionId}
                            id={containerId}
                            className={navTextLinkClassName}
                            onMouseEnter={enableNavLabelLeaveAnim}
                            onFocus={enableNavLabelLeaveAnim}
                          >
                            <span className={navLinkLabelClassName}>{label}</span>
                          </SectionScrollLink>
                        );
                      }
                      return (
                        <Link
                          key={href}
                          id={containerId}
                          href={href}
                          className={navTextLinkClassName}
                          onMouseEnter={enableNavLabelLeaveAnim}
                          onFocus={enableNavLabelLeaveAnim}
                        >
                          <span className={navLinkLabelClassName}>{label}</span>
                        </Link>
                      );
                    })}
                  </div>
                  <Link
                    id="info-button"
                    href="/info"
                    className={`${navTextLinkClassName} shrink-0 px-8`}
                    onMouseEnter={enableNavLabelLeaveAnim}
                    onFocus={enableNavLabelLeaveAnim}
                  >
                    <span className={navLinkLabelClassName}>INFO</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
