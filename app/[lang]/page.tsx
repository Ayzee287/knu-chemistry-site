import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, isLocale, defaultLocale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import { Hero } from "@/components/layout/hero";
import { ResearchHighlight } from "@/components/sections/research-highlight";
import { ScientificAreas } from "@/components/sections/scientific-areas";
import { Programs } from "@/components/sections/programs";
import { Laboratories } from "@/components/sections/laboratories";
import { Faculty } from "@/components/sections/faculty";
import { News } from "@/components/sections/news";
import { Admissions } from "@/components/sections/admissions";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const loc = isLocale(lang) ? lang : defaultLocale;
  const dict = getDictionary(loc);
  return buildMetadata({
    lang: loc,
    path: "",
    title: dict.meta.title,
    description: dict.meta.description,
    absoluteTitle: true,
  });
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = getDictionary(lang);

  return (
    <main>
      <Hero lang={lang} dict={dict} />
      <ResearchHighlight dict={dict} />
      <ScientificAreas lang={lang} dict={dict} />
      <Programs lang={lang} dict={dict} />
      <Laboratories lang={lang} dict={dict} />
      <Faculty lang={lang} dict={dict} />
      <News dict={dict} />
      <Admissions lang={lang} dict={dict} />
    </main>
  );
}
