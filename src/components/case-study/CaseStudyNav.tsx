import Image from "next/image";
import Link from "next/link";

import { CASE_STUDY_CONTAINER } from "./caseStudyStyles";

export function CaseStudyNav() {
  return (
    <nav
      aria-label="Case study navigation"
      className={`${CASE_STUDY_CONTAINER} flex items-center py-10`}
      data-case-section="nav-simple"
    >
      <Link
        href="/"
        aria-label="Back to home"
        className="group inline-flex items-center gap-3 rounded-full focus-visible:outline-2 focus-visible:outline-offset-2"
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
        <span className="max-w-0 -translate-x-2 overflow-hidden whitespace-nowrap text-sm font-medium opacity-0 transition-all duration-200 group-hover:max-w-32 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:max-w-32 group-focus-visible:translate-x-0 group-focus-visible:opacity-100">
          back to home
        </span>
      </Link>
    </nav>
  );
}
