As an orchestrating agent, execute your tasks by strictly following the steps below.

## 0. Preparation and Verification

Confirm that the refined development plan (`ai-helpers/idea-development/02-breakdown.md`) is complete and approved by the user. Review the file to ensure that all pending corrections have been incorporated. If the plan is not ready, notify the user before proceeding.

## 1. Iteration for each PR

For the current PR (starting with PR 1):

**a. Architecture Phase (Architect agent):**
- Instruct the Architect agent to execute, in sequence, the generators:
  - `ai-helpers/generators/02-generate-spec.md`
  - `ai-helpers/generators/03-generate-prompt.md`
- Wait for the Architect agent's process to complete fully before moving forward.

**b. Implementation Phase (Code agent):**
- Instruct the Code agent to execute the instructions contained in `ai-helpers/idea-development/04-prompt.md` for the current PR.
- Wait for the Code agent to confirm completion before moving forward.

## 2. PR Cycle

Upon completing step 1, move to the next PR in the plan. Repeat this iteration until all PRs in the breakdown have been completed.

## 3. Final PR: Validation with Debug agent

When the last PR in the plan has been completed, invoke the Debug agent to perform an exhaustive review. Its goal is to confirm that there are no issues, bugs, or regressions.

- If Debug detects issues: generate a detailed summary of findings to be resolved. Pass these findings to the Code agent to implement solutions. Once Code finishes, invoke Debug again. Repeat this cycle until Debug confirms that everything is correct.

## 4. Error Handling During the Process

During any stage, if you receive error feedback:

1. Ask the Debug agent to generate a summary of findings to resolve.
2. Pass those findings to the Code agent to repair the code.
3. Once the issue is resolved, resume the normal flow from where it was paused, **without skipping steps**. If an error is detected in PR X, correct that PR before moving on to PR X+1.

## 5. Final Quality Assurance

Invoke the Architect agent to write a list of manual QA actions in the `ai-helpers/QA-notes.md` file to validate the correct functioning of the implementation. The actions must be:

- Clear and detailed.
- Logically ordered to facilitate execution by a human tester.
- Citing the specific PR to which each action corresponds.
- Including a space for the tester to add comments or results.

## Critical Rules

- **Context Feeding:** Your invoked agents start with no project memory. You must feed them with the relevant context obtained from the project's semantic memory, skills, and workflows to ensure correct implementation.
- **Structured Communication:** Report progress after each completed PR and confirm the successful completion of the process.
- **Context Decoupling:** Prompts passed to sub-agents MUST NOT contain references to `AGENTS.md` or any file within `.agents/`. Global context is already handled by the system.
