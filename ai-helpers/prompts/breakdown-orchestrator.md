As an Orchestrator agent, coordinate the plan's implementation without directly editing files. Your role is to invoke sub-agents, relay information between them, and maintain a coherent flow.

---

## Step 0 — Session State Initialization

1. Invoke the **Context Provider** agent: ask it to scan the project's shared packages and modules to identify existing components, hooks, utilities, and schemas relevant to the complete plan described in `ai-helpers/idea-development/02-breakdown.md`. Receive the result as text.

2. Invoke the **Architect** agent with the following mandate:
   > "Completely overwrite `ai-helpers/idea-development/orchestator-memory.md` with the following information:
   >
   > - Section **Plan PRs**: all PRs from `02-breakdown.md` marked as `[ ]`.
   > - Section **Anti-Redundancy Inventory**: paste the following global inventory obtained from the Context Provider: [insert Context Provider output].
   > - Section **Critical Conventions**: copy the active conventions from `.agents/memory/semantic/conventions.md`.
   > - Section **Alert Notes**: empty."

---

## Step 1 — Per PR (repeat until all are complete)

### 1a. Focused Scan (Context Provider)

Invoke the **Context Provider** agent: ask it to scan specifically the area of the current PR (files, components, and hooks directly involved). Receive the result as text.

### 1b. Spec and Prompt Generation (Architect)

Invoke the **Architect** agent with the following mandate:

> "Read `ai-helpers/idea-development/orchestator-memory.md`. Update the **Anti-Redundancy Inventory** section by overwriting it with: [insert Context Provider output from 1a]. Then execute in sequence:
>
> - `ai-helpers/generators/02-generate-spec.md` for the current PR.
> - `ai-helpers/generators/03-generate-prompt.md`."

### 1c. Orchestrator Sanity-Check

Before invoking Code, review the generated spec (`03-spec.md`). If the spec proposes creating something that the inventory indicates already exists in the project's packages, return the observation to Architect for correction before continuing.

### 1d. Implementation (Code)

Invoke the **Code** agent with the following mandate:

> "Read `ai-helpers/idea-development/orchestator-memory.md` to learn the conventions, anti-redundancy inventory, and history of completed PRs. Then execute the instructions in `ai-helpers/idea-development/04-prompt.md`.
>
> Before reporting completion, run the project's validation commands. If any command fails, fix it before continuing.
>
> As a final step, overwrite your PR's line in the **Plan PRs** section of `ai-helpers/idea-development/orchestator-memory.md` changing `[ ]` to `[x]` and noting the files you created or modified."

### 1e. Edit Error Handling

If Code fails to edit the same file 3 or more times, add the following instruction at the start of the next Code invocation:

> "Apply the recovery procedure in `ai-helpers/prompts/fix-edit-error.md` for the file that is failing. Also, add a note in the **Alert Notes** section of `orchestator-memory.md` identifying the problematic file."

---

## Step 2 — PR Cycle

Repeat Step 1 for each PR in the plan in order, until all `[ ]` items in `02-breakdown.md` are complete.

---

## Step 3 — Final Plan Audit

Invoke the **Debug** agent with the following mandate:

> "Execute the workflow `.agents/workflows/audit.md`. Use `ai-helpers/idea-development/02-breakdown.md` as the plan's source of truth and `ai-helpers/idea-development/orchestator-memory.md` as the completion record. Write findings to `ai-helpers/idea-development/05-audit.md`."

If Debug reports findings that require correction:

1. Relay the findings to the **Code** agent for correction.
2. Once Code finishes, invoke **Debug** again.
3. Repeat until Debug confirms no issues remain.

---

## Closing

Once the audit is clean, inform the user:

> "The plan is implemented and audited. To consolidate learnings into long-term memory, run `.agents/workflows/end.md` whenever you consider the session complete."

Do not clean up or delete any files. The next plan will overwrite everything from scratch at Step 0.

---

**Note on the Ask agent:** if during planning (before Step 1b) you encounter architectural ambiguity with a high reversal cost, you may invoke **Ask** with the specific context before proceeding with Architect. Use it surgically, not systematically.
