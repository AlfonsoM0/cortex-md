---
description: Deep planning with Proof of Work. Forces the LLM to map the repo, contrast with architecture rules, and partition work into atomic tasks. Supports three execution modes (strict, standard, autonomous) to adapt to different model capabilities. Note: autonomous mode can be removed in projects that do not use high-capacity models.
---

# Workflow: Deep Planning with Proof of Work

**System Context:** You are an AI agent tasked with creating a detailed execution plan for a complex feature or change. This workflow grounds every decision in real evidence from the repository, preventing hallucination and lazy evaluation.

## Phase 0: Mode Selection

Determine the execution mode based on the user's request.

**Check the user's instruction.** They should have specified one of three modes:

- **`strict`** — Full evidence printing and blocking gates at every phase. Designed for lightweight, fast models (e.g., Haiku, Flash, GPT-4o-mini) that benefit from externalized reasoning.
- **`standard`** — All phases are executed but may be consolidated. Evidence printing required only at key checkpoints. Designed for mid-tier models (e.g., Sonnet, GPT-4o, Gemini Pro).
- **`autonomous`** — Holistic execution. You receive the objectives of each phase but choose how to achieve them. Only the final output format is mandatory. Designed for heavyweight reasoning models (e.g., Opus, o1, Deep Research).

**If the user did NOT specify a mode**, ask them before proceeding:

> This workflow supports three execution modes that adapt to different model capabilities:
>
> - **`strict`** — Step-by-step with evidence gates. Best for fast/lightweight models (Haiku, Flash, mini). Maximizes accuracy at the cost of speed.
> - **`standard`** — Balanced. All phases run but with flexibility to consolidate steps. Best for mid-tier models (Sonnet, GPT-4o).
> - **`autonomous`** — Holistic analysis with maximum freedom. Best for heavyweight reasoning models (Opus, o1). Maximizes speed and depth.
>
> Which mode should I use? (Next time, you can specify it directly, e.g., "Create a strict plan" or "Plan this autonomously".)

**Wait for the user's response before proceeding.**

> **Customization:** If your team does not use high-capacity reasoning models (Opus, o1, Deep Research), you can remove the `autonomous` mode from this workflow to reduce selection friction. Fewer options = less cognitive overhead for the user.

---

## Phase 1: Discovery (Map the Territory)

Before proposing any code, you must understand the current state of the repository.

1. **List the project structure:** Use a directory listing tool to print the top-level structure of the repository. Examine it.
2. **Locate affected areas:** Based on the user's request, use search tools (`grep`, `glob`, file listing) to find every file, module, or component that will be impacted.
3. **Read key files:** Open and read the most critical files identified (entry points, schemas, existing implementations of related features).
4. **Output a Discovery Summary:**
   - List every file/module found that is relevant.
   - Note any existing implementations that overlap with the requested feature.
   - Identify dependencies between the areas found.

### Mode-specific behavior

- **`strict`:** Print ALL search results and tool output explicitly in your context. Do not claim a file exists or doesn't exist without showing the tool's output. **Blocking gate:** Do NOT proceed to Phase 2 until you have printed the full discovery summary with explicit file paths and evidence.
- **`standard`:** Execute the searches but print a consolidated summary (not raw tool output). You may proceed to Phase 2 without a blocking gate.
- **`autonomous`:** Execute discovery as you see fit. You may combine this phase with Phase 2 in a single holistic analysis pass.

---

## Phase 2: Constraints (Contrast with Rules)

Cross-reference your discovery with the project's architectural rules.

1. **Read the semantic memory:**
   - `.agents/memory/semantic/architecture.md` — Design patterns, module boundaries, data flow.
   - `.agents/memory/semantic/conventions.md` — Code style, naming, prohibited patterns.
2. **Identify constraints for this task:** Based on the architecture and conventions, list the specific rules that apply to the feature being planned. Examples:
   - Package boundaries that must not be violated.
   - Naming conventions for new files/components.
   - Required validation or testing patterns.
   - Shared utilities or components that must be reused (anti-redundancy).
3. **Output a Constraints Summary:**
   - List each constraint with a reference to the source rule (e.g., "Per `architecture.md`: business logic must reside in `packages/`, not `apps/`").

### Mode-specific behavior

- **`strict`:** Print the full constraints summary with source references. **Blocking gate:** Do NOT proceed to Phase 3 until the constraints summary is printed.
- **`standard`:** Print the constraints summary. You may consolidate with the Discovery Summary from Phase 1 into a single document. No blocking gate.
- **`autonomous`:** Integrate constraints into your holistic analysis. You are not required to print a separate summary, but the constraints MUST be reflected in the final plan output.

---

## Phase 3: Partition (Atomic Task Plan)

Generate the execution plan as a series of sequential tasks.

1. **Divide into logical stages:** Each stage should be a self-contained unit of work that can be validated independently.
2. **For each stage, specify:**
   - **Objective:** One sentence describing what this stage achieves.
   - **Files to create/modify:** Exact paths with a one-line justification for each.
   - **Validation:** The specific command(s) to run to verify this stage is correct (e.g., `lint`, `typecheck`, `build`, `test`).
3. **Include an audit step:** The final stage should always be a validation pass where you verify the complete change against the constraints from Phase 2.

### Mode-specific behavior

- **`strict`:** Stages of no more than 3-5 files each. Use the strict template below. Every stage must have explicit validation commands.
- **`standard`:** Stages may be broader (up to 8-10 files). Template is recommended but flexible. Validation commands required for each stage.
- **`autonomous`:** You may generate broader stages or a monolithic plan if you justify the approach. Validation commands are still required at meaningful checkpoints.

### Plan Output Format

```markdown
# Plan: <Feature Name>

**Approach:** 1-3 sentences on the technical strategy.
**Mode:** strict | standard | autonomous

## Scope

- **In:** What this plan covers.
- **Out:** What is explicitly excluded.

## Constraints (from Phase 2)

- [Constraint 1 with source reference]
- [Constraint 2 with source reference]

## Execution Stages

### Stage 1: <Objective>

- [ ] File: `path/to/file` — Reason
- [ ] File: `path/to/file` — Reason
- **Validate:** `command to run`

### Stage 2: <Objective>

- [ ] File: `path/to/file` — Reason
- **Validate:** `command to run`

### Final Stage: Audit

- [ ] Run full validation (lint, build, typecheck)
- [ ] Verify all constraints from Phase 2 are satisfied

## File Map

| File | Action | Stage | Justification |
|---|---|---|---|
| `path/to/file` | Create / Modify | 1 | Why |
```

4. **Present the plan to the user** and wait for their approval before executing.

*Internal note for the LLM: In `strict` mode, every intermediate output (Discovery Summary, Constraints Summary) serves as "working memory" that compensates for limited reasoning depth. Do not delete or summarize these — keep them in your context. In `autonomous` mode, you have the freedom to process these internally, but the final plan must still demonstrate awareness of the constraints.*
