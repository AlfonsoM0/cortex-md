---
description: Initial Bootstrap (Onboarding)
---

# Workflow: Project Bootstrap (Initial Onboarding)

**System Context:** This is the **first time** Cortex-MD is activated in this project and the memory files are empty templates. Before writing a single rule, **align with the user**: a memory populated with assumptions leads the agent to optimize for what does not matter. Assume the worst case — a user who does not know what an LLM or a harness is, nor exactly what they need — and guide them. Execute the phases in order.

## Phase 0: Silent preparation

1. **Model check.** If the installation did not already do it (`INSTALL.md § 0` in the Cortex-MD repository), do it now: identify your tool and model, research the highest-reasoning models of your own provider, and if the active one is not among them, recommend switching (never to another provider). Keep the tool and model in mind for Phase 8.
2. **Interview notes.** Create `.cortex-tmp/interview-notes.md`. Init is the longest session of the project: its notes live in a file so that nothing is lost if the conversation is cut or compacted. They are ephemeral: Phase 9 deletes them.
3. **Read what already exists**, to avoid asking what the project already states:
   - **Software:** directory structure, configuration files (`package.json`, `pyproject.toml`, `go.mod`…), `README.md`, documentation.
   - **Other types of projects:** the folders, documents, and spreadsheets in the workspace — the business files.
   - **The tool's native memory**, if it has any and you can read it (Claude's auto-memory, Codex memories, a Cowork project's memory, `~/.hermes/memories/`): it may hold real knowledge about the user. Use it as hypotheses before Phase 7 disables it or restricts it.
4. Build a brief list of hypotheses ("appears to be a wholesale business tracking stock in a spreadsheet") to **confirm** during the interview, not to take as given. Write them in the notes.

**Is there version control?** Find out if the folder is a git repository. Cortex-MD works equally well in a plain folder: without git, defrag backs up memory by copying it before rewriting. If the user does not use git, do not require it; at most, offer it in one sentence ("it allows undoing any change; it is optional") — unless the installation already did — and respect the answer.

## Phase 1: Alignment interview (conversation with the user)

Conduct a friendly conversation following **`.agents/workflows/references/alignment-interview.md`**, starting with block 0 (the user's work environment). **When closing each block, append to the notes** the 3-5 points the user confirmed; the synthesis is built from the notes, not from memory of the conversation.

Upon completion, the agent must be able to answer, without guessing:

- Which tool and model the user works with, and for what (management or programming).
- What the project is, who it is for, what stage it is in, and who makes decisions.
- What **problems** it solves and what the user wants to solve with the assistant.
- What **objectives** it pursues, how success is measured, and what was intentionally left out.
- What the **current procedures** look like and which ones should be automated — via script, agent, or agent with human approval.
- Which tasks are **important** (zero-error tolerance, irreversible) and which are **urgent** (deadlines, blockers, peak seasons).
- How much **autonomy** the agent has: what it performs autonomously, what it proposes, and what it never touches.
- **Where information lives**: which business files, folders, or systems are the primary source for each data type.
- The project's **SWOT** and pre-mortem risks.
- Constraints, decision criteria, and the user's preferred way of working.

🔴 **Gate:** close the phase with the one-page synthesis (what I understood · what I don't know yet · what I'm going to do) and **wait for the user's explicit confirmation**. Do not write memory without an approved synthesis.

If the user has limited time, ask the essential questions (★) and leave the rest as pending items in `active-tasks.md`: the interview can be completed in subsequent sessions.

**When is the installation complete?** When every ★ question has an answer (or is recorded as an unknown), the synthesis is approved, and Phases 2-9 are done. Questions without ★ and blocks left for later do not prevent it: they stay as pending items in `active-tasks.md`.

## Phase 2: Project analysis

With what was learned, dive deeper into what the interview pointed out:

- **Software:** real code conventions and style, linters, modules, data flow.
- **Other types of projects:** the business files and systems mentioned, templates in use (emails, purchase orders, invoices), existing written procedures.

If analysis contradicts something from the interview, ask: do not choose silently.

## Phase 3: Canonical documentation

Memory cites documents, so documents come first. The project has **three layers**; keep them separate:

1. **Primary source** — the working files: the code, or the business files (e.g. `suppliers.xlsx`, invoices, price lists). They stay in their folders; Cortex-MD never moves them.
2. **`docs/`** — documentation that **explains** how the project works and how work is done (e.g. "how to evaluate suppliers"), and **names where each piece of data lives** in the primary source. It is not the place for business files.
3. **Memory** — the rule, plus a citation to the doc that expands it.

Create in `docs/` what the interview justified (the destination for each answer is in the reference's synthesis table):

- `docs/00-PROJECT-BRIEF.md` — the **why**: project, problems, objectives and metrics, non-goals, SWOT, pre-mortem, constraints.
- `docs/01-GUIDELINES.md` — **how decisions are made**: conflict resolution criteria, zero-error items, irreversible actions.
- A document per relevant procedure or feature, and `docs/glossary.md` if domain-specific vocabulary exists.
- `docs/agent-environment.md` — the work environment from block 0: tool and form of use, model, plan. Phase 7 completes it with the bridge and settings.

Link related docs to each other and to the skills (`→ docs/...`), so the agent can expand its memory step by step.

A roadmap (`docs/00-MASTER-ROADMAP.md`) only if the project has phases or scope to manage.

## Phase 4: Semantic memory

Write files respecting the **rules file contract** (`end.md § Phase 3`): rule in imperative mood + at most one sentence of rationale + citation to `docs/`, ≤ ~400 characters per entry. Replace the template placeholders (the guidance paragraphs in `_italics_` under each heading) and delete the commented examples (`<!-- cortex:example … -->`).

1. `stack.md` — **the primary source on the first line** (which business file, folder, or system governs each data type; it may be outside the folder: cloud, connector, external system), then the agent environment (Phase 7) and the tools and services.
2. `architecture.md` — how the system or operation is structured: modules, or workflows and their owners; and the workspace map (which folder holds what).
3. `conventions.md` — the house style: code, or formats, tone, and communication templates.
4. `business-rules.md` — domain entities and invariable rules (zero-error items).
5. `taxonomy.md` — propose tags according to the domains that emerged during the interview (e.g., `[Stock]`, `[Suppliers]`) and **wait for user approval**. `[Docs]` and `[CortexMD]` are always retained.

🔴 **Never write credentials or third-party personal data into memory:** name the system where they live.

## Phase 5: Working memory

Write `active-tasks.md` with:

- Verified **state**, with date.
- As the first P1: **`[🚨 P1] [🟡 Session] Post-installation defrag + purge, with the most capable model of the service.`** It is read every session, so it survives even if another signal fails.
- **Urgencies** as P1 and what needs to be monitored as `[Watch]` with its trigger (deadlines, pre-mortem risks).
- **Automation candidates**, ranked by priority and effort, indicating whether they go via script, agent, or agent with human approval.
- Interview **unknowns**, as pending items to verify, and any unaddressed interview blocks.
- The agreed **next step**.

## Phase 6: Adapt `AGENTS.md`

`AGENTS.md` is the agent's self — who it is, what it is for, how its memory works, which skills and knowledge it has — and the router that connects it all. It is loaded in every session: store only what must always be present.

- **Identity and purpose** (the header, in the first person): name, personality, and expertise; purpose (the problems it solves, from the brief); whom it serves and how they decide (blocks 1, 2, and 13).
- **Project:** a 3-5 line summary, citing `docs/00-PROJECT-BRIEF.md`.
- **Autonomy:** what it performs autonomously, what it proposes and waits for approval, and what it never touches — as agreed during the interview. Replaces the generic "Limited Autonomy" rule.
- **Communication:** language, tone, and how to consult the user.
- **Decision criteria:** a pointer to `docs/01-GUIDELINES.md`.
- **Primary source:** replace the generic line with the actual files or systems (the first entry of `stack.md`).
- **Conditional blocks:** if the project is not software, remove the blocks marked `<!-- cortex:software-only -->`. The `<!-- cortex:optional:<name> -->` blocks are resolved in Phase 7, once the extensions are decided.
- **Skill router:** replace or remove placeholders according to actual project skills.
- **Automatic maintenance:** record the maintenance day chosen by the user in the interview (block 13; default: **Friday**, to close out the week) or "disabled".

## Phase 7: Tool integration

Memory only works if every session loads it. Configure **only the tool the user works with** (the base case is one LLM and one harness); if they change tools some day, the new one connects Cortex-MD with the same guide.

1. **Read the bridge guide:** `.cortex-tmp/framework/docs/agent-bridges.md`, or `https://raw.githubusercontent.com/AlfonsoM0/cortex-md/main/docs/agent-bridges.md` if the folder does not exist.
2. **Research before configuring** when the tool is not in the guide, its "Verified" date is more than 90 days old, or what you observe does not match: look it up in the tool's official documentation (web). Without web access, use the guide and tell the user it may be outdated.
3. **Apply the three conditions** of the guide: the tool reads `AGENTS.md` at startup (native or through a bridge file), executes `start.md` before responding (a session start hook if available), and its native memory is disabled — or, if it cannot be disabled, restricted to personal preferences. Merge with existing files, never replace them (in JSON, merge keys and append to arrays such as `hooks.SessionStart`); global configuration only with permission.
4. **Complete** `docs/agent-environment.md` (created in Phase 3): bridge and settings applied, how native memory was handled, sources consulted, and verification date. `stack.md` cites it.
5. **Extensions:** if the project is software, offer `deep-plan`, `audit`, and `commit` in one line each (plan before large changes · audit after finishing · commit with a clear message). Copy only what the user accepts, from `.cortex-tmp/framework/` (or from the raw URL of step 1). `ai-helpers/` and the MCP module, only if the user asks. Then remove from `AGENTS.md` the `<!-- cortex:optional:<name> -->` blocks of the extensions that were not installed.

## Phase 8: Registration and confirmation

1. **Record the alignment session** with `end.md` (Phases 1 and 2): it is the first day of episodic memory, with the decisions and learnings of the interview. **Tag it with `[Docs]` plus the approved domain tags — never only `[CortexMD]`**, or the routing of `start.md` would skip it.
2. **Update `.agents/memory/maintenance-log.md`:** today's date as the last weekly check and last brief review; "never" as the last defrag; `Init: complete` (or `incomplete`, listing pending blocks or phases); `Post-install: pending — defrag + purge (installed with <tool and model>)`.
3. **Update `.agents/manifest.md § Installation`:** date, language, tool and model, extensions installed.
4. Run `node .agents/check-memory-contract.js` (Node ≥ 18; without Node, check the three rules manually: `end.md § Phase 3`).
5. Summarize for the user what was stored in each file and ask them to correct inaccuracies.

## Phase 9: Handoff to the user

1. **Form of use:** if the use does not match the tool's form of use (e.g., management from Claude Code, whose sibling for management is Claude Cowork — the same service in another form), **only recommend it**, in one sentence. Never block or require the change.
2. **How memory works**, in plain language and with the brain as the image (≤ 8 lines): at the start of each session the agent **wakes up** — reads who it is (`AGENTS.md`), the short rules of the present, and what happened yesterday and in the last sessions —; at the end it **sleeps** — writes down the day and turns it into learnings (rules, `docs/`, skills) —; older memories are looked up only when needed; now and then it **exercises its memory** (defrag) to correct what it consolidated badly. `docs/` explains the project, and the business files are always the truth.
3. **Workflows and the phrase that triggers them**, in the user's language:

   | Say… | The agent… |
   | --- | --- |
   | (nothing: at the start of each session) | Loads memory (`start`) |
   | "let's save what we learned" / "we're done" | Consolidates the session (`end`) |
   | (nothing: on maintenance day) | Checks memory and proposes, only if needed, a cleanup (`maintenance`) |
   | "optimize the memory" | Deep review and cleanup (`defrag`), with the most capable model |

4. **Workflows and skills, for non-experts:** a *workflow* is a step-by-step recipe the agent follows when asked (it lives in `.agents/workflows/`); a *skill* is specialized knowledge the agent loads only when a task needs it (`.agents/skills/`). The user can ask the agent to create them: _"turn what we do every month-end into a workflow"_, _"create a skill with how we evaluate suppliers"_. The framework is a base set of rules: it evolves with the project.
5. **Good habits** (why they matter: memory is saved from what the conversation still remembers): one task per session; close with "let's save what we learned" before the conversation grows too long; if the tool warns that the context is full or is about to compact it, close and start a new session; in messaging channels or scheduled tasks, where there is no natural end, ask explicitly for the close.
6. **Create `docs/how-to-work-with-your-agent.md`** (one page, in the user's language) with points 2-5, so the user can reread it. It is not loaded every session.
7. **Delete `.cortex-tmp/`** (framework copy and interview notes) if `Init: complete`. If the interview remains incomplete, keep the notes: the next session continues from them.
8. **Recommend closing the session**, with two reasons: the context is loaded with the interview, and the next session is the proof that the tool loads memory. Give the test ("in the next session, ask me: _what is the first pending task?_") and anticipate that the agent will propose a **defrag + purge**: a review with fresh eyes of what was written today, and the removal of framework files that are no longer needed (such as this installation workflow).

_This workflow runs only once per project; re-alignment occurs when the project changes. The post-installation purge deletes it._
