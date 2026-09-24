---
description: Session end (Consolidation)
---

# Workflow: Session End (Cognitive Consolidation)

**System Context:** The session has ended — because the user requested it, or because you offered upon signals of closing and they accepted (`AGENTS.md § Automatic maintenance`). Consolidate memory so that your future instance inherits accurate knowledge: what to retain, what to index, and what changed in the global state. Execute the phases in order.

> **Who consolidates:** in a multi-agent team, **only the agent speaking with the user** (the leader) consolidates. Helpers report to them; if everyone writes to memory, they overwrite and contradict each other. Agent operational details (quotas, costs, dispatch preferences) are not project memory: they belong in the leader's own file.

## Phase 0: Prior Hygiene

- Review what changed (with git: `git status`; in a plain folder: files modified during the session) and run the validation corresponding to the scope. Do not repeat checks that already passed if nothing relevant changed.
- If you are going to modify semantic memory, run `node .agents/check-memory-contract.js` at the end.

## Phase 1: Episodic Memory

1. Create or update `.agents/memory/episodic/YYYY/MM/DD.md`. For another distinct session on the same day, use `DD-s2.md`, `DD-s3.md`… without overwriting the previous one (the numeric suffix sorts naturally and the timeline names it).
2. Use this structure and omit sections that do not apply:

```markdown
# Session: YYYY-MM-DD

## Summary

2-3 lines: objective and outcome.

## Changes

| File / record | Action | Description |
| ------------------ | ------------------------------- | --------------------- |
| `path/to/file` | Created / Modified / Deleted | What was done and why |

## Version Control

- **Branch:** `branch` · **Commits:** `abc1234`, … (or "no commits")

## Decisions

- **Decision:** what was decided.
  - **Context:** why (alternatives, constraints, who decided).

## Errors and Resolutions

- **Error:** description.
  - **Root cause:** … · **Solution:** … · **Prevention:** …

## Context for Next Session

Where the work left off and what follows.
```

> **Also record your own reasoning errors**, not just system errors: a hypothesis that the user corrected, data assumed to be true without verification, a "blocker" that did not exist. These are the most expensive to repeat and no test catches them. Note **what caused it** (outdated documentation, a record from another environment, assuming an error where there was a design decision) and **how to avoid it**.

In a project without version control, "Version Control" is replaced by a reference to the affected record (e.g. order number, spreadsheet row, ticket ID).

## Phase 2: Hippocampal Index (timeline)

1. Read `.agents/memory/semantic/taxonomy.md`. If no tag covers the domain, **recommend one to the user and wait for their approval**.
2. Add an entry to the **top** of `.agents/memory/episodic/timeline.md`:
   - Format: `- YYYY-MM-DD: [Tag1] [Tag2] One-line summary.`
   - **~200 characters in total**, dense and self-contained, to determine relevance without opening the daily file. Name the file (`DD-s2.md`) if there were multiple sessions.
   - Details live in episodic memory; do not duplicate them in the index.
3. Limit: **50 sessions**. If exceeded, remove the oldest ones from the bottom.

## Phase 3: Semantic Consolidation (Neuroplasticity)

Did today's work change the current truth (new tool, structure, pattern, convention, domain rule)? **Yes →** overwrite obsolete information in the affected file. Semantic memory has no sense of time: it is a snapshot of the present, not a chronicle.

🔴 **Three file types, three contracts. Identify which one you are touching BEFORE writing:**

| File | Answers | Contract |
| ----------------------------------------------------------- | --------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `architecture` · `stack` · `conventions` · `business-rules` | what is the rule? | **Rule + citation to `docs/`**, ≤ ~400 characters. Describes something that already exists, so there is always a doc to cite. |
| `active-tasks` | what is left to do? | Task in 1-2 sentences, without mandatory citation. **Completed items are deleted** (Phase 6). |
| `taxonomy` | which tags are valid? | Closed list; a new tag requires approval. |

**Anatomy of a rule entry:** rule in imperative mood + at most **one** sentence explaining rationale + citation to canonical doc. Example: _"Never approve a payment without a signed delivery note: shortages are claimed before paying. → `docs/procedimientos/pagos.md §2`"_.

- **What DOES NOT belong** (goes to the doc cited by the entry): metrics, examples and counterexamples; arguments longer than one sentence. The **discovery story** ("detected when…", "replaces previous rule") does not even go into the doc: it is session narrative and lives only in episodic memory.
- **Quick test:** if leaving only the rule and citation keeps the entry actionable, the rest was superfluous.
- **No doc to cite → create one or extend an existing one in `docs/`** and only then write the entry. Memory is never the only place where an important detail lives.
- **Cite `docs/` (behavior, procedures) or a local skill (technical knowledge); never episodic memory.** Episodic memory ages by design: citing it injects stale data into the snapshot of the present.
- **Never in memory:** credentials, tokens, or third-party personal data (customers, employees, suppliers). Memory is versioned and shared: name the system where they live, not the data itself.
- **Verified by `node .agents/check-memory-contract.js`:** long entries without citations, citations to non-existent docs, and citations to episodic memory. It checks the **form**, not whether what is written is true.

## Phase 4: Documentation and Roadmap

1. **`docs/` is the default destination for current behavior.** If what changed has its own doc (a feature, a procedure), update it to reflect what exists now.
2. **The roadmap only changes if SCOPE changed** (something enters, leaves, or is reclassified). 🔴 **Execution progress does not belong in the roadmap:** it is read in every session (`start.md`), so anything added to it is paid for by all future sessions. Completing a task or closing a verification goes to `docs/` and `active-tasks.md`.
3. **Consistency sweep** (mandatory if a value, limit, or name changed): search for the OLD value across `docs/` and semantic memory, and correct every occurrence. This also applies to what is **removed**: a deleted piece often survives in multiple documents that no one looked at again.

## Phase 5: Continuous Learning (Skills)

A new pattern, a solution to a recurring problem, or a process improvement goes to the domain's `SKILL.md`, **not to `AGENTS.md`** (except for a new universal rule or registering a new skill). `AGENTS.md` is always loaded: everything added to it is paid for by every session.

**External Skills Guard (immutable):** never modify skills registered in `skills-lock.json`; they are managed by an external CLI and any local edit will be lost.

- Project-**specific knowledge** in an external skill's domain → write it in the closest **local** skill.
- **Generic technology knowledge** → do not persist it: it will arrive with the official update.

## Phase 6: Working Memory Flush (`active-tasks.md`)

1. 🔴 **Delete what is COMPLETED; do not mark it as done.** This file answers "what is left?": a closed item has already migrated its knowledge to `docs/` and rules, and leaving it turns it into clutter that every session pays to read.
   - **A ✅ in this file is a red flag**, unless it qualifies something still pending (e.g. "the form ✅ exists; publishing pending").
   - **Before deleting, verify that its details live in `docs/`**; if not, move it first (Phase 4).
2. **External states with date and verification environment.** Anything living outside the primary source (third-party configuration, a promised delivery, a scheduled payment) ages silently: record when and where it was verified. A scheduled date does not prove something occurred; upon expiring, mark it "verify" until evidence is obtained.
3. **`[Watch]` items:** something not being worked on today but requiring monitoring, with its **trigger** to resume (a date, a threshold, an event). Without a trigger, it is noise.
4. **Classify the backlog** by Priority (Eisenhower) + Effort (T-Shirt):
   - `🚨 P1` Critical (important and urgent) · `🧭 P2` Strategic (important, not urgent) · `🧯 P3` Noise (urgent, not important) · `🗄️ P4` Archive (icebox).
   - `[🟢 Snack]` < 1 h · `[🟡 Session]` 2-4 h · `[🔴 Epic]` > 1 day (split before starting) · `[Watch]` no intrinsic effort, requires trigger.
5. Write the logical **next step**, prioritizing P1.

**Style:** each item in 1-2 sentences; if it requires more, cite the doc. Exhaustive details live in the day's episodic record.

> **Single source of pending tasks and debt:** everything pending is recorded here, classified — never scattered in loose notes.

## Phase 7: Wrap-up with the user

Report in a few lines that memory has been consolidated. If there are pending items whose completion **only a human can confirm** (a manual verification, a decision, something that happened outside the system), list them numbered and ask them to check off any that no longer apply: the primary source does not expose them, and without asking they survive indefinitely.