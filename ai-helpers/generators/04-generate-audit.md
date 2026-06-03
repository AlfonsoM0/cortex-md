# Generator: Code → Audit

## Input

Read the specification in `ai-helpers/idea-development/03-spec.md`.

## Process

Audit the changes made according to the specification and verify they were 
implemented correctly. Write findings to the output file.

## Exit Hook

If the audit is 100% successful:

1. Mark the current PR as completed (`- [x]`) in 
   `ai-helpers/idea-development/02-breakdown.md`.
2. Inform the user that the PR was completed successfully and remind them to
   run `.agents/workflows/end.md` when they consider the session to be
   complete. This allows them to group multiple PRs into a single episodic
   entry instead of consolidating after each individual PR.

If the audit is **not** successful, write detailed findings to
`ai-helpers/idea-development/05-audit.md` and wait for user instructions.

## Output

Write the audit findings to `ai-helpers/idea-development/05-audit.md`.
