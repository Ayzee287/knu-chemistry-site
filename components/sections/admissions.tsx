import { Container } from "@/components/layout/container";
import { href, type Locale, type Dictionary } from "@/lib/i18n";

export function Admissions({
  lang,
  dict,
}: {
  lang: Locale;
  dict: Dictionary;
}) {
  const t = dict.admissions;
  return (
    <section className="py-24 sm:py-28 lg:py-32">
      <Container>
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.2em] text-slate">
            {t.eyebrow}
          </p>
          <h2 className="mt-4 text-balance font-serif text-3xl text-navy sm:text-4xl">
            {t.title}
          </h2>
          <p className="mt-6 text-pretty text-lg leading-8 text-slate">
            {t.lead}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
            <a
              href={href(lang, "/admissions")}
              className="group inline-flex items-center gap-2 border-b-2 border-gold/70 pb-1 text-sm font-medium text-navy transition-colors hover:border-gold"
            >
              {t.ctaReq}
              <span
                aria-hidden
                className="text-gold transition-transform group-hover:translate-x-0.5"
              >
                →
              </span>
            </a>
            <a
              href={href(lang, "/contacts")}
              className="group inline-flex items-center gap-2 text-sm font-medium text-slate transition-colors hover:text-navy"
            >
              {t.ctaContact}
              <span
                aria-hidden
                className="transition-transform group-hover:translate-x-0.5"
              >
                →
              </span>
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
