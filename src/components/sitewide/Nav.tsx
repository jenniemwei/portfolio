import Image from "next/image";
import Link from "next/link";

const links = [
  { href: "/work", label: "WORK", containerId: "work-button" },
  { href: "/visual", label: "VISUAL", containerId: "visual-button" },
  { href: "/else", label: "ELSE", containerId: "else-button" },
] as const;

/** Link is the interactive surface; label animates on link hover / focus-visible. */
const navTextLinkClassName =
  "group/nav-link flex items-center py-[var(--space-8)]";

const navTextLabelClassName =
  "inline-block text-default [font:var(--nav-link)] [letter-spacing:var(--nav-link-tracking,0)] transition-[transform,opacity] duration-300 ease-out motion-safe:group-hover/nav-link:translate-y-[calc(var(--space-4)*-1)] motion-safe:group-hover/nav-link:opacity-80 motion-safe:group-focus-visible/nav-link:translate-y-[calc(var(--space-4)*-1)] motion-safe:group-focus-visible/nav-link:opacity-80";

export function Nav() {
  return (
    <header
      className="sticky top-0 z-50 flex w-full max-w-[var(--shell-max-width)] justify-center"
      style={{
        backgroundColor: "var(--nav-fill-background)",
        backdropFilter: "blur(var(--nav-fill-backdrop-blur))",
        WebkitBackdropFilter: "blur(var(--nav-fill-backdrop-blur))",
      }}
    >
      <nav
        className="flex w-full px-[var(--space-m)] pt-[var(--space-4)]"
        aria-label="Primary"
      >
        <div className="group/nav-pill relative w-full overflow-hidden rounded-full px-[var(--space-8)]">
          <div
            className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit] opacity-0 transition-opacity duration-300 ease-out group-hover/nav-pill:opacity-[0.6] group-focus-within/nav-pill:opacity-[0.75]"
            aria-hidden
          >
            <Image
              src="/clouds-bg.gif"
              alt=""
              fill
              className="object-cover object-center"
              sizes="100vw"
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
              {links.map(({ href, label, containerId }) => (
                <Link
                  key={href}
                  id={containerId}
                  href={href}
                  className={navTextLinkClassName}
                >
                  <span className={navTextLabelClassName}>{label}</span>
                </Link>
              ))}
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
    </header>
  );
}
