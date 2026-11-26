"use client";
import Link from "next/link";
import { useLocale } from "@/components/LocaleProvider";
import { MediaImage } from "@/components/MediaImage";
import { RestaurantVideo } from "@/components/RestaurantVideo";
import { galleryCopy } from "@/content/site";
import { galleryItems, media } from "@/config/media";

export default function Home() {
  const { locale, rtl, t } = useLocale();
  const gallery = galleryCopy[locale];

  return (
    <main dir={rtl ? "rtl" : "ltr"}>
      <section id="top" className="hero">
        <MediaImage src={media.hero} alt={rtl ? "تصویر فضای باربیکیو" : "Barbecue atmosphere"} priority className="hero-media" />
        <div className="hero-overlay" />
        <div className="container hero-content">
          <span className="eyebrow">{t.eyebrow}</span>
          <h1>{t.headline}</h1>
          <p>{t.heroText}</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#menu">{t.menuLink}</a>
            <a className="button button-outline" href="#about">{t.discover}</a>
          </div>
        </div>
        <span className="hero-edge" aria-hidden="true">01 / 05</span>
      </section>

      <section id="about" className="section about-section">
        <div className="container two-column">
          <div className="about-visual"><MediaImage src={media.about} alt={rtl ? "داستان رستوران" : "Our restaurant story"} sizes="(max-width: 850px) 100vw, 50vw" /></div>
          <div className="section-copy">
            <span className="eyebrow">{t.aboutLabel}</span><h2>{t.aboutTitle}</h2>
            <p>{t.aboutText}</p><p>{t.aboutExtra}</p>
            <div className="small-rule" />
          </div>
        </div>
      </section>

      <section id="menu" className="section menu-section">
        <div className="container">
          <div className="section-heading centered"><span className="eyebrow">{t.menuLabel}</span>
            <h2>{t.menuTitle}</h2><p>{t.menuText}</p></div>
          <div className="menu-grid">
            {t.dishes.map((dish) => (
              <article className="menu-card" key={dish.image}>
                <MediaImage src={media.menu[dish.image]} alt={dish.name} className="menu-photo" sizes="(max-width: 760px) 100vw, 33vw" />
                <div className="menu-card-copy"><span className="card-line" aria-hidden="true" /><h3>{dish.name}</h3><p>{dish.description}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="section services-section">
        <div className="container"><div className="section-heading centered">
          <span className="eyebrow">{t.servicesLabel}</span><h2>{t.servicesTitle}</h2>
        </div><div className="service-grid">
          {t.services.map((service, index) => <article className="service-card" key={service.title}>
            <span className="service-number">0{index + 1}</span><h3>{service.title}</h3><p>{service.text}</p>
          </article>)}
        </div></div>
      </section>

      <section id="gallery" className="section gallery-section">
        <div className="container">
          <div className="section-heading centered">
            <span className="eyebrow">{t.galleryLabel}</span>
            <h2><Link href="/gallery">{t.galleryTitle}</Link></h2>
          </div>
          <div className="gallery-grid">
            {galleryItems.filter((item) => item.featured).map((item, index) => (
              <MediaImage key={item.id} src={item.thumbnail.src} alt={item.alt[locale]}
                fallbackAlt={gallery.imageUnavailable}
                className={index === 0 ? "gallery-large" : "gallery-small"}
                sizes={index === 0 ? "(max-width: 600px) 100vw, 58vw" : "(max-width: 600px) 100vw, 42vw"} />
            ))}
          </div>
          <div className="gallery-preview-action">
            <Link className="button button-outline" href="/gallery">{gallery.viewAll}</Link>
          </div>
        </div>
      </section>

      <section id="video" className="section video-section">
        <div className="container two-column video-layout">
          <div className="section-copy"><span className="eyebrow">{t.videoLabel}</span>
            <h2>{t.videoTitle}</h2><p>{t.videoText}</p></div>
          <RestaurantVideo fallback={t.playFallback} />
        </div>
      </section>

      <section id="contact" className="section contact-section">
        <div className="container contact-layout"><div className="section-copy">
          <span className="eyebrow">{t.contactLabel}</span><h2>{t.contactTitle}</h2><p>{t.contactText}</p>
        </div><div className="contact-list">
          <div><strong>{t.addressLabel}</strong><span>{t.address}</span></div>
          <div><strong>{t.phoneLabel}</strong><span>{t.phone}</span></div>
          <div><strong>{t.hoursLabel}</strong><span>{t.hours}</span></div>
        </div></div>
      </section>

    </main>
  );
}
