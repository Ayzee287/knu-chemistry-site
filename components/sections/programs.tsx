import { Container } from "@/components/layout/container";
import { href, type Locale, type Dictionary } from "@/lib/i18n";

// Identity: a structured academic comparison — aligned columns separated by
// whitespace. The 3-up grid only engages at md to avoid cramping on tablets.
export function Programs({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const t = dict.programs;
  return (
    <section className="py-20 sm:py-24 lg:py-28">
      <Container>
        <p className="text-xs uppercase tracking-[0.2em] text-slate">
          {t.eyebrow}
        </p>
        <h2 className="mt-4 font-serif text-3xl text-navy sm:text-4xl">
          {t.title}
        </h2>

        <div className="mt-10 flex flex-col gap-10 md:gap-0">
          {t.items.map((program) => (
            <div
              key={program.title}
              className="grid gap-3 md:grid-cols-[12rem_1fr_auto] md:items-baseline md:gap-10 md:py-7"
            >
              <div className="min-w-0">
                <p className="text-xs uppercase tracking-[0.18em] text-slate">
                  {program.level}
                </p>
                <h3 className="mt-1 text-balance font-serif text-2xl text-navy">
                  {program.title}
                </h3>
              </div>
              <p className="min-w-0 max-w-md text-sm leading-6 text-slate">
                {program.desc}
              </p>
              <a
                href={href(lang, "/admissions")}
                className="inline-flex items-center gap-2 text-sm font-medium text-navy transition-colors hover:text-navy/70"
              >
                {program.cta}
                <span aria-hidden>→</span>
              </a>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
