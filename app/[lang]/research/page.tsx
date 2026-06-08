import { notFound } from "next/navigation";
import { getDictionary, isLocale } from "@/lib/i18n";
import { Container } from "@/components/layout/container";
import { PageIntro } from "@/components/layout/page-intro";

export default async function ResearchPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const t = dict.pages.research;

  return (
    <main className="pb-24 lg:pb-32">
      <PageIntro eyebrow={t.eyebrow} title={t.title} lead={t.lead} />
      <Container>
        <ul className="mt-14 divide-y divide-navy/10 border-y border-navy/10">
          {dict.areas.items.map((area) => (
            <li
              key={area.name}
              className="flex flex-col gap-1 py-6 sm:flex-row sm:items-baseline sm:gap-10"
            >
              <span className="font-serif text-2xl text-navy sm:basis-1/3">
                {area.name}
              </span>
              <span className="flex-1 text-sm leading-6 text-slate">
                {area.desc}
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
