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

const galleryPhotos = [
  {
    title: { fa: "پیشخوان باربیکیو", en: "Barbecue counter" },
    alt: { fa: "دو نفر پشت پیشخوان چوبی باربیکیو زیر چراغ‌های آویز", en: "Two people behind a wooden barbecue counter under hanging lights" },
  },
  {
    title: { fa: "چیدمان پیشخوان", en: "Counter display" },
    alt: { fa: "ظرف‌های غذا روی پیشخوان روشن باربیکیو", en: "Food displayed on an illuminated barbecue counter" },
  },
  {
    title: { fa: "سینی باربیکیو", en: "Barbecue platter" },
    alt: { fa: "سینی گوشت، سیخ‌های کباب، ذرت و سبزیجات گریل‌شده", en: "A platter of grilled meats, skewers, corn, and vegetables" },
  },
  {
    title: { fa: "سیخ‌های کباب", en: "Barbecue skewers" },
    alt: { fa: "سیخ‌های گوشت چیده‌شده دور یک ظرف سرو", en: "Meat skewers arranged around a serving display" },
  },
];

const gallery: readonly GalleryItem[] = galleryPhotos.map(({ title, alt }, index) => {
  const order = index + 1;
  const id = `gallery-0${order}`;
  const portrait = order >= 3;
  return {
    id,
    thumbnail: { src: `/images/gallery/thumbnails/${id}.webp`, dimensions: { width: portrait ? 270 : 480, height: 360 } },
    standard: { src: `/images/gallery/standard/${id}.webp`, dimensions: { width: portrait ? 1440 : 1920, height: portrait ? 1920 : 1440 } },
    title,
    alt,
    order,
    featured: order <= 3,
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
    brisket: "/images/menu/brisket.jpeg",
    chicken: "/images/menu/chicken.jpeg",
    burger: "/images/menu/burger.jpeg"
  },
  gallery,
  video: {
    src: "/videos/restaurant-intro.mp4",
    poster: "/videos/restaurant-poster.jpeg"
  },
  placeholder: "/images/placeholders/media-placeholder.svg"
} as const;
