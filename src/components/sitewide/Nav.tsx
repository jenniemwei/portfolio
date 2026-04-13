import Image from "next/image";
import Link from "next/link";

import { SectionScrollLink } from "@/components/sitewide/SectionScrollLink";

const links = [
  {
    href: "/#work",
    label: "WORK",
    containerId: "work-button",
    sectionId: "work" as const,
  },
  {
    href: "/#visual",
    label: "VISUAL",
    containerId: "visual-button",
    sectionId: "visual" as const,
  },
  { href: "/else", label: "ELSE", containerId: "else-button" },
] as const;

/** Link is the interactive surface; label animates on link hover / focus-visible. */
const navTextLinkClassName =
  "group/nav-link flex items-center py-[var(--space-8)]";

const navTextLabelClassName =
  "type-nav-link inline-block text-default transition-[transform,opacity] duration-300 ease-out motion-safe:group-hover/nav-link:translate-y-[calc(var(--space-4)*-1)] motion-safe:group-hover/nav-link:opacity-80 motion-safe:group-focus-visible/nav-link:translate-y-[calc(var(--space-4)*-1)] motion-safe:group-focus-visible/nav-link:opacity-80";

export function Nav() {
  return (
    <header
      className="sticky top-0 z-50 w-full"
      style={{
        backgroundColor: "var(--nav-fill-background)",
        backdropFilter: "blur(var(--nav-fill-backdrop-blur))",
        WebkitBackdropFilter: "blur(var(--nav-fill-backdrop-blur))",
      }}
    >
      <div className="mx-auto w-full max-w-[var(--shell-max-width)]">
        <nav
          className="flex w-full px-[var(--space-m)] pt-[var(--space-4)]"
          aria-label="Primary"
        >
          <div className="group/nav-pill relative w-full overflow-hidden rounded-full p-[var(--space-4)]">
            <div
              className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit] opacity-0 transition-opacity duration-300 ease-out group-hover/nav-pill:opacity-[0.6] group-focus-within/nav-pill:opacity-[0.75]"
              aria-hidden
            >
              <Image
                src="/clouds-bg.gif"
                alt=""
                fill
                className="object-cover object-center"
                sizes="(max-width: 1440px) 100vw, 1440px"
                unoptimized
              />
            </div>
            <div className="relative z-[1] grid min-h-[var(--nav-icon-size)] w-full grid-cols-3 items-stretch">
              <div className="flex items-center justify-self-start self-stretch">
                <Link
                  id="logo-button"
                  href="/"
                  className="relative block shrink-0 transition-opacity hover:opacity-[var(--link-hover-opacity)] focus-visible:opacity-[var(--link-hover-opacity)]"
                  style={{
                    width: "var(--nav-icon-size)",
                    height: "var(--nav-icon-size)",
                  }}
                >
                  <Image
                    src="/icons/favicon-1.png"
                    alt="Home"
                    width={32}
                    height={32}
                    className="size-[var(--nav-icon-size)]"
                    sizes="32px"
                    priority
                  />
                </Link>
              </div>
              <div className="flex items-stretch justify-center gap-[var(--space-64)] justify-self-center self-stretch">
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
                      >
                        <span className={navTextLabelClassName}>{label}</span>
                      </SectionScrollLink>
                    );
                  }
                  return (
                    <Link
                      key={href}
                      id={containerId}
                      href={href}
                      className={navTextLinkClassName}
                    >
                      <span className={navTextLabelClassName}>{label}</span>
                    </Link>
                  );
                })}
              </div>
              <Link
                id="info-button"
                href="/info"
                className={`${navTextLinkClassName} justify-self-end self-stretch px-[var(--space-8)]`}
              >
                <span className={navTextLabelClassName}>INFO</span>
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
