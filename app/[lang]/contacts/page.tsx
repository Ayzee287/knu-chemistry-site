import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Container } from "@/components/layout/container";
import { PageIntro } from "@/components/layout/page-intro";
import { ReviewMark } from "@/components/ui/review-mark";

import { getDictionary, isLocale, defaultLocale } from "@/lib/i18n";
import { getContact } from "@/content/data/contacts";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const loc = isLocale(lang) ? lang : defaultLocale;
  const t = getDictionary(loc).pages.contacts;
  return buildMetadata({ lang: loc, path: "/contacts", title: t.title, description: t.lead });
}

export default async function ContactsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const t = dict.pages.contacts;
  const f = dict.footer;
  const contact = getContact(lang);

  return (
    <main className="pb-24 lg:pb-32">
      <PageIntro eyebrow={t.eyebrow} title={t.title} lead={t.lead} />
      <Container>
        <div className="mt-14 grid gap-10 border-t border-navy/10 pt-10 sm:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-slate">
              {t.deanOfficeLabel}
            </p>
            <address className="mt-4 text-base not-italic leading-7 text-slate">
              {contact.address.value.map((line, i) => (
                <span key={line} className="block">
                  {line}
                  {i === contact.address.value.length - 1 && (
                    <ReviewMark provenance={contact.address.provenance} />
                  )}
                </span>
              ))}
              <a
                href={`mailto:${contact.email.value}`}
                className="mt-2 block text-navy transition-colors hover:text-navy/70"
              >
                {contact.email.value}
              </a>
              <ReviewMark provenance={contact.email.provenance} />
              <span className="block">
                {contact.phone.value}
                <ReviewMark provenance={contact.phone.provenance} />
              </span>
            </address>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-slate">
              {f.facultyName}
            </p>
            <p className="mt-4 max-w-sm text-base leading-7 text-slate">
              {f.university}
            </p>
          </div>
        </div>
      </Container>
    </main>
  );
}
