---
description: Weekly memory check (automatic, lightweight)
---

# Workflow: Weekly Check (Lightweight Maintenance)

**System Context:** Triggered automatically by `start.md` without the user asking: the user should not have to know when a defrag, cleanup, or re-alignment is needed. The check **does not rewrite memory**: it detects and recommends. The only thing it writes is its own log in `.agents/memory/maintenance-log.md`. It takes only a few minutes.

## When it runs

- **Maintenance day:** specified in `AGENTS.md § Automatic maintenance` (default: Friday). If set to "disabled", it does not run.
- **Runs on the first session on or after that day where it hasn't run yet.** The agent has no clock between sessions: if the user does not work on Friday, it runs on Monday. Rule: runs if the last check in `maintenance-log.md` is older than the last time the maintenance day occurred.
- **User work comes first.** If the user arrives with something urgent, run the check at the end of the session.
- **Executed by a single agent:** the one interacting with the user. In a team of people, the designated owner specified in `AGENTS.md`.
- If you do not know today's date, get it from the system (e.g., `date`) or ask; never guess it.

## Checks

1. **Contract and size:** `node .agents/check-memory-contract.js` — findings and always-loaded tier in tokens. Without Node: sum the size of the always-loaded tier files (`start.md § Phase 1`) and manually review the longest entries.
2. **Unconsolidated sessions:** work after the last entry in the timeline.
   - With git: commits after that date (`git log --since=<date>`).
   - Without git: workspace files modified after that date, outside `.agents/` (e.g., `find . -newer .agents/memory/episodic/timeline.md -type f -not -path "./.agents/*"`).
3. **`active-tasks.md` hygiene:** items with ✅ that should have been deleted, `[Watch]` with expired triggers, past dates, "to verify" tasks lingering for weeks.
4. **Sessions since the last defrag:** timeline entries after the date of the last defrag in `maintenance-log.md`.
5. **Always-loaded tier growth** against the value recorded during the last defrag.
6. **Brief:** date of the last review (`maintenance-log.md`) and goals in `docs/00-PROJECT-BRIEF.md` with expired deadlines.
7. **Timeline:** more than 50 entries, or entries that expanded into paragraphs.

## Decision: one recommendation, not a list

| If you found…                                                                                                                    | Recommend                                                                                           |
| -------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| Unconsolidated sessions                                                                                                          | Log them now (`end.md` Phases 1-2, based on what the changes show).                                 |
| Pending items to clean up                                                                                                        | Review them with the user: list them numbered and have them confirm which no longer apply.          |
| ≥ 15 sessions since last defrag · always-loaded tier +25% · verifier findings · > 60 days and ≥ 5 sessions since last            | A full defrag (`defrag.md`).                                                                        |
| Brief not reviewed for > 90 days, or expired goals                                                                               | Quick brief review (`references/alignment-interview.md § Re-alignment`).                            |
| Signs of direction change in recent sessions                                                                                     | A re-alignment.                                                                                     |
| None of the above                                                                                                                | Nothing: "Weekly check: memory is in good shape."                                                   |

- **If there are multiple findings, offer at most two**, in this order: consolidate > clean up > defrag > brief review. Anything else waits until the next check.
- **Defrag with a lightweight model:** if the active model does not have strong reasoning capabilities, recommend doing it with a more capable model instead of running it directly.

## How to present it

- **Three lines maximum, no jargon:** what you found, what you recommend, and how long it takes. E.g.: _"Weekly check: there are 2 pending tasks that appear resolved. Shall we review them (2 min)?"_
- **Propose, never impose.** Anything modifying memory executes only with user consent.
- **If postponed, do not insist** until the next maintenance day. If a necessary defrag has been postponed three times, explain in two sentences why it is recommended, and respect the decision.

## Logging

Update `.agents/memory/maintenance-log.md`: check date, outcome in a single line, and if postponed, the postponement count. The check **is not logged to the timeline** (that would be weekly noise); defrag and re-alignment are.
