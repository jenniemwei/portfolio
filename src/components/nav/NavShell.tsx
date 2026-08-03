"use client";

import Image from "next/image";
import Link from "next/link";
import type { FocusEventHandler, MouseEventHandler } from "react";

import { SectionScrollLink } from "@/components/nav/SectionScrollLink";
import {
  NAV_LINK_LABEL_CLASS,
  NAV_TEXT_LINK_CLASS,
  type NavLinkItem,
} from "@/components/nav/navConfig";
import { cn } from "@/lib/cn";

import styles from "./Nav.module.css";

type NavShellProps = {
  links: readonly NavLinkItem[];
  idPrefix?: "subnav";
  slideHidden: boolean;
  pillNoFill?: boolean;
  labelLeaveEnabled: boolean;
  onLabelInteraction: () => void;
  headerHandlers: {
    onMouseEnter: MouseEventHandler<HTMLElement>;
    onMouseLeave: MouseEventHandler<HTMLElement>;
    onFocusCapture: FocusEventHandler<HTMLElement>;
    onBlurCapture: FocusEventHandler<HTMLElement>;
  };
};

const navTextLinkClassName = cn(styles.navTextLink, NAV_TEXT_LINK_CLASS);
const navLinkLabelClassName = cn(styles.navLinkLabel, NAV_LINK_LABEL_CLASS);

export function NavShell({
  links,
  idPrefix,
  slideHidden,
  pillNoFill = false,
  labelLeaveEnabled,
  onLabelInteraction,
  headerHandlers,
}: NavShellProps) {
  const prefix = idPrefix ? `${idPrefix}-` : "";
  const pillId = idPrefix ? "subnav-pill" : "nav-pill";
  const pillFillId = idPrefix ? "subnav-pill-fill" : "nav-pill-fill";

  return (
    <header
      className="fixed inset-x-0 top-0 z-[var(--nav-z)] w-full pt-1 pb-0.5"
      data-nav-label-leave={labelLeaveEnabled ? "true" : undefined}
      {...headerHandlers}
    >
      <div className="pg-w-xl flex items-center gap-md px-md">
        <Link
          id={`${prefix}logo-button`}
          href="/"
          className={cn(
            styles.logoButton,
            "relative z-[2] inline-flex items-center justify-center p-1",
          )}
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
              className={cn(
                "pointer-events-none absolute inset-0 z-0 rounded-full",
                styles.navBackdropPlate,
                slideHidden && styles.navBackdropPlateHidden,
                pillNoFill && styles.navBackdropPlateNoFill,
              )}
              aria-hidden
            />
            <div
              className={cn(
                "relative z-[1] rounded-full",
                styles.slideLayer,
                slideHidden && styles.slideLayerHidden,
              )}
            >
              <div
                id={pillId}
                className={cn(
                  styles.navPill,
                  pillNoFill && styles.navPillNoFill,
                  "group/nav-pill relative w-full overflow-hidden rounded-full py-0.5",
                )}
              >
                <div id={pillFillId} className={styles.navPillFill} aria-hidden />
                <div className="relative z-[1] grid min-h-[var(--nav-icon-size)] w-full grid-cols-[1fr_auto] items-center gap-x-md">
                  <div className="flex min-w-0 items-stretch justify-center gap-16">
                    {links.map((item) =>
                      "sectionId" in item ? (
                        <SectionScrollLink
                          key={item.href}
                          href={item.href}
                          sectionId={item.sectionId}
                          id={item.containerId}
                          className={navTextLinkClassName}
                          onMouseEnter={onLabelInteraction}
                          onFocus={onLabelInteraction}
                        >
                          <span className={navLinkLabelClassName}>
                            {item.label}
                          </span>
                        </SectionScrollLink>
                      ) : (
                        <Link
                          key={item.href}
                          id={item.containerId}
                          href={item.href}
                          className={navTextLinkClassName}
                          onMouseEnter={onLabelInteraction}
                          onFocus={onLabelInteraction}
                        >
                          <span className={navLinkLabelClassName}>
                            {item.label}
                          </span>
                        </Link>
                      ),
                    )}
                  </div>
                  <Link
                    id={`${prefix}info-button`}
                    href="/info"
                    className={cn(navTextLinkClassName, "shrink-0 px-2")}
                    onMouseEnter={onLabelInteraction}
                    onFocus={onLabelInteraction}
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
