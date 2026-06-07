#!/usr/bin/env node
/**
 * sync-mcp.js — Optional Cortex-MD helper (separable from the zero-dependency core).
 *
 * Generates per-IDE MCP (Model Context Protocol) configuration files from a single
 * canonical source, so you don't maintain N hand-written copies that drift apart.
 *
 *   Canonical config:   .agents/mcp_config.json
 *                         -> { "mcpServers": { <name>: { command, args, env } } }
 *   Per-IDE overrides:  .agents/mcp_config.<ide>-overrides.json   (optional)
 *                         -> { <serverName>: { ...fields to merge/override } }
 *
 * Outputs (written at the repo root):
 *   .zoo/mcp.json      (Zoo Code)  -> { "mcpServers": { ...base + overrides } }
 *   .vscode/mcp.json   (VS Code)   -> { "servers":    { ...base + "type": "stdio" } }
 *
 * Security: keep real secrets OUT of mcp_config.json — use placeholders or env vars.
 * Add the generated files (.zoo/mcp.json, .vscode/mcp.json) to .gitignore if they
 * carry machine-specific paths or tokens. See docs/mcp-sync.md.
 *
 * Run:  node .agents/sync-mcp.js
 */
const fs = require("fs");
const path = require("path");

const agentsDir = __dirname;
const root = path.resolve(agentsDir, "..");

function readJson(file) {
  return JSON.parse(fs.readFileSync(path.join(agentsDir, file), "utf8"));
}

function readOverrides(file) {
  const p = path.join(agentsDir, file);
  return fs.existsSync(p) ? JSON.parse(fs.readFileSync(p, "utf8")) : {};
}

function write(outPath, data) {
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, JSON.stringify(data, null, 2) + "\n");
  console.log(`✓ ${path.relative(root, outPath)} synced`);
}

const base = readJson("mcp_config.json");
const servers = base.mcpServers ?? {};

// --- Zoo Code (.zoo/mcp.json): { mcpServers } + per-server overrides ---
const zooOverrides = readOverrides("mcp_config.zoo-overrides.json");
const zooServers = {};
for (const [name, config] of Object.entries(servers)) {
  zooServers[name] = { ...config, ...(zooOverrides[name] ?? {}) };
}
write(path.join(root, ".zoo", "mcp.json"), { mcpServers: zooServers });

// --- VS Code (.vscode/mcp.json): { servers } with required "type": "stdio" ---
const vscodeOverrides = readOverrides("mcp_config.vscode-overrides.json");
const vscodeServers = {};
for (const [name, config] of Object.entries(servers)) {
  vscodeServers[name] = { type: "stdio", ...config, ...(vscodeOverrides[name] ?? {}) };
}
write(path.join(root, ".vscode", "mcp.json"), { servers: vscodeServers });
