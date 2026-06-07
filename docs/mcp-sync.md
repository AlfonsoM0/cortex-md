# MCP Multi-IDE Sync (Optional Module)

> 🌐 [Leer en Español (mcp-sync.es.md)](mcp-sync.es.md)

Cortex-MD's core is **zero-dependency Markdown**. This page documents an **optional**, separable helper for projects that use [MCP](https://modelcontextprotocol.io) servers across multiple IDEs and are tired of maintaining one config file per tool by hand.

## The problem

Each agentic IDE expects its MCP config in a different file and shape:

| IDE         | File              | Shape                                   |
| ----------- | ----------------- | --------------------------------------- |
| Zoo Code    | `.zoo/mcp.json`   | `{ "mcpServers": { ... } }`             |
| VS Code     | `.vscode/mcp.json`| `{ "servers": { ..., "type": "stdio" } }` |
| Claude Code | `.mcp.json`       | `{ "mcpServers": { ... } }`             |

Maintaining these by hand causes drift: a server added in one IDE is forgotten in another.

## The pattern: canonical config + per-IDE overrides

Keep **one source of truth** and generate the rest:

- `.agents/mcp_config.json` — the canonical server list (`mcpServers`).
- `.agents/mcp_config.<ide>-overrides.json` — optional per-IDE deltas (e.g., `alwaysAllow`, `disabled`, `type`) merged on top of the base, per server.
- `.agents/sync-mcp.js` — reads the above and writes each IDE's file.

```bash
node .agents/sync-mcp.js
# ✓ .zoo/mcp.json synced
# ✓ .vscode/mcp.json synced
```

Adding a new IDE target is ~5 lines in `sync-mcp.js` (one merge loop + one `write(...)`).

## Security & .gitignore

- **Never commit real secrets** in `mcp_config.json`. Use placeholders (`<YOUR_TOKEN_HERE>`) or environment variables (`"AUTH_HEADER": "Bearer ${MY_TOKEN}"`) resolved by the IDE.
- The **generated** files often contain machine-specific paths or injected tokens. Add them to `.gitignore`:

```gitignore
.zoo/mcp.json
.vscode/mcp.json
```

Commit only the canonical `mcp_config.json` (with placeholders) and the override files.

## When to skip this

If your project uses a single IDE, or no MCP servers at all, ignore this module entirely — it is not part of the Cortex-MD memory lifecycle.
