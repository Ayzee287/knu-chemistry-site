import { notFound } from "next/navigation";
import { getDictionary, isLocale } from "@/lib/i18n";
import { getDepartments } from "@/content/data/departments";
import { placeholder } from "@/lib/provenance";
import { Container } from "@/components/layout/container";
import { PageIntro } from "@/components/layout/page-intro";
import { Figure } from "@/components/ui/figure";
import { ReviewMark } from "@/components/ui/review-mark";

const DEAN_PENDING = placeholder("Dean name pending confirmation.");

export default async function FacultyPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const t = dict.pages.faculty;
  const departments = getDepartments(lang);

  return (
    <main className="pb-24 lg:pb-32">
      <PageIntro eyebrow={t.eyebrow} title={t.title} lead={t.lead} />
      <Container>
        {/* Dean — leadership anchor */}
        <div className="mt-14 grid gap-8 border-t border-navy/10 pt-10 lg:grid-cols-[0.7fr_1fr] lg:gap-16">
          <Figure caption={dict.ui.dean} ratio="aspect-[4/3]" />
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-slate">
              {dict.ui.dean}
            </p>
            <p className="mt-3 font-serif text-2xl italic text-navy/60">
              {dict.ui.deanNamePending}
              <ReviewMark provenance={DEAN_PENDING} />
            </p>
            <p className="mt-4 max-w-md text-pretty text-base leading-7 text-slate">
              {dict.faculty.deanNote}
            </p>
          </div>
        </div>

        {/* Department heads — equal */}
        <h2 className="mt-16 font-serif text-2xl text-navy sm:text-3xl">
          {dict.faculty.title}
        </h2>
        <ul className="mt-8 grid grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-3 lg:grid-cols-5">
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
                <ReviewMark provenance={dept.head.provenance} />
              </p>
            </li>
          ))}
        </ul>

        <p className="mt-10 max-w-xl text-sm leading-6 text-slate">
          {t.rosterNote}
        </p>
      </Container>
    </main>
  );
}
