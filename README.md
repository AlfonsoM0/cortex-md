# Cortex-MD: Continuous Memory System for LLMs in Code Repositories

Cortex-MD is a persistent memory framework built entirely on Markdown files. It is designed to solve **"session amnesia"** and **"context bloat"** in Large Language Models (LLMs) operating within complex software development environments (such as Claude Code, Cursor, Gemini CLI, or custom agents).

The system emulates the memory structures of the human brain, separating information into **semantic memory** (global project state) and **episodic memory** (indexed chronological records), drastically optimizing token usage and preventing hallucinations caused by context loss.

> 🌐 [Leer en Español (README.es.md)](README.es.md)

## Why Cortex-MD?

- **🧠 Solves a real problem:** Session amnesia is the #1 pain point reported by developers using AI coding assistants. Cortex-MD provides a structured solution without external dependencies.
- **📦 Zero dependency:** No servers, no databases, no APIs. Just Markdown files that live in your repository, version-controlled with Git.
- **🔄 Provider agnostic:** Works natively with Claude, GPT-4o, Gemini, or any local open-source model. Switch between models without losing project memory.
- **🧩 Complements `AGENTS.md`:** Does not replace the industry standard — it extends the [AGENTS.md convention](https://agents.md) (Linux Foundation) by adding temporal memory and lifecycle workflows.
- **🧬 Memorable cognitive metaphor:** Built around neuroscientific concepts (Neocortex, Hippocampus, Prefrontal Cortex) that make the architecture intuitive and easy to reason about.

## Quick Start

### 1. Copy the structure into your project

Copy the `.agents/` directory and `AGENTS.md` from this repository into the root of your project:

```bash
# Clone and copy
git clone https://github.com/YOUR_USER/cortex-md.git /tmp/cortex-md
cp -r /tmp/cortex-md/.agents/ your-project/.agents/
cp /tmp/cortex-md/AGENTS.md your-project/AGENTS.md
```

### 2. Run the initial bootstrap

Ask your AI agent to execute the bootstrap workflow to populate the semantic memory by analyzing your existing codebase:

```
Read and execute .agents/workflows/init.md
```

### 3. Configure your IDE

Ensure your IDE/agent reads `AGENTS.md` automatically at session start:

| Tool                | Configuration                                                              |
| ------------------- | -------------------------------------------------------------------------- |
| **Claude Code**     | Reads `AGENTS.md` automatically from root. No config needed.               |
| **Cursor**          | Add `AGENTS.md` to your project rules, or place content in `.cursorrules`. |
| **Gemini CLI**      | In `.gemini/settings.json`: `{ "context": { "fileName": "AGENTS.md" } }`   |
| **Aider**           | In `.aider.conf.yml`: `read: AGENTS.md`                                    |
| **VS Code Copilot** | Add reference in `.github/copilot-instructions.md`.                        |
| **Other agents**    | Instruct the agent to read `AGENTS.md` as its first action.                |

### 4. Use the daily workflows

- **Session start:** The agent reads `AGENTS.md` → executes `start.md` → loads context.
- **Session end:** Tell the agent: _"Consolidate memory"_ or _"Execute `.agents/workflows/end.md`"_.

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
│   ├── start.md                       # ★ Core: Session start ("Wake Up")
│   ├── end.md                         # ★ Core: Session end ("Sleep")
│   ├── defrag.md                      # ★ Core: Memory optimization ("Defrag")
│   ├── deep-plan.md                   # ★ Extension: Deep planning with Proof of Work
│   └── audit.md                       # ★ Extension: Post-feature audit with evidence
├── memory/                            # ★ Cortex-MD: Persistent memory system
│   ├── semantic/                      #   Neocortex: Global project state
│   │   ├── taxonomy.md                #     Strict tag taxonomy for the index
│   │   ├── architecture.md            #     Design patterns and module structure
│   │   ├── stack.md                   #     Technologies, libraries, and key dependencies
│   │   ├── conventions.md             #     Code conventions and style
│   │   ├── business-rules.md          #     Business logic and domain rules
│   │   └── active-tasks.md            #     Working memory: tasks in progress
│   └── episodic/                      #   Hippocampus: Indexed chronological record
│       ├── timeline.md                #     Quick search index by [Tags] (max 50 sessions)
│       └── YYYY/
│           └── MM/
│               └── DD.md              #     Detailed session record (files, commits, decisions)
├── .mcp.json                          # (Convention) Local MCP server configuration
├── ai-helpers/                        # ★ Cortex-MD: Stepwise Execution Pipeline module
│   ├── generators/                    #     Active prompts (Stepwise engines)
│   ├── idea-development/              #     Static templates and workbench files
│   └── prompts/                       #     Master orchestration prompts
└── docs/                              # ★ Cortex-MD: Guides and documentation
```

Additionally, `AGENTS.md` is located at the **repository root**. It acts as the entry point (_system prompt_) that the IDE automatically injects into the agent, and is responsible for directing the LLM to Cortex-MD's workflows. This follows the [AGENTS.md standard](https://agents.md) adopted by 60k+ open-source projects and supported by tools like Codex, Jules, Cursor, VS Code Copilot, and many more.

## Workflows

Cortex-MD provides **four core workflows** (the memory lifecycle) and **two extension workflows** (development methodology):

### 0. First-time bootstrap: `init.md`

Run once when adopting Cortex-MD in an existing project. The LLM analyzes the codebase and populates all semantic memory files automatically.

### 1. The "Wake Up" cycle: `start.md`

When you start a new session, the LLM reads `.agents/workflows/start.md` and performs an efficient manual RAG (Retrieval-Augmented Generation):

- **Step 1 (Semantic Loading):** Always reads `architecture.md` and `stack.md` as mandatory baseline. Selectively loads `conventions.md`, `business-rules.md`, and `taxonomy.md` based on the task.
- **Step 2 (Hippocampal Routing):** Scans `episodic/timeline.md` looking for tags (e.g., `[Auth]`, `[UI]`, `[DB]`) related to the current objective.
- **Step 3 (Episodic Retrieval):** Only if relevant matches are found, opens the corresponding daily files (`YYYY/MM/DD.md`) to retrieve prior reasoning and commit hashes.

### 2. The "Sleep and Consolidation" cycle: `end.md`

At the end of your coding session, the LLM consolidates long-term memory:

- **Episodic Generation:** Creates the day's file (`DD.md`) with a structured template documenting files modified, commit hashes, technical decisions, and error resolutions.
- **Index Update:** Adds a tagged entry to `timeline.md` (max 50 sessions). Tags come strictly from `taxonomy.md`.
- **Semantic Consolidation (Critical):** Evaluates whether today's actions altered the global architecture, rules, or conventions. If so, overwrites the corresponding semantic file.
- **Working Memory Flush:** Updates `active-tasks.md` for the next session.
- **Knowledge Routing:** If a new pattern or bug solution was discovered, routes it to the correct file (semantic memory, skill, or docs) instead of bloating `AGENTS.md`.
- **Planning Sync (Optional):** If the project has a master roadmap or planning doc, updates it to reflect completed milestones or new steps.

### 3. Memory Defragmentation: `defrag.md`

Triggered on demand when the user detects that memory files have grown with redundancies, format inefficiencies, or cross-file inconsistencies. This is analogous to disk defragmentation — reorganizing data for optimal performance without losing information.

- **Safety Gate:** Warns the user and requires explicit confirmation that a high-capability reasoning model is active.
- **Full Inventory:** Reads all semantic and recent episodic memory to build a complete picture.
- **Semantic Compression:** Rewrites each semantic file for optimal LLM token consumption — dense lists over prose, imperative voice, zero filler words.
- **Episodic Optimization:** Audits the timeline for tag inflation and enforces the 50-session limit.
- **Cross-File Validation:** Detects contradictions and drift between `architecture.md`, `stack.md`, `conventions.md`, and `business-rules.md`.
- **Defrag Report:** Presents a summary of all changes for user review.

> **When to run it:** Every 15-20 sessions, or when semantic memory files grow beyond what feels reasonable for the project's complexity. The workflow is idempotent — running it on already-optimized memory produces no changes.

## Extension Workflows: Adaptive Execution Modes

While the four core workflows manage the memory lifecycle, Cortex-MD also provides **extension workflows** that adapt to the capabilities of the model executing them. They solve two problems simultaneously:

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

### 4. Deep Planning: `deep-plan.md`

A structured planning workflow with three phases (Discovery → Constraints → Partition) that adapts its rigor:

- **`strict`:** Printed search results, blocking gates between phases, stages of max 3-5 files.
- **`standard`:** Consolidated summaries, no blocking gates, stages up to 8-10 files.
- **`autonomous`:** Holistic analysis, phases may be combined, monolithic plans permitted if justified.

> **When to use it:** Before implementing any feature that spans more than 3 files or crosses module boundaries.

### 5. Post-Feature Audit: `audit.md`

An evidence-based validation workflow with six phases (Inventory → Modularity → Redundancy → Conventions → Technical Validation → Report):

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
- Creation of automation scripts (Bash/Node.js) to initialize the folder structure.
- Impact evaluation on context retention in projects with over 100k lines of code.
- **Token metrics for defrag:** Adding estimated token count (before vs. after) to the defrag report would help users quantify optimization impact. This could be implemented as an optional phase in `defrag.md`.
- **Extension workflow research:** Testing and refining the Proof of Work methodology across different model families (Claude, GPT, Gemini, open-source) and project sizes.

If you have improvements to the workflow prompts, please open a Pull Request or start an Issue to discuss the cognitive approach.
