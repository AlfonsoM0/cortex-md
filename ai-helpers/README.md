# Cortex-MD: AI Helpers Module

The **AI Helpers** module provides a stepwise execution pipeline designed to fill the operational gap between a work session's `start.md` (Wake Up) and `end.md` (Sleep). It allows developers and AI orchestrators to take a high-level idea and transform it into audited code through an iterative, repeatable process.

## 1. What is the Stepwise Execution Pipeline?

While Cortex-MD excels at managing global memory and episodic context, it doesn't prescribe how to do the actual coding *during* the session. The stepwise pipeline divides the software development cycle into five explicit phases.

By separating reasoning (planning) from execution (coding), it prevents "amnesia" in lightweight models and "context bloat" in heavyweight models.

## 2. Architecture

The module is divided into two distinct areas:

1.  **`/generators/` (The Engines):** Contains active prompts. These are the tools the user runs to transform information from one step to the next.
2.  **`/idea-development/` (The Workbench):** Contains the static templates. This is the workspace where the idea evolves until it becomes audited code.

## 3. The Flow

The standard execution sequence is:

1.  **Brief:** The user writes the business requirements in `idea-development/01-brief.md`.
2.  **Breakdown:** The user runs `generators/01-generate-breakdown.md` to split the brief into atomic PRs in `02-breakdown.md`.
3.  **Spec:** For a specific PR, the user runs `generators/02-generate-spec.md` to create a strict technical specification in `03-spec.md`.
4.  **Prompt:** The user runs `generators/03-generate-prompt.md` to generate a delegation instruction in `04-prompt.md`.
5.  **Execution:** The orchestrating agent (e.g., Roo Code, Cline, Cursor) executes the code based on the generated prompt.
6.  **Audit:** The user runs `generators/04-generate-audit.md` to validate the code. If successful, it triggers the consolidation cycle via `.agents/workflows/end.md`.

## 4. Design Rules

This module relies on several strict architectural rules to function correctly without colliding with the rest of Cortex-MD:

### A. Context Decoupling (The Prompt Rule)
The generated prompt (`04-prompt.md`) **MUST NEVER** contain references to the root `AGENTS.md` or global system rules. The orchestrating agent already has its "Prefrontal Cortex" loaded via the IDE's system prompt. Duplicating these rules generates *context bloat* and distracts the model from pure code execution.

### B. Context Barrier (`AGENTS.md` local)
To radically protect the orchestrator's working memory, this folder contains its own `AGENTS.md`. This acts as a barrier, instructing agents to **ignore** the entire contents of this folder for global indexing. The files here are invoked strictly on-demand.

### C. Enriched Commits
Instead of creating multiple folders for each feature (which bloats the repo), the pipeline files are maintained as a single "static workspace" that is overwritten in each iteration.
How is historical traceability maintained? **By enriching commits.**
When sending changes, the entire chain of autonomous reasoning generated in these files should be injected directly into the commit body or PR description. The Git history becomes the ultimate immutable Episodic Memory.

### D. Kanbanization
The `02-breakdown.md` file is structured using Markdown checkboxes (`- [ ]`, `- [x]`). This acts as the short-term Neocortex, allowing multiple sub-agents to work in parallel and keeping task state synchronized without collision.

### E. The Exit Hook
The final step (`05-audit.md`) contains an explicit exit instruction:
> *"If the audit is 100% successful, proceed immediately to execute the Sleep cycle by calling `.agents/workflows/end.md` to consolidate learnings into the Hippocampus."*

## 5. How to Use

1.  Write your idea in `idea-development/01-brief.md`.
2.  Ask your agent: "Run `ai-helpers/generators/01-generate-breakdown.md`".
3.  Review the breakdown. Pick the first PR.
4.  Ask your agent: "Run `ai-helpers/generators/02-generate-spec.md` for PR 1".
5.  Ask your agent: "Run `ai-helpers/generators/03-generate-prompt.md`".
6.  *Pass the resulting prompt to your coding agent/CLI to implement the feature.*
7.  Once the code is done, ask your agent: "Run `ai-helpers/generators/04-generate-audit.md`".
8.  If the audit passes, the agent will automatically call `end.md`. Commit your code.
9.  For the next feature, overwrite `01-brief.md` and start again.

## 6. Customization

The prompts in the `generators/` folder can and should be customized to fit your team's specific tools and conventions. They are plain Markdown files designed to be modified.
