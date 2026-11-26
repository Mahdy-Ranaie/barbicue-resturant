# Media files — v0.0.6

Add your original assets at these **exact paths**. All paths are referenced through `src/config/media.ts`.

| File | Suggested size | Use |
| --- | --- | --- |
| `public/images/branding/logo.svg` | vector | Header and footer |
| `public/images/hero/hero-main.webp` | 1920×1080 | Hero background |
| `public/images/about/restaurant-story.webp` | 1200×1400 | Story |
| `public/images/menu/brisket.webp` | 900×700 | Menu |
| `public/images/menu/chicken.webp` | 900×700 | Menu |
| `public/images/menu/burger.webp` | 900×700 | Menu |
| `public/videos/restaurant-intro.mp4` | 1080p, H.264 | Video showcase |
| `public/videos/restaurant-poster.webp` | 1280×720 | Video poster |

Images show the built-in placeholder until supplied. The video displays a fallback if it cannot load.
Do not commit sensitive or unlicensed media. Compress images before publishing.

## Gallery image pairs

```text
public/images/gallery/
  thumbnails/gallery-01.webp
  standard/gallery-01.webp
```

The initial registry uses `gallery-01` through `gallery-03`. Keep matching basenames for every pair. Use optimized WebP thumbnails up to approximately 480 × 360 px, with a consistent 4:3 display frame. Use WebP or JPEG for the standard file. Preserve orientation and aspect ratio and aim for a maximum long edge of about 1920 px. Existing approved standard images may retain larger dimensions. Avoid upscaling.

1. Keep the approved original and export the two derivatives into the paired directories. Respect EXIF rotation and verify the resulting orientation.
2. Add or update the entry in `src/config/media.ts`. Set the ID, both paths, actual dimensions when known, descriptive Persian and English alt text, titles, optional descriptions, order, visibility, and featured flag. The preview and Gallery share this registry.
3. Verify the thumbnail and full image in desktop and mobile browsers. The standard file is requested when an item opens in the viewer. Missing thumbnails show the existing local placeholder and missing standard files display a localized message.

The earlier flat gallery paths are historical. Existing source JPEGs in the original checkout remain available for an approved asset pass.
