"use client";
import { useEffect, useState } from "react";
import { BrandMark } from "@/components/BrandMark";
import { MediaImage } from "@/components/MediaImage";
import { RestaurantVideo } from "@/components/RestaurantVideo";
import { content, type Locale } from "@/content/site";
import { media } from "@/config/media";

export default function Home() {
  const [locale, setLocale] = useState<Locale>("fa");
  const t = content[locale];
  const rtl = locale === "fa";
  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = rtl ? "rtl" : "ltr";
  }, [locale, rtl]);

  return (
    <main dir={rtl ? "rtl" : "ltr"}>
      <header className="site-header">
        <div className="container nav-inner">
          <a className="brand-link" href="#top" aria-label={t.brand}><BrandMark label={t.brand} /></a>
          <nav className="desktop-nav" aria-label={rtl ? "ناوبری اصلی" : "Main navigation"}>
            <a href="#about">{t.nav.about}</a><a href="#menu">{t.nav.menu}</a>
            <a href="#services">{t.nav.services}</a><a href="#gallery">{t.nav.gallery}</a>
            <a href="#contact">{t.nav.contact}</a>
          </nav>
          <button className="language-switch" type="button"
            aria-label={rtl ? "Switch to English" : "تغییر زبان به فارسی"}
            onClick={() => setLocale(rtl ? "en" : "fa")}>{rtl ? "EN" : "فا"}</button>
        </div>
      </header>

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
        <div className="container"><div className="section-heading centered">
          <span className="eyebrow">{t.galleryLabel}</span><h2>{t.galleryTitle}</h2>
        </div><div className="gallery-grid">
          {media.gallery.map((src, index) => <MediaImage key={src} src={src}
            alt={rtl ? `تصویر گالری ${index + 1}` : `Gallery image ${index + 1}`}
            className={index === 0 ? "gallery-large" : "gallery-small"} sizes="(max-width: 760px) 100vw, 50vw" />)}
        </div></div>
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

      <footer className="footer"><div className="container footer-inner">
        <div><BrandMark label={t.brand} /><p>{t.footerText}</p></div>
        <span>© {new Date().getFullYear()} {t.rights}</span>
      </div></footer>
    </main>
  );
}
