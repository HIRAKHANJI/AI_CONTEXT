# 🧰 Starter Kit — the "already checked out" cart

These are copy-paste-ready files that take you from "never used an MCP" to a working,
modern Claude Code setup. Everything here is **free** and passes the
[Protocol](../docs/PROTOCOL.md). Copy what you want into a project (or your global
`~/.claude/`), tweak, go.

> New to the concepts? Read [`../docs/GLOSSARY.md`](../docs/GLOSSARY.md) first
> (what's an MCP, a skill, a hook). Windows specifics are in
> [`../docs/INSTALL-ON-WINDOWS.md`](../docs/INSTALL-ON-WINDOWS.md).

---

## What's in here

| File | Drop it here | What it does |
|------|--------------|--------------|
| `.mcp.json` | your project root | Wires up the 7 core MCP servers (all free, no secrets needed). |
| `CLAUDE.md.template` | your project root → rename `CLAUDE.md` | The per-project rulebook Claude auto-loads. |
| `AGENTS.md.template` | your project root → rename `AGENTS.md` | Cross-AI shared context (Claude + Copilot + Cursor + …). |
| `settings.hooks.example.json` | merge into `.claude/settings.json` | Example automatic guardrails (auto-format, session reminder). |
| `.pre-commit-config.yaml` | your project root | Auto-runs security + format checks on every commit. |
| `skills/poster-brief/SKILL.md` | `.claude/skills/` | Turns a vague idea into a poster/marketing brief + generation prompt. |
| `skills/prompt-forge/SKILL.md` | `.claude/skills/` | Generates a polished, self-contained prompt to hand to another person/AI. |
| `skills/stage-gate-check/SKILL.md` | `.claude/skills/` | Checks your project against the idea→production stage gates. |
| `agents/code-reviewer.md` | `.claude/agents/` | An example subagent (specialist crew member). |

---

## The 15-minute first-time setup

1. **Install the core MCP servers** (global, so every project gets them):
   ```powershell
   claude mcp add context7 --scope user -- npx -y @upstash/context7-mcp
   claude mcp add playwright --scope user -- npx @playwright/mcp@latest
   claude mcp add memory --scope user -- npx -y @modelcontextprotocol/server-memory
   claude mcp add sequential-thinking --scope user -- npx -y @modelcontextprotocol/server-sequential-thinking
   claude mcp list
   ```
   …or just drop `.mcp.json` into a project to scope them to that repo instead.

2. **Add a `CLAUDE.md`** to your project (copy the template, or run `/init`).

3. **Copy a skill** into `.claude/skills/` and try it — type `/prompt-forge` in Claude Code.

4. **(Optional) Turn on hooks + pre-commit** for automatic quality/safety.

That's the whole on-ramp.

---

## ⚠️ Windows note (read if a server won't start)

`npx`-launched servers in `.mcp.json` sometimes fail silently on Windows. If a server
won't connect, wrap the command in `cmd /c`. Example — change:
```json
{ "command": "npx", "args": ["-y", "@upstash/context7-mcp"] }
```
to:
```json
{ "command": "cmd", "args": ["/c", "npx", "-y", "@upstash/context7-mcp"] }
```
Also: use forward slashes (`C:/Users/you/...`) or escaped backslashes (`C:\\Users\\you`)
in JSON paths.

---

## Servers that need a secret or a path (add when ready)

These aren't in the default `.mcp.json` because they need a token or a local path —
add them per the [catalog](../catalog/catalog.md):

- **GitHub MCP** — needs a GitHub token (start read-only). See `github/github-mcp-server`.
- **DBHub** — needs a database path/DSN.
- **Obsidian MCP** — needs the "Local REST API" plugin + its token.
- **Filesystem/Git MCP** — point them at the exact folders/repo you want exposed.
