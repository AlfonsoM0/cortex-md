# Generator: Brief → Breakdown

## Input

Read the available files inside the `ai-helpers/idea-development/01-brief/` folder.

- If the user explicitly indicated which brief to work on, use that file.
- If there is **only one file** in the folder, use it directly.
- If there are **multiple files**, present the list to the user and ask which one they want to process before proceeding.

## Process

Develop an execution plan following the workflow `.agents/workflows/deep-plan.md`
in **standard** mode. The plan must:

1. Decompose the brief into logical, atomic PRs.
2. Structure each PR as a checkbox item (`- [ ]`) for Kanban tracking.
3. Order PRs by dependency (foundations first, integrations last).
4. Include a final audit PR.

## Output

Write the complete plan to `ai-helpers/idea-development/02-breakdown.md`.
