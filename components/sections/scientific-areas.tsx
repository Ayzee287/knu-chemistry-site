import { Container } from "@/components/layout/container";
import { getDepartments } from "@/content/data/departments";
import { href, type Locale, type Dictionary } from "@/lib/i18n";

const NUMERAL = ["I", "II", "III", "IV", "V"];

// Identity: taxonomic index — a scannable catalogue of the discipline.
export function ScientificAreas({
  lang,
  dict,
}: {
  lang: Locale;
  dict: Dictionary;
}) {
  const t = dict.areas;
  const departments = getDepartments(lang);
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

        <ul className="mt-12 divide-y divide-navy/10 border-y border-navy/10">
          {departments.map((dept, i) => (
            <li key={dept.id}>
              <a
                href={href(lang, "/departments")}
                className="group -mx-4 flex flex-col gap-1 rounded-sm px-4 py-6 transition-colors hover:bg-navy/[0.03] sm:flex-row sm:items-baseline sm:gap-8"
              >
                <span className="font-serif text-sm tabular-nums text-navy/35 sm:w-8 sm:pt-1">
                  {NUMERAL[i]}
                </span>
                <span className="font-serif text-2xl text-navy sm:basis-[32%] sm:text-3xl">
                  {dept.name}
                </span>
                <span className="flex-1 text-sm leading-6 text-slate">
                  {dept.research}
                </span>
                <span
                  aria-hidden
                  className="hidden text-slate transition-transform group-hover:translate-x-0.5 sm:inline"
                >
                  →
                </span>
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
