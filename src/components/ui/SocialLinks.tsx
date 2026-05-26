import type { CSSProperties } from "react";

import { SOCIAL_LINKS, type SocialLink } from "@/data/social-links";

const SOCIAL_ICON_LINK_CLASS =
  "group inline-flex size-6 items-center justify-center origin-center rotate-0 outline-none transition-[transform,filter] duration-[350ms] ease-in-out hover:rotate-[30deg] hover:drop-shadow-[0_8px_16px_rgba(0,0,0,0.24)] focus-visible:rotate-[30deg] focus-visible:drop-shadow-[0_8px_16px_rgba(0,0,0,0.24)]";

const SOCIAL_ICON_MASK_CLASS =
  "block size-6 aspect-square bg-text-secondary opacity-80 transition-opacity duration-[250ms] ease-in group-hover:opacity-100 group-focus-visible:opacity-100 [mask-image:var(--social-icon-url)] [mask-repeat:no-repeat] [mask-position:center] [mask-size:contain] [-webkit-mask-image:var(--social-icon-url)] [-webkit-mask-repeat:no-repeat] [-webkit-mask-position:center] [-webkit-mask-size:contain]";

interface SocialLinksProps {
  links?: readonly SocialLink[];
  className?: string;
  id?: string;
}

export function SocialLinks({
  links = SOCIAL_LINKS,
  className,
  id,
}: SocialLinksProps) {
  return (
    <div
      id={id}
      className={
        className ??
        "flex w-fit flex-row items-center justify-start gap-8"
      }
    >
      {links.map((link) => (
        <a
          key={link.href}
          href={link.href}
          {...("external" in link && link.external
            ? { target: "_blank", rel: "noreferrer" }
            : {})}
          aria-label={link.label}
          className={SOCIAL_ICON_LINK_CLASS}
        >
          <span
            aria-hidden
            className={SOCIAL_ICON_MASK_CLASS}
            style={
              { "--social-icon-url": `url('${link.icon}')` } as CSSProperties
            }
          />
        </a>
      ))}
    </div>
  );
}
