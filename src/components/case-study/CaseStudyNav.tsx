"use client";

import Image from "next/image";
import Link from "next/link";
import { type MouseEvent, useEffect, useState } from "react";

import { PageColumns } from "@/components/layout/PageColumns";
import { useCollapsibleNav } from "@/components/nav/useCollapsibleNav";

import { CASE_NOTE_SERIF } from "./caseStudyStyles";

export type CaseStudyNavItem = {
  id: string;
  label: string;
};

type CaseStudyNavProps = {
  items: readonly CaseStudyNavItem[];
};

function BackToHome({ mobile = false }: { mobile?: boolean }) {
  const nav = useCollapsibleNav({ showAtBottom: true });

  return (
    <Link
      href="/"
      aria-label="Back to home"
      className={`group relative inline-flex -translate-x-3.5 rounded-full transition-[translate,opacity] duration-300 ease-out motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-2 ${
        nav.slideHidden
          ? "pointer-events-none -translate-y-[calc(100%+2.5rem)] opacity-0"
          : "pointer-events-auto translate-y-0 opacity-100"
      }`}
      {...nav.headerHandlers}
    >
      <span className="flex size-11 shrink-0 items-center justify-center rounded-full">
        <Image
          src="/icons/back-arrow.svg"
          alt=""
          width={24}
          height={24}
          aria-hidden
        />
      </span>
      <span
        className={`pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 translate-y-1 whitespace-nowrap text-center opacity-0 transition-[translate,opacity] duration-200 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 ${CASE_NOTE_SERIF} ${mobile ? "hidden sm:block" : ""}`}
      >
        back
      </span>
    </Link>
  );
}

export function CaseStudyNav({ items }: CaseStudyNavProps) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");
  const [previewId, setPreviewId] = useState<string | null>(null);
  const displayedId = previewId ?? activeId;
  const displayedIndex = Math.max(
    0,
    items.findIndex((item) => item.id === displayedId),
  );
  const displayedLabel = items[displayedIndex]?.label ?? "";

  const scrollToSection = (
    event: MouseEvent<HTMLAnchorElement>,
    id: string,
  ) => {
    const section = document.getElementById(id);
    if (!section) return;

    event.preventDefault();
    const hash = `#${id}`;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (window.location.hash !== hash) {
      window.history.pushState(null, "", hash);
    }
    section.scrollIntoView({
      behavior: reducedMotion ? "auto" : "smooth",
      block: "start",
    });
  };

  useEffect(() => {
    let frame = 0;

    const updateActiveSection = () => {
      frame = 0;
      const activationLine = window.innerHeight * 0.32;
      let nextId = items[0]?.id ?? "";

      for (const item of items) {
        const section = document.getElementById(item.id);
        if (section && section.getBoundingClientRect().top <= activationLine) {
          nextId = item.id;
        }
      }

      setActiveId(nextId);
    };

    const scheduleUpdate = () => {
      if (frame) return;
      frame = requestAnimationFrame(updateActiveSection);
    };

    scheduleUpdate();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate, { passive: true });

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, [items]);

  return (
    <nav
      aria-label="Case study navigation"
      className="pointer-events-none sticky top-0 z-60 h-[124px]"
      data-case-section="nav-rail"
    >
      <PageColumns
        className="h-dvh [--page-content-max:864px]"
        leftRail={
          <div className="relative ml-auto h-dvh w-full max-w-[166px]">
            <div className="absolute top-20 left-0 flex flex-col gap-20">
              <div className="pointer-events-auto">
                <BackToHome />
              </div>
              <div className={`relative ${CASE_NOTE_SERIF}`}>
                <ol
                  className="pointer-events-auto flex flex-col gap-5 whitespace-nowrap"
                  onMouseLeave={() => setPreviewId(null)}
                  onBlur={(event) => {
                    if (
                      !event.currentTarget.contains(
                        event.relatedTarget as Node | null,
                      )
                    ) {
                      setPreviewId(null);
                    }
                  }}
                >
                  {items.map((item) => {
                    const active = item.id === activeId;
                    const previewed = item.id === previewId;
                    const slides = previewed && !active;
                    return (
                      <li key={item.id}>
                        <a
                          href={`#${item.id}`}
                          aria-label={item.label}
                          aria-current={active ? "location" : undefined}
                          onClick={(event) => scrollToSection(event, item.id)}
                          onMouseEnter={() => setPreviewId(item.id)}
                          onFocus={() => setPreviewId(item.id)}
                          className="group relative flex h-0.5 w-4 items-center before:absolute before:-inset-x-4 before:-inset-y-2.5 focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4"
                        >
                          <span
                            aria-hidden
                            className={`h-0.5 w-4 shrink-0 transform-gpu rounded-full transition-[background-color,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform motion-reduce:transition-none ${slides ? "translate-x-3" : "translate-x-0"} ${active || previewed ? "bg-text-case-heading" : "bg-line"}`}
                          />
                        </a>
                      </li>
                    );
                  })}
                </ol>
                <span
                  aria-hidden
                  className="pointer-events-none absolute top-0 left-8 flex h-0.5 items-center whitespace-nowrap text-text-case-heading transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform motion-reduce:transition-none"
                  style={{
                    transform: `translate3d(0, ${displayedIndex * 22}px, 0)`,
                  }}
                >
                  {displayedLabel}
                </span>
              </div>
            </div>
          </div>
        }
      >
        <span aria-hidden />
      </PageColumns>

      <div className="pointer-events-none absolute inset-x-0 top-0 flex px-5 py-10 sm:px-8 min-[1153px]:hidden">
        <BackToHome mobile />
      </div>
    </nav>
  );
}
