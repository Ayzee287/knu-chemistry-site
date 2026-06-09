# Contributing

Thanks for working on the Faculty of Chemistry site. This project has a small number of
non-negotiable rules that exist to keep it credible and maintainable. Read them once;
they are the whole point of the codebase.

## Before you start

- **This is Next.js 16.** Its App Router APIs and conventions differ from older majors
  (e.g. route `params` is a `Promise`). Read [`AGENTS.md`](AGENTS.md) before making any
  framework-level change.
- **Requirements:** Node.js 20 LTS or newer, npm (a `package-lock.json` is committed).

```bash
npm install
npm run dev      # http://localhost:3000  (redirects to /ua)
npm run lint
npm run build
```

## The rules

### 1. Keep facts and copy separate

- **Editorial copy** — section intros, framing, UI labels, prose the project authored —
  goes in the dictionaries: [`content/en.ts`](content/en.ts) and
  [`content/ua.ts`](content/ua.ts).
- **Discrete external facts** — a person, a post, an address, a phone number — go in the
  data layer under [`content/data/`](content/data/), wrapped in `claim(value, provenance)`.

Do **not** reintroduce facts into the dictionaries. They used to live there, drifted
between languages, and were moved out on purpose.

### 2. Every fact carries provenance

New facts start as `sourced`, never `verified`. Use the constructors in
[`lib/provenance.ts`](lib/provenance.ts):

```ts
import { claim, fromChemKnu } from "@/lib/provenance";

email: claim("chem@knu.ua", fromChemKnu("Confirm current faculty inbox.")),
```

Trust states: `verified` · `sourced` · `placeholder` · `editorial`. Full reference and the
live verification backlog: [`docs/content-provenance.md`](docs/content-provenance.md).

### 3. Never publish a fact as `verified` without an authoritative source

`chem.knu.ua` is a reference for structure and terminology — **not** proof. A fact is only
promoted `sourced → verified` against an independent authoritative source (an official
order, the NAS register, the Dean's Office, etc.). If you cannot confirm it, leave it
`sourced`; if it is wrong or unknowable, downgrade it to `placeholder`.

Review your work with the marker build to see every unverified claim in place:

```bash
NEXT_PUBLIC_PROVENANCE_REVIEW=1 npm run build
```

### 4. Maintain bilingual parity

English (`en.ts`) is the canonical dictionary shape; `ua.ts` is type-checked against it.
Every content change must keep both languages in the same shape — a missing or extra key
is a compile error. If `npm run build` passes, parity holds.

## Pull requests

- Branch from `main`; keep the change focused.
- Run `npm run lint` and `npm run build` locally before opening the PR — CI runs both and
  will block on failure.
- Fill in the PR checklist (parity, provenance, lint/build).
- Write a scoped commit message describing what changed and why.

## Design conventions

- Stay within the five design tokens (`navy`, `ivory`, `sand`, `gold`, `slate`) declared
  in [`app/globals.css`](app/globals.css). Don't introduce new colours or a component
  library for one-off needs.
- Keep components presentational and the palette restrained. The interface should read as
  an institutional document, not a product page.
