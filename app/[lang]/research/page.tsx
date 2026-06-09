import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, isLocale, defaultLocale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import { getDepartments } from "@/content/data/departments";
import { Container } from "@/components/layout/container";
import { PageIntro } from "@/components/layout/page-intro";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const loc = isLocale(lang) ? lang : defaultLocale;
  const t = getDictionary(loc).pages.research;
  return buildMetadata({ lang: loc, path: "/research", title: t.title, description: t.lead });
}

export default async function ResearchPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const t = dict.pages.research;
  const departments = getDepartments(lang);

  return (
    <main className="pb-24 lg:pb-32">
      <PageIntro eyebrow={t.eyebrow} title={t.title} lead={t.lead} />
      <Container>
        <ul className="mt-14 divide-y divide-navy/10 border-y border-navy/10">
          {departments.map((dept) => (
            <li
              key={dept.id}
              className="flex flex-col gap-1 py-6 sm:flex-row sm:items-baseline sm:gap-10"
            >
              <span className="font-serif text-2xl text-navy sm:basis-1/3">
                {dept.name}
              </span>
              <span className="flex-1 text-sm leading-6 text-slate">
                {dept.research}
              </span>
            </li>
          ))}
        </ul>

        <h2 className="mt-16 font-serif text-2xl text-navy sm:text-3xl">
          {dict.labs.title}
        </h2>
        <ul className="mt-6 grid gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
          {dict.labs.items.map((lab) => (
            <li key={lab.name} className="border-t border-navy/10 pt-4">
              <h3 className="font-serif text-lg text-navy">{lab.name}</h3>
              <p className="mt-1 text-sm leading-6 text-slate">{lab.focus}</p>
            </li>
          ))}
        </ul>
      </Container>
    </main>
  );
}
