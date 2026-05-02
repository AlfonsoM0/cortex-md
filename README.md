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

| Tool | Configuration |
|---|---|
| **Claude Code** | Reads `AGENTS.md` automatically from root. No config needed. |
| **Cursor** | Add `AGENTS.md` to your project rules, or place content in `.cursorrules`. |
| **Gemini CLI** | In `.gemini/settings.json`: `{ "context": { "fileName": "AGENTS.md" } }` |
| **Aider** | In `.aider.conf.yml`: `read: AGENTS.md` |
| **VS Code Copilot** | Add reference in `.github/copilot-instructions.md`. |
| **Other agents** | Instruct the agent to read `AGENTS.md` as its first action. |

### 4. Use the daily workflows

- **Session start:** The agent reads `AGENTS.md` → executes `start.md` → loads context.
- **Session end:** Tell the agent: *"Consolidate memory"* or *"Execute `.agents/workflows/end.md`"*.

## Neuroscientific Foundations

Pre-trained LLMs lack neuroplasticity; they cannot alter their parametric weights to remember a conversation from yesterday. To mitigate this, Cortex-MD structures an "external brain" (exocortex) using the repository's file system:

- **Prefrontal Cortex (Context Window):** Kept clean and strictly focused on the current task.
- **Neocortex (Semantic Memory):** Stores the "state of things" (architecture, conventions, business rules, stack, and taxonomy). It is not a historical record — it is the absolute and current truth of the project. Divided into multiple modular files to scale without generating *context bloat*.
- **Hippocampus (Episodic Memory):** Stores the daily record of actions and reasoning (linked to Git commits), efficiently indexed in a limited timeline (last 50 sessions) for rapid retrieval when deep context is needed.

## Directory Architecture

Cortex-MD integrates within the standard `.agents/` convention (based on [Anthropic](https://docs.anthropic.com) and [AGENTS.md](https://agents.md) conventions) for AI agents in repositories. The `.agents/` directory is a scalable and standardized space; Cortex-MD contributes the `memory/` folder and the lifecycle workflows:

```text
/.agents/                              # Standard directory for AI agents
├── skills/                            # (Convention) Reusable skills (instructions + code)
│   └── ...
├── workflows/                         # Agent orchestration flows
│   ├── init.md                        # ★ Cortex-MD: First-time bootstrap ("Onboarding")
│   ├── start.md                       # ★ Cortex-MD: Session start ("Wake Up")
│   └── end.md                         # ★ Cortex-MD: Session end ("Sleep")
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
└── .mcp.json                          # (Convention) Local MCP server configuration
```

Additionally, `AGENTS.md` is located at the **repository root**. It acts as the entry point (*system prompt*) that the IDE automatically injects into the agent, and is responsible for directing the LLM to Cortex-MD's workflows. This follows the [AGENTS.md standard](https://agents.md) adopted by 60k+ open-source projects and supported by tools like Codex, Jules, Cursor, VS Code Copilot, and many more.

## Workflows

The core of Cortex-MD consists of three workflows:

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

## How to Contribute

Cortex-MD is an open architecture licensed under [MIT](LICENSE). Current research areas include:

- Optimization of the tag taxonomy in `taxonomy.md`.
- Creation of automation scripts (Bash/Node.js) to initialize the folder structure.
- Impact evaluation on context retention in projects with over 100k lines of code.

If you have improvements to the workflow prompts, please open a Pull Request or start an Issue to discuss the cognitive approach.
