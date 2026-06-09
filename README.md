# Faculty of Chemistry — Taras Shevchenko National University of Kyiv

An institutional website for the Faculty of Chemistry (KNU). Static-first, bilingual
(Ukrainian / English), and built around a content model that treats every published
fact as traceable rather than assumed.

`Next.js 16 (App Router) · React 19 · TypeScript (strict) · Tailwind CSS v4`

---

## Contents

- [Overview](#overview)
- [Mission](#mission)
- [Architecture](#architecture)
- [Stack](#stack)
- [Routing](#routing)
- [Bilingual system](#bilingual-system)
- [Design philosophy](#design-philosophy)
- [Content & the provenance system](#content--the-provenance-system)
- [Project structure](#project-structure)
- [Local setup](#local-setup)
- [Deployment](#deployment)
- [Content workflow](#content-workflow)
- [Screenshots](#screenshots)
- [Roadmap](#roadmap)
- [Known limitations](#known-limitations)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

This repository is the frontend for the Faculty of Chemistry's public site. It presents
the faculty's departments, research areas, programmes, staff leadership, and contact
information in two languages, served as static pages.

The site has one organising constraint that shapes most of the architecture: the
faculty's existing web presence (`chem.knu.ua`) is treated as a **reference for
structure and terminology, not as a source of verified truth.** Every discrete fact the
site publishes — a head of department, a postal address, a phone number — is recorded
with where it came from and how far it has been confirmed. Unverified facts are still
shown, but they are tagged internally and flagged to editors, never silently presented
as settled.

That model is implemented, not aspirational; see
[Content & the provenance system](#content--the-provenance-system).

## Mission

Publish a faculty site that is **credible because it is honest about what it knows.**

Concretely, that means:

- **Traceable content.** No fact is published without a record of its source and trust
  state.
- **Editorial restraint.** A quiet, typographic, document-like interface — not a
  marketing site.
- **Bilingual parity.** Ukrainian is the source language; English is a first-class,
  type-checked equal, not an afterthought translation.
- **Longevity over novelty.** Static output, a minimal dependency surface, and a content
  layer that a non-developer editor can eventually own.

## Architecture

Four layers, each with a single responsibility:

| Layer | Location | Responsibility |
|---|---|---|
| **Presentation** | `app/`, `components/` | Routing, layout, and stateless presentational components. |
| **Localization** | `lib/i18n.ts`, `content/en.ts`, `content/ua.ts` | Locale resolution and UI / editorial copy per language. |
| **Facts & provenance** | `content/data/`, `lib/provenance.ts` | Discrete, language-neutral facts, each carrying a trust state. |
| **Design tokens** | `app/globals.css` | The full colour and type vocabulary (one small `@theme` block). |

The load-bearing decision is the separation of the bottom two layers:

- **Dictionaries** (`content/en.ts` / `content/ua.ts`) hold UI strings and *editorial*
  copy — prose the project authored itself (section intros, framing, tone).
- **The data layer** (`content/data/`) holds *discrete external facts* — a person, an
  address — as language-neutral structures, each wrapped in a `Claim<T>` that pairs the
  value with its provenance.

This keeps verifiable facts in one place (no translation drift, one source of truth) and
keeps the question "is this true?" separate from the question "how do we phrase it?".

Rendering is static: locale pages are enumerated by `generateStaticParams`, so the public
output is a set of pre-rendered HTML pages with no server runtime required.

## Stack

| Concern | Choice | Notes |
|---|---|---|
| Framework | **Next.js 16.2.7**, App Router | Static-first; `app/` directory. |
| UI runtime | **React 19.2.4** | Server Components by default; `"use client"` only where needed (the header). |
| Language | **TypeScript 5**, `strict` | Dictionary parity is enforced by the type system. |
| Styling | **Tailwind CSS v4** | Via `@tailwindcss/postcss`; tokens declared in `@theme`. |
| Type | `next/font/google` | Cormorant Garamond (Latin serif), Lora (Cyrillic serif), Inter (body). |
| Linting | **ESLint 9**, `eslint-config-next` | |

Runtime dependencies are deliberately limited to `next`, `react`, and `react-dom`. There
is no component library, CSS framework runtime, or state manager — the design system is a
handful of tokens and a set of local components.

## Routing

A single dynamic `[lang]` segment drives the whole site. The bare root redirects to the
default locale.

```
/                       → redirect → /ua
/[lang]                 Home               (lang ∈ { ua, en })
/[lang]/research        Research areas
/[lang]/departments     Departments (+ head of each, provenance-tagged)
/[lang]/faculty         Faculty & leadership
/[lang]/admissions      Admissions
/[lang]/about           About the faculty
/[lang]/contacts        Contacts (provenance-tagged)
```

`app/[lang]/layout.tsx` validates the locale (`notFound()` on anything else), renders the
shared header/footer, and exposes a skip link. The home page (`app/[lang]/page.tsx`)
composes the section components in `components/sections/`.

## Bilingual system

- **Two locales:** `ua` (default, source-of-truth language) and `en`.
- **Type-enforced parity.** English is the canonical dictionary shape
  (`type Dictionary = typeof en`); `ua.ts` is checked against it. A missing or extra key
  in either language is a compile error, not a runtime surprise.
- **Path-preserving language switch.** The header swaps only the locale prefix, so the
  reader stays on the same page across languages.
- **SEO correctness.** `generateMetadata` emits `hreflang` alternates (`uk`, `en`,
  `x-default`), a per-locale canonical, and locale-aware OpenGraph.
- **Cyrillic typography.** The serif stack chains Cormorant (Latin) → Lora (Cyrillic) so
  Ukrainian headings render in a matching serif; Inter carries Latin + Cyrillic body text.

## Design philosophy

The interface is meant to read as an institutional document, not a product landing page.

- **Restrained palette.** Five tokens total — `navy`, `ivory`, `sand`, `gold`, `slate`.
  Ivory is the paper tone; gold is used once or twice as an accent, never as decoration.
- **Editorial typography.** Serif display headings, generous measure, calm vertical
  rhythm. Type does the work that colour and motion would do elsewhere.
- **Documentary figures.** Images are not yet supplied; `components/ui/figure.tsx` renders
  a deliberately matted, captioned plate — a *reserved* frame, not an empty box — into
  which a real `<img>` later drops without layout change.
- **Accessibility as a baseline.** Skip link, a single consistent `focus-visible`
  treatment, semantic landmarks, and `aria` labelling on navigation.

## Content & the provenance system

This is the part of the project worth reading the source for. Full reference:
[`docs/content-provenance.md`](docs/content-provenance.md).

Every published value can be paired with a `Provenance` describing its trust state:

| State | Meaning | Treat as |
|---|---|---|
| `verified` | Independently confirmed against an authoritative source. | Settled. |
| `sourced` | Taken from a reference source (e.g. `chem.knu.ua`) but **not** independently verified. | Traceable, **not** settled. |
| `placeholder` | An intentional stand-in. | An honest gap — makes no claim. |
| `editorial` | Original framing/tone the project authored. | Not an external fact; nothing to verify. |

Facts are constructed declaratively, e.g.:

```ts
import { claim, fromChemKnu } from "@/lib/provenance";

head: claim(
  { name: { ua: "Р. Д. Лампека", en: "R. D. Lampeka" },
    title: { ua: "професор, д.х.н.", en: "Professor, Dr. Sc." } },
  fromChemKnu("Verify current post-holder, title and academic rank."),
)
```

**The reviewer marker.** [`components/ui/review-mark.tsx`](components/ui/review-mark.tsx)
renders a small inline tag next to any non-`verified` claim, so editors can see at a glance
what is unconfirmed. It is gated by `isReviewMode()`:

- Visible in `next dev`.
- **Stripped from production builds** by default — it never reaches the public site.
- Can be turned on for a *preview* build with `NEXT_PUBLIC_PROVENANCE_REVIEW=1`. Because
  pages are static, this is resolved at build time, so toggling it requires a rebuild.

The marker is intentionally off-palette (amber): it reads as tooling, not as content.

**Policy.** A fact is only promoted `sourced → verified` against an authoritative source
*other than* `chem.knu.ua` (an official order, the NAS register, the Dean's Office, etc.).
If it cannot be confirmed, it stays `sourced`; if it is wrong or unknowable, it is
downgraded to `placeholder`. The current verification backlog lives in the docs.

## Project structure

```
app/
  layout.tsx              Root <html>: fonts, global metadata
  page.tsx                Bare root → redirect to default locale
  globals.css             Tailwind v4 import + design tokens (@theme)
  [lang]/
    layout.tsx            Locale guard, header/footer, skip link, metadata + hreflang
    page.tsx              Home — composes section components
    {research,departments,faculty,admissions,about,contacts}/page.tsx

components/
  layout/                 Container, Header, Footer, Hero, PageIntro
  sections/               Home-page sections (research, areas, programs, labs, faculty, news, admissions)
  ui/                     Figure (reserved image plate), ReviewMark (editor-only provenance tag)

content/
  en.ts                   English dictionary — canonical shape; UI + editorial copy
  ua.ts                   Ukrainian dictionary — source language, type-checked for parity
  data/
    departments.ts        Five departments + heads (sourced), as language-neutral claims
    contacts.ts           Address / email / phone (sourced) — single source of truth

lib/
  i18n.ts                 Locales, dictionary resolution, locale-prefixed href()
  provenance.ts           Trust states, Claim<T>, constructors, review-mode gate
  utils.ts                cn() class helper

docs/
  content-provenance.md   Operational reference for the provenance & verification workflow

AGENTS.md                 Contributor note (this is Next.js 16 — read the bundled docs)
```

## Local setup

**Requirements:** Node.js 20 LTS or newer, and npm (a `package-lock.json` is committed).

```bash
npm install
npm run dev        # http://localhost:3000 (redirects to /ua)
```

Other scripts:

```bash
npm run build      # production build (static)
npm run start      # serve the production build
npm run lint       # ESLint
```

> **Note for contributors:** this project pins **Next.js 16**, whose App Router APIs and
> conventions differ from older majors (e.g. `params` is a `Promise`). See
> [`AGENTS.md`](AGENTS.md) before making framework-level changes.

## Deployment

The site is static-first and deploys cleanly to Vercel (or any static/Next host).

Environment variables:

| Variable | Purpose | Default |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Absolute base for canonical + OpenGraph URLs (`metadataBase`). | `http://localhost:3000` |
| `NEXT_PUBLIC_PROVENANCE_REVIEW` | Set to `1` to render editor provenance markers in a **preview** build. Leave unset for public builds. | unset |

```bash
# Public production build (markers stripped — the default):
npm run build

# Editor review build (provenance markers visible):
NEXT_PUBLIC_PROVENANCE_REVIEW=1 npm run build
```

## Content workflow

1. **Editorial copy** (section intros, framing, UI labels) → `content/en.ts` and
   `content/ua.ts`. Both languages must stay in shape; TypeScript enforces it.
2. **A discrete fact** (a person, address, contact) → `content/data/`, wrapped in
   `claim(value, provenance)`. Start from `chem.knu.ua` as `sourced`, never `verified`.
3. **Review** with a marker build (`NEXT_PUBLIC_PROVENANCE_REVIEW=1`) to see every
   unverified claim in place.
4. **Verify** against an authoritative non-`chem.knu.ua` source, reconcile both languages,
   then switch the constructor to `verified(...)`. Workflow detail and the live backlog:
   [`docs/content-provenance.md`](docs/content-provenance.md).

**Obsidian.** The operational docs are authored as plain Markdown specifically so they can
be mirrored into an Obsidian content vault that tracks the verification backlog alongside
the site. The vault itself is not committed to this repository; `docs/` is the canonical,
in-repo copy of that reference.

## Screenshots

> Placeholders — add real captures under `docs/screenshots/` and link them here. The UI
> ships with reserved figure plates rather than stock imagery, so screenshots should show
> real composition, both locales, and a review-mode build.

| Home (UA) | Home (EN) | Review mode (editor markers) |
|---|---|---|
| _`docs/screenshots/home-ua.png`_ | _`docs/screenshots/home-en.png`_ | _`docs/screenshots/review-mode.png`_ |

## Roadmap

Grounded in the live backlog in [`docs/content-provenance.md`](docs/content-provenance.md):

- **Verify the sourced facts.** Department heads (titles, current posts, the "Corr.
  Member, NAS of Ukraine" honour), postal address, faculty email and phone — promote each
  `sourced → verified` against an authoritative source.
- **Confirm the Dean.** Currently an honest `placeholder` (no name claimed).
- **Quarantine fabrication-risk content.** The `news` and `labs` sections currently render
  illustrative, unsourced content; reduce them to honest placeholders or back them with
  sourced material.
- **Expand the roster.** Full academic staff, organised by department.
- **Editor tooling.** Move content toward an editor-owned source (CMS or the Obsidian
  pipeline) without losing the provenance model.

## Known limitations

Stated plainly, because the project's premise is honesty about what it knows:

- **Most facts are `sourced`, not `verified`.** They are traceable and editor-flagged, but
  await independent confirmation.
- **`news` and `labs` are illustrative placeholders** — flagged as fabrication risk and
  not yet covered by the provenance pass. They should not be read as real events/facilities.
- **No images yet.** Figures are reserved plates awaiting real photography.
- **No automated tests or CI** are configured.
- **Content lives in typed TypeScript modules**, not a CMS — editing currently requires a
  developer.

## Contributing

Full guide: [`CONTRIBUTING.md`](CONTRIBUTING.md). In short:

- **Read [`AGENTS.md`](AGENTS.md) first** — the Next.js 16 conventions here differ from
  older majors.
- **Keep facts and copy separate.** Editorial prose goes in the dictionaries; discrete
  facts go in `content/data/` with provenance. Do not reintroduce facts into `en.ts` /
  `ua.ts`.
- **Never publish a fact as `verified` without an authoritative non-`chem.knu.ua` source.**
  When in doubt, leave it `sourced` or downgrade to `placeholder`.
- **Maintain bilingual parity.** Every dictionary change must keep `ua.ts` and `en.ts` in
  the same shape — the build will tell you if it doesn't.
- **Run `npm run lint`** before opening a pull request.

## License

The **source code** in this repository is released under the [MIT License](LICENSE).

This licence covers the code only. The faculty's institutional content — names, posts,
addresses, research descriptions, and other published facts — is not a grant of rights and
remains subject to the provenance and verification policy described above; sourced material
is attributed to its origin (e.g. `chem.knu.ua`) and is not represented as the project's own.
```
