# Cortex-MD Manifest

> Which files in this workspace belong to the Cortex-MD framework. Everything else — business files, code, the project's own documents — belongs to the project, and the framework never moves or deletes it. Read by `defrag.md § Phase 6.5` (purge) and by the agent before adapting a workflow. Not loaded every session.

## Installation

- **Date:** _YYYY-MM-DD_ · **Language:** _…_ · **Tool and model:** _…_
- **Extensions installed:** _none (or: deep-plan, audit, commit, ai-helpers, MCP sync)_
- **Last purge:** _never_

## Files

| Path | Category | In the purge |
| --- | --- | --- |
| `AGENTS.md` | runtime (adapted by `init`) | Keep. Remove the blocks that do not apply: `<!-- cortex:software-only -->` in a non-software project; `<!-- cortex:optional:<name> -->` for extensions not installed. |
| `.agents/workflows/start.md`, `end.md`, `maintenance.md`, `defrag.md` | runtime | Keep. |
| `.agents/workflows/references/alignment-interview.md` | runtime (re-alignment) | Keep. |
| `.agents/check-memory-contract.js` | runtime | Keep. |
| `.agents/manifest.md` | runtime | Keep; remove the purged rows. |
| `.agents/memory/` | project memory (belongs to the project from `init` on) | Keep; remove only leftover template examples (`<!-- cortex:example … -->`) and unfilled placeholders. |
| `.agents/workflows/init.md` | install-only | **Delete.** |
| `.cortex-tmp/` | install-only (temporary) | **Delete** if it remains. |
| Files in a language not in use (`*.es.md` in an English installation, or duplicated originals) | language variant | **Delete.** |
| `.agents/workflows/deep-plan.md`, `audit.md`, `commit.md` | extension (software) | Keep only if installed. |
| `ai-helpers/` | extension | Keep only if installed. |
| `.agents/sync-mcp.js`, `.agents/mcp_config*.json` | extension | Keep only if installed. |
| Bridge files (`CLAUDE.md`, `.hermes.md`, `.claude/settings.json`, `.claude/hooks/session-start.json`…) | bridge (created or merged by `init`) | Keep. |
| `docs/agent-environment.md`, `docs/how-to-work-with-your-agent.md` | project documentation created by `init` | Keep: they belong to the project. |
| `.agents/backups/` | defrag backups (without git) | Keep the 3 most recent. |
