import Image from "next/image";

import styles from "./SiteFooter.module.css";

export function SiteFooter() {
  return (
    <footer
      className={`${styles.footer} relative mt-auto shrink-0 overflow-hidden`}
    >
      <Image
        src="/windows-wp.gif"
        alt=""
        fill
        className="object-cover object-center"
        sizes="100vw"
        unoptimized
      />
    </footer>
  );
}
