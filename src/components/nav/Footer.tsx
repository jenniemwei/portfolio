import Image from "next/image";

export function Footer() {
  return (
    <footer className="relative mt-auto h-[10vh] w-full shrink-0 self-stretch overflow-visible">
      <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden>
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
      <img
        src="/dog-laying.png"
        alt=""
        className="pointer-events-none absolute bottom-0 left-[5%] z-[1] h-[150%] w-auto max-w-none object-contain object-bottom-left"
        decoding="async"
      />
      <p className="type-body-sm pointer-events-none absolute right-24 bottom-24 z-[2] m-0 text-right text-white">
        Built with Next.js | Last updated Apr 2026
      </p>
    </footer>
  );
}
