# 🔄 Keeping the Shop Stocked — the Restock Ritual

> A shopping center that never restocks or removes expired goods becomes a junkyard.
> This is the simple, repeatable ritual that keeps AI_CONTEXT useful for years instead
> of rotting into a list of dead links. It's also your **decision log** — the memory of
> *why* you added or rejected things.

---

## The cadence

| When | Do this | Time |
|------|---------|------|
| **Whenever you spot a new tool** | Run it through the [Protocol](./PROTOCOL.md). Log the verdict below. | 5 min |
| **Monthly** | Skim the [discovery hubs](#discovery-hubs). Add anything that passes the Protocol. | 15 min |
| **Quarterly** | Re-vet every `CORE`/`RECOMMENDED` item against the 5 gates. Prune unused-90-days. | 30 min |
| **On any "free → paid" change** | Demote the item to `SHOWROOM`, find a free replacement. | as needed |

---

## How to add an item (the easy way)

Paste this to Claude Code from inside this repo:

> "Run the AI_CONTEXT Admission Protocol (`docs/PROTOCOL.md`) on **\<tool + link\>**.
> Verify it's free, maintained (commit < 12 mo), and safe by fetching its repo. If it
> passes, add an entry to `data.js` and `catalog/catalog.md` in the existing format,
> add a row to the decision log in `docs/MAINTENANCE.md`, then commit and push."

Claude does the vetting, the catalog entry, the site update, and the log — you just
approve.

---

## How to remove / demote an item

> "Tool **\<X\>** went \<paid / abandoned / broken\>. Demote it in `data.js` and
> `catalog/catalog.md` to `\<SHOWROOM / REJECTED\>`, note the reason and date in the
> decision log, suggest a free replacement, and commit."

We **keep rejected items with their reason** so the same shiny thing doesn't get
re-evaluated from scratch every time it trends on YouTube.

---

## Discovery hubs (where new candidates come from)

Check these when restocking. Treat everything as a *candidate*, not an auto-add —
the Protocol decides.

- **awesome-claude-code** — community catalog of skills/hooks/commands/subagents.
- **Official plugin marketplace** — `/plugin` inside Claude Code → `claude-plugins-official`.
- **modelcontextprotocol/servers** — the official reference MCP servers (note the
  *archived* ones are unsafe; stick to active).
- **Anthropic skills repo + Anthropic news/changelog** — official skills & features.
- **Claude Code docs "What's new"** — new built-in capabilities (often replace a tool
  you'd otherwise install).
- Your own pain points — the best filter. If you hit the same friction 3×, look for a
  tool for *that*, don't browse for browsing's sake (Protocol Rule R2).

---

## 🗂️ Decision Log

> Newest first. This is the institutional memory. Every add/reject/demote gets a row.

| Date | Item | Decision | Reason |
|------|------|----------|--------|
| 2026-06-05 | **Initial stock** | Catalog v1.0 created | First curation across all 14 departments — see `catalog/catalog.md`. |
| 2026-06-05 | Official SQLite & Postgres reference MCP servers | ❌ REJECTED | Archived to `servers-archived` with known SQL-injection issues. Replaced by **Bytebase DBHub**. |
| 2026-06-05 | `modelcontextprotocol` reference GitHub server | ❌ REJECTED | Archived. Replaced by official **github/github-mcp-server**. |
| 2026-06-05 | **Trivy** | 📋 SHORTLIST (was a candidate for CORE) | `trivy-action`/`setup-trivy` supply-chain compromise (Mar 2026, GHSA-69fq-xp46-6x23). Prefer **Grype + Syft**; if used, pin CI actions to commit SHAs and read the advisory. |
| 2026-06-05 | gitleaks → **Betterleaks** | ✅ Betterleaks INCLUDED; gitleaks kept as alt | gitleaks creator left (limited repo control) and shipped **Betterleaks** (MIT, backed by Aikido). gitleaks mainline still works; watch governance. |
| 2026-06-05 | Vanta / Drata / Secureframe | 🪟 SHOWROOM | Paid ($5k–$25k+/yr). Revisit only when a customer contract requires SOC 2. |
| 2026-06-05 | Figma Dev Mode MCP | 📋 SHORTLIST | Powerful but free tier ~6 calls/mo — needs a paid Figma seat to be usable. |
| 2026-06-05 | Linear (free) / Notion (free) | 📋 SHORTLIST | Good, but 250-issue cap (Linear) / redundant with your Obsidian PKB (Notion). GitHub Projects is the free default. |
| 2026-06-05 | Ruflo (ex claude-flow) | 📋 SHORTLIST | Real traction but heavy/complex; advanced features unfinished. Revisit after mastering basics (Rule R3 hype tax). |

---

## Health check questions (quarterly)

For each `CORE`/`RECOMMENDED` item, ask:
1. **Still free?** (Gate G1) — any new paywall?
2. **Still maintained?** (Gate G2) — commit in last 12 months?
3. **Still safe?** (Gate G3) — any advisories/incidents? (This is how Trivy got demoted.)
4. **Still used?** — touched it in 90 days? If not → prune.
5. **Better option now?** — did something newer clearly win its job? (Rule R1)

> Run it as: *"Quarterly re-vet of AI_CONTEXT: for each CORE and RECOMMENDED item in
> `data.js`, web-check free/maintained/safe status and recent advisories, flag anything
> that should be demoted, and update the decision log."*
