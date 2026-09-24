---
description: Session start (Awakening)
---

# Workflow: Session Start (Cognitive Awakening)

**System Context:** You are starting a new session with an empty context. To avoid operating on assumptions, execute this memory retrieval in order **before** taking action or responding to the user. Do so silently: respond only once the context is restored.

## Truth hierarchy (read before loading anything)

1. **The primary source** — what the system IS today: the code in a software project; the system of record (stock spreadsheet, ERP, CRM, calendar, inbox) in an administrative project. `stack.md` declares which one it is.
2. **Semantic memory** — the snapshot of the present left by the last consolidation.
3. **Episodic memory** — history: explains **why** something is the way it is and what was already tried, never how it stands today.

In case of discrepancy, the higher level wins. 🔴 **Memory ages toward pessimism:** it declares pending what has already been done and cites names that changed. Before declaring something pending, blocked, or non-existent, verify it against the primary source.

## Phase 1: Semantic Memory (always-loaded tier)

**ALWAYS read** — this is the cost paid by every session, which is why it has a size budget (`defrag.md § Phase 1`):

1. `.agents/memory/semantic/architecture.md` — how the system or operation is structured.
2. `.agents/memory/semantic/stack.md` — tools, services, and which one is the primary source.
3. `.agents/memory/semantic/active-tasks.md` — what is pending or in progress, and the next step.
4. The master roadmap, if it exists (e.g. `docs/00-MASTER-ROADMAP.md`) — scope and current phase.

**Read ONLY IF applicable to the task:**

- `conventions.md` — you are going to produce something that follows the house style (code, documents, messages).
- `business-rules.md` — the task touches domain rules.
- `taxonomy.md` — you are going to search the timeline or add an entry to it.

🔴 **Memory provides the RULE; the details live in the doc cited by each rule** (`→ docs/...`). Read it to know **what is true** and **where to expand**, without expecting complete explanations. The cited docs are opened **when the task requires them**, never during this initial load.

## Phase 2: Hippocampal Routing

Extract domains from the request (e.g. Auth, DB, UI — or Stock, Suppliers, Customers) and scan `.agents/memory/episodic/timeline.md` for matching `[Tags]`.

- Do not read the entire history: pattern-match for relevant tags.
- **Omission rule:** ignore entries tagged **only** with `[CortexMD]` (memory maintenance, no project context).

## Phase 3: Selective Episodic Retrieval

If you found dates with relevant tags, read those records in `.agents/memory/episodic/YYYY/MM/`, including additional sessions for the day (`DD-s2.md`, `DD-s3.md`) when the index lists them. New task without relevant tags → skip this step.

⚠️ **Episodic memory is history:** it serves to understand past decisions and errors, not to assert current state. If it contradicts semantic memory, semantic memory wins; if it contradicts the primary source, the primary source wins.

## Phase 4: Maintenance and Confirmation

1. **Unconsolidated sessions:** if there was work after the last timeline entry (with git: later commits; without git: files modified later, outside `.agents/`), the previous session ended without `end.md`. Offer to log it based on what the changes show.
2. **Weekly check:** if applicable according to `AGENTS.md § Automatic maintenance`, execute `.agents/workflows/maintenance.md`. If the user arrived with something urgent, leave it for the end of the session.
3. Confirm to the user in a single line that you have loaded the context — plus, if needed, **a single line** about maintenance — and start the task.

_At the end of the session, suggest running `.agents/workflows/end.md` to consolidate what was learned._