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
    // Compressed rhythm (like research-highlight): placeholder-level content
    // should not occupy a full-weight band. Restore section padding when a
    // real feed exists.
    <section className="py-16 sm:py-20 lg:py-24">
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
