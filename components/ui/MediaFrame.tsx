import Image from "next/image";

type MediaFrameProps = {
  src?: string;
  alt: string;
  aspect?: "16/9" | "4/5" | "1/1" | "2/1";
  className?: string;
  priority?: boolean;
  sizes?: string;
};

const aspectClass: Record<NonNullable<MediaFrameProps["aspect"]>, string> = {
  "16/9": "aspect-[16/9]",
  "4/5": "aspect-[4/5]",
  "1/1": "aspect-square",
  "2/1": "aspect-[2/1]",
};

/**
 * Consistent image wrapper with locked aspect ratio + lazy-loading.
 * When no `src` is supplied (no real asset yet), renders an honest
 * textured placeholder rather than a fake stock image.
 */
export function MediaFrame({
  src,
  alt,
  aspect = "16/9",
  className = "",
  priority = false,
  sizes = "100vw",
}: MediaFrameProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-sm bg-surface-raise ${aspectClass[aspect]} ${className}`}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          loading={priority ? undefined : "lazy"}
          sizes={sizes}
          className="object-cover"
        />
      ) : (
        <div
          role="img"
          aria-label={alt}
          className="absolute inset-0 flex items-center justify-center border border-hairline bg-surface-sink"
        >
          <span className="font-sans text-xs uppercase tracking-[0.2em] text-hairline-strong">
            Image pending
          </span>
        </div>
      )}
    </div>
  );
}
