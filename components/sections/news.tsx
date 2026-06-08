import { Container } from "@/components/layout/container";
import { href, type Locale, type Dictionary } from "@/lib/i18n";

// Identity: temporal, lighter — one featured item, a compact recent list.
export function News({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const t = dict.news;
  return (
    <section className="py-20 sm:py-24 lg:py-28">
      <Container>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate">
              {t.eyebrow}
            </p>
            <h2 className="mt-4 font-serif text-3xl text-navy sm:text-4xl">
              {t.title}
            </h2>
          </div>
          <a
            href={href(lang, "/research")}
            className="text-sm font-medium text-slate transition-colors hover:text-navy"
          >
            {t.all} →
          </a>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
          <a href={href(lang, "/research")} className="group block">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-slate">
              <time>{t.featured.date}</time>
              <span aria-hidden>·</span>
              <span>{t.featured.kind}</span>
            </div>
            <h3 className="mt-3 max-w-xl text-balance font-serif text-2xl leading-snug text-navy underline-offset-4 group-hover:underline sm:text-3xl">
              {t.featured.title}
            </h3>
            <p className="mt-3 max-w-md text-sm leading-6 text-slate">
              {t.featured.excerpt}
            </p>
          </a>

          <ul className="flex flex-col gap-6 lg:border-l lg:border-navy/10 lg:pl-16">
            {t.items.map((item) => (
              <li key={item.title}>
                <a href={href(lang, "/research")} className="group block">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-slate">
                    <time>{item.date}</time>
                    <span aria-hidden>·</span>
                    <span>{item.kind}</span>
                  </div>
                  <h4 className="mt-1 text-base font-medium text-navy underline-offset-4 group-hover:underline">
                    {item.title}
                  </h4>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
