---
description: Memory Defragmentation & Optimization (Defrag)
---

# Workflow: Memory Defragmentation & Optimization (Defrag)

**System Context:** You are an AI agent and the user has requested a deep maintenance operation on the Cortex-MD memory system. Over multiple sessions, memory files accumulate redundancies, format inefficiencies, and cross-file inconsistencies. This workflow restructures and compresses the memory for optimal LLM consumption.

**Critical:** This is an advanced operation that requires strong reasoning capabilities. Do NOT proceed without explicit user confirmation.

## Phase 0: Safety Gate

Before starting, you must ensure conditions are right for this operation.

1. **Display this warning to the user:**

> ⚠️ **Memory Defragmentation**
>
> This workflow performs a deep audit and restructuring of all Cortex-MD memory files. It requires an LLM with strong reasoning and analytical capabilities to execute correctly.
>
> **Before proceeding, confirm:**
>
> - You are using your highest-capability reasoning model.
> - You have no unsaved work (this modifies `.agents/memory/` files).
>
> Reply **"Proceed"** to continue.

2. **Wait for the user's explicit confirmation.** Do not proceed until they confirm.

## Phase 1: Full Memory Inventory

Read every file in the memory system to build a complete picture before making any changes.

1. **Read ALL semantic memory files:**
   - `.agents/memory/semantic/architecture.md`
   - `.agents/memory/semantic/stack.md`
   - `.agents/memory/semantic/conventions.md`
   - `.agents/memory/semantic/business-rules.md`
   - `.agents/memory/semantic/active-tasks.md`
   - `.agents/memory/semantic/taxonomy.md`
2. **Read the episodic index:** `.agents/memory/episodic/timeline.md`
3. **Read the 3 most recent episodic records** (daily files) referenced in the timeline.
4. **Read the roadmap (if any):** e.g., `docs/00-MASTER-ROADMAP.md` — to validate alignment between active tasks and the real project state.

_Objective: Load the entire memory state to detect patterns of degradation across all files simultaneously._

## Phase 2: Semantic Audit & Compression

For **each** semantic memory file, evaluate and rewrite applying these optimization principles:

### 2.1 Detect and Remove

- **Redundant information:** Rules, facts, or patterns that appear in more than one file or more than once within the same file.
- **Temporal information disguised as state:** Sentences like "We recently migrated to..." or "As of the last session..." — semantic memory has no time dimension. Rewrite as absolute present tense.
- **Over-specific implementation details:** Concrete code patterns that belong in a skill file or episodic record, not in global state. A convention is a rule; a specific function call is an implementation.
- **Dead references:** Mentions of files, modules, or technologies that no longer exist in the project.

### 2.2 Compress Format

Rewrite each file applying these formatting rules for optimal LLM token consumption:

- **Prefer dense lists over prose.** Replace narrative paragraphs with structured `key: value` lists or compact bullet points.
- **Minimize table padding.** If a table has only 2 columns, consider converting to a definition list (`- **Term:** Definition`).
- **Eliminate filler words.** Remove phrases like "It is important to note that", "As mentioned above", "Please ensure that". Be direct.
- **Use imperative voice.** "Use X" instead of "You should consider using X when appropriate".
- **Keep headers shallow.** Avoid nesting beyond H3 (`###`). Flatten deep hierarchies.

### 2.3 Knowledge Routing

If during the audit you detect information that belongs in a skill:

1. Identify which skill in `.agents/skills/` should contain it.
2. **External Skills Guard:** check `skills-lock.json`. If the destination skill is registered there, **do not modify it** — redirect the knowledge to the closest local skill instead.
3. Move it to the corresponding `SKILL.md` (only if local). In the semantic file, leave a compact reference if needed.

### 2.4 Rewrite

After analysis, **rewrite each semantic file** applying the above principles. The result must be:

- A complete, self-contained document (not a diff or patch).
- Shorter than or equal to the original in raw character count.
- Semantically equivalent — no information loss, only format optimization and deduplication.

## Phase 3: Episodic Optimization

1. **Timeline audit:**
   - Verify the 50-session limit. Remove oldest entries if exceeded.
   - Flag entries with 5+ tags — these indicate poor session granularity. Do not modify them, but note them in the final report.
   - Ensure entries use strict tags from `taxonomy.md` only.
2. **Episodic-semantic boundary check:**
   - If any episodic record (daily file) contains information that was also promoted to semantic memory, that is correct and expected — episodic records are immutable logs.
   - If semantic memory contains information that reads like an episodic entry (specific dates, session references, "today we did X"), extract it back to its proper episodic file or remove it.

## Phase 4: Cross-File Validation

Verify consistency across the semantic memory files:

1. **`architecture.md` ↔ `stack.md`:** Every technology in `stack.md` should be architecturally reflected. Every architectural module should use technologies listed in `stack.md`.
2. **`conventions.md` ↔ `architecture.md`:** Coding conventions should not contradict architectural decisions.
3. **`business-rules.md` ↔ `architecture.md`:** Business domain entities should align with the module structure.
4. **`taxonomy.md` ↔ `timeline.md`:** All tags in use in the timeline must exist in the taxonomy.
5. **`active-tasks.md` ↔ roadmap (if any):** The current task should be coherent with the roadmap phase.

If contradictions are found, resolve them by treating the **most recently consolidated semantic file** as the source of truth, then update the outdated file.

## Phase 5: Feature Documentation Optimization (Optional)

If the project keeps detailed feature documentation (e.g., `docs/features/*`):

1. **Inventory the feature docs.**
2. **Audit and compress** them applying the same principles as Phase 2 (remove redundancy, optimize tokens).
3. **Cross-consistency:** ensure the architecture, flows, and decisions described there do not contradict the "absolute truth" consolidated in semantic memory (`architecture.md`, `business-rules.md`).

## Phase 6: Environment Cleanup (Optional)

Since this workflow runs periodically, it is a good moment to purge heavy build/tooling caches that accumulate over time.

1. **Purge build caches:** Run your toolchain's cache-clean command (e.g., the build tool's `clean` task) to free accumulated space. Adapt the command to your stack.
2. **Storage reminder:** If you develop inside a virtualized filesystem (e.g., WSL2), add a reminder to the final report that reclaiming disk space may require compacting the virtual disk image at the OS level.

> Skip this phase entirely if your project has no heavy build caches.

## Phase 7: Defrag Report

Present a summary to the user covering:

1. **Files modified:** List each semantic file that was rewritten, with a one-line description of what changed.
2. **Redundancies removed:** Concrete examples of duplicated or misplaced information that was cleaned up.
3. **Knowledge routed:** If information was moved to skills, indicate what was moved and where.
4. **Cross-file issues found:** Any contradictions or drift that was corrected.
5. **Episodic observations:** Timeline health, tag distribution issues.
6. **Environment & System:** Confirm any cache cleanup performed and leave the storage-compaction reminder if applicable.
7. **Recommendation:** Suggest when the next defrag should be run (e.g., "after 15-20 more sessions" or "when semantic files exceed N lines").

_Internal note for the LLM: This workflow is idempotent — running it twice in succession should produce no further changes. If the memory is already optimized, report that to the user and skip unnecessary rewrites._
