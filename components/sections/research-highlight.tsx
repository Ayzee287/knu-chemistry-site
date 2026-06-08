import { Container } from "@/components/layout/container";
import type { Dictionary } from "@/lib/i18n";

// Identity: dense, directional, research-first. Compressed vertical rhythm.
export function ResearchHighlight({ dict }: { dict: Dictionary }) {
  const t = dict.research;
  return (
    <section className="py-16 sm:py-20 lg:py-24">
      <Container>
        <div className="grid gap-8 lg:grid-cols-3 lg:gap-16">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate">
              {t.eyebrow}
            </p>
            <h2 className="mt-4 text-balance font-serif text-3xl leading-tight text-navy sm:text-4xl">
              {t.title}
            </h2>
            <p className="mt-5 max-w-sm text-pretty text-base leading-7 text-slate">
              {t.lead}
            </p>
          </div>

          <ol className="lg:col-span-2 lg:border-l lg:border-navy/10 lg:pl-16">
            {t.threads.map((thread, i) => (
              <li
                key={thread.title}
                className="flex gap-6 border-b border-navy/10 py-5 first:border-t lg:first:border-t-0 lg:first:pt-0"
              >
                <span className="font-serif text-base tabular-nums text-navy/35">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-base font-medium text-navy">
                    {thread.title}
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-slate">
                    {thread.desc}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
