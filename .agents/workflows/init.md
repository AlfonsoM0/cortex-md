---
description: Initial Bootstrap (Onboarding)
---

# Workflow: Project Bootstrap (Initial Onboarding)

**System Context:** This is the **first time** Cortex-MD is activated in this project and the memory files are empty templates. Before writing a single rule, **align with the user**: a memory populated with assumptions leads the agent to optimize for what does not matter. Execute the phases in order.

## Phase 0: Silent preparation

Before asking anything, read what already exists to avoid asking what the project already states:

- **Software:** directory structure, configuration files (`package.json`, `pyproject.toml`, `go.mod`…), `README.md`, documentation.
- **Other types of projects:** documents, spreadsheets, or folders shared by the user.

Build a brief list of hypotheses ("appears to be a wholesale business tracking stock in a spreadsheet") to **confirm** during the interview, not to take as given.

**Is there version control?** Find out if the folder is a git repository. Cortex-MD works equally well in a plain folder: without git, defrag backs up memory by copying it before rewriting. If the user does not use git, do not require it; at most, offer it in one sentence ("it allows undoing any change; it is optional") and respect the answer.

## Phase 1: Alignment interview (conversation with the user)

Conduct a friendly conversation following **`.agents/workflows/references/alignment-interview.md`**. Upon completion, the agent must be able to answer, without guessing:

- What the project is, who it is for, what stage it is in, and who makes decisions.
- What **problems** it solves and what the user wants to solve with the assistant.
- What **objectives** it pursues, how success is measured, and what was intentionally left out.
- What the **current procedures** look like and which ones should be automated — via script, agent, or agent with human approval.
- Which tasks are **important** (zero-error tolerance, irreversible) and which are **urgent** (deadlines, blockers, peak seasons).
- How much **autonomy** the agent has: what it performs autonomously, what it proposes, and what it never touches.
- **Where information lives**, what the primary source is for each data type, and how it is organized.
- The project's **SWOT** and pre-mortem risks.
- Constraints, decision criteria, and the user's preferred way of working.

🔴 **Gate:** close the phase with the one-page synthesis (what I understood · what I don't know yet · what I'm going to do) and **wait for the user's explicit confirmation**. Do not write memory without an approved synthesis.

If the user has limited time, ask the essential questions (★) and leave the rest as pending items in `active-tasks.md`: the interview can be completed in subsequent sessions.

## Phase 2: Project analysis

With what was learned, dive deeper into what the interview pointed out:

- **Software:** real code conventions and style, linters, modules, data flow.
- **Other types of projects:** systems and spreadsheets mentioned, templates in use (emails, purchase orders, invoices), existing written procedures.

If analysis contradicts something from the interview, ask: do not choose silently.

## Phase 3: Canonical documentation

Memory cites documents, so documents come first. Create in `docs/` what the interview justified (the destination for each answer is in the reference's synthesis table):

- `docs/00-PROJECT-BRIEF.md` — the **why**: project, problems, objectives and metrics, non-goals, SWOT, pre-mortem, constraints.
- `docs/01-GUIDELINES.md` — **how decisions are made**: conflict resolution criteria, zero-error items, irreversible actions.
- A document per relevant procedure or feature, and `docs/glossary.md` if domain-specific vocabulary exists.

A roadmap (`docs/00-MASTER-ROADMAP.md`) only if the project has phases or scope to manage.

## Phase 4: Semantic memory

Write files respecting the **rules file contract** (`end.md § Phase 3`): rule in imperative mood + at most one sentence of rationale + citation to `docs/`, ≤ ~400 characters per entry.

1. `stack.md` — tools, services, and suppliers; **the primary source on the first line** (and which one governs for each data type if there are several).
2. `architecture.md` — how the system or operation is structured: modules, or workflows and their owners.
3. `conventions.md` — the house style: code, or formats, tone, and communication templates.
4. `business-rules.md` — domain entities and invariable rules (zero-error items).
5. `taxonomy.md` — propose tags according to the domains that emerged during the interview (e.g., `[Stock]`, `[Suppliers]`) and **wait for user approval**. `[CortexMD]` is always retained.

🔴 **Never write credentials or third-party personal data into memory:** name the system where they live.

## Phase 5: Working memory

Write `active-tasks.md` with:

- Verified **state**, with date.
- **Urgencies** as P1 and what needs to be monitored as `[Watch]` with its trigger (deadlines, pre-mortem risks).
- **Automation candidates**, ranked by priority and effort, indicating whether they go via script, agent, or agent with human approval.
- Interview **unknowns**, as pending items to verify, and any unaddressed interview blocks.
- The agreed **next step**.

## Phase 6: Adapt `AGENTS.md`

`AGENTS.md` is loaded in every session: store only what must always be present.

- **Identity and context:** agent role and a 3-5 line project summary, citing `docs/00-PROJECT-BRIEF.md`.
- **Autonomy:** what it performs autonomously, what it proposes and waits for approval, and what it never touches — as agreed during the interview. Replaces the generic "Limited Autonomy" rule.
- **Communication:** language, tone, and how to consult the user.
- **Decision criteria:** a pointer to `docs/01-GUIDELINES.md`.
- **Skill router:** replace or remove placeholders according to actual project skills.
- **Automatic maintenance:** record the maintenance day chosen by the user in the interview (block 13; default: **Friday**, to close out the week) or "disabled". In multi-person teams, record who is responsible.

Create `.agents/memory/maintenance-log.md` with today's date as the last weekly check and last brief review, and "never" as the last defrag.

## Phase 7: Tool integration

Memory only works if every session loads it. For each tool the user uses, verify:

1. **That it reads `AGENTS.md` at startup.** Not all tools do so automatically: some need a bridge file or configuration. The guide `docs/agent-bridges.md` in the Cortex-MD repository (not copied to the project) contains snippets.
2. **That it executes `start.md` before responding.** If the tool supports a session start hook, use it.
3. **That native memory is disabled** (if available): two memory systems on the same project will diverge.

## Phase 8: Registration and confirmation

1. Record the alignment session with `end.md` (Phases 1 and 2): this is the first day of episodic memory, capturing decisions and learnings from the interview.
2. Run `node .agents/check-memory-contract.js` (Node ≥ 18; without Node, check the contract manually).
3. Summarize for the user what was stored in each file and ask them to correct inaccuracies.
4. Explain to the user, in three sentences and without jargon, what happens from now on: the agent loads memory automatically at the start of each session; offers to save learnings when the session ends; and on maintenance day reviews memory and proposes, only if needed, an optimization or a new alignment conversation. **They don't have to remember anything.**

_This workflow runs only once per project; re-alignment occurs when the project changes._
