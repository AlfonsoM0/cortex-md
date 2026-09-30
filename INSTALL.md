# Cortex-MD Installation (instructions for the agent)

> 🌐 [Leer en Español (INSTALL.es.md)](INSTALL.es.md)

**If you are an AI agent and a user asked you to install Cortex-MD in their workspace, follow these steps.** Assume the worst case: the user may not know what an LLM, a harness, or git is, nor how to describe what they need. Explain each step in plain language, without jargon, and ask for permission before creating or modifying files.

The workspace is the folder the user chose for you — usually the folder of their business or project. Cortex-MD lives next to their files (`AGENTS.md`, `.agents/`, `docs/`) and **never moves, renames, or edits the user's own files**.

## 0. Before starting: identify yourself and the model

The installation defines the quality of all future memory, so it should be done with the most capable model of your service.

1. **Identify yourself:** the tool you are running in (Claude Code, Claude Cowork, Codex, ChatGPT Work, Antigravity, Hermes Agent…), its provider, and the active model. Your system prompt usually says so; if not, check the tool or ask the user.
2. **Research today's highest-reasoning models of YOUR provider** in its official documentation. Models change every few months: do not rely on a fixed list. Illustrative examples only: Claude → Opus; ChatGPT/Codex → its top reasoning models; Antigravity → the highest-reasoning Gemini; Hermes → depends on the provider of the API key. Without web access, use what you know about yourself and say so ("based on my knowledge, which may be outdated").
3. If the active model is not one of them, show this notice and explain **how to switch it in this tool**:

   > ⚠️ The installation defines the quality of all your future memory, so it is best done with the most capable model of your service: **<researched model>**. In <tool>, you can change it at <where>. Shall we switch, or continue with the current one?

4. **Never recommend switching providers** to install. If the user cannot or does not want to switch, continue: `init` records the model used, and the post-installation defrag (run with the advanced model) compensates.

## 1. Obtain the framework (into `.cortex-tmp/`)

Some tools (Claude Cowork, ChatGPT Work) can only access the chosen folder and may not have git. Download into a temporary folder **inside** the workspace, `.cortex-tmp/framework/`; `init` deletes it at the end. Use the first method that works:

1. **With git:** `git clone --depth 1 https://github.com/AlfonsoM0/cortex-md .cortex-tmp/framework`.
2. **Without git, with terminal:** download `https://github.com/AlfonsoM0/cortex-md/archive/refs/heads/main.zip` and extract it into `.cortex-tmp/framework`.
3. **Without terminal:** read each file from step 3 at `https://raw.githubusercontent.com/AlfonsoM0/cortex-md/main/<path>` with your web tool and create it directly in the workspace. When `init` needs `docs/agent-bridges.md`, read it from that same URL.

If the workspace uses git, do not commit `.cortex-tmp/`.

## 2. Choose the language

Every file exists in English (`file.md`) and in Spanish (`file.es.md`). Use **the user's language**:

- **Spanish:** copy the `.es.md` versions **renaming them without `.es`** (`start.es.md` → `start.md`). Workflows reference each other by these names.
- **English:** copy the `.md` versions.
- **Another language:** copy the English versions and offer to translate them, keeping the file names.

Never install both versions of the same file.

## 3. What to copy: only the core

| Copy | Purpose |
| --- | --- |
| `AGENTS.md` | Core instructions the agent reads at every session. |
| `.agents/workflows/` — `init`, `start`, `end`, `maintenance`, `defrag`, and `references/alignment-interview` | The memory lifecycle. |
| `.agents/memory/` — templates in `semantic/`, `maintenance-log`, and `episodic/timeline` | Empty memory, ready to populate. |
| `.agents/manifest.md` | Which files belong to the framework and what the post-installation purge does with each one. |
| `.agents/check-memory-contract.js` | The verifier (requires Node ≥ 18; without Node, the agent checks the contract manually). |

**Extensions are not copied now.** `init` offers them only when they make sense:

- **Software project:** `deep-plan`, `audit`, and `commit` (development methodology), explained in one line each.
- **Only if the user asks:** `ai-helpers/` (staged development pipeline) and the MCP sync module (`sync-mcp.js`, `mcp_config*.json`).

**Do not copy:** `README`, `INSTALL`, `LICENSE`, this repository's `docs/` (framework guides, not project documentation), or `.git/`.

## 4. Do not overwrite anything

- **`AGENTS.md` already exists:** merge — add the Cortex-MD sections to the existing file and show the user what changed.
- **Bridge or tool configuration files already exist** (`CLAUDE.md`, `.hermes.md`, `.claude/settings.json`, `.codex/config.toml`…): read them first and merge. In JSON, merge keys and append to arrays such as `hooks.SessionStart`; never replace the file. Show the user the diff.
- **The user's global configuration** (`~/.codex/`, `~/.hermes/`, `~/.gemini/`…) affects every project: read it before writing, and ask permission for each change.
- **`.agents/` or `docs/` already exist:** only add what is missing. For any file with the same name, ask first.

## 5. Plain folder or git repository

Cortex-MD works equally well in a **plain folder**: git is not required. Without git, defrag backs up memory by copying it before rewriting (`.agents/backups/`). You may offer to enable git in one sentence ("it allows undoing any change; it is optional"), but do not require it.

## 6. Proceed with `init`

Tell the user in one sentence that you will now ask some questions about their project, and roughly how long the essential part takes (20-40 minutes). Then execute `.agents/workflows/init.md`.

**Do not delete `.cortex-tmp/` yet:** `init` uses the bridge guide it contains and keeps its interview notes there; it deletes the folder when the installation is complete.
