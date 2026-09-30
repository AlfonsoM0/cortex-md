# Cortex-MD: Continuous Memory for AI Agents

Cortex-MD is a persistent memory framework built entirely on Markdown files. It solves **"session amnesia"** and **"context bloat"** in AI agents that work on the same project day after day — in Claude Cowork or Claude Code, Codex or ChatGPT Work, Antigravity, Hermes Agent, or any tool that can read and write files.

The system emulates the memory structures of the human brain, separating information into **semantic memory** (the current state of the project) and **episodic memory** (indexed chronological records), drastically optimizing token usage and preventing hallucinations caused by context loss.

**Born for software development, useful for any continuous work:** inventory, supplier evaluation, secretarial work, customer support, research. The workflows speak of the **primary source** — the code in a repository, or the business files and systems (spreadsheets, invoices, ERP, CRM) in an administrative operation — and of the **documentation in `docs/`** that explains them. See the [example of an administrative agent](#example-memory-for-an-administrative-agent).

> 🌐 [Leer en Español (README.es.md)](README.es.md)

## Why Cortex-MD?

- **🧬 Modeled on the human brain:** the agent wakes up, sleeps, remembers yesterday, looks up old memories, and exercises its memory — see [the philosophy](#the-philosophy-of-cortex-md).
- **🧠 Solves a real problem:** every session starts from zero; Cortex-MD gives the agent a structured memory without external dependencies.
- **📦 Zero dependency:** no servers, no databases, no APIs. Just Markdown files in your folder; git is optional.
- **🔄 Provider agnostic:** works with Claude, OpenAI, Google, or open models through Hermes Agent. Switch tools without losing the project's memory.
- **🧭 Guided installation:** the agent installs it through a friendly interview — the user does not need to know what an LLM, a harness, or git is.
- **🌱 Evolves with your project:** it is a base set of rules; the agent adapts workflows and creates skills with your approval.
- **🧩 Complements `AGENTS.md`:** extends the [AGENTS.md convention](https://agents.md) (Linux Foundation) with temporal memory and lifecycle workflows.

## The Philosophy of Cortex-MD

Cortex-MD rests on five foundations. They are the base on which each user models their LLM's memory as they like — adding files, workflows, or skills — and every workflow of the framework respects them: if a change breaks one of them, memory stops working well.

### 1. A memory modeled on the human brain

A pre-trained LLM cannot change its weights to remember yesterday's conversation. Cortex-MD gives it an external brain made of files, with the same stages as human memory:

| The brain | In Cortex-MD |
| --- | --- |
| **Identity** — knowing who you are | `AGENTS.md`: the agent's self (foundation 5) |
| **Waking up** — remembering who you are, what you know, and what you did yesterday | `start.md` |
| **Sleeping** — consolidating the day into memories and learnings | `end.md` |
| **Yesterday's memories** | The last session's record (`episodic/YYYY/MM/DD.md`), read on waking up |
| **Recent memories** | The timeline or "hippocampal index" (`episodic/timeline.md`): one line per session, the last 50 |
| **Old memories** | The sessions that left the timeline: they remain in `episodic/` and are searched only when needed |
| **Learnings** | Semantic memory (short rules of the present), `docs/` (detailed knowledge), and skills (abilities) |
| **Memory exercises** | `defrag.md`: a deep review that corrects what was consolidated badly; `maintenance.md` is the weekly check-up that says when |
| **Attention** — the prefrontal cortex | The context window: clean and focused on the current task |

### 2. Modular design: do not saturate memory

The agent does not load all of its memory: it loads a small base and expands only what the task needs.

- **Knowledge:** it always reads the short rules of semantic memory. Each rule cites the doc that expands it (`→ docs/...`), and the docs cite each other and the skills; the agent follows those citations only when it needs more detail.
- **History:** it always reads the timeline and the last session. If it needs more, it follows the timeline to the relevant sessions, and searches older sessions only for what the task asks.

```text
AGENTS.md — who I am, and where everything is
 ├─ semantic memory (short rules) ──cites──▶ docs/ ──cite each other──▶ docs/ · skills/
 └─ last session + timeline ──points to──▶ relevant sessions ──search──▶ old sessions
```

### 3. Token economy

What every session reads — `AGENTS.md`, the bridge, `start.md`, the short rules, the timeline, and the last session — is small and stable, and it has a size budget (`defrag.md § Phase 1`, measured by `check-memory-contract.js`). Because it is stable, it takes advantage of the **prompt caching** of LLM services: re-reading it on every turn costs a fraction of the normal price. Everything else is paid for only when the task needs it, by following citations. The base is semantic memory: what the agent must always have present.

What goes into that fixed base is not decided by how relevant a file is, but by **what happens if the agent does not know it needed it**. A session that forgets to load a file it needed fails silently; a file loaded unnecessarily only costs tokens, and with prompt caching that stable prefix is cheap to re-read. The real cost of fixed memory is attention: the more there is, the more what matters gets diluted. That is why the domain rules (`business-rules`) are always read, while the house style (`conventions`) and the tags (`taxonomy`) are read when the task touches them — and, when in doubt, the agent reads them: an extra file costs little; a missing one can cost a broken rule.

### 4. Continuous learning

Every session close (`end.md`) updates what changed in semantic memory, `docs/`, and skills, so that the agent always knows the reality and the present of the project — not what was true months ago. The update is never perfect: rules pile up, repeat themselves, or stop being true. That is why memory is **exercised** now and then (`defrag.md`): it is contrasted against the primary source, compressed, and corrected. The weekly check-up (`maintenance.md`) proposes it when it is needed.

### 5. The self: `AGENTS.md`

The agent's personality, identity, and reason for being live in `AGENTS.md`, together with its relation to every component of its memory. From that base file — the first one loaded in every session — the agent understands who it is, what its purpose is, how its memory works, which skills and knowledge it has, and which workflows and rules matter most. `AGENTS.md` is the router that connects the agent's whole self with all of its memory and knowledge: it holds a map of them, not their content, which is why it stays short. For example: _"I am Ana, the administrative assistant of a beverage distributor; my purpose is that no order or payment slips through the cracks"_, or _"I am a principal engineer with twenty years of experience; my mission is to build this SaaS without wasting resources"_.

## Quick Start

**What you need:** an AI tool that can read and write files in a folder, running its most capable model. The most common case: **Claude Cowork** (for management) or **Claude Code** (for programming) — the same Claude service in two forms — with **Opus 5.5**.

### Option A: Let your agent install it (recommended)

Open your tool in the folder of your business or project, choose the most capable model of your service, and paste:

```text
Read the Cortex-MD framework at https://github.com/AlfonsoM0/cortex-md (start with INSTALL.md) and install its memory system in this folder. Then run its init workflow.
```

The agent checks that it is running the right model, downloads the framework into a temporary folder, copies only the core in your language, and starts an **alignment interview**: a conversation to understand your project before writing memory. Then it connects your tool, explains how everything works, and recommends closing the session. The instructions it follows are in [`INSTALL.md`](INSTALL.md).

### Option B: Manual installation

1. **Copy only the core**, in one language ([`INSTALL.md § 3`](INSTALL.md) lists it). In English:

   ```bash
   git clone --depth 1 https://github.com/AlfonsoM0/cortex-md.git /tmp/cortex-md
   cd your-project
   mkdir -p .agents/workflows/references .agents/memory/semantic .agents/memory/episodic
   cp /tmp/cortex-md/AGENTS.md .
   cp /tmp/cortex-md/.agents/manifest.md /tmp/cortex-md/.agents/check-memory-contract.js .agents/
   for f in init start end maintenance defrag; do cp /tmp/cortex-md/.agents/workflows/$f.md .agents/workflows/; done
   cp /tmp/cortex-md/.agents/workflows/references/alignment-interview.md .agents/workflows/references/
   cp /tmp/cortex-md/.agents/memory/maintenance-log.md .agents/memory/
   cp /tmp/cortex-md/.agents/memory/episodic/timeline.md .agents/memory/episodic/
   for f in architecture stack conventions business-rules active-tasks taxonomy; do cp /tmp/cortex-md/.agents/memory/semantic/$f.md .agents/memory/semantic/; done
   ```

   In Spanish, copy the `.es.md` versions renaming them without `.es`.

2. **Connect your tool** so that every session loads memory: [`docs/agent-bridges.md`](docs/agent-bridges.md).
3. **Run the bootstrap:** ask your agent _"Read and execute `.agents/workflows/init.md`"_.

### The first two sessions

1. **Installation:** interview, memory written, tool connected, and a one-page guide for you (`docs/how-to-work-with-your-agent.md`). The agent recommends closing the session: the context is full of the interview, and the next session proves that memory loads.
2. **Defrag + purge:** in the second session the agent proposes reviewing with fresh eyes what it wrote (`defrag.md`) and deleting the framework files that are no longer needed — the installation workflow, files in other languages (`.agents/manifest.md` says which). Use your most capable model for it.

### Day-to-day: you don't have to remember anything

- **At the start**, the agent wakes up: it loads its memory by itself, including what happened in the last session (`start.md`).
- **At the end**, when you say "done" or "let's save what we learned", it goes to sleep: it records the day and turns it into learnings (`end.md`).
- **Once a week** — on the day you chose in the interview; default: **Friday** —, it runs a lightweight memory check (`maintenance.md`) and proposes, only if needed, a cleanup, a deep optimization (`defrag.md`), or a new alignment conversation. Nothing is modified without your consent.

**Good habits:** memory is saved from what the conversation still remembers. Work one task per session, close with "let's save what we learned" before the conversation grows too long, and if the tool warns that it is about to compact the context, close and start a new session.

## Recommended Environment

**Base case: one person, one LLM, one tool** — preferably a subscription service with its own agentic harness and prompt caching.

| Profile | Tools | Model |
| --- | --- | --- |
| **Management** (documents, spreadsheets, suppliers, customers) | Claude Cowork · ChatGPT Work | The highest-reasoning model of the service (e.g. Opus 5.5) |
| **Development** (code) | Claude Code · Codex · Antigravity | The highest-reasoning model of the service |
| **Advanced / open source** | [Hermes Agent](https://hermes-agent.nousresearch.com) + API key of any provider (e.g. DeepSeek) | Depends on the provider |

What the framework needs from the environment, and why:

- **Prompt caching:** `AGENTS.md` and what `start.md` loads form a stable prefix that is re-read on every turn of the session. With caching, that re-read costs a fraction of the normal price; this is why the always-loaded tier has a size budget (`defrag.md § Phase 1`).
- **An agentic harness with file system access:** `end.md` reads and writes several files, and `start.md` must run before responding. A harness does this on its own and, if it supports session start hooks, guarantees it; a chat interface forces manual copy and paste.
- **Predictable cost:** every session pays for the `start` → `end` cycle and, now and then, a `defrag`. On a flat-rate plan that fixed cost goes unnoticed; on an API you pay per token.
- **A single memory:** tools with their own memory (Claude's auto-memory, Hermes' built-in memory) disable it for the project; when it cannot be disabled (Cowork, ChatGPT Work), it is restricted to personal preferences. Snippets in [`docs/agent-bridges.md`](docs/agent-bridges.md).

**With an open harness + API key**, also choose a provider **with prompt caching** (without it, every turn pays for the full context) and reserve the most capable model for the installation and `defrag.md`.

## Directory Architecture

Cortex-MD lives next to your files, in the `.agents/` convention used by [AGENTS.md](https://agents.md)-compatible tools. It never moves or modifies your business files or your code.

```text
/your-folder/
├── AGENTS.md                            # Base instructions, loaded in every session
├── CLAUDE.md or .hermes.md              # Bridge for your tool, if it needs one (created by init)
├── Suppliers/ Finance/ src/ …           # YOUR business files or code: the primary source
├── docs/                                # Documentation that EXPLAINS the project; memory cites it
│   ├── 00-PROJECT-BRIEF.md              #   The why (from the alignment interview)
│   ├── 01-GUIDELINES.md                 #   How decisions are made
│   ├── agent-environment.md             #   Tool, model, and how memory is loaded
│   └── how-to-work-with-your-agent.md   #   One-page guide for the user
└── .agents/
    ├── manifest.md                      # ★ Which files belong to the framework (purge, adaptations)
    ├── check-memory-contract.js         # ★ Memory contract verifier (Node, zero dependencies)
    ├── workflows/
    │   ├── init.md                      # ★ Installation and onboarding (the purge deletes it)
    │   ├── references/
    │   │   └── alignment-interview.md   # ★ Interview question bank (also used to re-align)
    │   ├── start.md                     # ★ Session start ("Wake Up")
    │   ├── end.md                       # ★ Session end ("Sleep")
    │   ├── maintenance.md               # ★ Weekly check (lightweight)
    │   ├── defrag.md                    # ★ Optimization, verification, and purge ("Defrag")
    │   └── deep-plan.md · audit.md · commit.md   # Extensions for software projects, on request
    ├── memory/
    │   ├── semantic/                    #   Neocortex: the present
    │   │   ├── stack.md                 #     Primary source, agent environment, tools
    │   │   ├── architecture.md          #     Structure, workspace map, main flows
    │   │   ├── conventions.md           #     House style
    │   │   ├── business-rules.md        #     Domain and invariable rules
    │   │   ├── active-tasks.md          #     Working memory: what is left to do
    │   │   └── taxonomy.md              #     Closed list of tags for the timeline
    │   ├── maintenance-log.md           #   Installation state, weekly check, last defrag
    │   └── episodic/                    #   Hippocampus: yesterday, recent, and old memories
    │       ├── timeline.md              #     Recent memories: index of the last 50 sessions, by [Tags]
    │       └── YYYY/MM/DD.md · DD-s2.md #     One record per session (the last one: yesterday)
    ├── skills/                          # (Convention) Skills, loaded on demand
    ├── sync-mcp.js · mcp_config*.json   # Extension: MCP module, on request
    └── backups/                         # Without git only: backups before each defrag

# Temporary, during installation only:
/.cortex-tmp/                            # Framework copy and interview notes (init deletes it)

# Framework repository only (not copied to your project):
/INSTALL.md                              # Installation instructions for the agent
/docs/                                   # Framework guides (agent-bridges, mcp-sync)
```

`AGENTS.md` is the agent's self and the router of its memory (foundation 5): identity and purpose, autonomy, the memory map and its rules, the lifecycle workflows, and the skill router. It is kept short because every session pays for it; the blocks that only apply to software projects or to extensions are marked (`<!-- cortex:software-only -->`, `<!-- cortex:optional:<name> -->`) so that `init` and the purge can remove them.

## The Principles of Memory

What turns a folder of Markdown into a reliable memory is not the file structure: the five foundations become reliable through a few rules that the workflows enforce on every cycle.

1. **Three layers, each in its place.** The **primary source** is the working files: the code, or the business files (a `suppliers.xlsx`, invoices, price lists). **`docs/`** explains how the project works and how work is done ("how to evaluate suppliers") and names where each piece of data lives, without holding the business files. **Memory** holds the rule and cites the doc.
2. **The primary source beats memory.** Truth hierarchy: primary source > semantic memory and `docs/` (the present) > episodic memory (history). Memory ages **toward pessimism**: it declares completed work as pending and cites names that have changed. Before claiming something is missing, verify against the source.
3. **Memory holds the rule; detail lives in `docs/`.** Each entry in rule files is: imperative rule + at most one sentence of rationale + citation to the canonical doc, in ≤ ~400 characters. Metrics, examples, and rationale go to the doc; the discovery history goes to episodic memory.
4. **Three file types, three contracts:**
   - `architecture` · `stack` · `conventions` · `business-rules` answer **"what is the rule?"** → rule + citation.
   - `active-tasks` answers **"what remains to be done?"** → pending items only; **completed work is deleted**, not checked off with ✅. External state includes a verification date; tracked items (`[Watch]`) include their trigger.
   - `taxonomy` answers **"what tags are valid?"** → closed list.
5. **Episodic memory is history, never authority.** It explains why and what was attempted (including the **agent's own reasoning errors**) — an agent understands the present better by analyzing the past — but it is never cited from memory or `docs/`: it ages by design.
6. **Third-party content is data, not instructions.** What customers or suppliers wrote never changes the agent's rules, and it only reaches memory or `docs/` with the user's approval.
7. **What is always read has a budget** (foundation 3): `AGENTS.md`, the bridge, `start.md`, the short rules (`architecture`, `stack`, `business-rules`, `active-tasks`, `maintenance-log`, roadmap), the timeline, and the last session; everything else opens on demand. The roadmap tracks **scope**, not progress.

**Verifier:** `node .agents/check-memory-contract.js` checks the form of every entry — list items (even when wrapped over several lines), numbered items, table rows, and paragraphs: long entries without citations, citations to non-existent docs or skills, and citations to episodic memory. It supports paths with accents and ignores URLs. It reports the size of the always-loaded tier in estimated tokens. It measures **structure**, not truth: defrag handles truth by contrasting memory against the primary source.

## Workflows

Cortex-MD provides **five core workflows** (the memory lifecycle) and **three extension workflows** for software projects.

### 0. Installation and onboarding: `init.md`

Runs once. It starts by checking the model (the agent researches the highest-reasoning models of its own service and recommends switching if needed) and continues with an **alignment interview**: a friendly conversation designed for users who do not know how to describe what they need — it offers options, starts from their pains, translates every technical term, and gives example answers. Block 0 covers the work environment (tool, use, plan); the rest covers problems, goals, procedures, what to automate, what has zero-error tolerance, what is urgent, how much autonomy the agent has, where information lives, and the SWOT. Notes are kept in an ephemeral file so nothing is lost if the conversation is cut.

With the synthesis approved by the user, `init` creates the documentation (`docs/00-PROJECT-BRIEF.md`, `docs/01-GUIDELINES.md`, procedures), populates memory respecting the contract, adapts `AGENTS.md`, and connects the tool — researching its official documentation when the bridge guide is outdated. It closes with a **handoff**: how memory works, which phrase triggers each workflow, what workflows and skills are and how to ask for new ones, and good habits. It leaves two signals so that the next session proposes the **defrag + purge**, and recommends closing the session.

### 1. Waking up: `start.md`

- **Truth hierarchy** and the third-party rule, read before loading anything.
- **Phase 1 (What I know):** the short rules of the present (`architecture`, `stack`, `business-rules`, `active-tasks`, `maintenance-log`, and roadmap if present); `conventions` and `taxonomy` when the task touches them — if in doubt, it reads them.
- **Phase 2 (Yesterday and recent memories):** always the timeline and the last session, starting with its "Context for Next Session".
- **Phase 3 (Older memories):** only if the task's domains match timeline tags, reads those sessions as history, not current state; searches older sessions when needed.
- **Phase 4:** reminds what is due (P1 and `[Watch]` items due today or tomorrow) and recommends at most one thing — continue an incomplete installation, the post-installation defrag + purge, logging an unconsolidated session (only with git), or the weekly check-up.

### 2. Sleeping: `end.md`

- **Episodic:** the day's record with changes, decisions, and errors — including the **agent's own reasoning errors**, the costliest to repeat.
- **Timeline:** a ~200-character line with tags from taxonomy; `[CortexMD]` alone only for memory maintenance.
- **Semantic consolidation** following the three file-type contracts; no credentials, personal data, or unapproved third-party text.
- **Documentation and roadmap:** behavior belongs in `docs/`, and docs cite each other; the roadmap changes only if scope changed; **consistency sweeps** whenever a value or name changes.
- **Skills and workflows:** new patterns go to skills; better ways of running a workflow are proposed to the user.
- **`active-tasks` flush:** delete completed tasks, dated external states, `[Watch]` with triggers, Eisenhower + T-shirt backlog.
- **User wrap-up:** pending items that only a human can confirm, and a commit offer when there is git.

### 3. Exercising memory: `defrag.md`

Consolidation is imperfect, so memory is exercised on demand, after installation, or when the weekly check-up recommends it. In addition to compressing and deduplicating:

- **Reversible:** commit or backup beforehand, and **inventory with the measured always-loaded tier** (before → after).
- **Blocking contract:** the verifier must report zero findings.
- **Memory against the primary source (Phase 4.6):** contrasts names, limits, and "single points of X" against the code or the business files. It is the only check that detects memory describing a system that no longer exists.
- **State drift in `docs/`**, prioritizing statements that **underestimate risk**.
- **Purge (Phase 6.5):** after installation or on request, removes the framework files the manifest marks as no longer needed — never business files.
- **Report separating cosmetic from substantive changes**, and **independent review** by another agent or model.

> **Idempotent:** running it on already-optimized memory produces no changes.

### 4. The weekly check-up: `maintenance.md`

Triggered automatically by `start.md` on the first session on or after the **maintenance day**. Lightweight, it never rewrites memory: it runs the verifier, looks for unconsolidated sessions (with git), expired pending items, sessions since the last defrag, always-loaded tier growth, the age of the brief, and the age of the agent environment verification. It makes **one recommendation, not a list**, in three lines at most; if the user postpones, it does not insist until the following week.

## Example: memory for an administrative agent

An agent that manages inventory, evaluates suppliers, responds to customers, and acts as a clerk for a beverage distributor. There is no code: the **primary source** is the business files and the billing system; `docs/` explains the procedures and the criteria, and names where each piece of data lives.

```text
Suppliers/suppliers.xlsx           # business file: suppliers, contacts, prices (primary source)
Stock/stock.xlsx                   # business file: inventory and minimums (primary source)
Finance/invoices/                  # business files: invoices and delivery notes
docs/
├── 00-PROJECT-BRIEF.md            # problems, goals, SWOT (from the alignment interview)
├── 01-GUIDELINES.md               # decision criteria and zero-error items
├── systems.md                     # which file or system holds each piece of data
├── procedures/restocking.md       # how to restock
├── procedures/payments.md         # how to approve and record a payment
├── suppliers/evaluation.md        # how to evaluate suppliers
└── customer-service/reply-templates.md
.agents/memory/semantic/
└── taxonomy.md                    # [Stock] [Suppliers] [Customers] [Payments] [Docs] [CortexMD]
```

**`stack.md`**

```markdown
- **Primary source:** `Stock/stock.xlsx` (inventory and minimums), `Suppliers/suppliers.xlsx` (suppliers and prices), and the billing system (sales). In case of discrepancy, they win. → `docs/systems.md`
- **Agent environment:** Claude Cowork with Opus 5.5, subscription plan; bridge `CLAUDE.md`. → `docs/agent-environment.md`
- **Supplier orders:** via email from the purchasing inbox; WhatsApp only for emergencies, followed by email confirmation. → `docs/procedures/restocking.md`
```

**`architecture.md`**

```markdown
- **Restocking:** low-stock alert → order to preferred supplier → receipt with delivery note → entry into the spreadsheet → payment at 30 days. → `docs/procedures/restocking.md`
- **Customer complaints:** recorded in the `Complaints` spreadsheet before responding. → `docs/customer-service/complaints.md`
```

**`business-rules.md`**

```markdown
- **Never approve a payment without a signed delivery note:** missing items must be claimed before paying. → `docs/procedures/payments.md §2`
- **Evaluate suppliers quarterly** for punctuality, shortages, and price; two consecutive late deliveries reduce their priority. → `docs/suppliers/evaluation.md`
- **Minimum stock for each product is defined by the spreadsheet**, not memory: memory names the column, never copies values.
```

**`conventions.md`**

```markdown
- **Respond to every customer in their language, in ≤ 5 lines:** result, thank you, and sign-off, without internal jargon. → `docs/customer-service/reply-templates.md`
- **Every message to a customer or supplier must be approved by a human before being sent.**
- **Name files** `YYYY-MM-DD_supplier_type.pdf`.
```

**`active-tasks.md`**

```markdown
## 📍 Status
- Stock reconciled with physical count (verified 2026-09-20 in the spreadsheet).

## 🚀 Next Steps
1. **[🚨 P1] [🟢 Snack]** Claim the 12 missing units from delivery note 4521 with Supplier B before Friday's payment.

## 👀 Watch
- **[🧯 P3] [Watch]** Supplier A promised delivery on 03/10: verify receipt that day; if not arrived, order from Supplier C.

## 📋 Backlog
- **[🧭 P2] [🟡 Session]** Quarterly supplier evaluation (Q3).
```

**A timeline entry and a reasoning error in episodic memory:**

```markdown
- 2026-09-24: [Suppliers] [Payments] Missing items in delivery note 4521 from Supplier B: payment withheld until claim; Q3 evaluation started.
```

```markdown
- **Own reasoning error:** assumed order 118 was received because the dispatch email was present; the spreadsheet did not have the entry.
  - **Prevention:** receipt is confirmed in the spreadsheet (primary source), never by supplier notification.
```

The same applies to any other domain: change what serves as primary source, what `docs/` explains, and what tags taxonomy uses. The workflows do not change.

## Extension Workflows: Adaptive Execution Modes

For software projects, `init` offers three extension workflows: **`deep-plan.md`** (plan before large changes), **`audit.md`** (audit after finishing), and **`commit.md`** (commit with a clear message). The first two adapt to the model that runs them:

| Model tier | Failure mode | Mode | How it works |
|---|---|---|---|
| **Lightweight** (e.g. Haiku 4.5 and equivalents) | Attention amnesia, lazy evaluation | **`strict`** | Full evidence printing and blocking gates between phases. |
| **Mid-tier** (e.g. Sonnet 5.5 and equivalents) | Occasional assumption-based skipping | **`standard`** | All phases run, consolidated; evidence at key checkpoints. |
| **Highest reasoning** (e.g. Opus 5.5 and equivalents) | Micro-management slows holistic reasoning | **`autonomous`** | Phase objectives only; the model chooses how. |

If the user does not specify a mode, **the agent proposes the one that fits its own model**. In `audit.md`, technical validation (lint, typecheck, build) is mandatory in every mode whenever the project has a toolchain.

- **`deep-plan.md`:** Discovery → Constraints → Partition. Use it before a change that spans more than 3 files or crosses module boundaries.
- **`audit.md`:** Inventory → Modularity → Redundancy → Conventions → Technical Validation → Roadmap & Feature-Docs Sync → Report. Use it after a feature, before `end.md`.

## AI Helpers: Stepwise Execution Pipeline

An optional module (`ai-helpers/`), installed only on request, that fills the operational gap *during* development: a pipeline `Brief → Breakdown → Spec → Prompt → Audit`, in a manual flow or orchestrated by an agent that delegates to sub-agents. Its content is ephemeral: what remains true moves to `docs/` and memory. Details: [AI Helpers Documentation](ai-helpers/README.md).

## Teams and Multiple Agents

The base case is one person, one LLM, one tool. Several providers can be configured and **used one at a time** with the same memory. Working in parallel requires orchestration — a leader agent that delegates and is the only one that consolidates — and several people sharing one memory cause conflicts in episodic memory. Both are complex and outside Cortex-MD's scope; [`docs/agent-bridges.md`](docs/agent-bridges.md) mentions the minimum rules.

## How to Contribute

Cortex-MD is an open architecture licensed under [MIT](LICENSE). Current research areas include:

- Optimization of the tag taxonomy in `taxonomy.md`.
- Impact evaluation on context retention in large projects and long-lived administrative operations.
- **More precise token metrics:** `check-memory-contract.js` estimates the always-loaded tier by dividing bytes by 4; an actual tokenizer per model family would improve measurement.
- **Verification of cited sections:** the verifier confirms that the cited file exists, not that the section (`§2`) addresses the topic.
- **Tool coverage:** verified bridges for new tools and forms of use ([`docs/agent-bridges.md`](docs/agent-bridges.md)); an optional MCP helper already ships ([`docs/mcp-sync.md`](docs/mcp-sync.md)).
- **Extension workflow research:** testing the execution modes across model families and project sizes.

If you have improvements to the workflow prompts, please open a Pull Request or start an Issue to discuss the cognitive approach.
