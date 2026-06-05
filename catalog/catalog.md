# 🗂️ The Full Catalog

> The browsable, GitHub-readable mirror of the shop. The **fancy version** is the
> website (`/index.html`); the **source of truth** is [`/data.js`](../data.js) — edit
> that to change the catalog. Every item passed the [Protocol](../docs/PROTOCOL.md).
>
> **Tiers:** 🥇 Core (install first) · 🥈 Recommended · 🥉 Situational · 📋 Shortlist (watch) · 🪟 Showroom (paid / not stocked).
> **Cost:** ✅ Free · 🟡 Free tier · 🔴 Paid.

Legend per line: **Name** — `tier` · cost · _type_ — what. `install` · [source ↗](#)

> _Re-vetted June 2026 — adoption (stars/downloads/sentiment) verified per item. **ruflo**, **claude-mermaid** and **accessible-color-contrast** were removed after failing re-vetting; see [docs/MAINTENANCE.md](../docs/MAINTENANCE.md). Live popularity blurbs are on the [website](../index.html)._

---

## 🧱 Foundations
*The core wiring — connect Claude to your files, repos, browser, docs and memory.*

- **CLAUDE.md / Memory** — `Core` · ✅ · _Concept_ — the per-project rulebook Claude auto-loads. Run `/init`. [↗](https://code.claude.com/docs/en/memory)
- **AGENTS.md** — `Core` · ✅ · _Concept_ — one cross-tool context file all your AIs read. [↗](https://agents.md/)
- **Filesystem MCP (official)** — `Core` · ✅ · _MCP_ — sandboxed file access. `claude mcp add filesystem -- npx -y @modelcontextprotocol/server-filesystem C:/path` [↗](https://github.com/modelcontextprotocol/servers/tree/main/src/filesystem)
- **Git MCP (official)** — `Core` · ✅ · _MCP_ — local git history/diff/stage. `claude mcp add git -- uvx mcp-server-git --repository C:/path` [↗](https://github.com/modelcontextprotocol/servers/tree/main/src/git)
- **GitHub MCP (by GitHub)** — `Core` · ✅ (token) · _MCP_ — repos/issues/PRs/Actions; replaces the archived reference server. [↗](https://github.com/github/github-mcp-server)
- **Context7 MCP (Upstash)** — `Core` · ✅ · _MCP_ — live, version-correct library docs. `claude mcp add --transport http context7 https://mcp.context7.com/mcp` [↗](https://github.com/upstash/context7)
- **Playwright MCP (Microsoft)** — `Core` · ✅ · _MCP_ — drive a real browser to verify UI. `claude mcp add playwright -- npx @playwright/mcp@latest` [↗](https://github.com/microsoft/playwright-mcp)
- **Fetch MCP (official)** — `Recommended` · ✅ · _MCP_ — URL → clean markdown. `claude mcp add fetch -- uvx mcp-server-fetch` [↗](https://github.com/modelcontextprotocol/servers/tree/main/src/fetch)
- **Memory / Knowledge Graph MCP (official)** — `Recommended` · ✅ · _MCP_ — local cross-session memory. `claude mcp add memory -- npx -y @modelcontextprotocol/server-memory` [↗](https://github.com/modelcontextprotocol/servers/tree/main/src/memory)
- **Sequential Thinking MCP (official)** — `Recommended` · ✅ · _MCP_ — structured reasoning for hard calls. `claude mcp add sequential-thinking -- npx -y @modelcontextprotocol/server-sequential-thinking` [↗](https://github.com/modelcontextprotocol/servers/tree/main/src/sequentialthinking)
- **Time MCP (official)** — `Situational` · ✅ · _MCP_ — current time/timezones. `claude mcp add time -- uvx mcp-server-time` [↗](https://github.com/modelcontextprotocol/servers/tree/main/src/time)
- **DBHub (Bytebase)** — `Recommended` · ✅ · _MCP_ — one server for SQLite/Postgres/MySQL/SQL Server (replaces archived DB servers). `npx -y @bytebase/dbhub --transport stdio --dsn "..."` [↗](https://github.com/bytebase/dbhub)
- **Obsidian MCP (Local REST API + cyanheads)** — `Situational` · ✅ · _MCP_ — read/write your vault from Claude (niche; ~577★, was stale then revived). [↗](https://github.com/cyanheads/obsidian-mcp-server)
- **Anthropic Official Skills (PDF/Word/Excel/PPT)** — `Core` · ✅ · _Skill_ — handle any office document. [↗](https://github.com/anthropics/skills)
- **Skills + Official Plugin Marketplace** — `Core` · ✅ · _Plugin_ — install vetted workflows in one command. `/plugin` [↗](https://code.claude.com/docs/en/discover-plugins)
- **awesome-claude-code** — `Recommended` · ✅ · _Concept_ — discovery hub for community skills/hooks/commands. [↗](https://github.com/hesreallyhim/awesome-claude-code)

## 🪃 Orchestration
*Make Claude plan, delegate to subagents, and run multi-step work well.*

- **Subagents** — `Core` · ✅ · _Subagent_ — specialist crew with their own context. `.claude/agents/*.md` [↗](https://code.claude.com/docs/en/sub-agents)
- **Hooks** — `Core` · ✅ · _Concept_ — automatic guardrails on events (format/secret-scan/block). [↗](https://code.claude.com/docs/en/hooks)
- **Plan Mode** — `Core` · ✅ · _Concept_ — research + plan before code (Shift+Tab). [↗](https://code.claude.com/docs/en/how-claude-code-works)
- **GitHub Spec Kit** — `Recommended` · ✅ · _CLI_ — spec-driven dev: specify→plan→tasks→implement. `uv tool install specify-cli --from git+https://github.com/github/spec-kit.git` [↗](https://github.com/github/spec-kit)
- **Deep Research / Dynamic Workflows** — `Recommended` · ✅ · _Skill_ — multi-agent research inside Claude Code. `/deep-research` [↗](https://www.anthropic.com/claude-code)

## ✅ Verification
*Prove the code actually works.*

- **/code-review + /security-review (built-in)** — `Core` · ✅ · _Skill_ — review the diff for bugs/vulns; `--fix`/`--comment`. [↗](https://code.claude.com/docs/en/claude-code)
- **/verify (built-in)** — `Recommended` · ✅ · _Skill_ — run the app and confirm a change works. [↗](https://code.claude.com/docs/en/claude-code)
- **pre-commit framework** — `Core` · ✅ · _Hook_ — runs all your linters/scanners on commit. `pip install pre-commit && pre-commit install` [↗](https://github.com/pre-commit/pre-commit)
- **pytest-cov + coverage.py** — `Recommended` · ✅ · _CLI_ — test coverage with a fail-under floor. `pip install pytest-cov` [↗](https://github.com/pytest-dev/pytest-cov)
- **mutmut (mutation testing)** — `Shortlist` · ✅ · _CLI_ — proves tests are meaningful (needs WSL on Windows). [↗](https://github.com/boxed/mutmut)

## 🔒 Security
*Secrets, vulnerabilities, and code safety.*

- **TruffleHog** — `Core` · ✅ · _CLI_ — finds & verifies live secrets in history (⭐26k, most-proven secret scanner). [↗](https://github.com/trufflesecurity/trufflehog)
- **Semgrep CE (+ plugin)** — `Core` · ✅ · _CLI_ — multi-language SAST; auto-scans Claude's output (note: CE misses cross-file taint). `pip install semgrep` [↗](https://github.com/semgrep/semgrep)
- **gitleaks** — `Recommended` · ✅ · _CLI_ — proven secret scanner; ⚠ creator left → governance watch. `winget install gitleaks` [↗](https://github.com/gitleaks/gitleaks)
- **Betterleaks** — `Shortlist` · ✅ · _CLI_ — gitleaks' creator's successor; new (2026), watch it mature. [↗](https://github.com/betterleaks/betterleaks)
- **Grype (Anchore)** — `Core` · ✅ · _CLI_ — dependency/container CVE scanner (preferred over Trivy). `winget install Anchore.Grype` [↗](https://github.com/anchore/grype)
- **Syft (Anchore)** — `Recommended` · ✅ · _CLI_ — SBOM generation (SPDX/CycloneDX). `scoop install syft` [↗](https://github.com/anchore/syft)
- **Trivy** — `Shortlist` · ✅ · _CLI_ — capable all-in-one, **but** had a 2026 supply-chain compromise — pin Action SHAs, read the advisory. [↗](https://github.com/aquasecurity/trivy/security/advisories/GHSA-69fq-xp46-6x23)
- **OSV-Scanner (Google)** — `Recommended` · ✅ · _CLI_ — polyglot lockfile vuln scanning. [↗](https://github.com/google/osv-scanner)
- **Bandit** — `Recommended` · ✅ · _CLI_ — Python SAST. `pip install bandit` [↗](https://github.com/PyCQA/bandit)
- **eslint-plugin-security** — `Situational` · ✅ · _CLI_ — JS/Node security rules; ⚠ thin coverage (~13 rules) — pair with Semgrep. `npm i -D eslint-plugin-security` [↗](https://github.com/eslint-community/eslint-plugin-security)
- **pip-audit** — `Recommended` · ✅ · _CLI_ — official Python dependency audit. `pip install pip-audit` [↗](https://github.com/pypa/pip-audit)
- **Snyk CLI** — `Shortlist` · 🟡 · _CLI_ — polished scanner w/ dashboard; free-tier scan limits. [↗](https://snyk.io/plans/)
- **OpenSSF Scorecard** — `Recommended` · ✅ · _CLI_ — scores your repo's security hygiene. [↗](https://github.com/ossf/scorecard)

## ⚡ Optimization
*Speed, size, complexity, cleanliness.*

- **Ruff** — `Core` · ✅ · _CLI_ — ultra-fast Python lint+format (replaces a whole toolchain). `pip install ruff` [↗](https://github.com/astral-sh/ruff)
- **Radon** — `Situational` · ✅ · _CLI_ — Python complexity metrics for targeted refactors. `pip install radon` [↗](https://github.com/rubik/radon)
- **Lighthouse / Lighthouse CI** — `Recommended` · ✅ · _CLI_ — perf + a11y audits, CI budgets. `npm i -g lighthouse` [↗](https://github.com/GoogleChrome/lighthouse)
- **Bundle analyzer (webpack/Vite)** — `Situational` · ✅ · _CLI_ — visualize bundle bloat. `npm i -D webpack-bundle-analyzer` [↗](https://github.com/webpack/webpack-bundle-analyzer)

## 🎨 UI / UX
*Better front-end, components, and accessibility.*

- **Tailwind CSS v4** — `Core` · ✅ · _CLI_ — the standard styling layer; Claude writes it natively. [↗](https://tailwindcss.com/)
- **shadcn/ui MCP + registry** — `Recommended` · ✅ · _MCP_ — Claude installs battle-tested components. `npx shadcn@latest mcp init --client claude` [↗](https://ui.shadcn.com/docs/mcp)
- **Chrome DevTools MCP (Google)** — `Recommended` · ✅ · _MCP_ — network/console/perf traces. `claude mcp add chrome-devtools -- npx -y chrome-devtools-mcp@latest` [↗](https://github.com/ChromeDevTools/chrome-devtools-mcp)
- **axe-core CLI (Deque)** — `Recommended` · ✅ · _CLI_ — automatable accessibility checks. `npm i -g @axe-core/cli` [↗](https://github.com/dequelabs/axe-core-npm)
- **WAVE (WebAIM)** — `Recommended` · ✅ · _Web_ — fastest visual a11y review (browser extension). [↗](https://wave.webaim.org/)
- **Storybook** — `Situational` · ✅ · _CLI_ — component workshop + auto-docs. `npx storybook@latest init` [↗](https://storybook.js.org/)
- **Style Dictionary** — `Situational` · ✅ · _CLI_ — one tokens file → all your CSS variables. `npm i -D style-dictionary` [↗](https://github.com/style-dictionary/style-dictionary)
- **Figma Dev Mode MCP** — `Shortlist` · 🟡 · _MCP_ — design→code, but free tier ~6 calls/mo (needs paid seat). [↗](https://www.figma.com/blog/introducing-figma-mcp-server/)
- **21st.dev Magic MCP** — `Shortlist` · 🟡 · _MCP_ — generate UI components; ~100 credits/mo. `npx @21st-dev/magic@latest` [↗](https://github.com/21st-dev/magic-mcp)
- **v0 by Vercel** — `Showroom` · 🟡 · _Web_ — strong UI generation, but separate + credit-limited. [↗](https://v0.app/pricing)

## 📊 Visuals
*Diagrams, flowcharts, and architecture pictures.*

- **Mermaid (text-native)** — `Core` · ✅ · _Concept_ — Claude writes diagrams as text; renders in GitHub/Obsidian. [↗](https://github.com/mermaid-js/mermaid)
- **Mermaid Live Editor** — `Recommended` · ✅ · _Web_ — render/export Claude's Mermaid to PNG/SVG. [↗](https://mermaid.live/)
- **draw.io / diagrams.net** — `Recommended` · ✅ · _Web_ — rich offline diagrams (Windows desktop app). [↗](https://www.drawio.com/)
- **Excalidraw** — `Recommended` · ✅ · _Web_ — quick hand-drawn wireframes. [↗](https://excalidraw.com/)
- **PlantUML** — `Situational` · ✅ · _Concept_ — formal UML / C4 / big sequence diagrams. [↗](https://plantuml.com/)

## 📣 Creative / Marketing
*Posters, copy, brand, social, and free image generation.*

- **Canva MCP / Connector** — `Core` · 🟡 · _Connector_ — generate posters/social/decks by prompt (you already have it). [↗](https://www.canva.dev/docs/mcp/)
- **Hugging Face MCP / Spaces (image gen)** — `Recommended` · ✅ · _MCP_ — free FLUX/SD image generation; finish text in Canva. [↗](https://huggingface.co/spaces/black-forest-labs/FLUX.1-dev)
- *(See also: Poster Brief skill in `starter-kit/skills/poster-brief`.)*

## 📚 Documentation
*Docs systems, READMEs, and shared context across AI tools.*

- **/init (CLAUDE.md generator)** — `Core` · ✅ · _Concept_ — bootstrap project context in seconds. [↗](https://code.claude.com/docs/en/memory)
- **MkDocs Material** — `Recommended` · ✅ · _CLI_ — markdown → polished docs site; GitHub Pages in minutes. `pip install mkdocs-material` [↗](https://github.com/squidfunk/mkdocs-material)
- **Docusaurus** — `Situational` · ✅ · _CLI_ — React docs site for JS/TS projects + versioned docs. `npx create-docusaurus@latest my-docs classic` [↗](https://github.com/facebook/docusaurus)
- *(See also: Context7, Anthropic doc skills, Mermaid — listed in their home aisles.)*

## 🗃️ Data / Documents
*Databases, files, PDFs/Office, and your Obsidian vault.*

- **DBHub (Bytebase)** — `Recommended` · ✅ · _MCP_ — SQL across SQLite/Postgres/MySQL/SQL Server (see Foundations).
- **DuckDB / MotherDuck MCP** — `Situational` · ✅ · _MCP_ — fast analytics over CSV/Parquet/JSON. `uvx mcp-server-motherduck --db-path local` [↗](https://github.com/motherduckdb/mcp-server-motherduck)
- **Google Drive Connector** — `Situational` · ✅ · _Connector_ — cloud docs (you already have it). [↗](https://support.anthropic.com/en/articles/connectors)
- *(See also: Obsidian MCP, Anthropic doc skills, Memory MCP — in their home aisles.)*

## 🧭 Planning / Workflow
*Idea → demo → prototype → MVP → production.*

- **Idea→Production Stage Gates** — `Core` · ✅ · _Concept_ — this repo's gated pipeline. [↗](../docs/WORKFLOW.md)
- *(See also: Plan Mode, Spec Kit, Sequential Thinking, Deep Research — in Orchestration.)*

## 📌 Project Mgmt
*Status tracking, issues, and kanban.*

- **GitHub Projects** — `Core` · ✅ · _Web_ — kanban/roadmap tied to Issues/PRs; your default. [↗](https://github.com/features/issues)
- **Obsidian Kanban plugin** — `Shortlist` · ✅ · _Plugin_ — markdown boards in your vault; ⚠ no release in 12+ mo, seeking maintainers. [↗](https://github.com/obsidian-community/obsidian-kanban)
- **Linear (free tier)** — `Shortlist` · 🟡 · _Web_ — best UX, but ~250-issue cap. [↗](https://linear.app/pricing)
- **Notion (free + MCP)** — `Shortlist` · 🟡 · _Connector_ — all-in-one; redundant with Obsidian. [↗](https://github.com/makenotion/notion-mcp-server)

## ✍️ Prompting
*Generate and enhance prompts to delegate tasks to people or AIs.*

- **Anthropic Prompt Generator + Improver** — `Core` · ✅ · _Web_ — author/refine prompts in the Console. [↗](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/prompt-improver)
- **Anthropic Metaprompt (cookbook)** — `Recommended` · ✅ · _Concept_ — a prompt that writes prompts. [↗](https://github.com/anthropics/anthropic-cookbook/blob/main/misc/metaprompt.ipynb)
- **Prompt skills as slash commands** — `Core` · ✅ · _Skill_ — bank your best prompts as reusable skills. See `starter-kit/skills/prompt-forge`. [↗](https://code.claude.com/docs/en/skills)

## 📜 Compliance
*SOC 2 / ISO 27001 readiness helpers (the free technical half).*

- **Syft (SBOM)** + **Grype (CVEs)** — `Recommended`/`Core` · ✅ · _CLI_ — machine evidence for audits (see Security).
- **FOSSA CLI (license)** — `Recommended` · 🟡 · _CLI_ — dependency license compliance. [↗](https://github.com/fossas/fossa-cli)
- **OpenSSF Best Practices Badge** — `Recommended` · ✅ · _Web_ — free structured self-assessment + trust badge. [↗](https://www.bestpractices.dev/en)
- **OpenSSF Scorecard** — `Recommended` · ✅ · _CLI_ — repo security posture score (see Security).
- **Vanta / Drata / Secureframe** — `Showroom` · 🔴 · _Web_ — GRC automation; buy only when a customer contract requires SOC 2. See [COMPLIANCE.md](../docs/COMPLIANCE.md). [↗](https://www.vanta.com/)

---

> ⚠️ **Honest note on compliance:** SOC 2 / ISO 27001 are *audits signed by a human*, not
> tools. The free tools above cover the **technical** half; the **process** half
> (policies, access reviews, incident logs) is human work. Full breakdown:
> [docs/COMPLIANCE.md](../docs/COMPLIANCE.md).
