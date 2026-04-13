"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

import { getScrollIntoViewBehavior } from "@/lib/scroll-behavior";

type SectionScrollLinkProps = {
  href: string;
  sectionId: "work" | "visual";
  id?: string;
  className?: string;
  children: ReactNode;
};

export function SectionScrollLink({
  href,
  sectionId,
  id,
  className,
  children,
}: SectionScrollLinkProps) {
  const pathname = usePathname();

  return (
    <Link
      id={id}
      href={href}
      className={className}
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
