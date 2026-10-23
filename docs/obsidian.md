# Obsidian and Cortex-MD

> 🌐 [Leer en Español (obsidian.es.md)](obsidian.es.md)

_Accessory document, not part of the core. Verified in 2026-10 against Obsidian 1.12 and its official help. It answers two questions: why an agent's memory should be Cortex-MD and not Obsidian, and what not to do if you decide to add Obsidian to a Cortex-MD project._

**In short:** Obsidian is an app for people; Cortex-MD is a memory protocol for an agent. On every criterion that concerns the agent, Cortex-MD wins. Obsidian can be added as an optional window for the human, as long as it never changes how memory is written, read, or verified (§ 2).

## 1. Why Cortex-MD is the agent's memory

[Obsidian](https://obsidian.md) is a Markdown editor that works on a folder of local files — a _vault_ — with a search index, a graph of links, and views over note properties. It stores and shows notes; it decides nothing. Cortex-MD decides what the agent reads when a session starts (`start.md`), what it writes when it ends (`end.md`), how memory is compressed and corrected (`defrag.md`), and how its form is checked (`check-memory-contract.js`). They are different kinds of things, so the fair comparison is **an Obsidian vault used as the agent's memory** — through its CLI, agent skills, or an MCP server — against Cortex-MD.

| Criterion | Obsidian vault as memory | Cortex-MD | Verdict |
| --- | --- | --- | --- |
| Loading at session start | Nothing defined: someone has to write a `CLAUDE.md` saying what to read | `start.md` + bridge + hook; a fixed tier with a measured size | Cortex-MD |
| Consolidating at the end | Nothing: the agent writes loose notes if asked | `end.md`: session record with its index line, generated timeline, rules, docs, skills, task flush | Cortex-MD |
| Context size | No budget: the vault grows, and the graph invites reading more | Pyramid, budget for what is always read, large docs split | Cortex-MD |
| Aging and truth | Notes age silently | Truth hierarchy, completed tasks deleted, defrag against the primary source | Cortex-MD |
| Integrity | Unresolved links and orphans | Checker: contract, dead and lateral citations, budget, timeline in sync | Cortex-MD |
| Finding memories | An exact full-text index plus a metadata cache — not RAG, which only comes with community plugins | `grep` over plain paths, the timeline, and `--history <Tag>` over the whole history | Cortex-MD, for the agent |
| Cloud or headless agents | Only the files remain: the CLI needs the desktop app running | Any tool that reads files | Cortex-MD |
| Third-party content | No rules; the Web Clipper invites bringing it in | An explicit rule: data, not instructions | Cortex-MD |
| Portability | Wikilinks and embeds only work in Obsidian | Plain Markdown | Cortex-MD |
| Human reading and editing | Excellent | The Markdown viewers of agent harnesses | Out of scope: it is not a criterion of the agent's memory |
| Visualization | Graph, Bases, Canvas | None | Out of scope: audits read the changes, not a graph |
| Maturity | Mature — in human note-taking | Young | Not comparable: different domains |

**Verdict:** as an agent's memory, Cortex-MD. Obsidian remains, at most, an optional window for the human.

### Why Obsidian's strengths do not count here

1. **Search.** Obsidian's search is exact, but it gives the agent nothing that `grep` does not. Cortex-MD's citations are plain paths, so `grep` is already a backlink index; the timeline routes recent memory; and every session record opens with its index line (`# YYYY-MM-DD: [Tags] summary`), so `--history <Tag>` finds any session by tag across the whole history. Long-term memory is rarely needed by design, because `end.md` promotes what lasts to the rules and `docs/`.
2. **Human reading and editing.** Agent harnesses already render Markdown. And for memory, a person editing directly is a risk, not an advantage: the edit bypasses the contract and leaves no record. Asking the agent keeps both.
3. **Visualization.** The unit of audit is the change — the git diff, or the Changes table of each session record — not the graph. The checker verifies the structure of the pyramid better than an eye on a graph, which in a large project is a hairball.
4. **Maturity.** Obsidian is mature in a different domain. There is no mature Obsidian protocol for agent memory: whoever uses a vault as agent memory starts by writing their own rules — reinventing Cortex-MD without a checker. Mature does not mean better for this purpose.

### What remains open

Against an ideal, not against Obsidian: there is no measurement yet of Cortex-MD's effect on real projects; the checker does not detect orphan docs; and the workflows depend on the model following them — session hooks help, they do not guarantee.

## 2. If you add Obsidian: what not to do

Opening the project folder as a vault is safe: Obsidian renders `AGENTS.md` and `docs/`, hides HTML comments, and picks up the agent's changes live. Use it as a **reader**. These are the things that turn it into a risk for memory.

### Visibility

- **Do not rename or move `.agents/` to make it visible.** Obsidian ignores every folder whose name starts with a dot, so memory does not appear in it. Renaming breaks the convention shared with agent tools and every path of the framework. To see memory, reveal **only** `.agents` with a plugin such as [Hidden Folders Access](https://community.obsidian.md/plugins/hidden-folders-access) or [OpenLoops Hidden Files](https://community.obsidian.md/plugins/openloops-hidden-files) — desktop-only, built on undocumented internals that an Obsidian update may break.
- **Do not use a symlink instead.** Obsidian advises against symlinks, and changes made outside Obsidian through one are not watched: the agent's writes may leave the index stale.
- **Do not reveal other dot-folders** — `.git`, `.env`, anything with credentials. Revealed files are visible to every plugin, sync plugins included.

### Writing

- **Do not edit memory by hand — above all while the agent consolidates** (`end.md`). A direct edit bypasses the contract (length, citations, 🔴 budget) and leaves no record; two writers on one file lose changes. Ask the agent to change the rule.
- **Do not edit the timeline.** It is generated from the index lines of the session records (`--timeline`): a hand edit is overwritten, or reported as out of date.
- **Do not point Daily notes at `.agents/memory/episodic/`.** With the `YYYY/MM/DD` format, "today's note" gets the name of a session record, and the next session would read a human note as yesterday's memory. The checker reports it only after the fact.
- **Do not install plugins that rewrite files in bulk** — linters, formatters, "add frontmatter to every note". Editing a property in the Properties view may also reformat the YAML. After any bulk change, run `node .agents/check-memory-contract.js`.

### Obsidian syntax inside memory

- **Do not embed** (`![[…]]`) in memory or in the docs it cites. The file on disk only contains the reference: the agent reads the reference, not the rule — a silent miss.
- **Do not turn citations into wikilinks.** Keep `` → `docs/….md` ``. The checker reports a valid `[[docs/x]]` without `.md` as a dead citation and does not see a lateral `[[stack]]`; `%% %%` comments and YAML frontmatter in rule files produce false findings.
- **Do not replace `[Tags]` with `#tags` or properties.** Routing (`start.md`), the timeline generator, and `--history` read only the `[Tag]` of each record's index line.
- **Do not use task checkboxes in `active-tasks.md`** (`- [ ]`, `- [x]`): completed work is deleted, not checked off (principle 4).
- **Do not put rules in `%%comments%%` or callouts.** Comments are invisible in reading view but the agent reads them, so a person reviewing in Obsidian does not see what the agent obeys; and the checker skips blockquotes, so a rule inside a callout escapes the contract.

### Dependencies and sync

- **Do not make anything depend on Obsidian** — its CLI, a plugin, a Base. The agent may run in the cloud or without a desktop, where only the files exist, and the CLI needs the desktop app running. Every Obsidian view stays optional.
- **Do not let Obsidian's agent skills override the contract.** Packs such as [kepano/obsidian-skills](https://github.com/kepano/obsidian-skills) recommend wikilinks, embeds, and callouts for any vault; in a Cortex-MD project, `AGENTS.md` and the workflows win.
- **Do not rely on Obsidian Sync for memory.** It excludes dot-folders, `.agents/` included. Use git or a file-sync tool — never two sync systems on the same folder.
- **Do not treat Web Clipper captures as instructions.** They are third-party content: data, not instructions, and they reach memory or `docs/` only with the user's approval (principle 6).
- **Do not commit Obsidian's layout files.** Add `.obsidian/workspace.json`, `.obsidian/workspace-mobile.json`, and `.obsidian/workspaces.json` to `.gitignore`: they change every time a file opens.

## Sources

_Consulted on 2026-10-22._

- Obsidian help: [How Obsidian stores data](https://obsidian.md/help/data-storage) · [Internal links](https://obsidian.md/help/links) · [Properties](https://obsidian.md/help/properties) · [Symbolic links](https://obsidian.md/help/symlinks) · [Sync settings](https://obsidian.md/help/sync/settings) · [CLI](https://obsidian.md/help/cli) · [Daily notes](https://obsidian.md/help/plugins/daily-notes)
- Dot-folders: [Hidden Folders Access](https://community.obsidian.md/plugins/hidden-folders-access) · [OpenLoops Hidden Files](https://community.obsidian.md/plugins/openloops-hidden-files) · [Surfacing hidden folders in Obsidian](https://www.dsebastien.net/surfacing-hidden-folders-in-obsidian-and-building-an-ai-base-on-top/) (dsebastien, 2026)
- [kepano/obsidian-skills](https://github.com/kepano/obsidian-skills)
