import { notFound } from "next/navigation";
import { getDictionary, isLocale, href } from "@/lib/i18n";
import { Container } from "@/components/layout/container";
import { PageIntro } from "@/components/layout/page-intro";

export default async function AdmissionsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const t = dict.pages.admissions;

  return (
    <main className="pb-24 lg:pb-32">
      <PageIntro eyebrow={t.eyebrow} title={t.title} lead={t.lead} />
      <Container>
        <div className="mt-14 grid gap-10 border-t border-navy/10 pt-10 sm:grid-cols-2 lg:gap-16">
          {t.sections.map((section) => (
            <div key={section.title}>
              <h2 className="font-serif text-2xl text-navy">{section.title}</h2>
              <p className="mt-3 max-w-md text-pretty text-base leading-7 text-slate">
                {section.body}
              </p>
            </div>
          ))}
        </div>

        <a
          href={href(lang, "/contacts")}
          className="mt-12 inline-flex items-center gap-2 border-b-2 border-gold/70 pb-1 text-sm font-medium text-navy transition-colors hover:border-gold"
        >
          {dict.admissions.ctaContact}
          <span aria-hidden className="text-gold">
            →
          </span>
        </a>
      </Container>
    </main>
  );
}
