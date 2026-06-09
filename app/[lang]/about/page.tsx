import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, isLocale, defaultLocale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import { Container } from "@/components/layout/container";
import { PageIntro } from "@/components/layout/page-intro";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const loc = isLocale(lang) ? lang : defaultLocale;
  const t = getDictionary(loc).pages.about;
  return buildMetadata({ lang: loc, path: "/about", title: t.title, description: t.lead });
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDictionary(lang).pages.about;

  return (
    <main className="pb-24 lg:pb-32">
      <PageIntro eyebrow={t.eyebrow} title={t.title} lead={t.lead} />
      <Container>
        <div className="mt-12 max-w-2xl space-y-6 border-t border-navy/10 pt-10">
          {t.body.map((para) => (
            <p key={para} className="text-pretty text-base leading-7 text-slate">
              {para}
            </p>
          ))}
        </div>
      </Container>
    </main>
  );
}
