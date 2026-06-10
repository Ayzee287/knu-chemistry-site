import { Container } from "@/components/layout/container";
import { ExternalLink } from "@/components/ui/external-link";
import { SOURCES } from "@/lib/provenance";
import type { Dictionary } from "@/lib/i18n";

// Identity: temporal, lighter. Honest placeholder — the faculty has no published
// news feed yet, so this section makes NO dated claims (the previous invented
// events were removed). Until a real feed exists, the section points readers at
// the official faculty site instead of sitting empty. See docs/content-provenance.md.
export function News({ dict }: { dict: Dictionary }) {
  const t = dict.news;
  return (
    <section className="py-20 sm:py-24 lg:py-28">
      <Container>
        <p className="text-xs uppercase tracking-[0.2em] text-slate">
          {t.eyebrow}
        </p>
        <h2 className="mt-4 font-serif text-3xl text-navy sm:text-4xl">
          {t.title}
        </h2>
        <p className="mt-6 max-w-md text-base leading-7 text-slate">
          {t.placeholder}
        </p>
        <p className="mt-4">
          <ExternalLink
            href={SOURCES.chemKnu.url}
            newTabNote={dict.ui.opensInNewTab}
            className="text-sm font-medium text-slate transition-colors hover:text-navy"
          >
            {dict.ui.officialFacultySite}
          </ExternalLink>
        </p>
      </Container>
    </section>
  );
}
