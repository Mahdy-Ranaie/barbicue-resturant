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
};
export function MediaImage({ src, alt, className = "", priority = false, sizes = "100vw" }: Props) {
  const [failed, setFailed] = useState(false);
  return (
    <div className={`media-frame ${className}`}>
      <Image
        src={failed ? media.placeholder : src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className="media-photo"
        onError={() => setFailed(true)}
      />
    </div>
  );
}
