"use client";

import { createContext, use, useEffect, useState, type ReactNode } from "react";
import { content, type Locale } from "@/content/site";

const LocaleContext = createContext<{ locale: Locale; setLocale: (value: Locale) => void } | null>(null);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("fa");
  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === "fa" ? "rtl" : "ltr";
  }, [locale]);

  return <LocaleContext value={{ locale, setLocale }}>{children}</LocaleContext>;
}

export function useLocale() {
  const context = use(LocaleContext);
  if (!context) throw new Error("LocaleProvider is required.");
  return { ...context, rtl: context.locale === "fa", t: content[context.locale] };
}
