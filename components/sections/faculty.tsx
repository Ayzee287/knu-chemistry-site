import { Container } from "@/components/layout/container";
import { Figure } from "@/components/ui/figure";
import { getDepartments } from "@/content/data/departments";
import { href, type Locale, type Dictionary } from "@/lib/i18n";

/**
 * Institutional hierarchy: a representative Dean block (leadership anchor),
 * then the five department heads as structurally EQUAL peers — no featured
 * favouritism. Department data comes from the single source of truth.
 */
export function Faculty({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const t = dict.faculty;
  const departments = getDepartments(lang);
  return (
    <section className="bg-sand py-20 sm:py-24 lg:py-28">
      <Container>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate">
              {t.eyebrow}
            </p>
            <h2 className="mt-4 max-w-2xl text-balance font-serif text-3xl text-navy sm:text-4xl">
              {t.title}
            </h2>
          </div>
          <a
            href={href(lang, "/faculty")}
            className="text-sm font-medium text-slate transition-colors hover:text-navy"
          >
            {t.all} →
          </a>
        </div>

        {/* Dean block — representative leadership anchor, not a featured person */}
        <div className="mt-12 grid gap-8 border-b border-navy/10 pb-12 lg:grid-cols-[0.85fr_1fr] lg:items-center lg:gap-16">
          <Figure caption={dict.ui.dean} ratio="aspect-[4/3]" />
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-slate">
              {dict.ui.dean}
            </p>
            <h3 className="mt-3 font-serif text-3xl italic text-navy/60">
              {dict.ui.deanNamePending}
            </h3>
            <p className="mt-5 max-w-md text-pretty text-base leading-7 text-slate">
              {t.deanNote}
            </p>
          </div>
        </div>

        {/* Department heads — equal hierarchy, equal visual mass */}
        <ul className="mt-12 grid grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-3 lg:grid-cols-5">
          {departments.map((dept) => (
            <li key={dept.id}>
              <Figure caption={dept.name} ratio="aspect-[4/5]" />
              <p className="mt-4 text-xs uppercase tracking-[0.16em] text-slate">
                {dict.ui.headOfDepartment}
              </p>
              <h3 className="mt-1 font-serif text-lg text-navy">
                {dept.head.name}
              </h3>
              <p className="mt-1 text-sm leading-5 text-slate">
                {dept.head.title}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
