import type { Metadata } from "next";
import Image from "next/image";

import styles from "./play.module.css";

export const metadata: Metadata = {
  title: "Play — Jennie Wei",
  description: "Experiments, artwork, and things made for the joy of making.",
};

const PLAY_COLUMNS = [
  [
    { src: "/play/IMG_0277.JPG", width: 4032, height: 3024, alt: "Creative work by Jennie Wei" },
    { src: "/play/digitalillo.webp", width: 1600, height: 2400, alt: "Digital illustration" },
    { src: "/play/letterpress.jpg", width: 3610, height: 3550, alt: "Letterpress work" },
    { src: "/play/paint2.jpeg", width: 878, height: 1280, alt: "Painting study" },
    { src: "/play/owlposter.png", width: 2551, height: 1651, alt: "Owl poster design" },
    { src: "/play/physcomp1.jpeg", width: 4284, height: 5712, alt: "Physical computing experiment" },
    { src: "/play/umbrella.jpeg", width: 5184, height: 3456, alt: "Umbrella project" },
  ],
  [
    { src: "/play/IMG_5117.webp", width: 1555, height: 2400, alt: "Creative work by Jennie Wei" },
    { src: "/play/IMG_5985.JPG", width: 5712, height: 4284, alt: "Creative work by Jennie Wei" },
    { src: "/play/jumpcar.webp", width: 800, height: 1149, alt: "Jump car project" },
    { src: "/play/mindfulsensing.webp", width: 1692, height: 2400, alt: "Mindful sensing project" },
    { src: "/play/paint1.jpeg", width: 1280, height: 1274, alt: "Painting study" },
  ],
] as const;

export default function PlayPage() {
  return (
    <main className="min-h-screen w-full py-xl" aria-label="Play gallery">
      <div className={styles.container}>
        <p className="type-body-sm mb-md text-text-muted">
          this page is in progress...
        </p>
        <div className={styles.gallery}>
          {PLAY_COLUMNS.map((column, columnIndex) => (
            <div className={styles.column} key={columnIndex}>
              {column.map((item) => (
                <figure className={styles.item} key={item.src}>
                  <Image
                    src={item.src}
                    alt={item.alt}
                    width={item.width}
                    height={item.height}
                    sizes="(max-width: 480px) calc(40vw - 6px), (max-width: 1250px) calc(40vw - 12px), 488px"
                    className={styles.image}
                  />
                </figure>
              ))}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
