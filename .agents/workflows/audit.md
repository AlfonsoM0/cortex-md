---
description: Post-feature audit with evidence-based validation. Verifies changes against semantic memory rules using real tool output. Supports three execution modes (strict, standard, autonomous); the agent proposes the one that fits its model.
---

# Workflow: Post-Feature Audit with Evidence

**System Context:** You are an AI agent and the user has completed a feature or block of work. Your job is to validate that all changes comply with the project's established standards before consolidation.

## Phase 0: Mode Selection

Three execution modes adapt this workflow to the model running it:

- **`strict`** — Every check requires printed evidence (tool output, grep results, line counts); each phase is a separate cognitive domain executed sequentially. For lightweight models (e.g., Haiku 4.5 and equivalents).
- **`standard`** — All phases are executed but evidence printing is required only at key checkpoints; phases may be consolidated. For mid-tier models (e.g., Sonnet 5.5 and equivalents).
- **`autonomous`** — Holistic evaluation: you receive the audit objectives and choose how to verify them. For the highest-reasoning models (e.g., Opus 5.5 and equivalents).

In every mode, the Technical Validation phase is mandatory and blocking.

**If the user specified a mode, use it.** If not, **propose the one that fits your own model** in one line and proceed unless the user chooses another:

> I'll audit in **`<mode>`** mode, which fits the model I'm running on. If you prefer another — `strict` (evidence for every check), `standard` (balanced), or `autonomous` (holistic) — just tell me.

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

**Without a toolchain:** if the project has no linter, type checker, or build (check `stack.md`), record it in the report and run what does exist (tests, `node .agents/check-memory-contract.js`). The gateway blocks on failures, never on commands that do not exist.

---

## Phase 6: Roadmap & Feature-Docs Sync (Optional)

Once the changes pass validation, keep project documentation aligned with the as-built reality.

1. **Feature docs (default destination):** If the modified files belong to a documented domain/feature (e.g., `docs/features/*`), update those documents to reflect the final implementation.
2. **Roadmap, only if the scope changed:** if the project maintains a master roadmap (e.g., `docs/00-MASTER-ROADMAP.md`), update it only when something enters, leaves or is reclassified, or on an architectural pivot. Execution progress does not go there: it is read in every session (`end.md § Phase 4`).

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
