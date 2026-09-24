---
description: Memory Defragmentation & Optimization (Defrag)
---

# Workflow: Memory Defragmentation (Defrag)

**System Context:** Deep memory maintenance: eliminate redundancies, compress formatting, fix cross-file inconsistencies, and — most importantly — **verify that what is written remains true**. This is an advanced operation: it requires a high-reasoning model and explicit user confirmation. It is executed on demand or when the weekly check (`maintenance.md`) recommends it.

## Phase 0: Safety Gate

Review what changed since the last consolidation (with git: `git status`) and display this warning; **wait for explicit user confirmation**:

> ⚠️ **Memory optimization** — I will thoroughly review and organize the project memory (and related documents), saving a backup beforehand so it can be undone. It is best done with the most capable model you have. Shall I proceed?

🔴 **Defrag must be reversible:**

- **With git:** if there are uncommitted changes, offer to commit them BEFORE proceeding. Without a prior commit, undoing the defrag also wipes the session's work.
- **Without git (a plain folder):** copy `.agents/memory/` and the documents in `docs/` you will touch to `.agents/backups/YYYY-MM-DD/` before rewriting. Keep the 3 most recent backups and tell the user where today's backup was saved.

## Phase 1: Inventory

Read EVERYTHING before modifying anything, to detect cross-file degradation all at once:

0. Record the size of each file and the **always-loaded tier** (`node .agents/check-memory-contract.js` reports this in bytes and estimated tokens). Read in chunks that do not truncate output: truncated reading fails to complete the inventory.
1. The 6 files in `.agents/memory/semantic/`.
2. `.agents/memory/episodic/timeline.md` and the **3 most recent records**, including any `DD-sN.md` (sort by date and session number, not alphabetically).
3. The master roadmap, if one exists.

**Budget for the always-loaded tier:** whatever `start.md` reads is paid for by every session. If it grows beyond what is reasonable for the project, defrag proposes what to move to on-demand reading (to `docs/`, leaving only the rule and citation in memory).

## Phase 2: Semantic Audit and Compression

### 2.1 Eliminate

- **Redundancies** within a file or across files.
- **Temporality disguised as state** ("we recently migrated to…") → absolute present tense.
- **Overly specific implementation details:** concrete step-by-step instructions belong in a skill or in episodic memory. A convention is a rule; a function call or a menu click is an implementation detail.
- **Dead references:** files, modules, tools, or suppliers that no longer exist.
- **Arguments and examples duplicated from docs.** If the detail exists in `docs/`, the entry becomes **rule + citation**; if it does not exist, move it to the canonical doc (creating or expanding it) and only then compress. **Never delete a detail that does not live elsewhere.** The discovery story belongs in that day's episodic record, not in docs.
- **Citations to episodic memory from semantic memory or from `docs/`:** always a defect to fix. Replace them with citations to the canonical doc.
- **Sensitive data** (credentials, third-party personal data): remove from memory and name the system where they live.

### 2.2 Compress formatting

- Dense lists over prose; 2-column tables → definition lists.
- No filler words ("it is important to note that…"); imperative voice; headings up to H3.
- **Target anatomy** (same as `end.md § Phase 3`): rule in imperative mood + at most one sentence of rationale + citation to `docs/`, ≤ ~400 characters.

### 2.3 Route knowledge to Skills

Whatever belongs in a skill moves to its local `SKILL.md`, leaving at most a reference. **External Skills Guard:** if the skill appears in `skills-lock.json`, do not modify it — use the closest local skill.

### 2.4 Rewrite

Each rewritten file is complete and self-contained (not a diff), with size ≤ original and semantically equivalent.

### 2.5 Verify contract (blocking)

Run `node .agents/check-memory-contract.js`. Target: **zero findings**. Each finding is resolved by moving details to the doc and leaving rule + citation; do not suppress warnings. ⚠️ It checks **form**, not truth: a short entry containing false statements passes in green. That is covered in Phase 4.6.

## Phase 3: Episodic Optimization

1. **Timeline:** maximum 50 sessions; each entry **one line (~200 characters)** — if it grew into a paragraph, verify the details exist in the daily file and compress it; strict tags from `taxonomy.md` only; entries with 5+ tags are **flagged** in the report (poorly granular sessions), without modifying them.
2. **Episodic ↔ semantic boundary:** episodic details infiltrating semantic memory (session dates, "today we did X") return to their day or are deleted. An episodic daily record containing something already promoted to semantic memory is correct: episodic memory is an immutable log.

## Phase 4: Cross-Validation

- `architecture` ↔ `stack`: every tool is reflected in the architecture and vice versa.
- `conventions` ↔ `architecture`: no contradictions.
- `business-rules` ↔ `architecture`: domain entities aligned with system structure.
- `taxonomy` ↔ `timeline`: every tag in use exists in taxonomy.
- `active-tasks` ↔ roadmap: current task aligns with phase.

**Contradiction →** resolve using the truth hierarchy (`start.md`): first the primary source and the user's active instructions; consolidation dates only break ties between memories with equal backing. Do not turn defective behavior into policy or a scheduled date into a confirmed fact.

## Phase 4.5: Knowledge System (Skills and Workflows)

1. **Skills router:** every skill listed in `AGENTS.md` exists as a directory and vice versa, and its description matches the actual `SKILL.md`. Descriptions live **only** in the router; memory does not duplicate them.
2. **Path integrity:** paths to `.agents/` and `docs/` cited from workflows and `AGENTS.md` exist. Exclude `SKILL.md` files from this sweep: their paths are relative to the skill folder.
3. **Workflow ↔ skill:** a workflow instructs a process; a skill holds knowledge. Dense knowledge accumulated in a workflow → move to the skill, leaving a pointer.
4. **Update external skills without losing project files** (if the project uses a skills CLI):
   - First inspect what the update command deletes or overwrites. If it touches folders containing custom files (local skills, local notes within external skills), **run it in an isolated copy** and bring over only the reviewed changes for external skills and their lockfile.
   - Review the actual diff, not just the lockfile hash; separate substance from formatting. If a skill description changed, update the router.
   - Without network or permissions: report the update as pending and complete the local phases.
5. **Process improvements:** correct contradictions and dead paths in local workflows and skills. Do not alter permissions, user decisions, or dependencies based on editorial preference.

## Phase 4.6: Memory against the PRIMARY SOURCE (what no script can do)

Previous checks are internal (paths exist, valid tags, no contradictions): **they pass in green even while memory describes a system that no longer exists.**

Take **verifiable** statements from semantic memory — names, limits, values, "single point of X", suppliers, deadlines — and contrast them against the primary source (search code; inspect the system of record). Record statement, evidence, and correction. Separate what was verified in the source, what depends on an external environment or system, and what could not be verified: the latter must remain **dated**, never declared active by inference.

- 🔴 **State drift has a known direction: it is PESSIMISTIC.** Memory ages by declaring pending what was already done, causing work that already exists to be redone.
- 🔴 **Requires judgment, not a script:** well-written memory mentions what does NOT exist (debts, antipatterns), so "absent from source" and "correctly documented as absent" can only be distinguished by reading the sentence.
- **Prioritize what would be costly to believe:** a "single calculation point" that now has two, a limit whose value changed, a replaced supplier. One finding here is worth more than ten formatting fixes.
- **`active-tasks.md` is also verified:** each pending item is searched in the source. Whatever the source cannot confirm (a manual check, something that happened outside the system) is listed for the user to decide (Phase 7).

## Phase 5: Documentation

1. Audit `docs/` following the principles of Phase 2.
2. Ensure nothing contradicts the consolidated truth in memory.
3. 🔴 **Hunt for STATE drift, not just format drift:** statements made false by the passage of time, especially those that **promise a future action** ("before launch", "once we have customers", "still in testing mode", "must do this before…"). Build a search pattern using phrases specific to your project; broad patterns ("pending", "not yet") only return noise and get abandoned.
   - **Prioritize the COSTLY direction:** a doc that **underestimates risk** (claims "test environment" where real data or money is already present) does far more damage than one that is merely outdated.
   - The search proposes; **you deliver the verdict**, knowing the true state.
4. An archived doc that no longer represents anything current and whose historical value is covered → propose its removal to the user.
5. **Is the brief still valid?** If `docs/00-PROJECT-BRIEF.md` contains goals already accomplished or past due, or has gone more than six months without review, propose a **re-alignment** (`references/alignment-interview.md`).

## Phase 6: Hygiene and Environment

1. **Sensitive data:** with git, every folder with credentials, sessions, or personal data must be ignored and have no versioned files — anything versioned is a **critical** finding. Without git, the same: if the folder syncs to the cloud or is shared, memory must not contain sensitive data.
2. **Caches (optional):** if the project accumulates heavy caches, purge them with your toolchain command — verifying beforehand what it deletes (some `clean` tasks also remove dependencies).
3. If working inside a virtual disk (e.g. WSL2), remind in the report that reclaiming disk space may require compacting the image from the host system.

## Phase 7: Report

Summarize for the user:

- Rewritten files (one line each) and **always-loaded tier size before → after**.
- Removed redundancies and entries compressed to rule + citation (with target doc), and checker results.
- **Statements refuted by the primary source (Phase 4.6)** — the most important part of the report.
- State drift corrected in `docs/`, highlighting any that underestimated risk.
- Router, dead paths, and updated skills; timeline health and tag distribution; hygiene.
- **Pending items that only the user can confirm**, numbered, so they can cross off any that no longer apply.
- Suggested next defrag (e.g. after 15-20 sessions).

🔴 **Separate COSMETIC changes from substantive ones.** A count of touched files does not convey how much knowledge changed, and a number inflated by reformatting damages credibility.

## Phase 8: Independent Review

If another agent or model is available, ask it to review the defrag changes before concluding (with git, the diff before committing): verify that each citation points to the **section** covering the topic and that each correction has evidence in the primary source. The checker only confirms that cited files exist. Without a reviewer, perform a second pass yourself with that specific focus.

## Phase 9: Logging

- Timeline entry tagged **only** `[CortexMD]` (so routing skips it).
- In `.agents/memory/maintenance-log.md`: date of the last defrag, resulting always-loaded tier in tokens, and postponements reset to zero.

_Idempotent: running twice in a row should produce no further changes. If memory is already optimal, report it and skip unnecessary rewrites._
