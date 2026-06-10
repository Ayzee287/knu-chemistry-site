import { Container } from "@/components/layout/container";
import { ExternalLink } from "@/components/ui/external-link";
import { ReviewMark } from "@/components/ui/review-mark";
import { getContact } from "@/content/data/contacts";
import { SOURCES } from "@/lib/provenance";
import { href, type Locale, type Dictionary } from "@/lib/i18n";

export function Footer({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const t = dict.footer;
  const contact = getContact(lang);
  return (
    <footer className="border-t border-navy/10 bg-ivory">
      <Container>
        <div className="grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2">
            <p className="font-serif text-lg text-navy">{t.facultyName}</p>
            <p className="mt-2 max-w-xs text-sm leading-6 text-slate">
              {t.university}
            </p>
            <address className="mt-5 text-sm not-italic leading-6 text-slate">
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
                className="mt-1 block transition-colors hover:text-navy"
              >
                {contact.email.value}
              </a>
              <ReviewMark provenance={contact.email.provenance} />
              <span className="block">
                {contact.phone.value}
                <ReviewMark provenance={contact.phone.provenance} />
              </span>
            </address>
            <p className="mt-5">
              <ExternalLink
                href={SOURCES.chemKnu.url}
                newTabNote={dict.ui.opensInNewTab}
                className="text-sm text-slate transition-colors hover:text-navy"
              >
                {dict.ui.officialFacultySite}
              </ExternalLink>
            </p>
          </div>

          {t.columns.map((col) => (
            <div key={col.title}>
              <p className="text-xs uppercase tracking-[0.18em] text-slate">
                {col.title}
              </p>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={href(lang, link.href)}
                      className="text-sm text-slate transition-colors hover:text-navy"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-2 border-t border-navy/10 py-6 text-xs text-slate sm:flex-row sm:justify-between">
          <span>{t.rights}</span>
          <span>{t.location}</span>
        </div>
      </Container>
    </footer>
  );
}
