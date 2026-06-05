# 🧭 The Workflow — Idea → Production (with stage gates)

> You asked for a path "from thinking, to planning, to a dummy demo, to a basic
> prototype, to an MVP, to production ready." Here it is as a repeatable pipeline,
> with a **stage gate** (a "you may not pass until…") between each step, and which
> tools/skills from the cart to use at each stage.

The golden rule for an AI-reliant solo dev:

> **Plan in prose before you build in code.** Every expensive mistake you'll make is
> cheaper to fix in a paragraph than in 5,000 lines. Use Plan Mode + a written spec.

---

## The six stages

```mermaid
flowchart LR
    T["💭 0. Think"] --> P["🗺️ 1. Plan"]
    P --> D["🧪 2. Demo"]
    D --> PR["🔩 3. Prototype"]
    PR --> M["🚀 4. MVP"]
    M --> PROD["🏭 5. Production"]
    T -. gate .-> P
    P -. gate .-> D
    D -. gate .-> PR
    PR -. gate .-> M
    M -. gate .-> PROD
```

---

### 💭 Stage 0 — Think (diverge)
**Goal:** Understand the problem and the landscape before committing to anything.

- **Do:** Brain-dump the problem, the user, the "why now." Research prior art and
  alternatives. Collect references into your **Obsidian vault**.
- **Cart tools:** Deep-research capability · web/fetch MCP · Obsidian MCP (capture to
  vault) · Sequential-Thinking MCP (work through fuzzy problems).
- **Output:** A one-page problem statement + a few reference links.

> **🚪 Gate 0→1:** Can you state, in 2 sentences, *who* this is for and *what pain*
> it removes? If not, stay in Think.

---

### 🗺️ Stage 1 — Plan (converge)
**Goal:** Turn the idea into a written, reviewable spec *before* code.

- **Do:** Use **Plan Mode** in Claude Code. Write a short spec: scope, non-goals, data
  model, screens, risks. Decide the stack. Sketch the architecture as a diagram.
- **Cart tools:** Plan Mode · spec-driven dev (spec-kit) · Mermaid diagrams (architecture
  + flowcharts) · the prompt-enhancer skill (to write a crisp build brief).
- **Output:** `SPEC.md`, an architecture diagram, a `CLAUDE.md` for the new project.

> **🚪 Gate 1→2:** Is there a written spec a stranger could read and a "definition of
> done" for the demo? If not, keep planning.

---

### 🧪 Stage 2 — Demo (prove the core idea)
**Goal:** The thinnest possible thing that shows the *one* magic moment works. Ugly is
fine. Hard-coded is fine.

- **Do:** Build only the single core interaction. No auth, no DB, no polish. Throwaway
  code is allowed and expected.
- **Cart tools:** UI scaffolding (shadcn/Tailwind) · Playwright MCP / Chrome DevTools
  MCP (see it run) · Figma MCP (if you want a quick visual).
- **Output:** A clickable thing that demonstrates the core value once.

> **🚪 Gate 2→3:** Does the core magic actually work *at all*? If the central idea
> doesn't hold up, **stop and rethink** — don't polish a dead idea.

---

### 🔩 Stage 3 — Prototype (make it real-ish)
**Goal:** Real data flow, multiple screens, the happy path end-to-end. Still not
hardened.

- **Do:** Add a real (simple) data store, wire the main flows, replace hard-coding.
  Start writing a few tests for the critical path.
- **Cart tools:** SQLite/DB MCP · pre-commit (formatting/lint from the start) ·
  Playwright (smoke tests) · documentation skills (keep a running README).
- **Output:** End-to-end happy path on real data; basic tests; running README.

> **🚪 Gate 3→4:** Can a friendly user complete the main task end-to-end without you
> hand-holding? If not, finish the path.

---

### 🚀 Stage 4 — MVP (smallest *shippable* version)
**Goal:** Something real people can use. Handles errors, edge cases, basic security.

- **Do:** Error states, input validation, auth if needed, accessibility pass, a real
  test suite, basic CI. Run security + dependency scans.
- **Cart tools:** `/security-review` + `/code-review` · Semgrep · gitleaks ·
  npm/pip audit · OSV-Scanner · axe/Lighthouse (a11y + perf) · coverage.
- **Output:** Deployed MVP, green CI, no known criticals, decent test coverage.

> **🚪 Gate 4→5:** Green CI? No high/critical vulns? No secrets in git history? Core
> paths covered by tests? a11y not broken? If any "no," fix before prod.

---

### 🏭 Stage 5 — Production (harden & make it boring)
**Goal:** Reliable, observable, maintainable, and — if you'll ship commercially —
on the path to compliance.

- **Do:** Logging/monitoring, performance pass, SBOM, license check, documentation
  complete, runbook, backups. Walk the compliance checklist if going commercial.
- **Cart tools:** Lighthouse CI (perf budgets) · Syft/Grype (SBOM + vuln) · license
  checker · OpenSSF Scorecard · the SOC 2 / ISO 27001 readiness checklist.
- **Output:** Production deploy + monitoring + complete docs + (if commercial) a
  compliance-readiness checklist underway. → see [COMPLIANCE.md](./COMPLIANCE.md)

> **🚪 Gate 5→ship:** Can you sleep at night? Monitoring will tell you before users do?
> Docs let someone else operate it? Then ship.

---

## The "definition of done" cheat sheet

Pin this. A stage isn't finished because it *feels* done — it's done when it passes
the gate.

| Stage | Done when… |
|-------|-----------|
| Think | 2-sentence who + what-pain is written |
| Plan | `SPEC.md` + architecture diagram + `CLAUDE.md` exist |
| Demo | the one core magic works, even if ugly/hardcoded |
| Prototype | happy path works end-to-end on real data + a few tests |
| MVP | real users can use it; green CI; no criticals; a11y ok |
| Production | observable, documented, hardened; (commercial → compliance underway) |

---

## How to drive this with Claude Code

A reusable prompt to keep yourself honest:

> "We're at **\<stage\>** for **\<project\>**. Per `docs/WORKFLOW.md`, check the gate
> for this stage against the current repo, list what's missing to pass it, and propose
> the smallest set of next steps. Don't gold-plate — only what the gate requires."

This keeps you moving forward *one gate at a time* instead of endlessly polishing a
demo or shipping an unhardened prototype.
