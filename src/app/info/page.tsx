import Image from "next/image";

import { GalleryRow } from "@/components/gallery/GalleryRow";

const INFO_PHOTOS = [
  {
    src: "/info/me-dog.png",
    alt: "Line drawing of a person hugging a large dog.",
    width: 1644,
    height: 3222,
    figureClass:
      "z-[3] m-0 w-full max-w-[min(100%,18rem)] shrink-0 -rotate-1 md:max-w-[20rem]",
    imgClass:
      "h-auto max-h-[min(52vh,26rem)] w-full rounded-[var(--space-8)] object-contain shadow-[0_var(--space-12)_var(--space-32)_color-mix(in_srgb,var(--default)_14%,transparent)]",
  },
  {
    src: "/info/me.png",
    alt: "Beach photo with my sister and me.",
    width: 1151,
    height: 1131,
    figureClass:
      "z-[2] m-0 -mt-[var(--space-48)] w-full max-w-[min(100%,17.5rem)] shrink-0 rotate-[-2.5deg] md:-mt-[var(--space-64)] md:max-w-[18.5rem]",
    imgClass:
      "h-auto w-full rounded-[var(--space-8)] object-contain shadow-[0_var(--space-12)_var(--space-32)_color-mix(in_srgb,var(--default)_14%,transparent)]",
  },
  {
    src: "/info/young-me.jpg",
    alt: "Summer photos with a yellow lab.",
    width: 1079,
    height: 1000,
    figureClass:
      "z-[1] m-0 -mt-[var(--space-40)] w-full max-w-[min(100%,16rem)] shrink-0 rotate-[2deg] md:-mt-[var(--space-52)] md:max-w-[17rem]",
    imgClass:
      "h-auto w-full rounded-[var(--space-8)] object-contain shadow-[0_var(--space-12)_var(--space-32)_color-mix(in_srgb,var(--default)_14%,transparent)]",
  },
] as const;

export default function InfoPage() {
  return (
    <main className="mx-auto w-full max-w-[var(--content-max)] px-[var(--page-gutter)] pb-[var(--home-page-padding-bottom)] pt-[var(--space-48)]">
      <GalleryRow
        tracks={[1, 1]}
        measure="content"
        gap="large"
        className="w-full"
        cellClassName={() => "w-full min-w-0 justify-self-stretch"}
      >
        <div className="flex min-h-0 w-full min-w-0 flex-col gap-[var(--space-xl)] md:max-w-[min(100%,42rem)] md:pr-[var(--space-lg)]">
          <h1 className="type-display text-pretty text-default">
            Nice to meet you, I&apos;m Jennie :)
          </h1>

          <dl className="m-0 grid grid-cols-[minmax(0,auto)_1fr] gap-x-[var(--space-m)] gap-y-[var(--space-lg)] text-default">
            <dt className="type-body-sm font-normal lowercase text-subtle">
              who
            </dt>
            <dd className="type-body m-0 min-w-0 text-pretty">
              I am a designer, artist, tinkerer, coder, sister, dog-lover, and a
              firm believer in:{" "}
              <strong className="font-semibold">
                &ldquo;I could probably make that.&rdquo;
              </strong>{" "}
              <span className="inline-flex items-center gap-[var(--space-4)] align-middle">
                <span aria-hidden>~</span>
                <Image
                  src="/icons/mdi_pencil.svg"
                  alt=""
                  width={18}
                  height={18}
                  className="inline-block shrink-0 opacity-80"
                />
              </span>
            </dd>

            <dt className="type-body-sm font-normal lowercase text-subtle">
              what
            </dt>
            <dd className="type-body m-0 min-w-0 space-y-[var(--space-m)] text-pretty">
              <p className="m-0">
                Studying Design, HCI, and Info Systems @ Carnegie Mellon
              </p>
              <p className="m-0">
                Incoming Design @ Superhuman (Grammarly), previously Design @
                G2 for AI interactions &amp; tools
              </p>
            </dd>

            <dt className="type-body-sm font-normal lowercase text-subtle">
              why
            </dt>
            <dd className="type-body m-0 min-w-0 space-y-[var(--space-m)] text-pretty">
              <p className="m-0">
                To me, design begins with asking questions, grows through
                intention, and succeeds when it enables people to focus on what
                truly matters.
              </p>
              <p className="m-0">
                Especially in the space of AI, I want to design tools &amp;
                complex systems that empower{" "}
                <em className="italic">anyone(!!)</em> to focus more on what only
                humans can do best: imagining, exploring, and creating.
              </p>
            </dd>

            <dt className="type-body-sm font-normal lowercase text-subtle">
              for
            </dt>
            <dd className="type-body m-0 min-w-0 text-pretty">
              I&apos;m excited for opportunities to design meaningful tools
              alongside people who care as much as I do . ✨
            </dd>
          </dl>
        </div>

        <div className="flex min-h-0 w-full min-w-0 flex-col items-center justify-center md:items-end">
          <div className="relative flex w-full max-w-xl flex-col items-end pb-[var(--space-48)]">
            {INFO_PHOTOS.map((photo, i) => (
              <figure key={photo.src} className={photo.figureClass}>
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  width={photo.width}
                  height={photo.height}
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 42vw, 360px"
                  className={photo.imgClass}
                  priority={i === 0}
                />
              </figure>
            ))}
          </div>
        </div>
      </GalleryRow>
    </main>
  );
}
