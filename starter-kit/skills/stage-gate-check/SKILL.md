---
name: Stage Gate Check
description: Use when the user asks "are we ready for the next stage", wants to check project readiness, or mentions moving from demo/prototype/MVP toward production. Checks the current project against the idea→production stage gates and lists the smallest next steps.
---

# Stage Gate Check — am I ready to move forward?

Implements the gates from `docs/WORKFLOW.md`. The aim is to move **one gate at a time** —
not to gold-plate a demo, and not to ship an unhardened prototype.

## When invoked

1. **Determine the current stage** (ask if unclear): Think · Plan · Demo · Prototype ·
   MVP · Production.

2. **Inspect the repo for evidence**, then check the gate for that stage:

   | Stage | Gate — pass only if… |
   |-------|----------------------|
   | Think | a 2-sentence "who + what pain" exists |
   | Plan | `SPEC.md` (or equivalent) + an architecture diagram + a `CLAUDE.md` exist |
   | Demo | the single core "magic" actually works (ugly/hardcoded is fine) |
   | Prototype | happy path works end-to-end on real data + a few tests for it |
   | MVP | real users can use it; green CI; no high/critical vulns; no secrets in git; a11y not broken; core paths tested |
   | Production | observable (logging/monitoring), documented, hardened; if commercial, compliance checklist underway |

3. **Report** exactly three things:
   - ✅ **What passes** (with the evidence you found).
   - ❌ **What's missing** to clear this gate (specific, file-level where possible).
   - ➡️ **Smallest next steps** — only what the gate requires, nothing extra.

4. **Suggest the cart tools** for the gaps (e.g. missing security check → `/security-review`
   + Grype + a secret scan; missing perf check → Lighthouse; missing tests → pytest-cov).

## Rules
- Don't recommend work beyond the current gate (no premature hardening, no gold-plating).
- If the core idea itself looks broken at the Demo gate, say so plainly — recommend
  rethinking, not polishing.
- Keep it actionable; prefer a short checklist over prose.
