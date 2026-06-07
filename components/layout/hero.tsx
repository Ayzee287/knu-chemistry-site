import { Container } from "./container";

export function Hero() {
  return (
    <section className="flex min-h-screen items-center bg-black text-white">
      <Container>
        <div className="max-w-3xl">
          <p className="mb-4 text-sm uppercase tracking-[0.2em] text-zinc-400">
            KNU Chemistry
          </p>

          <h1 className="text-5xl font-bold leading-tight sm:text-7xl">
            Modern Chemistry Education Platform
          </h1>

          <p className="mt-6 text-lg leading-8 text-zinc-400">
            AI-assisted chemistry learning experience built for clarity,
            structure, and modern education.
          </p>
        </div>
      </Container>
    </section>
  );
}