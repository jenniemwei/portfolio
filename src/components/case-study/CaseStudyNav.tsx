import Image from "next/image";
import Link from "next/link";

export function CaseStudyNav() {
  return (
    <nav
      aria-label="Case study navigation"
      className="pointer-events-none sticky top-0 z-60 h-[124px]"
      data-case-section="nav-rail"
    >
      <div className="mx-auto flex h-full w-full max-w-[864px] items-start px-5 py-10 sm:px-8 min-[1048px]:max-w-[1048px]">
        <Link
          href="/"
          aria-label="Back to home"
          className="group pointer-events-auto relative inline-flex rounded-full focus-visible:outline-2 focus-visible:outline-offset-2"
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
          <span className="pointer-events-none absolute top-full right-0 mt-2 hidden translate-y-1 whitespace-nowrap text-right text-sm font-medium opacity-0 transition-all duration-200 min-[1048px]:block group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
            back to home
          </span>
        </Link>
      </div>
    </nav>
  );
}
