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
2. Proceed immediately to execute the Sleep cycle by calling 
   `.agents/workflows/end.md` to consolidate learnings into the Hippocampus.

## Output
Write the audit findings to `ai-helpers/idea-development/05-audit.md`.
