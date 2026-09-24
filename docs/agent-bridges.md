# AI Tool Integration

> 🌐 [Leer en Español (agent-bridges.es.md)](agent-bridges.es.md)

Cortex-MD is agnostic, but **memory only works if every session loads it**. Three conditions per tool:

1. **Reads `AGENTS.md` at startup** — some do so natively; others require a bridge file.
2. **Executes `start.md` before responding** — a written instruction can be overlooked; a session startup hook reminds the agent on every session.
3. **Does not run its own memory in parallel** — two memory systems on the same project will diverge, leaving the agent uncertain about which to trust.

## Claude Code

Claude Code loads `CLAUDE.md`, not `AGENTS.md`. Use a bridge `CLAUDE.md` that **does not duplicate content**: it only imports `AGENTS.md` and adds Claude-specific instructions.

```markdown
# Context bridge for Claude Code

@AGENTS.md

## Session startup (mandatory)

Before responding to the first message, execute `.agents/workflows/start.md` silently.

## Memory

Project memory lives in `.agents/memory/`. Do not use Claude Code's auto-memory.
At the end of a session, offer to consolidate with `.agents/workflows/end.md`; the weekly check
is triggered by `start.md` (`AGENTS.md § Automatic maintenance`).
```

**Session startup hook** (`.claude/settings.json`) — injects the reminder on every new session, without relying on the model reading the instruction:

```json
{
  "autoMemoryEnabled": false,
  "hooks": {
    "SessionStart": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "cat \"${CLAUDE_PROJECT_DIR:-.}/.claude/hooks/session-start.json\""
          }
        ]
      }
    ]
  }
}
```

`.claude/hooks/session-start.json`:

```json
{
  "hookSpecificOutput": {
    "hookEventName": "SessionStart",
    "additionalContext": "STARTUP PROTOCOL: before responding to the first message, read AGENTS.md and execute .agents/workflows/start.md. Memory lives in .agents/memory/; do not use auto-memory."
  }
}
```

`autoMemoryEnabled: false` disables Claude Code's auto-memory for the project. Check your version's documentation for other memory or automatic consolidation features.

## Other tools

| Tool | How it loads `AGENTS.md` |
| ------------------- | --------------------------------------------------------------------------------------- |
| **Codex CLI** | Reads it natively from root. |
| **Gemini CLI** | In `.gemini/settings.json`: `{ "context": { "fileName": "AGENTS.md" } }`. |
| **Cursor** | Add `AGENTS.md` to project rules. |
| **Aider** | In `.aider.conf.yml`: `read: AGENTS.md`. |
| **VS Code Copilot** | Reference it from `.github/copilot-instructions.md`. |
| **Others** | Instruct the agent to read `AGENTS.md` as its first action; use a hook if the tool supports one. |

Verify behavior in your version: tools evolve quickly. The test is simple: open a new session and ask what `active-tasks.md` says without naming it.

## Multiple agents on the same project

- **Only one agent consolidates:** the one interacting with the user (the leader). Helpers (sub-agents, other delegated CLIs) report and do not write to memory.
- **Operational data is not project memory:** quotas, costs per cycle, or dispatch preferences between agents belong in the leader's own file, outside `.agents/memory/`.
- **Per-agent configuration:** each tool has its own MCP and permissions file. If you want a single source, see [`mcp-sync.md`](mcp-sync.md).
- **Mode-based orchestrators** (Zoo Code, Roo Code, and similar): configure their global rules so that every mode reads `AGENTS.md` and executes `start.md`.
