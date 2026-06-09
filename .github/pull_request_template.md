## Summary

<!-- What changed and why. Keep it scoped. -->

## Type of change

- [ ] Content (editorial copy / facts)
- [ ] UI / components
- [ ] Architecture / framework
- [ ] Docs / tooling

## Checklist

<!-- See CONTRIBUTING.md for the rationale behind each rule. -->

- [ ] **Facts vs copy:** discrete facts (people, addresses, contacts) live in `content/data/` with provenance — not in `en.ts` / `ua.ts`.
- [ ] **Provenance:** any new fact carries a trust state; nothing is `verified` without an authoritative non-`chem.knu.ua` source.
- [ ] **Bilingual parity:** `ua.ts` and `en.ts` are in the same shape (the build confirms it).
- [ ] **Design tokens:** no new colours / libraries introduced for one-off needs.
- [ ] `npm run lint` passes.
- [ ] `npm run build` passes.

## Notes for reviewers

<!-- Anything still unverified, follow-ups, or backlog items touched. -->
