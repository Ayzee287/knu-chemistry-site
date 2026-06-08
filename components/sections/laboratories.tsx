import { Container } from "@/components/layout/container";
import { Figure } from "@/components/ui/figure";
import { href, type Locale, type Dictionary } from "@/lib/i18n";

export function Laboratories({
  lang,
  dict,
}: {
  lang: Locale;
  dict: Dictionary;
}) {
  const t = dict.labs;
  return (
    <section className="py-20 sm:py-24 lg:py-28">
      <Container>
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-16">
          <Figure
            caption={t.figureCaption}
            index="02"
            ratio="aspect-[4/3]"
            className="order-first lg:sticky lg:top-28"
          />

          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate">
              {t.eyebrow}
            </p>
            <h2 className="mt-4 text-balance font-serif text-3xl text-navy sm:text-4xl">
              {t.title}
            </h2>
            <p className="mt-6 max-w-md text-pretty text-lg leading-8 text-slate">
              {t.lead}
            </p>

            <ul className="mt-8 divide-y divide-navy/10 border-t border-navy/10">
              {t.items.map((lab) => (
                <li key={lab.name} className="py-4">
                  <h3 className="font-serif text-lg text-navy">{lab.name}</h3>
                  <p className="mt-1 text-sm leading-6 text-slate">{lab.focus}</p>
                </li>
              ))}
            </ul>

            <a
              href={href(lang, "/research")}
              className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-navy transition-colors hover:text-navy/70"
            >
              {t.cta}
              <span aria-hidden>→</span>
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
