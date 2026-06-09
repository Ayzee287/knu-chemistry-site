import type { Locale } from "@/lib/i18n";
import {
  claim,
  fromChemKnu,
  type Claim,
  type Localised,
  type Provenance,
} from "@/lib/provenance";

// Single source of truth for the faculty's contact facts. Previously these
// lived duplicated in both en.ts and ua.ts (drift risk, and the two languages
// had already drifted on the street name). Each field is a discrete factual
// claim and carries provenance: address/email/phone are sourced from
// chem.knu.ua and NOT yet independently verified.
//
// Bilingual note: both languages now assert the same street name (incl. the
// patronym "Павла / Pavla"); EN previously dropped it. Confirm building number
// and postal index on verification.

const address: Claim<Localised<string[]>> = claim(
  {
    ua: ["вул. Гетьмана Павла Скоропадського, 12", "Київ, 01033, Україна"],
    en: ["12 Hetmana Pavla Skoropadskoho St", "Kyiv 01033, Ukraine"],
  },
  fromChemKnu(
    "Street renamed from Lva Tolstoho; confirm building number and postal index.",
  ),
);

// Locale-invariant facts — stored as plain values, not localised maps.
const email: Claim<string> = claim("chem@knu.ua", fromChemKnu());
const phone: Claim<string> = claim("+38 (044) 239-33-58", fromChemKnu());

export const contact = { address, email, phone };

export type LocalisedContact = {
  address: { value: string[]; provenance: Provenance };
  email: { value: string; provenance: Provenance };
  phone: { value: string; provenance: Provenance };
};

export function getContact(lang: Locale): LocalisedContact {
  return {
    address: { value: address.value[lang], provenance: address.provenance },
    email,
    phone,
  };
}
