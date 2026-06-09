import type { Locale } from "@/lib/i18n";

import {
  claim,
  editorial,
  fromChemKnu,
  placeholder,
  type Claim,
  type Localised,
  type Provenance,
} from "@/lib/provenance";

// Single source of truth for the five departments — language-neutral structure
// with localised fields. Replaces the duplicated faculty/areas data that
// previously lived in both en.ts and ua.ts (translation-drift risk).
//
// Department names and research framing are editorial/structural. Leadership
// (head name + title) is a discrete factual claim: it is sourced from the
// faculty's published structure (chem.knu.ua) and carries provenance so it
// stays traceable and is not published as settled truth before verification.

type Leadership = { name: Localised; title: Localised };

export type Department = {
  id: string;
  name: Localised;
  research: Localised;
  provenance: Provenance;
  head: Claim<Leadership>;
};

// Leadership sourced from chem.knu.ua's published structure. Verify each name,
// title and current post against the faculty before treating as authoritative.
//
// IMPORTANT: a `sourced` head is NOT published. The named post-holders below are
// retained only as the verification-backlog record (see content/data/verification.ts);
// getDepartments() renders an honest placeholder for any head that is not yet
// `verified`, so unverified names/titles — including the NAS-of-Ukraine honour
// claim — never reach the public HTML. Flip a head to verified(...) to publish it.
const leadershipNote = "Verify current post-holder, title and academic rank.";

export const departments: Department[] = [
  {
    id: "inorganic",
    name: { ua: "Неорганічна хімія", en: "Inorganic Chemistry" },
    research: {
      ua: "Координаційні сполуки, матеріали та хімія елементів.",
      en: "Coordination compounds, materials, and the chemistry of the elements.",
    },
    provenance: editorial(),
    head: claim(
      {
        name: { ua: "Р. Д. Лампека", en: "R. D. Lampeka" },
        title: { ua: "професор, д.х.н.", en: "Professor, Dr. Sc." },
      },
      fromChemKnu(leadershipNote),
    ),
  },
  {
    id: "organic",
    name: { ua: "Органічна хімія", en: "Organic Chemistry" },
    research: {
      ua: "Синтез, механізми та хімія природних сполук.",
      en: "Synthesis, mechanisms, and the chemistry of natural compounds.",
    },
    provenance: editorial(),
    head: claim(
      {
        name: { ua: "О. О. Григоренко", en: "O. O. Hryhorenko" },
        title: { ua: "професор, д.х.н.", en: "Professor, Dr. Sc." },
      },
      fromChemKnu(leadershipNote),
    ),
  },
  {
    id: "analytical",
    name: { ua: "Аналітична хімія", en: "Analytical Chemistry" },
    research: {
      ua: "Аналітичні методи та хімічний контроль об’єктів довкілля.",
      en: "Analytical methods and chemical control of environmental objects.",
    },
    provenance: editorial(),
    head: claim(
      {
        name: { ua: "О. Ю. Тананайко", en: "O. Yu. Tananaiko" },
        title: { ua: "доцент, д.х.н.", en: "Associate Professor, Dr. Sc." },
      },
      fromChemKnu(`${leadershipNote} Rank "доцент / д.х.н." pairing is unusual — confirm.`),
    ),
  },
  {
    id: "physical",
    name: { ua: "Фізична хімія", en: "Physical Chemistry" },
    research: {
      ua: "Термодинаміка, кінетика та фізична хімія міжфазних явищ.",
      en: "Thermodynamics, kinetics, and the physical chemistry of interfacial phenomena.",
    },
    provenance: editorial(),
    head: claim(
      {
        name: { ua: "І. О. Фрицький", en: "I. O. Fritsky" },
        title: {
          ua: "професор · член-кор. НАН України",
          en: "Professor · Corr. Member, NAS of Ukraine",
        },
      },
      fromChemKnu(
        `${leadershipNote} "Corr. Member, NAS of Ukraine" is a hard honour claim — confirm against the NAS register.`,
      ),
    ),
  },
  {
    id: "macromolecular",
    name: { ua: "Високомолекулярна хімія", en: "Macromolecular Chemistry" },
    research: {
      ua: "Синтез і дослідження високомолекулярних сполук.",
      en: "Synthesis and study of macromolecular and high-molecular compounds.",
    },
    provenance: editorial(),
    head: claim(
      {
        name: { ua: "І. О. Савченко", en: "I. O. Savchenko" },
        title: { ua: "професор, д.х.н.", en: "Professor, Dr. Sc." },
      },
      fromChemKnu(leadershipNote),
    ),
  },
];

export type LocalisedDepartment = {
  id: string;
  name: string;
  research: string;
  provenance: Provenance;
  // title is null when the head is withheld (unverified) — the render sites use
  // that to drop the title line and show only the placeholder name.
  head: { name: string; title: string | null; provenance: Provenance };
};

// Honest stand-in for an unverified head, mirroring the Dean placeholder in the
// dictionaries. The sourced candidate name/title stay in `departments` above as
// the backlog record; they are intentionally NOT surfaced here.
const headPending: Localised = { ua: "Ім’я уточнюється", en: "Name to be confirmed" };
const headWithheld = placeholder(
  "Head sourced from chem.knu.ua but unverified; name and title withheld from publication until independently confirmed.",
);

export function getDepartments(lang: Locale): LocalisedDepartment[] {
  return departments.map((d) => {
    const isVerified = d.head.provenance.state === "verified";
    return {
      id: d.id,
      name: d.name[lang],
      research: d.research[lang],
      provenance: d.provenance,
      head: isVerified
        ? {
            name: d.head.value.name[lang],
            title: d.head.value.title[lang],
            provenance: d.head.provenance,
          }
        : { name: headPending[lang], title: null, provenance: headWithheld },
    };
  });
}