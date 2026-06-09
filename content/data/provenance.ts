// Content provenance & verification tagging.
//
// Goal: institutional realism WITHOUT publishing unverified academic information
// as authoritative fact. Rule of thumb: wrong information is worse than a placeholder.
//
// Every sensitive institutional fact (people, titles, statistics, claims) sourced from
// an external reference such as chem.knu.ua carries a Provenance record so the team can
// see, in one place, what still needs a human to confirm before publication.

export type Provenance = {
  /** Has a human confirmed this value against an authoritative source? */
  verified: boolean;
  /** Where the value was sourced from, e.g. "chem.knu.ua". */
  source: string;
  /** ISO date (YYYY-MM-DD) the value was last checked against the source. */
  lastChecked: string;
  /** Optional note: why it is unverified / what specifically to confirm. */
  note?: string;
};

/** A fact a human has confirmed against the cited source. Safe to publish as authoritative. */
export function verified(
  source: string,
  lastChecked: string,
  note?: string,
): Provenance {
  return { verified: true, source, lastChecked, note };
}

/**
 * A fact sourced but NOT yet human-confirmed. May be rendered (it is sourced, not
 * invented) but must not be treated as authoritative until verified.
 */
export function unverified(
  source: string,
  lastChecked: string,
  note?: string,
): Provenance {
  return { verified: false, source, lastChecked, note };
}

/** Should this value block "verified content" gates? */
export function needsVerification(p: Provenance): boolean {
  return !p.verified;
}
