# 🛒 AI_CONTEXT

**Your personal shopping center for hooking real, free, battle-tested tools into Claude
— Claude Code first, then everywhere else Claude lives.**

This repo is the "holy grail" you keep coming back to: a curated catalog of MCP servers,
skills, connectors, plugins, hooks and CLIs — each one vetted against a strict
[admission protocol](docs/PROTOCOL.md) so you get *signal, not shiny-object syndrome*.
It ships with a browsable website, ready-to-use configs, and beginner guides for someone
who's never touched an MCP before.

> _“I want stable and reliable stuff… free is good… not too many fancy shiny-syndrome
> items… and a fancy website with a nice UI to navigate this shopping center.”_ — the brief.
> ✅ Done. Here it is.

---

## 🚪 Start here (pick your door)

| If you want to… | Open this |
|------------------|-----------|
| **Understand the basics** (what *is* an MCP, a skill, a hook?) | [docs/GLOSSARY.md](docs/GLOSSARY.md) |
| **Browse the shop** in a nice UI | the website → [`index.html`](index.html) (host it: [docs/GITHUB-PAGES.md](docs/GITHUB-PAGES.md)) |
| **Read the catalog** on GitHub | [catalog/catalog.md](catalog/catalog.md) |
| **Know the rules** (what gets stocked / rejected) | [docs/PROTOCOL.md](docs/PROTOCOL.md) |
| **Set up Claude Code on Windows** | [docs/INSTALL-ON-WINDOWS.md](docs/INSTALL-ON-WINDOWS.md) |
| **Get going in 15 minutes** | [starter-kit/](starter-kit/) |

---

## 🌐 The website

A self-contained, dependency-free site (`index.html` + `styles.css` + `app.js` +
`data.js`) that turns the catalog into a real shopping experience:

- 🔎 search + filter by **department, tier, type, cost** (toggle "Free only")
- 🏷️ every item shows **what it is, why it fits you, the install command (one-click copy), maturity, risks, and a verdict**
- 🛒 a working **cart**: add tools, then "check out" into a **personal install checklist** (Markdown you can paste back to Claude Code as "install these for me")
- 📜 the **Protocol** built into the page

**Preview locally:** just double-click `index.html` (it needs no server).
**Publish for free:** follow [docs/GITHUB-PAGES.md](docs/GITHUB-PAGES.md) → it'll live at
`https://hirakhanji.github.io/AI_CONTEXT/`.

---

## 🏬 The 14 departments

🧱 Foundations · 🪃 Orchestration · ✅ Verification · 🔒 Security · ⚡ Optimization ·
🎨 UI/UX · 📊 Visuals · 📣 Creative/Marketing · 📚 Documentation · 🗃️ Data/Documents ·
🧭 Planning/Workflow · 📌 Project Mgmt · ✍️ Prompting · 📜 Compliance

Each maps to one of your stated needs — verifying code, better UI/UX, security/safety,
optimization, docs, orchestration, data/document handling, the idea→production pipeline,
SOC 2 / ISO readiness, marketing/posters, prompt generation, planning, flowcharts, and
project status.

---

## 📜 The Protocol in one breath

Nothing gets stocked unless it clears **all five gates** (default answer = reject):

1. 💸 **Free** for a solo dev · 2. 🛠️ **Maintained** (<12 mo) · 3. 🛡️ **Safe**/auditable ·
4. 🎯 **Real job** (fits a department) · 5. 🪟 **Fits you** (Windows + Claude Code).

Then it's scored and tiered: 🥇 **Core** (install first) · 🥈 **Recommended** ·
🥉 **Situational** · 📋 **Shortlist** (watch) · 🪟 **Showroom** (paid, not stocked).
Full rules + decision flowchart: [docs/PROTOCOL.md](docs/PROTOCOL.md).

This is *why* you'll see, e.g., **Grype + Syft** stocked over **Trivy** (a 2026
supply-chain incident demoted it), **Betterleaks** beside **gitleaks** (maintainer
split), and **DBHub** instead of the archived official SQLite/Postgres servers. The
reasons are logged in the [decision log](docs/MAINTENANCE.md).

---

## 🧰 What's in the box

```
AI_CONTEXT/
├── index.html · styles.css · app.js · data.js   # the website (data.js = the catalog)
├── catalog/catalog.md                            # GitHub-browsable catalog
├── docs/
│   ├── GLOSSARY.md          # plain-English: MCP, connectors, skills, hooks, subagents…
│   ├── PROTOCOL.md          # the admission rules (the heart)
│   ├── INSTALL-ON-WINDOWS.md# Windows + Claude Code setup, with the gotchas
│   ├── WORKFLOW.md          # idea → demo → prototype → MVP → production (with gates)
│   ├── COMPLIANCE.md        # honest SOC 2 / ISO 27001 guide + free toolkit
│   ├── MAINTENANCE.md       # the restock ritual + decision log
│   └── GITHUB-PAGES.md      # how to host the site for free
└── starter-kit/             # copy-paste configs that make it usable today
    ├── .mcp.json            # 7 free core MCP servers, no secrets needed
    ├── CLAUDE.md.template · AGENTS.md.template
    ├── settings.hooks.example.json · .pre-commit-config.yaml
    ├── skills/              # prompt-forge · poster-brief · stage-gate-check
    └── agents/code-reviewer.md
```

---

## 🔄 Keeping it alive

This is a *living* shop, not a one-time dump. When you spot a new tool, run it through the
Protocol (Claude can do this for you — see [docs/MAINTENANCE.md](docs/MAINTENANCE.md)),
log the verdict, and the catalog + site update together. Re-vet quarterly; prune anything
unused for 90 days. The decision log remembers *why* you added or rejected each thing, so
you never re-litigate the same hype.

---

*Curated June 2026 for a solo, AI-reliant Windows developer. Free &amp; battle-tested only.*
