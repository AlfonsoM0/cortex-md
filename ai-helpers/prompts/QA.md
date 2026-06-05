# QA Notes Generator

As an **Architect** agent, generate the QA notes for the implemented plan.

## Input

1. Read `ai-helpers/idea-development/orchestator-memory.md` to identify all completed PRs and the files each one touched.
2. Read `ai-helpers/idea-development/02-breakdown.md` to understand the plan's scope and objectives.

## QA Design Principles

The checklist must minimize tester effort by applying two rules:

1. **Minimal Navigation:** Group cases by application area (page, component, or flow). If multiple PRs touch the same screen, their cases go together in the same group. The tester reaches a location once and finishes everything in that area.

2. **Economy of Actions:** Within each group, order steps to leverage the state produced by the previous step. Never redo something already done. Correct CRUD example: create → edit (uses what was created) → delete (uses what was edited). Incorrect example: create → delete → create → edit.

## Process

For each application area affected by the plan:

- Identify all QA cases belonging to that area (from all PRs that touch it).
- Order cases using the two principles above: golden path first, then edge cases that naturally arise from the state left by the golden path.
- Cite the PR each case corresponds to.

## Output

Write the notes to `ai-helpers/idea-development/QA-notes.md` using the following format:

```markdown
## Area: [area / screen name]

> Related PRs: PR N, PR M

### QA-N — [action title] (PR N)

**Steps:**

1. ...
2. ...

**Expected result:** ...

**Tester comments:** _[space to fill]_
```
