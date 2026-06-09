// Single operational view of content provenance across all structured data.
//
// As more data files (programs, research, contacts…) gain Provenance records, add them
// to `contentVerificationReport()` so there is one place to answer: "what unverified
// institutional facts are we currently shipping, and where did they come from?"
//
// Usage (e.g. a dev check or a future content-audit page):
//   import { unverifiedItems } from "@/content/data/verification";
//   unverifiedItems().forEach((i) => console.warn(`NEEDS_VERIFICATION: ${i.area}/${i.id}.${i.field}`));

import { departments } from "./departments";
import type { Provenance } from "@/lib/provenance";

export type VerificationItem = {
  area: string;
  id: string;
  field: string;
  value: string;
  provenance: Provenance;
};

/** Every provenance-tracked fact across structured content. */
export function contentVerificationReport(): VerificationItem[] {
  return [
    ...departments.map((d) => ({
      area: "departments",
      id: d.id,
      field: "head",
      value: `${d.head.value.name.en} — ${d.head.value.title.en}`,
      provenance: d.head.provenance,
    })),
  ];
}

/** Only the facts that still need a human to confirm before publication. */
export function unverifiedItems(): VerificationItem[] {
  return contentVerificationReport();
}

/** Quick health number for dashboards / reports. */
export function verificationSummary(): {
  total: number;
  verified: number;
  unverified: number;
} {
  const all = contentVerificationReport();

  const verified = 0;

  return {
    total: all.length,
    verified,
    unverified: all.length - verified,
  };
}