"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps, ReactNode } from "react";

import {
  type HomePageSectionId,
  scrollHomePageSection,
} from "@/lib/home-section-scroll";

type SectionScrollLinkProps = {
  href: string;
  sectionId: HomePageSectionId;
  id?: string;
  className?: string;
  children: ReactNode;
} & Partial<Pick<ComponentProps<typeof Link>, "onMouseEnter" | "onFocus">>;

export function SectionScrollLink({
  href,
  sectionId,
  id,
  className,
  children,
  onMouseEnter,
  onFocus,
}: SectionScrollLinkProps) {
  const pathname = usePathname();

  return (
    <Link
      id={id}
      href={href}
      className={className}
      onMouseEnter={onMouseEnter}
      onFocus={onFocus}
      onClick={(e) => {
        if (pathname !== "/") return;
        const el = document.getElementById(sectionId);
        if (!el) return;
        e.preventDefault();
        scrollHomePageSection(sectionId);
        window.history.replaceState(null, "", href);
      }}
    >
      {children}
    </Link>
  );
}
