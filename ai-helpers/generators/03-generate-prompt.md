# Generator: Spec → Delegation Prompt

## Input
Read the micro-plan in `ai-helpers/idea-development/03-spec.md`.

## Process
Generate a delegation prompt for the orchestrating agent. The prompt must contain:

1. A context explanation indicating which PRs have already been completed 
   (reference `ai-helpers/idea-development/02-breakdown.md` for the current state).
2. An instruction to execute the micro-plan in `ai-helpers/idea-development/03-spec.md`.
3. Any domain-specific workflow references relevant to the task 
   (e.g., frontend UX/UI guidelines if the PR involves UI work).

## Critical Rule: Context Decoupling
The prompt MUST NOT contain references to `AGENTS.md` or any file inside `.agents/`. 
The orchestrating agent already has its "Prefrontal Cortex" loaded via its IDE's 
system prompt. Duplicating these rules generates context bloat and distracts the 
model from pure code execution.

## Output
Write the delegation prompt to `ai-helpers/idea-development/04-prompt.md`.
