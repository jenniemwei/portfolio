import Image, { type ImageProps } from "next/image";

/** Props aligned with `next/image` for optimized WebP/AVIF (`next.config` `images.formats`). */
export type GalleryThumbImageProps = Pick<ImageProps, "src" | "alt"> & {
  sizes: NonNullable<ImageProps["sizes"]>;
};

export function GalleryThumbImage({ src, alt, sizes }: GalleryThumbImageProps) {
  return (
    <div className="absolute inset-0 min-h-0 min-w-0">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes={sizes}
      />
    </div>
  );
}
