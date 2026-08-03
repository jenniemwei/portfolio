import Image from "next/image";

import { cn } from "@/lib/cn";

type FooterProps = {
  className?: string;
};

export function Footer({ className }: FooterProps) {
  return (
    <footer
      className={cn(
        "box-border h-[var(--footer-reveal-height)] w-full overflow-hidden bg-fill-dark",
        className,
      )}
    >
      <div className="absolute inset-0 z-0 hidden overflow-hidden" aria-hidden>
        <Image
          src="/footer-bg.gif"
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
          unoptimized
        />
      </div>
      {/* Native img so height % + width:auto track footer without Next/Image intrinsic box fighting layout */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/dog-laying.png"
        alt=""
        className="pointer-events-none absolute bottom-0 left-[5%] z-[1] h-[150%] w-auto max-w-none object-contain object-bottom-left"
        decoding="async"
      />
      <p className="type-body-sm pointer-events-none absolute right-24 bottom-24 z-[2] m-0 text-right text-text-white">
        Built with Next.js | Last updated Apr 2026
      </p>
    </footer>
  );
}
