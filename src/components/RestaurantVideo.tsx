"use client";
import { useState } from "react";
import { media } from "@/config/media";
export function RestaurantVideo({ fallback }: { fallback: string }) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return <div className="video-fallback" role="status"><span aria-hidden="true">▶</span><p>{fallback}</p></div>;
  }
  return (
    <video
      className="restaurant-video"
      controls
      playsInline
      preload="metadata"
      poster={media.video.poster}
      src={media.video.src}
      ref={(video) => {
        if (video?.error) setFailed(true);
      }}
      onError={() => setFailed(true)}
      aria-label="Restaurant introduction video"
    >
      {fallback}
    </video>
  );
}
