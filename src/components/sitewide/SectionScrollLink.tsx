"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps, ReactNode } from "react";

import { getScrollIntoViewBehavior } from "@/lib/scroll-behavior";

type SectionScrollLinkProps = {
  href: string;
  sectionId: "work" | "visual";
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
        el.scrollIntoView({
          behavior: getScrollIntoViewBehavior(),
          block: "start",
        });
        window.history.replaceState(null, "", href);
      }}
    >
      {children}
    </Link>
  );
}
