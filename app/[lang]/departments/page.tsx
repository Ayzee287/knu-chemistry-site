import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, isLocale, defaultLocale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import { getDepartments } from "@/content/data/departments";
import { Container } from "@/components/layout/container";
import { PageIntro } from "@/components/layout/page-intro";
import { ExternalLink } from "@/components/ui/external-link";
import { ReviewMark } from "@/components/ui/review-mark";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const loc = isLocale(lang) ? lang : defaultLocale;
  const t = getDictionary(loc).pages.departments;
  return buildMetadata({ lang: loc, path: "/departments", title: t.title, description: t.lead });
}

export default async function DepartmentsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const t = dict.pages.departments;
  const departments = getDepartments(lang);

  return (
    <main className="pb-24 lg:pb-32">
      <PageIntro eyebrow={t.eyebrow} title={t.title} lead={t.lead} />
      <Container>
        <ul className="mt-14 divide-y divide-navy/10 border-t border-navy/10">
          {departments.map((dept) => (
            <li
              key={dept.id}
              id={dept.id}
              className="grid scroll-mt-24 gap-4 py-8 lg:grid-cols-[1fr_1.4fr] lg:gap-16"
            >
              <div>
                <h2 className="font-serif text-2xl text-navy sm:text-3xl">
                  {dept.name}
                </h2>
                <p className="mt-3 text-xs uppercase tracking-[0.16em] text-slate">
                  {dict.ui.headOfDepartment}
                </p>
                {/* A withheld head renders muted + italic, like the Dean placeholder. */}
                <p
                  className={`mt-1 text-sm ${
                    dept.head.title ? "text-navy/80" : "italic text-navy/55"
                  }`}
                >
                  {dept.head.name}
                  {!dept.head.title && (
                    <ReviewMark provenance={dept.head.provenance} />
                  )}
                </p>
                {dept.head.title && (
                  <p className="text-sm text-slate">
                    {dept.head.title}
                    <ReviewMark provenance={dept.head.provenance} />
                  </p>
                )}
                <p className="mt-5">
                  <ExternalLink
                    href={dept.site}
                    newTabNote={dict.ui.opensInNewTab}
                    className="text-sm text-slate transition-colors hover:text-navy"
                  >
                    {dict.ui.officialDepartmentSite}
                  </ExternalLink>
                </p>
              </div>
              <p className="max-w-xl text-pretty text-base leading-7 text-slate">
                {dept.research}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </main>
  );
}
