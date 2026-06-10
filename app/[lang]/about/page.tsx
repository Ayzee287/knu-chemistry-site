import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, isLocale, defaultLocale, href } from "@/lib/i18n";
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
  const dict = getDictionary(lang);
  const t = dict.pages.about;

  // Onward paths — built from the existing nav labels so the page does not
  // dead-end; no new strings, bilingual for free.
  const onward = dict.nav.filter((item) =>
    ["/departments", "/faculty", "/admissions"].includes(item.href),
  );

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

        <nav
          aria-label={dict.ui.primaryNav}
          className="mt-16 border-t border-navy/10 pt-8"
        >
          <ul className="flex flex-wrap gap-x-10 gap-y-3">
            {onward.map((item) => (
              <li key={item.href}>
                <a
                  href={href(lang, item.href)}
                  className="group inline-flex items-center gap-2 text-sm font-medium text-navy transition-colors hover:text-navy/70"
                >
                  {item.label}
                  <span
                    aria-hidden
                    className="transition-transform group-hover:translate-x-0.5"
                  >
                    →
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </main>
  );
}
