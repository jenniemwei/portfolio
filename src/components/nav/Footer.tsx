import Image from "next/image";

import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer
      className={`${styles.footer} mt-auto w-full shrink-0 self-stretch`}
    >
      <div className={styles.bgWrap} aria-hidden>
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
        className={styles.dog}
        decoding="async"
      />
      <p className={`${styles.meta} type-body-sm`}>
        Built with Next.js | Last updated Apr 2026
      </p>
    </footer>
  );
}
