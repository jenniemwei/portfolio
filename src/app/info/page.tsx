import Image from "next/image";

import { GalleryRow } from "@/components/gallery/GalleryRow";

const INFO_PHOTOS = [
  {
    src: "/info/me-dog.png",
    alt: "person hugging a large dog.",
    width: 1644,
    height: 3222,
    figureClass:
      "z-[3] m-0 w-full max-w-[min(100%,13rem)] shrink-0 -rotate-[6deg] md:max-w-[14rem]",
    imgClass: "h-auto max-h-[min(46vh,22rem)] w-full object-contain",
  },
  {
    src: "/info/me.png",
    alt: "Beach photo with my sister and me.",
    width: 1644,
    height: 3222,
    figureClass:
      "z-[4] m-0 w-full max-w-[min(100%,14.5rem)] shrink-0 rotate-[3deg] md:max-w-[15.5rem]",
    imgClass: "h-auto max-h-[min(46vh,22rem)] w-full object-contain",
  },
  // {
  //   src: "/info/young-me.jpg",
  //   alt: "Young me painting",
  //   width: 1079,
  //   height: 1000,
  //   figureClass:
  //     "z-[2] m-0 w-full max-w-[min(100%,12rem)] shrink-0 -rotate-[2deg] md:max-w-[13rem]",
  //   imgClass: "h-auto w-full object-contain",
  // },
] as const;

export default function InfoPage() {
  return (
    <div className="flex min-h-screen flex-col items-center">
      <main className="flex min-h-screen w-[90%] max-w-page-lg flex-col justify-center gap-48 px-gutter pb-48">
      <h1 className="type-display text-pretty text-default">
            Nice to meet you, I&apos;m Jennie
          </h1>
        <GalleryRow
          tracks={[3, 2]}
          measure="content"
          gap="large"
          className="w-full"
          cellClassName={() => "w-full min-w-0 justify-self-stretch self-stretch"}
        >
             <div className="flex h-full min-h-0 w-full min-w-0 flex-col justify-center gap-xl md:max-w-[min(100%,42rem)] md:pr-lg">

<dl className="m-0 grid grid-cols-[minmax(0,auto)_1fr] gap-x-md gap-y-lg text-default">
  <dt className="type-body-sm font-normal lowercase text-subtle">
    who
  </dt>
  <dd className="type-body m-0 min-w-0 space-y-md text-pretty">
    <p className="m-0">
      I am a designer, artist, tinkerer, coder, sister, dog-lover, and a firm
      believer in:{" "}
      <strong className="font-semibold">
        &ldquo;I could probably make that.&rdquo;
      </strong>
    </p>
    <p className="m-0">
      Outside of design, I love (and can&apos;t help) turning random whims
      into fixations, especially if I&apos;m bad at it. Right now it&apos;s
      mastering latte art, indoor bouldering, and finding new ways to customize
      foccacia.
    </p>
  </dd>

  <dt className="type-body-sm font-normal lowercase text-subtle">
    what
  </dt>
  <dd className="type-body m-0 min-w-0 space-y-md text-pretty">
    <p className="m-0">
      Design, HCI, and Info Systems @ Carnegie Mellon
    </p>
    <p className="m-0">
     Previously Design @ G2 for AI interactions &amp; tools
    </p>
  </dd>

  <dt className="type-body-sm font-normal lowercase text-subtle">
    why
  </dt>
  <dd className="type-body m-0 min-w-0 space-y-md text-pretty">
    <p className="m-0">
    To me, design begins with asking questions, grows through
      intention, and succeeds when it enables people to focus on what
      truly matters.
    </p>
  </dd>

  <dt className="type-body-sm font-normal lowercase text-subtle">
    for
  </dt>
  <dd className="type-body m-0 min-w-0 text-pretty">
  <p className="m-0">
    I want to design meaningful tools &amp;
      that empower{" "}
      <em className="italic">humans</em> to focus more on what we do best: imagining, exploring, and creating
      ...alongside people who care as much as I do :)
    </p>
  </dd>
</dl>
</div>
        <div className="flex min-h-0 w-full min-w-0 flex-col items-center justify-center gap-48 md:items-end">
          <div className="relative flex w-full max-w-xl items-center justify-start pb-48">
            {INFO_PHOTOS.map((photo, i) => (
              <figure
                key={photo.src}
                className={`${photo.figureClass}${i > 0 ? " -ml-56 md:-ml-64" : ""}`}
              >
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
    </div>
  );
}
