# Generator: Breakdown Item → Spec

## Input
Read the PR indicated by the user from the breakdown in 
`ai-helpers/idea-development/02-breakdown.md`.

## Process
Develop a precise technical specification following the workflow 
`.agents/workflows/deep-plan.md` in **strict** mode. The spec must:

1. List every file to create/modify with exact paths.
2. Limit stages to 3-5 files maximum.
3. Explicitly verify whether something already exists in the project's shared packages — if it does, mark it for reuse and never recreate it.

## Output
Write the specification to `ai-helpers/idea-development/03-spec.md`, including the following two mandatory sections:

### Anti-Redundancy Inventory

List the components, hooks, utilities, and schemas already present in the project that MUST be reused in this PR. For each one, include the exact import path.

### Validation Commands

Commands that the Code agent must run after completing the implementation. Specify the exact commands for this project (e.g., typecheck, lint, build, test).
