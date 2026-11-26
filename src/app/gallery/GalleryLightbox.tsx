"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useLocale } from "@/components/LocaleProvider";
import type { GalleryItem } from "@/config/media";
import { galleryCopy } from "@/content/site";
import styles from "./gallery.module.css";

type LightboxProps = {
  item: GalleryItem;
  index: number;
  count: number;
  trigger: HTMLButtonElement;
  move: (step: number) => void;
  close: () => void;
};

export function GalleryLightbox({ item, index, count, trigger, move, close }: LightboxProps) {
  const { locale, rtl } = useLocale();
  const copy = galleryCopy[locale];
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const number = new Intl.NumberFormat(locale);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.showModal();
    closeRef.current?.focus();
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
      trigger.focus({ preventScroll: true });
    };
  }, [trigger]);

  return (
    <dialog className={styles.dialog} ref={dialogRef} aria-labelledby="gallery-photo-title"
      onCancel={(event) => {
        event.preventDefault();
        close();
      }}
      onKeyDown={(event) => {
        if (event.target instanceof HTMLElement && event.target.dataset.actual === "true") return;
        if (count > 1 && (event.key === "ArrowLeft" || event.key === "ArrowRight")) {
          event.preventDefault();
          move((event.key === "ArrowRight") === rtl ? -1 : 1);
        }
      }}>
      <div className={styles.dialogLayout}>
        <div className={styles.dialogHeader}>
          <h2 id="gallery-photo-title">{item.title[locale]}</h2>
          <button ref={closeRef} type="button" className="button button-outline" onClick={close}>
            {copy.close}
          </button>
        </div>
        <GalleryPhoto key={item.id} item={item} />
        <div className={styles.dialogFooter}>
          {item.description?.[locale] && <p>{item.description[locale]}</p>}
          <div className={styles.controls}>
            <button type="button" className="button button-outline" disabled={count < 2} onClick={() => move(-1)}>
              {copy.previous}
            </button>
            <p role="status">{number.format(index + 1)} {copy.of} {number.format(count)}</p>
            <button type="button" className="button button-outline" disabled={count < 2} onClick={() => move(1)}>
              {copy.next}
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
}

function GalleryPhoto({ item }: { item: GalleryItem }) {
  const { locale } = useLocale();
  const copy = galleryCopy[locale];
  const [photo, setPhoto] = useState<"loading" | "loaded" | "failed">("loading");
  const [actual, setActual] = useState(false);
  const viewportRef = useRef<HTMLDivElement>(null);
  const size = item.standard.dimensions;

  return (
    <div className={styles.viewer}>
      <div ref={viewportRef} className={styles.imageViewport} data-actual={actual}
        tabIndex={actual ? 0 : undefined} aria-label={actual ? item.title[locale] : undefined}>
        {photo === "loading" && <p role="status" className={styles.photoMessage}>{copy.loading}</p>}
        {photo === "failed"
          ? <p role="status" className={styles.photoMessage}>{copy.imageUnavailable}</p>
          : <Image src={item.standard.src} alt={item.alt[locale]} width={size?.width ?? 1} height={size?.height ?? 1}
            className={styles.standardPhoto} unoptimized loading="eager" data-loaded={photo === "loaded"}
            aria-hidden={photo === "loading"} onLoad={() => setPhoto("loaded")} onError={() => setPhoto("failed")} />}
      </div>
      <button type="button" className={`button button-outline ${styles.zoom}`} disabled={photo !== "loaded"}
        aria-pressed={actual} onClick={() => {
          viewportRef.current?.scrollTo(0, 0);
          setActual(!actual);
        }}>
        {actual ? copy.fit : copy.actualSize}
      </button>
    </div>
  );
}
