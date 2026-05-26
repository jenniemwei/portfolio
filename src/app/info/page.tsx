import Image from "next/image";

import { PageSkyBackground } from "@/components/sky/PageSkyBackground";

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
] as const;

export default function InfoPage() {
  return (
    <div className="relative flex min-h-screen flex-col items-center">
      <div
        id="home-sky"
        className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[40vh]"
        aria-hidden
      >
        <PageSkyBackground variant="band" />
      </div>

      <main className="relative z-[1] flex min-h-screen w-full flex-col items-center justify-center py-xl">
        <div className="pg-w-80 flex flex-col gap-12 rounded-3xl sm:px-[3vw]">
          <h1 className="type-display text-pretty text-text-default">
            Nice to meet you, I&apos;m Jennie
          </h1>

          <div className="flex flex-col gap-12 max-lg:flex-col-reverse lg:flex-row lg:gap-lg">
            <div className="flex min-w-0 flex-1 flex-col justify-center">
              <dl className="m-0 grid grid-cols-[minmax(0,auto)_1fr] gap-x-md gap-y-lg text-text-default">
                <dt className="type-body-sm font-normal lowercase text-text-subtle">
                  who
                </dt>
                <dd className="type-body m-0 min-w-0 space-y-md text-pretty">
                  <p className="m-0">
                    I am a designer, artist, tinkerer, coder, sister,
                    dog-lover, and a firm believer in:{" "}
                    <strong className="font-medium">
                      &ldquo;I could probably make that.&rdquo;
                    </strong>
                  </p>
                  <p className="m-0">
                    Outside of design, I love (and can&apos;t help) turning
                    random whims into fixations, especially if I&apos;m bad at
                    it. Right now it&apos;s mastering latte art, indoor
                    bouldering, and finding new ways to customize foccacia.
                  </p>
                </dd>

                <dt className="type-body-sm font-normal lowercase text-text-subtle">
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

                <dt className="type-body-sm font-normal lowercase text-text-subtle">
                  why
                </dt>
                <dd className="type-body m-0 min-w-0 space-y-md text-pretty">
                  <p className="m-0">
                    To me, design begins with asking questions, grows through
                    intention, and succeeds when it enables people to focus on
                    what truly matters.
                  </p>
                </dd>

                <dt className="type-body-sm font-normal lowercase text-text-subtle">
                  for
                </dt>
                <dd className="type-body m-0 min-w-0 text-pretty">
                  <p className="m-0">
                    I want to design meaningful tools &amp; that empower{" "}
                    <em className="italic">humans</em> to focus more on what we
                    do best: imagining, exploring, and creating ...alongside
                    people who care as much as I do :)
                  </p>
                </dd>
              </dl>
            </div>

            <div className="relative flex min-w-0 flex-1 items-center justify-center pb-12 lg:justify-end">
              {INFO_PHOTOS.map((photo, i) => (
                <figure
                  key={photo.src}
                  className={`${photo.figureClass}${i > 0 ? " -ml-14 md:-ml-16" : ""}`}
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    width={photo.width}
                    height={photo.height}
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className={photo.imgClass}
                    priority={i === 0}
                  />
                </figure>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
