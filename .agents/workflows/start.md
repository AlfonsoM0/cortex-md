# Workflow: Session Start (Cognitive Wake Up)

**System Context:** You are an AI agent operating within this repository. You have just started a new work session and your current context is empty. To avoid hallucinations, architectural errors, and loss of continuity, you MUST execute the following memory recovery steps in exact order before writing code or responding to the user.

## Phase 1: Semantic Memory Loading (Global State)

Your first task is to understand "where you are" and "what the rules are".

1. **Mandatory baseline — ALWAYS read these two files:**
   - `.agents/memory/semantic/architecture.md` — To understand the system's structure.
   - `.agents/memory/semantic/stack.md` — To know the technologies in use.
2. **Selective loading — Read these if relevant to the user's task:**
   - `.agents/memory/semantic/conventions.md` — If you will be writing or modifying code.
   - `.agents/memory/semantic/business-rules.md` — If the task involves domain logic or business flows.
   - `.agents/memory/semantic/taxonomy.md` — If you will need to search or update the episodic timeline.
3. **Read the file:** `.agents/memory/semantic/active-tasks.md`
   - **Objective:** Load into your working memory the tasks left pending from the previous session and the immediate objective.
4. **Optional — project compass:** If the project maintains a master roadmap (e.g., `docs/00-MASTER-ROADMAP.md`), read it to understand the current development phase.

## Phase 2: Hippocampal Routing (Context Search)

Analyze the initial request the user has given you for this session. Mentally extract the key domains (e.g., Authentication, Database, User Interface, Payments).

1. **Read the file:** `.agents/memory/episodic/timeline.md`
   - **Objective:** Scan the historical index looking exclusively for tags (`[Tags]`) that match the domains of your current task.
   - **Strict rule:** Do not read the entire history — perform a visual search (*pattern matching*) for the relevant tags.
   - **Skip rule:** Ignore entries tagged exclusively with `[CortexMD]` — these are memory maintenance sessions and contain no project-relevant context.

## Phase 3: Selective Episodic Retrieval (Deep Context)

If in Phase 2 you found dates in `timeline.md` that contain tags relevant to your current task:

1. **Read the daily records:** Open the specific daily records indicated by the dates found in `.agents/memory/episodic/YYYY/MM/DD.md`.
   - **Objective:** Understand why past decisions were made in that specific module, what errors were previously committed, how they were resolved, and review the associated commits or code.
   - **Condition:** If the task is completely new and there are no relevant tags in the timeline, skip this step to save tokens in your context window.

## Phase 4: Confirmation and Execution

Once the previous phases are completed, your context window is optimized.

1. Respond to the user with a brief message confirming that you have loaded the project context and are ready to begin the assigned task.
2. Start your analysis or coding work based on the user's instruction.

*Internal note for the LLM: During your work, keep in mind that at the end of the session you will be asked to execute `.agents/workflows/end.md` to consolidate what you learn today.*