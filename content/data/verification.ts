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

/**
 * Only the facts that still need a human to confirm before publication.
 *
 * That is exactly the `sourced` state: taken from a reference source but not yet
 * independently verified. `verified` is settled; `placeholder` (honest gap) and
 * `editorial` (framing, not a discrete fact) are not verification targets, so
 * they are intentionally excluded — reporting them as "needs verification" would
 * overstate the backlog.
 */
export function unverifiedItems(): VerificationItem[] {
  return contentVerificationReport().filter(
    (i) => i.provenance.state === "sourced",
  );
}

/** Quick health number for dashboards / reports. */
export function verificationSummary(): {
  total: number;
  verified: number;
  unverified: number;
} {
  const all = contentVerificationReport();

  // Computed from the actual provenance state, not assumed. `verified` +
  // `unverified` need not equal `total`: any placeholder/editorial entries in
  // the report are tracked facts but are not verification targets (see
  // unverifiedItems), so they count toward `total` only.
  const verified = all.filter((i) => i.provenance.state === "verified").length;
  const unverified = all.filter((i) => i.provenance.state === "sourced").length;

  return {
    total: all.length,
    verified,
    unverified,
  };
}