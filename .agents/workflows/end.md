# Workflow: Session End (Cognitive Consolidation)

**System Context:** You are an AI agent and the current work session has concluded. It is imperative to execute a memory consolidation process analogous to the human sleep cycle to prevent context degradation in future interventions. You must evaluate what information to retain, what to index, and how to modify the global project state.

Execute the following steps in strict sequential order.

## Phase 1: Episodic Memory Creation

Generate the detailed record of this session's experiences and reasoning to preserve the "what" and the "why".

1. Determine the current date in `YYYY`, `MM`, `DD` format.
2. Create or update the file: `.agents/memory/episodic/YYYY/MM/DD.md`
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
3. **Define the next step:** Write clearly and concisely what the first logical action should be for the next development iteration.

## Phase 5: Knowledge Routing (Continuous Learning)

If during the session you discovered a new pattern, a recurring bug solution, or an architectural improvement:

1. **Do NOT add it directly to `AGENTS.md`.** The root system prompt should remain lean and stable.
2. **Identify the correct destination:** Determine whether the learning belongs to:
   - A **semantic memory file** (`conventions.md`, `architecture.md`, `stack.md`, `business-rules.md`) — if it alters a global truth.
   - A **skill file** (`.agents/skills/[name]/SKILL.md`) — if it is a reusable technique or domain-specific pattern.
   - A **documentation file** (`docs/`) — if it is a product-level explanation or specification.
3. **Route the knowledge** to the appropriate file. Only add to `AGENTS.md` if it constitutes a new universal rule or requires the creation of a new skill entry.

*Rationale: This prevents "system prompt bloat" — a gradual inflation of the root file that degrades token economy and dilutes the agent's core directives.*

## Phase 6: Planning Document Sync (Optional)

If the project maintains a master roadmap, task board, or planning document (e.g., `docs/ROADMAP.md`, `docs/00-MASTER-ROADMAP.md`):

1. Review the planning document.
2. If today's session completed a milestone, mark it as done.
3. If the session revealed new steps, blockers, or architectural pivots, update the document accordingly.
4. **The planning document, like semantic memory, must always reflect the current truth** — not a historical record.

*Internal note for the LLM: Once these 6 phases have been executed and the corresponding files in the system have been modified, inform the user with a brief message that memory has been successfully consolidated and the session can be closed.*