# Cortex-MD Installation (instructions for the agent)

> 🌐 [Leer en Español (INSTALL.es.md)](INSTALL.es.md)

**If you are an AI agent and a user asked you to install Cortex-MD in their workspace, follow these steps.** The user might not know how to code or use git: explain each step in plain language, without jargon, and ask for permission before creating or modifying files.

## 1. Obtain the framework (in a temporary folder)

Never download the repository directly into the user's workspace. Use the first method that works:

1. **With git:** `git clone --depth 1 https://github.com/AlfonsoM0/cortex-md <temp-folder>`.
2. **Without git, with terminal:** download `https://github.com/AlfonsoM0/cortex-md/archive/refs/heads/main.zip` and extract it into a temporary folder.
3. **Without terminal:** read each file from step 3 from `https://raw.githubusercontent.com/AlfonsoM0/cortex-md/main/<path>` and create it in the workspace.

## 2. Choose the language

Every file exists in English (`file.md`) and in Spanish (`file.es.md`). Use **the user's language**:

- **Spanish:** copy the `.es.md` versions **renaming them without `.es`** (`start.es.md` → `start.md`). Workflows reference each other by these names.
- **English:** copy the `.md` versions.
- **Another language:** copy the English versions and offer to translate them, keeping the file names.

Never install both versions of the same file.

## 3. What to copy

| Copy | Purpose |
| --- | --- |
| `AGENTS.md` | Core instructions the agent reads at every session. |
| `.agents/workflows/` — `init`, `start`, `end`, `maintenance`, `defrag`, and `references/alignment-interview` | The memory lifecycle. |
| `.agents/memory/` — templates in `semantic/`, `maintenance-log`, and `episodic/timeline` | Empty memory, ready to populate. |
| `.agents/check-memory-contract.js` | The verifier (requires Node ≥ 18; if Node is unavailable, the agent verifies the contract manually). |

**Only if the user needs them** (explain what they are before copying):

- `.agents/workflows/deep-plan`, `audit`, and `commit` — methodology for software projects.
- `ai-helpers/` — the staged development pipeline.
- `.agents/sync-mcp.js` and `.agents/mcp_config*.json` — shared MCP configuration across tools.

**Do not copy:** `README`, `INSTALL`, `LICENSE`, `docs/` (these are framework guides, not project documentation) or `.git/`.

## 4. Do not overwrite existing files

- If `AGENTS.md` already exists, **merge**: add Cortex-MD sections into the existing file and show the user what changed.
- If `.agents/` or `docs/` already exist, only add what is missing. For any file with the same name, ask first.

## 5. Plain folder or git repository

Cortex-MD works equally well in a **plain folder**: git is not required. Without git, defrag backs up memory by copying it before rewriting (`.agents/backups/`). You may offer to enable git in one sentence ("it allows undoing any change; it is optional"), but do not require it.

## 6. Clean up and proceed with `init`

1. Delete the temporary folder.
2. Connect the user's tool so it loads memory in every session: see `docs/agent-bridges.md` in this repository (for example, Claude Code needs a bridge `CLAUDE.md`).
3. Execute `.agents/workflows/init.md`: it begins with an **alignment interview** with the user. Before starting, let them know in one sentence that you will ask a few questions about their project and approximately how long it will take.
