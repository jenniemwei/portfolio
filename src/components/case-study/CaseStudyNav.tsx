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
      className={`group relative inline-flex rounded-full transition-[translate,opacity] duration-300 ease-out motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-2 ${
        nav.slideHidden
          ? "pointer-events-none -translate-y-[calc(100%+2.5rem)] opacity-0"
          : "pointer-events-auto translate-y-0 opacity-100"
      }`}
      {...nav.headerHandlers}
    >
      <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-white transition-colors duration-200 group-hover:bg-line group-focus-visible:bg-line">
        <Image
          src="/icons/back-arrow.svg"
          alt=""
          width={24}
          height={24}
          aria-hidden
        />
      </span>
      <span
        className={`pointer-events-none absolute top-full left-0 mt-2 translate-y-1 whitespace-nowrap text-left text-sm font-medium opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 ${mobile ? "hidden sm:block" : ""}`}
      >
        back to home
      </span>
    </Link>
  );
}

export function CaseStudyNav({ items }: CaseStudyNavProps) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");

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
              <ol
                className={`pointer-events-auto flex flex-col gap-5 whitespace-nowrap ${CASE_NOTE_SERIF}`}
              >
                {items.map((item) => {
                  const active = item.id === activeId;
                  return (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        aria-current={active ? "location" : undefined}
                        onClick={(event) => scrollToSection(event, item.id)}
                        className="group relative flex h-1 w-3 items-center before:absolute before:-inset-x-4 before:-inset-y-2.5 focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4"
                      >
                        <span
                          aria-hidden
                          className={`h-1 w-3 shrink-0 rounded-full transition-[background-color,transform] duration-150 group-hover:translate-x-3 group-focus-visible:translate-x-3 ${active ? "bg-text-case-heading" : "bg-text-subtle group-hover:bg-text-case-heading group-focus-visible:bg-text-case-heading"}`}
                        />
                        <span className="pointer-events-none absolute top-1/2 left-8 -translate-y-1/2 text-text-case-heading opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:transition-none">
                          {item.label}
                        </span>
                      </a>
                    </li>
                  );
                })}
              </ol>
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
