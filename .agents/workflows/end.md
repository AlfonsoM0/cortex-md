# Workflow: Session End (Cognitive Consolidation)

**System Context:** You are an AI agent and the current work session has concluded. It is imperative to execute a memory consolidation process analogous to the human sleep cycle to prevent context degradation in future interventions. You must evaluate what information to retain, what to index, and how to modify the global project state.

Execute the following steps in strict sequential order.

## Phase 1: Episodic Memory Creation

Generate the detailed record of this session's experiences and reasoning to preserve the "what" and the "why".

1. Determine the current date in `YYYY`, `MM`, `DD` format.
2. Create or update the file: `.agents/memory/episodic/YYYY/MM/DD.md`
   - **Multiple sessions per day:** If more than one distinct session happens on the same day, append a descriptive slug to keep them separate and searchable: `.agents/memory/episodic/YYYY/MM/DD-<slug>.md` (e.g., `2026/06/04-inventory-redesign.md`). Use a plain `DD.md` for the routine single session.
3. Use the following template as the mandatory structure:

```markdown
# Session: YYYY-MM-DD

## Summary

Brief description (2-3 lines) of the session's objective and the outcome achieved.

## Modified Files

| File | Action | Change Description |
|---|---|---|
| `path/to/file.ts` | Created / Modified / Deleted | What was done and why |

## Version Control

- **Branch:** `branch-name`
- **Commits:** `abc1234`, `def5678` (or indicate if no commits were made)

## Technical Decisions

- **Decision:** Description of the architectural or design decision made.
  - **Context:** Why this decision was made (alternatives evaluated, constraints).

## Errors Found and Resolutions

- **Error:** Description of the bug or problem.
  - **Root cause:** What was causing it.
  - **Solution:** How it was resolved.
  - **Prevention:** What to avoid in the future to prevent recurrence.

## Context for the Next Session

Clear description of where the work left off and what should be done next to resume without friction.
```

4. Fill in all applicable sections. If a section does not apply (e.g., no errors were found), omit it from the generated file.

## Phase 2: Hippocampal Index Update

Create the "synaptic tag" so your future instance can quickly find the episodic memory generated in Phase 1.

1. **Read the file:** `.agents/memory/semantic/taxonomy.md`
   - **Objective:** Obtain the strict list of allowed tags. If no tag covers the domain worked on, **recommend a new one to the user and wait for their approval** before using it.
2. **Read the file:** `.agents/memory/episodic/timeline.md`
3. Add a new entry at the top of the file under the corresponding month.
   - **Strict format:** `- YYYY-MM-DD: [Tag1] [Tag2] One-line summary of what was accomplished.`
   - **Make it self-contained:** the summary should be a dense executive line — enough scope (key files/concepts touched) that hippocampal routing can decide relevance without opening the daily file. Append an optional `Pending: ...` marker if work is unfinished.
4. **Growth Limit (Purge):** Verify that the `timeline.md` file does not contain more than the **last 50 registered sessions**. If it exceeds this limit, silently remove the oldest sessions from the end of the file to maintain token economy.

## Phase 3: Semantic Consolidation (Neuroplasticity)

This is the critical phase of the process. You must evaluate whether today's work altered the "absolute truth" of the system (the global state).

1. Cognitively evaluate: Did today's actions implement a new technology, change a global design pattern, modify the structure, or alter conventions or business rules?
2. If the answer is YES:
   - Identify which semantic file was affected (`architecture.md`, `conventions.md`, `business-rules.md`, `stack.md`).
   - Open the corresponding file and overwrite the obsolete information. Modify the document so it reflects the current architectural and logical state.
   - **Strict warning:** Do not add text as if it were a chronological history. Semantic memory has no time — it must be an exact snapshot of the present.

## Phase 4: Prefrontal Cortex Flush (Working Memory)

Prepare the environment so the next session starts without cognitive friction.

1. **Open the file:** `.agents/memory/semantic/active-tasks.md`
2. Clear the tasks that were successfully completed during this session.
3. **Classify the backlog:** Ensure every remaining task is organized under the following matrix (Priority + Effort):
   - **Primary hierarchy (Priority — Eisenhower):**
     - `🚨 P1: Critical (Important & Urgent)` — blockers, vulnerabilities, billing failures.
     - `🧭 P2: Strategic (Important, NOT Urgent)` — preventive refactors, core/roadmap features.
     - `🧯 P3: Noise (Urgent, NOT Important)` — minor cosmetic changes, low-criticality issues.
     - `🗄️ P4: Archive (Neither Important nor Urgent)` — idea icebox, minor debt.
   - **Secondary label (Effort — T-shirt sizing):** prefix each task with its effort:
     - `[🟢 Snack]` — (< 1h) quick task.
     - `[🟡 Session]` — (2-4h) a focused afternoon of deep work.
     - `[🔴 Epic]` — (> 1 day) large task that MUST be split into sub-tasks before starting.
4. **Define the next step:** Write clearly and concisely what the first logical action should be for the next iteration, always prioritizing **P1: Critical** tasks.

> **Single source of technical debt:** all technical debt detected during the session is recorded here, in the classified backlog of `active-tasks.md`. Never let debt scatter into unclassified issues or loose notes — this keeps clear visibility of what is urgent, important, and what can wait.

## Phase 5: Knowledge Routing (Continuous Learning)

If during the session you discovered a new pattern, a recurring bug solution, or an architectural improvement:

1. **Do NOT add it directly to `AGENTS.md`.** The root system prompt should remain lean and stable.
2. **Identify the correct destination:** Determine whether the learning belongs to:
   - A **semantic memory file** (`conventions.md`, `architecture.md`, `stack.md`, `business-rules.md`) — if it alters a global truth.
   - A **skill file** (`.agents/skills/[name]/SKILL.md`) — if it is a reusable technique or domain-specific pattern.
   - A **documentation file** (`docs/`) — if it is a product-level explanation or specification.
3. **Route the knowledge** to the appropriate file. Only add to `AGENTS.md` if it constitutes a new universal rule or requires the creation of a new skill entry.

### External Skills Guard (Immutable)

**NEVER modify** files inside skills registered in `skills-lock.json`. Those folders are managed by an external skill CLI (e.g., `npx skills update`) and any local edit will be lost on the next update.

- **How to identify them:** read `skills-lock.json` at the project root. Each key under `"skills"` maps to a read-only folder in `.agents/skills/`.
- **If the discovered knowledge belongs to an external skill's domain:**
  1. **Project-specific** (e.g., "do not use provider X's auth because it collides with our setup"): write it into the closest **local** skill for that domain.
  2. **Generic to the technology** (e.g., a well-known upstream bug): do not persist it — it will already be covered by the next official skill update.

*Rationale: This prevents "system prompt bloat" — a gradual inflation of the root file that degrades token economy and dilutes the agent's core directives — while protecting externally-managed code from silent loss.*

## Phase 6: Planning & Feature-Docs Sync (Optional)

If the project maintains a master roadmap, task board, or planning document (e.g., `docs/ROADMAP.md`, `docs/00-MASTER-ROADMAP.md`):

1. Review the planning document.
2. If today's session completed a milestone, mark it as done.
3. If the session revealed new steps, blockers, or architectural pivots, update the document accordingly.
4. **The planning document, like semantic memory, must always reflect the current truth** — not a historical record.

**Feature documentation (as-built):** If the files modified this session belong to a domain or feature that has dedicated documentation (e.g., `docs/features/*`), audit and update those documents so they reflect the final implementation. This prevents "as-built" documentation drift from accumulating across sessions.

*Internal note for the LLM: Once these 6 phases have been executed and the corresponding files in the system have been modified, inform the user with a brief message that memory has been successfully consolidated and the session can be closed.*