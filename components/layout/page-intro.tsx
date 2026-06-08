import { Container } from "@/components/layout/container";

export function PageIntro({
  eyebrow,
  title,
  lead,
}: {
  eyebrow: string;
  title: string;
  lead: string;
}) {
  return (
    <Container>
      <div className="max-w-3xl pt-16 sm:pt-20 lg:pt-24">
        <p className="text-xs uppercase tracking-[0.2em] text-slate">
          {eyebrow}
        </p>
        <h1 className="mt-4 text-balance font-serif text-4xl font-medium leading-[1.1] tracking-tight text-navy sm:text-5xl">
          {title}
        </h1>
        <p className="mt-6 max-w-2xl text-pretty text-lg leading-8 text-slate">
          {lead}
        </p>
      </div>
    </Container>
  );
}
