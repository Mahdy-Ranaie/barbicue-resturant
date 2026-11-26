import type { Locale } from "@/content/site";

export type GalleryImage = {
  src: string;
  dimensions?: { width: number; height: number };
};

export type GalleryItem = {
  id: string;
  thumbnail: GalleryImage;
  standard: GalleryImage;
  title: Record<Locale, string>;
  alt: Record<Locale, string>;
  description?: Partial<Record<Locale, string>>;
  order: number;
  featured: boolean;
  visible: boolean;
};

const gallery: readonly GalleryItem[] = [1, 2, 3].map((order) => {
  const id = `gallery-0${order}`;
  const persianNumber = new Intl.NumberFormat("fa").format(order);
  return {
    id,
    thumbnail: { src: `/images/gallery/thumbnails/${id}.webp` },
    standard: { src: `/images/gallery/standard/${id}.webp` },
    title: { fa: `عکس ${persianNumber}`, en: `Photo ${order}` },
    alt: { fa: `عکس ${persianNumber} از گالری رستوران`, en: `Restaurant gallery photo ${order}` },
    order,
    featured: true,
    visible: true,
  };
});

export const galleryItems = gallery.filter((item) => item.visible).sort((a, b) => a.order - b.order);

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
  gallery,
  video: {
    src: "/videos/restaurant-intro.mp4",
    poster: "/videos/restaurant-poster.webp"
  },
  placeholder: "/images/placeholders/media-placeholder.svg"
} as const;
