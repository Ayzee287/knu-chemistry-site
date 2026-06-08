import { en } from "@/content/en";
import { ua } from "@/content/ua";

export const locales = ["ua", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "ua";

// English is the canonical shape; Ukrainian is type-checked against it for parity.
export type Dictionary = typeof en;

const dictionaries: Record<Locale, Dictionary> = { ua, en };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries[defaultLocale];
}

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** Prefix an app path with the active locale. "" / "/" → the locale home. */
export function href(lang: Locale, path: string): string {
  if (!path || path === "/") return `/${lang}`;
  return `/${lang}${path}`;
}
