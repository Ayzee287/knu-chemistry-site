"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "@/components/layout/container";
import { href, locales, type Locale, type Dictionary } from "@/lib/i18n";

export function Header({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const pathname = usePathname() || `/${lang}`;
  // Path without the locale prefix, e.g. "/ua/research" → "/research".
  const rest = pathname.replace(/^\/(ua|en)(?=\/|$)/, "");

  const isActive = (path: string) =>
    rest === path || (path !== "" && rest.startsWith(`${path}/`));

  return (
    <header className="sticky top-0 z-50 border-b border-navy/10 bg-ivory">
      <Container>
        <div className="flex h-16 items-center justify-between lg:h-20">
          <Link
            href={href(lang, "/")}
            className="font-serif text-lg tracking-tight text-navy"
          >
            {dict.brand.short}
          </Link>

          <div className="flex items-center gap-6 lg:gap-8">
            <nav className="hidden lg:block" aria-label={dict.ui.primaryNav}>
              <ul className="flex items-center gap-6 text-sm text-slate lg:gap-7">
                {dict.nav.map((item) => {
                  const active = isActive(item.href);
                  return (
                    <li key={item.href}>
                      <Link
                        href={href(lang, item.href)}
                        aria-current={active ? "page" : undefined}
                        className={`relative transition-colors after:absolute after:-bottom-1.5 after:left-0 after:h-px after:bg-navy after:transition-[width] after:duration-200 ${
                          active
                            ? "text-navy after:w-full"
                            : "hover:text-navy after:w-0 hover:after:w-full"
                        }`}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Language switcher — preserves the current page */}
            <nav
              aria-label={dict.ui.languageNav}
              className="hidden items-center gap-2 text-xs uppercase tracking-[0.12em] lg:flex"
            >
              {locales.map((loc, i) => (
                <span key={loc} className="flex items-center gap-2">
                  {i > 0 ? <span className="text-navy/25">/</span> : null}
                  <Link
                    href={`/${loc}${rest}`}
                    aria-current={loc === lang ? "true" : undefined}
                    className={
                      loc === lang
                        ? "text-navy"
                        : "text-slate transition-colors hover:text-navy"
                    }
                  >
                    {loc === "ua" ? "UA" : "EN"}
                  </Link>
                </span>
              ))}
            </nav>

            {/* Mobile */}
            <details className="relative lg:hidden">
              <summary className="flex cursor-pointer list-none items-center text-sm text-navy [&::-webkit-details-marker]:hidden">
                {dict.ui.menu}
              </summary>
              <nav
                aria-label={dict.ui.primaryNav}
                className="absolute right-0 top-full mt-3 w-56 border border-navy/10 bg-ivory p-2"
              >
                <ul className="flex flex-col">
                  {dict.nav.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={href(lang, item.href)}
                        className="block px-3 py-2 text-sm text-slate transition-colors hover:text-navy"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                  <li className="mt-1 flex gap-4 border-t border-navy/10 px-3 pt-3 text-xs uppercase tracking-[0.12em]">
                    {locales.map((loc) => (
                      <Link
                        key={loc}
                        href={`/${loc}${rest}`}
                        className={loc === lang ? "text-navy" : "text-slate"}
                      >
                        {loc === "ua" ? "UA" : "EN"}
                      </Link>
                    ))}
                  </li>
                </ul>
              </nav>
            </details>
          </div>
        </div>
      </Container>
    </header>
  );
}
