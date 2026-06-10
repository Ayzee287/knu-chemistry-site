import { Container } from "./container";
import { Figure } from "@/components/ui/figure";
import { href, type Locale, type Dictionary } from "@/lib/i18n";

export function Hero({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const t = dict.hero;
  return (
    <section className="bg-ivory">
      <Container>
        <div className="grid gap-10 pt-12 sm:pt-16 lg:grid-cols-2 lg:items-center lg:gap-16 lg:pt-20">
          <div className="flex flex-col">
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-gold" />
              <span className="text-xs uppercase tracking-[0.2em] text-slate">
                {t.eyebrow}
              </span>
            </div>

            <h1 className="mt-8 max-w-xl text-balance font-serif text-4xl font-medium leading-[1.08] tracking-tight text-navy sm:text-5xl lg:text-6xl">
              {t.title}
            </h1>

            <p className="mt-6 max-w-md text-pretty text-lg leading-8 text-slate">
              {t.lead}
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
              <a
                href={href(lang, "/research")}
                className="group inline-flex items-center gap-2 border-b-2 border-gold/70 pb-1 text-sm font-medium text-navy transition-colors hover:border-gold"
              >
                {t.ctaResearch}
                <span
                  aria-hidden
                  className="text-gold transition-transform group-hover:translate-x-0.5"
                >
                  →
                </span>
              </a>
              <a
                href={href(lang, "/admissions")}
                className="group inline-flex items-center gap-2 text-sm font-medium text-slate transition-colors hover:text-navy"
              >
                {t.ctaPrograms}
                <span
                  aria-hidden
                  className="transition-transform group-hover:translate-x-0.5"
                >
                  →
                </span>
              </a>
            </div>
          </div>

          <Figure caption={t.figureCaption} index="01" ratio="aspect-[4/3]" />
        </div>

        <dl className="mt-14 grid gap-8 border-t border-navy/10 pt-8 pb-16 sm:grid-cols-3 lg:mt-20 lg:pb-24">
          <div>
            <dt className="text-xs uppercase tracking-[0.18em] text-slate">
              {t.metaAreasLabel}
            </dt>
            <dd className="mt-2 text-sm leading-6 text-navy/80">{t.metaAreas}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-[0.18em] text-slate">
              {t.metaProgramsLabel}
            </dt>
            <dd className="mt-2 text-sm leading-6 text-navy/80">
              {t.metaPrograms}
            </dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-[0.18em] text-slate">
              {t.metaUniversityLabel}
            </dt>
            <dd className="mt-2 text-sm leading-6 text-navy/80">
              {t.metaUniversity}
              <span className="block text-slate">{t.metaLocation}</span>
            </dd>
          </div>
        </dl>
      </Container>
    </section>
  );
}
