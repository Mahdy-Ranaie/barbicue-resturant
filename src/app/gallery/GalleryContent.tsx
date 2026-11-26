"use client";

import Link from "next/link";
import { useState } from "react";
import { useLocale } from "@/components/LocaleProvider";
import { MediaImage } from "@/components/MediaImage";
import { galleryItems } from "@/config/media";
import { galleryCopy } from "@/content/site";
import { GalleryLightbox } from "./GalleryLightbox";
import styles from "./gallery.module.css";

export function GalleryContent() {
  const { locale, rtl } = useLocale();
  const copy = galleryCopy[locale];
  const [selection, setSelection] = useState<{ index: number; trigger: HTMLButtonElement } | null>(null);

  function move(step: number) {
    setSelection((current) => current && {
      ...current,
      index: (current.index + step + galleryItems.length) % galleryItems.length,
    });
  }

  return (
    <main className={`section ${styles.page}`} dir={rtl ? "rtl" : "ltr"}>
      <div className="container">
        <div className="section-heading">
          <Link className={styles.homeLink} href="/">{copy.backHome}</Link>
          <h1>{copy.title}</h1>
        </div>
        {galleryItems.length === 0
          ? <p>{copy.noPhotos}</p>
          : <ul className={styles.grid}>
            {galleryItems.map((item, index) => (
              <li key={item.id}>
                <figure className={styles.card}>
                  <button type="button" className={styles.thumbnailButton} aria-label={item.title[locale]}
                    onClick={(event) => setSelection({ index, trigger: event.currentTarget })}>
                    <MediaImage src={item.thumbnail.src} alt={item.alt[locale]} fallbackAlt={copy.imageUnavailable}
                      className={styles.thumbnail}
                      sizes="(max-width: 600px) 100vw, (max-width: 850px) 50vw, (max-width: 1200px) 33vw, 285px" />
                  </button>
                  <figcaption>
                    <span>{item.title[locale]}</span>
                    {item.description?.[locale] && <p>{item.description[locale]}</p>}
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>}
      </div>
      {selection && (
        <GalleryLightbox item={galleryItems[selection.index]} index={selection.index}
          count={galleryItems.length} trigger={selection.trigger} move={move} close={() => setSelection(null)} />
      )}
    </main>
  );
}
