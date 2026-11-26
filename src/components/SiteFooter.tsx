"use client";

import { useState } from "react";
import { BrandMark } from "@/components/BrandMark";
import { useLocale } from "@/components/LocaleProvider";

export function SiteFooter() {
  const { t } = useLocale();
  const [year] = useState(() => new Date().getFullYear());

  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div><BrandMark label={t.brand} /><p>{t.footerText}</p></div>
        <span>© {year} {t.rights}</span>
      </div>
    </footer>
  );
}
