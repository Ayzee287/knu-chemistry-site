import { notFound } from "next/navigation";
import { getDictionary, isLocale } from "@/lib/i18n";
import { Hero } from "@/components/layout/hero";
import { ResearchHighlight } from "@/components/sections/research-highlight";
import { ScientificAreas } from "@/components/sections/scientific-areas";
import { Programs } from "@/components/sections/programs";
import { Laboratories } from "@/components/sections/laboratories";
import { Faculty } from "@/components/sections/faculty";
import { News } from "@/components/sections/news";
import { Admissions } from "@/components/sections/admissions";

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
      <News lang={lang} dict={dict} />
      <Admissions lang={lang} dict={dict} />
    </main>
  );
}
