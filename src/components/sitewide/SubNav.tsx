"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

import { isPreviewOrEmbedFrame } from "@/lib/embedChrome";
import { SectionScrollLink } from "@/components/sitewide/SectionScrollLink";

import styles from "./Nav.module.css";

const links = [
  {
    href: "/#work",
    label: "WORK",
    containerId: "subnav-work-button",
    sectionId: "work" as const,
  },
  {
    href: "/#visual",
    label: "VISUAL",
    containerId: "subnav-visual-button",
    sectionId: "visual" as const,
  },
  { href: "/else", label: "ELSE", containerId: "subnav-else-button" },
] as const;

const SCROLL_TOP_SHOW_PX = 56;
const SCROLL_DELTA_PX = 6;

const navTextLinkClassName = `${styles.navTextLink} group/nav-link flex items-center py-[var(--space-12)]`;
const navLinkLabelClassName = `${styles.navLinkLabel} type-nav-link text-default`;

export function SubNav() {
  const pathname = usePathname();
  const [embeddedInFrame, setEmbeddedInFrame] = useState(false);
  const lastScrollY = useRef(0);
  const [atTop, setAtTop] = useState(true);
  const [hiddenByScroll, setHiddenByScroll] = useState(false);
  const [pointerHover, setPointerHover] = useState(false);
  const [focusWithin, setFocusWithin] = useState(false);
  const [hasActivated, setHasActivated] = useState(false);
  const [navLabelLeaveEnabled, setNavLabelLeaveEnabled] = useState(false);

  const enableNavLabelLeaveAnim = useCallback(() => {
    setNavLabelLeaveEnabled(true);
  }, []);

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      setEmbeddedInFrame(isPreviewOrEmbedFrame());
    });
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  useEffect(() => {
    if (embeddedInFrame) return;
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

        if (Math.abs(dy) > 0) {
          setHasActivated(true);
        }

        setAtTop(y < SCROLL_TOP_SHOW_PX);
        if (y < SCROLL_TOP_SHOW_PX) {
          setHiddenByScroll(false);
          return;
        }
        if (dy > SCROLL_DELTA_PX) setHiddenByScroll(true);
        else if (dy < -SCROLL_DELTA_PX) setHiddenByScroll(false);
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    queueMicrotask(onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [embeddedInFrame]);

  const onBlurCapture = useCallback((e: React.FocusEvent<HTMLElement>) => {
    const next = e.relatedTarget;
    if (next instanceof Node && e.currentTarget.contains(next)) return;
    setFocusWithin(false);
  }, []);

  const expandedByDefault =
    atTop || !hiddenByScroll || pointerHover || focusWithin;
  const expanded = hasActivated ? expandedByDefault : pointerHover || focusWithin;
  const slideHidden = !expanded;

  if (embeddedInFrame) {
    return null;
  }

  return (
    <header
      className="sticky top-0 z-50 w-full pt-[var(--space-4)] pb-[var(--space-2)]"
      data-nav-label-leave={navLabelLeaveEnabled ? "true" : undefined}
      onMouseEnter={() => {
        setPointerHover(true);
        setHasActivated(true);
      }}
      onMouseLeave={() => setPointerHover(false)}
      onFocusCapture={() => {
        setFocusWithin(true);
        setHasActivated(true);
      }}
      onBlurCapture={onBlurCapture}
    >
      <div className="mx-auto flex w-full max-w-[var(--shell-max-width)] items-center gap-[var(--space-m)] px-[var(--space-m)]">
        <Link
          id="subnav-logo-button"
          href="/"
          className={`${styles.logoButton} relative z-[2] inline-flex items-center justify-center p-[var(--space-4)]`}
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
              className={`pointer-events-none absolute inset-0 z-0 rounded-full ${styles.navBackdropPlate} ${slideHidden ? styles.navBackdropPlateHidden : ""}`}
              aria-hidden
            />
            <div
              className={`relative z-[1] rounded-full ${styles.slideLayer} ${slideHidden ? styles.slideLayerHidden : ""}`}
            >
              <div
                id="subnav-pill"
                className="group/nav-pill relative w-full overflow-hidden rounded-full py-[var(--space-2)]"
              >
                <div
                  id="subnav-pill-fill"
                  className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit] opacity-0 transition-opacity duration-300 ease-out group-hover/nav-pill:opacity-[0.5] group-focus-within/nav-pill:opacity-[0.75]"
                  aria-hidden
                >
                  <Image
                    src="/clouds-bg-thin.gif"
                    alt=""
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 1440px) 100vw, 1440px"
                    unoptimized
                  />
                </div>
                <div className="relative z-[1] grid min-h-[var(--nav-icon-size)] w-full grid-cols-[1fr_auto] items-center gap-x-[var(--space-m)]">
                  <div className="flex min-w-0 items-stretch justify-center gap-[var(--space-64)]">
                    {links.map((item) => {
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
                    id="subnav-info-button"
                    href="/info"
                    className={`${navTextLinkClassName} shrink-0 px-[var(--space-8)]`}
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
