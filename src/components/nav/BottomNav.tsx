"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { AboutModal } from "@/components/about/AboutModal";
import { useCollapsibleNav } from "@/components/nav/useCollapsibleNav";

import styles from "./BottomNav.module.css";

const links = [
  { href: "/", label: "Home" },
  { href: "/info", label: "About" },
  { href: "/play", label: "Play" },
] as const;

export function BottomNav() {
  const pathname = usePathname();
  const [aboutOpen, setAboutOpen] = useState(false);
  const { slideHidden, headerHandlers } = useCollapsibleNav();

  return (
    <>
      <div className={styles.spacer} aria-hidden="true" />
      <nav
        className={styles.nav}
        data-hidden={slideHidden ? "true" : undefined}
        aria-label="Main navigation"
        {...headerHandlers}
      >
        {links.map(({ href, label }) => label === "About" ? (
          <button
            key={href}
            type="button"
            className={styles.link}
            aria-haspopup="dialog"
            aria-expanded={aboutOpen}
            aria-controls="about-modal"
            data-active={aboutOpen || pathname === href ? "true" : undefined}
            onClick={() => setAboutOpen(true)}
          >
            {label}
          </button>
        ) : (
          <Link
            key={href}
            href={href}
            className={styles.link}
            aria-current={!aboutOpen && pathname === href ? "page" : undefined}
          >
            {label}
          </Link>
        ))}
      </nav>
      <AboutModal open={aboutOpen} onClose={() => setAboutOpen(false)} />
    </>
  );
}
