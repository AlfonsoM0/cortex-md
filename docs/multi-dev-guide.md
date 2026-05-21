# Cortex-MD: Multi-Developer Scalability Guide

When working in teams with more than one developer, using Cortex-MD out-of-the-box can lead to merge conflicts in Git. This happens because multiple developers are writing to the same episodic memory files (`timeline.md` and `YYYY/MM/DD.md`) simultaneously.

To solve this, the architecture is divided into two layers:

## 1. Centralized Neocortex (Project Repository)

- **Location:** Root of the main monorepo.
- **Content:** Business rules, taxonomy, code conventions, and workflow files (`start.md`, `end.md`, etc.).
- **Mutability Level:** Low (Immutable day-to-day). This memory is shared by the whole team and only changes when the global architecture or rules change.

## 2. Distributed Hippocampus (Personal Memory Repository)

- **Location:** An independent repository for each developer.
- **Content:** Episodic memory exclusive to the developer (daily logs `YYYY/MM/DD.md` and their personal `timeline.md`).
- **Mutability Level:** High (Autonomous Read/Write at the end of each session).

---

## Setup Step-by-Step

### 1. Naming Convention
Create a new repository for your personal memory. The convention is:
`cortex-md-{project-name}` (e.g., `cortex-md-mycompany`).

### 2. Personal Memory Repository Structure
Initialize your personal memory repository with the following minimal structure:

```text
/cortex-md-{project-name}/
├── README.md                          # Setup instructions
└── episodic/
    └── timeline.md                    # Personal index (same structure as original)
```

### 3. Cloning Strategy
Clone both repositories in the same parent directory so they are siblings:

```text
/workspace/
├── {project-name}/                    # Main project repo (where you code)
└── cortex-md-{project-name}/          # Personal memory repo
```

## Workflow Adaptation

Since Cortex-MD is powered by plain Markdown files, you can adapt it to this distributed setup by simply modifying the paths in your core workflows.

In your main project repo, open `.agents/workflows/start.md` and `.agents/workflows/end.md`, and change the paths pointing to the episodic memory to use relative paths pointing to your sibling personal memory repo.

### Example: Modifying `start.md`

Change this line:
`1. **Read the file:** .agents/memory/episodic/timeline.md`
To:
`1. **Read the file:** ../cortex-md-{project-name}/episodic/timeline.md`

### Example: Modifying `end.md`

Change the file creation path:
`2. Create or update the file: .agents/memory/episodic/YYYY/MM/DD.md`
To:
`2. Create or update the file: ../cortex-md-{project-name}/episodic/YYYY/MM/DD.md`

Change the index update path:
`2. **Read the file:** .agents/memory/episodic/timeline.md`
To:
`2. **Read the file:** ../cortex-md-{project-name}/episodic/timeline.md`

---

💡 *Orchestration Note:* AI tools (like Roo Code or Antigravity CLI) operate in the project repository `./` using relative paths towards the personal memory repository `../cortex-md-{project-name}/`. This allows the agent to read the global semantic memory from the main repo and write its episodic logs to your personal repo without causing Git conflicts for your teammates.
