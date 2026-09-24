# Alignment Interview (`init.md` reference)

**Purpose:** for the agent and the user to share the same mental model of the project — what problem it solves, what they want to achieve, how work is done today, what has zero-error tolerance, what is urgent, where information lives, and how much autonomy the agent has. Without this shared model, memory records assumptions and the agent optimizes for what does not matter.

Works for any project: a software product, a retail or wholesale business, a consultancy, research, or an individual's administrative workflow. Questions use business language; adapt them to the domain.

## How to conduct it

- **Conversation, not a form.** Two or three questions per turn, starting with open-ended ones. Follow the user's thread: if answering one question already answers others, do not repeat them.
- **Read first, ask second.** What the repository, README, or shared documents already state is not asked: it is **confirmed** ("I understand that X, is that right?").
- **Ask for specifics.** Faced with a vague answer, ask for an example, a number, or "the last time that happened." _"Suppliers fail"_ → _"Which one failed most recently, and what did it cost?"_
- **Reflect back when closing each block:** 3-5 bullet points with what you understood, and ask for corrections. This is where misunderstandings are caught.
- **Respect time.** When starting, ask how much time is available. Questions marked with ★ are essential; the rest go deeper. The interview can be spread across multiple sessions: whatever remains incomplete stays as pending items in `active-tasks.md`.
- **"I don't know" is a valid answer.** Record it as an unknown to verify; never fill it with an assumption.
- **Never ask for credentials or third-party personal data.** Ask **where** they live, not what they contain.
- **Depth proportional to risk.** A small personal project can stick to blocks 1, 2, 3, 6, and 9; one handling money, third-party data, or customers should cover all of them.

## Question blocks

### 1. The project and its people

- ★ What is the project, in two sentences, and who is it for?
- ★ What stage is it in: idea, under construction, operating, growing, in crisis?
- ★ What is your role, and who else participates or is affected (partners, employees, customers, suppliers, other AI agents)?
- Who decides what? Is there anyone else the agent must report to or consult?

### 2. Problems

- ★ What problem does the project solve for its customers or target audience?
- ★ What problem do **you** want to solve with the help of an assistant? What takes up the most time, money, or peace of mind today?
- When was the last time that problem cost you something concrete? How much?
- What happens if it isn't resolved in the coming months?

### 3. Goals and success

- ★ What do you want to achieve in 3, 6, and 12 months? (Seek specific, measurable, time-bound goals.)
- ★ How will you know it worked? What metric or signal proves it?
- What is **not** a goal? What was intentionally left out?
- When speed, quality, and cost conflict, which one wins, and in what cases does that change?
- What does "done" or "good enough" mean in your project?

### 4. Current procedures

Walk through **a typical week** with the user, and for each procedure that comes up:

- ★ What triggers it (an order, a date, a notification)? What are the steps, using which tool, and what does it produce in the end?
- ★ Who does it, how often, and how long does it take?
- Where does it usually fail or get delayed? What exceptions arise and who resolves them?
- Is it written down anywhere, or does it live in someone's head?

### 5. What to automate and how

- ★ What task would you like to never have to do again?
- For each procedure from block 4, evaluate with the user:
  - **Frequency and volume:** something that happens once a year rarely justifies automation.
  - **Rules or judgment:** does it follow fixed rules, or require judgment?
  - **Exceptions:** if the same path repeats in 8 or 9 out of 10 cases, it makes sense to automate that path and route exceptions to a human.
  - **Data:** is incoming information digital and organized, or on paper, photos, or loose messages?
  - **Stability:** if the procedure changes frequently, stabilize it first, then automate.
  - **Cost of an error and reversibility:** what happens if it goes wrong, and can it be undone?
- Classify each into: **script** (deterministic and repetitive) · **AI agent** (language, classification, drafting, bounded judgment) · **agent with human approval** (the agent prepares, a human approves) · **human only**.

### 6. The critical path: where caution is required

- ★ What tasks have zero-error tolerance? (Money, personal data, legal or tax matters, reputation, relationship with a key customer.)
- ★ What actions are **irreversible**?
- What went wrong in the past that cannot happen again?
- What rules are never broken, even if someone asks in a rush?

### 7. The urgent: what takes priority

- ★ What has a deadline, and what gets blocked if not done on time?
- What recurring fires flare up? Are there seasons or peaks (month-end, due dates, holidays)?
- How long can a reply to a customer, a supplier, or you wait?
- This shapes the Eisenhower matrix: important and urgent (P1), important (P2), urgent but not important (P3), neither (P4).

### 8. Agent autonomy

Place each task type according to **whether its result is easy to verify** and **whether it is easy to undo**:

| | Easy to undo | Hard to undo |
| --- | --- | --- |
| **Easy to verify** | Agent acts autonomously | Agent acts and notifies; user reviews |
| **Hard to verify** | Agent proposes; user decides | Explicit approval only, or never |

- ★ What can the agent do without asking? What must it propose and wait for your approval? What should it never do?
- ★ Can a message to a customer or supplier go out without you reading it?
- Can it spend money, delete information, or change settings? With what limits?
- When the agent needs to consult you, how do you prefer it? (Recommendation: bring its proposal and the cost of being wrong, so you can reply with a single word; and batch questions together.)

### 9. Where information lives

- ★ Where does useful information live: systems, spreadsheets, folders, email, chats, paper, your head?
- ★ For each data type (stock, customers, sales, code, documents), what is the **primary source**? If two places say different things, which one wins?
- Who updates it and how often? What is outdated or duplicated?
- How is it organized and named? Are there folder or file naming conventions?
- What can the agent access, and with read-only or also write permissions?
- What critical knowledge is not written down anywhere?

### 10. SWOT and pre-mortem

- ★ **Strengths:** what does the project do well, better than others?
- ★ **Weaknesses:** what is it missing or doing poorly today?
- **Opportunities:** what external changes (market, technology, regulation) could it leverage?
- **Threats:** what external factors could harm it (competition, costs, supplier dependencies)?
- ★ **Pre-mortem:** _"Imagine that six months from now this has failed. What went wrong?"_ Each answer is a risk to monitor.

### 11. Constraints

- What is the budget, including AI tooling?
- How much time per week can you dedicate to this, and how much can the agent ask of you?
- Are there legal, tax, or privacy requirements? In what country or countries does it operate, and in what languages?
- Are there mandatory or forbidden tools?

### 12. Decision criteria

- ★ When two good things conflict (fast vs. safe, cheap vs. convenient, automate vs. control), what usually wins?
- What decisions can the agent make using its judgment, and which are always yours?
- What decisions already made are no longer up for debate?

### 13. Working style and communication

- ★ In what language and tone do you prefer to work? Short or detailed responses?
- How often will you work with the agent? How do you want to be alerted about a problem?
- What annoys you in an assistant? (E.g., asking too many questions, assuming, being verbose.)
- What terms, acronyms, or proper names does the project use? (These form the glossary.)
- ★ Once a week the agent reviews memory and, if needed, proposes organizing it. What day works best for you? (Default: **Friday**, to close out the week. Can be disabled.)

### 14. History and learnings

- What was tried before that didn't work? Why?
- What mistake was costly and what was learned?

## Synthesis: where each answer goes

The interview is not stored as a transcript: each answer becomes a document, rule, or pending item, according to the memory contract (`end.md § Phase 3`).

| Answers | Destination |
| --- | --- |
| Project, problems, goals and metrics, non-goals, SWOT, pre-mortem, constraints | `docs/00-PROJECT-BRIEF.md` — the **why** of the project. `AGENTS.md § Context` holds a 3-5 line summary and cites it. |
| Decision criteria, zero-error items, irreversible actions | `docs/01-GUIDELINES.md` — how decisions are made. Invariable rules move to `business-rules.md` with their citation. |
| Agent autonomy and consultation preference | `AGENTS.md` (always loaded: permissions must be present in every session). |
| Current procedures | `docs/` (one doc per procedure or feature); primary flows as rule + citation in `architecture.md`. |
| Primary source by data type, systems, and access | `stack.md` (primary source on the first line) and `architecture.md`. |
| Automation candidates | `active-tasks.md`, ranked by priority and effort, indicating script / agent / agent with approval. |
| Urgencies, deadlines, peak seasons | `active-tasks.md`: P1 or `[Watch]` with its trigger. |
| Pre-mortem risks and threats | `active-tasks.md` as `[Watch]` with trigger, and detail in the brief. |
| Language, tone, style | `AGENTS.md` (baseline behavior) and `conventions.md` (formats and templates). |
| Maintenance day | `AGENTS.md § Automatic maintenance` (default: Friday). |
| Glossary | `docs/glossary.md`, cited from `conventions.md`. |
| Project domains or areas | Proposed tags for `taxonomy.md` (with approval). |
| History and learnings | Episodic log of the alignment session; if it yielded a rule, that rule goes to its file with a citation. |
| Unknowns ("I don't know") | `active-tasks.md` as pending items to verify. |

## Closing: confirming alignment

Before writing to memory, present a **one-page synthesis** in three parts:

1. **What I understood** — the project, its problems, goals, risks, and priorities.
2. **What I don't know yet** — the unknowns.
3. **What I'm going to do** — what documents and memory files I will create, and the proposed first steps.

Ask for explicit confirmation. Only with an approved synthesis do you proceed to populate memory.

## Re-alignment

The interview is not a one-time event, but it is not repeated entirely either. The weekly check (`maintenance.md`) proposes one of two formats:

- **Quick brief review** — when more than 90 days have passed since the last review or there are expired goals. Three questions, based on the current brief:
  1. Are the goals still these? Have any been met or ceased to matter?
  2. Did anything important change: customers, team, tools, money, rules?
  3. Are priorities still in the same order?

  If everything remains the same, record the review date and you're done; if anything changed, move to re-alignment.
- **Re-alignment** — upon signs of change: the project changed stage or direction, goals were met or expired, new people or tools joined, or **the user corrected the agent multiple times in the same direction** (the clearest sign that memory describes a different project). Only the affected blocks are repeated, starting from the current brief.

Upon finishing either format, update the brief and the review date in `.agents/memory/maintenance-log.md`; re-alignment is also logged to the timeline.
