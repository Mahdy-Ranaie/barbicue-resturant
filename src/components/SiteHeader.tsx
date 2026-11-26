"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { BrandMark } from "@/components/BrandMark";
import { useLocale } from "@/components/LocaleProvider";

export function SiteHeader() {
  const { rtl, setLocale, t } = useLocale();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLElement>(null);
  useEffect(() => {
    if (menuOpen) menuRef.current?.querySelector("a")?.focus();
  }, [menuOpen]);
  const destinations = [
    { href: "/#about", label: t.nav.about },
    { href: "/#menu", label: t.nav.menu },
    { href: "/#services", label: t.nav.services },
    { href: "/gallery", label: t.nav.gallery },
    { href: "/#contact", label: t.nav.contact },
  ];

  return (
    <header className={`site-header${pathname === "/" ? "" : " site-header-inner"}`} onKeyDown={(event) => {
      if (event.key === "Escape" && menuOpen) {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    }}>
      <div className="container nav-inner">
        <Link className="brand-link" href="/" aria-label={t.brand} onClick={() => setMenuOpen(false)}>
          <BrandMark label={t.brand} />
        </Link>
        <nav ref={menuRef} id="site-navigation" className="site-nav" data-open={menuOpen} aria-label={t.navigationLabel}>
          {destinations.map(({ href, label }) => (
            <Link key={href} href={href} aria-current={pathname === href ? "page" : undefined}
              onClick={() => setMenuOpen(false)}>{label}</Link>
          ))}
        </nav>
        <div className="header-actions">
          <button ref={menuButtonRef} className="mobile-nav-toggle" type="button"
            aria-controls="site-navigation" aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}>{t.mobileNavigation}</button>
          <button className="language-switch" type="button" lang={rtl ? "en" : "fa"} aria-label={t.switchLanguage}
            onClick={() => setLocale(rtl ? "en" : "fa")}>{rtl ? "EN" : "فا"}</button>
        </div>
      </div>
    </header>
  );
}
