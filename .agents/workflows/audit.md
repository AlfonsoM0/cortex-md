---
description: Post-feature audit with evidence-based validation. Verifies changes against semantic memory rules using real tool output. Supports three execution modes (strict, standard, autonomous) to adapt to different model capabilities. Note: autonomous mode can be removed in projects that do not use high-capacity models.
---

# Workflow: Post-Feature Audit with Evidence

**System Context:** You are an AI agent and the user has completed a feature or block of work. Your job is to validate that all changes comply with the project's established standards before consolidation.

## Phase 0: Mode Selection

Determine the execution mode based on the user's request.

**Check the user's instruction.** They should have specified one of three modes:

- **`strict`** — Every check requires printed evidence (tool output, grep results, line counts). Each phase is a separate cognitive domain executed sequentially. Designed for lightweight models (e.g., Haiku, Flash, GPT-4o-mini).
- **`standard`** — All phases are executed but evidence printing is required only at key checkpoints. Phases may be consolidated. Designed for mid-tier models (e.g., Sonnet, GPT-4o, Gemini Pro).
- **`autonomous`** — Holistic evaluation. You receive the audit objectives but choose how to verify them. Only the Technical Validation phase (lint/build/typecheck) is mandatory and blocking, regardless of mode. Designed for heavyweight models (e.g., Opus, o1, Deep Research).

**If the user did NOT specify a mode**, ask them before proceeding:

> This audit workflow supports three execution modes:
>
> - **`strict`** — Every check requires printed evidence. Best for fast/lightweight models (Haiku, Flash, mini). Maximizes thoroughness.
> - **`standard`** — Balanced. All checks run but with flexibility. Best for mid-tier models (Sonnet, GPT-4o).
> - **`autonomous`** — Holistic evaluation with maximum freedom. Best for heavyweight reasoning models (Opus, o1). Only lint/build/typecheck gates are mandatory.
>
> Which mode should I use? (Next time, you can specify it directly, e.g., "Run a strict audit" or "Audit autonomously".)

**Wait for the user's response before proceeding.**

> **Customization:** If your team does not use high-capacity reasoning models (Opus, o1, Deep Research), you can remove the `autonomous` mode from this workflow to reduce selection friction. Fewer options = less cognitive overhead for the user.

---

## Phase 1: Change Inventory

Build a precise map of what changed before auditing.

1. **Identify all files created or modified** during this session. Use version control tools (e.g., `git diff --name-status`, `git status`) or ask the user for the list.
2. **Print the file list** in your context.
3. **Categorize each file** by type: source code, configuration, documentation, test, memory/workflow file.

**Output:** A table of changed files with their categories. This is your audit scope.

### Mode-specific behavior

- **`strict`:** Print the raw `git diff` output and build a categorized table. This table is your reference for all subsequent phases.
- **`standard`:** Print a categorized summary table. Raw git output is optional.
- **`autonomous`:** Build the inventory as you see fit. You may integrate it with subsequent phases.

---

## Phase 2: Modularity & Size

Verify that files respect the project's modularity standards.

1. **For each source code file in the inventory:**
   - Count the lines of code (excluding comments and blank lines).
   - If any file exceeds the project's size threshold (check `conventions.md` for the limit; default: 200 lines as an alert indicator, 500 lines as a hard cap):
     - **Analyze:** Is the length due to types/interfaces/comments, or does it mix multiple responsibilities?
     - **If mixing responsibilities:** Flag as a finding with a recommended split.
2. **For each new component, function, or module:**
   - Verify it has a single, clear responsibility.
   - If it handles multiple concerns (e.g., data fetching + rendering + validation), flag for decomposition.

### Mode-specific behavior

- **`strict`:** Print line counts for EVERY file reviewed. Flag any file exceeding the threshold with printed evidence.
- **`standard`:** Print line counts only for files that exceed the threshold. Summarize compliant files.
- **`autonomous`:** Evaluate modularity holistically. Report only findings (files that violate standards).

---

## Phase 3: Anti-Redundancy

Verify that no new code duplicates existing functionality.

1. **For each new component, hook, utility, or validator** created in this session:
   - **Search the codebase** using grep or search tools for similar function names, similar file names, or similar functionality.
   - If a similar implementation exists, flag it as a critical finding with the path to the existing code.
2. **For each new dependency or import:**
   - Verify it doesn't duplicate an already-available utility from the project's shared packages.

### Mode-specific behavior

- **`strict`:** Print the search command output for EACH new piece of code checked. No exceptions.
- **`standard`:** Search for each new piece of code but print results only when potential duplicates are found.
- **`autonomous`:** Evaluate redundancy based on your knowledge of the codebase. Use search tools only for areas of uncertainty. Report findings.

---

## Phase 4: Convention Compliance

Verify that all changes follow the project's established conventions.

1. **Read:** `.agents/memory/semantic/conventions.md`
2. **Check each file** against the conventions:
   - Naming patterns (files, variables, functions, components).
   - Import ordering and structure.
   - Prohibited patterns (check for `any`, `@ts-ignore`, `console.log`, hardcoded values, or whatever the conventions file prohibits).
3. **For prohibited patterns:** Use grep/search tools to verify their absence in the changed files.

### Mode-specific behavior

- **`strict`:** Print the grep output confirming absence of EACH prohibited pattern across ALL changed files.
- **`standard`:** Run grep for prohibited patterns and print a summary result (pass/fail per pattern).
- **`autonomous`:** Evaluate convention compliance holistically. Use grep only for high-risk patterns. Report findings.

---

## Phase 5: Technical Validation (Gateway)

> ⚠️ **This phase is MANDATORY and BLOCKING in ALL modes.** No model — regardless of capability — can skip objective compiler and linter verification.

Run the project's automated validation tools.

1. **Run the linter:** Execute the project's lint command (e.g., `pnpm lint`, `npm run lint`, `cargo clippy`). Print the output.
   - If there are errors: **STOP.** Report the errors and propose fixes before continuing.
2. **Run the type checker:** Execute the type check command if applicable (e.g., `pnpm typecheck`, `tsc --noEmit`). Print the output.
   - If there are errors: **STOP.** Report the errors and propose fixes before continuing.
3. **Run the build:** Execute the build command (e.g., `pnpm build`, `npm run build`, `cargo build`). Print the output.
   - If there are errors: **STOP.** Report the errors and propose fixes before continuing.
4. **Run related tests** if they exist for the modified packages/modules.

**Gateway rule:** If any command in this phase fails, do NOT proceed to the report. Fix the issues first, then re-run.

---

## Phase 6: Roadmap & Feature-Docs Sync (Optional)

Once the changes pass validation, keep project documentation aligned with the as-built reality.

1. **Roadmap:** If the project maintains a master roadmap (e.g., `docs/00-MASTER-ROADMAP.md`), mark completed milestones, record architectural pivots, or add new steps.
2. **Feature docs:** If the modified files belong to a documented domain/feature (e.g., `docs/features/*`), update those documents to reflect the final implementation.

> **Composability:** This workflow can reference project-specific domain checklists. If your project defines specialized checklist workflows (e.g., a UI/UX checklist, a security checklist, a data-migration checklist) for the domains touched this session, consult/run them here. Keep such checklists in the project — the framework stays domain-agnostic.

---

## Phase 7: Audit Report

Present a structured summary to the user.

```
### ✅ Checks Passed

- [List of checks that passed with brief evidence reference]

### ⚠️ Findings

- [Severity: Critical/Warning/Info] [Description] [Suggested fix]

### 📊 Metrics

- Audit mode: strict | standard | autonomous
- Files audited: N
- Lines in largest file: N
- New components/modules: N (duplicates found: N)
- Lint: ✅/❌
- Types: ✅/❌
- Build: ✅/❌
```

*Internal note for the LLM: In `strict` mode, the printed evidence in each phase serves as your "proof of work" — it forces you to actually execute the verification instead of assuming compliance. In `autonomous` mode, you have freedom in HOW you verify, but the Technical Validation gateway (Phase 5) remains non-negotiable.*
