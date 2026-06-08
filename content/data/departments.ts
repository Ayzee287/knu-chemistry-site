import type { Locale } from "@/lib/i18n";

// Single source of truth for the five departments — language-neutral structure
// with localised fields. Replaces the duplicated faculty/areas data that
// previously lived in both en.ts and ua.ts (translation-drift risk).
//
// Leadership data is sourced from the faculty's published structure (chem.knu.ua)
// and MUST be verified against current leadership before publication.

type Localised = Record<Locale, string>;

export type Department = {
  id: string;
  name: Localised;
  research: Localised;
  head: { name: Localised; title: Localised };
};

export const departments: Department[] = [
  {
    id: "inorganic",
    name: { ua: "Неорганічна хімія", en: "Inorganic Chemistry" },
    research: {
      ua: "Координаційні сполуки, матеріали та хімія елементів.",
      en: "Coordination compounds, materials, and the chemistry of the elements.",
    },
    head: {
      name: { ua: "Р. Д. Лампека", en: "R. D. Lampeka" },
      title: { ua: "професор, д.х.н.", en: "Professor, Dr. Sc." },
    },
  },
  {
    id: "organic",
    name: { ua: "Органічна хімія", en: "Organic Chemistry" },
    research: {
      ua: "Синтез, механізми та хімія природних сполук.",
      en: "Synthesis, mechanisms, and the chemistry of natural compounds.",
    },
    head: {
      name: { ua: "О. О. Григоренко", en: "O. O. Hryhorenko" },
      title: { ua: "професор, д.х.н.", en: "Professor, Dr. Sc." },
    },
  },
  {
    id: "analytical",
    name: { ua: "Аналітична хімія", en: "Analytical Chemistry" },
    research: {
      ua: "Аналітичні методи та хімічний контроль об’єктів довкілля.",
      en: "Analytical methods and chemical control of environmental objects.",
    },
    head: {
      name: { ua: "О. Ю. Тананайко", en: "O. Yu. Tananaiko" },
      title: { ua: "доцент, д.х.н.", en: "Associate Professor, Dr. Sc." },
    },
  },
  {
    id: "physical",
    name: { ua: "Фізична хімія", en: "Physical Chemistry" },
    research: {
      ua: "Термодинаміка, кінетика та фізична хімія міжфазних явищ.",
      en: "Thermodynamics, kinetics, and the physical chemistry of interfacial phenomena.",
    },
    head: {
      name: { ua: "І. О. Фрицький", en: "I. O. Fritsky" },
      title: {
        ua: "професор · член-кор. НАН України",
        en: "Professor · Corr. Member, NAS of Ukraine",
      },
    },
  },
  {
    id: "macromolecular",
    name: { ua: "Високомолекулярна хімія", en: "Macromolecular Chemistry" },
    research: {
      ua: "Синтез і дослідження високомолекулярних сполук.",
      en: "Synthesis and study of macromolecular and high-molecular compounds.",
    },
    head: {
      name: { ua: "І. О. Савченко", en: "I. O. Savchenko" },
      title: { ua: "професор, д.х.н.", en: "Professor, Dr. Sc." },
    },
  },
];

export type LocalisedDepartment = {
  id: string;
  name: string;
  research: string;
  head: { name: string; title: string };
};

export function getDepartments(lang: Locale): LocalisedDepartment[] {
  return departments.map((d) => ({
    id: d.id,
    name: d.name[lang],
    research: d.research[lang],
    head: { name: d.head.name[lang], title: d.head.title[lang] },
  }));
}
