# Workflow: Project Bootstrap (Initial Onboarding)

**System Context:** You are an AI agent and this is the **first time** Cortex-MD is being activated in this repository. The semantic memory files are empty templates. Your job is to analyze the existing codebase and populate the memory system so that future sessions can start with full context.

Execute the following phases in strict sequential order.

## Phase 1: Codebase Analysis

Scan the project to understand its structure before writing anything.

1. **Read the project root:** List all top-level files and directories to identify the type of project (monorepo, single app, library, etc.).
2. **Identify the stack:** Look for configuration files (`package.json`, `tsconfig.json`, `Cargo.toml`, `requirements.txt`, `go.mod`, `Gemfile`, etc.) to determine languages, frameworks, and key dependencies.
3. **Identify the architecture:** Look for directory patterns (`src/`, `apps/`, `packages/`, `lib/`, `routes/`, `controllers/`, `models/`, etc.) to understand the module structure.
4. **Identify conventions:** Look for linting/formatting config (`.eslintrc`, `.prettierrc`, `biome.json`, `rustfmt.toml`, etc.) and examine a few representative source files to detect naming patterns and code style.
5. **Identify business rules:** Read the `README.md` and any existing documentation to understand the project's domain and purpose.

## Phase 2: Semantic Memory Population

Write the findings into the semantic memory files. Follow the template structure already defined in each file.

1. **Write:** `.agents/memory/semantic/stack.md`
   - Fill in the languages, frameworks, libraries, database, tools, and external services based on your analysis.
2. **Write:** `.agents/memory/semantic/architecture.md`
   - Document the module structure, design patterns observed, and data flow.
3. **Write:** `.agents/memory/semantic/conventions.md`
   - Document the coding style, naming conventions, import rules, and any prohibited patterns found in linter configs.
4. **Write:** `.agents/memory/semantic/business-rules.md`
   - Document the domain, key entities, and any business rules inferred from the codebase and documentation.
5. **Write:** `.agents/memory/semantic/taxonomy.md`
   - Review the default tags. If the project has obvious domains not covered by the defaults (e.g., `[Payments]`, `[i18n]`, `[Analytics]`), **recommend additions to the user** and wait for approval before adding them.

## Phase 3: Working Memory Initialization

1. **Write:** `.agents/memory/semantic/active-tasks.md`
   - Set the current task as "Initial onboarding complete" and define the next logical step based on the user's request.

## Phase 4: Confirmation

1. Present a brief summary to the user of what was populated in each semantic memory file.
2. Ask the user to review the generated content and correct any inaccuracies.
3. Inform the user that the system is now ready and that future sessions should begin with `start.md`.

*Internal note for the LLM: This workflow should only be executed once per project. After the initial bootstrap, use `start.md` and `end.md` for regular session management.*
