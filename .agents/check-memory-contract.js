#!/usr/bin/env node
/**
 * check-memory-contract.js — Cortex-MD guardrail for the SHAPE of semantic memory.
 * Zero dependencies (Node >= 18). Run from anywhere inside the workspace:
 *
 *   node .agents/check-memory-contract.js           → contract + always-loaded tier
 *   node .agents/check-memory-contract.js --recent  → prints yesterday's memory
 *     (Summary + Context for Next Session of the last session, and of the last
 *     project session if the last one was only [CortexMD]) — `start.md § Phase 2`
 *   node .agents/check-memory-contract.js --timeline → regenerates `timeline.md`
 *     from the first line of the 50 most recent session records — `end.md § Phase 2`
 *   node .agents/check-memory-contract.js --history [<Tag>…] [--from YYYY[-MM[-DD]]]
 *     [--to YYYY[-MM[-DD]]] [--max N|all] → the same index lines for every
 *     session with any of those tags (no tag: all of them), between dates and
 *     capped (by default, the 50 most recent) — `start.md § Phase 3`
 *
 * The SESSION INDEX: each record opens with its index line,
 *   `# YYYY-MM-DD: [Tag1] [Tag2] One-line summary.`
 * and the timeline is generated from those lines, so the agent writes the
 * line once and long-term memory stays indexed by tag. Records from before
 * this format have no index line: their timeline lines are kept as they are.
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
 *   4. Lateral or upward citations in the MIDDLE of the pyramid (the rule
 *      files and `active-tasks.md`): a mention of another memory file or of
 *      `AGENTS.md`. The top and the middle are always read, so a citation
 *      points down (`docs/` or a skill); if the rule lives in another file,
 *      it is not repeated (`defrag.md § The model that defrag repairs`).
 *   5. Citations to a section or item of `active-tasks.md` from `docs/`: the
 *      base may name where state lives, but its sections change and the
 *      citation dies.
 *   6. A timeline out of sync with the session index: not regenerated after
 *      a record, a record without an index line once the format is in use, an
 *      index line whose date is not the record's, or a timeline line outside
 *      the index format (which `--timeline` refuses to drop).
 *
 * A skill cited as `[skill-name]` counts as a citation only if
 * `.agents/skills/skill-name/` exists.
 *
 * What it reports without failing:
 *   - Short list items WITHOUT a citation: allowed, but the contract prefers
 *     rule + citation, so the defrag should review them.
 *   - Share of list items marked 🔴 per middle file (budget ≤ 25 %; size tags
 *     such as `[🔴 Epic]` do not count).
 *   - Docs in `docs/` over 40 KB: they split into a folder with an `index.md`
 *     (`end.md § Phase 4`).
 *   - Session records without an index line (from before the format):
 *     `--history` sees only those still in the timeline, and their tags leave
 *     the index when they leave it.
 *   - Size of the ALWAYS-LOADED tier (what every session reads: `AGENTS.md`,
 *     the bridge, `start.md`, the short rules, the timeline and the recent
 *     memory that `--recent` prints), in bytes and estimated tokens, so the
 *     defrag report can measure it.
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

/** The MIDDLE of the pyramid: always read, cites only downward. */
const CENTER_FILES = [...RULE_FILES, "active-tasks.md"];

/** Size past which a doc splits into a folder (`end.md § Phase 4`). */
const MAX_DOC_BYTES = 40 * 1024;
/** Budget of 🔴 list items per middle file (`end.md § Phase 3`). */
const MAX_RED_RATIO = 0.25;
/** Sessions in the timeline, the index of fresh memory (`end.md § Phase 2`). */
const MAX_TIMELINE = 50;

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
const LIST_ITEM = /^([-*+]|\d+[.)])\s/;
/** Another memory file or `AGENTS.md`; `03-conventions.md` does not count. */
const LATERAL_REF =
  /(?<![\w/.-])(?:architecture|stack|business-rules|conventions|active-tasks|taxonomy|AGENTS)\.md\b/;
/** A section (`§`) or item (`(P2 …`) of `active-tasks.md`. */
const VOLATILE_REF = /active-tasks\.md`?\s*(?:§|\(P\d)/;
/** Backlog size tag, not a severity mark. */
const SIZE_TAG = /\[🔴 (?:Epic|[ÉE]pica)\]/g;

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

/** Lateral or upward citations in a middle file. */
function auditDirection(fileName) {
  const file = path.join(memoryDir, fileName);
  if (!fs.existsSync(file)) return [];
  return entriesOf(fs.readFileSync(file, "utf8"))
    .filter((entry) => LATERAL_REF.test(entry.text.replace(URL, "")))
    .map((entry) => ({
      where: `${fileName}:${entry.line}`,
      kind: "lateral or upward citation",
      detail: `${LATERAL_REF.exec(entry.text)[0]} — cite the doc in docs/ or the skill; if the rule lives in another file, do not repeat it`,
    }));
}

/** `docs/**\/*.md` except `archive/`, with their size. */
function docFiles(dir = "docs") {
  const full = path.join(root, dir);
  if (!fs.existsSync(full)) return [];
  return fs.readdirSync(full, { withFileTypes: true }).flatMap((d) => {
    const rel = `${dir}/${d.name}`;
    if (d.isDirectory()) return d.name === "archive" ? [] : docFiles(rel);
    return d.name.endsWith(".md")
      ? [{ rel, bytes: fs.statSync(path.join(root, rel)).size }]
      : [];
  });
}

/** Base citations to sections or items of `active-tasks.md`. */
function auditVolatileRefs(docs) {
  return docs.flatMap(({ rel }) =>
    fs
      .readFileSync(path.join(root, rel), "utf8")
      .split("\n")
      .flatMap((line, i) =>
        VOLATILE_REF.test(line)
          ? [{ where: `${rel}:${i + 1}`, kind: "cites a section of active-tasks.md", detail: "name the file, without a section or item: they are volatile" }]
          : [],
      ),
  );
}

/** List items marked 🔴 (size tags excluded) over the total, per file. */
function redRatio(fileName) {
  const file = path.join(memoryDir, fileName);
  if (!fs.existsSync(file)) return { red: 0, total: 0 };
  const items = entriesOf(fs.readFileSync(file, "utf8")).filter((e) => LIST_ITEM.test(e.text));
  const red = items.filter((e) => e.text.replace(SIZE_TAG, "").includes("🔴"));
  return { red: red.length, total: items.length };
}

/** The two sections of a session record that the next session reads. */
const RECENT_SECTION =
  /^## (Summary|Resumen|Context for Next Session|Contexto para la Pr[oó]xima Sesi[oó]n)\b/;

/** Session records (`YYYY/MM/DD.md`, `DD-sN.md`), newest first. */
function sessionRecords() {
  const episodic = path.join(root, ".agents", "memory", "episodic");
  const records = [];
  const walk = (dir, rel) => {
    if (!fs.existsSync(dir)) return;
    for (const name of fs.readdirSync(dir)) {
      const full = path.join(dir, name);
      const relName = rel ? `${rel}/${name}` : name;
      if (fs.statSync(full).isDirectory()) walk(full, relName);
      const m = relName.match(/^(\d{4})\/(\d{2})\/(\d{2})(?:-s(\d+))?\.md$/);
      if (m) {
        const date = `${m[1]}-${m[2]}-${m[3]}`;
        records.push({ rel: `.agents/memory/episodic/${relName}`, date, file: name, n: Number(m[4] || 0) });
      }
    }
  };
  walk(episodic, "");
  return records.sort((a, b) =>
    a.date === b.date ? b.n - a.n : a.date < b.date ? 1 : -1,
  );
}

const timelineFile = path.join(root, ".agents", "memory", "episodic", "timeline.md");
/** A record's index line: `# YYYY-MM-DD: [Tag1] [Tag2] One-line summary.` */
const INDEX_LINE = /^# (\d{4}-\d{2}-\d{2}): (.+)$/;
/** A timeline line: `- YYYY-MM-DD: …`, or `- YYYY-MM-DD (DD-s2.md): …`. */
const TIMELINE_LINE = /^- (\d{4}-\d{2}-\d{2})\b/;
/** `DD-sN.md` in a timeline line; it names the session only if DD is the line's day. */
const SESSION_FILE = /\b(\d{2})-s(\d+)\.md\b/g;
/** Unicode-aware, so `[Logística]` is a tag. */
const TAG = /\[([\p{L}\p{N}_-]+)\]/gu;

/** The tags right after the colon; older timeline lines may have them anywhere. */
function tagsOf(text, leadingOnly) {
  const body = text.slice(text.indexOf(": ") + 2);
  const run = body.match(/^(?:\[[\p{L}\p{N}_-]+\]\s*)+/u);
  if (run) return [...run[0].matchAll(TAG)].map(([, t]) => t);
  return leadingOnly ? [] : [...text.matchAll(TAG)].map(([, t]) => t);
}

const isMaintenanceTags = (tags) => tags.length > 0 && tags.every((t) => t === "CortexMD");

function firstLine(rel) {
  const text = fs.readFileSync(path.join(root, rel), "utf8").replace(/^﻿/, "");
  return (text.split(/\r?\n/).find((l) => l.trim() !== "") || "").trim();
}

/** `timeline.md` split into the text above the first line, its lines, and anything else. */
function readTimeline() {
  if (!fs.existsSync(timelineFile)) return { preamble: [], lines: [], stray: [] };
  const all = fs.readFileSync(timelineFile, "utf8").replace(/\r\n?/g, "\n").split("\n");
  const first = all.findIndex((l) => TIMELINE_LINE.test(l));
  const timeline = { preamble: first === -1 ? all : all.slice(0, first), lines: [], stray: [] };
  if (first === -1) return timeline;
  all.slice(first).forEach((l, i) => {
    if (TIMELINE_LINE.test(l)) timeline.lines.push(l.trimEnd());
    else if (l.trim() !== "") timeline.stray.push({ line: first + i + 1, text: l.trim() });
  });
  return timeline;
}

/**
 * The session index, newest first: one entry per record with an index line,
 * plus the timeline lines of records that have none (from before the format).
 */
function sessionIndex() {
  const records = sessionRecords();
  const timeline = readTimeline();
  const entries = [];
  const problems = [];
  const indexed = new Set();
  let oldestIndexed = -1;

  records.forEach((record, i) => {
    const m = firstLine(record.rel).match(INDEX_LINE);
    if (!m) return;
    if (m[1] !== record.date) {
      problems.push({ where: record.rel, kind: "index line with another date", detail: `${m[1]} — the record's date is ${record.date}` });
    }
    const body = m[2].trim();
    entries.push({
      date: record.date,
      n: record.n,
      indexed: true,
      tags: tagsOf(`: ${body}`, true),
      line: `- ${record.date}${record.n ? ` (${record.file})` : ""}: ${body}`,
    });
    indexed.add(`${record.date}#${record.n}`);
    oldestIndexed = i;
  });

  const listed = new Set();
  for (const line of timeline.lines) {
    const date = line.match(TIMELINE_LINE)[1];
    // A summary may name another day's record (`… still in 10-s2.md`): that is not this session.
    const session = [...line.matchAll(SESSION_FILE)].find(([, day]) => day === date.slice(8));
    const n = session ? Number(session[2]) : 0;
    if (indexed.has(`${date}#${n}`)) continue;
    listed.add(`${date}#${n}`);
    entries.push({ date, n, indexed: false, tags: tagsOf(line, false), line });
  }

  // Once the format is in use, a newer record in no index was left without its line.
  records.slice(0, Math.max(oldestIndexed, 0)).forEach((record) => {
    const key = `${record.date}#${record.n}`;
    if (!indexed.has(key) && !listed.has(key)) {
      problems.push({ where: record.rel, kind: "record without an index line", detail: "its first line must be `# YYYY-MM-DD: [Tag] One-line summary.` (end.md § Phase 1)" });
    }
  });

  // Stable sort: older lines of the same day keep their order.
  entries.sort((a, b) => (a.date === b.date ? b.n - a.n : a.date < b.date ? 1 : -1));
  return { records, timeline, entries, problems };
}

/** The timeline that `--timeline` writes. */
function renderTimeline(timeline, entries) {
  const preamble = [...timeline.preamble];
  while (preamble.length > 0 && preamble[preamble.length - 1].trim() === "") preamble.pop();
  const head = preamble.length > 0 ? preamble.join("\n") : "# Timeline (Hippocampal Index)";
  const body = entries.slice(0, MAX_TIMELINE).map((e) => e.line);
  return body.length > 0 ? `${head}\n\n${body.join("\n")}\n` : `${head}\n`;
}

function strayFindings(timeline) {
  return timeline.stray.map((s) => ({
    where: `timeline.md:${s.line}`,
    kind: "line outside the index format",
    detail: `${s.text.slice(0, 80)} — every line below the header is \`- YYYY-MM-DD: …\`; move notes above the first one`,
  }));
}

function buildTimeline() {
  const { timeline, entries, problems } = sessionIndex();
  const stray = strayFindings(timeline);
  if (stray.length > 0) {
    console.error("🔴 timeline.md was not regenerated: it has lines that are not session lines, and they would be lost.\n");
    stray.forEach((f) => console.error(`   ${f.where} — ${f.detail}\n`));
    return 1;
  }
  const content = renderTimeline(timeline, entries);
  const current = fs.existsSync(timelineFile) ? fs.readFileSync(timelineFile, "utf8") : "";
  if (content !== current) fs.writeFileSync(timelineFile, content);
  const kept = entries.slice(0, MAX_TIMELINE);
  const older = kept.filter((e) => !e.indexed).length;
  console.log(
    `✓ timeline.md ${content === current ? "already up to date" : "regenerated"}: ${kept.length} session(s)` +
      (older > 0 ? `, ${older} of them from records without an index line (kept as they were)` : ""),
  );
  problems.forEach((p) => console.error(`⚠️  ${p.where} — ${p.kind}: ${p.detail}`));
  return problems.length > 0 ? 1 : 0;
}

/** `--history` results without `--max`: a long history would flood the context. */
const HISTORY_DEFAULT_MAX = 50;
/** A full or partial date: `2026`, `2026-05` or `2026-05-14`. */
const PARTIAL_DATE = /^\d{4}(-\d{2}(-\d{2})?)?$/;
const HISTORY_USAGE =
  "Usage: node .agents/check-memory-contract.js --history [<Tag>…] [--from YYYY[-MM[-DD]]] [--to YYYY[-MM[-DD]]] [--max N|all]";

/** Tags and options of `--history`; null if one is not valid. */
function parseHistoryArgs(args) {
  const query = { tags: [], from: null, to: null, max: HISTORY_DEFAULT_MAX };
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (!arg.startsWith("--")) {
      query.tags.push(arg.replace(/^\[|\]$/g, "").toLowerCase());
      continue;
    }
    const value = args[++i] || "";
    if (arg === "--from" || arg === "--to") {
      if (!PARTIAL_DATE.test(value)) return null;
      query[arg.slice(2)] = value;
    } else if (arg === "--max") {
      if (value === "all") query.max = Infinity;
      else if (/^[1-9]\d*$/.test(value)) query.max = Number(value);
      else return null;
    } else return null;
  }
  return query;
}

/**
 * `--history`: the index lines of every session with any of the tags, between
 * dates, newest first and capped. A partial date covers the whole period
 * (`--from 2026-05 --to 2026-05` is May).
 */
function printHistory(args) {
  const query = parseHistoryArgs(args);
  if (!query) {
    console.error(HISTORY_USAGE);
    return 1;
  }
  const { tags, from, to, max } = query;
  const matches = sessionIndex()
    .entries.filter((e) => {
      if (from && e.date.slice(0, from.length) < from) return false;
      if (to && e.date.slice(0, to.length) > to) return false;
      const own = e.tags.map((t) => t.toLowerCase());
      if (isMaintenanceTags(e.tags) && !tags.includes("cortexmd")) return false;
      return tags.length === 0 || own.some((t) => tags.includes(t));
    })
    .map((e) => e.line);
  if (matches.length === 0) {
    console.log("(no session matches)");
    return 0;
  }
  console.log(matches.slice(0, max).join("\n"));
  if (matches.length > max) {
    console.log(`(showing the ${max} most recent of ${matches.length}: narrow with --from/--to or raise --max)`);
  }
  return 0;
}

/** Timeline in sync with the session index (`end.md § Phase 2`). */
function auditTimeline() {
  const { records, timeline, entries, problems } = sessionIndex();
  const findings = [...problems, ...strayFindings(timeline)];
  const expected = entries.slice(0, MAX_TIMELINE).map((e) => e.line);
  if (timeline.stray.length === 0 && expected.join("\n") !== timeline.lines.join("\n")) {
    findings.push({
      where: "timeline.md",
      kind: "out of date",
      detail: "it does not match the index lines of the records: run `node .agents/check-memory-contract.js --timeline`",
    });
  }
  const older = entries.slice(0, MAX_TIMELINE).filter((e) => !e.indexed).length;
  const unindexed = records.length - entries.filter((e) => e.indexed).length;
  return { findings, older, unindexed };
}

/** Was the session ONLY memory maintenance? Its index line says so. */
function isMaintenanceOnly(record, entries) {
  const entry = entries.find((e) => e.date === record.date && e.n === record.n);
  return entry ? isMaintenanceTags(entry.tags) : false;
}

/** Summary + Context for Next Session of a record. */
function recentSections(rel) {
  const out = [];
  let keep = false;
  for (const line of fs.readFileSync(path.join(root, rel), "utf8").split(/\r?\n/)) {
    if (line.startsWith("## ")) keep = RECENT_SECTION.test(line);
    if (keep) out.push(line);
  }
  return out.join("\n").trim();
}

/** Yesterday's memory: what `start.md § Phase 2` reads, and what is measured. */
function recentMemory() {
  const { records, entries } = sessionIndex();
  const blocks = [];
  for (const record of records) {
    blocks.push(`# ${record.rel}\n\n${recentSections(record.rel)}`);
    if (!isMaintenanceOnly(record, entries)) break;
  }
  return blocks.join("\n\n");
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
  const recent = Buffer.byteLength(recentMemory(), "utf8");
  if (recent > 0) {
    total += recent;
    rows.push(`   recent memory (--recent): ${recent} B`);
  }
  console.log(
    `ℹ️  Always-loaded tier: ${total} B (~${Math.round(total / BYTES_PER_TOKEN)} tokens)`,
  );
  rows.forEach((r) => console.log(r));
}

function main() {
  if (process.argv.includes("--recent")) {
    console.log(recentMemory());
    return 0;
  }
  if (process.argv.includes("--timeline")) return buildTimeline();
  const history = process.argv.indexOf("--history");
  if (history !== -1) return printHistory(process.argv.slice(history + 1));
  const docs = docFiles();
  const timeline = auditTimeline();
  const findings = [
    ...RULE_FILES.flatMap(auditFile),
    ...CENTER_FILES.flatMap(auditDirection),
    ...auditVolatileRefs(docs),
    ...timeline.findings,
  ];
  reportAlwaysLoaded();
  const ratios = CENTER_FILES.filter((f) => fs.existsSync(path.join(memoryDir, f))).map((f) => {
    const { red, total } = redRatio(f);
    const pct = total === 0 ? 0 : red / total;
    return `${f} ${Math.round(pct * 100)} %${pct > MAX_RED_RATIO ? " ⚠️" : ""}`;
  });
  console.log(`ℹ️  List items marked 🔴 (budget ≤ ${MAX_RED_RATIO * 100} %): ${ratios.join(" · ")}`);
  const bigDocs = docs.filter((d) => d.bytes > MAX_DOC_BYTES).sort((a, b) => b.bytes - a.bytes);
  if (bigDocs.length > 0) {
    console.log(
      `ℹ️  ${bigDocs.length} doc(s) over 40 KB (split into a folder with index.md): ` +
        bigDocs.map((d) => `${d.rel} ${Math.round(d.bytes / 1024)} KB`).join(" · "),
    );
  }
  if (uncited.length > 0) {
    console.log(
      `ℹ️  ${uncited.length} short entr${uncited.length === 1 ? "y" : "ies"} without a citation (allowed; the contract prefers rule + → docs/...): ${uncited.join(", ")}`,
    );
  }
  if (timeline.unindexed > 0) {
    console.log(
      `ℹ️  ${timeline.unindexed} session record(s) without an index line, ${timeline.older} of them in the timeline: --history sees only those, and their tags leave the index when they leave the timeline (defrag.md § Phase 3 adds the line, with the user's approval).`,
    );
  }

  if (findings.length === 0) {
    console.log(
      `✅ Memory contract: ${RULE_FILES.length} rule files OK (≤${MAX_CHARS} chars or cited, no dead or episodic citations), the middle cites only downward, and the timeline matches the session index.`,
    );
    return 0;
  }

  console.error(`\n🔴 Memory contract: ${findings.length} finding(s).\n`);
  if (findings.length > timeline.findings.length) {
    console.error(
      "   Memory states RULES; detail lives in docs/. Fix by moving the detail to the\n" +
        "   canonical doc (create it if missing) and leaving: rule + 1 reason + → docs/...\n",
    );
  }
  for (const f of findings) {
    console.error(`   ${f.where} — ${f.kind}\n     ${f.detail}\n`);
  }
  return 1;
}

process.exit(main());
