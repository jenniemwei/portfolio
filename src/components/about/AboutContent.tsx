import Image from "next/image";

import styles from "./AboutContent.module.css";

const INFO_PHOTOS = [
  {
    src: "/info/me-dog.png",
    alt: "person hugging a large dog.",
    width: 1644,
    height: 3222,
    figureClass:
      "z-[3] m-0 w-[55%] max-w-[min(100%,13rem)] shrink-0 -rotate-[6deg] md:max-w-[14rem]",
    imgClass: "h-auto max-h-[min(46vh,22rem)] w-full object-contain",
  },
  {
    src: "/info/me.png",
    alt: "Beach photo with my sister and me.",
    width: 1644,
    height: 3222,
    figureClass:
      "z-[4] m-0 w-[55%] max-w-[min(100%,14.5rem)] shrink-0 rotate-[3deg] md:max-w-[15.5rem]",
    imgClass: "h-auto max-h-[min(46vh,22rem)] w-full object-contain",
  },
] as const;

export function AboutContent({ titleId, modal = false }: { titleId?: string; modal?: boolean }) {
  const Heading = modal ? "h2" : "h1";

  return (
    <div className={modal ? styles.centered : "flex flex-col gap-10"}>
      <Heading
        id={titleId}
        className="type-display text-pretty text-text-default"
      >
        Nice to meet you, I&apos;m Jennie!
      </Heading>

      <div className={modal ? undefined : "flex flex-col gap-12 lg:flex-row lg:gap-lg"}>
        <div className="flex min-w-0 flex-1 flex-col justify-center">
          <dl className="m-0 grid grid-cols-[minmax(0,auto)_1fr] gap-x-md gap-y-lg text-text-default [&_dd]:leading-6">
            <dt className="type-body-sm font-normal lowercase text-text-muted">
              who
            </dt>
            <dd className="type-body m-0 min-w-0 space-y-md text-pretty">
              <p className="m-0">
                I am a designer, artist, tinkerer, coder, sister,
                dog-lover, and a firm believer in:{" "}
                <strong className="font-bold">
                  &ldquo;I could probably make that.&rdquo;
                </strong>
              </p>
            </dd>

            <dt className="type-body-sm font-normal lowercase text-text-muted">
              what
            </dt>
            <dd className="type-body m-0 min-w-0 space-y-md text-pretty">
              <p className="m-0">
                Design, HCI, and Info Systems @ Carnegie Mellon
              </p>
              <p className="m-0">
                Previously @ Superhuman (Grammarly, Coda) working on
                Grammarly editor &amp; AI tooling in Docs
              </p>
              <p className="m-0">
                @ G2 redesigning site search &amp; G2 AI conversational
                experiences
              </p>
            </dd>

            <dt className="type-body-sm font-normal lowercase text-text-muted">
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

        {!modal && <AboutPhotos />}
      </div>
    </div>
  );
}

export function AboutPhotos({ scrapbook = false }: { scrapbook?: boolean }) {
  return (
        <div className={scrapbook ? styles.scrapbook : "relative flex min-w-0 flex-1 items-center justify-center pb-12 lg:justify-end"}>
          {INFO_PHOTOS.map((photo, i) => (
            <figure
              key={photo.src}
              className={scrapbook ? styles.photo : `${photo.figureClass}${i > 0 ? " -ml-14 md:-ml-16" : ""}`}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                width={photo.width}
                height={photo.height}
                sizes="(max-width: 600px) 150px, 220px"
                className={scrapbook ? styles.photoImage : photo.imgClass}
                priority={i === 0}
              />
            </figure>
          ))}
        </div>
  );
}
