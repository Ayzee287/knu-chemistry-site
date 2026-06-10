import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, isLocale, defaultLocale, href } from "@/lib/i18n";
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
        {/* Each research area is carried by a department — rows link to its
            entry on /departments (same pattern as the homepage areas list). */}
        <ul className="mt-14 divide-y divide-navy/10 border-y border-navy/10">
          {departments.map((dept) => (
            <li key={dept.id}>
              <a
                href={`${href(lang, "/departments")}#${dept.id}`}
                className="group -mx-4 flex flex-col gap-1 rounded-sm px-4 py-6 transition-colors hover:bg-navy/[0.03] md:flex-row md:items-baseline md:gap-10"
              >
                <span className="font-serif text-2xl text-navy md:basis-1/3">
                  {dept.name}
                </span>
                <span className="flex-1 text-sm leading-6 text-slate">
                  {dept.research}
                </span>
                <span
                  aria-hidden
                  className="hidden text-slate transition-transform group-hover:translate-x-0.5 md:inline"
                >
                  →
                </span>
              </a>
            </li>
          ))}
        </ul>

        <h2 className="mt-16 font-serif text-2xl text-navy sm:text-3xl">
          {dict.labs.title}
        </h2>
        <p className="mt-6 max-w-xl text-sm leading-6 text-slate">
          {dict.labs.note}
        </p>
      </Container>
    </main>
  );
}
