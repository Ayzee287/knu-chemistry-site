# Content provenance & verification workflow

This faculty site publishes real institutional facts (people, posts, addresses,
contacts). To stay credible and traceable, **every discrete factual claim
carries provenance** — where it came from and how trusted it is. No fact is
published with silent certainty.

This document is the operational reference for that system. It can be mirrored
into the Obsidian content vault as part of the content pipeline.

---

## Trust states

Defined in [`lib/provenance.ts`](../lib/provenance.ts) as `ProvenanceState`:

| State | Meaning | Treat as |
|---|---|---|
| `verified` | Independently confirmed against an authoritative source. | Settled truth. |
| `sourced` | Taken from a reference source (e.g. chem.knu.ua) but **not yet** independently verified. | Traceable, **not** settled. Needs review before it can be trusted. |
| `placeholder` | An intentional stand-in. Makes **no** factual claim. | Honest gap. |
| `editorial` | Original editorial framing (tone, structure, summaries). | Not a discrete external fact; no verification target. |

`chem.knu.ua` is a **reference / terminology / structure source**, not automatically
trusted truth. Anything taken from it starts life as `sourced`, never `verified`.

---

## How claims are modelled

A published value is paired with its provenance via `Claim<T>`:

```ts
import { claim, fromChemKnu, editorial } from "@/lib/provenance";

head: claim(
  { name: { ua: "…", en: "…" }, title: { ua: "…", en: "…" } },
  fromChemKnu("Verify current post-holder, title and academic rank."),
),
```

Constructors: `verified()`, `sourced(source, retrieved, note?)`, `placeholder(note?)`,
`editorial(note?)`, and `fromChemKnu(note?)` (a `sourced` claim attributed to
chem.knu.ua, using the shared retrieval date in `SOURCES`).

Factual claims currently live in the language-neutral data layer:

- [`content/data/departments.ts`](../content/data/departments.ts) — department
  leadership (`sourced`); names/research framing (`editorial`).
- [`content/data/contacts.ts`](../content/data/contacts.ts) — address, email,
  phone (`sourced`). **Single source of truth** — these used to be duplicated in
  `en.ts`/`ua.ts` and had drifted.

`content/en.ts` / `content/ua.ts` hold UI strings and **editorial** copy only.
When you add a discrete external fact, put it in the data layer with provenance —
not in the dictionaries.

---

## The reviewer marker

[`components/ui/review-mark.tsx`](../components/ui/review-mark.tsx) renders a small
inline tag next to any non-`verified` claim, so editors can see at a glance what
is unverified.

It is **gated and never reaches the public site**:

- Renders in `next dev` (NODE_ENV ≠ production).
- Hidden in the production build by default.
- Can be turned on for a **preview build** with `NEXT_PUBLIC_PROVENANCE_REVIEW=1`.
  Because pages are statically generated, this is resolved at build time —
  toggling it on a deployed preview requires a rebuild.

```bash
# Editor review build (markers visible):
NEXT_PUBLIC_PROVENANCE_REVIEW=1 npm run build

# Public build (markers stripped — the default):
npm run build
```

Verified facts render no marker. The marker uses an amber, off-palette style on
purpose: it reads as tooling, not as content.

---

## Verification workflow

To promote a fact from `sourced` → `verified`:

1. **Find an authoritative confirmation** — not chem.knu.ua alone. For honours/
   posts: the NAS of Ukraine register, an official faculty order, a current staff
   page, or a direct confirmation from the Dean's Office.
2. **Reconcile both languages.** The claim is bilingual; confirm UA and EN assert
   the same thing (transliteration included).
3. **Update the claim:** switch the constructor to `verified(source, retrieved)`
   with the confirming source and today's date. Remove the now-resolved `note`.
4. **Rebuild with the review flag** to confirm the marker is gone for that item.

If a claim cannot be confirmed, it stays `sourced` (do **not** upgrade it) or, if
it is wrong/unknowable, downgrade to `placeholder` with an honest stand-in.

### Current verification backlog (as of 2026-06-09)

All items below are `sourced` from chem.knu.ua and **await independent verification**:

- The five department heads — names, titles and current posts
  ([`departments.ts`](../content/data/departments.ts)).
  - **Not published while unverified.** Because the reviewer marker is stripped
    from production, a `sourced` head would otherwise ship to the public as
    unqualified fact. `getDepartments()` therefore renders an honest placeholder
    ("Name to be confirmed", no title) for any head that is not `verified`. The
    sourced candidate name/title stay in `departments.ts` only as this backlog
    record; flip a head to `verified(...)` to publish it.
  - Analytical chemistry: the `доцент` (Associate Professor) + `д.х.н.` (Dr. Sc.)
    rank pairing is unusual — confirm.
  - Physical chemistry: "Corr. Member, NAS of Ukraine" is a hard honour claim —
    confirm against the NAS register.
- Postal address — confirm building number and postal index; the street was
  renamed from Lva Tolstoho ([`contacts.ts`](../content/data/contacts.ts)).
  Still rendered publicly (low-stakes, `sourced`); not withheld.
- Faculty email and phone — still rendered publicly (`sourced`).

Known **placeholder**: the Dean's name (`deanNamePending`). Honest gap, not a claim.

---

## Resolved fabrication risks

Two content areas were identified as **fabrication risk** and have since been
quarantined to honest placeholders (verified absent from the production build):

- **News** (`news` in `en.ts`/`ua.ts`) — invented dated events (Feb–May 2026
  seminars/sessions) removed; now an honest "will be published here" placeholder.
- **Laboratories** (`labs`) — invented named labs removed; the general editorial
  lead is kept with a "listed as confirmed" note. No named facility is claimed.

Because `Dictionary = typeof en`, the deleted `news.items` / `labs.items` shapes
can no longer typecheck back into existence — regression is structurally blocked.
