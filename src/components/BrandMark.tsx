"use client";
import Image from "next/image";
import { useState } from "react";
import { media } from "@/config/media";
export function BrandMark({ label }: { label: string }) {
  const [failed, setFailed] = useState(false);
  return (
    <span className="brand-mark">
      {!failed && (
        <Image src={media.logo} alt="" width={42} height={42} className="brand-logo"
          onError={() => setFailed(true)} />
      )}
      <span className="brand-word">{label}</span>
    </span>
  );
}
