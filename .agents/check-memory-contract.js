#!/usr/bin/env node
/**
 * check-memory-contract.js — Cortex-MD guardrail for the SHAPE of semantic memory.
 * Zero dependencies (Node >= 18). Run from the repo root:
 *
 *   node .agents/check-memory-contract.js
 *
 * The contract (see `.agents/workflows/end.md § Phase 3`):
 *   a rule file entry = rule (imperative) + at most 1 sentence of reason
 *                       + a citation to the canonical doc in `docs/` (or a skill).
 *
 * What it flags (exit code 1):
 *   1. Entries longer than MAX_CHARS WITHOUT a citation — detail trapped in
 *      memory instead of living in the documentation.
 *   2. Citations to `docs/...` paths that do not exist — dead references.
 *   3. Citations to the episodic memory — history is not a valid authority
 *      for the present state (it goes stale by design).
 *
 * What it reports without failing:
 *   - Size of the ALWAYS-LOADED tier (what `start.md` reads every session),
 *     in bytes and estimated tokens, so the defrag report can measure it.
 *
 * 🔴 What it can NOT detect — it measures FORM, never TRUTH:
 *   - A short entry that lies (a renamed helper, a changed limit). That is
 *     `defrag.md § 4.6` (memory vs. primary source), done by reading.
 *     A good memory names things that do NOT exist (debts, anti-patterns),
 *     so "absent from the source" and "correctly documented as absent" are
 *     indistinguishable for a script.
 *   - A citation to the right file but the wrong section.
 *   - Redundancy between two short entries (that is the defrag's job).
 *
 * `active-tasks.md` and `taxonomy.md` are excluded on purpose: a pending task
 * describes something that does not exist yet, so it has no doc to cite.
 */
const fs = require("fs");
const path = require("path");

/** Budget per entry. Source: `end.md § Phase 3`. */
const MAX_CHARS = 400;

/** Rule files only. Adjust if your project renames or adds rule files. */
const RULE_FILES = [
  "architecture.md",
  "stack.md",
  "conventions.md",
  "business-rules.md",
];

/**
 * Always-loaded tier (read by `start.md` in every session). Missing files are
 * skipped, so optional ones (like a roadmap) can stay listed.
 */
const ALWAYS_LOADED = [
  "AGENTS.md",
  ".agents/memory/semantic/architecture.md",
  ".agents/memory/semantic/stack.md",
  ".agents/memory/semantic/active-tasks.md",
  ".agents/memory/maintenance-log.md",
  "docs/00-MASTER-ROADMAP.md",
];

/** Rough estimate: ~4 bytes per token (English); Spanish runs slightly lower. */
const BYTES_PER_TOKEN = 4;

const root = path.resolve(__dirname, "..");
const memoryDir = path.join(root, ".agents", "memory", "semantic");

const DOC_PATH = /docs\/[A-Za-z0-9._/-]+/g;
const SKILL_REF = /\[[a-z][a-z0-9-]+\]/;
const EPISODIC_REF = /episodic\/(\d{4}\/|timeline)/;

function citedDocs(line) {
  return (line.match(DOC_PATH) || []).map((p) => p.replace(/[.,;:]+$/, ""));
}

function auditFile(fileName) {
  const file = path.join(memoryDir, fileName);
  if (!fs.existsSync(file)) return [];
  const findings = [];
  let insideCode = false;

  fs.readFileSync(file, "utf8")
    .split("\n")
    .forEach((line, index) => {
      // Code blocks and tables are reference data, not entries.
      if (line.trimStart().startsWith("```")) {
        insideCode = !insideCode;
        return;
      }
      if (insideCode || !line.startsWith("- ")) return;

      const where = `${fileName}:${index + 1}`;
      const docs = citedDocs(line);

      for (const doc of docs) {
        if (!fs.existsSync(path.join(root, doc))) {
          findings.push({ where, kind: "dead citation", detail: doc });
        }
      }
      if (EPISODIC_REF.test(line)) {
        findings.push({
          where,
          kind: "cites episodic",
          detail: "cite the canonical doc in docs/, not the history",
        });
      }
      const cites = docs.length > 0 || SKILL_REF.test(line);
      if (line.length > MAX_CHARS && !cites) {
        findings.push({
          where,
          kind: `${line.length} chars, no citation`,
          detail: line.slice(0, 100).replace(/\s+/g, " ") + "…",
        });
      }
    });

  return findings;
}

function reportAlwaysLoaded() {
  let total = 0;
  const rows = [];
  for (const rel of ALWAYS_LOADED) {
    const file = path.join(root, rel);
    if (!fs.existsSync(file)) continue;
    const bytes = fs.statSync(file).size;
    total += bytes;
    rows.push(`   ${rel}: ${bytes} B`);
  }
  console.log(
    `ℹ️  Always-loaded tier: ${total} B (~${Math.round(total / BYTES_PER_TOKEN)} tokens)`,
  );
  rows.forEach((r) => console.log(r));
}

function main() {
  const findings = RULE_FILES.flatMap(auditFile);
  reportAlwaysLoaded();

  if (findings.length === 0) {
    console.log(
      `✅ Memory contract: ${RULE_FILES.length} rule files OK (≤${MAX_CHARS} chars or cited, no dead or episodic citations).`,
    );
    return 0;
  }

  console.error(`\n🔴 Memory contract: ${findings.length} finding(s).\n`);
  console.error(
    "   Memory states RULES; detail lives in docs/. Fix by moving the detail to the\n" +
      "   canonical doc (create it if missing) and leaving: rule + 1 reason + → docs/...\n",
  );
  for (const f of findings) {
    console.error(`   ${f.where} — ${f.kind}\n     ${f.detail}\n`);
  }
  return 1;
}

process.exit(main());
