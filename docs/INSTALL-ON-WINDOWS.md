# 🪟 Installing the Cart on Windows (Claude Code)

> You're on Windows with cmd/PowerShell. This page teaches the **method** for adding
> each *type* of item, plus the Windows-specific gotchas that trip people up. The
> exact per-tool commands live in the [catalog](../catalog/catalog.md) and the
> copy-paste configs live in [`starter-kit/`](../starter-kit/).

---

## 0. Prerequisites (one-time)

Install these once. Open **PowerShell** and check what you have:

```powershell
node --version      # need Node 18+ (most MCP servers run via npx)
python --version    # need Python 3.10+ (some servers run via uv/uvx)
git --version
claude --version    # Claude Code CLI
```

Missing pieces:
- **Node.js (LTS):** https://nodejs.org → installs `node` + `npx`.
- **uv** (fast Python runner used by some MCP servers, gives you `uvx`):
  ```powershell
  powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"
  ```
- **Claude Code:** `npm install -g @anthropic-ai/claude-code` (or per the official docs).

> 💡 `npx` runs an npm package without installing it permanently. `uvx` does the same
> for Python packages. Most MCP servers are launched by one of these two.

---

## 1. The mental model of "installing" in Claude Code

There are **four scopes** an MCP server can live in. Pick deliberately:

| Scope | Stored in | Who sees it | Use for |
|-------|-----------|-------------|---------|
| **local** (default) | your machine, this project only | just you | experiments |
| **project** | `.mcp.json` committed to the repo | anyone who clones | team/shared project servers |
| **user** | your global Claude config | you, every project | personal everyday servers (filesystem, github, context7) |

Rule of thumb: **everyday personal tools → `user` scope**; **project-specific tools
(a project's database) → `project` scope** so they travel with the repo.

---

## 2. Adding an MCP server (three ways)

### Way A — the CLI (easiest)
```powershell
# Pattern:  claude mcp add <name> [--scope user|project] -- <command> <args...>
claude mcp add context7 --scope user -- npx -y @upstash/context7-mcp
claude mcp add filesystem --scope user -- npx -y @modelcontextprotocol/server-filesystem C:\Users\you\projects
```
Then check it:
```powershell
claude mcp list
```

### Way B — a remote (hosted) server over HTTP
```powershell
claude mcp add --transport http context7 https://mcp.context7.com/mcp
```

### Way C — a project `.mcp.json` file (commit it with the repo)
Create `.mcp.json` in the project root (there's a ready template in `starter-kit/`):
```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "."]
    }
  }
}
```

---

## 3. ⚠️ The Windows gotchas (the stuff nobody warns you about)

1. **`npx` in `.mcp.json` can fail on Windows** with a silent "server won't start."
   The fix is to wrap it in `cmd /c`:
   ```json
   {
     "mcpServers": {
       "filesystem": {
         "command": "cmd",
         "args": ["/c", "npx", "-y", "@modelcontextprotocol/server-filesystem", "."]
       }
     }
   }
   ```
   If a server mysteriously won't connect on Windows, **try the `cmd /c` wrapper first.**

2. **Backslashes in paths.** In JSON, escape them: `"C:\\Users\\you\\projects"` — or
   just use forward slashes, which work too: `"C:/Users/you/projects"`.

3. **`uvx`/`npx` not found** → reopen the terminal after install (PATH refresh), or
   restart Claude Code. If still missing, the tool isn't on PATH.

4. **Run `claude` from inside your project folder.** MCP `project` scope and `CLAUDE.md`
   are picked up relative to where you launch.

5. **First run is slow.** `npx -y` downloads the package the first time. That's normal;
   it's cached afterward.

---

## 4. Adding a Skill (the `SKILL.md` system)

Skills are just folders. No package manager.

- **Project skill** (lives with the repo): `.claude/skills/<skill-name>/SKILL.md`
- **Global skill** (every project): `%USERPROFILE%\.claude\skills\<skill-name>\SKILL.md`

Minimum viable skill:
```
.claude/skills/poster-brief/
  SKILL.md
```
```markdown
---
name: Poster Brief
description: Use when the user wants a marketing poster or social graphic. Produces a creative brief plus a ready-to-paste image-generation prompt.
---

# Poster Brief

When invoked:
1. Ask for: product, audience, vibe, one key message, dimensions.
2. Produce a creative brief (headline, subhead, palette, layout notes).
3. Output a single copy-paste generation prompt for Canva/an image model.
```
Claude auto-loads it when a task matches the `description`. There are ready-made
examples in [`starter-kit/`](../starter-kit/).

> To install Anthropic's **official** skills (PDF/Word/Excel/PowerPoint, etc.), copy
> the skill folders from the official skills repo into `%USERPROFILE%\.claude\skills\`.
> Exact source link is in the catalog.

---

## 5. Adding a Connector (Claude.ai / Desktop)

Connectors are the click-to-enable cousins of MCP servers, used in the **apps** (not
the CLI):

1. Open **Claude Desktop** or **claude.ai** → **Settings → Connectors**.
2. Browse the directory (Google Drive, GitHub, Notion, Canva, etc.).
3. Click **Connect**, sign in via the popup (OAuth), approve scopes.
4. The connector's tools are now available in your chats.

> You likely already have several connected. In *this* session, Google Drive, Gmail,
> Calendar, GitHub, Canva, Figma, and Hugging Face are all live.

---

## 6. Adding a Hook (automatic reflexes)

Hooks live in `settings.json` (project: `.claude/settings.json`). Example — auto-format
Python after Claude edits a file:
```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          { "type": "command", "command": "ruff format ." }
        ]
      }
    ]
  }
}
```
There's a safety-oriented example (block edits to `.env`, run a secret scan) in
[`starter-kit/`](../starter-kit/).

> Prefer to set hooks via the `/update-config` skill or `/hooks` so the JSON is written
> correctly.

---

## 7. The recommended first install session (15 minutes)

Do these in order — they're all `CORE` per the Protocol:

```powershell
# 1. Up-to-date library docs (stops Claude hallucinating APIs)
claude mcp add context7 --scope user -- npx -y @upstash/context7-mcp

# 2. Let Claude read/control a browser to verify UI and take screenshots
claude mcp add playwright --scope user -- npx -y @playwright/mcp@latest

# 3. Persistent memory / knowledge graph across sessions
claude mcp add memory --scope user -- npx -y @modelcontextprotocol/server-memory

# 4. Structured step-by-step reasoning for hard design calls
claude mcp add sequential-thinking --scope user -- npx -y @modelcontextprotocol/server-sequential-thinking

# verify
claude mcp list
```
Then in any project run `/init` to generate a `CLAUDE.md`, and you've gone from
"never used an MCP" to a working, modern setup. ✅

> Exact, verified package names + scopes for **every** catalog item are kept in
> [`catalog/catalog.md`](../catalog/catalog.md) and the browsable
> [website](../index.html).
