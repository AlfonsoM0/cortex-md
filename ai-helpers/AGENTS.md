# AI Helpers — Context Barrier

This folder holds the working material of the stepwise pipeline (briefs, breakdowns, specs, prompts, audits).

**Agents and IDEs:** do NOT index or read this folder on your own initiative. Read and write it **only when the user or a pipeline prompt asks you to** (e.g. `prompts/breakdown-orchestrator.md`, `generators/*`): then work here normally.

Reading it automatically would pollute your context window with irrelevant working drafts.

**When a plan is finished:** its knowledge moves to `docs/` and to memory (`end.md`), and its files here are deleted. Before deleting, rescue any **approved artifact still waiting for its date** (an approved legal text, an approved copy) into a draft inside `docs/` that no publishing script reads. `docs/` and memory never cite paths in this folder or a plan's internal numbering ("PR 5"): they cite the canonical doc.
