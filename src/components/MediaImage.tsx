"use client";
import Image from "next/image";
import { useState } from "react";
import { media } from "@/config/media";

type Props = {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
  fallbackAlt?: string;
};
export function MediaImage({ src, alt, className = "", priority = false, sizes = "100vw", fallbackAlt }: Props) {
  const [failure, setFailure] = useState<{ src: string; terminal: boolean }>();
  const usePlaceholder = failure?.src === src;
  const replacementAlt = fallbackAlt ?? alt;

  return (
    <div className={`media-frame ${className}`}>
      {usePlaceholder && failure.terminal
        ? <span role="img" aria-label={replacementAlt} />
        : <Image
          src={usePlaceholder ? media.placeholder : src}
          alt={usePlaceholder ? replacementAlt : alt}
          fill
          priority={priority}
          sizes={sizes}
          className="media-photo"
          onError={() => setFailure({ src, terminal: usePlaceholder })}
        />}
    </div>
  );
}
