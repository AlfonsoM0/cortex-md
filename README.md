# Cortex-MD: Continuous Memory System for LLMs in Code Repositories

Cortex-MD is a persistent memory framework built entirely on Markdown files. It is designed to solve **"session amnesia"** and **"context bloat"** in Large Language Models (LLMs) operating within complex software development environments (such as Claude Code, Cursor, Gemini CLI, or custom agents).

The system emulates the memory structures of the human brain, separating information into **semantic memory** (global project state) and **episodic memory** (indexed chronological records), drastically optimizing token usage and preventing hallucinations caused by context loss.

**Born for software development, but useful for any agent working continuously:** inventory tracking, supplier evaluation, secretarial work, customer support, research. The workflows refer to the **primary source** — the code in a repository, the system of record (spreadsheet, ERP, CRM) in an administrative operation — and to a **canonical knowledge base** in `docs/`. See the [example of an administrative agent](#example-memory-for-an-administrative-agent).

> 🌐 [Leer en Español (README.es.md)](README.es.md)

## Why Cortex-MD?

- **🧠 Solves a real problem:** Session amnesia is the #1 pain point reported by developers using AI coding assistants. Cortex-MD provides a structured solution without external dependencies.
- **📦 Zero dependency:** No servers, no databases, no APIs. Just Markdown files that live in your repository, version-controlled with Git.
- **🔄 Provider agnostic:** Works natively with Claude, GPT-4o, Gemini, or any local open-source model. Switch between models without losing project memory.
- **🧩 Complements `AGENTS.md`:** Does not replace the industry standard — it extends the [AGENTS.md convention](https://agents.md) (Linux Foundation) by adding temporal memory and lifecycle workflows.
- **🧬 Memorable cognitive metaphor:** Built around neuroscientific concepts (Neocortex, Hippocampus, Prefrontal Cortex) that make the architecture intuitive and easy to reason about.

## Quick Start

### Option A: Let your agent install it (recommended)

In your usual tool (Claude Code, Cursor, Codex CLI, Gemini CLI, or any other), paste this message to your agent:

```text
Read the Cortex-MD framework at https://github.com/AlfonsoM0/cortex-md (start with INSTALL.md) and install its memory system in this workspace. Then run its init workflow.
```

The agent downloads the framework, copies only what is needed in your language, connects your tool, and begins an **alignment interview**: a conversation to understand your project before writing memory. The instructions it follows are in [`INSTALL.md`](INSTALL.md).

### Option B: Manual installation

1. **Copy the structure** to your project ([`INSTALL.md`](INSTALL.md) details what to copy):

   ```bash
   git clone --depth 1 https://github.com/AlfonsoM0/cortex-md.git /tmp/cortex-md
   cp -r /tmp/cortex-md/.agents/ your-project/.agents/
   cp /tmp/cortex-md/AGENTS.md your-project/AGENTS.md
   ```

2. **Connect your tools.** Memory only works if every session loads it: each tool must **read `AGENTS.md` at launch**, **execute `start.md` before responding**, and **not use its own memory in parallel**. Codex CLI reads `AGENTS.md` natively; **Claude Code** does not (it loads `CLAUDE.md`), so it needs a bridge file and supports a session start hook; Gemini CLI, Cursor, Aider, and Copilot are configured pointing to `AGENTS.md`. Ready-to-copy snippets: [`docs/agent-bridges.md`](docs/agent-bridges.md).

3. **Run the bootstrap:** ask your agent _"Read and execute `.agents/workflows/init.md`"_.

### Day-to-day: you don't have to remember anything

- **At the start**, the agent loads memory automatically (`start.md`) and, if the previous session closed without saving, offers to log it.
- **At the end**, when you say "done" or "thanks", it offers to save learnings (`end.md`).
- **Once a week** — on the day you chose in the interview; default: **Friday** —, it runs a lightweight memory check (`maintenance.md`) and proposes, only if needed, a cleanup, deep optimization (`defrag.md`), or a new alignment conversation. Nothing is modified without your consent.

## Recommended Environment: Direct API + Agentic Extensions

For maximum performance and cost-efficiency with Cortex-MD, we recommend using **agentic tools connected directly to model APIs** rather than standard chat interfaces or commercial subscription-based IDEs.

- **Prompt Caching Efficiency (Start):** Cortex-MD injects constant static context (`architecture.md`, `stack.md`, etc.) at the start of each session. By using modern APIs, this context is cached, **dropping token read costs drastically** (often by more than 90%). Commercial tools cannot always guarantee predictable control over this cache, rapidly consuming premium usage quotas.
- **Autonomous Memory Updates (End):** The end-of-session cycle demands autonomous reading and writing across multiple files (`YYYY/MM/DD.md`, `timeline.md`, etc.). An agentic extension has granular permissions to manage the local file system and stage commits. Traditional chat interfaces often force manual copying, pasting, and file creation.
- **Intact Context Windows:** Architectural planning requires the full context window (many models today offer hundreds of thousands of tokens). A raw API connection gives you 100% of this capacity without the compression or silent information discarding that some tools apply in the background to save costs.
- **Strict Workflow Execution:** The protocol requires rigorous audits and validations. A well-configured autonomous agent enforces instruction compliance without drifting. Closed tools sometimes prioritize speed, which often causes the model to "forget" or ignore long system instructions.

For an optimal implementation, simply connect your own API key to your preferred agentic extension and point the agent to read `AGENTS.md` at the root of your repository.

## Neuroscientific Foundations

Pre-trained LLMs lack neuroplasticity; they cannot alter their parametric weights to remember a conversation from yesterday. To mitigate this, Cortex-MD structures an "external brain" (exocortex) using the repository's file system:

- **Prefrontal Cortex (Context Window):** Kept clean and strictly focused on the current task.
- **Neocortex (Semantic Memory):** Stores the "state of things" (architecture, conventions, business rules, stack, and taxonomy). It is not a historical record — it is the absolute and current truth of the project. Divided into multiple modular files to scale without generating _context bloat_.
- **Hippocampus (Episodic Memory):** Stores the daily record of actions and reasoning (linked to Git commits), efficiently indexed in a limited timeline (last 50 sessions) for rapid retrieval when deep context is needed.

## Directory Architecture

Cortex-MD integrates within the standard `.agents/` convention (based on [Anthropic](https://docs.anthropic.com) and [AGENTS.md](https://agents.md) conventions) for AI agents in repositories. The `.agents/` directory is a scalable and standardized space; Cortex-MD contributes the `memory/` folder and the lifecycle workflows:

```text
/.agents/                              # Standard directory for AI agents
├── skills/                            # (Convention) Reusable skills (instructions + code)
│   └── ...
├── workflows/                         # Agent orchestration flows
│   ├── init.md                        # ★ Core: First-time bootstrap ("Onboarding")
│   ├── references/
│   │   └── alignment-interview.md     # ★ Core: Alignment interview question bank
│   ├── start.md                       # ★ Core: Session start ("Wake Up")
│   ├── maintenance.md                 # ★ Core: Automated weekly check (lightweight)
│   ├── end.md                         # ★ Core: Session end ("Sleep")
│   ├── defrag.md                      # ★ Core: Memory optimization and verification ("Defrag")
│   ├── deep-plan.md                   # ★ Extension: Deep planning with Proof of Work
│   ├── audit.md                       # ★ Extension: Post-feature audit with evidence
│   └── commit.md                      # ★ Optional: stage review + intentful commit
├── memory/                            # ★ Cortex-MD: Persistent memory system
│   ├── semantic/                      #   Neocortex: Global project state
│   │   ├── taxonomy.md                #     Strict tag taxonomy for the index
│   │   ├── architecture.md            #     Design patterns and module structure
│   │   ├── stack.md                   #     Technologies, libraries, and key dependencies
│   │   ├── conventions.md             #     Code conventions and style
│   │   ├── business-rules.md          #     Business logic and domain rules
│   │   └── active-tasks.md            #     Working memory: tasks in progress
│   ├── maintenance-log.md             #   Dates of weekly check, last defrag, and brief review
│   └── episodic/                      #   Hippocampus: Indexed chronological record
│       ├── timeline.md                #     Quick search index by [Tags] (max 50 sessions)
│       └── YYYY/
│           └── MM/
│               ├── DD.md              #     Detailed session record (changes, decisions, errors)
│               └── DD-s2.md           #     Second session of the same day
├── check-memory-contract.js           # ★ Cortex-MD: memory contract verifier (Node, zero dependencies)
├── .mcp.json                          # (Convention) Local MCP server configuration
├── sync-mcp.js                        # ★ Optional (MCP module): generate per-IDE configs from one source
├── mcp_config.json                    # ★ Optional (MCP module): canonical server list (placeholders, no secrets)
├── mcp_config.zoo-overrides.json      # ★ Optional (MCP module): per-IDE overrides example
└── backups/                           # Without git only: memory backups before each defrag (3 most recent)

/AGENTS.md                             # Base instructions, loaded in every session
/ai-helpers/                           # ★ Optional: Stepwise Execution Pipeline module
/docs/                                 # Canonical knowledge base for YOUR project: the detail memory cites

# Framework repository only (not copied to your project):
/INSTALL.md                            # Installation instructions for the agent
/docs/                                 # Framework guides (agent-bridges, mcp-sync, multi-dev)
```

Additionally, `AGENTS.md` is located at the **repository root**. It acts as the entry point (_system prompt_) that the IDE automatically injects into the agent, and is responsible for directing the LLM to Cortex-MD's workflows. It also hosts the **Skill Router** (a categorized, on-demand index of the project's skills) and the **inviolable rules** (strict modularity & anti-redundancy) — guardrails that must stay in the always-loaded context, since `conventions.md` and skills are loaded only selectively. This follows the [AGENTS.md standard](https://agents.md) adopted by 60k+ open-source projects and supported by tools like Codex, Jules, Cursor, VS Code Copilot, and many more.

## The Principles of Memory

What turns a folder of Markdown into a reliable memory is not the file structure: it is five rules that the workflows enforce on every cycle.

1. **The primary source beats memory.** Truth hierarchy: primary source (code, system of record) > semantic memory > episodic memory. Memory ages **toward pessimism**: it declares completed work as pending and cites names that have changed. Before claiming something is missing, verify against the source.
2. **Memory holds the rule; detail lives in `docs/`.** Each entry in rule files is: imperative rule + at most one sentence of rationale + citation to the canonical doc, in ≤ ~400 characters. Metrics, examples, and rationale go to the doc; the discovery history goes to episodic memory. This keeps the memory read in every session lean without losing anything.
3. **Three file types, three contracts:**
   - `architecture` · `stack` · `conventions` · `business-rules` answer **"what is the rule?"** → rule + citation.
   - `active-tasks` answers **"what remains to be done?"** → pending items only; **completed work is deleted**, not checked off with ✅. External state includes a verification date; tracked items (`[Watch]`) include their trigger.
   - `taxonomy` answers **"what tags are valid?"** → closed list.
4. **Episodic memory is history, never authority.** It explains why and what was attempted (including the **agent's own reasoning errors**), but is never cited from memory or `docs/`: it ages by design.
5. **What is always read has a budget.** `start.md` loads an always-loaded tier (`architecture`, `stack`, `active-tasks`, roadmap) paid every session; everything else opens on demand. The roadmap tracks **scope**, not progress.

**Verifier:** `node .agents/check-memory-contract.js` checks formatting (long entries without citations, citations to non-existent docs, citations to episodic memory) and reports the size of the always-loaded tier in estimated tokens. It measures **structure**, not truth: defrag handles truth by contrasting memory against the primary source.

## Workflows

Cortex-MD provides **five core workflows** (the memory lifecycle) and **two extension workflows** (development methodology):

### 0. First-time bootstrap: `init.md`

Run once when adopting Cortex-MD, and starts with an **alignment interview**: a friendly conversation in which agent and user agree on what problems the project solves, what goals it pursues and how success is measured, what current procedures look like and which to automate, what tasks have zero-error tolerance and which are urgent, how much autonomy the agent has, where information lives, and what its SWOT is. The question bank (`references/alignment-interview.md`) combines proven practices — project kickoff, pre-mortem, automation criteria, autonomy levels based on how easy a task is to verify and undo — and indicates which document or memory file each answer goes to.

With the synthesis approved by the user, `init` creates the canonical documentation (`docs/00-PROJECT-BRIEF.md`, `docs/01-GUIDELINES.md`, procedures), populates memory respecting the contract, adapts `AGENTS.md` (context, autonomy, communication) and taxonomy, and connects tools so every session loads memory. The interview is partially repeated when the project changes stages (**re-alignment**).

### 1. The "Wake Up" cycle: `start.md`

- **Truth hierarchy:** read before loading anything.
- **Phase 1 (Semantic loading):** always loads the always-loaded tier (`architecture`, `stack`, `active-tasks`, and roadmap if present); `conventions`, `business-rules`, and `taxonomy` based on the task. Memory gives the rule: cited docs open when the task calls for them.
- **Phase 2 (Hippocampal routing):** searches `timeline.md` for tags matching the task's domains.
- **Phase 3 (Episodic retrieval):** only if matches are found, reads those days (including `DD-sN.md`) as history, not current state.

### 2. The "Sleep and Consolidation" cycle: `end.md`

- **Pre-consolidation hygiene** and, in multi-agent teams, **only the lead consolidates**.
- **Episodic:** the day's record with changes, decisions, and errors — including the **agent's own reasoning errors**, the costliest to repeat.
- **Timeline:** a ~200-character line with tags from taxonomy (max 50 sessions).
- **Semantic consolidation** following the three file-type contracts; no credentials or personal data.
- **Documentation and roadmap:** behavior belongs in `docs/`; roadmap changes only if scope changed; **consistency sweeps** whenever a value or name changes.
- **Skills** with the External Skills Guard.
- **`active-tasks` flush:** delete completed tasks (verifying first that their detail lives in `docs/`), dated external states, `[Watch]` with triggers, Eisenhower + T-shirt backlog.
- **User wrap-up:** list pending items that only a human can confirm, so they can dismiss anything no longer applicable.

### 3. Memory Defragmentation: `defrag.md`

On demand, every 15-20 sessions. In addition to compressing and deduplicating:

- **Pre-defrag commit** to ensure reversibility, and **inventory with measured always-loaded tier** (before → after).
- **Blocking contract:** the verifier must report zero findings.
- **Memory against primary source (Phase 4.6):** contrasts names, boundaries, and "single points of X" against code or the system of record. This is the only check that detects memory describing a system that no longer exists — and the most valuable part of the report.
- **State drift in `docs/`:** assertions that time has rendered false, prioritizing those that **underestimate risk**.
- **Knowledge system:** skill router, dead paths, updating external skills without overwriting project-specific files.
- **Hygiene:** sensitive data kept outside version control.
- **Report separating cosmetic from substantive changes**, and **independent review** of the diff by another agent or model before committing.

> **Idempotent:** running it on already-optimized memory produces no changes.

### 4. Weekly Check: `maintenance.md`

The user does not need to know when to optimize memory or re-align: this check decides, triggered automatically by `start.md` on the first session on or after the **maintenance day** (chosen by the user in `init`; default: Friday). Since the agent has no clock between sessions, if no work happens on that day, it runs on the following session.

- **Lightweight without rewriting memory:** runs the verifier, checks for unconsolidated sessions (via commits or, without git, modified files), expired pending items or tasks marked done, sessions since the last defrag, always-loaded tier growth, and brief age.
- **One recommendation, not a list:** consolidate, clean up, **defrag only when needed** (≥ 15 sessions, always-loaded tier +25%, verifier findings, or > 60 days), quick brief review (> 90 days), or re-alignment upon signs of change.
- **Propose, never impose:** three lines at most; if the user postpones, it does not insist until the following week. Its state lives in `.agents/memory/maintenance-log.md`.

## Example: memory for an administrative agent

An agent that manages inventory, evaluates suppliers, responds to customers, and acts as a clerk for a wholesale business. There is no code: the **primary source** is the inventory spreadsheet and the billing system, and `docs/` stores procedures and supplier profiles.

```text
.agents/memory/semantic/
├── stack.md            # systems in use and which is the primary source
├── architecture.md     # functional areas and workflows
├── conventions.md      # house style
├── business-rules.md   # business rules
├── active-tasks.md     # pending items, with dated state
└── taxonomy.md         # [Stock] [Suppliers] [Customers] [Payments] [Calendar] [Docs] [CortexMD]
docs/
├── 00-PROJECT-BRIEF.md            # problems, goals, SWOT (from alignment interview)
├── 01-GUIDELINES.md               # decision criteria and zero-error items
├── procedimientos/reposicion.md
├── procedimientos/pagos.md
├── proveedores/evaluacion.md
└── atencion/respuestas-tipo.md
```

**`stack.md`**

```markdown
- **Primary source:** `Stock` spreadsheet (inventory and minimums) and the billing system (sales and receipts). In case of discrepancy, they win. → `docs/sistemas.md`
- **Supplier orders:** via email from the purchasing inbox; WhatsApp only for emergencies, followed by email confirmation. → `docs/procedimientos/reposicion.md`
```

**`architecture.md`**

```markdown
- **Restocking:** low-stock alert → order to preferred supplier → receipt with delivery note → entry into spreadsheet → payment at 30 days. → `docs/procedimientos/reposicion.md`
- **Customer complaints:** recorded in the `Reclamos` spreadsheet before responding. → `docs/atencion/reclamos.md`
```

**`business-rules.md`**

```markdown
- **Never approve a payment without a signed delivery note:** missing items must be claimed before paying. → `docs/procedimientos/pagos.md §2`
- **Evaluate suppliers quarterly** for punctuality, shortages, and price; two consecutive late deliveries reduce their priority. → `docs/proveedores/evaluacion.md`
- **Minimum stock for each product is defined by the spreadsheet**, not memory: memory names the column, never copies values.
```

**`conventions.md`**

```markdown
- **Respond to every customer in their language, in ≤ 5 lines:** result, thank you, and sign-off, without internal jargon. → `docs/atencion/respuestas-tipo.md`
- **Every message to a customer or supplier must be approved by a human before being sent.**
- **Name files** `AAAA-MM-DD_proveedor_tipo.pdf`.
```

**`active-tasks.md`**

```markdown
## 📍 Status
- Stock reconciled with physical count (verified 2026-09-20 in spreadsheet).

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
- **Own reasoning error:** assumed order 118 was received because dispatch email was present; spreadsheet did not have the entry.
  - **Prevention:** receipt is confirmed in the spreadsheet (primary source), never by supplier notification.
```

The same applies to any other domain: change what serves as primary source, what `docs/` stores, and what tags taxonomy uses. The workflows do not change.

## Extension Workflows: Adaptive Execution Modes

While the five core workflows manage the memory lifecycle, Cortex-MD also provides **extension workflows** that adapt to the capabilities of the model executing them. They solve two problems simultaneously:

1. **Quality degradation** when lightweight models (Haiku, Flash, mini) process complex engineering tasks.
2. **Latency overhead** when heavyweight models (Opus, o1) are forced through unnecessary micro-management steps.

### The Problem Spectrum

Different models fail in different ways:

| Model Tier | Failure Mode | Root Cause |
|---|---|---|
| **Lightweight** (Haiku, Flash, mini) | Attention amnesia, lazy evaluation, context hallucination | Limited FLOPs per token — can't resolve complexity in latent space |
| **Mid-tier** (Sonnet, GPT-4o, Gemini Pro) | Occasional assumption-based skipping | Sufficient depth but can drift without checkpoints |
| **Heavyweight** (Opus, o1, Deep Research) | Latency penalty, suppressed holistic reasoning | Micro-management blocks parallel architectural thinking |

### The Solution: Three Execution Modes

Each extension workflow supports **three modes** that the user selects at invocation time (e.g., "Create a strict plan", "Run an autonomous audit"). If the user doesn't specify, the agent asks.

| Mode | Trust Level | For Models Like | How It Works |
|---|---|---|---|
| **`strict`** | Low — externalize everything | Haiku, Flash, mini | Full evidence printing. Blocking gates between phases. Every claim requires printed tool output. Designed to compensate for limited reasoning depth. |
| **`standard`** | Medium — trust with checkpoints | Sonnet, GPT-4o, Gemini Pro | All phases execute but may be consolidated. Evidence required at key checkpoints, not everywhere. Balanced speed and rigor. |
| **`autonomous`** | High — trust the model's judgment | Opus, o1, Deep Research | Holistic execution. The model receives phase objectives but chooses how to achieve them. Maximum speed and architectural depth. |

> **Non-negotiable across all modes:** The Technical Validation gateway (lint, typecheck, build) is always mandatory and blocking. No model — regardless of capability — can skip objective compiler verification.

### 5. Deep Planning: `deep-plan.md`

A structured planning workflow with three phases (Discovery → Constraints → Partition) that adapts its rigor:

- **`strict`:** Printed search results, blocking gates between phases, stages of max 3-5 files.
- **`standard`:** Consolidated summaries, no blocking gates, stages up to 8-10 files.
- **`autonomous`:** Holistic analysis, phases may be combined, monolithic plans permitted if justified.

> **When to use it:** Before implementing any feature that spans more than 3 files or crosses module boundaries.

### 6. Post-Feature Audit: `audit.md`

An evidence-based validation workflow with seven phases (Inventory → Modularity → Redundancy → Conventions → Technical Validation → Roadmap & Feature-Docs Sync → Report):

- **`strict`:** Grep output for every check, line counts for every file, printed evidence at every phase.
- **`standard`:** Evidence printed only for findings and threshold violations. Summary format.
- **`autonomous`:** Holistic evaluation with tools used only for uncertainty areas. Only the gateway phase is mandatory.

> **When to use it:** After completing any feature or significant block of work, before memory consolidation (`end.md`).

## AI Helpers: Stepwise Execution Pipeline

While Cortex-MD excels at managing global memory and episodic context, it doesn't prescribe how to do the actual coding *during* the session. The **AI Helpers** module (`ai-helpers/`) fills this operational gap.

The module supports **three work modes**:

- **Manual Flow:** The user controls each step of the pipeline (`Brief → Breakdown → Spec → Prompt → Audit`).
- **Orchestrated Flow:** An Orchestrator agent executes the complete cycle, delegating to specialized sub-agents (Architect, Code, Debug).
- **Independent:** The main agent manages the task directly using global workflows (`/deep-plan`, `/audit`), without the stepwise pipeline.

The `01-brief/` folder acts as an **idea backlog**, allowing multiple briefs to accumulate in parallel. Consolidation into episodic memory (via `end.md`) is **the user's explicit decision**, rather than automatic, enabling the grouping of multiple PRs under a single session.

For full details, read the [AI Helpers Documentation](file:///home/alfonsom0/repos/cortex-md/ai-helpers/README.md).

## Multi-Developer Scalability

When working in teams with more than one developer, using Cortex-MD out-of-the-box can lead to Git merge conflicts in the episodic memory files (`timeline.md` and `YYYY/MM/DD.md`).

To solve this, the architecture can be divided into two layers:
1. **Centralized Neocortex (Project Repo):** Semantic memory shared by the team.
2. **Distributed Hippocampus (Personal Memory Repo):** An independent repository for each developer's daily episodic logs.

For setup instructions, read the [Multi-Developer Guide](file:///home/alfonsom0/repos/cortex-md/docs/multi-dev-guide.md).

## How to Contribute

Cortex-MD is an open architecture licensed under [MIT](LICENSE). Current research areas include:

- Optimization of the tag taxonomy in `taxonomy.md`.
- Creation of automation scripts (Bash/Node.js) to initialize the folder structure. _(An optional Node helper, `sync-mcp.js`, already ships to generate per-IDE MCP configs from one canonical source — see [docs/mcp-sync.md](docs/mcp-sync.md).)_
- Impact evaluation on context retention in projects with over 100k lines of code.
- **More precise token metrics:** `check-memory-contract.js` estimates the always-loaded tier by dividing bytes by 4; an actual tokenizer per model family would improve measurement.
- **Verification of cited sections:** the verifier confirms that the cited file exists, not that the section (`§2`) addresses the topic.
- **Extension workflow research:** Testing and refining the Proof of Work methodology across different model families (Claude, GPT, Gemini, open-source) and project sizes.

If you have improvements to the workflow prompts, please open a Pull Request or start an Issue to discuss the cognitive approach.
