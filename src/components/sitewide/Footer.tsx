import Image from "next/image";

import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer
      className={`${styles.footer} relative mt-auto w-full shrink-0 self-stretch overflow-hidden`}
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
