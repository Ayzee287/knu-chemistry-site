import { Container } from "@/components/layout/container";
import { href, type Locale, type Dictionary } from "@/lib/i18n";

// Identity: the institutional closing statement. The one deep-navy band on the
// page — the site's own palette inverted — anchors the ending the way a serious
// academic site closes before its footer. Focus outlines are flipped to ivory
// here because the global navy outline would vanish on this background.
export function Admissions({
  lang,
  dict,
}: {
  lang: Locale;
  dict: Dictionary;
}) {
  const t = dict.admissions;
  return (
    <section className="bg-navy py-24 sm:py-28 lg:py-32">
      <Container>
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.2em] text-ivory/60">
            {t.eyebrow}
          </p>
          <h2 className="mt-4 text-balance font-serif text-3xl text-ivory sm:text-4xl">
            {t.title}
          </h2>
          <p className="mt-6 text-pretty text-lg leading-8 text-ivory/75">
            {t.lead}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
            <a
              href={href(lang, "/admissions")}
              className="group inline-flex items-center gap-2 border-b-2 border-gold/70 pb-1 text-sm font-medium text-ivory transition-colors hover:border-gold focus-visible:outline-ivory"
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
              className="group inline-flex items-center gap-2 text-sm font-medium text-ivory/70 transition-colors hover:text-ivory focus-visible:outline-ivory"
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
