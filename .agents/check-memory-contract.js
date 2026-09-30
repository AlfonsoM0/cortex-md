#!/usr/bin/env node
/**
 * check-memory-contract.js — Cortex-MD guardrail for the SHAPE of semantic memory.
 * Zero dependencies (Node >= 18). Run from anywhere inside the workspace:
 *
 *   node .agents/check-memory-contract.js
 *
 * The contract (see `.agents/workflows/end.md § Phase 3`):
 *   a rule file entry = rule (imperative) + at most 1 sentence of reason
 *                       + a citation to the canonical doc in `docs/` (or a skill).
 *
 * An ENTRY is a list item (with its wrapped continuation lines), a numbered
 * item, a table row, or a paragraph. Skipped on purpose: code blocks
 * (reference data), HTML comments (template examples), headings, blockquotes
 * (the contract note at the top of each file) and table separators.
 *
 * What it flags (exit code 1):
 *   1. Entries longer than MAX_CHARS WITHOUT a citation — detail trapped in
 *      memory instead of living in the documentation.
 *   2. Citations to `docs/...` or `.agents/skills/...` paths that do not
 *      exist — dead references. URLs are ignored (`https://x.com/docs/...`).
 *   3. Citations to the episodic memory — history is not a valid authority
 *      for the present state (it goes stale by design).
 *
 * A skill cited as `[skill-name]` counts as a citation only if
 * `.agents/skills/skill-name/` exists.
 *
 * What it reports without failing:
 *   - Short list items WITHOUT a citation: allowed, but the contract prefers
 *     rule + citation, so the defrag should review them.
 *   - Size of the ALWAYS-LOADED tier (what every session reads: `AGENTS.md`,
 *     the bridge, `start.md`, the short rules, the timeline and the last
 *     session), in bytes and estimated tokens, so the defrag report can
 *     measure it.
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
 * Always-loaded tier (read in every session). Missing files are skipped, so
 * optional ones (a bridge, a roadmap) can stay listed.
 */
const ALWAYS_LOADED = [
  "AGENTS.md",
  "CLAUDE.md",
  ".hermes.md",
  ".agents/workflows/start.md",
  ".agents/memory/semantic/architecture.md",
  ".agents/memory/semantic/stack.md",
  ".agents/memory/semantic/business-rules.md",
  ".agents/memory/semantic/active-tasks.md",
  ".agents/memory/maintenance-log.md",
  ".agents/memory/episodic/timeline.md",
  "docs/00-MASTER-ROADMAP.md",
];

/** Rough estimate: ~4 bytes per token (English); Spanish runs slightly lower. */
const BYTES_PER_TOKEN = 4;

const root = path.resolve(__dirname, "..");
const memoryDir = path.join(root, ".agents", "memory", "semantic");

const URL = /\b[a-z][a-z0-9+.-]*:\/\/\S+/gi;
// Unicode-aware: `docs/procedimientos/reposición.md` is a valid path.
const DOC_PATH = /(?<![\p{L}\p{N}_])docs\/[\p{L}\p{N}._\/-]+/gu;
const SKILL_PATH = /\.agents\/skills\/[\p{L}\p{N}._-]+/gu;
const SKILL_REF = /\[([a-z][a-z0-9-]+)\]/g;
const EPISODIC_REF = /episodic\/(\d{4}\/|timeline)/;

const trimPunctuation = (p) => p.replace(/[.,;:)]+$/, "");

/** Exists as written, or in the other Unicode normalization (macOS). */
function exists(rel) {
  return [rel, rel.normalize("NFC"), rel.normalize("NFD")].some((p) =>
    fs.existsSync(path.join(root, p)),
  );
}

/** Splits a Markdown file into entries: { line, text }. */
function entriesOf(content) {
  const entries = [];
  let current = null;
  let insideCode = false;
  let insideComment = false;
  const flush = () => {
    if (current) entries.push(current);
    current = null;
  };

  content
    .replace(/\r\n?/g, "\n")
    .split("\n")
    .forEach((raw, index) => {
      const line = index + 1;
      const text = raw.trim();

      if (insideComment) {
        if (text.includes("-->")) insideComment = false;
        return;
      }
      if (text.startsWith("```")) {
        flush();
        insideCode = !insideCode;
        return;
      }
      if (insideCode) return;
      if (text.startsWith("<!--")) {
        flush();
        if (!text.includes("-->")) insideComment = true;
        return;
      }
      if (
        text === "" ||
        text.startsWith("#") ||
        text.startsWith(">") ||
        /^(-{3,}|\*{3,}|_{3,})$/.test(text)
      ) {
        flush();
        return;
      }
      if (text.startsWith("|")) {
        flush();
        if (!/^\|[\s:|-]+\|?$/.test(text)) entries.push({ line, text });
        return;
      }
      if (/^([-*+]|\d+[.)])\s/.test(text)) {
        flush();
        current = { line, text };
        return;
      }
      // Wrapped continuation of the current item, or a paragraph.
      if (current) current.text += " " + text;
      else current = { line, text };
    });

  flush();
  return entries;
}

/** Short list items without a citation (reported, never failing). */
const uncited = [];

function auditFile(fileName) {
  const file = path.join(memoryDir, fileName);
  if (!fs.existsSync(file)) return [];
  const findings = [];

  for (const entry of entriesOf(fs.readFileSync(file, "utf8"))) {
    const where = `${fileName}:${entry.line}`;
    const text = entry.text.replace(URL, "");
    const docs = (text.match(DOC_PATH) || []).map(trimPunctuation);
    const skillPaths = (text.match(SKILL_PATH) || []).map(trimPunctuation);
    const skillRefs = [...text.matchAll(SKILL_REF)].filter(([, name]) =>
      exists(`.agents/skills/${name}`),
    );

    for (const cited of [...docs, ...skillPaths]) {
      if (!exists(cited)) {
        findings.push({ where, kind: "dead citation", detail: cited });
      }
    }
    if (EPISODIC_REF.test(text)) {
      findings.push({
        where,
        kind: "cites episodic",
        detail: "cite the canonical doc in docs/, not the history",
      });
    }
    const cites = docs.length + skillPaths.length + skillRefs.length > 0;
    if (entry.text.length > MAX_CHARS && !cites) {
      findings.push({
        where,
        kind: `${entry.text.length} chars, no citation`,
        detail: entry.text.slice(0, 100).replace(/\s+/g, " ") + "…",
      });
    } else if (!cites && /^([-*+]|\d+[.)])\s/.test(entry.text)) {
      uncited.push(where);
    }
  }

  return findings;
}

/** The most recent session record (`YYYY/MM/DD.md` or `DD-sN.md`), if any. */
function lastSession() {
  const episodic = path.join(root, ".agents", "memory", "episodic");
  const records = [];
  const walk = (dir, rel) => {
    if (!fs.existsSync(dir)) return;
    for (const name of fs.readdirSync(dir)) {
      const full = path.join(dir, name);
      const relName = rel ? `${rel}/${name}` : name;
      if (fs.statSync(full).isDirectory()) walk(full, relName);
      const m = relName.match(/^(\d{4})\/(\d{2})\/(\d{2})(?:-s(\d+))?\.md$/);
      if (m) records.push({ key: [m[1], m[2], m[3], Number(m[4] || 1)], relName });
    }
  };
  walk(episodic, "");
  const cmp = (a, b) => {
    for (let i = 0; i < 4; i++) {
      if (a.key[i] !== b.key[i]) return a.key[i] < b.key[i] ? -1 : 1;
    }
    return 0;
  };
  records.sort(cmp);
  const last = records.pop();
  return last ? `.agents/memory/episodic/${last.relName}` : null;
}

function reportAlwaysLoaded() {
  let total = 0;
  const rows = [];
  const last = lastSession();
  for (const rel of last ? [...ALWAYS_LOADED, last] : ALWAYS_LOADED) {
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
  if (uncited.length > 0) {
    console.log(
      `ℹ️  ${uncited.length} short entr${uncited.length === 1 ? "y" : "ies"} without a citation (allowed; the contract prefers rule + → docs/...): ${uncited.join(", ")}`,
    );
  }

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
