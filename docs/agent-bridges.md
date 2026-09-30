# AI Tool Integration

> 🌐 [Leer en Español (agent-bridges.es.md)](agent-bridges.es.md)

Cortex-MD is agnostic, but **memory only works if every session loads it**. Three conditions per tool:

1. **Reads `AGENTS.md` at startup** — some do so natively; others require a bridge file.
2. **Executes `start.md` before responding** — a written instruction can be overlooked; a session startup hook reminds the agent on every session.
3. **Does not run its own memory in parallel** — two memories of the same project diverge, and the agent does not know which one to trust. If the tool's memory cannot be disabled, restrict it to personal preferences (the **coexistence rule**, below).

**Base case: one person, one LLM, one tool.** `init` configures only the tool the user works with. If they change tools some day, they ask the new one to connect Cortex-MD with this guide.

**Tools change quickly.** Each section says when it was verified. If more than 90 days have passed, or what you observe does not match, look up the tool's official documentation before configuring, and record the result in the project's `docs/agent-environment.md`.

## Profiles

| Profile | Tools | Model |
| --- | --- | --- |
| **Management** (documents, spreadsheets, suppliers, customers) | Claude Cowork · ChatGPT Work | The highest-reasoning model of the service |
| **Development** (code) | Claude Code · Codex · Antigravity | The highest-reasoning model of the service |
| **Advanced / open source** | Hermes Agent + API key of any provider (e.g. DeepSeek) | Depends on the provider |

Claude Code and Claude Cowork are the same service in two forms of use; likewise Codex and ChatGPT Work. The agent recommends the form that fits the work, without requiring it.

**Changing the model** (the installation and the defrag ask for the most capable one): in CLIs, usually the `/model` command (Claude Code, Codex); in desktop apps (Claude Cowork, ChatGPT Work), the model selector next to the message box; in Antigravity, its settings (`agy models` lists the available ones); in Hermes, the provider and model configuration. Interfaces change: verify it in the tool's documentation before telling the user.

**Coexistence rule** (for tools whose memory cannot be disabled) — add it to the bridge or to the tool's instructions:

```markdown
Project memory lives in `.agents/memory/` (Cortex-MD). Use your own memory only for the
user's personal preferences; never for the state, rules, or tasks of this project.
```

## Claude — Code and Cowork

_Verified: 2026-09 · [Claude Code memory](https://code.claude.com/docs/en/memory) · [Cowork](https://support.claude.com/en/articles/13345190-get-started-with-claude-cowork)._

Both forms load `CLAUDE.md`, not `AGENTS.md`. Use a bridge `CLAUDE.md` that **does not duplicate content**: it imports `AGENTS.md` and adds the startup instruction. The second line covers the case where the import is not supported.

```markdown
# Context bridge for Claude

@AGENTS.md

If the content of `AGENTS.md` does not appear above, read `AGENTS.md` in full first.

## Session startup (mandatory)

Before responding to the first message, silently execute `.agents/workflows/start.md`.

## Memory

Project memory lives in `.agents/memory/` (Cortex-MD). Use Claude's own memory only for the
user's personal preferences, never for the state, rules, or tasks of this project.
At the end of a session, offer to consolidate with `.agents/workflows/end.md`.
```

### Claude Code

**Settings** (`.claude/settings.json`; if it exists, merge — do not replace): disable auto-memory and automatic consolidation, and inject the startup reminder with a hook.

```json
{
  "autoMemoryEnabled": false,
  "autoDreamEnabled": false,
  "hooks": {
    "SessionStart": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "cat \"${CLAUDE_PROJECT_DIR:-.}/.claude/hooks/session-start.json\"",
            "statusMessage": "Loading project memory (AGENTS.md + start.md)..."
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

### Claude Cowork

- **Context:** Cowork reads the `CLAUDE.md` of the chosen folder at the start of each task: use the same bridge. It has no hooks, so the startup instruction lives in the bridge.
- **Memory:** Cowork projects have their own automatic memory, and the documentation does not show how to disable it. The bridge's Memory paragraph already applies the **coexistence rule**: nothing to add.
- **Access:** Cowork only reads and writes the connected folder; that is why the installation downloads the framework into `.cortex-tmp/` inside the folder.
- **Scheduled tasks** have no natural end: if one should update memory, its prompt ends with _"consolidate with `.agents/workflows/end.md`"_.

## OpenAI — Codex and ChatGPT Work

_Verified: 2026-09 · [AGENTS.md in Codex](https://learn.chatgpt.com/docs/agent-configuration/agents-md) · [Memories](https://learn.chatgpt.com/docs/customization/memories.md)._

### Codex (CLI, app, IDE extension)

- **Context:** reads `AGENTS.md` natively (from the root and from the working directory). With trivial prompts it may not run `start.md`; with real tasks it follows `AGENTS.md`.
- **Memory:** local memories are **off by default**. If the user turned them on, disable them with `[features] memories = false`.
- 🔴 **Trap:** the project's `.codex/config.toml` is only read if the project is marked as trusted in the global `~/.codex/config.toml` (`[projects."<path>"] trust_level = "trusted"`); otherwise it is **silently ignored**. Keys that Codex does not recognize are also ignored without error.

### ChatGPT Work

- **Context:** works on a local folder. Whether it reads `AGENTS.md` is **not confirmed** by official documentation: verify it with the test at the end of this guide. If it does not, add to the project instructions: _"At the start of each task, read `AGENTS.md` and follow it."_
- **Memory:** uses the ChatGPT account memory (not a local one): apply the **coexistence rule**.

## Google Antigravity

_Verified: 2026-09 (measured with `agy` 1.2)._

- **Context:** reads `AGENTS.md` natively; it does not read other tools' configuration.
- **Memory:** a global `~/.gemini/GEMINI.md` accumulates "Gemini Added Memories" for every project: apply the **coexistence rule** and do not consolidate there.
- **Workflows:** Antigravity runs Markdown workflows as slash commands from `.agent/workflows/` (in some versions, `.agents/workflows/`). If it lists `/start`, `/end`, or `/defrag`, they are the Cortex-MD workflows: usable as shortcuts.

## Hermes Agent (advanced: open harness + API key)

_Verified: 2026-09 · [Context files](https://hermes-agent.nousresearch.com/docs/user-guide/features/context-files) · [DeepSeek + Hermes](https://api-docs.deepseek.com/quick_start/agent_integrations/hermes)._

For advanced users: it is configured by hand and runs with the API key of any provider. Hermes loads **a single** project context file, the first it finds: `.hermes.md` → `AGENTS.md` → `CLAUDE.md` → `.cursorrules`. Use a `.hermes.md` bridge: it takes priority and adds the startup instruction; since it replaces the loading of `AGENTS.md`, the bridge orders reading it.

```markdown
# Context bridge for Hermes Agent

As the first action of every session, read `AGENTS.md` in full and follow its instructions;
then silently execute `.agents/workflows/start.md` before responding.

Project memory lives in `.agents/memory/`. Do not use Hermes' built-in memory for this project.
```

Its built-in memory (`~/.hermes/memories/`) runs in parallel to the project's: disable it in `~/.hermes/config.yaml`. That file is global — the change affects every project opened with Hermes — so ask permission first.

```yaml
memory:
  memory_enabled: false
  user_profile_enabled: false
```

- **Provider:** choose one with prompt caching; without it, every turn pays for the full context. DeepSeek, for example, is added with an API key (`DEEPSEEK_API_KEY`) and applies context caching automatically (verify on its pricing page).
- **Messaging channels** (WhatsApp, Telegram): a conversation never "ends"; ask explicitly to close with _"let's save what we learned"_ at the end of each block of work.

## Other tools

| Tool | How it loads `AGENTS.md` |
| --- | --- |
| **Gemini CLI** | In `.gemini/settings.json`: `{ "context": { "fileName": "AGENTS.md" } }`. |
| **Cursor** | Add `AGENTS.md` to the project rules. |
| **Aider** | In `.aider.conf.yml`: `read: AGENTS.md`. |
| **VS Code Copilot** | Reference it from `.github/copilot-instructions.md`. |
| **Others** | Instruct the agent to read `AGENTS.md` as its first action; use a hook if the tool supports one. |

## Good habits: sessions and context

Memory is saved from what the conversation still remembers. If the tool compacts the context (summarizes it to keep going), details are lost before `end.md` can save them. Teach the user:

- **One task per session**, and close with _"let's save what we learned"_ before the conversation grows too long.
- If the tool warns that the context is full or is about to compact it, **close and start a new session**.
- In channels without a natural end (messaging, scheduled tasks), **ask explicitly** for the close.

## Verification test

Open a new session and ask, without naming the file: _"What is the first pending task?"_ If the agent answers with the content of `active-tasks.md`, memory is loaded.

## Several agents or several people

The base case is one LLM and one tool. Several providers can be configured and **used one at a time** with the same memory. Working in parallel requires orchestration — a leader agent that delegates and is the only one that consolidates — and several people sharing one memory causes conflicts in episodic memory. Both are complex and outside Cortex-MD's scope.
