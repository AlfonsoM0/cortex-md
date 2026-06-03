# Cortex-MD: AI Helpers Module

The **AI Helpers** module provides a stepwise execution pipeline designed to isolate the feature development process from the general system context. It allows you to take a high-level idea and transform it into audited code through an iterative, repeatable process.

## 1. What is the Stepwise Execution Pipeline?

While Cortex-MD excels at managing global memory and episodic context, it doesn't prescribe how to do the actual coding *during* the session. The stepwise pipeline divides the software development cycle into five explicit phases.

By separating reasoning (planning) from execution (coding), it prevents "amnesia" in lightweight models and "context bloat" in models working with large context windows.

## 2. Architecture

The module is divided into three areas:

1.  **`/generators/` (The Engines):** Contains the active prompts. These are the tools executed to transform information from one step to the next.
2.  **`/idea-development/` (The Workbench):** The workspace where the idea evolves until it becomes audited code. The `01-brief/` folder acts as an idea backlog: it can contain multiple briefs in parallel.
3.  **`/prompts/` (Orchestration Prompts):** Contains master prompts for automated multi-agent execution.

## 3. Work Modes

There are three main ways to operate with the AI. Choose the option that best fits your desired level of control and the capabilities of the model you are using.

### Option 1: Manual Flow (Total Control)

The user interacts step-by-step with each generator. Ideal for absolute visibility and control over each phase.

1.  Write your requirements in a file within `01-brief/` (e.g., `01-brief/my-feature.md`).
2.  Request to generate the breakdown with `01-generate-breakdown.md` → creates `02-breakdown.md`.
3.  For each PR in the breakdown, invoke `02-generate-spec.md` → creates `03-spec.md`.
4.  Invoke `03-generate-prompt.md` → creates `04-prompt.md`.
5.  Pass that prompt to your coding agent to implement the feature.
6.  Execute `04-generate-audit.md` to verify that the code complies with the specification.
7.  When you decide the session is complete (which can span multiple PRs), execute `.agents/workflows/end.md` to consolidate learnings into the Hippocampus.

### Option 2: Orchestrated Flow (Maximum Automation)

Designed to delegate the complete cycle to an Orchestrator.

1.  Use `01-generate-breakdown.md` to convert the brief into the plan (`02-breakdown.md`).
2.  Invoke your Orchestrator agent and pass it the master prompt `prompts/breakdown-orchestrator.md`.
3.  The Orchestrator handles invoking the different **sub-agents** (Architect, Code, Debug) in an automated loop for each PR in the breakdown.
4.  The user only supervises and receives the final result once the Orchestrator has resolved all PRs and passed the Debug agent's audit.

### Option 3: Independent (No Stepwise Pipeline)

The main project agent (with full global context and semantic memory loaded) manages the task directly without using the generators. The user requests global workflows directly, such as `/deep-plan` or `/audit`, relying on the agent's ability to manage the full context without partitioning reasoning into separate files.

> **When to use it?** When the task is small enough or the main agent is capable enough to not need the scaffolding of the pipeline.

## 4. Design Rules

This module relies on several strict architectural rules to function correctly without colliding with the rest of Cortex-MD:

### A. Context Barrier (`AGENTS.md` local)

To radically protect the main agent's working memory, this folder contains its own `AGENTS.md`. This acts as a barrier, instructing agents to **ignore** the entire contents of this folder for global automatic indexing. The files here are read and overwritten strictly on-demand, preventing half-finished drafts from contaminating long-term memory.

### B. Identity and Context Decoupling

-   The **main agent** is the AI with the complete global context (semantic memory loaded).
-   When acting as an Orchestrator and invoking **sub-agents** (Architect, Code, Debug), these sub-agents start as a "clean slate" (tabula rasa, with no project memory).
-   For this reason, prompts generated like `04-prompt.md` **do not include global rules**. It is the Orchestrator's responsibility to "feed" these sub-agents by passing only the context strictly necessary for their task, protecting them from *context bloat*.

### C. Enriched Commits

Instead of creating multiple folders for each feature (which bloats the repo), the pipeline files are maintained as a single "static workspace" that is overwritten in each iteration. When committing changes, the entire chain of autonomous reasoning generated in these files should be injected directly into the commit body or PR description. The Git history becomes the ultimate immutable Episodic Memory.

### D. Kanbanization

The `02-breakdown.md` file is structured using Markdown checkboxes (`- [ ]`, `- [x]`). This acts as the short-term Neocortex, allowing task state to remain synchronized without collision.

### E. Manual Consolidation

Unlike the automatic process, when a feature is successfully completed using this module, **it is the user's responsibility** to decide when to run `.agents/workflows/end.md` to consolidate learnings into semantic memory. This allows grouping multiple logical PRs into a single episodic memory session, rather than creating an entry for each PR.

## 5. Customization

The prompts in the `generators/` and `prompts/` folders can and should be customized to adapt to the specific tools and conventions of your team. They are simple Markdown files designed to be modified.

> **Note on workflow modes:** Extension workflows (`deep-plan.md`, `audit.md`) support three modes (`strict`, `standard`, `autonomous`). If your team does not use high-capacity reasoning models (Opus, o1, Deep Research), consider **removing `autonomous` mode** from your workflows to reduce cognitive friction in mode selection. Fewer options = less overhead.
