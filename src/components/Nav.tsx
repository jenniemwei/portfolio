import Image from "next/image";
import Link from "next/link";

const links = [
  { href: "/work", label: "WORK" },
  { href: "/visual", label: "VISUAL" },
  { href: "/else", label: "ELSE" },
] as const;

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
        className="flex h-[var(--nav-height)] w-full items-center px-[var(--space-m)] py-[var(--space-s)]"
        aria-label="Primary"
      >
        <div className="group relative w-full overflow-hidden rounded-full p-[12px]">
          <div
            className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-[0.75] group-focus-within:opacity-[0.75]"
            style={{ backgroundImage: "url(/clouds-bg.gif)" }}
            aria-hidden
          />
          <div className="relative z-[1] flex w-full items-center justify-between">
            <Link
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
                width={24}
                height={24}
                className="size-[var(--nav-icon-size)]"
                priority
              />
            </Link>
            <div className="flex items-center gap-[var(--nav-link-gap)]">
              {links.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="font-[family-name:var(--font-sans-stack)] text-[length:var(--font-size-sm)] font-[var(--font-weight-bold)] leading-[var(--line-height-nav)] tracking-[var(--letter-spacing-none)] text-fg transition-opacity hover:opacity-[var(--link-hover-opacity)]"
                >
                  {label}
                </Link>
              ))}
            </div>
            <Link
              href="/info"
              className="font-[family-name:var(--font-sans-stack)] text-[length:var(--font-size-sm)] font-[var(--font-weight-bold)] leading-[var(--line-height-nav)] tracking-[var(--letter-spacing-none)] text-fg transition-opacity hover:opacity-[var(--link-hover-opacity)]"
            >
              INFO
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
