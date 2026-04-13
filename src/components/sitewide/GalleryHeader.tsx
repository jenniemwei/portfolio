type GalleryHeaderSectionProps = {
  variant?: "section";
  title: string;
};

type GalleryHeaderIntroProps = {
  variant: "intro";
  title: string;
};

export type GalleryHeaderProps = GalleryHeaderSectionProps | GalleryHeaderIntroProps;

export function GalleryHeader(props: GalleryHeaderProps) {
  if (props.variant === "intro") {
    return (
      <div className="grid w-full grid-cols-6 gap-x-[var(--intro-grid-gap)] gap-y-[var(--intro-grid-gap)] border-border-default border-t border-solid pt-[var(--space-lg)] pb-[var(--space-xl)]">
        <p className="col-span-6 text-text-default [font:var(--text-display-title-font)] [letter-spacing:var(--text-display-title-letter-spacing)] md:col-span-4">
          {props.title}
        </p>
      </div>
    );
  }

  return (
    <div className="flex w-full items-center border-border-default border-b border-solid py-[var(--space-s)]">
      <p className="whitespace-nowrap text-text-secondary [font:var(--text-section-title-font)] [letter-spacing:var(--text-section-title-letter-spacing)]">
        {props.title}
      </p>
    </div>
  );
}
