import { notFound } from "next/navigation";
import { getDictionary, isLocale } from "@/lib/i18n";
import { Container } from "@/components/layout/container";
import { PageIntro } from "@/components/layout/page-intro";

export default async function DepartmentsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const t = dict.pages.departments;
  const areas = dict.areas.items;
  const heads = dict.faculty.heads;

  return (
    <main className="pb-24 lg:pb-32">
      <PageIntro eyebrow={t.eyebrow} title={t.title} lead={t.lead} />
      <Container>
        <ul className="mt-14 divide-y divide-navy/10 border-t border-navy/10">
          {areas.map((area, i) => {
            const head = heads[i];
            return (
              <li
                key={area.name}
                className="grid gap-4 py-8 lg:grid-cols-[1fr_1.4fr] lg:gap-16"
              >
                <div>
                  <h2 className="font-serif text-2xl text-navy sm:text-3xl">
                    {area.name}
                  </h2>
                  <p className="mt-3 text-xs uppercase tracking-[0.16em] text-slate">
                    {dict.ui.headOfDepartment}
                  </p>
                  <p className="mt-1 text-sm text-navy/80">{head.name}</p>
                  <p className="text-sm text-slate">{head.title}</p>
                </div>
                <p className="max-w-xl text-pretty text-base leading-7 text-slate">
                  {area.desc}
                </p>
              </li>
            );
          })}
        </ul>
      </Container>
    </main>
  );
}
