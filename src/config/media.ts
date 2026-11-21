/**
 * Central registry for public assets.
 * Place your real media at these paths; no component edits are needed.
 */
export const media = {
  logo: "/images/branding/logo.svg",
  hero: "/images/hero/hero-main.webp",
  about: "/images/about/restaurant-story.webp",
  menu: {
    brisket: "/images/menu/brisket.webp",
    chicken: "/images/menu/chicken.webp",
    burger: "/images/menu/burger.webp"
  },
  gallery: [
    "/images/gallery/gallery-01.webp",
    "/images/gallery/gallery-02.webp",
    "/images/gallery/gallery-03.webp"
  ],
  video: {
    src: "/videos/restaurant-intro.mp4",
    poster: "/videos/restaurant-poster.webp"
  },
  placeholder: "/images/placeholders/media-placeholder.svg"
} as const;
